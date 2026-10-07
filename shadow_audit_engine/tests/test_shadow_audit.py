from app.nlp.jd_deconstruction import deconstruct_job_description
from app.nlp.resume_parser import parse_candidate_resume
from app.engine.shadow_auditor import run_shadow_candidate_audit

def test_shadow_candidate_audit_module():
    job_profile = deconstruct_job_description(
        job_designation="Senior Data Scientist",
        min_experience=3.0,
        raw_text="Requires Senior Data Scientist with Python, Statistics, Machine Learning, Tableau."
    )

    # Candidate A: 2.5 yrs exp (under 3.0 min exp) but high Machine Learning & Math skills -> Identified as SHADOW CANDIDATE!
    cand_a = parse_candidate_resume(
        raw_text_input="Senior ML Practitioner expert in Python, Machine Learning, Deep Learning, PyTorch, SQL, Linear Algebra, Tableau, Statistical Modeling, and Hypothesis Testing.",
        candidate_name="Priya Patel (Shadow Candidate)"
    )
    cand_a["total_experience_years"] = 2.5
    cand_a["recent_job_titles"] = ["Data Analyst"]

    # Candidate B: 5.0 yrs exp & exact title -> Passed ATS
    cand_b = parse_candidate_resume(
        raw_text_input="Senior Data Scientist with 5 years experience in Python, PyTorch, SQL, Tableau, Spark.",
        candidate_name="Rohan Gupta"
    )
    cand_b["total_experience_years"] = 5.0
    cand_b["recent_job_titles"] = ["Senior Data Scientist"]

    audit_res = run_shadow_candidate_audit(
        job_profile=job_profile,
        candidate_profiles=[cand_a, cand_b]
    )

    assert audit_res["summary"]["total_processed"] == 2
    assert audit_res["summary"]["shadow_candidates_recovered"] >= 1
    assert "over_filtering_tax" in audit_res
    assert audit_res["over_filtering_tax"]["shadow_candidate_ratio_pct"] > 0

if __name__ == "__main__":
    test_shadow_candidate_audit_module()
    print("test_shadow_candidate_audit_module passed!")
