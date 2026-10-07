from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class CompetencyDimensions(BaseModel):
    math_stats: float = Field(..., description="Mathematics & Statistics score (1.0 - 5.0)")
    coding: float = Field(..., description="Coding & Software Fundamentals score (1.0 - 5.0)")
    ai_ml: float = Field(..., description="AI, ML & Modeling score (1.0 - 5.0)")
    dashboard_storytelling: float = Field(..., description="Data Storytelling & Dashboarding score (1.0 - 5.0)")
    big_data: float = Field(..., description="Infrastructure & Big Data Tools score (1.0 - 5.0)")

class EmpiricalWeights(BaseModel):
    math_stats: float = 0.28
    dashboard_storytelling: float = 0.28
    coding: float = 0.22
    ai_ml: float = 0.17
    big_data: float = 0.05

class JDDeconstructionRequest(BaseModel):
    raw_text: Optional[str] = None
    job_designation: Optional[str] = None
    min_experience: Optional[float] = 0.0
    max_experience: Optional[float] = 10.0
    stated_requirements: Optional[List[str]] = None

class JDDeconstructionResponse(BaseModel):
    job_id: str
    job_designation: str
    min_experience: float
    max_experience: float
    competency_dimensions: CompetencyDimensions
    empirical_weights: EmpiricalWeights = EmpiricalWeights()
    extracted_skills: List[str]
    mandatory_keywords: List[str]
    vector_embedding_preview: Optional[List[float]] = None

class CandidateResumeInput(BaseModel):
    candidate_id: Optional[str] = None
    name: str
    experience_years: float
    job_titles: List[str]
    skills: List[str]
    raw_resume_text: str

class ResumeUploadResponse(BaseModel):
    candidate_id: str
    filename: str
    candidate_name: str
    total_experience_years: float
    recent_job_titles: List[str]
    structural_blocks: Dict[str, str]
    dimension_scores: CompetencyDimensions
    composite_score: float
    composite_score_pct: float
    skill_recency_decay: Dict[str, Any]

class ATSFilterConfig(BaseModel):
    enforce_min_experience: bool = True
    enforce_title_match: bool = True
    enforce_keyword_match: bool = True
    custom_required_keywords: Optional[List[str]] = None

class OverFilteringTaxMetrics(BaseModel):
    shadow_candidate_ratio_pct: float
    avg_market_salary_filtered_high_fit_lpa: float
    avg_market_salary_recruited_lpa: float
    salary_spread_lpa: float
    cost_inefficiency_tax_pct: float
    missed_talent_pool_count: int

class RankedCandidate(BaseModel):
    candidate_id: str
    candidate_name: str
    match_index_pct: float
    composite_score: float
    composite_score_pct: float
    semantic_similarity_pct: float
    ats_status: str
    is_shadow_candidate: bool
    rejection_reasons: List[str]
    dimension_scores: CompetencyDimensions
    missing_skills: List[str]
    complementary_strengths: List[str]
    recency_decay_factor: float
    years_experience: float
    recent_titles: List[str]

class AuditRunRequest(BaseModel):
    job_id: Optional[str] = None
    job_deconstruction: Optional[JDDeconstructionRequest] = None
    candidate_ids: Optional[List[str]] = None
    candidate_resumes: Optional[List[CandidateResumeInput]] = None
    ats_config: Optional[ATSFilterConfig] = ATSFilterConfig()

class AuditRunResponse(BaseModel):
    audit_id: str
    timestamp: str
    job_summary: Dict[str, Any]
    summary: Dict[str, Any]
    over_filtering_tax: OverFilteringTaxMetrics
    ranked_candidates: List[RankedCandidate]
    radar_chart_payload: Dict[str, Any]
    top_false_negatives: List[RankedCandidate]

class SkillGraphNode(BaseModel):
    id: str
    label: str
    type: str  # "skill", "dimension", "role"
    dimension: Optional[str] = None

