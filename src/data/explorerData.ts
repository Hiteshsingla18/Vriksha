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
    id: "data-analytics-bi",
    field: "Data Analytics & BI",
    title: "Data Analytics & BI",
    time: "35 min",
    icon: "⌕",
    category: "Data Science",
    description:
      "Transform complex data into actionable business insights through interactive dashboards and reports.",
    task:
      "Validate row grain, define a governed KPI with stakeholders, and publish an executive readout with explicit uncertainty bounds.",
    skills: ["SQL", "Tableau", "Power BI", "dbt", "Python (pandas)", "Causal Dashboards"],
    focus: ["SQL", "Dashboards", "Storytelling", "Reporting"],
    workOverview: [
      "An analytics day often starts by clarifying a decision: which customer journey changed, whether an operations target is on track, or what should be prioritized next. Analysts inspect source tables, reconcile definitions with data owners, write SQL or Python transformations, and validate totals against trusted operational records before interpreting a trend.",
      "Much of the work is collaborative. Product managers, finance, marketing and operations bring different definitions of success, so analysts agree on a KPI, population, time window and caveats before building a view. In 2026, governed semantic layers and shared metric catalogs reduce conflicting dashboard numbers, but the analyst still explains what a measure includes and what it cannot establish.",
      "The technical challenge is making reporting both reliable and useful: handling late or duplicated events, tracking missingness, choosing the right grain, and preventing a misleading chart from turning correlation into causation. A typical workflow moves from a documented question to a tested dataset, a dashboard or concise written readout, and a follow-up decision whose impact can be measured."
    ],
    trends: [
      "Governed semantic layers and metric catalogs make KPI definitions reusable across dashboards.",
      "Data observability and automated freshness, schema and quality checks catch broken reporting before business reviews.",
      "Self-service BI is expanding, increasing the need for certified datasets, access controls and clear metric ownership.",
      "AI-assisted natural-language querying speeds exploration, while SQL validation and source traceability remain essential.",
      "Real-time product analytics and experimentation connect dashboard signals to decisions with explicit uncertainty."
    ],
    tools: ["SQL: PostgreSQL, BigQuery, Snowflake", "Python: pandas, Jupyter, scikit-learn", "BI: Tableau, Power BI, Looker", "Modeling: dbt and metric/semantic layers", "Quality: Great Expectations, dashboard certification", "SAS Viya for enterprise analytics"],
    halfLife: "Indicative planning ranges: individual BI product interfaces change within 2–3 years; SQL/Python ecosystem workflows refresh every 3–5 years; statistical reasoning, measurement design and clear communication remain useful for 7–10+ years.",
    careerRunway: "Runway: analyst → senior/product analyst → analytics lead or analytics engineer → BI/insights manager or decision-science leader. Progression comes from owning trusted metrics and influencing business decisions.",
    growth: ["Reporting / data analyst", "Data Analytics & BI Analyst", "Senior analyst / analytics lead", "Analytics manager / decision scientist"],
    tasks: [
      { title: "Frame the decision", description: "Write the stakeholder question, intended action and unit of analysis; clarify the population and time window before querying." },
      { title: "Validate the source data", description: "Check row grain, joins, duplicate meaning, missingness and freshness; reconcile a sample of totals to a trusted source." },
      { title: "Define a governed KPI", description: "Document the numerator, denominator, filters and reporting cadence, then confirm the definition with its business owner." },
      { title: "Build and test the view", description: "Choose a chart that fits the comparison, add useful segments, and test filters, edge cases and accessibility." },
      { title: "Communicate an actionable finding", description: "Summarize the signal, uncertainty and limitations; recommend a next step and name how its outcome will be measured." }
    ],
    lab: {
      type: "scenario",
      title: "Clean-data reporting check",
      description: "Choose a sound data-cleaning and reporting step before publishing an analytics result.",
      question: "A weekly report contains duplicated order IDs and missing city values. What should you do before comparing sales by city?",
      options: [
        "Check duplicate semantics, document how records are handled, and report missing-city coverage",
        "Drop every incomplete row without checking how many are affected",
        "Replace missing cities with the most common city and publish the totals"
      ],
      answer: 0
    }
  },
  {
    id: "machine-learning-engineering",
    field: "Machine Learning Engineering",
    title: "Machine Learning Engineering",
    time: "45 min",
    icon: "✧",
    category: "Data Science",
    description:
      "Build, deploy, and scale production-grade ML models and automated pipelines.",
    task:
      "Check data contracts, engineer leakage-safe features, evaluate against strong baselines, and specify release monitoring gates.",
    skills: ["Python", "PyTorch", "scikit-learn", "MLflow", "Docker", "Kubernetes", "Evidently AI"],
    focus: ["Models", "MLOps", "Deployment", "Pipelines"],
    workOverview: [
      "Machine-learning engineering connects experimentation to a dependable product capability. A day may include reviewing a data contract, building leakage-safe features, comparing a candidate model to a simple baseline, and pairing with product or platform engineers to understand latency, cost, privacy and reliability constraints.",
      "The work is stakeholder-heavy: product teams define the outcome and acceptable trade-offs, data engineers maintain upstream pipelines, security and governance partners review sensitive data, and operations teams need clear ownership when behavior changes. Engineers turn those requirements into measurable acceptance criteria, deployment plans, rollback conditions and documentation that model users can understand.",
      "In 2026, a real workflow extends well beyond training. Versioned datasets, feature pipelines, experiment tracking, CI checks, staged releases and production monitoring help detect data quality regressions, drift, latency and uneven performance. The central technical challenge is preserving a valid evaluation while making the complete system reproducible, observable and safe to change."
    ],
    trends: [
      "Automated MLOps governance increasingly attaches lineage, approval evidence, model cards and policy checks to each release.",
      "Online and real-time feature stores reduce training-serving skew, with freshness and point-in-time correctness treated as production requirements.",
      "LLM and generative-model evaluation frameworks add task-specific quality, safety, cost and human-review checks to release gates.",
      "Model observability is broadening from drift alerts to data contracts, subgroup performance, latency and incident response.",
      "Smaller, optimized models and hardware-aware inference are gaining focus as teams balance quality, latency, privacy and serving cost."
    ],
    tools: ["Python, NumPy, pandas, scikit-learn", "PyTorch and XGBoost", "MLflow or Weights & Biases for experiment tracking", "Airflow, Prefect or Kubeflow for orchestration", "Feast feature stores", "Docker, Kubernetes, GitHub Actions and model-serving APIs", "Evidently or custom monitoring for drift and quality"],
    halfLife: "Indicative planning ranges: specific framework APIs and managed services shift within 1–3 years; deployment and orchestration patterns refresh every 3–5 years; probability, optimization, causal reasoning, evaluation design and software fundamentals retain value for 7–10+ years.",
    careerRunway: "Runway: ML/data engineer → senior ML engineer → staff/principal engineer or ML platform lead → engineering manager, architect or applied-AI leader. Broader scope means owning systems and business outcomes.",
    growth: ["Data / ML analyst", "Machine Learning Engineer", "Senior / staff ML engineer", "ML platform lead / AI architect"],
    tasks: [
      { title: "Translate the product need", description: "Define the user, decision, target, success metric, latency and cost limits, and when a non-ML rule is preferable." },
      { title: "Build a trustworthy data slice", description: "Check label quality, sampling and temporal boundaries; document sensitive fields and prevent target or future-data leakage." },
      { title: "Create reproducible features", description: "Version transformations, fit preprocessing only on training folds, and verify point-in-time correctness for historical examples." },
      { title: "Evaluate against a baseline", description: "Use an appropriate split and task metric, inspect important error slices, and record uncertainty and known failure modes." },
      { title: "Release and operate safely", description: "Define CI checks, staged rollout and rollback criteria; monitor data quality, latency and outcomes with a named owner." }
    ],
    lab: {
      type: "scenario",
      title: "Feature engineering & model release",
      description: "Protect evaluation validity while preparing a machine-learning model for deployment.",
      question: "A feature scaler improves validation results, but it was fitted once using the entire dataset. What is the safest next step?",
      options: [
        "Split the data first, fit feature transformations on training data, then evaluate on held-out data",
        "Keep the scaler because validation performance is higher",
        "Deploy the model and fit a new scaler from each individual prediction"
      ],
      answer: 0
    }
  },
  {
    id: "big-data-engineering",
    field: "Big Data Engineering",
    title: "Big Data Engineering",
    time: "40 min",
    icon: "⌘",
    category: "Data Science",
    description:
      "Design and optimize large-scale data architecture, data lakes, and high-throughput pipelines.",
    task:
      "Design stable ingestion contracts, optimize Apache Spark partitions, implement idempotent recovery, and publish monitored data products.",
    skills: ["Apache Spark", "PySpark", "Kafka", "Hadoop", "Delta Lake", "Apache Iceberg", "Airflow"],
    focus: ["Spark", "Hadoop", "Data warehousing", "ETL"],
    workOverview: [
      "Big data engineers build the dependable path between event producers, storage and the datasets used by analysts and machine-learning teams. Daily work ranges from designing schemas and ingestion contracts to tuning Spark jobs, reviewing partition strategies, managing backfills and diagnosing a delayed or unexpectedly expensive pipeline.",
      "They coordinate with application engineers who emit events, analysts who need stable definitions, infrastructure teams who manage compute and storage, and governance partners who set retention and access rules. Clear data contracts and service-level expectations help these groups agree on freshness, completeness, ownership and what happens when upstream formats change.",
      "A modern workflow might ingest batch files and event streams into object storage, validate and transform them into curated lakehouse tables, then publish monitored outputs for downstream consumers. The hard parts are operational: skewed workloads, late data, schema evolution, duplicate delivery, retries, recovery and cost. Reliable designs use idempotency, checkpoints, lineage and observable quality rather than assuming every job succeeds once."
    ],
    trends: [
      "Lakehouse table formats such as Apache Iceberg, Delta Lake and Hudi bring transactional updates and schema evolution to object storage.",
      "Streaming and change-data-capture pipelines increasingly support low-latency product analytics alongside batch processing.",
      "Data contracts, lineage and automated quality gates are becoming platform defaults for preventing silent downstream breakage.",
      "Compute optimization emphasizes autoscaling, workload isolation, storage/compute separation and cost attribution by data product.",
      "Orchestration is shifting toward observable, recoverable workflows with replayable inputs and explicit freshness objectives."
    ],
    tools: ["Apache Spark / PySpark and Hadoop ecosystem", "Kafka, Flink and Debezium for streaming/CDC", "Airflow, Dagster or Prefect for orchestration", "Delta Lake, Apache Iceberg or Hudi", "Cloud object storage, Snowflake, BigQuery, Databricks", "dbt, Great Expectations and OpenLineage", "Terraform, Docker, Git and CI pipelines"],
    halfLife: "Indicative planning ranges: vendor-specific data-platform interfaces change within 2–4 years; pipeline and orchestration patterns refresh every 3–5 years; distributed-systems reasoning, data modeling, fault tolerance and storage fundamentals remain useful for 7–10+ years.",
    careerRunway: "Runway: ETL/data developer → data engineer → senior/platform engineer → staff engineer or data architect → platform lead or data engineering manager. Growth follows stewardship of critical data products, reliability, and cost.",
    growth: ["ETL / data developer", "Big Data Engineer", "Senior / platform data engineer", "Data architect / platform lead"],
    tasks: [
      { title: "Specify the data product", description: "Identify producers and consumers, expected volume, freshness objective, retention, access rules and accountable owner." },
      { title: "Design schema and ingestion", description: "Choose a stable event/table contract, document schema evolution and define handling for late, malformed or duplicate records." },
      { title: "Plan scalable storage and compute", description: "Select partitioning and file sizing based on query patterns; estimate shuffle, throughput and cost before scaling resources." },
      { title: "Make processing recoverable", description: "Use idempotent writes, checkpoints and replayable inputs; define backfill procedures and test failure recovery." },
      { title: "Instrument and publish", description: "Add freshness, volume and quality checks, expose lineage and alerts, then document the consumer-facing contract." }
    ],
    lab: {
      type: "scenario",
      title: "Distributed pipeline recovery",
      description: "Select a retry strategy that keeps a distributed ingestion pipeline reliable.",
      question: "A worker fails after writing a batch, then retries it. How should the pipeline prevent duplicate output?",
      options: [
        "Use an idempotent write key or transactional checkpoint and verify the batch before advancing",
        "Increase parallelism and append every retry as a new batch",
        "Disable retries so failed batches are never written twice"
      ],
      answer: 0
    }
  },
  {
    id: "ai-research-innovation",
    field: "AI & Deep Learning",
    title: "AI & Deep Learning",
    time: "50 min",
    icon: "⌬",
    category: "Data Science",
    description:
      "Research and implement cutting-edge artificial intelligence, transformer models, and neural network architectures.",
    task:
      "Formulate falsifiable research hypotheses, establish reproducible benchmarks, evaluate multimodal architectures, and verify safety guardrails.",
    skills: ["PyTorch", "Transformers", "NLP", "Computer Vision", "Multimodal Architectures", "Weights & Biases"],
    focus: ["NLP", "Computer Vision", "Neural networks"],
    workOverview: [
      "AI and deep-learning work turns an open-ended question into a testable experiment. Researchers and engineers review prior work, inspect datasets and licenses, establish a simple baseline, then prototype neural approaches for language, vision or multimodal tasks. The daily loop includes coding, running experiments, diagnosing failures and carefully recording configurations so results can be reproduced.",
      "Research is collaborative and communicative. Teams align with domain experts on what a useful result means, discuss evaluation and risk with product or policy stakeholders, and explain trade-offs to peers who may not share the same technical background. Responsible projects also document data provenance, consent and intended use, and identify who could be harmed by model errors.",
      "In 2026, workflows combine pretrained transformer models, retrieval or fine-tuning with robust evaluation rather than treating a single benchmark score as proof of capability. Technical challenges include compute budgets, data contamination, distribution shift, calibration and evaluation leakage. A credible result compares against baselines on representative held-out data, reports failure cases and states limitations before proposing deployment."
    ],
    trends: [
      "LLM evaluation frameworks are combining task-specific benchmarks, human preference review, safety tests and regression suites.",
      "Retrieval-augmented generation and tool-using systems are evaluated end to end for grounding, abstention and source quality.",
      "Multimodal models bring text, images, audio and video together, increasing the need for modality-specific data and error analysis.",
      "Efficient fine-tuning, distillation, quantization and smaller specialist models reduce compute and serving constraints.",
      "Reproducibility, dataset provenance, contamination checks and responsible-use documentation are becoming core research deliverables."
    ],
    tools: ["Python, Jupyter and Hugging Face Transformers", "PyTorch, Lightning and scikit-learn baselines", "Datasets, tokenizers and evaluation harnesses", "Weights & Biases or MLflow for experiment tracking", "OpenCV and torchvision for computer vision", "RAG evaluation and vector-search tooling", "GPU profiling, reproducible environments and Git"],
    halfLife: "Indicative planning ranges: popular model APIs and benchmark suites shift within 1–3 years; deep-learning frameworks evolve over 3–5 years; linear algebra, optimization, experimental design, uncertainty analysis and scientific reasoning remain useful for 7–10+ years.",
    careerRunway: "Runway: research assistant/ML engineer → applied scientist or research engineer → senior/principal scientist → research lead, lab director or applied-AI product leader.",
    growth: ["Research assistant / graduate student", "AI / applied research scientist", "Senior / principal research scientist", "AI research lead / lab director"],
    tasks: [
      { title: "Turn a problem into a question", description: "State the intended use, target population and falsifiable hypothesis; review relevant prior work and constraints." },
      { title: "Audit data and establish a baseline", description: "Check provenance, permissions, representativeness and leakage; record a simple baseline before trying a larger model." },
      { title: "Choose a valid evaluation", description: "Select task-appropriate metrics and held-out data, including subgroup or safety checks relevant to the use case." },
      { title: "Run a reproducible experiment", description: "Version code, data references, seeds, configuration and compute; compare controlled changes rather than changing many variables at once." },
      { title: "Report evidence and limitations", description: "Summarize results, uncertainty and failure cases; distinguish benchmark performance from real-world capability and propose a responsible next test." }
    ],
    lab: {
      type: "scenario",
      title: "AI research baseline review",
      description: "Choose a reproducible evaluation step for an advanced modeling experiment.",
      question: "A new vision model reports 98% accuracy on a small, curated sample. What is the strongest next research step?",
      options: [
        "Compare against a documented baseline on a representative held-out set and report relevant error metrics",
        "Publish the accuracy as proof the model works in every setting",
        "Tune repeatedly on the test set until accuracy improves"
      ],
      answer: 0
    }
  },
  {
    id: "data-science-leadership-strategy",
    field: "Data Science Leadership & Strategy",
    title: "Data Science Leadership & Strategy",
    time: "40 min",
    icon: "◈",
    category: "Data Science",
    description:
      "Lead data science teams, drive data-driven product roadmaps, and align analytics with business objectives.",
    task:
      "Balance roadmap priorities, review model evaluation standards, establish governance risk controls, and mentor technical teams sustainably.",
    skills: ["AI Governance", "Product Analytics", "Portfolio Roadmapping", "Causal Experimentation", "Team Mentorship"],
    focus: ["Team management", "Product analytics", "Stakeholder strategy"],
    workOverview: [
      "Data science leaders create the conditions for teams to solve the right problems well. A typical week balances roadmap and portfolio decisions with model or experiment reviews, coaching, hiring and capacity planning. Leaders help teams distinguish a valuable decision from an interesting analysis, then agree on measurable outcomes and an appropriate evidence standard.",
      "Stakeholder communication is central: executives need clear choices and trade-offs, product partners need work sequenced with delivery, and technical teams need stable priorities and room to surface risks. Leaders translate business strategy into a portfolio of analytics, experimentation and ML work, negotiate data access and platform dependencies, and communicate uncertainty without overstating what a model can say.",
      "In 2026, leadership also includes operational governance for AI systems: accountable ownership, evaluation and monitoring plans, privacy and fairness review, incident response, and a clear route for human judgment. The hard challenge is building sustainable systems and teams while aligning short-term product goals with long-term data quality, responsible use and organizational learning."
    ],
    trends: [
      "AI governance is moving into delivery workflows through risk inventories, model ownership, approval evidence and post-launch monitoring.",
      "Product roadmaps increasingly pair experimentation and causal measurement with explicit decision thresholds and guardrails.",
      "Teams are investing in shared data/ML platforms and reusable components to reduce duplicated analysis and operational burden.",
      "Generative-AI adoption is prompting leaders to define human review, quality accountability, privacy and value measurement.",
      "Responsible leadership favors transparent aggregate workforce insights and development support over individual personality-based screening."
    ],
    tools: ["Product analytics: Amplitude, Mixpanel, Statsig", "BI and executive reporting: Tableau, Power BI, Looker", "Planning: Jira, Linear, Notion, Confluence", "Governance: model registries, lineage catalogs and approval workflows", "Python/SQL literacy for reviewing evidence", "Portfolio metrics, SLOs and incident review practices"],
    halfLife: "Indicative planning ranges: specific analytics platforms and AI governance procedures change within 2–4 years; operating models and product practices revise over 3–5 years; coaching, ethical judgment, communication, decision-making and organizational learning remain durable capabilities over 7–10+ years.",
    careerRunway: "Runway: senior individual contributor → team lead/manager → director or head of data science → VP/Chief Data or AI leadership. Advancement requires accountable delivery and trust across functions.",
    growth: ["Senior Data Scientist", "Technical lead / mentor", "Data Science Team Leader", "Director / Head of Data Science"],
    tasks: [
      { title: "Align on a measurable outcome", description: "Connect a proposed data initiative to a user or business decision, success measure, guardrail and accountable sponsor." },
      { title: "Prioritize the portfolio", description: "Compare expected value, evidence strength, effort, dependencies and risk; document what will be deferred and why." },
      { title: "Set responsible delivery controls", description: "Assign product and technical owners; agree on data access, evaluation, human oversight, monitoring and incident escalation." },
      { title: "Communicate trade-offs clearly", description: "Present options, assumptions, uncertainty and implications to stakeholders; record the decision and revisit trigger." },
      { title: "Develop the team sustainably", description: "Set coaching goals, balance workload and create psychological safety; use aggregate cohort insights only for reflection, never individual screening." }
    ],
    lab: {
      type: "scenario",
      title: "Responsible team leadership",
      description: "Apply aggregate behavioral benchmarks to team development without turning them into individual selection criteria.",
      question: "A team sees different average resilience-index values between the dataset's high/low success classes. What is a responsible leadership use?",
      options: [
        "Discuss team support, workload and coaching needs; keep the cohort pattern out of individual hiring decisions",
        "Use the index to rank current employees and remove the lowest scorers",
        "Treat the class averages as proof that personality causes career success"
      ],
      answer: 0
    }
  }
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

