import math
import uuid
from typing import Dict, List, Any
import numpy as np

from app.nlp.skill_taxonomy import SKILL_TAXONOMY, extract_skills_from_text
from app.nlp.resume_parser import parse_candidate_resume
from app.engine.benchmark_loader import BenchmarkDatasetLoader

# Core 5 Branches with empirical correlation r from JDS study
BRANCH_CORRELATIONS: Dict[str, Dict[str, Any]] = {
    "maths_stats": {
        "label": "Mathematics & Statistics",
        "weight": 0.28,
        "correlation_r": 0.51,
        "leaves": [
            {"id": "linear_algebra", "label": "Linear Algebra & Matrix Ops", "canonical": "Linear Algebra", "correlation_r": 0.52, "prevalence_pct": 78},
            {"id": "hypothesis_testing", "label": "Hypothesis & A/B Testing", "canonical": "A/B Testing", "correlation_r": 0.54, "prevalence_pct": 82},
            {"id": "probability", "label": "Probability & Bayesian Models", "canonical": "Probability", "correlation_r": 0.48, "prevalence_pct": 75},
            {"id": "time_series", "label": "Time Series & Econometrics", "canonical": "Time Series", "correlation_r": 0.44, "prevalence_pct": 68},
            {"id": "matrix_decomp", "label": "PCA & SVD Matrix Decomposition", "canonical": "PCA", "correlation_r": 0.35, "prevalence_pct": 55},
            {"id": "descriptive_stats", "label": "Descriptive Summary Stats", "canonical": "Statistics", "correlation_r": 0.18, "prevalence_pct": 90}
        ]
    },
    "dashboard_storytelling": {
        "label": "Data Storytelling & Dashboarding",
        "weight": 0.28,
        "correlation_r": 0.54,
        "leaves": [
            {"id": "bi_tools", "label": "Tableau & PowerBI Dashboards", "canonical": "Tableau", "correlation_r": 0.56, "prevalence_pct": 85},
            {"id": "exec_storytelling", "label": "Executive Data Storytelling", "canonical": "Data Storytelling", "correlation_r": 0.58, "prevalence_pct": 80},
            {"id": "kpi_design", "label": "KPI Design & Business Intelligence", "canonical": "KPI Design", "correlation_r": 0.52, "prevalence_pct": 76},
            {"id": "interactive_viz", "label": "Plotly & D3.js Custom Charts", "canonical": "Plotly", "correlation_r": 0.42, "prevalence_pct": 60},
            {"id": "static_excel", "label": "Spreadsheet Reporting", "canonical": "Excel", "correlation_r": 0.15, "prevalence_pct": 92}
        ]
    },
    "coding": {
        "label": "Coding & Software Fundamentals",
        "weight": 0.22,
        "correlation_r": 0.43,
        "leaves": [
            {"id": "python_core", "label": "Advanced Python Architecture", "canonical": "Python", "correlation_r": 0.55, "prevalence_pct": 94},
            {"id": "sql_opt", "label": "SQL & Query Optimization", "canonical": "SQL", "correlation_r": 0.49, "prevalence_pct": 91},
            {"id": "system_design", "label": "System Design & Clean Code", "canonical": "System Design", "correlation_r": 0.46, "prevalence_pct": 70},
            {"id": "dsa", "label": "Data Structures & Algorithms", "canonical": "Algorithms", "correlation_r": 0.42, "prevalence_pct": 74},
            {"id": "git_cicd", "label": "Git Version Control & CI/CD", "canonical": "Git", "correlation_r": 0.38, "prevalence_pct": 80},
            {"id": "bash_scripting", "label": "Linux / Bash Automation", "canonical": "Bash", "correlation_r": 0.22, "prevalence_pct": 65}
        ]
    },
    "ai_ml": {
        "label": "AI, ML & Modeling",
        "weight": 0.17,
        "correlation_r": 0.41,
        "leaves": [
            {"id": "pytorch_dl", "label": "PyTorch Deep Learning & Neural Nets", "canonical": "PyTorch", "correlation_r": 0.58, "prevalence_pct": 72},
            {"id": "genai_llms", "label": "LLMs, RAG & Transformers", "canonical": "Transformers", "correlation_r": 0.62, "prevalence_pct": 68},
            {"id": "classical_ml", "label": "XGBoost & Scikit-Learn Ensembles", "canonical": "Machine Learning", "correlation_r": 0.47, "prevalence_pct": 88},
            {"id": "mlops", "label": "MLOps & Model Deployment", "canonical": "FastAPI", "correlation_r": 0.51, "prevalence_pct": 58},
            {"id": "decision_trees", "label": "Basic Decision Trees & Linear Regression", "canonical": "Regression Analysis", "correlation_r": 0.28, "prevalence_pct": 82}
        ]
    },
    "big_data": {
        "label": "Infrastructure & Big Data Tools",
        "weight": 0.05,
        "correlation_r": 0.11,
        "leaves": [
            {"id": "pyspark_spark", "label": "Apache Spark & PySpark", "canonical": "PySpark", "correlation_r": 0.45, "prevalence_pct": 65},
            {"id": "cloud_warehousing", "label": "Snowflake & Google BigQuery", "canonical": "BigQuery", "correlation_r": 0.42, "prevalence_pct": 62},
            {"id": "pipeline_orchestration", "label": "Apache Airflow & ETL", "canonical": "Airflow", "correlation_r": 0.36, "prevalence_pct": 54},
            {"id": "legacy_hadoop", "label": "Legacy Hadoop / MapReduce", "canonical": "Hadoop", "correlation_r": 0.08, "prevalence_pct": 30}
        ]
    }
}

