import { BuilderTrail, PortalSection } from "../types"

export interface BuilderRoleProfile {
  id: string
  title: string
  shortLabel: string
  readinessPct: number
  verifiedStrengths: number
  rankedGaps: number
  primaryBottleneck: string
  salaryTarget: string
  tagline: string
  contextNote: string
  keyStrengths: string[]
  keyGaps: { name: string; gapScore: number; priority: boolean }[]
}

export const builderSections: PortalSection[] = [
  { label: "Tree Overlay", id: "tree-overlay", view: 0 },
  { label: "Stuck Detector", id: "stuck-detector", view: 1 },
  { label: "Micro-Project", id: "micro-project", view: 2 },
  { label: "Trail Matching", id: "trail-matching", view: 3 },
  {
    label: "Confidence vs Competence",
    id: "confidence-vs-competence",
    view: 4,
  },
]

export const builderRoles: BuilderRoleProfile[] = [
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    shortLabel: "ML Engineer",
    readinessPct: 64,
    verifiedStrengths: 3,
    rankedGaps: 4,
    primaryBottleneck: "Model Evaluation & Calibration",
    salaryTarget: "₹18 – 28 LPA",
    tagline: "Bridge theoretical modeling notebooks to cost-sensitive production inference pipelines.",
    contextNote: "Calibrated for production ML teams needing verifiable offline/online metric parity.",
    keyStrengths: ["Python (Async/NumPy)", "SQL Querying", "Descriptive Statistics"],
    keyGaps: [
      { name: "Model Evaluation", gapScore: 49, priority: true },
      { name: "Deployment & Serving", gapScore: 47, priority: false },
      { name: "Machine Learning (Cost Curves)", gapScore: 33, priority: false },
      { name: "Data Processing Pipelines", gapScore: 29, priority: false },
    ],
  },
  {
    id: "data-analyst",
    title: "Data Analytics & BI Lead",
    shortLabel: "Analytics & BI",
    readinessPct: 78,
    verifiedStrengths: 5,
    rankedGaps: 2,
    primaryBottleneck: "Query Optimization & Warehousing",
    salaryTarget: "₹14 – 22 LPA",
    tagline: "Transform raw transactional lakes into low-latency executive decision metrics.",
    contextNote: "Focuses on DBT, snowflake partition tuning, and executive KPI alignment.",
    keyStrengths: ["SQL & Window Functions", "Tableau / Superset", "Exploratory Data Analysis", "Stakeholder Communication", "Business Acumen"],
    keyGaps: [
      { name: "Query Execution Profiling", gapScore: 42, priority: true },
      { name: "dbt Dimensional Modeling", gapScore: 31, priority: false },
    ],
  },
  {
    id: "big-data-architect",
    title: "Big Data & Distributed Systems Architect",
    shortLabel: "Big Data Architect",
    readinessPct: 52,
    verifiedStrengths: 2,
    rankedGaps: 5,
    primaryBottleneck: "Spark Memory Management & Partitioning",
    salaryTarget: "₹24 – 38 LPA",
    tagline: "Scale throughput to 50k events/sec across fault-tolerant distributed clusters.",
    contextNote: "Solves data skew, shuffle spills, and streaming backpressure in high-throughput topologies.",
    keyStrengths: ["Python Core", "Linux & Bash Automation"],
    keyGaps: [
      { name: "PySpark Partition Tuning", gapScore: 54, priority: true },
      { name: "Kafka Event Streaming", gapScore: 46, priority: false },
      { name: "Distributed Storage Sharding", gapScore: 38, priority: false },
      { name: "Airflow DAG Orchestration", gapScore: 30, priority: false },
      { name: "Kubernetes Cluster Sizing", gapScore: 25, priority: false },
    ],
  },
  {
    id: "ai-specialist",
    title: "AI & Deep Learning Specialist",
    shortLabel: "AI / Deep Learning",
    readinessPct: 45,
    verifiedStrengths: 2,
    rankedGaps: 6,
    primaryBottleneck: "Loss Convergence & Fine-Tuning",
    salaryTarget: "₹22 – 36 LPA",
    tagline: "Specialize in foundational models, parameter-efficient fine-tuning (LoRA), and embedding retrieval.",
    contextNote: "Designed for engineers transitioning from tabular models to multimodal generative architectures.",
    keyStrengths: ["Linear Algebra & PyTorch", "Matrix Calculus"],
    keyGaps: [
      { name: "LoRA / PEFT Tuning", gapScore: 58, priority: true },
      { name: "Vector Indexing (HNSW / FAISS)", gapScore: 51, priority: true },
      { name: "Gradient Clipping & Learning Schedules", gapScore: 44, priority: false },
      { name: "Token Economy & Quantization (GGUF)", gapScore: 36, priority: false },
      { name: "RAG Evaluation (Ragas Framework)", gapScore: 31, priority: false },
      { name: "Prompt Security & Jailbreak Guards", gapScore: 24, priority: false },
    ],
  },
  {
    id: "mlops-platform",
    title: "MLOps & Platform Engineer",
    shortLabel: "MLOps Platform",
    readinessPct: 71,
    verifiedStrengths: 4,
    rankedGaps: 3,
    primaryBottleneck: "Model Registry & Drift Monitoring",
    salaryTarget: "₹20 – 32 LPA",
    tagline: "Automate model CI/CD, artifact versioning, and real-time concept drift detection.",
    contextNote: "Builds self-healing inference pipelines with Prometheus, MLflow, and Kubernetes.",
    keyStrengths: ["Docker Containerization", "Git & CI/CD Actions", "Python SDKs", "Linux CLI"],
    keyGaps: [
      { name: "Feature Store Architecture (Feast)", gapScore: 48, priority: true },
      { name: "Concept & Covariate Drift (Evidently AI)", gapScore: 39, priority: false },
      { name: "Triton / TorchServe Latency Tuning", gapScore: 32, priority: false },
    ],
  },
]

