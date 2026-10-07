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