export interface FamilyBriefRole {
  id: string
  roleTitle: string
  category: string
  tagline: string
  icon: string
  plainEnglishSummary: string
  targetAudienceHeadline: string
  skillsMatch: string
  typicalWork: string
  growthOutlook: string
  avgSalaryRange: string
  learningPath: string
  alternativePaths: string
  familyTalkingPoints: string[]
  commonFamilyQuestions: { question: string; answer: string }[]
}

export const familyBriefRoles: FamilyBriefRole[] = [
  {
    id: "data-analytics-bi",
    roleTitle: "Data Analytics & Business Intelligence",
    category: "Analytics & Strategy",
    tagline: "Turns company numbers into crystal-clear executive decisions.",
    icon: "⌕",
    plainEnglishSummary:
      "Helps organizations navigate business challenges by inspecting transaction data, diagnosing performance dips, and creating live visual dashboards that leadership trusts.",
    targetAudienceHeadline:
      "The digital navigator — every major executive decision runs through their numbers.",
    skillsMatch:
      "Structured problem-solving, visual clarity, curiosity with customer habits, and concise verbal communication.",
    typicalWork:
      "Reconcile daily metrics, write SQL queries to clean datasets, build interactive charts in Tableau or Power BI, and answer questions like 'Why did checkout completion drop 8% this week?'",
    growthOutlook:
      "High hiring demand across Indian financial services, retail, e-commerce, and healthcare with strong career resilience.",
    avgSalaryRange: "₹6.5 – 10.5 LPA (Entry) → ₹16.0 – 24.0 LPA (Lead / Manager)",
    learningPath:
      "SQL Database Queries → Tableau & Power BI Storytelling → Metric Catalogs & dbt Governance.",
    alternativePaths:
      "Product Operations Analyst, Decision Scientist, Revenue Operations Manager.",
    familyTalkingPoints: [
      "Not solitary coding: Over 40% of their workday is spent interacting directly with business managers, product leads, and operations directors.",
      "High stability: Every modern company—from banks to hospitals—needs skilled professionals who can interpret data and explain the 'why'.",
      "Clear advancement: Clear progression from reporting analyst to analytics lead and director of decision science.",
    ],
    commonFamilyQuestions: [
      {
        question: "Is this job vulnerable to AI automation?",
        answer:
          "No. While AI can write simple queries, human judgment is essential to define what metrics actually mean, audit data for flaws, and explain subtle caveats to stakeholders.",
      },
      {
        question: "Do they need a pure computer science engineering degree?",
        answer:
          "Not mandatory. Many top analysts come from math, statistics, economics, commerce, or general engineering backgrounds by demonstrating strong SQL and business sense.",
      },
    ],
  },
  {
    id: "machine-learning-engineering",
    roleTitle: "Machine Learning (ML) Engineer",
    category: "AI & Software Engineering",
    tagline: "Builds intelligent software that learns from patterns and predicts outcomes.",
    icon: "✧",
    plainEnglishSummary:
      "Designs and deploys automated artificial intelligence systems that forecast customer demand, detect fraudulent transactions, and recommend relevant items inside software applications.",
    targetAudienceHeadline:
      "Building the automated predictive brains inside modern software apps.",
    skillsMatch:
      "Mathematical intuition, Python programming, disciplined experiment tracking, and software reliability.",
    typicalWork:
      "Clean training data, train predictive models, test precision against recall, detect performance drift, and deploy models behind robust application programming interfaces (APIs).",
    growthOutlook:
      "Among the highest-velocity hiring categories across tech product companies, fintech startups, and global capability centers in India.",
    avgSalaryRange: "₹9.2 – 14.5 LPA (Entry) → ₹24.0 – 38.0 LPA (Senior / Staff)",
    learningPath:
      "Python & Data Structures → Applied Scikit-Learn & PyTorch → Real-Time APIs & MLOps Infrastructure.",
    alternativePaths:
      "Backend Systems Engineer, Cloud Data Engineer, Applied AI Researcher.",
    familyTalkingPoints: [
      "Core technology pillar: Virtually every tech platform now builds machine learning into its core user experience.",
      "Top-tier compensation: Ranks in the top compensation percentile across Indian tech hubs (Bengaluru, Hyderabad, Pune).",
      "Transferable engineering foundation: High engineering rigor ensures seamless pivots across software, cloud, or AI specializations.",
    ],
    commonFamilyQuestions: [
      {
        question: "Is a PhD or advanced academic doctorate required?",
        answer:
          "Not for ML Engineers! Production ML engineering prioritizes writing robust code, building reliable data pipelines, and deployment over theoretical research papers.",
      },
      {
        question: "What companies hire machine learning engineers?",
        answer:
          "Top product firms (Flipkart, Amazon, Swiggy), fintech leaders (PhonePe, Razorpay), global tech capability centers, and international AI labs.",
      },
    ],
  },
  {
    id: "big-data-engineering",
    roleTitle: "Big Data & Distributed Systems",
    category: "Core Infrastructure",
    tagline: "Builds the high-speed data pipelines that move billions of records safely.",
    icon: "⌘",
    plainEnglishSummary:
      "Constructs the large-scale digital architecture and streaming highways that move, validate, and store massive streams of information every second without dropping a single event.",
    targetAudienceHeadline:
      "The civil engineers of high-scale enterprise digital technology.",
    skillsMatch:
      "Systems architecture, cloud infrastructure, patience with distributed networks, and performance optimization.",
    typicalWork:
      "Design database partitions, write Apache Spark batch pipelines, recover Kafka event streams from network drops, and optimize cloud infrastructure compute costs.",
    growthOutlook:
      "Extremely stable enterprise foundation. Telecommunications, banking, and cloud platforms invest heavily in permanent data engineering teams.",
    avgSalaryRange: "₹8.5 – 13.0 LPA (Entry) → ₹22.0 – 35.0 LPA (Lead Architect)",
    learningPath:
      "SQL & Python Fundamentals → Distributed Systems (PySpark, Kafka) → Cloud Architecture (AWS, Snowflake, GCP).",
    alternativePaths:
      "Cloud Infrastructure Architect, Database Administrator, Analytics Engineer.",
    familyTalkingPoints: [
      "Indispensable foundation: Without data engineers, no dashboard, business report, or machine learning model can ever run.",
      "Exceptional job security: Core data pipelines are complex enterprise infrastructure that companies preserve through market fluctuations.",
      "Global mobility: Distributed data computing skills are standardized globally, making cross-border opportunities readily accessible.",
    ],
    commonFamilyQuestions: [
      {
        question: "Is this role high-stress or late-night?",
        answer:
          "Modern enterprise teams use automated testing, dead-letter queues, and cloud alerts, making pipeline operations predictable and manageable during normal hours.",
      },
      {
        question: "How is it different from basic web development?",
        answer:
          "Big data engineers focus on data volume, throughput speed, and clustered servers rather than visual user interface screens.",
      },
    ],
  },
  {
    id: "ai-deep-learning",
    roleTitle: "AI & Deep Learning Specialist",
    category: "Frontier AI & Neural Nets",
    tagline: "Teaches neural networks to understand language, vision, and reasoning.",
    icon: "⌬",
    plainEnglishSummary:
      "Works on frontier artificial intelligence models that can read documents, understand human voice and conversation, generate images, and assist knowledge workers with specialized tasks.",
    targetAudienceHeadline:
      "Working at the frontier of generative AI, neural networks, and modern intelligent assistants.",
    skillsMatch:
      "Analytical depth, linear algebra fundamentals, creative prompt and fine-tuning evaluation, and safety consciousness.",
    typicalWork:
      "Fine-tune foundation models on proprietary enterprise data, build Retrieval-Augmented Generation (RAG) knowledge assistants, and benchmark outputs to eliminate errors.",
    growthOutlook:
      "Exponential growth across enterprise AI research hubs, multinational tech labs, and specialized generative AI startups.",
    avgSalaryRange: "₹12.0 – 18.0 LPA (Entry) → ₹32.0 – 50.0+ LPA (Staff Specialist)",
    learningPath:
      "Deep Learning Foundations (PyTorch) → Transformer Architectures → Production Fine-Tuning & Safety Guardrails.",
    alternativePaths:
      "Computer Vision Engineer, Natural Language Processing (NLP) Specialist, AI Product Architect.",
    familyTalkingPoints: [
      "The defining technology wave: Direct involvement in the technology shaping the future of global industry and work.",
      "Peak market compensation: High technical scarcity commands premier salaries and fast compensation growth.",
      "High creative and intellectual satisfaction: Creating systems that interact with human language and knowledge in real time.",
    ],
    commonFamilyQuestions: [
      {
        question: "Will AI eventually make this role obsolete?",
        answer:
          "On the contrary—human researchers and engineers are urgently needed to ensure AI remains safe, hallucination-free, cost-effective, and aligned with company values.",
      },
      {
        question: "Can someone break into this early in their career?",
        answer:
          "Yes! By contributing to open-source models, training verifiable PyTorch demo projects, and understanding practical retrieval systems (RAG).",
      },
    ],
  },
  {
    id: "data-science-leadership",
    roleTitle: "Data Science Leadership & Strategy",
    category: "Executive & Strategic Direction",
    tagline: "Guides tech teams to solve high-impact organizational challenges.",
    icon: "◈",
    plainEnglishSummary:
      "Bridges technical engineering teams with company executives, ensuring data initiatives solve real business problems, remain compliant with privacy laws, and deliver measurable return on investment.",
    targetAudienceHeadline:
      "The strategic bridge between technical teams and executive leadership.",
    skillsMatch:
      "Executive communication, empathetic mentorship, business acumen, and ethical governance.",
    typicalWork:
      "Prioritize high-ROI analytics initiatives, mentor engineers, review project architectures, negotiate budgets with C-suite leadership, and champion ethical AI usage.",
    growthOutlook:
      "Permanent senior demand across Fortune 500 enterprises, tech scale-ups, and consulting practices.",
    avgSalaryRange: "₹25.0 – 38.0 LPA (Lead) → ₹50.0 – 80.0+ LPA (Director / VP)",
    learningPath:
      "Hands-on Technical Depth → Cross-Functional Project Ownership → Executive Strategy & Organizational Leadership.",
    alternativePaths:
      "Chief Data Officer (CDO), VP of Product Analytics, Quantitative Strategy Director.",
    familyTalkingPoints: [
      "Top-tier career summit: The natural progression for professionals who combine technical understanding with people leadership.",
      "High strategic influence: Directly advises CEOs and Managing Directors on where to invest capital and technological effort.",
      "Enduring career longevity: Leadership, organizational wisdom, and strategic judgment become more valuable with every year of experience.",
    ],
    commonFamilyQuestions: [
      {
        question: "Do leaders lose touch with technical skills?",
        answer:
          "Successful data leaders remain technically literate to evaluate architectural proposals, but focus their daily time on strategy, hiring, and business impact.",
      },
      {
        question: "How long does it take to reach this level?",
        answer:
          "Typically 7 to 12 years of progressive technical ownership, team mentorship, and demonstrated commercial results.",
      },
    ],
  },
]

