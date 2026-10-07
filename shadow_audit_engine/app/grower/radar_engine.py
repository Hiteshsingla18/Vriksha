"""
radar_engine.py
Calculates polar radar coordinates, skill health scores, and modernization blip metrics
grounded in empirical JDS Skill Traits correlation data.
"""

import math
from typing import List, Dict, Any, Tuple, Optional
from app.api.schemas_radar import (
    RadarScanRequest,
    RadarScanResponse,
    RadarBlip,
    RadarZone,
)

# Comprehensive Data Science & Analytics Skill Taxonomy mapped to Empirical JDS Correlations
SKILL_TAXONOMY_DATABASE = {
    # Dashboard & Metric Storytelling (r = 0.544, weight = 0.28)
    "metric_storytelling": {
        "name": "Metric Storytelling & Business Causal Decking",
        "dimension": "dashboard_and_storytelling_skills",
        "zone": RadarZone.THRIVING,
        "correlation_r": 0.544,
        "base_angle": 36.0,
        "radius_pct": 22.0,
        "demand_pct": 92.0,
        "lpa_impact": 8.5,
        "remediation_path": "Transition static BI reports to executive causal narrative dashboards linking metrics directly to EBITDA.",
    },
    "tableau_powerbi": {
        "name": "Advanced Tableau & PowerBI DAX Modeling",
        "dimension": "dashboard_and_storytelling_skills",
        "zone": RadarZone.TRANSITION,
        "correlation_r": 0.380,
        "base_angle": 54.0,
        "radius_pct": 58.0,
        "demand_pct": 78.0,
        "lpa_impact": 3.2,
        "remediation_path": "Upgrade drag-and-drop charts to automated semantic data layers (dbt + Cube.js) with dynamic DAX measures.",
    },
    "excel_vba_macros": {
        "name": "Legacy Excel VBA & Manual Reporting Macros",
        "dimension": "dashboard_and_storytelling_skills",
        "zone": RadarZone.AT_RISK,
        "correlation_r": 0.120,
        "base_angle": 18.0,
        "radius_pct": 88.0,
        "demand_pct": 34.0,
        "lpa_impact": -2.5,
        "remediation_path": "Migrate manual VBA script workflows to automated Python/Pandas data pipelines and Streamlit apps.",
    },

    # Mathematics & Statistical Modeling (r = 0.515, weight = 0.28)
    "causal_inference_ab": {
        "name": "Causal Inference & Synthetic Control A/B Testing",
        "dimension": "maths_stats_skills",
        "zone": RadarZone.THRIVING,
        "correlation_r": 0.515,
        "base_angle": 108.0,
        "radius_pct": 28.0,
        "demand_pct": 89.0,
        "lpa_impact": 7.8,
        "remediation_path": "Master Difference-in-Differences and Propensity Score Matching for non-randomized experiment evaluation.",
    },
    "bayesian_statistics": {
        "name": "Bayesian Modeling & Probabilistic Programming",
        "dimension": "maths_stats_skills",
        "zone": RadarZone.TRANSITION,
        "correlation_r": 0.350,
        "base_angle": 126.0,
        "radius_pct": 52.0,
        "demand_pct": 68.0,
        "lpa_impact": 3.5,
        "remediation_path": "Incorporate PyMC/Stan probabilistic modeling for uncertainty estimation in financial and churn forecasts.",
    },
    "spss_sas_legacy": {
        "name": "Legacy SPSS / SAS Base Statistical Tools",
        "dimension": "maths_stats_skills",
        "zone": RadarZone.AT_RISK,
        "correlation_r": 0.110,
        "base_angle": 90.0,
        "radius_pct": 82.0,
        "demand_pct": 28.0,
        "lpa_impact": -3.0,
        "remediation_path": "Replace legacy SAS PROC procedures with open-source Python SciPy/Statsmodels scripts.",
    },

    # Coding & Pipeline Engineering (r = 0.434, weight = 0.22)
    "async_vectorized_python": {
        "name": "Vectorized PySpark & Async FastAPI Microservices",
        "dimension": "coding_skills",
        "zone": RadarZone.THRIVING,
        "correlation_r": 0.434,
        "base_angle": 180.0,
        "radius_pct": 25.0,
        "demand_pct": 95.0,
        "lpa_impact": 6.5,
        "remediation_path": "Convert synchronous Python scripts into non-blocking FastAPI async endpoints with vectorized NumPy backends.",
    },
    "sql_dbt_transformation": {
        "name": "Modular SQL & dbt Cloud Analytics Engineering",
        "dimension": "coding_skills",
        "zone": RadarZone.TRANSITION,
        "correlation_r": 0.360,
        "base_angle": 198.0,
        "radius_pct": 62.0,
        "demand_pct": 82.0,
        "lpa_impact": 3.8,
        "remediation_path": "Package ad-hoc SQL scripts into version-controlled dbt models with automated schema testing.",
    },
    "unvectorized_notebooks": {
        "name": "Ad-Hoc Jupyter Notebooks with Iterative .iterrows()",
        "dimension": "coding_skills",
        "zone": RadarZone.AT_RISK,
        "correlation_r": 0.140,
        "base_angle": 162.0,
        "radius_pct": 90.0,
        "demand_pct": 42.0,
        "lpa_impact": -2.0,
        "remediation_path": "Refactor notebook code into modular Python packages with standard OOP/functional abstractions.",
    },

    # AI & ML Architecture (r = 0.405, weight = 0.17)
    "mlops_model_serving": {
        "name": "MLOps Containerization & Real-time Inference",
        "dimension": "ai_and_ml_skills",
        "zone": RadarZone.THRIVING,
        "correlation_r": 0.405,
        "base_angle": 252.0,
        "radius_pct": 32.0,
        "demand_pct": 91.0,
        "lpa_impact": 7.0,
        "remediation_path": "Deploy trained Scikit/PyTorch models as Dockerized microservices with MLflow tracking and drift monitoring.",
    },
    "scikit_learn_modeling": {
        "name": "Standard Scikit-Learn Supervised Classification",
        "dimension": "ai_and_ml_skills",
        "zone": RadarZone.TRANSITION,
        "correlation_r": 0.320,
        "base_angle": 270.0,
        "radius_pct": 55.0,
        "demand_pct": 76.0,
        "lpa_impact": 3.0,
        "remediation_path": "Upgrade standard fit/predict loops to automated hyperparameter tuning and custom feature transformers.",
    },
    "basic_weka_gui": {
        "name": "GUI-Based ML Utilities (Weka / Orange)",
        "dimension": "ai_and_ml_skills",
        "zone": RadarZone.AT_RISK,
        "correlation_r": 0.080,
        "base_angle": 234.0,
        "radius_pct": 86.0,
        "demand_pct": 18.0,
        "lpa_impact": -3.5,
        "remediation_path": "Migrate point-and-click GUI setups to version-controlled Python ML pipelines.",
    },

    # Big Data & Infrastructure (r = 0.106, weight = 0.05)
    "lakehouse_iceberg": {
        "name": "BigQuery / Snowflake & Iceberg Lakehouse Arch",
        "dimension": "big_data_skills",
        "zone": RadarZone.THRIVING,
        "correlation_r": 0.280,  # Relative modern weight
        "base_angle": 324.0,
        "radius_pct": 38.0,
        "demand_pct": 84.0,
        "lpa_impact": 5.2,
        "remediation_path": "Implement Apache Iceberg tables and zero-copy data sharing on BigQuery/Snowflake.",
    },
    "traditional_hadoop": {
        "name": "Legacy On-Prem MapReduce & Hadoop HDFS",
        "dimension": "big_data_skills",
        "zone": RadarZone.AT_RISK,
        "correlation_r": 0.050,
        "base_angle": 306.0,
        "radius_pct": 92.0,
        "demand_pct": 22.0,
        "lpa_impact": -4.0,
        "remediation_path": "Migrate legacy HDFS/MapReduce infrastructure to serverless cloud data warehouses.",
    }
}

