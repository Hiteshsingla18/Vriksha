import {
  CareerRoom,
  ExplorerField,
  ExplorerProfile,
  PortalSection,
} from "../types"
import datasetSearchIndex from "./datasetSearchIndex.json"

export interface SearchResultItem {
  query: string
  matchCount: number
  avgSalaryLpa: number
  salaryRange: string
  topCities: string[]
  topSkills: string[]
}

export const datasetIndex: Record<string, SearchResultItem> = datasetSearchIndex

export const explorerSections: PortalSection[] = [
  { label: "Career Rooms", id: "career-rooms", view: 0 },
  { label: "Regret Radar", id: "regret-radar", view: 1 },
  { label: "Family Brief", id: "family-brief", view: 2 },
  { label: "React to Real Work", id: "react-to-real-work", view: 3 },
  { label: "Nearby, Not Famous", id: "nearby-not-famous", view: 4 },
  { label: "Forest View", id: "forest-view", view: 5 },
]

export const explorerRooms: CareerRoom[] = [
  {
    field: "AI & Machine Learning",
    title: "Diagnose the Model Drift",
    time: "45 min",
    description:
      "A production customer churn model drops 14% in F1-score after an ingestion schema shift. Inspect feature distributions and isolate the covariate drift.",
    task:
      "Inspect feature drift telemetry, verify whether degradation is covariate or concept shift, and design the retrain pipeline trigger.",
    skills: ["Covariate Drift Analysis", "Feature Distributions", "Scikit-Learn Telemetry"],
  },
  {
    field: "Big Data Engineering",
    title: "Untangle the Streaming Bottleneck",
    time: "40 min",
    description:
      "A PySpark structured streaming job lags behind Kafka partition offsets during peak evening telemetry. Inspect shuffle skew and optimize resource partitions.",
    task:
      "Inspect shuffle read skew, identify the straggler partition, and repartition the streaming window without OOMing the executors.",
    skills: ["Apache Spark", "Kafka Offsets", "Distributed Memory Sizing"],
  },
  {
    field: "Analytics & BI Storytelling",
    title: "Causal Deck for the Board",
    time: "35 min",
    description:
      "User acquisition is up 40% but revenue per cohort is flat. Dissect the SQL telemetry, locate the leakage, and craft an executive-ready causal narrative.",
    task:
      "Query cohort retention metrics, isolate drop-offs across new trial tiers, and draft the 3-point board takeaway with clean visual proofs.",
    skills: ["SQL Cohort Analysis", "Executive Storytelling", "Causal Business Framing"],
  },
  {
    field: "Data Software & Cloud",
    title: "Optimize the Slow SQL Join",
    time: "40 min",
    description:
      "A daily analytical aggregation query across 40M rows times out during nocturnal pipeline runs. Profile the execution plan and fix the cartesian join.",
    task:
      "Analyze the EXPLAIN query plan, replace redundant cartesian joins with window functions, and optimize the warehouse indexing strategy.",
    skills: ["Query Plan Profiling", "SQL Window Functions", "Index Optimization"],
  },
  {
    field: "Applied Statistics & Maths",
    title: "Evaluate the A/B Experiment",
    time: "35 min",
    description:
      "A product squad claims an experimental model variation boosted user engagement by 3.2%. Verify sample variance and determine true significance.",
    task:
      "Calculate standard error, verify p-value and confidence intervals, and advise leadership whether to roll out or discard the false positive.",
    skills: ["Hypothesis Testing", "Statistical Significance", "P-Value & Confidence Intervals"],
  },
  {
    field: "MLOps & Production Systems",
    title: "Triage LLM Hallucinations",
    time: "50 min",
    description:
      "An enterprise RAG system produces confident inaccuracies on internal docs. Inspect chunk retrieval cosine similarity and calibrate threshold bounds.",
    task:
      "Inspect vector embedding retrieval scores, tune cosine thresholds, and engineer ground-truth guardrails into the prompt template.",
    skills: ["Vector Similarity Evaluation", "Chunk Calibration", "RAG Prompt Guardrails"],
  },
]

