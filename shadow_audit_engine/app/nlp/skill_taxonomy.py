import re
from typing import Dict, List, Set, Tuple

SKILL_TAXONOMY: Dict[str, Dict[str, List[str]]] = {
    "maths_stats": {
        "Linear Algebra & Matrix Ops": ["linear algebra", "matrix decomposition", "eigenvalues", "eigenvectors", "pca", "svd"],
        "Probability & Distributions": ["probability", "bayes", "bayesian", "distributions", "poisson", "gaussian", "normal distribution", "bernoulli"],
        "Hypothesis Testing & A/B Testing": ["hypothesis testing", "a/b testing", "p-value", "t-test", "chi-square", "anova", "confidence intervals", "experimentation"],
        "Statistical Modeling & Time Series": ["statistical modeling", "time series", "arima", "sarima", "prophet", "econometrics", "forecasting", "regression analysis"]
    },
    "coding": {
        "Core Languages": ["python", "r language", "c++", "java", "scala", "go", "typescript", "javascript", "sql", "plsql"],
        "Software Engineering": ["data structures", "algorithms", "object-oriented programming", "oop", "system design", "clean code", "refactoring"],
        "DevOps & Control": ["git", "github", "gitlab", "ci/cd", "unit testing", "pytest", "docker", "bash", "linux", "rest api", "fastapi", "flask"]
    },
    "ai_ml": {
        "Classical Machine Learning": ["machine learning", "scikit-learn", "xgboost", "lightgbm", "catboost", "random forest", "decision trees", "logistic regression", "clustering", "k-means"],
        "Deep Learning & Frameworks": ["deep learning", "pytorch", "tensorflow", "keras", "neural networks", "cnn", "rnn", "lstm"],
        "NLP & GenAI": ["natural language processing", "nlp", "spacy", "nltk", "transformers", "huggingface", "bert", "llm", "large language models", "rag", "genai", "prompt engineering", "langchain"],
        "Computer Vision & Reinforcement Learning": ["computer vision", "opencv", "yolo", "reinforcement learning", "q-learning"]
    },
    "dashboard_storytelling": {
        "BI & Visualization Tools": ["tableau", "powerbi", "power bi", "looker", "tableau desktop", "metabase", "superset", "d3.js", "plotly", "seaborn", "matplotlib"],
        "Storytelling & Reporting": ["data storytelling", "dashboarding", "executive reporting", "kpi design", "business intelligence", "stakeholder management", "insights presentation", "analytics storytelling"]
    },
    "big_data": {
        "Distributed Computing & Processing": ["apache spark", "pyspark", "hadoop", "mapreduce", "kafka", "hive", "flink", "databricks"],
        "Data Warehousing & Cloud Data": ["snowflake", "google bigquery", "bigquery", "aws redshift", "redshift", "clickhouse", "databox", "data lake", "iceberg"],
        "Orchestration & Storage": ["apache airflow", "airflow", "kubernetes", "k8s", "aws", "gcp", "azure", "etl", "elt", "data pipeline", "dbt"]
    }
}

# Flat lookup mapping: lowercase skill -> (dimension_key, canonical_name)
FLAT_SKILL_LOOKUP: Dict[str, Tuple[str, str]] = {}
for dim_key, clusters in SKILL_TAXONOMY.items():
    for cluster_name, skills in clusters.items():
        for skill in skills:
            FLAT_SKILL_LOOKUP[skill.lower()] = (dim_key, skill.title())

def extract_skills_from_text(text: str) -> Dict[str, List[str]]:
    text_lower = text.lower()
    extracted: Dict[str, Set[str]] = {
        "maths_stats": set(),
        "coding": set(),
        "ai_ml": set(),
        "dashboard_storytelling": set(),
        "big_data": set()
    }

    # Match exact skills
    for skill_phrase, (dim_key, canonical_name) in FLAT_SKILL_LOOKUP.items():
        pattern = r'\b' + re.escape(skill_phrase) + r'\b'
        if re.search(pattern, text_lower):
            extracted[dim_key].add(canonical_name)

    # Convert sets to sorted lists
    return {k: sorted(list(v)) for k, v in extracted.items()}

def get_dimension_name(dim_key: str) -> str:
    labels = {
        "maths_stats": "Mathematics & Statistics",
        "coding": "Coding & Software Fundamentals",
        "ai_ml": "AI, ML & Modeling",
        "dashboard_storytelling": "Data Storytelling & Dashboarding",
        "big_data": "Infrastructure & Big Data Tools"
    }
    return labels.get(dim_key, dim_key)
