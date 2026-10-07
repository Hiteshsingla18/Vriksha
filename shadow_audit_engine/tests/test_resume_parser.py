from app.nlp.resume_parser import parse_candidate_resume

def test_parse_candidate_resume():
    raw_resume = """
    Aarav Sharma
    Senior Machine Learning Engineer
    Experience:
    Senior ML Engineer at TechCorp (2022 - 2024):
    Led AI development using Python, PyTorch, Scikit-Learn, and Linear Algebra.
    
    Data Analyst at DataInc (2019 - 2021):
    Created Tableau dashboards, SQL queries, and Statistical Modeling.
    
    Education:
    B.Tech Computer Science (2015 - 2019)
    """
    res = parse_candidate_resume(raw_text_input=raw_resume, candidate_name="Aarav Sharma")

    assert res["candidate_name"] == "Aarav Sharma"
    assert res["total_experience_years"] > 0
    assert "dimension_scores" in res
    assert 1.0 <= res["composite_score"] <= 5.0
    assert 0.0 <= res["composite_score_pct"] <= 100.0
    assert "decay_factors" in res["skill_recency_decay"]

if __name__ == "__main__":
    test_parse_candidate_resume()
    print("test_parse_candidate_resume passed!")
