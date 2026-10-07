from celery import Celery
from app.config import settings

celery_app = Celery(
    "shadow_audit_tasks",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)

@celery_app.task(name="tasks.process_resume_async")
def process_resume_async(resume_data: dict):
    from app.nlp.resume_parser import parse_candidate_resume
    result = parse_candidate_resume(
        raw_text_input=resume_data.get("raw_text"),
        filename=resume_data.get("filename", "resume.pdf"),
        candidate_name=resume_data.get("name")
    )
    return result

@celery_app.task(name="tasks.run_audit_async")
def run_audit_async(job_data: dict, candidates_data: list, ats_config: dict):
    from app.engine.shadow_auditor import run_shadow_candidate_audit
    audit_res = run_shadow_candidate_audit(
        job_profile=job_data,
        candidate_profiles=candidates_data,
        ats_config=ats_config
    )
    return audit_res
