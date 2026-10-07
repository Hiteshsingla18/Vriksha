from app.engine.predictive_scorer import compute_empirical_composite_score, evaluate_candidate_match

def test_empirical_composite_score_formula():
    dim_scores = {
        "maths_stats": 4.0,
        "dashboard_storytelling": 5.0,
        "coding": 4.5,
        "ai_ml": 4.8,
        "big_data": 3.6
    }
    res = compute_empirical_composite_score(dim_scores)

    # Composite Score = (0.28 * 4.0) + (0.28 * 5.0) + (0.22 * 4.5) + (0.17 * 4.8) + (0.05 * 3.6)
    # = 1.12 + 1.40 + 0.99 + 0.816 + 0.18 = 4.506 -> 4.51
    assert abs(res["composite_score"] - 4.51) <= 0.02
    assert abs(res["composite_score_pct"] - 90.1) <= 0.5

if __name__ == "__main__":
    test_empirical_composite_score_formula()
    print("test_empirical_composite_score_formula passed!")
