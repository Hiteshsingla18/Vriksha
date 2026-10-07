import re
import uuid
from typing import Dict, List, Any
from app.nlp.skill_taxonomy import extract_skills_from_text
from app.nlp.embeddings import encode_text

def deconstruct_job_description(
    raw_text: str = None,
    job_designation: str = None,
    min_experience: float = 0.0,
    max_experience: float = 10.0,
    stated_requirements: List[str] = None
) -> Dict[str, Any]:
    full_text = ""
    if job_designation:
        full_text += f"Role: {job_designation}\n"
    if raw_text:
        full_text += f"{raw_text}\n"
    if stated_requirements:
        full_text += "Requirements:\n" + "\n".join(f"- {req}" for req in stated_requirements)

    if not full_text.strip():
        full_text = "Data Science & Analytics Engineer position requiring Python, SQL, Statistics, Machine Learning, and Tableau."

    # Extract skills per dimension
    extracted_skills_dict = extract_skills_from_text(full_text)
    
    # Calculate score requirement (1.0 to 5.0 scale) per dimension based on extracted skill counts
    dimension_scores = {}
    total_found_skills = []
    
    for dim_key, skills in extracted_skills_dict.items():
        total_found_skills.extend(skills)
        count = len(skills)
        if count == 0:
            score = 2.0  # Base line threshold
        elif count == 1:
            score = 3.2
        elif count == 2:
            score = 4.0
        elif count >= 3:
            score = 4.8 + min(0.2, (count - 3) * 0.05)
        dimension_scores[dim_key] = round(score, 2)

    # Adjust dimension scores based on explicit designation hints
    desig_lower = (job_designation or "").lower()
    if any(k in desig_lower for k in ["statistician", "quant", "math"]):
        dimension_scores["maths_stats"] = max(dimension_scores["maths_stats"], 4.8)
    if any(k in desig_lower for k in ["software", "developer", "engineer", "backend"]):
        dimension_scores["coding"] = max(dimension_scores["coding"], 4.8)
    if any(k in desig_lower for k in ["ml", "machine learning", "ai", "deep learning"]):
        dimension_scores["ai_ml"] = max(dimension_scores["ai_ml"], 4.8)
    if any(k in desig_lower for k in ["bi", "tableau", "dashboard", "storyteller", "analyst"]):
        dimension_scores["dashboard_storytelling"] = max(dimension_scores["dashboard_storytelling"], 4.8)
    if any(k in desig_lower for k in ["big data", "data engineer", "spark", "architect"]):
        dimension_scores["big_data"] = max(dimension_scores["big_data"], 4.8)

    # Experience estimation if not explicitly provided
    if min_experience == 0.0 and max_experience == 10.0:
        exp_match = re.search(r'(\d+)\s*[-to]+\s*(\d+)\s*yrs?', full_text, re.IGNORECASE)
        if exp_match:
            min_experience = float(exp_match.group(1))
            max_experience = float(exp_match.group(2))

    # Mandatory keywords extraction
    mandatory_keywords = list(set(total_found_skills))[:10]

    # Vector embedding generation using sentence-transformers
    target_vector = encode_text(full_text)

    job_id = f"job_{uuid.uuid4().hex[:8]}"

    return {
        "job_id": job_id,
        "job_designation": job_designation or "Data Science & Analytics Specialist",
        "min_experience": min_experience,
        "max_experience": max_experience,
        "competency_dimensions": dimension_scores,
        "empirical_weights": {
            "maths_stats": 0.28,
            "dashboard_storytelling": 0.28,
            "coding": 0.22,
            "ai_ml": 0.17,
            "big_data": 0.05
        },
        "extracted_skills": total_found_skills,
        "mandatory_keywords": mandatory_keywords,
        "raw_text": full_text,
        "vector_embedding": target_vector.tolist()
    }
