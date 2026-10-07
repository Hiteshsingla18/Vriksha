import re
import io
import math
import uuid
import datetime
from typing import Dict, List, Any, Tuple
import logging

from app.nlp.skill_taxonomy import extract_skills_from_text, FLAT_SKILL_LOOKUP
from app.nlp.embeddings import encode_text

logger = logging.getLogger(__name__)

CURRENT_YEAR = 2026

def extract_text_from_pdf(file_bytes: bytes) -> str:
    try:
        import pdfplumber
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            pages_text = [page.extract_text() or "" for page in pdf.pages]
            return "\n".join(pages_text)
    except Exception as e:
        logger.warning(f"pdfplumber extraction failed ({e}), using basic string decoding.")
        return file_bytes.decode("utf-8", errors="ignore")

def extract_text_from_docx(file_bytes: bytes) -> str:
    try:
        import docx
        doc = docx.Document(io.BytesIO(file_bytes))
        return "\n".join([p.text for p in doc.paragraphs if p.text])
    except Exception as e:
        logger.warning(f"python-docx extraction failed ({e}), using basic string decoding.")
        return file_bytes.decode("utf-8", errors="ignore")

def extract_structural_blocks(text: str) -> Dict[str, str]:
    blocks = {
        "Experience": "",
        "Projects": "",
        "Education": "",
        "Tech Stack": ""
    }
    
    current_section = "Experience"
    lines = text.split("\n")
    
    for line in lines:
        l_lower = line.lower().strip()
        if any(h in l_lower for h in ["experience", "work history", "employment"]):
            current_section = "Experience"
        elif any(h in l_lower for h in ["project", "key projects"]):
            current_section = "Projects"
        elif any(h in l_lower for h in ["education", "academic", "degree", "university"]):
            current_section = "Education"
        elif any(h in l_lower for h in ["skill", "technical stack", "technologies", "tools"]):
            current_section = "Tech Stack"
        
        blocks[current_section] += line + "\n"
        
    return blocks

def estimate_experience_years(text: str) -> float:
    years = re.findall(r'\b(19\d\d|20[0-2]\d)\b', text)
    if len(years) >= 2:
        num_years = [int(y) for y in years]
        min_y, max_y = min(num_years), max(num_years)
        diff = max_y - min_y
        if 0 < diff <= 35:
            return float(diff)

    exp_match = re.search(r'(\d+)\+?\s*years?\s*(?:of)?\s*experience', text, re.IGNORECASE)
    if exp_match:
        return float(exp_match.group(1))
        
    return 3.5  # Default default realistic estimate

def extract_recent_job_titles(text: str) -> List[str]:
    titles = []
    known_titles = [
        "Data Scientist", "Senior Data Scientist", "Lead Data Scientist",
        "Machine Learning Engineer", "AI Engineer", "MLOps Engineer",
        "Data Analyst", "Senior Data Analyst", "Business Analyst", "BI Developer",
        "Data Engineer", "Big Data Engineer", "Software Engineer", "Backend Developer",
        "Analytics Manager", "Research Scientist", "Quantitative Analyst"
    ]
    
    text_lower = text.lower()
    for title in known_titles:
        if title.lower() in text_lower:
            titles.append(title)
            
    if not titles:
        titles = ["Data Analyst / Engineer"]
        
    return titles[:3]

def detect_skill_recency_and_decay(text: str, structural_blocks: Dict[str, str]) -> Tuple[Dict[str, float], Dict[str, float]]:
    """
    Detects when skills were last used based on work history dates.
    Applies exponential decay: decay_factor = exp(-0.10 * years_since_last_used).
    Returns: (skill_decay_factors, skill_years_ago)
    """
    extracted_by_dim = extract_skills_from_text(text)
    all_skills = []
    for s_list in extracted_by_dim.values():
        all_skills.extend(s_list)
        
    skill_years_ago: Dict[str, float] = {}
    skill_decay_factors: Dict[str, float] = {}
    
    exp_text = structural_blocks.get("Experience", "")
    edu_text = structural_blocks.get("Education", "")
    
    for skill in set(all_skills):
        skill_lower = skill.lower()
        
        # Check if mentioned in Experience block vs Education block only
        in_exp = skill_lower in exp_text.lower()
        in_edu = skill_lower in edu_text.lower()
        
        if in_exp:
            # Check for recent years attached to experience
            years_in_exp = [int(y) for y in re.findall(r'\b(20[0-2]\d)\b', exp_text)]
            if years_in_exp:
                most_recent_year = max(years_in_exp)
                years_ago = max(0.0, float(CURRENT_YEAR - most_recent_year))
            else:
                years_ago = 0.5  # Active/Recent role
        elif in_edu:
            years_in_edu = [int(y) for y in re.findall(r'\b(20[0-2]\d)\b', edu_text)]
            if years_in_edu:
                grad_year = max(years_in_edu)
                years_ago = max(1.0, float(CURRENT_YEAR - grad_year))
            else:
                years_ago = 4.0  # Used during college/degree
        else:
            years_ago = 1.5
            
        skill_years_ago[skill] = years_ago
        # Exponential skill decay formula
        decay = math.exp(-0.10 * years_ago)
        skill_decay_factors[skill] = round(decay, 3)
        
    return skill_decay_factors, skill_years_ago