class SkillGraphEdge(BaseModel):
    source: str
    target: str
    weight: float
    type: str  # "BELONGS_TO", "COMPLEMENTARY_TO"

class SkillGraphResponse(BaseModel):
    nodes: List[SkillGraphNode]
    edges: List[SkillGraphEdge]

# --- BUILDER PORTAL & TREE OVERLAY SCHEMAS ---

class BuilderProfileRequest(BaseModel):
    target_role: str = Field("Data Scientist", description="Target Data Science role designation")
    current_experience_years: float = Field(2.0, description="Current experience in years")
    github_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    raw_resume_text: Optional[str] = None
    candidate_name: Optional[str] = "Data Practitioner"

class BuilderProfileResponse(BaseModel):
    profile_id: str
    candidate_name: str
    target_role: str
    current_experience_years: float
    github_url: Optional[str]
    portfolio_url: Optional[str]
    extracted_skills: Dict[str, List[str]]
    dimension_scores: CompetencyDimensions
    leadership_resilience_index: float
    readiness_factor_pct: float

class TreeLeafSchema(BaseModel):
    id: str
    label: str
    canonical_name: str
    state: str  # "lit" | "thriving_unlit" | "steady" | "fading"
    correlation_r: float
    roi_hike_potential_pct: float
    market_prevalence_pct: float
    user_proficiency: float

class TreeBranchSchema(BaseModel):
    id: str
    label: str
    weight: float
    correlation_r: float
    user_proficiency: float
    target_requirement: float
    leaves: List[TreeLeafSchema]

class TreeOverlayRequest(BaseModel):
    profile_id: Optional[str] = None
    target_role: str = "Data Scientist"
    current_experience_years: float = 2.0
    user_skills: Optional[List[str]] = None
    raw_resume_text: Optional[str] = None

class TreeOverlayResponse(BaseModel):
    tree_id: str
    target_role: str
    role_benchmark: Dict[str, Any]
    branches: List[TreeBranchSchema]
    telemetry: Dict[str, Any]

# --- TELEMETRY & STUCK DIAGNOSIS SCHEMAS ---

from enum import Enum

class SeniorityTier(str, Enum):
    JUNIOR_ANALYST = "Junior Analyst"
    DATA_ANALYST = "Data Analyst"
    DATA_SCIENTIST = "Data Scientist"
    SENIOR_DATA_SCIENTIST = "Senior Data Scientist"
    DATA_ARCHITECT = "Data Architect"

class CompetencyDimension(str, Enum):
    MATHS_STATS = "maths_stats"
    CODING = "coding"
    AI_ML = "ai_ml"
    DASHBOARD_STORYTELLING = "dashboard_storytelling"
    BIG_DATA = "big_data"

class StuckArchetype(str, Enum):
    NOMINAL = "nominal"
    DATA_LEAKAGE_DEADLOCK = "data_leakage_deadlock"
    UNVECTORIZED_BOTTLENECK = "unvectorized_bottleneck"
    SHAPE_ALIGNMENT_BLOCK = "shape_alignment_block"
    PANIC_THRASHING = "panic_thrashing"

class TelemetryEvent(BaseModel):
    user_id: str
    task_id: str
    target_role: SeniorityTier = SeniorityTier.DATA_SCIENTIST
    code_snippet: str = ""
    stderr: str = ""
    exit_code: int = 0
    execution_time_ms: float = 0.0

class MicroIntervention(BaseModel):
    action_title: str
    diagnostic_rationale: str
    remediation_hint: str
    code_pattern_diff: str
    estimated_resolution_mins: int

class StuckDiagnosisResponse(BaseModel):
    user_id: str
    task_id: str
    is_stuck: bool
    stuck_severity: float
    stuck_archetype: StuckArchetype
    impacted_dimension: CompetencyDimension
    consecutive_failures: int
    salary_spread_at_risk_lpa: float
    intervention: Optional[MicroIntervention] = None