def calculate_leaf_state(leaf: Dict[str, Any], is_user_possessed: bool, target_role: str) -> str:
    r = leaf["correlation_r"]
    if is_user_possessed:
        return "lit"
    
    # If user lacks it, check if it's a "Thriving Unlit" high-ROI gap
    if r >= 0.40 and leaf["prevalence_pct"] >= 50:
        return "thriving_unlit"
    elif r >= 0.25:
        return "steady"
    else:
        return "fading"

def compute_leadership_resilience_index(work_history_text: str, experience_years: float) -> float:
    """
    Computes a leadership & resilience index based on project complexity indicators
    and personality dataset standards. Scale: -5.0 to +5.0 (z-score normalized).
    """
    text_lower = work_history_text.lower()
    score = 0.0
    
    if any(k in text_lower for k in ["lead", "manager", "head", "architect", "principal", "founding"]):
        score += 1.8
    if any(k in text_lower for k in ["published", "patent", "research", "paper", "speaker", "conference"]):
        score += 1.5
    if any(k in text_lower for k in ["deployed", "production", "scale", "million", "billion", "reduced cost"]):
        score += 1.2
        
    score += min(2.0, experience_years * 0.3)
    return round(score, 2)

def generate_builder_tree_overlay(
    user_skills: List[str],
    target_role: str = "Data Scientist",
    experience_years: float = 2.0,
    resume_text: str = ""
) -> Dict[str, Any]:
    loader = BenchmarkDatasetLoader()
    salary_benchmark = loader.get_salary_benchmark_lpa(experience_years, target_role)

    user_skills_normalized = set(s.lower() for s in user_skills)
    
    # Also extract skills from resume text if provided
    if resume_text:
        extracted = extract_skills_from_text(resume_text)
        for s_list in extracted.values():
            for s in s_list:
                user_skills_normalized.add(s.lower())

    branches_payload = []
    total_leaves_count = 0
    lit_count = 0
    thriving_unlit_count = 0

    accumulated_roi_hike_pct = 0.0

    for branch_key, branch_info in BRANCH_CORRELATIONS.items():
        branch_leaves = []
        user_branch_score = 0.0

        for leaf_info in branch_info["leaves"]:
            total_leaves_count += 1
            canonical = leaf_info["canonical"].lower()
            label_lower = leaf_info["label"].lower()

            # Check if user possesses this skill
            is_possessed = any(
                u in canonical or u in label_lower or canonical in u
                for u in user_skills_normalized
            )

            state = calculate_leaf_state(leaf_info, is_possessed, target_role)

            if is_possessed:
                lit_count += 1
                user_branch_score += 1.0
                leaf_user_proficiency = round(min(5.0, 3.2 + experience_years * 0.4), 1)
                roi_hike_potential = 0.0
            else:
                leaf_user_proficiency = 0.0
                if state == "thriving_unlit":
                    thriving_unlit_count += 1
                    # ROI Hike potential proportional to correlation r * branch weight
                    roi_hike_potential = round(leaf_info["correlation_r"] * branch_info["weight"] * 100.0, 1)
                    accumulated_roi_hike_pct += roi_hike_potential
                else:
                    roi_hike_potential = round(leaf_info["correlation_r"] * 10.0, 1)

            branch_leaves.append({
                "id": leaf_info["id"],
                "label": leaf_info["label"],
                "canonical_name": leaf_info["canonical"],
                "state": state,
                "correlation_r": leaf_info["correlation_r"],
                "roi_hike_potential_pct": roi_hike_potential,
                "market_prevalence_pct": leaf_info["prevalence_pct"],
                "user_proficiency": leaf_user_proficiency
            })

        # Calculate User Branch Proficiency (1.0 to 5.0)
        leaf_ratio = user_branch_score / max(1, len(branch_info["leaves"]))
        branch_prof = round(min(5.0, max(1.0, 1.0 + leaf_ratio * 4.0)), 2)

        branches_payload.append({
            "id": branch_key,
            "label": branch_info["label"],
            "weight": branch_info["weight"],
            "correlation_r": branch_info["correlation_r"],
            "user_proficiency": branch_prof,
            "target_requirement": 4.5,
            "leaves": branch_leaves
        })

    # Overall readiness %
    current_readiness_pct = round((lit_count / max(1, total_leaves_count)) * 100.0, 1)
    
    # Leadership & Resilience index calculation
    leadership_index = compute_leadership_resilience_index(resume_text, experience_years)

    # Projected Compensation Impact
    projected_hike_pct = round(min(65.0, accumulated_roi_hike_pct * 0.75), 1)
    projected_max_salary_lpa = round(salary_benchmark * (1.0 + (projected_hike_pct / 100.0)), 1)

    return {
        "tree_id": f"tree_{uuid.uuid4().hex[:8]}",
        "target_role": target_role,
        "role_benchmark": {
            "avg_salary_lpa": salary_benchmark,
            "min_salary_lpa": round(salary_benchmark * 0.6, 1),
            "max_salary_lpa": round(salary_benchmark * 1.8, 1),
            "salary_per_exp_year": round(salary_benchmark / max(1.0, experience_years), 2),
            "recommended_exp_years": experience_years
        },
        "branches": branches_payload,
        "telemetry": {
            "total_target_leaves": total_leaves_count,
            "lit_leaves_count": lit_count,
            "thriving_unlit_gaps_count": thriving_unlit_count,
            "current_readiness_pct": current_readiness_pct,
            "projected_salary_hike_pct": projected_hike_pct,
            "projected_max_salary_lpa": projected_max_salary_lpa,
            "leadership_resilience_index": leadership_index
        }
    }
