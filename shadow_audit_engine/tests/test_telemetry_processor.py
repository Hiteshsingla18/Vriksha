"""
test_telemetry_processor.py
"""
from app.detector.telemetry_session_processor import TelemetrySessionProcessor
from app.api.schemas import TelemetryEvent, SeniorityTier, StuckArchetype

def test_telemetry_session_processor():
    processor = TelemetrySessionProcessor()
    
    # Test 1: Data Leakage AST detection
    event_leakage = TelemetryEvent(
        user_id="usr_001",
        task_id="tsk_101",
        target_role=SeniorityTier.DATA_SCIENTIST,
        code_snippet="scaler.fit_transform(X_test)",
        stderr="",
        exit_code=0,
        execution_time_ms=1200.0
    )
    res_leakage = processor.process_telemetry_batch(
        current_event=event_leakage,
        session_history=[]
    )
    diag_leakage = res_leakage["diagnosis"]
    assert diag_leakage["is_stuck"] is True
    assert diag_leakage["stuck_archetype"] == StuckArchetype.DATA_LEAKAGE_DEADLOCK
    assert diag_leakage["intervention"] is not None
    assert "Isolate Fit vs Transform" in diag_leakage["intervention"]["action_title"]

    # Test 2: Unvectorized Loop detection
    event_loop = TelemetryEvent(
        user_id="usr_002",
        task_id="tsk_102",
        target_role=SeniorityTier.SENIOR_DATA_SCIENTIST,
        code_snippet="for idx, r in df.iterrows(): pass",
        stderr="",
        exit_code=0,
        execution_time_ms=2500.0
    )
    res_loop = processor.process_telemetry_batch(
        current_event=event_loop,
        session_history=[]
    )
    diag_loop = res_loop["diagnosis"]
    assert diag_loop["is_stuck"] is True
    assert diag_loop["stuck_archetype"] == StuckArchetype.UNVECTORIZED_BOTTLENECK

if __name__ == "__main__":
    test_telemetry_session_processor()
    print("test_telemetry_session_processor passed 100%!")
