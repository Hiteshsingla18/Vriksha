from fastapi import APIRouter, HTTPException, status
from app.api.schemas import JDDeconstructionRequest, JDDeconstructionResponse
from app.nlp.jd_deconstruction import deconstruct_job_description

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.post("/deconstruct", response_model=JDDeconstructionResponse, status_code=status.HTTP_200_OK)
async def deconstruct_job(request: JDDeconstructionRequest):
    """
    Deconstructs a Job Description into 5 core competency dimensions:
    1. Mathematics & Statistics
    2. Coding & Software Fundamentals
    3. AI, ML & Modeling
    4. Data Storytelling & Dashboarding
    5. Infrastructure & Big Data Tools
    """
    try:
        res = deconstruct_job_description(
            raw_text=request.raw_text,
            job_designation=request.job_designation,
            min_experience=request.min_experience or 0.0,
            max_experience=request.max_experience or 10.0,
            stated_requirements=request.stated_requirements
        )

        vector_preview = res["vector_embedding"][:10] if res.get("vector_embedding") else None

        return JDDeconstructionResponse(
            job_id=res["job_id"],
            job_designation=res["job_designation"],
            min_experience=res["min_experience"],
            max_experience=res["max_experience"],
            competency_dimensions=res["competency_dimensions"],
            empirical_weights=res["empirical_weights"],
            extracted_skills=res["extracted_skills"],
            mandatory_keywords=res["mandatory_keywords"],
            vector_embedding_preview=vector_preview
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to deconstruct job description: {str(e)}")
