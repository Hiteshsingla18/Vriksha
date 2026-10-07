import {
  CollegeCourse,
  CollegeCurriculumDiffItem,
  FacultyMatch,
  PortalSection,
} from "../types"

export const collegesSections: PortalSection[] = [
  {
    label: "Curriculum vs Market",
    id: "curriculum-vs-market",
    view: 0,
  },
  {
    label: "Curriculum Autopsy",
    id: "curriculum-autopsy",
    view: 1,
  },
  { label: "Early Warning", id: "early-warning", view: 2 },
  {
    label: "Guest-Faculty Match",
    id: "guest-faculty-match",
    view: 3,
  },
  { label: "Cohort Heat-Map", id: "cohort-heat-map", view: 4 },
]

export const collegeCurriculumDiff: CollegeCurriculumDiffItem[] = [
  {
    course: "Database Systems",
    taught: "Relational modelling, SQL",
    current: "High",
    predictive: "High",
    status: "Aligned",
    explanation:
      "Core database reasoning remains relevant across software, analytics and AI systems.",
  },
  {
    course: "Software Engineering",
    taught: "Testing, architecture, teamwork",
    current: "High",
    predictive: "High",
    status: "Aligned",
    explanation:
      "System design and collaborative delivery remain durable capabilities.",
  },
  {
    course: "Machine Learning",
    taught: "Models and notebooks",
    current: "Medium",
    predictive: "High",
    status: "Emerging gap",
    explanation:
      "The course covers model creation but underrepresents evaluation and production deployment.",
  },
  {
    course: "Cloud Computing",
    taught: "Virtualisation basics",
    current: "Medium",
    predictive: "High",
    status: "Needs attention",
    explanation:
      "Market signals increasingly emphasize distributed systems, automation and observability.",
  },
  {
    course: "Legacy Enterprise Systems",
    taught: "Monolithic application patterns",
    current: "Low",
    predictive: "Lower",
    status: "Needs attention",
    explanation:
      "Some concepts remain useful, but the current balance may crowd out emerging platform skills.",
  },
]

export const collegeCourses: CollegeCourse[] = [
  {
    code: "CS305",
    name: "Database Systems",
    skill: "Data modelling",
    correlation: "Strong illustrative correlation",
    relevance: "High",
    status: "Working well",
    score: 82,
    insight:
      "Graduates who demonstrated strong database work also appeared more often in analytics and backend outcomes.",
  },
  {
    code: "CS412",
    name: "Machine Learning",
    skill: "Model development",
    correlation: "Moderate illustrative correlation",
    relevance: "High",
    status: "Revise evidence",
    score: 64,
    insight:
      "Outcome alignment is stronger when students also show model evaluation and deployment evidence.",
  },
  {
    code: "CS330",
    name: "Enterprise Java",
    skill: "Application development",
    correlation: "Weak illustrative correlation",
    relevance: "Medium",
    status: "Needs review",
    score: 38,
    insight:
      "The course may still teach useful foundations, but its current project format has an unclear relationship with recent outcomes.",
  },
  {
    code: "CS450",
    name: "Cloud Systems",
    skill: "Cloud infrastructure",
    correlation: "Emerging illustrative correlation",
    relevance: "High",
    status: "Expand",
    score: 73,
    insight:
      "Students with cloud project evidence appear across a widening range of software and platform roles.",
  },
]

export const facultyMatches: FacultyMatch[] = [
  {
    name: "Professional A",
    role: "MLOps Platform Lead",
    experience: "9 years industry experience",
    expertise: "Production ML systems",
    skills: ["Model deployment", "ML monitoring", "CI/CD"],
    reason:
      "Directly matches the model-to-production gap identified in the Machine Learning specialisation.",
  },
  {
    name: "Professional B",
    role: "Staff Cloud Engineer",
    experience: "11 years industry experience",
    expertise: "Cloud reliability",
    skills: ["Observability", "Infrastructure as code", "Distributed systems"],
    reason:
      "Can teach the operational capabilities currently missing from Cloud Computing.",
  },
  {
    name: "Professional C",
    role: "Analytics Engineering Manager",
    experience: "8 years industry experience",
    expertise: "Modern data platforms",
    skills: ["Data modelling", "Transformation", "Data quality"],
    reason:
      "Connects strong database foundations with current analytics engineering practices.",
  },
]
