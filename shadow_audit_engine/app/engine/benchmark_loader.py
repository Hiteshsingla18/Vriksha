import os
import pandas as pd
import numpy as np
from typing import Dict, Any, List
import logging

logger = logging.getLogger(__name__)

class BenchmarkDatasetLoader:
    _instance = None
    
    def __new__(cls, data_dir: str = "./data"):
        if cls._instance is None:
            cls._instance = super(BenchmarkDatasetLoader, cls).__new__(cls)
            cls._instance.data_dir = data_dir
            cls._instance.jds_traits_df = None
            cls._instance.analytics_jobs_df = None
            cls._instance.datascience_jobs_df = None
            cls._instance.load_all()
        return cls._instance

    def load_all(self):
        # Locate files in parent or local data_dir
        possible_paths = [
            self.data_dir,
            "c:/Users/tanis/OneDrive/Documents/Vriksha",
            "../"
        ]
        
        jds_file = self._find_file("cleaned_JDS_Skill_Traits.csv", possible_paths)
        analytics_file = self._find_file("cleaned_Analytics_Jobs.csv", possible_paths)
        ds_file = self._find_file("cleaned_DataScience_Jobs.csv", possible_paths)

        if jds_file and os.path.exists(jds_file):
            try:
                self.jds_traits_df = pd.read_csv(jds_file)
                logger.info(f"Loaded JDS Traits CSV with {len(self.jds_traits_df)} records.")
            except Exception as e:
                logger.error(f"Error loading JDS Traits CSV: {e}")

        if analytics_file and os.path.exists(analytics_file):
            try:
                self.analytics_jobs_df = pd.read_csv(analytics_file)
                logger.info(f"Loaded Analytics Jobs CSV with {len(self.analytics_jobs_df)} records.")
            except Exception as e:
                logger.error(f"Error loading Analytics Jobs CSV: {e}")

        if ds_file and os.path.exists(ds_file):
            try:
                self.datascience_jobs_df = pd.read_csv(ds_file)
                logger.info(f"Loaded DataScience Jobs CSV with {len(self.datascience_jobs_df)} records.")
            except Exception as e:
                logger.error(f"Error loading DataScience Jobs CSV: {e}")

    def _find_file(self, filename: str, paths: List[str]) -> str:
        for p in paths:
            full = os.path.join(p, filename)
            if os.path.exists(full):
                return full
        return filename

    def get_salary_benchmark_lpa(self, experience_years: float, role_title: str = "Data Scientist") -> float:
        if self.datascience_jobs_df is not None and not self.datascience_jobs_df.empty:
            df = self.datascience_jobs_df
            # Filter close to experience
            matching = df[abs(df['min_experience'] - experience_years) <= 2]
            if not matching.empty and 'avg_salary' in matching.columns:
                return float(matching['avg_salary'].mean())

        if self.analytics_jobs_df is not None and not self.analytics_jobs_df.empty:
            df = self.analytics_jobs_df
            matching = df[abs(df['avg_experience'] - experience_years) <= 2]
            if not matching.empty and 'mid_salary_lpa' in matching.columns:
                return float(matching['mid_salary_lpa'].mean())

        # Standard industry benchmark rule fallback
        return round(4.5 + experience_years * 2.8, 1)

    def get_composite_score_75th_percentile(self) -> float:
        if self.jds_traits_df is not None and 'composite_skill_score' in self.jds_traits_df.columns:
            return float(self.jds_traits_df['composite_skill_score'].quantile(0.75))
        return 4.25  # Out of 5.0 (equivalent to 85% or 3.75 for 75%)
