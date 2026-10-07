import { dataScienceSubdomains } from "../../lib/dataScienceSubdomains";

const roomDetails = {
  "data-analytics-bi": {
    icon: "⌕",
    brief: "Transform complex data into actionable business insights through interactive dashboards and reports.",
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
    tools: ["SQL: PostgreSQL, BigQuery, Snowflake", "Python: pandas, Jupyter, scikit-learn for analysis", "BI: Tableau, Power BI, Looker", "Modeling: dbt and metric/semantic layers", "Quality and versioning: Git, Great Expectations, dashboard certification", "SAS Viya for governed enterprise analytics"],
    halfLife: "Indicative planning ranges, not a measured universal statistic: individual BI product interfaces and features often change within 2–3 years; SQL/Python ecosystem workflows commonly need refresh every 3–5 years; statistical reasoning, measurement design and clear communication often remain useful for 7–10+ years.",
    careerRunway: "Runway: analyst → senior/product analyst → analytics lead or analytics engineer → BI/insights manager or decision-science leader. Progression comes from owning trusted metrics, influencing decisions and mentoring others—not simply producing more charts.",
    growth: ["Reporting / data analyst", "Data Analytics & BI Analyst", "Senior analyst / analytics lead", "Analytics manager / decision scientist"],
    tasks: [
      { title: "Frame the decision", description: "Write the stakeholder question, intended action and unit of analysis; clarify the population and time window before querying." },
      { title: "Validate the source data", description: "Check row grain, joins, duplicate meaning, missingness and freshness; reconcile a sample of totals to a trusted source." },
      { title: "Define a governed KPI", description: "Document the numerator, denominator, filters and reporting cadence, then confirm the definition with its business owner." },
      { title: "Build and test the view", description: "Choose a chart that fits the comparison, add useful segments, and test filters, edge cases and accessibility." },
      { title: "Communicate an actionable finding", description: "Summarize the signal, uncertainty and limitations; recommend a next step and name how its outcome will be measured." }
    ],
    lab: {
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
  "machine-learning-engineering": {
    icon: "✧",
    brief: "Build, deploy, and scale production-grade ML models and automated pipelines.",
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
    tools: ["Python, NumPy, pandas, scikit-learn", "PyTorch and XGBoost", "MLflow or Weights & Biases for experiment tracking", "Airflow, Prefect or Kubeflow for orchestration", "Feast or managed feature stores", "Docker, Kubernetes, GitHub Actions and model-serving APIs", "Evidently or custom monitoring for drift and quality"],
    halfLife: "Indicative planning ranges, not a measured universal statistic: specific framework APIs and managed-service patterns can shift within 1–3 years; deployment and orchestration implementations often need revision every 3–5 years; probability, optimization, causal reasoning, evaluation design and software engineering fundamentals commonly retain value for 7–10+ years.",
    careerRunway: "Runway: ML/data engineer → senior ML engineer → staff/principal engineer or ML platform lead → engineering manager, architect or applied-AI leader. Broader scope means owning systems and outcomes across teams, not only improving offline metrics.",
    growth: ["Data / ML analyst", "Machine Learning Engineer", "Senior / staff ML engineer", "ML platform lead / AI architect"],
    tasks: [
      { title: "Translate the product need", description: "Define the user, decision, target, success metric, latency and cost limits, and when a non-ML rule is preferable." },
      { title: "Build a trustworthy data slice", description: "Check label quality, sampling and temporal boundaries; document sensitive fields and prevent target or future-data leakage." },
      { title: "Create reproducible features", description: "Version transformations, fit preprocessing only on training folds, and verify point-in-time correctness for historical examples." },
      { title: "Evaluate against a baseline", description: "Use an appropriate split and task metric, inspect important error slices, and record uncertainty and known failure modes." },
      { title: "Release and operate safely", description: "Define CI checks, staged rollout and rollback criteria; monitor data quality, latency and outcomes with a named owner." }
    ],
    lab: {
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
  "big-data-engineering": {
    icon: "⌘",
    brief: "Design and optimize large-scale data architecture, data lakes, and high-throughput pipelines.",
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
    tools: ["Apache Spark / PySpark and Hadoop ecosystem components", "Kafka, Flink and Debezium for streaming/CDC", "Airflow, Dagster or Prefect for orchestration", "Delta Lake, Apache Iceberg or Hudi", "Cloud object storage and Snowflake/BigQuery/Databricks", "dbt, Great Expectations and OpenLineage", "Terraform, Docker, Git and CI pipelines"],
    halfLife: "Indicative planning ranges, not a measured universal statistic: vendor-specific data-platform interfaces and services often change within 2–4 years; pipeline and orchestration patterns may need refresh every 3–5 years; distributed-systems reasoning, data modeling, fault tolerance and storage fundamentals commonly remain useful for 7–10+ years.",
    careerRunway: "Runway: ETL/data developer → data engineer → senior/platform engineer → staff engineer or data architect → platform lead or data engineering manager. Growth follows stewardship of critical data products, reliability, cost and cross-team platform decisions.",
    growth: ["ETL / data developer", "Big Data Engineer", "Senior / platform data engineer", "Data architect / platform lead"],
    tasks: [
      { title: "Specify the data product", description: "Identify producers and consumers, expected volume, freshness objective, retention, access rules and accountable owner." },
      { title: "Design schema and ingestion", description: "Choose a stable event/table contract, document schema evolution and define handling for late, malformed or duplicate records." },
      { title: "Plan scalable storage and compute", description: "Select partitioning and file sizing based on query patterns; estimate shuffle, throughput and cost before scaling resources." },
      { title: "Make processing recoverable", description: "Use idempotent writes, checkpoints and replayable inputs; define backfill procedures and test failure recovery." },
      { title: "Instrument and publish", description: "Add freshness, volume and quality checks, expose lineage and alerts, then document the consumer-facing contract." }
    ],
    lab: {
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
  "ai-research-innovation": {
    icon: "⌬",
    brief: "Research and implement cutting-edge artificial intelligence, transformer models, and neural network architectures.",
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
    halfLife: "Indicative planning ranges, not a measured universal statistic: popular model APIs, architectures and benchmark suites can shift within 1–3 years; deep-learning frameworks and deployment patterns often evolve over 3–5 years; linear algebra, optimization, experimental design, uncertainty analysis and scientific reasoning commonly remain useful for 7–10+ years.",
    careerRunway: "Runway: research assistant/ML engineer → applied scientist or research engineer → senior/principal scientist → research lead, lab director or applied-AI product leader. Advanced research roles often benefit from graduate-level depth, strong publication or reproducibility practice, and the ability to connect methods to a real user need.",
    growth: ["Research assistant / graduate student", "AI / applied research scientist", "Senior / principal research scientist", "AI research lead / lab director"],
    tasks: [
      { title: "Turn a problem into a question", description: "State the intended use, target population and falsifiable hypothesis; review relevant prior work and constraints." },
      { title: "Audit data and establish a baseline", description: "Check provenance, permissions, representativeness and leakage; record a simple baseline before trying a larger model." },
      { title: "Choose a valid evaluation", description: "Select task-appropriate metrics and held-out data, including subgroup or safety checks relevant to the use case." },
      { title: "Run a reproducible experiment", description: "Version code, data references, seeds, configuration and compute; compare controlled changes rather than changing many variables at once." },
      { title: "Report evidence and limitations", description: "Summarize results, uncertainty and failure cases; distinguish benchmark performance from real-world capability and propose a responsible next test." }
    ],
    lab: {
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
  "data-science-leadership-strategy": {
    icon: "◈",
    brief: "Lead data science teams, drive data-driven product roadmaps, and align analytics with business objectives.",
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
    tools: ["Product analytics and experimentation: Amplitude, Mixpanel, Statsig", "BI and executive reporting: Tableau, Power BI, Looker", "Planning and collaboration: Jira, Linear, Notion, Confluence", "Data/ML governance: model registries, lineage catalogs and approval workflows", "Python/SQL literacy for reviewing evidence and assumptions", "Portfolio metrics, service-level objectives and incident review practices"],
    halfLife: "Indicative planning ranges, not a measured universal statistic: specific analytics platforms and AI governance procedures can change within 2–4 years; operating models and product practices often need revision over 3–5 years; coaching, ethical judgment, communication, decision-making and organizational learning remain durable capabilities developed over a 7–10+ year career runway.",
    careerRunway: "Runway: senior individual contributor → team lead/manager → director or head of data science → VP/Chief Data or AI leadership. Advancement requires accountable delivery, talent development, portfolio judgment and trust across functions; cohort personality measures are descriptive research context, not promotion criteria.",
    growth: ["Senior Data Scientist", "Technical lead / mentor", "Data Science Team Leader", "Director / Head of Data Science"],
    tasks: [
      { title: "Align on a measurable outcome", description: "Connect a proposed data initiative to a user or business decision, success measure, guardrail and accountable sponsor." },
      { title: "Prioritize the portfolio", description: "Compare expected value, evidence strength, effort, dependencies and risk; document what will be deferred and why." },
      { title: "Set responsible delivery controls", description: "Assign product and technical owners; agree on data access, evaluation, human oversight, monitoring and incident escalation." },
      { title: "Communicate trade-offs clearly", description: "Present options, assumptions, uncertainty and implications to stakeholders; record the decision and revisit trigger." },
      { title: "Develop the team sustainably", description: "Set coaching goals, balance workload and create psychological safety; use aggregate cohort insights only for reflection, never individual screening." }
    ],
    lab: {
      title: "Responsible team leadership",
      description: "Apply aggregate behavioral benchmarks to team development without turning them into individual selection criteria.",
      question: "A team sees different average resilience-index values between the dataset’s high/low success classes. What is a responsible leadership use?",
      options: [
        "Discuss team support, workload and coaching needs; keep the cohort pattern out of individual hiring decisions",
        "Use the index to rank current employees and remove the lowest scorers",
        "Treat the class averages as proof that personality causes career success"
      ],
      answer: 0
    }
  }
};

function getJuniorSkillScores(juniorSkillTraits) {
  return juniorSkillTraits?.skillMeans ?? null;
}

function getRoleSalaryBenchmarks(dataScienceJobs, keywords) {
  return (dataScienceJobs?.roleSalaryBenchmarks ?? [])
    .filter((role) => keywords.some((keyword) => role.jobTitle.toLowerCase().includes(keyword)))
    .slice(0, 5);
}

function getSuccessCohort(personalityTraits, classification) {
  return personalityTraits?.successClassification?.cohorts
    .find((cohort) => cohort.classification === classification) ?? null;
}

function formatTraitMeans(traits) {
  if (!traits) return [];
  return [
    `Neuroticism: ${traits.neuroticism}/100`,
    `Extraversion: ${traits.extraversion}/100`,
    `Openness: ${traits.opennessToExperience}/100`,
    `Agreeableness: ${traits.agreeableness}/100`,
    `Conscientiousness: ${traits.conscientiousness}/100`
  ];
}

function getDatasetEnrichment(subdomain, market, dataScienceJobs, juniorSkillTraits, seniorPersonalityTraits) {
  if (subdomain.id === "machine-learning-engineering") {
    const skills = getJuniorSkillScores(juniorSkillTraits);
    const roleBenchmarks = getRoleSalaryBenchmarks(dataScienceJobs, ["machine learning engineer", "data scientist"]);
    const highSalaryHikeRate = juniorSkillTraits?.observedHighSalaryHikeRate;
    return {
      trends: [
        `JDS AI/ML skill mean: ${skills?.aiAndMlSkills ?? "not available"}/5; coding mean: ${skills?.codingSkills ?? "not available"}/5`,
        `Composite skill-score mean: ${juniorSkillTraits?.compositeSkillScore?.mean ?? "not available"}/5`,
        `Observed high-salary-hike cohort rate: ${highSalaryHikeRate == null ? "not available" : `${(highSalaryHikeRate * 100).toFixed(1)}%`}; descriptive cohort data, not an individual prediction`,
        ...roomDetails[subdomain.id].trends.slice(0, 1)
      ],
      tools: [
        ...roomDetails[subdomain.id].tools,
        `JDS composite skill mean: ${juniorSkillTraits?.compositeSkillScore?.mean ?? "not available"}/5`,
        ...roleBenchmarks.slice(0, 2).map((role) => `${role.jobTitle}: ${role.averageSalaryLpa} LPA average`)
      ],
      dataSources: [
        juniorSkillTraits?.source,
        dataScienceJobs?.source
      ].filter(Boolean),
      skillScores: skills,
      compositeSkillScore: juniorSkillTraits?.compositeSkillScore ?? null,
      roleSalaryBenchmarks: roleBenchmarks
    };
  }

  if (subdomain.id === "big-data-engineering") {
    const skills = getJuniorSkillScores(juniorSkillTraits);
    return {
      trends: [
        `JDS big-data skill mean: ${skills?.bigDataSkills ?? "not available"}/5`,
        `JDS composite skill-score mean: ${juniorSkillTraits?.compositeSkillScore?.mean ?? "not available"}/5`,
        ...roomDetails[subdomain.id].trends.slice(0, 1)
      ],
      tools: [
        ...roomDetails[subdomain.id].tools,
        `Big-data skill cohort mean: ${skills?.bigDataSkills ?? "not available"}/5`
      ],
      dataSources: [market?.source, juniorSkillTraits?.source].filter(Boolean),
      skillScores: skills,
      compositeSkillScore: juniorSkillTraits?.compositeSkillScore ?? null
    };
  }

  if (subdomain.id === "data-analytics-bi") {
    const salaryRoles = getRoleSalaryBenchmarks(dataScienceJobs, ["business analyst", "data analyst"]);
    return {
      trends: [
        `JDS dashboard and storytelling skill mean: ${juniorSkillTraits?.skillMeans?.dashboardAndStorytellingSkills ?? "not available"}/5`,
        ...roomDetails[subdomain.id].trends.slice(0, 2)
      ],
      tools: [
        ...roomDetails[subdomain.id].tools,
        ...salaryRoles.slice(0, 2).map((role) => `${role.jobTitle}: ${role.averageSalaryLpa} LPA average`)
      ],
      dataSources: [market?.source, dataScienceJobs?.source, juniorSkillTraits?.source].filter(Boolean),
      roleSalaryBenchmarks: salaryRoles,
      skillScores: juniorSkillTraits?.skillMeans ?? null
    };
  }

  if (subdomain.id === "ai-research-innovation") {
    const researchBenchmarks = getRoleSalaryBenchmarks(dataScienceJobs, [
      "data scientist",
      "machine learning engineer"
    ]);
    return {
      trends: roomDetails[subdomain.id].trends,
      tools: [
        ...roomDetails[subdomain.id].tools,
        ...researchBenchmarks.slice(0, 2).map((role) => `${role.jobTitle}: ${role.averageSalaryLpa} LPA dataset average`)
      ],
      dataSources: [dataScienceJobs?.source].filter(Boolean),
      roleSalaryBenchmarks: researchBenchmarks
    };
  }

  if (subdomain.id === "data-science-leadership-strategy") {
    const high = getSuccessCohort(seniorPersonalityTraits, "high");
    const low = getSuccessCohort(seniorPersonalityTraits, "low");
    return {
      trends: [
        `Success classification source: ${seniorPersonalityTraits?.successClassification?.sourceColumn ?? "not available"} (1 = high, 0 = low)`,
        `High class OCEAN means: ${formatTraitMeans(high?.oceanTraitMeans).join(", ") || "not available"}`,
        `Low class OCEAN means: ${formatTraitMeans(low?.oceanTraitMeans).join(", ") || "not available"}`
      ],
      tools: [
        ...roomDetails[subdomain.id].tools,
        `Overall LRI mean: ${seniorPersonalityTraits?.leadershipResilienceIndex?.mean ?? "not available"}`
      ],
      dataSources: [seniorPersonalityTraits?.source].filter(Boolean),
      personalityCohortAnalytics: seniorPersonalityTraits ?? null,
      successClassifications: seniorPersonalityTraits?.successClassification ?? null
    };
  }

  return {
    trends: roomDetails[subdomain.id].trends,
    tools: roomDetails[subdomain.id].tools,
    dataSources: [market?.source].filter(Boolean)
  };
}

export function getDataScienceCareerRooms(
  analyticsSummary,
  dataScienceJobs,
  juniorSkillTraits,
  seniorPersonalityTraits
) {
  if (!analyticsSummary?.subdomains) return [];

  return dataScienceSubdomains.map((subdomain) => {
    const details = roomDetails[subdomain.id];
    const market = analyticsSummary.subdomains[subdomain.key];
    const usesAnalyticsMarket = [
      "data-analytics-bi",
      "big-data-engineering"
    ].includes(subdomain.id);
    const commonSkills = usesAnalyticsMarket
      ? market?.commonSkills.slice(0, 4).map((entry) => entry.skill) ?? []
      : [];
    const enrichment = getDatasetEnrichment(
      subdomain,
      market,
      dataScienceJobs,
      juniorSkillTraits,
      seniorPersonalityTraits
    );
    const baseBrief = enrichment.brief ?? details.brief;

    return {
      id: `data-science-${subdomain.id}`,
      domainId: "data-science",
      title: subdomain.title,
      category: "Data Science",
      icon: subdomain.icon,
      brief: baseBrief,
      workOverview: details.workOverview,
      focus: subdomain.focus,
      trends: [...new Set([...enrichment.trends, ...details.trends])].slice(0, 5),
      tools: commonSkills.length
        ? [...new Set([...commonSkills, ...enrichment.tools])]
        : enrichment.tools,
      halfLife: details.halfLife,
      careerRunway: details.careerRunway,
      growth: details.growth,
      tasks: details.tasks,
      lab: {
        type: "scenario",
        title: details.lab.title,
        description: details.lab.description,
        question: details.lab.question,
        options: details.lab.options,
        answer: details.lab.answer
      },
      dataSources: enrichment.dataSources,
      marketSnapshot: usesAnalyticsMarket ? market ?? null : null,
      skillScores: enrichment.skillScores ?? null,
      compositeSkillScore: enrichment.compositeSkillScore ?? null,
      roleSalaryBenchmarks: enrichment.roleSalaryBenchmarks ?? [],
      personalityCohortAnalytics: enrichment.personalityCohortAnalytics ?? null,
      successClassifications: enrichment.successClassifications ?? null
    };
  });
}
