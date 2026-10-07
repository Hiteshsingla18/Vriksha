"""
schemas_radar.py
Pydantic v2 validation models for the Grower Portal Market Radar & Salary Spike Simulator.
"""

from enum import Enum
from typing import List, Dict, Optional, Any
from pydantic import BaseModel, Field

class RadarZone(str, Enum):
    AT_RISK = "AT_RISK"        # Red Zone (75-95% radius) - Commoditized/Decaying
    TRANSITION = "TRANSITION"  # Yellow Zone (45-72% radius) - Core Bridge needing modernization
    THRIVING = "THRIVING"      # Green Zone (15-40% radius) - Market Multipliers & Velocity

class RadarScanRequest(BaseModel):
    user_id: str = Field(..., description="Unique user/candidate identifier")
    current_role: str = Field("Data Scientist", description="Current target or active role designation")
    experience_years: float = Field(3.5, ge=0.0, description="Total professional experience in years")
    current_salary_lpa: float = Field(12.0, ge=0.0, description="Current annual compensation in LPA")
    active_skills: List[str] = Field(default_factory=list, description="Verified active technical skills")
    primary_city: str = Field("Bengaluru", description="Primary working metro location")

class RadarBlip(BaseModel):
    id: str
    name: str
    dimension: str  # Competency dimension from JDS
    zone: RadarZone
    polar_angle_deg: float = Field(..., ge=0.0, le=360.0)
    polar_radius_pct: float = Field(..., ge=0.0, le=100.0)
    current_market_demand_pct: float = Field(..., ge=0.0, le=100.0)
    salary_hike_correlation: float
    projected_lpa_impact: float
    remediation_path: str
    is_user_active: bool = False

class TrajectoryPoint(BaseModel):
    scenario: str  # "Current Baseline" | "Red Zone Decay" | "Yellow Modernization" | "Green Multiplier Spike"
    experience_years: float
    min_lpa: float
    mid_lpa: float
    max_lpa: float
    delta_lpa: float
    is_salary_spike: bool = False

class RadarScanResponse(BaseModel):
    user_id: str
    role_evaluated: str
    market_health_score: float = Field(..., ge=0.0, le=100.0)
    net_potential_uplift_lpa: float
    blips: List[RadarBlip]
    salary_curve: List[TrajectoryPoint]
    executive_summary: str
    executive_ceiling_warning: Optional[str] = None

class SkillDeepDiveResponse(BaseModel):
    skill_id: str
    skill_name: str
    dimension: str
    zone: RadarZone
    salary_hike_correlation: float
    demand_index_bengaluru: float
    demand_index_gurgaon: float
    peer_proficiency_dist: Dict[str, float]
    modernization_roadmap: List[str]
    sample_projects: List[str]
