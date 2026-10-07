"""
telemetry_session_processor.py
Processes real-time behavioral telemetry streams from candidate workspaces,
computes cognitive dwell-times, resilience vectors, and detects stuck conditions
against empirical JDS/SDS Data Science benchmarks.
"""

import math
from typing import List, Dict, Any, Optional
from datetime import datetime
from pydantic import BaseModel, Field

from app.api.schemas import (
    TelemetryEvent,
    StuckDiagnosisResponse,
    StuckArchetype,
    CompetencyDimension,
    MicroIntervention,
    SeniorityTier,
)
from app.detector.error_classifier import DSErrorClassifier
from app.detector.ast_analyzer import DSASTAnalyzer


class BehavioralMetrics(BaseModel):
    session_id: str
    total_executions: int
    failed_executions: int
    error_recurrence_ratio: float
    panic_thrashing_score: float = Field(..., ge=0.0, le=1.0)
    avoidance_dwell_seconds: float
    resilience_recovery_index: float
    estimated_cognitive_load: float = Field(..., ge=0.0, le=1.0)


class RoleMarketContext(BaseModel):
    target_role: SeniorityTier
    baseline_experience_yrs: float
    market_avg_salary_lpa: float
    market_salary_spread_lpa: float


class TelemetrySessionProcessor:
    """
    Evaluates real-time candidate code telemetry against historical
    benchmarks from cleaned_JDS_Skill_Traits, cleaned_SDS_Personality_Traits,
    and cleaned_DataScience_Jobs datasets.
    """

    ROLE_BENCHMARKS = {
        SeniorityTier.JUNIOR_ANALYST: RoleMarketContext(
            target_role=SeniorityTier.JUNIOR_ANALYST,
            baseline_experience_yrs=0.82,
            market_avg_salary_lpa=5.71,
            market_salary_spread_lpa=6.48,
        ),
        SeniorityTier.DATA_ANALYST: RoleMarketContext(
            target_role=SeniorityTier.DATA_ANALYST,
            baseline_experience_yrs=0.82,
            market_avg_salary_lpa=5.71,
            market_salary_spread_lpa=6.48,
        ),
        SeniorityTier.DATA_SCIENTIST: RoleMarketContext(
            target_role=SeniorityTier.DATA_SCIENTIST,
            baseline_experience_yrs=1.54,
            market_avg_salary_lpa=13.53,
            market_salary_spread_lpa=13.69,
        ),
        SeniorityTier.SENIOR_DATA_SCIENTIST: RoleMarketContext(
            target_role=SeniorityTier.SENIOR_DATA_SCIENTIST,
            baseline_experience_yrs=3.96,
            market_avg_salary_lpa=22.29,
            market_salary_spread_lpa=14.41,
        ),
        SeniorityTier.DATA_ARCHITECT: RoleMarketContext(
            target_role=SeniorityTier.DATA_ARCHITECT,
            baseline_experience_yrs=9.98,
            market_avg_salary_lpa=25.09,
            market_salary_spread_lpa=15.15,
        ),
    }

    # Derived from empirical Pearson correlations in cleaned_JDS_Skill_Traits.csv
    TRAIT_WEIGHTS = {
        CompetencyDimension.DASHBOARD_STORYTELLING: 0.28,
        CompetencyDimension.MATHS_STATS: 0.28,
        CompetencyDimension.CODING: 0.22,
        CompetencyDimension.AI_ML: 0.17,
        CompetencyDimension.BIG_DATA: 0.05,
    }

    def __init__(self):
        self.error_classifier = DSErrorClassifier()
        self.ast_analyzer = DSASTAnalyzer()

    def process_telemetry_batch(
        self,
        current_event: TelemetryEvent,
        session_history: List[Dict[str, Any]],
        session_start_time: Optional[datetime] = None,
    ) -> Dict[str, Any]:
        """
        Processes a session history window along with the latest TelemetryEvent.
        Returns a unified behavioral diagnostic payload.
        """
        market_context = self.ROLE_BENCHMARKS.get(
            current_event.target_role,
            self.ROLE_BENCHMARKS[SeniorityTier.DATA_SCIENTIST],
        )

        behavioral_metrics = self._calculate_behavioral_dynamics(
            current_event, session_history, session_start_time
        )
        ast_results = self.ast_analyzer.inspect_code(current_event.code_snippet)
        archetype, dimension = self.error_classifier.classify(current_event.stderr)

        # Detect subtle pipeline anti-patterns through AST if no error was thrown
        if ast_results.get("has_fit_transform_on_test"):
            archetype = StuckArchetype.DATA_LEAKAGE_DEADLOCK
            dimension = CompetencyDimension.AI_ML
        elif ast_results.get("has_iterative_dataframe_loop") and archetype == StuckArchetype.NOMINAL:
            archetype = StuckArchetype.UNVECTORIZED_BOTTLENECK
            dimension = CompetencyDimension.CODING
        elif behavioral_metrics.panic_thrashing_score > 0.70:
            archetype = StuckArchetype.PANIC_THRASHING

        stuck_severity = self._compute_severity(
            current_event=current_event,
            behavioral_metrics=behavioral_metrics,
            archetype=archetype,
            ast_results=ast_results,
        )

        is_stuck = stuck_severity >= 0.70
        intervention = self._generate_intervention(archetype, dimension, market_context) if is_stuck else None

        diagnosis_response = StuckDiagnosisResponse(
            user_id=current_event.user_id,
            task_id=current_event.task_id,
            is_stuck=is_stuck,
            stuck_severity=round(stuck_severity, 2),
            stuck_archetype=archetype,
            impacted_dimension=dimension,
            consecutive_failures=behavioral_metrics.failed_executions,
            salary_spread_at_risk_lpa=market_context.market_salary_spread_lpa,
            intervention=intervention,
        )

        return {
            "diagnosis": diagnosis_response.model_dump(),
            "behavioral_telemetry": behavioral_metrics.model_dump(),
            "market_calibration": market_context.model_dump(),
        }

    def _calculate_behavioral_dynamics(
        self,
        current_event: TelemetryEvent,
        session_history: List[Dict[str, Any]],
        session_start_time: Optional[datetime],
    ) -> BehavioralMetrics:
        total_runs = len(session_history) + 1
        failed_runs = sum(1 for h in session_history if h.get("exit_code", 0) != 0)
        if current_event.exit_code != 0:
            failed_runs += 1

        error_recurrence = failed_runs / total_runs if total_runs > 0 else 0.0

        # Estimate rapid churn edits (panic thrashing)
        recent_failures = [h for h in session_history[-4:] if h.get("exit_code", 0) != 0]
        panic_score = min(1.0, (len(recent_failures) * 0.25))
        if current_event.exit_code != 0 and len(recent_failures) >= 2:
            panic_score = min(1.0, panic_score + 0.2)

        # Baseline resilience derived from SDS successful cohort profile
        resilience_index = 1.29 - (error_recurrence * 2.85)

        cognitive_load = min(
            1.0,
            (error_recurrence * 0.5)
            + (panic_score * 0.3)
            + (0.2 if current_event.execution_time_ms > 5000 else 0.05),
        )

        return BehavioralMetrics(
            session_id=f"sess_{current_event.user_id}_{current_event.task_id}",
            total_executions=total_runs,
            failed_executions=failed_runs,
            error_recurrence_ratio=round(error_recurrence, 2),
            panic_thrashing_score=round(panic_score, 2),
            avoidance_dwell_seconds=round(current_event.execution_time_ms / 1000.0, 2),
            resilience_recovery_index=round(resilience_index, 2),
            estimated_cognitive_load=round(cognitive_load, 2),
        )

    def _compute_severity(
        self,
        current_event: TelemetryEvent,
        behavioral_metrics: BehavioralMetrics,
        archetype: StuckArchetype,
        ast_results: Dict[str, Any],
    ) -> float:
        if archetype == StuckArchetype.NOMINAL and not ast_results.get("has_iterative_dataframe_loop"):
            return 0.10

        severity = 0.30
        severity += behavioral_metrics.error_recurrence_ratio * 0.35
        severity += behavioral_metrics.panic_thrashing_score * 0.25

        if ast_results.get("has_fit_transform_on_test"):
            severity = max(severity, 0.85)

        if ast_results.get("has_iterative_dataframe_loop"):
            severity = max(severity, 0.72)

        if archetype == StuckArchetype.SHAPE_ALIGNMENT_BLOCK:
            severity = max(severity, 0.78)

        return min(1.0, severity)

    def _generate_intervention(
        self,
        archetype: StuckArchetype,
        dimension: CompetencyDimension,
        market_context: RoleMarketContext,
    ) -> MicroIntervention:
        if archetype == StuckArchetype.DATA_LEAKAGE_DEADLOCK:
            return MicroIntervention(
                action_title="Isolate Fit vs Transform Across Evaluation Split",
                diagnostic_rationale=(
                    f"Your code calls fitting routines on test data. In {market_context.target_role.value} "
                    f"interviews, target contamination triggers an immediate failure."
                ),
                remediation_hint="Use scaler.fit_transform(X_train) exclusively on train splits; call scaler.transform(X_test) on test splits.",
                code_pattern_diff="- scaler.fit_transform(X_test)\n+ scaler.transform(X_test)",
                estimated_resolution_mins=8,
            )
        elif archetype == StuckArchetype.UNVECTORIZED_BOTTLENECK:
            return MicroIntervention(
                action_title="Eliminate Iterative DataFrame Traversal",
                diagnostic_rationale=(
                    f"Explicit DataFrame row iteration via .iterrows() is blocked in production pipelines. "
                    f"Vectorized execution is required for market roles averaging ₹{market_context.market_avg_salary_lpa} LPA."
                ),
                remediation_hint="Replace manual iteration with native vectorized NumPy expressions or df.apply().",
                code_pattern_diff="- for idx, r in df.iterrows(): df.loc[idx, 'out'] = r['a'] * 2\n+ df['out'] = df['a'] * 2",
                estimated_resolution_mins=12,
            )
        elif archetype == StuckArchetype.SHAPE_ALIGNMENT_BLOCK:
            return MicroIntervention(
                action_title="Rectify Tensor Dimension Alignment",
                diagnostic_rationale="Incompatible linear layer projections detected. Matrix multiplication dimension mismatch.",
                remediation_hint="Print x.shape before projection. Reshape or flatten batch dimensions via x.view(x.size(0), -1).",
                code_pattern_diff="- output = self.linear(x)\n+ x = x.view(x.size(0), -1)\n+ output = self.linear(x)",
                estimated_resolution_mins=10,
            )
        else:
            return MicroIntervention(
                action_title="Stabilize Script Execution Flow",
                diagnostic_rationale="High iteration churn detected with repeated unhandled exceptions.",
                remediation_hint="Isolate the failing sub-expression inside an isolated test block and verify tensor shapes and datatypes.",
                code_pattern_diff="# Assert variable types and non-null states prior to invocation",
                estimated_resolution_mins=15,
            )
