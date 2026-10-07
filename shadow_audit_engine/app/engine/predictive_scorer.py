from typing import Dict, List, Any
import numpy as np

from app.nlp.embeddings import cosine_similarity
from app.nlp.skill_taxonomy import get_dimension_name

def compute_empirical_composite_score(dimension_scores: Dict[str, float]) -> Dict[str, float]:
    """
    Computes candidate Composite Score using empirical correlation weights derived from JDS trait study:
    Composite Score = (0.28 * Math_Stats) + (0.28 * Dashboard_Storytelling) + (0.22 * Coding) + (0.17 * AI_ML) + (0.05 * Big_Data)
    """
    math_stats = dimension_scores.get("maths_stats", 1.0)
    storytelling = dimension_scores.get("dashboard_storytelling", 1.0)
    coding = dimension_scores.get("coding", 1.0)
    ai_ml = dimension_scores.get("ai_ml", 1.0)
    big_data = dimension_scores.get("big_data", 1.0)

    raw_score = (
        0.28 * math_stats +
        0.28 * storytelling +
        0.22 * coding +
        0.17 * ai_ml +
        0.05 * big_data
    )
    
    raw_score = round(raw_score, 2)
    score_pct = round((raw_score / 5.0) * 100.0, 1)

    return {
        "composite_score": raw_score,
        "composite_score_pct": score_pct
    }

def evaluate_candidate_match(
    candidate_profile: Dict[str, Any],
    job_profile: Dict[str, Any]
) -> Dict[str, Any]:
    cand_dim_scores = candidate_profile.get("dimension_scores", {})
    job_dim_scores = job_profile.get("competency_dimensions", {})

    # Compute Empirical Composite Score
    score_res = compute_empirical_composite_score(cand_dim_scores)
    cand_composite_score = score_res["composite_score"]
    cand_composite_pct = score_res["composite_score_pct"]

    # Compute Semantic Cosine Similarity
    cand_vec = candidate_profile.get("vector_embedding")
    job_vec = job_profile.get("vector_embedding")

    if cand_vec and job_vec:
        semantic_sim = cosine_similarity(np.array(cand_vec), np.array(job_vec))
    else:
        semantic_sim = 0.75  # Fallback default

    semantic_sim_pct = round(semantic_sim * 100.0, 1)

    # Calculate overall Match Index (0 - 100%)
    match_index_pct = round(0.65 * cand_composite_pct + 0.35 * semantic_sim_pct, 1)

    # Extract missing skills & complementary strengths
    cand_skills_flat = []
    for s_list in candidate_profile.get("extracted_skills", {}).values():
        if isinstance(s_list, list):
            cand_skills_flat.extend(s_list)

    job_req_skills = job_profile.get("extracted_skills", [])
    
    cand_skills_set = set(s.lower() for s in cand_skills_flat)
    job_skills_set = set(s.lower() for s in job_req_skills)

    missing_skills = [s for s in job_req_skills if s.lower() not in cand_skills_set][:5]
    complementary_strengths = [s for s in cand_skills_flat if s.lower() not in job_skills_set][:5]

    # Multi-axis radar breakdown payload
    radar_payload = {
        "labels": ["Mathematics & Stats", "Dashboard & Storytelling", "Coding & Software", "AI & Machine Learning", "Infrastructure & Big Data"],
        "candidate": [
            cand_dim_scores.get("maths_stats", 1.0),
            cand_dim_scores.get("dashboard_storytelling", 1.0),
            cand_dim_scores.get("coding", 1.0),
            cand_dim_scores.get("ai_ml", 1.0),
            cand_dim_scores.get("big_data", 1.0)
        ],
        "job_requirement": [
            job_dim_scores.get("maths_stats", 3.0),
            job_dim_scores.get("dashboard_storytelling", 3.0),
            job_dim_scores.get("coding", 3.0),
            job_dim_scores.get("ai_ml", 3.0),
            job_dim_scores.get("big_data", 3.0)
        ]
    }

    return {
        "candidate_id": candidate_profile.get("candidate_id"),
        "candidate_name": candidate_profile.get("candidate_name"),
        "match_index_pct": match_index_pct,
        "composite_score": cand_composite_score,
        "composite_score_pct": cand_composite_pct,
        "semantic_similarity_pct": semantic_sim_pct,
        "missing_skills": missing_skills,
        "complementary_strengths": complementary_strengths,
        "radar_payload": radar_payload
    }
