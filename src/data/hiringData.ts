import {
  HiringCandidate,
  HiringQuestion,
  PortalSection,
  ShadowCandidate,
} from "../types"

export const hiringSections: PortalSection[] = [
  {
    label: "Predicted-Success Match",
    id: "predicted-success-match",
    view: 0,
  },
  {
    label: "Shadow Candidate Audit",
    id: "shadow-candidate-audit",
    view: 1,
  },
  {
    label: "Skill-Decay Screening",
    id: "skill-decay-screening",
    view: 2,
  },
  { label: "Team-Fit View", id: "team-fit-view", view: 3 },
  {
    label: "Calibrated Questions",
    id: "calibrated-questions",
    view: 4,
  },
]

export const hiringCandidates: HiringCandidate[] = [
  {
    name: "Maya Rao",
    initials: "MR",
    title: "Backend Engineer",
    keyword: 72,
    predicted: 89,
    roleMatch: "High capability fit",
    skills: ["Python", "APIs", "System design", "Cloud"],
    strengths: [
      "Production ownership",
      "Learning velocity",
      "Adjacent ML work",
    ],
    gaps: ["Direct model evaluation"],
    evidence:
      "Led two production migrations, built an internal automation tool and contributed to an ML-serving project.",
  },
  {
    name: "Sara Khan",
    initials: "SK",
    title: "Data Platform Engineer",
    keyword: 84,
    predicted: 86,
    roleMatch: "Strong transferable fit",
    skills: ["Python", "SQL", "Data systems", "Observability"],
    strengths: [
      "Reliable data systems",
      "Evidence quality",
      "Cross-team delivery",
    ],
    gaps: ["Model deployment depth"],
    evidence:
      "Recent project evidence shows ownership of data pipelines, monitoring and incident response.",
  },
  {
    name: "Arjun Mehta",
    initials: "AM",
    title: "ML Engineer",
    keyword: 92,
    predicted: 78,
    roleMatch: "Direct title match",
    skills: ["Machine Learning", "Python", "Notebooks", "Statistics"],
    strengths: ["Direct model experience", "Research literacy"],
    gaps: ["Production systems", "Recent cloud evidence"],
    evidence:
      "Strong direct terminology match, with less recent evidence of production ownership and deployment.",
  },
]

export const shadowCandidates: ShadowCandidate[] = [
  {
    name: "Candidate S1",
    current: "QA Automation Engineer",
    blockedBy: "Exact title requirement",
    capability:
      "Python automation, testing systems and production debugging",
    why:
      "Demonstrated systems reasoning and automation depth transfer into reliability-focused platform work.",
  },
  {
    name: "Candidate S2",
    current: "Data Analyst",
    blockedBy: "Five-year experience requirement",
    capability:
      "SQL, Python, experimentation and stakeholder communication",
    why:
      "Project evidence is stronger than the literal years threshold suggests.",
  },
  {
    name: "Candidate S3",
    current: "Self-taught Cloud Engineer",
    blockedBy: "Degree requirement",
    capability:
      "Cloud operations, infrastructure automation and incident response",
    why:
      "Recent verified evidence maps closely to the role's operational capabilities.",
  },
]

export const freshnessProfiles = [
  {
    candidate: "Maya Rao",
    skills: [
      [
        "Python",
        "Recently verified",
        "Used in a production automation project · 3 weeks ago",
        92,
      ],
      [
        "Cloud",
        "Fresh",
        "Deployment evidence · 2 months ago",
        86,
      ],
      [
        "Kubernetes",
        "Aging",
        "Last verified project · 18 months ago",
        52,
      ],
      [
        "TensorFlow",
        "No recent activity",
        "Listed, with no recent verified artifact",
        24,
      ],
    ] as [string, string, string, number][],
  },
  {
    candidate: "Sara Khan",
    skills: [
      [
        "SQL",
        "Fresh",
        "Pipeline optimisation · 2 weeks ago",
        95,
      ],
      [
        "Python",
        "Recently verified",
        "Data quality tooling · 1 month ago",
        88,
      ],
      [
        "Observability",
        "Fresh",
        "Monitoring redesign · 6 weeks ago",
        90,
      ],
      [
        "Spark",
        "Aging",
        "Last verified project · 14 months ago",
        58,
      ],
    ] as [string, string, string, number][],
  },
]

export const teamCandidates = [
  {
    name: "Maya Rao",
    adds: [
      "Cloud infrastructure",
      "Production ownership",
      "API reliability",
    ],
    strengthens: ["Python", "System design"],
    duplicates: ["Backend development"],
    value: "High incremental team value",
  },
  {
    name: "Sara Khan",
    adds: [
      "Data reliability",
      "Observability",
      "Analytics systems",
    ],
    strengthens: ["Python", "SQL"],
    duplicates: ["Data pipelines"],
    value: "High complementary value",
  },
  {
    name: "Arjun Mehta",
    adds: ["Model research", "Statistical depth"],
    strengthens: ["Machine learning", "Python"],
    duplicates: ["Model development", "Experimentation"],
    value: "Moderate incremental value",
  },
]

export const hiringQuestions: HiringQuestion[] = [
  {
    capability: "Problem Solving",
    question:
      "A model-serving API becomes intermittently slow after a deployment. How would you isolate the cause before changing the system?",
    why:
      "In this illustrative hiring scenario, stronger outcomes were associated with structured diagnosis rather than immediate solutioning.",
    signal:
      "Clarifies constraints, forms testable hypotheses, prioritises evidence and explains trade-offs.",
  },
  {
    capability: "Learning Agility",
    question:
      "Tell us about a capability you had to build quickly for a project. What evidence told you that you had learned enough?",
    why:
      "The role changes quickly, so evidence of deliberate learning may matter more than prior exposure to every tool.",
    signal:
      "Defines a learning goal, seeks feedback and connects learning to an observable outcome.",
  },
  {
    capability: "Production Judgement",
    question:
      "When would you choose a simpler model over a more accurate but harder-to-operate alternative?",
    why:
      "Past illustrative examples separate technical knowledge from judgement about reliability and operational cost.",
    signal:
      "Balances user value, maintainability, latency, observability and failure risk.",
  },
  {
    capability: "Team Contribution",
    question:
      "A team is strong in modelling but weak in deployment. How would you contribute without becoming a single point of failure?",
    why:
      "The team-fit view suggests this candidate may add missing platform capability.",
    signal:
      "Builds shared systems, documents decisions and develops capability in others.",
  },
]