export interface EnrichedBuilderTrail extends BuilderTrail {
  id: string
  category: "Model Evaluation" | "Pipelines & Infra" | "Analytics & Optimization"
  duration: string
  salaryUplift: string
  verifiedArtifact: string
  matchScore: number
  takeaway: string
}

export const builderTrails: EnrichedBuilderTrail[] = [
  {
    id: "trail-01",
    name: "Trail 01 · Backend to Data Platform",
    category: "Pipelines & Infra",
    profile: "Backend Engineer (Go/Node) transitioning to Distributed Data",
    started: "Basic Python & REST APIs",
    gap: "Data Structures & Stream Processing",
    action: "Built a low-latency event processing worker with Kafka and Redis deduplication",
    learning: "Streaming semantics, idempotency, and partition rebalancing",
    outcome: "Junior Data Platform Engineer",
    duration: "6 weeks",
    salaryUplift: "+42% hike",
    verifiedArtifact: "Idempotent Kafka consumer group with Prometheus metrics",
    matchScore: 92,
    takeaway: "Focusing on exactly one idempotent streaming pipeline proved more valuable to hiring managers than 4 generic courses.",
  },
  {
    id: "trail-02",
    name: "Trail 02 · SQL Analyst to Analytics Engineer",
    category: "Analytics & Optimization",
    profile: "Marketing Analyst moving into Core Data Warehousing",
    started: "Ad-hoc SQL reporting & spreadsheets",
    gap: "Query Optimization & Dimensional Modeling",
    action: "Benchmarked slow queries in Snowflake, rebuilt star schemas in dbt with incremental models",
    learning: "Clustering keys, execution plans, and dbt documentation tests",
    outcome: "Senior Analytics Engineer",
    duration: "5 weeks",
    salaryUplift: "+55% hike",
    verifiedArtifact: "Production dbt package with automated schema tests and 4x query speedup",
    matchScore: 96,
    takeaway: "Replacing slow legacy joins with an incremental dbt pipeline delivered instant portfolio proof.",
  },
  {
    id: "trail-03",
    name: "Trail 03 · Notebook ML to Production Engineer",
    category: "Model Evaluation",
    profile: "Self-taught ML learner stuck in Kaggle notebook phase",
    started: "Scikit-Learn notebooks with raw accuracy metrics",
    gap: "Model Evaluation & Calibration",
    action: "Compared four classification models against one consistent evaluation harness with cost matrices",
    learning: "Brier score calibration, PR-AUC, and error slice analysis",
    outcome: "Machine Learning Associate",
    duration: "4 weeks",
    salaryUplift: "+38% hike",
    verifiedArtifact: "Public evaluation harness repo with automated ROC-AUC reporting & CI pipeline",
    matchScore: 98,
    takeaway: "Demonstrating calibration curves and business dollar ROI distinguished this learner from hundreds of Kaggle notebook applicants.",
  },
  {
    id: "trail-04",
    name: "Trail 04 · Academic Researcher to Applied AI",
    category: "Model Evaluation",
    profile: "Math graduate transitioning to Applied Deep Learning",
    started: "Theoretical linear algebra & paper implementations",
    gap: "Model Packaging & Inference Optimization",
    action: "Quantized a BERT classifier with ONNX Runtime and benchmarked P99 latency on CPU",
    learning: "TensorRT, INT8 quantization, and Docker containerization",
    outcome: "AI Inference Specialist",
    duration: "7 weeks",
    salaryUplift: "+48% hike",
    verifiedArtifact: "Dockerized ONNX microservice serving 150 req/sec under 18ms latency",
    matchScore: 89,
    takeaway: "Bridging the gap between mathematical proofs and low-latency P99 SLA targets was the hiring team's #1 criteria.",
  },
  {
    id: "trail-05",
    name: "Trail 05 · DevOps to MLOps Specialist",
    category: "Pipelines & Infra",
    profile: "SysAdmin/DevOps engineer moving into Machine Learning Infra",
    started: "Kubernetes & Terraform scripts",
    gap: "Model Artifact Registries & Drift Telemetry",
    action: "Configured MLflow on AWS S3 with automated model deployment webhooks upon metric pass",
    learning: "Feature stores, Feast, Evidently AI drift monitoring",
    outcome: "MLOps Platform Engineer",
    duration: "6 weeks",
    salaryUplift: "+50% hike",
    verifiedArtifact: "Automated GitOps pipeline deploying validated models directly to KServe",
    matchScore: 94,
    takeaway: "Leveraged existing Kubernetes muscle to own the entire automated retraining loop.",
  },
  {
    id: "trail-06",
    name: "Trail 06 · Product Associate to Growth Data Lead",
    category: "Analytics & Optimization",
    profile: "Junior PM seeking rigorous quantitative grounding",
    started: "Mixpanel dashboards & qualitative user interviews",
    gap: "Causal Inference & Experimentation Rigor",
    action: "Designed CUPED variance reduction framework on historical product event cohorts",
    learning: "A/B testing sample sizing, statistical power, and multi-arm bandits",
    outcome: "Growth Analytics Lead",
    duration: "5 weeks",
    salaryUplift: "+45% hike",
    verifiedArtifact: "Interactive Streamlit experimentation simulator with CUPED correction",
    matchScore: 87,
    takeaway: "Replacing naive t-tests with variance-reduced CUPED calculations immediately unlocked senior product analytics roles.",
  },
]

