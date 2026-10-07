"""
routes_market_radar.py
FastAPI router for Grower Portal Market Recommendations Radar & Salary Spike Simulator.
"""

from fastapi import APIRouter, HTTPException, Path
from app.api.schemas_radar import (
    RadarScanRequest,
    RadarScanResponse,
    SkillDeepDiveResponse,
    RadarZone,
)
from app.grower.radar_engine import GrowerRadarEngine, SKILL_TAXONOMY_DATABASE
from app.grower.salary_spike_simulator import SalarySpikeSimulator

router = APIRouter(prefix="/api/v1/grower/radar", tags=["Grower Market Radar"])

radar_engine = GrowerRadarEngine()
salary_simulator = SalarySpikeSimulator()

@router.post("/scan", response_model=RadarScanResponse)
def execute_market_radar_scan(payload: RadarScanRequest) -> RadarScanResponse:
    """
    Executes a 3-Zone Sweeping Polar Skill Radar scan and simulates 4 compensation trajectory scenarios.
    """
    try:
        blips, health_score, net_uplift, summary, ceiling_warning = radar_engine.generate_radar_scan(payload)
        salary_curve = salary_simulator.simulate_trajectory(
            current_role=payload.current_role,
            experience_years=payload.experience_years,
            current_salary_lpa=payload.current_salary_lpa,
            primary_city=payload.primary_city,
            active_skills=payload.active_skills,
        )

        return RadarScanResponse(
            user_id=payload.user_id,
            role_evaluated=payload.current_role,
            market_health_score=health_score,
            net_potential_uplift_lpa=net_uplift,
            blips=blips,
            salary_curve=salary_curve,
            executive_summary=summary,
            executive_ceiling_warning=ceiling_warning,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Radar scan execution failed: {str(e)}")

@router.get("/skill/{skill_id}", response_model=SkillDeepDiveResponse)
def get_skill_deep_dive(
    skill_id: str = Path(..., description="Unique skill ID (e.g. blip_metric_storytelling)")
) -> SkillDeepDiveResponse:
    """
    Returns granular market demand metrics, metro distributions, and transition roadmaps for a selected skill.
    """
    key = skill_id.replace("blip_", "").strip().lower()
    skill_meta = SKILL_TAXONOMY_DATABASE.get(key)
    
    if not skill_meta:
        # Fallback response for unlisted skills
        return SkillDeepDiveResponse(
            skill_id=skill_id,
            skill_name=skill_id.replace("_", " ").title(),
            dimension="coding_skills",
            zone=RadarZone.TRANSITION,
            salary_hike_correlation=0.35,
            demand_index_bengaluru=75.0,
            demand_index_gurgaon=70.0,
            peer_proficiency_dist={"Beginner": 30.0, "Intermediate": 50.0, "Advanced": 20.0},
            modernization_roadmap=[
                "Assess current production bottleneck in daily workflows.",
                "Implement version-controlled micro-modules with automated test coverage.",
                "Deploy pipeline into cloud-native orchestration (Airflow/Prefect)."
            ],
            sample_projects=[
                "Automated Data Pipeline Refactoring",
                "Metric Tracking & Performance Dashboard"
            ]
        )

    return SkillDeepDiveResponse(
        skill_id=skill_id,
        skill_name=skill_meta["name"],
        dimension=skill_meta["dimension"],
        zone=skill_meta["zone"],
        salary_hike_correlation=skill_meta["correlation_r"],
        demand_index_bengaluru=min(98.0, skill_meta["demand_pct"] * 1.08),
        demand_index_gurgaon=min(95.0, skill_meta["demand_pct"] * 1.02),
        peer_proficiency_dist={
            "Novice": 25.0,
            "Practitioner": 55.0,
            "Master": 20.0
        },
        modernization_roadmap=[
            f"Phase 1: Transition off legacy patterns into {skill_meta['name']}.",
            f"Phase 2: {skill_meta['remediation_path']}",
            "Phase 3: Measure EBITDA and latency improvement in production deployments."
        ],
        sample_projects=[
            f"Production {skill_meta['name']} Implementation",
            "Enterprise Market Upgrade Benchmark Project"
        ]
    )
