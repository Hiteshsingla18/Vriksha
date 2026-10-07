import uuid
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, status
from typing import Optional, List

from app.api.schemas import (
    BuilderProfileRequest,
    BuilderProfileResponse,
    TreeOverlayRequest,
    TreeOverlayResponse
)
from app.nlp.resume_parser import parse_candidate_resume
from app.engine.tree_overlay_engine import generate_builder_tree_overlay, compute_leadership_resilience_index

router = APIRouter(prefix="/builder", tags=["Builder Portal — Tree Overlay"])

@router.post("/profile", response_model=BuilderProfileResponse, status_code=status.HTTP_200_OK)
async def create_or_update_builder_profile(request: BuilderProfileRequest):
    """
    Ingests user details, target Data Science role, portfolio/github links, and resume text.
    Parses structural resume sections, extracts canonical skills, and scores 5-dimension proficiencies.
    """
    try:
        raw_text = request.raw_resume_text or "Aspiring Data Practitioner skilled in Python, SQL, Statistics, and Tableau."
        parsed = parse_candidate_resume(
            raw_text_input=raw_text,
            candidate_name=request.candidate_name
        )

        leadership_idx = compute_leadership_resilience_index(
            raw_text,
            request.current_experience_years
        )

        # Generate tree preview to calculate readiness factor %
        skills_flat = []
        for s_list in parsed["extracted_skills"].values():
            skills_flat.extend(s_list)

        tree = generate_builder_tree_overlay(
            user_skills=skills_flat,
            target_role=request.target_role,
            experience_years=request.current_experience_years,
            resume_text=raw_text
        )

        readiness_pct = tree["telemetry"]["current_readiness_pct"]
        profile_id = f"builder_{uuid.uuid4().hex[:8]}"

        return BuilderProfileResponse(
            profile_id=profile_id,
            candidate_name=request.candidate_name or "Data Practitioner",
            target_role=request.target_role,
            current_experience_years=request.current_experience_years,
            github_url=request.github_url,
            portfolio_url=request.portfolio_url,
            extracted_skills=parsed["extracted_skills"],
            dimension_scores=parsed["dimension_scores"],
            leadership_resilience_index=leadership_idx,
            readiness_factor_pct=readiness_pct
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process builder profile: {str(e)}")

@router.post("/tree-overlay", response_model=TreeOverlayResponse, status_code=status.HTTP_200_OK)
async def get_tree_overlay_visualization(request: TreeOverlayRequest):
    """
    Generates the interactive Tree Overlay Engine payload.
    Compares verified user skills against market benchmark target tree across 5 core Data Science branches,
    highlighting leaf states: Lit (Verified), Thriving Unlit (High-ROI Gap), Steady, and Fading.
    """
    try:
        user_skills = request.user_skills or []
        raw_text = request.raw_resume_text or ""

        if not user_skills and not raw_text:
            # Default sample practitioner skills for demo preview
            user_skills = ["Python", "SQL", "Tableau", "Descriptive Summary Stats", "Excel"]
            raw_text = "Data Practitioner skilled in Python, SQL, Tableau, Statistics."

        tree_payload = generate_builder_tree_overlay(
            user_skills=user_skills,
            target_role=request.target_role,
            experience_years=request.current_experience_years,
            resume_text=raw_text
        )

        return tree_payload
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate Tree Overlay: {str(e)}")

@router.post("/upload-resume", response_model=BuilderProfileResponse, status_code=status.HTTP_201_CREATED)
async def upload_builder_resume(
    file: Optional[UploadFile] = File(None),
    target_role: str = Form("Data Scientist"),
    current_experience_years: float = Form(2.0),
    github_url: Optional[str] = Form(None),
    portfolio_url: Optional[str] = Form(None),
    candidate_name: Optional[str] = Form("Data Practitioner")
):
    """
    Asynchronously ingests PDF or DOCX resume for the Builder Portal.
    """
    try:
        file_bytes = await file.read() if file else None
        filename = file.filename if file else "resume.pdf"

        parsed = parse_candidate_resume(
            file_bytes=file_bytes,
            filename=filename,
            candidate_name=candidate_name
        )

        skills_flat = []
        for s_list in parsed["extracted_skills"].values():
            skills_flat.extend(s_list)

        tree = generate_builder_tree_overlay(
            user_skills=skills_flat,
            target_role=target_role,
            experience_years=current_experience_years,
            resume_text=parsed["raw_text"]
        )

        leadership_idx = compute_leadership_resilience_index(
            parsed["raw_text"],
            current_experience_years
        )

        profile_id = f"builder_{uuid.uuid4().hex[:8]}"

        return BuilderProfileResponse(
            profile_id=profile_id,
            candidate_name=candidate_name or "Data Practitioner",
            target_role=target_role,
            current_experience_years=current_experience_years,
            github_url=github_url,
            portfolio_url=portfolio_url,
            extracted_skills=parsed["extracted_skills"],
            dimension_scores=parsed["dimension_scores"],
            leadership_resilience_index=leadership_idx,
            readiness_factor_pct=tree["telemetry"]["current_readiness_pct"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume upload failed: {str(e)}")
