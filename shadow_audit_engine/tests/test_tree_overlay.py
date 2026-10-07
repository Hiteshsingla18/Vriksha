from app.engine.tree_overlay_engine import generate_builder_tree_overlay, compute_leadership_resilience_index

def test_tree_overlay_engine():
    user_skills = ["Python", "SQL", "Tableau", "Descriptive Summary Stats"]
    resume_text = "Junior Data Practitioner with 2 years experience. Built Tableau dashboards, Python scripts, SQL queries, and A/B testing models. Led team project in college."

    tree = generate_builder_tree_overlay(
        user_skills=user_skills,
        target_role="Data Scientist",
        experience_years=2.0,
        resume_text=resume_text
    )

    assert tree["target_role"] == "Data Scientist"
    assert "branches" in tree
    assert len(tree["branches"]) == 5
    assert "telemetry" in tree

    telemetry = tree["telemetry"]
    assert telemetry["total_target_leaves"] > 0
    assert telemetry["lit_leaves_count"] >= 3
    assert telemetry["thriving_unlit_gaps_count"] > 0
    assert 0.0 <= telemetry["current_readiness_pct"] <= 100.0

    # Verify branch weights match the JDS study
    branch_map = {b["id"]: b for b in tree["branches"]}
    assert branch_map["maths_stats"]["weight"] == 0.28
    assert branch_map["dashboard_storytelling"]["weight"] == 0.28
    assert branch_map["coding"]["weight"] == 0.22
    assert branch_map["ai_ml"]["weight"] == 0.17
    assert branch_map["big_data"]["weight"] == 0.05

    # Verify leaf states
    all_leaf_states = [leaf["state"] for b in tree["branches"] for leaf in b["leaves"]]
    assert "lit" in all_leaf_states
    assert "thriving_unlit" in all_leaf_states

if __name__ == "__main__":
    test_tree_overlay_engine()
    print("test_tree_overlay_engine passed 100%!")
