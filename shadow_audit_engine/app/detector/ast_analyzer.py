"""
ast_analyzer.py
Performs AST static analysis on Python data science snippets to detect pipeline anti-patterns.
"""
import ast
from typing import Dict, Any

class DSASTAnalyzer:
    def inspect_code(self, code_snippet: str) -> Dict[str, Any]:
        results = {
            "has_fit_transform_on_test": False,
            "has_iterative_dataframe_loop": False,
        }
        if not code_snippet or not code_snippet.strip():
            return results
        
        try:
            tree = ast.parse(code_snippet)
            for node in ast.walk(tree):
                # Detect .fit_transform(X_test) or test in fit_transform call
                if isinstance(node, ast.Call):
                    if isinstance(node.func, ast.Attribute) and node.func.attr == "fit_transform":
                        for arg in node.args:
                            if isinstance(arg, ast.Name) and "test" in arg.id.lower():
                                results["has_fit_transform_on_test"] = True
                # Detect .iterrows() or for loops over dataframe rows
                elif isinstance(node, ast.For):
                    if isinstance(node.iter, ast.Call):
                        if isinstance(node.iter.func, ast.Attribute) and node.iter.func.attr in ("iterrows", "itertuples"):
                            results["has_iterative_dataframe_loop"] = True
        except Exception:
            # Fallback string check if AST parsing fails on partial snippets
            code_lower = code_snippet.lower()
            if "fit_transform(" in code_lower and "test" in code_lower:
                results["has_fit_transform_on_test"] = True
            if ".iterrows()" in code_lower or ".itertuples()" in code_lower:
                results["has_iterative_dataframe_loop"] = True
                
        return results
