"""
error_classifier.py
Classifies Python/Data Science runtime stack traces into StuckArchetypes and CompetencyDimensions.
"""
from typing import Tuple
from app.api.schemas import StuckArchetype, CompetencyDimension

class DSErrorClassifier:
    def classify(self, stderr: str) -> Tuple[StuckArchetype, CompetencyDimension]:
        if not stderr or not stderr.strip():
            return StuckArchetype.NOMINAL, CompetencyDimension.CODING
        
        stderr_lower = stderr.lower()
        if any(kw in stderr_lower for kw in ["shape", "dimension", "matmul", "size mismatch", "shapes"]):
            return StuckArchetype.SHAPE_ALIGNMENT_BLOCK, CompetencyDimension.AI_ML
        elif any(kw in stderr_lower for kw in ["keyerror", "indexerror", "typeerror", "attributeerror", "syntaxerror"]):
            return StuckArchetype.PANIC_THRASHING, CompetencyDimension.CODING
        
        return StuckArchetype.PANIC_THRASHING, CompetencyDimension.CODING