class GrowerRadarEngine:
    """
    Core engine generating 3-Zone Polar Radar Blips, Market Health Scores,
    and modernization paths for practicing data science professionals.
    """

    def generate_radar_scan(self, request: RadarScanRequest) -> Tuple[List[RadarBlip], float, float, str, Optional[str]]:
        user_skills_lower = [s.lower().strip() for s in request.active_skills]
        blips: List[RadarBlip] = []
        
        green_active_count = 0
        red_active_count = 0
        total_green_count = 0
        net_potential_uplift = 0.0

        for skill_key, skill_meta in SKILL_TAXONOMY_DATABASE.items():
            is_active = any(
                skill_key in s_user or skill_meta["name"].lower() in s_user or s_user in skill_meta["name"].lower()
                for s_user in user_skills_lower
            )

            zone = skill_meta["zone"]
            if zone == RadarZone.THRIVING:
                total_green_count += 1
                if is_active:
                    green_active_count += 1
                else:
                    net_potential_uplift += skill_meta["lpa_impact"]
            elif zone == RadarZone.AT_RISK and is_active:
                red_active_count += 1

            if zone == RadarZone.TRANSITION and not is_active:
                net_potential_uplift += skill_meta["lpa_impact"] * 0.6

            blip = RadarBlip(
                id=f"blip_{skill_key}",
                name=skill_meta["name"],
                dimension=skill_meta["dimension"],
                zone=zone,
                polar_angle_deg=skill_meta["base_angle"],
                polar_radius_pct=skill_meta["radius_pct"],
                current_market_demand_pct=skill_meta["demand_pct"],
                salary_hike_correlation=skill_meta["correlation_r"],
                projected_lpa_impact=skill_meta["lpa_impact"],
                remediation_path=skill_meta["remediation_path"],
                is_user_active=is_active,
            )
            blips.append(blip)

        # Market Health Score calculation (0-100)
        # Base score = 60. +20 per active Green skill, -15 per active Red skill.
        health_score = 50.0 + (green_active_count * 15.0) - (red_active_count * 12.0)
        health_score = max(15.0, min(98.0, health_score))

        # Executive summary generation
        summary = (
            f"Radar scan evaluated {len(request.active_skills)} verified skills against the market dataset. "
            f"You possess {green_active_count} Green Zone high-velocity multipliers (e.g. Metric Storytelling / Vectorized Pipelines) "
            f"and {red_active_count} Red Zone legacy liabilities. Closing top Green/Yellow gaps can unlock "
            f"an estimated +₹{round(net_potential_uplift, 1)} LPA salary upside in your market."
        )

        # Executive Ceiling Warning check
        has_storytelling = any(
            b.dimension == "dashboard_and_storytelling_skills" and b.is_user_active
            for b in blips
        )
        has_strong_tech = any(
            b.dimension in ("coding_skills", "ai_and_ml_skills") and b.is_user_active
            for b in blips
        )

        executive_ceiling_warning = None
        if has_strong_tech and not has_storytelling:
            executive_ceiling_warning = (
                "⚠️ EXECUTIVE CEILING WARNING: Your profile exhibits strong technical & coding signals "
                "but lacks high-impact Metric Storytelling (r = 0.544). In Senior Data Scientist / Architect bands, "
                "inability to translate model telemetry to C-suite EBITDA limits compensation ceiling to median bands."
            )

        return blips, round(health_score, 1), round(net_potential_uplift, 1), summary, executive_ceiling_warning