def parse_candidate_resume(
    file_bytes: bytes = None,
    filename: str = "resume.pdf",
    raw_text_input: str = None,
    candidate_name: str = None
) -> Dict[str, Any]:
    if raw_text_input:
        text = raw_text_input
    elif file_bytes:
        if filename.lower().endswith(".docx"):
            text = extract_text_from_docx(file_bytes)
        else:
            text = extract_text_from_pdf(file_bytes)
    else:
        text = "Experienced Senior Data Scientist with expertise in Python, PyTorch, SQL, Tableau, Spark, Linear Algebra, and A/B Testing."

    if not candidate_name:
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        candidate_name = lines[0] if lines else "Candidate Profile"
        if len(candidate_name) > 40 or any(c in candidate_name for c in [":", "@", "/", "\\"]):
            candidate_name = f"Candidate_{uuid.uuid4().hex[:6]}"

    structural_blocks = extract_structural_blocks(text)
    total_exp_years = estimate_experience_years(text)
    recent_titles = extract_recent_job_titles(text)
    
    # Skill Extraction
    extracted_skills_dict = extract_skills_from_text(text)
    skill_decay_factors, skill_years_ago = detect_skill_recency_and_decay(text, structural_blocks)
    
    # Compute candidate scores across 5 dimensions (scale 1.0 to 5.0)
    dimension_scores = {}
    for dim_key, skills in extracted_skills_dict.items():
        if not skills:
            base_score = 1.5
        else:
            # Average decay factor for skills in this dimension
            avg_decay = sum(skill_decay_factors.get(s, 1.0) for s in skills) / len(skills)
            depth_bonus = min(2.0, len(skills) * 0.7)
            exp_bonus = min(1.0, total_exp_years * 0.1)
            base_score = 1.8 + depth_bonus * avg_decay + exp_bonus
            
        dimension_scores[dim_key] = round(min(5.0, max(1.0, base_score)), 2)

    # Compute Candidate Composite Score using empirical correlation weights:
    # Composite Score = (0.28 * Math_Stats) + (0.28 * Dashboard_Storytelling) + (0.22 * Coding) + (0.17 * AI_ML) + (0.05 * Big_Data)
    composite_score = (
        0.28 * dimension_scores["maths_stats"] +
        0.28 * dimension_scores["dashboard_storytelling"] +
        0.22 * dimension_scores["coding"] +
        0.17 * dimension_scores["ai_ml"] +
        0.05 * dimension_scores["big_data"]
    )
    composite_score = round(composite_score, 2)
    composite_score_pct = round((composite_score / 5.0) * 100, 1)

    # Vector embedding of candidate experience
    candidate_vector = encode_text(text)
    candidate_id = f"cand_{uuid.uuid4().hex[:8]}"

    return {
        "candidate_id": candidate_id,
        "filename": filename,
        "candidate_name": candidate_name,
        "total_experience_years": total_exp_years,
        "recent_job_titles": recent_titles,
        "structural_blocks": structural_blocks,
        "extracted_skills": extracted_skills_dict,
        "dimension_scores": dimension_scores,
        "composite_score": composite_score,
        "composite_score_pct": composite_score_pct,
        "skill_recency_decay": {
            "decay_factors": skill_decay_factors,
            "years_ago": skill_years_ago
        },
        "raw_text": text,
        "vector_embedding": candidate_vector.tolist()
    }
