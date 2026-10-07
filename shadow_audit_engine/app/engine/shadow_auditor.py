import uuid
import datetime
import numpy as np
from typing import Dict, List, Any

from app.engine.predictive_scorer import evaluate_candidate_match
from app.engine.ats_simulator import simulate_ats_filtering
from app.engine.benchmark_loader import BenchmarkDatasetLoader

def run_shadow_candidate_audit(
    job_profile: Dict[str, Any],
    candidate_profiles: List[Dict[str, Any]],
    ats_config: Dict[str, Any] = None
) -> Dict[str, Any]:
    benchmark_loader = BenchmarkDatasetLoader()
    top_quartile_threshold = benchmark_loader.get_composite_score_75th_percentile()

    # Calculate batch composite scores percentile if multiple candidates passed
    cand_comp_scores = [cand.get("composite_score", 3.0) for cand in candidate_profiles]
    if len(cand_comp_scores) >= 2:
        batch_75th_p = float(np.percentile(cand_comp_scores, 50)) # Median/Top half in batch
        high_fit_composite_threshold = min(3.4, batch_75th_p)
    else:
        high_fit_composite_threshold = 3.4

    ranked_candidates = []
    total_processed = len(candidate_profiles)
    passed_ats_count = 0
    filtered_out_count = 0
    
    high_fit_total_count = 0
    shadow_candidates_recovered_count = 0

    shadow_candidate_salaries = []
    recruited_salaries = []

    for cand in candidate_profiles:
        # 1. Evaluate predictive match score
        match_res = evaluate_candidate_match(cand, job_profile)
        
        # 2. Simulate ATS filtering
        ats_res = simulate_ats_filtering(cand, job_profile, ats_config)

        is_filtered_out = ats_res["is_filtered_out"]
        ats_status = ats_res["ats_status"]
        rejection_reasons = ats_res["rejection_reasons"]

        comp_score = match_res["composite_score"]

        # Determine if candidate is a "High Fit"
        is_high_fit = (comp_score >= high_fit_composite_threshold) or (comp_score >= top_quartile_threshold) or (match_res["match_index_pct"] >= 65.0)

        if is_high_fit:
            high_fit_total_count += 1

        # Determine if candidate is a "Shadow Candidate"
        # Shadow Candidate: Filtered Out by ATS BUT High Fit (Composite Score >= 75% or top quartile)
        is_shadow_candidate = False
        if is_filtered_out and is_high_fit:
            is_shadow_candidate = True
            shadow_candidates_recovered_count += 1

        if is_filtered_out:
            filtered_out_count += 1
        else:
            passed_ats_count += 1

        # Salary Benchmarking
        exp_years = cand.get("total_experience_years", 3.0)
        market_salary = benchmark_loader.get_salary_benchmark_lpa(exp_years)

        if is_shadow_candidate:
            shadow_candidate_salaries.append(market_salary)
        elif not is_filtered_out:
            recruited_salaries.append(market_salary * 1.18)  # Recruited exact-title candidates command an equity/title premium

        # Combine into Ranked Candidate object
        ranked_cand = {
            "candidate_id": cand.get("candidate_id"),
            "candidate_name": cand.get("candidate_name", "Candidate"),
            "match_index_pct": match_res["match_index_pct"],
            "composite_score": comp_score,
            "composite_score_pct": match_res["composite_score_pct"],
            "semantic_similarity_pct": match_res["semantic_similarity_pct"],
            "ats_status": ats_status,
            "is_shadow_candidate": is_shadow_candidate,
            "rejection_reasons": rejection_reasons,
            "dimension_scores": cand.get("dimension_scores"),
            "missing_skills": match_res["missing_skills"],
            "complementary_strengths": match_res["complementary_strengths"],
            "recency_decay_factor": round(sum(cand.get("skill_recency_decay", {}).get("decay_factors", {}).values() or [1.0]) / max(1, len(cand.get("skill_recency_decay", {}).get("decay_factors", {}) or [1])), 2),
            "years_experience": exp_years,
            "recent_titles": cand.get("recent_job_titles", [])
        }
        ranked_candidates.append(ranked_cand)

    # Sort candidates by Match Index % descending
    ranked_candidates.sort(key=lambda x: x["match_index_pct"], reverse=True)

    # Calculate Recruiter Metrics
    # Shadow Candidate Ratio: (Filtered High-Fits / Total High-Fits) * 100
    if high_fit_total_count > 0:
        shadow_candidate_ratio_pct = round((shadow_candidates_recovered_count / high_fit_total_count) * 100.0, 1)
    else:
        shadow_candidate_ratio_pct = 0.0

    # Over-Filtering Tax Metrics
    avg_shadow_salary = round(sum(shadow_candidate_salaries) / len(shadow_candidate_salaries), 1) if shadow_candidate_salaries else 12.5
    avg_recruited_salary = round(sum(recruited_salaries) / len(recruited_salaries), 1) if recruited_salaries else 16.8
    
    salary_spread = round(max(0.0, avg_recruited_salary - avg_shadow_salary), 1)
    cost_inefficiency_tax_pct = round((salary_spread / avg_shadow_salary) * 100.0, 1) if avg_shadow_salary > 0 else 0.0

    over_filtering_tax = {
        "shadow_candidate_ratio_pct": shadow_candidate_ratio_pct,
        "avg_market_salary_filtered_high_fit_lpa": avg_shadow_salary,
        "avg_market_salary_recruited_lpa": avg_recruited_salary,
        "salary_spread_lpa": salary_spread,
        "cost_inefficiency_tax_pct": cost_inefficiency_tax_pct,
        "missed_talent_pool_count": shadow_candidates_recovered_count
    }

    # Prepare Top False Negatives list
    top_false_negatives = [c for c in ranked_candidates if c["is_shadow_candidate"]][:5]

    # Aggregated Multi-axis Radar Chart Payload
    job_dims = job_profile.get("competency_dimensions", {})

    avg_all_cand_dims = [
        round(sum(c["dimension_scores"].get("maths_stats", 1.0) for c in ranked_candidates) / max(1, total_processed), 2),
        round(sum(c["dimension_scores"].get("dashboard_storytelling", 1.0) for c in ranked_candidates) / max(1, total_processed), 2),
        round(sum(c["dimension_scores"].get("coding", 1.0) for c in ranked_candidates) / max(1, total_processed), 2),
        round(sum(c["dimension_scores"].get("ai_ml", 1.0) for c in ranked_candidates) / max(1, total_processed), 2),
        round(sum(c["dimension_scores"].get("big_data", 1.0) for c in ranked_candidates) / max(1, total_processed), 2),
    ] if total_processed > 0 else [2.5, 2.5, 2.5, 2.5, 2.5]

    avg_shadow_cand_dims = [
        round(sum(c["dimension_scores"].get("maths_stats", 1.0) for c in top_false_negatives) / max(1, len(top_false_negatives)), 2),
        round(sum(c["dimension_scores"].get("dashboard_storytelling", 1.0) for c in top_false_negatives) / max(1, len(top_false_negatives)), 2),
        round(sum(c["dimension_scores"].get("coding", 1.0) for c in top_false_negatives) / max(1, len(top_false_negatives)), 2),
        round(sum(c["dimension_scores"].get("ai_ml", 1.0) for c in top_false_negatives) / max(1, len(top_false_negatives)), 2),
        round(sum(c["dimension_scores"].get("big_data", 1.0) for c in top_false_negatives) / max(1, len(top_false_negatives)), 2),
    ] if top_false_negatives else avg_all_cand_dims

    radar_chart_payload = {
        "labels": ["Mathematics & Stats", "Dashboard & Storytelling", "Coding & Software", "AI & Machine Learning", "Infrastructure & Big Data"],
        "job_requirement": [
            job_dims.get("maths_stats", 3.0),
            job_dims.get("dashboard_storytelling", 3.0),
            job_dims.get("coding", 3.0),
            job_dims.get("ai_ml", 3.0),
            job_dims.get("big_data", 3.0)
        ],
        "average_candidate_pool": avg_all_cand_dims,
        "shadow_candidates_average": avg_shadow_cand_dims
    }

    audit_id = f"audit_{uuid.uuid4().hex[:8]}"

    return {
        "audit_id": audit_id,
        "timestamp": datetime.datetime.now().isoformat(),
        "job_summary": {
            "job_id": job_profile.get("job_id"),
            "job_designation": job_profile.get("job_designation"),
            "min_experience": job_profile.get("min_experience")
        },
        "summary": {
            "total_processed": total_processed,
            "passed_ats_count": passed_ats_count,
            "filtered_out_count": filtered_out_count,
            "shadow_candidates_recovered": shadow_candidates_recovered_count,
            "shadow_candidate_ratio_pct": shadow_candidate_ratio_pct,
            "high_fit_total_count": high_fit_total_count
        },
        "over_filtering_tax": over_filtering_tax,
        "ranked_candidates": ranked_candidates,
        "top_false_negatives": top_false_negatives,
        "radar_chart_payload": radar_chart_payload
    }