export const builderGaps = [
  { skill: "Model Evaluation", gap: "49 pt gap", value: 31, priority: true },
  { skill: "Deployment", gap: "47 pt gap", value: 18, priority: false },
  { skill: "Machine Learning", gap: "33 pt gap", value: 52, priority: false },
  { skill: "Data Processing", gap: "29 pt gap", value: 46, priority: false },
]

export interface BehaviourSignalDetail {
  id: string
  signal: string
  evidence: string
  skill: string
  bottleneckHeading: string
  urgency: "High" | "Medium" | "Critical"
  telemetryStats: { stat: string; label: string; tone: "warm" | "sage" | "amber" | "crimson" }[]
  rootCause: string
  flaggedTelemetry: string[]
  recommendedAction: string
  microProjectPhase: number
  phaseName: string
  kernelLog: {
    command: string
    cell: string
    output: string
    errorType: string
    exitCode: number
  }
  codeComparison: {
    flawedTitle: string
    flawedCode: string
    flawExplanation: string
    remedyTitle: string
    remedyCode: string
    remedyExplanation: string
  }
  diagnosticAssertions: {
    id: string
    name: string
    check: string
    expected: string
  }[]
}

export const behaviourSignals: BehaviourSignalDetail[] = [
  {
    id: "sig-01",
    signal: "Repeatedly abandoning a topic",
    evidence: "3 exits during validation lessons",
    skill: "Model Evaluation",
    bottleneckHeading: "Model Evaluation & Decision Calibration",
    urgency: "Critical",
    telemetryStats: [
      { stat: "3 exits", label: "Early session aborts", tone: "crimson" },
      { stat: "4.2m", label: "Avg session duration", tone: "amber" },
      { stat: "0 PRs", label: "Code submissions completed", tone: "crimson" },
    ],
    rootCause:
      "Your telemetry suggests the issue is not lack of stamina. The pattern indicates cognitive friction at the mathematical junction between classification loss curves and business thresholding. You understand basic model fit, but lack a concrete cost framework to anchor decision thresholds.",
    flaggedTelemetry: [
      "Session abort timestamp correlates with PR-AUC vs ROC-AUC formulas",
      "Repeated browser tab switching to generic StackOverflow threads",
      "Zero code commits executed in notebook cell 4 (Threshold Tuning)",
    ],
    recommendedAction:
      "Build one isolated threshold optimization script using a pre-cleaned cohort dataset with concrete business dollar outcomes ($25 FP vs $450 FN).",
    microProjectPhase: 4,
    phaseName: "Phase 4: Model Evaluation & Threshold Tuning",
    kernelLog: {
      command: "python -m evaluate_thresholds --input predictions.parquet",
      cell: "04_model_evaluation_thresholds.py:Line 34",
      output: `[TELEMETRY TRACE] Inspecting threshold evaluation cell...
[FAIL] Threshold 0.50 produces 412 False Negatives ($185,400 churn loss).
Target expected cost < $50,000 not met.
AssertionError: Business loss exceeds $50k threshold at default cutoff 0.50.
[USER ACTION] Session aborted 2.1 minutes after exception. No retry detected.`,
      errorType: "AssertionError: Expected Business Loss SLA Exceeded",
      exitCode: 1,
    },
    codeComparison: {
      flawedTitle: "Learner's Attempt (Naive 0.5 Threshold)",
      flawedCode: `# Naive default threshold ignores $450 churn vs $25 coupon cost asymmetry
preds = (model.predict_proba(X_test)[:, 1] >= 0.50).astype(int)
print(f"Accuracy: {accuracy_score(y_test, preds):.2%}")  # 82% but high cost!`,
      flawExplanation: "Using default 0.5 cutoff on imbalanced churn data results in 412 missed churners, costing $185,400 in lost ARR.",
      remedyTitle: "Remediated Pipeline (Cost-Calibrated Curve)",
      remedyCode: `# Scan threshold range 0.05..0.95 to minimize total business loss
costs = [cost_fn(thresh, y_val, y_prob, c_fp=25, c_fn=450) for thresh in thresholds]
optimal_threshold = thresholds[np.argmin(costs)]  # Calibrates to 0.28 cutoff`,
      remedyExplanation: "Minimizes dollar costs directly, reducing false negatives by 68% and preserving $126,000 in customer retention.",
    },
    diagnosticAssertions: [
      { id: "a1", name: "Loss Matrix Asymmetry", check: "c_fp == 25 and c_fn == 450 verified", expected: "PASS" },
      { id: "a2", name: "Threshold Curve Sweep", check: "Evaluated 100 cutoffs between 0.01 and 0.99", expected: "PASS" },
      { id: "a3", name: "Cost Savings Bound", check: "Net retention savings >= $100,000", expected: "PASS" },
    ],
  },
  {
    id: "sig-02",
    signal: "Spending unusually long on a skill",
    evidence: "2.4× the demo completion time",
    skill: "Evaluation Metrics",
    bottleneckHeading: "Metric Selection Under Class Imbalance",
    urgency: "High",
    telemetryStats: [
      { stat: "2.4×", label: "Benchmark completion ratio", tone: "amber" },
      { stat: "68 min", label: "Time on 20-min task", tone: "amber" },
      { stat: "9 rewrites", label: "Notebook cell re-executions", tone: "warm" },
    ],
    rootCause:
      "You are attempting to optimize accuracy on an imbalanced dataset where 73.4% of clients stay. Because baseline accuracy stays artificially high (73%+), your intuition clashes with reality, causing hesitation and excessive loop debugging without forward progress.",
    flaggedTelemetry: [
      "High re-execution count on confusion matrix calculation block",
      "Long cursor idle periods inspecting F1-score vs Balanced Accuracy",
      "No assertions added to test cost matrix calculations",
    ],
    recommendedAction:
      "Switch from raw accuracy to Stratified K-Fold cross-validation with PR-AUC and minority class recall to receive immediate measurable feedback.",
    microProjectPhase: 3,
    phaseName: "Phase 3: Model Training & Cross-Validation",
    kernelLog: {
      command: "pytest tests/test_model_validation.py -v",
      cell: "03_model_train_cv.py:Line 22",
      output: `[TELEMETRY TRACE] Monitoring cross-validation loop...
WARNING: Model achieved 84.1% accuracy but only 0.12 recall on minority churners.
[TEST] test_minority_recall ... FAILED (expected >= 0.70, got 0.12)
[TELEMETRY] 9 consecutive notebook runs detected with zero changes to loss function weights.`,
      errorType: "MetricMismatchWarning: Blind Accuracy Optimization",
      exitCode: 1,
    },
    codeComparison: {
      flawedTitle: "Learner's Attempt (Accuracy Metric)",
      flawedCode: `# Optimizing standard accuracy rewards predicting 'No Churn' for all
scoring = ['accuracy']
cv_results = cross_validate(model, X, y, cv=5, scoring=scoring)`,
      flawExplanation: "Blind accuracy allows a trivial majority-class model to score 73%+ while detecting almost zero churners.",
      remedyTitle: "Remediated Pipeline (Stratified Multi-Metric)",
      remedyCode: `# Stratified folds with explicit minority recall and PR-AUC tracking
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scoring = ['roc_auc', 'recall', 'precision', 'f1']
cv_results = cross_validate(model, X, y, cv=cv, scoring=scoring)`,
      remedyExplanation: "Guarantees class distribution parity across splits and rewards models that identify churners early.",
    },
    diagnosticAssertions: [
      { id: "a4", name: "Stratified Split Parity", check: "26.6% churn ratio in every validation fold", expected: "PASS" },
      { id: "a5", name: "Minority Class Recall", check: "test_recall >= 0.72", expected: "PASS" },
      { id: "a6", name: "PR-AUC Score Integrity", check: "test_pr_auc >= 0.81", expected: "PASS" },
    ],
  },
  {
    id: "sig-03",
    signal: "Repeating similar mistakes",
    evidence: "Same validation error in 4 attempts",
    skill: "Cross-validation",
    bottleneckHeading: "Target Leakage & Temporal Split Pitfalls",
    urgency: "Critical",
    telemetryStats: [
      { stat: "4 repeats", label: "Repeated split regression errors", tone: "crimson" },
      { stat: "0.99 AUC", label: "Suspiciously perfect train score", tone: "crimson" },
      { stat: "0.58 AUC", label: "Out-of-fold validation collapse", tone: "amber" },
    ],
    rootCause:
      "You are applying standard transformations globally across the raw dataframe before splitting into folds. Future test timestamps and outlier ranges inadvertently leak into training scalers, causing the model to memorize future trends instead of learning generalizable patterns.",
    flaggedTelemetry: [
      "Scaler/imputer fitted before train_test_split instead of inside Pipeline",
      "Identical feature distribution detected between train and holdout",
      "Repeated TypeError on unseen categorical levels in test evaluation",
    ],
    recommendedAction:
      "Wrap preprocessing transformations inside a scikit-learn Pipeline with ColumnTransformer to physically prevent data leakage across folds.",
    microProjectPhase: 2,
    phaseName: "Phase 2: Feature Engineering",
    kernelLog: {
      command: "python -m feature_leakage_audit --strict",
      cell: "02_feature_pipeline.py:Line 18",
      output: `[TELEMETRY TRACE] Running AST static analysis on preprocessing pipeline...
CRITICAL: Node 'StandardScaler.fit_transform(df)' detected at module scope before split.
[METRIC AUDIT] Train AUC: 0.994 | Holdout AUC: 0.581 (Delta: 0.413)
DataLeakageWarning: Global distribution statistics contaminated validation holdout.
4 identical regression errors logged across past 42 minutes.`,
      errorType: "DataLeakageWarning: Global Preprocessing Leakage",
      exitCode: 1,
    },
    codeComparison: {
      flawedTitle: "Learner's Attempt (Global Scaling Leak)",
      flawedCode: `# Scaler fitted on FULL dataset leaks test distribution into training!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[num_cols])
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y)`,
      flawExplanation: "Test set mean and variance are leaked into the scaler, creating overconfident 0.99 train AUC that collapses to 0.58 on unseen data.",
      remedyTitle: "Remediated Pipeline (Isolated ColumnTransformer)",
      remedyCode: `# Scikit-Learn ColumnTransformer inside Pipeline fits only on training folds
preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), numeric_features),
    ('cat', OneHotEncoder(drop='first', sparse_output=False), categorical_features)
])
X = preprocessor.fit_transform(df)  # Strict boundary enforcement`,
      remedyExplanation: "Physically isolates preprocessing fitting to training data, restoring reliable out-of-fold generalization.",
    },
    diagnosticAssertions: [
      { id: "a7", name: "Pipeline Transformer Scope", check: "ColumnTransformer enclosed in fold pipeline", expected: "PASS" },
      { id: "a8", name: "Zero Mean Leakage", check: "Test fold statistics calculated strictly post-split", expected: "PASS" },
      { id: "a9", name: "Validation Delta Stability", check: "|Train AUC - Val AUC| < 0.05", expected: "PASS" },
    ],
  },
  {
    id: "sig-04",
    signal: "Avoiding certain task types",
    evidence: "Skipped interpretation tasks twice",
    skill: "Error Analysis",
    bottleneckHeading: "Model Explainability & SHAP Values",
    urgency: "Medium",
    telemetryStats: [
      { stat: "2 skips", label: "Optional review tasks bypassed", tone: "amber" },
      { stat: "100%", label: "Completion of raw fit() calls", tone: "sage" },
      { stat: "0%", label: "Feature attribution inspection", tone: "crimson" },
    ],
    rootCause:
      "You feel confident executing .fit() and .predict() algorithms, but hesitate when asked to justify why specific features drive individual predictions to non-technical stakeholders. This creates a barrier to senior-level trust and deployment clearance.",
    flaggedTelemetry: [
      "Direct skip from model serialization to summary slide",
      "No SHAP/TreeExplainer summary plots generated in notebook",
      "Qualitative error inspection notebook sections marked 'Later'",
    ],
    recommendedAction:
      "Run TreeExplainer on top misclassified false negatives and generate a concrete 1-page executive risk brief with SHAP feature rankings.",
    microProjectPhase: 4,
    phaseName: "Phase 4: Model Evaluation & Threshold Tuning",
    kernelLog: {
      command: "python -m generate_audit_report --check-explainability",
      cell: "04_model_evaluation_thresholds.py:Line 48",
      output: `[TELEMETRY TRACE] Verifying production deployment clearance...
[CHECK 1/2] Model weights serialized (.joblib): PASS
[CHECK 2/2] Feature attribution audit (SHAP / TreeExplainer): SKIPPED
GovernanceAlert: Deployment blocked by compliance gateway. Missing feature importance brief.
Learner telemetry: Task bypassed twice in session.`,
      errorType: "GovernanceAuditWarning: Missing Explainability Brief",
      exitCode: 0,
    },
    codeComparison: {
      flawedTitle: "Learner's Attempt (Black-Box Dump)",
      flawedCode: `# Model serialized without explaining feature drivers or auditability
joblib.dump(model, 'churn_model.joblib')
print("Model ready for deployment!")  # Stakeholders reject without explanations`,
      flawExplanation: "Black-box models fail production reviews when regulators or executives demand justification for customer risk scores.",
      remedyTitle: "Remediated Pipeline (TreeExplainer & Top Drivers)",
      remedyCode: `# Calculate SHAP values to attribute marginal churn risk by feature
import shap
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)
# Identifies Contract_TwoYear (impact: -0.42) and TechSupport_No (+0.34)`,
      remedyExplanation: "Generates interpretable risk rankings that executive retention teams and compliance officers can audit.",
    },
    diagnosticAssertions: [
      { id: "a10", name: "TreeExplainer Instantiation", check: "shap.TreeExplainer initialized with model", expected: "PASS" },
      { id: "a11", name: "Global Attribution Matrix", check: "Computed top 5 SHAP risk multipliers", expected: "PASS" },
      { id: "a12", name: "Executive Brief Packaging", check: "Clear non-technical stakeholder summary exported", expected: "PASS" },
    ],
  },
  {
    id: "sig-05",
    signal: "Silent NaN Coercion & Schema Breaks",
    evidence: "Unhandled ValueError in 3 ingest runs",
    skill: "Data Cleaning & Schema Hygiene",
    bottleneckHeading: "Schema Sanitation & Silent Type Coercion",
    urgency: "Critical",
    telemetryStats: [
      { stat: "3 crashes", label: "Runtime ValueError exceptions", tone: "crimson" },
      { stat: "348 nulls", label: "Silent whitespace string nulls", tone: "amber" },
      { stat: "100%", label: "Pipeline block rate", tone: "crimson" },
    ],
    rootCause:
      "Customer cohort CSV records contain whitespace blanks (' ') in numeric billing columns like TotalCharges. Calling standard .astype(float) triggers unhandled exceptions, breaking downstream transformers and stalling exploratory data analysis.",
    flaggedTelemetry: [
      "Repeated ValueError: could not convert string to float: ' '",
      "Manual attempt to delete rows instead of median imputation",
      "Zero domain boundary assertions (tenure >= 0) enforced in ingestion",
    ],
    recommendedAction:
      "Use pd.to_numeric with errors='coerce' followed by median imputation, and enforce strict positive domain checks on subscriber tenure.",
    microProjectPhase: 1,
    phaseName: "Phase 1: Data Ingestion & Hygiene",
    kernelLog: {
      command: "python 01_data_ingest_hygiene.py",
      cell: "01_data_ingest_hygiene.py:Line 12",
      output: `[TELEMETRY TRACE] Ingesting telecom_customer_churn_cohort.csv...
Traceback (most recent call last):
  File "01_data_ingest_hygiene.py", line 12, in <module>
    df['TotalCharges'] = df['TotalCharges'].astype(float)
ValueError: could not convert string to float: ' '
[TELEMETRY] 3 repeated runs failed at same line. 348 dirty whitespace entries unhandled.`,
      errorType: "ValueError: Silent String Whitespace in Float Column",
      exitCode: 1,
    },
    codeComparison: {
      flawedTitle: "Learner's Attempt (Brittle astype Coercion)",
      flawedCode: `# Brittle conversion crashes on whitespace strings (' ')
df['TotalCharges'] = df['TotalCharges'].astype(float)
# Crashes entire notebook execution with ValueError!`,
      flawExplanation: "Fails instantly when encountering 348 customer records with whitespace strings in historical billing.",
      remedyTitle: "Remediated Pipeline (pd.to_numeric & Median Impute)",
      remedyCode: `# Coerce blank strings to NaN, then impute with cohort median
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df['TotalCharges'] = df['TotalCharges'].fillna(df['TotalCharges'].median())
df = df[df['tenure'] >= 0]  # Enforce positive tenure bound`,
      remedyExplanation: "Safely parses all 12,450 records, imputes missing charges without data loss, and verifies clean schema.",
    },
    diagnosticAssertions: [
      { id: "a13", name: "Zero Remaining Nulls", check: "df['TotalCharges'].isnull().sum() == 0", expected: "PASS" },
      { id: "a14", name: "Valid Domain Bounds", check: "(df['tenure'] >= 0).all() == True", expected: "PASS" },
      { id: "a15", name: "Clean Categorical Types", check: "SeniorCitizen cast to categorical type", expected: "PASS" },
    ],
  },
]

export const builderTreeLeaves: {
  skill: string
  status: "verified" | "strong" | "priority" | "gap"
  left: number
  top: number
}[] = [
  { skill: "Python", status: "verified", left: 50, top: 18 },
  { skill: "SQL", status: "verified", left: 25, top: 36 },
  { skill: "Statistics", status: "strong", left: 14, top: 20 },
  { skill: "Machine Learning", status: "gap", left: 73, top: 27 },
  { skill: "Model Evaluation", status: "priority", left: 87, top: 14 },
  { skill: "Data Processing", status: "gap", left: 78, top: 61 },
  { skill: "Deployment", status: "gap", left: 91, top: 48 },
  { skill: "Communication", status: "verified", left: 38, top: 50 },
]

export const projectChecklistItems = [
  { step: "Choose a small public dataset", time: "30 min" },
  { step: "Create five baseline queries", time: "90 min" },
  { step: "Profile and improve each query", time: "3–4 hours" },
  { step: "Write the before-and-after note", time: "90 min" },
]
