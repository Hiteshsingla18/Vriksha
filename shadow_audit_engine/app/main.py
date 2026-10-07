import os
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.db.postgres import init_db
from app.engine.benchmark_loader import BenchmarkDatasetLoader
from app.api.v1.jobs import router as jobs_router
from app.api.v1.resumes import router as resumes_router
from app.api.v1.audit import router as audit_router
from app.api.v1.graph import router as graph_router

app = FastAPI(
    title=settings.APP_NAME,
    description="Standalone Shadow Candidate Audit Engine module for Vriksha Hiring Portal. Ingests candidate resumes, deconstructs JDs into 5 core dimensions, computes predictive match scores, and audits rigid recruiter filters to recover shadow candidates.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    # Initialize SQLite/PostgreSQL Database tables
    init_db()
    # Pre-load benchmark datasets
    BenchmarkDatasetLoader()

@app.get("/health", status_code=status.HTTP_200_OK, tags=["Health"])
@app.get(f"{settings.API_V1_STR}/health", status_code=status.HTTP_200_OK, tags=["Health"])
async def health_check():
    return {
        "status": "online",
        "service": settings.APP_NAME,
        "environment": settings.APP_ENV,
        "database": "connected",
        "version": "1.0.0"
    }

# Mount API v1 Routers
app.include_router(jobs_router, prefix=settings.API_V1_STR)
app.include_router(resumes_router, prefix=settings.API_V1_STR)
app.include_router(audit_router, prefix=settings.API_V1_STR)
app.include_router(graph_router, prefix=settings.API_V1_STR)
