from app.nlp.jd_deconstruction import deconstruct_job_description

def test_deconstruct_job_description():
    raw_jd = "We are seeking a Senior Data Scientist with expertise in Python, PyTorch, SQL, Linear Algebra, Tableau, and Apache Spark."
    res = deconstruct_job_description(
        raw_text=raw_jd,
        job_designation="Senior Data Scientist",
        min_experience=3.0,
        max_experience=8.0
    )

    assert res["job_designation"] == "Senior Data Scientist"
    assert res["min_experience"] == 3.0
    assert "competency_dimensions" in res

    dims = res["competency_dimensions"]
    assert "maths_stats" in dims
    assert "coding" in dims
    assert "ai_ml" in dims
    assert "dashboard_storytelling" in dims
    assert "big_data" in dims

    # Check empirical weights sum to 1.0
    weights = res["empirical_weights"]
    total_weight = sum(weights.values())
    assert abs(total_weight - 1.0) < 0.001

if __name__ == "__main__":
    test_deconstruct_job_description()
    print("test_deconstruct_job_description passed!")
