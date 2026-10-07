from fastapi import APIRouter, HTTPException, status
from app.api.schemas import SkillGraphResponse
from app.db.neo4j_graph import skill_graph_service
from app.engine.benchmark_loader import BenchmarkDatasetLoader

router = APIRouter(tags=["Skill Graph & Benchmarks"])

@router.get("/skills/graph", response_model=SkillGraphResponse, status_code=status.HTTP_200_OK)
async def get_skill_adjacency_graph():
    """
    Returns the Skill Adjacency Graph metadata (nodes and relationships)
    backed by Neo4j / NetworkX skill adjacency graph.
    """
    try:
        graph_data = skill_graph_service.get_skill_adjacency_graph()
        return graph_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch skill graph: {str(e)}")

@router.get("/benchmarks/traits", status_code=status.HTTP_200_OK)
async def get_benchmark_traits():
    """
    Returns statistical summaries of JDS Skill Traits and market salary datasets.
    """
    try:
        loader = BenchmarkDatasetLoader()
        jds_count = len(loader.jds_traits_df) if loader.jds_traits_df is not None else 0
        analytics_count = len(loader.analytics_jobs_df) if loader.analytics_jobs_df is not None else 0
        ds_count = len(loader.datascience_jobs_df) if loader.datascience_jobs_df is not None else 0

        p75 = loader.get_composite_score_75th_percentile()

        return {
            "dataset_records": {
                "jds_skill_traits": jds_count,
                "analytics_jobs": analytics_count,
                "datascience_jobs": ds_count
            },
            "empirical_weights": {
                "math_stats": 0.28,
                "dashboard_storytelling": 0.28,
                "coding": 0.22,
                "ai_ml": 0.17,
                "big_data": 0.05
            },
            "benchmark_75th_percentile_composite_score": p75,
            "sample_avg_salary_3yrs_lpa": loader.get_salary_benchmark_lpa(3.0),
            "sample_avg_salary_6yrs_lpa": loader.get_salary_benchmark_lpa(6.0)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch benchmarks: {str(e)}")
