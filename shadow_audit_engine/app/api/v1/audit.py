from fastapi import APIRouter, HTTPException, status
from typing import List, Dict, Any

from app.api.schemas import AuditRunRequest, AuditRunResponse
from app.nlp.jd_deconstruction import deconstruct_job_description
from app.nlp.resume_parser import parse_candidate_resume
from app.engine.shadow_auditor import run_shadow_candidate_audit

router = APIRouter(prefix="/audit", tags=["Audit Engine"])

# Sample candidate generator for instant demo testing if batch list is empty
SAMPLE_CANDIDATES_RAW = [
    {
        "name": "Aarav Sharma",
        "experience_years": 4.5,
        "job_titles": ["Machine Learning Engineer", "AI Researcher"],
        "text": "Senior ML Engineer with 4.5 years experience. Mastered Python, PyTorch, Scikit-Learn, Linear Algebra, Probability, A/B Testing, and SQL. Built recommendation systems and time-series forecasting models."
    },
    {
        "name": "Priya Patel (Shadow Gem)",
        "experience_years": 2.5,  # Slightly under 3 yrs min requirement -> Filtered by rigid ATS!
        "job_titles": ["Data Analyst", "Analytics Specialist"],
        "text": "Data Analyst with 2.5 years experience. Expert in Python, SQL, Tableau, PowerBI, Statistical Modeling, ANOVA, PySpark, and Executive Dashboarding. High proficiency in data storytelling."
    },
    {
        "name": "Rohan Gupta",
        "experience_years": 6.0,
        "job_titles": ["Senior Data Scientist"],
        "text": "Senior Data Scientist with 6 years experience. Expert in Python, R, Deep Learning, TensorFlow, AWS, Tableau, BigQuery, Hypothesis Testing, and System Design."
    },
    {
        "name": "Ananya Roy (Shadow Gem)",
        "experience_years": 5.0,
        "job_titles": ["Software Engineer - Backend"], # Title mismatch for "Data Scientist" -> Filtered by ATS!
        "text": "Backend Software Engineer with 5 years experience. Strong background in Mathematics, Linear Algebra, Python, C++, Distributed Systems, Apache Spark, PySpark, Scikit-Learn, and Algorithms."
    },
    {
        "name": "Vikram Singh",
        "experience_years": 1.0,
        "job_titles": ["Junior Analyst"],
        "text": "Junior Analyst with 1 year experience. Basic knowledge of Excel and Python."
    }
]

@router.post("/run", response_model=AuditRunResponse, status_code=status.HTTP_200_OK)
async def execute_shadow_candidate_audit(request: AuditRunRequest):
    """
    Executes the Shadow Candidate Audit Engine against a candidate pool and Job Description.
    Identifies high-fit candidates prematurely filtered out by rigid recruiter constraints,
    calculating Shadow Candidate Ratio % and Over-Filtering Tax.
    """
    try:
        # 1. Process Job Description
        if request.job_deconstruction:
            job_req = request.job_deconstruction
            job_profile = deconstruct_job_description(
                raw_text=job_req.raw_text,
                job_designation=job_req.job_designation,
                min_experience=job_req.min_experience or 3.0,
                max_experience=job_req.max_experience or 8.0,
                stated_requirements=job_req.stated_requirements
            )
        else:
            job_profile = deconstruct_job_description(
                job_designation="Senior Data Scientist / Analytics Lead",
                min_experience=3.0,
                max_experience=8.0,
                raw_text="Looking for a Senior Data Scientist skilled in Python, Statistics, Machine Learning, Tableau, PySpark, and A/B Testing."
            )

        # 2. Process Candidates
        candidate_profiles = []
        if request.candidate_resumes:
            for c in request.candidate_resumes:
                p = parse_candidate_resume(
                    raw_text_input=c.raw_resume_text,
                    candidate_name=c.name
                )
                p["total_experience_years"] = c.experience_years
                p["recent_job_titles"] = c.job_titles
                candidate_profiles.append(p)
        else:
            # Use benchmark demo pool if no candidates sent
            for sample in SAMPLE_CANDIDATES_RAW:
                p = parse_candidate_resume(
                    raw_text_input=sample["text"],
                    candidate_name=sample["name"]
                )
                p["total_experience_years"] = sample["experience_years"]
                p["recent_job_titles"] = sample["job_titles"]
                candidate_profiles.append(p)

        # 3. Run Audit
        ats_config_dict = request.ats_config.dict() if request.ats_config else {}
        audit_result = run_shadow_candidate_audit(
            job_profile=job_profile,
            candidate_profiles=candidate_profiles,
            ats_config=ats_config_dict
        )

        return audit_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audit execution failed: {str(e)}")
