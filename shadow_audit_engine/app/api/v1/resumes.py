from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from typing import List, Optional

from app.api.schemas import ResumeUploadResponse
from app.nlp.resume_parser import parse_candidate_resume

router = APIRouter(prefix="/resumes", tags=["Resumes"])

@router.post("/upload", response_model=ResumeUploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_candidate_resume(
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None),
    candidate_name: Optional[str] = Form(None)
):
    """
    Ingests and parses candidate resume (PDF, DOCX, or raw text).
    Extracts structural blocks, computes 5-dimension capability scores, and evaluates skill decay.
    """
    try:
        filename = file.filename if file else "resume.pdf"
        file_bytes = await file.read() if file else None

        if not file_bytes and not raw_text:
            raise HTTPException(status_code=400, detail="Either a file upload or raw_text must be provided.")

        res = parse_candidate_resume(
            file_bytes=file_bytes,
            filename=filename,
            raw_text_input=raw_text,
            candidate_name=candidate_name
        )

        return ResumeUploadResponse(
            candidate_id=res["candidate_id"],
            filename=res["filename"],
            candidate_name=res["candidate_name"],
            total_experience_years=res["total_experience_years"],
            recent_job_titles=res["recent_job_titles"],
            structural_blocks=res["structural_blocks"],
            dimension_scores=res["dimension_scores"],
            composite_score=res["composite_score"],
            composite_score_pct=res["composite_score_pct"],
            skill_recency_decay=res["skill_recency_decay"]
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process candidate resume: {str(e)}")
