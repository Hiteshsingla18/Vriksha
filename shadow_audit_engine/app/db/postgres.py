import datetime
from sqlalchemy import create_engine, Column, String, Float, Integer, JSON, DateTime, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings

Base = declarative_base()

class JobDescriptionDB(Base):
    __tablename__ = "job_descriptions"

    id = Column(String, primary_key=True)
    job_designation = Column(String, nullable=False)
    min_experience = Column(Float, default=0.0)
    max_experience = Column(Float, default=10.0)
    competency_dimensions = Column(JSON, nullable=False)
    empirical_weights = Column(JSON, nullable=False)
    extracted_skills = Column(JSON, nullable=True)
    mandatory_keywords = Column(JSON, nullable=True)
    raw_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class CandidateResumeDB(Base):
    __tablename__ = "candidate_resumes"

    id = Column(String, primary_key=True)
    filename = Column(String, nullable=False)
    candidate_name = Column(String, nullable=False)
    total_experience_years = Column(Float, default=0.0)
    recent_job_titles = Column(JSON, nullable=True)
    structural_blocks = Column(JSON, nullable=True)
    extracted_skills = Column(JSON, nullable=True)
    dimension_scores = Column(JSON, nullable=False)
    composite_score = Column(Float, nullable=False)
    composite_score_pct = Column(Float, nullable=False)
    skill_recency_decay = Column(JSON, nullable=True)
    raw_text = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class AuditRunDB(Base):
    __tablename__ = "audit_runs"

    id = Column(String, primary_key=True)
    job_id = Column(String, nullable=True)
    total_processed = Column(Integer, default=0)
    passed_ats_count = Column(Integer, default=0)
    filtered_out_count = Column(Integer, default=0)
    shadow_candidates_recovered = Column(Integer, default=0)
    shadow_candidate_ratio_pct = Column(Float, default=0.0)
    over_filtering_tax = Column(JSON, nullable=True)
    ranked_candidates = Column(JSON, nullable=True)
    radar_chart_payload = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

# SQLite fallback database engine
engine = create_engine(settings.get_database_url(), connect_args={"check_same_thread": False} if "sqlite" in settings.get_database_url() else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