export const explorerProfiles: ExplorerProfile[] = [
  {
    name: "Aarav Singhal",
    role: "Senior Data Scientist",
    location: "Bengaluru",
    years: "5 years",
    pathway:
      "Mathematics Degree → Python & SQL Projects → Junior Data Analyst → Senior Data Scientist (Fractal Analytics)",
    skills: ["Python", "Machine Learning", "PyTorch", "Feature Engineering"],
  },
  {
    name: "Meera Krishnan",
    role: "Big Data Engineer",
    location: "Pune",
    years: "4 years",
    pathway:
      "Computer Science → Database Administrator → PySpark & Hadoop Pipelines → Big Data Lead (Tiger Analytics)",
    skills: ["Apache Spark", "Hadoop", "Kafka", "Data Modeling"],
  },
  {
    name: "Kavita Reddy",
    role: "Analytics & BI Specialist",
    location: "Hyderabad",
    years: "3 years",
    pathway:
      "Economics Graduate → Excel & SQL Reporting → Tableau Certification → BI Storyteller (Mu Sigma)",
    skills: ["SQL", "Tableau", "PowerBI", "Executive Dashboards"],
  },
  {
    name: "Aditya Verma",
    role: "MLOps Engineer",
    location: "Gurgaon",
    years: "4 years",
    pathway:
      "Backend Python Developer → Docker & Cloud Deployments → MLflow Integration → MLOps Lead (Accenture AI Labs)",
    skills: ["Docker", "FastAPI", "Kubernetes", "Model Drift Telemetry"],
  },
  {
    name: "Neha Nair",
    role: "Quantitative Analyst",
    location: "Mumbai",
    years: "6 years",
    pathway:
      "Statistics Degree → Actuarial Science → Financial Time-Series → Lead Risk Modeler (CRISIL)",
    skills: ["Applied Statistics", "R", "Time-Series", "Risk Modeling"],
  },
  {
    name: "Vikram Patel",
    role: "Cloud Data Platform Engineer",
    location: "Chennai",
    years: "3 years",
    pathway:
      "IT Engineering → Cloud Certifications → Airflow ETL Pipelines → Cloud Data Architect (Cognizant)",
    skills: ["AWS", "Airflow", "Snowflake", "Python"],
  },
]

export const explorerFields: ExplorerField[] = [
  {
    name: "AI & Machine Learning",
    status: "Growing",
    height: 96,
    overview:
      "Extract non-linear patterns, train deep neural networks, and deploy intelligent agents that adapt in real time.",
    roles: ["Data Scientist", "Machine Learning Engineer", "NLP Specialist", "Deep Learning Researcher"],
    skills: ["Python", "PyTorch", "Scikit-learn", "Deep Learning", "NLP", "Feature Engineering"],
    related: ["Big Data & Distributed Systems", "Applied Statistics & Maths", "MLOps & Production Systems"],
  },
  {
    name: "Big Data & Distributed Systems",
    status: "Growing",
    height: 90,
    overview:
      "Architect high-throughput data backbones, distributed clusters, and real-time streaming engines across millions of records.",
    roles: ["Big Data Engineer", "Data Architect", "PySpark Developer", "ETL Infrastructure Lead"],
    skills: ["Apache Spark", "Hadoop", "PySpark", "Kafka", "Hive", "Distributed Computing"],
    related: ["AI & Machine Learning", "Data Software & Cloud", "Analytics & BI Storytelling"],
  },
  {
    name: "Analytics & BI Storytelling",
    status: "Steady",
    height: 82,
    overview:
      "Translate high-dimensional database telemetry into causal executive dashboards and strategic business clarity.",
    roles: ["Business Analyst", "BI Developer", "Analytics Consultant", "Product Analytics Lead"],
    skills: ["SQL", "Tableau", "PowerBI", "SAS", "Causal Narrative", "Metric Synthesis"],
    related: ["Applied Statistics & Maths", "Data Software & Cloud", "AI & Machine Learning"],
  },
  {
    name: "Data Software & Cloud",
    status: "Growing",
    height: 86,
    overview:
      "Build production-grade data pipelines, microservices, orchestrators, and scalable cloud data warehouses.",
    roles: ["Data Software Engineer", "Cloud Data Architect", "Pipeline Engineer", "Database Specialist"],
    skills: ["Python", "SQL", "Airflow", "Docker", "AWS", "Snowflake / BigQuery"],
    related: ["Big Data & Distributed Systems", "MLOps & Production Systems", "Analytics & BI Storytelling"],
  },
  {
    name: "Applied Statistics & Maths",
    status: "Steady",
    height: 78,
    overview:
      "Ground business decisions in probabilistic inference, experimental design, and quantitative rigor.",
    roles: ["Quantitative Analyst", "Statistical Modeler", "A/B Testing Scientist", "Risk Modeler"],
    skills: ["Probability & Stats", "Linear Algebra", "A/B Testing", "Econometrics", "Hypothesis Testing"],
    related: ["AI & Machine Learning", "Analytics & BI Storytelling", "Data Software & Cloud"],
  },
  {
    name: "MLOps & Production Systems",
    status: "Emerging",
    height: 94,
    overview:
      "Bridge experimental models to resilient 24/7 production environments with automated CI/CD and drift observability.",
    roles: ["MLOps Engineer", "ML Platform Engineer", "Model Reliability Specialist", "AI Systems Lead"],
    skills: ["Feature Stores", "Model Drift Detection", "MLflow", "Docker", "FastAPI", "Kubernetes"],
    related: ["AI & Machine Learning", "Big Data & Distributed Systems", "Data Software & Cloud"],
  },
]
