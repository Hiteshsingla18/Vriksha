import {
  AttritionProfile,
  BenchSignal,
  MobilityCandidate,
  PortalSection,
} from "../types"

export const companySections: PortalSection[] = [
  { label: "Bench Radar", id: "bench-radar", view: 0 },
  {
    label: "Build-vs-Buy Simulator",
    id: "build-vs-buy-simulator",
    view: 1,
  },
  { label: "Internal Mobility", id: "internal-mobility", view: 2 },
  {
    label: "Attrition-Aware Planning",
    id: "attrition-aware-planning",
    view: 3,
  },
]

export const benchSignals: BenchSignal[] = [
  {
    employee: "Employee A",
    team: "Platform Engineering",
    skill: "Cloud Infrastructure",
    freshness: "Aging",
    last: "Last verified activity · 14 months ago",
    relevance: "High current relevance",
    risk: "Attention recommended",
    score: 48,
    note:
      "Low recent verified activity in a still-relevant capability. Consider a current project or focused refresh.",
  },
  {
    employee: "Employee B",
    team: "Business Analytics",
    skill: "Data Analysis",
    freshness: "Fresh",
    last: "Last verified activity · 3 weeks ago",
    relevance: "High current relevance",
    risk: "Stable",
    score: 92,
    note:
      "Recent project evidence supports continued capability relevance.",
  },
  {
    employee: "Employee C",
    team: "Application Engineering",
    skill: "Legacy Java Frameworks",
    freshness: "At Risk",
    last: "Last verified activity · 22 months ago",
    relevance: "Declining relevance",
    risk: "Pathway review",
    score: 28,
    note:
      "The issue is not skill loss; the capability may offer fewer future opportunities without an adjacent pathway.",
  },
  {
    employee: "Employee D",
    team: "Data Platform",
    skill: "SQL & Data Modelling",
    freshness: "Stable",
    last: "Last verified activity · 5 months ago",
    relevance: "Stable relevance",
    risk: "Monitor",
    score: 74,
    note:
      "The skill remains useful and recently evidenced. A modern data-platform project could extend its runway.",
  },
]

export const mobilityCandidates: MobilityCandidate[] = [
  {
    name: "Employee M1",
    department: "Backend Engineering",
    role: "Senior Software Engineer",
    target: "ML Platform Engineer",
    match: 84,
    transfer: ["Python", "APIs", "Cloud", "System design"],
    gap: ["MLOps", "Model monitoring"],
    why:
      "Strong production engineering foundation with a focused two-skill bridge.",
  },
  {
    name: "Employee M2",
    department: "Data Engineering",
    role: "Data Platform Engineer",
    target: "ML Platform Engineer",
    match: 79,
    transfer: ["Python", "Data pipelines", "Cloud", "Observability"],
    gap: ["Model serving", "ML lifecycle"],
    why:
      "Existing platform and data reliability skills transfer into production ML systems.",
  },
  {
    name: "Employee M3",
    department: "Cloud Operations",
    role: "Site Reliability Engineer",
    target: "ML Platform Engineer",
    match: 72,
    transfer: ["Kubernetes", "Monitoring", "Automation", "Incident response"],
    gap: ["Python depth", "Model systems"],
    why:
      "Adds strong operational capability, with a larger ML-specific learning requirement.",
  },
]

export const attritionProfiles: AttritionProfile[] = [
  {
    name: "Employee R1",
    team: "Enterprise Applications",
    signal: "Attention recommended",
    relevance: "Declining",
    growth: "Low",
    mobility: "Limited",
    signals: [
      "Core skills have had little recent expansion",
      "Role scope has remained unchanged for six review cycles",
      "No internal mobility conversation recorded in this demo",
    ],
    actions: ["Career conversation", "Adjacent upskilling", "Internal mobility"],
  },
  {
    name: "Employee R2",
    team: "Data Analytics",
    signal: "Monitor",
    relevance: "Stable",
    growth: "Moderate",
    mobility: "Possible",
    signals: [
      "Strong current delivery with limited next-role visibility",
      "Learning activity is active but not tied to a mobility path",
      "Adjacent analytics engineering path is available",
    ],
    actions: ["Mentorship", "Mobility pathway", "Stretch project"],
  },
  {
    name: "Employee R3",
    team: "Cloud Platform",
    signal: "Development opportunity",
    relevance: "High",
    growth: "High",
    mobility: "Strong",
    signals: [
      "Skills remain relevant and recently demonstrated",
      "Scope is growing across two teams",
      "Leadership pathway has not yet been discussed",
    ],
    actions: ["Career conversation", "Leadership mentorship", "Role redesign"],
  },
]
