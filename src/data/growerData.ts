import {
  GrowerAdjacentRole,
  GrowerMentor,
  GrowerRecommendation,
  PortalSection,
} from "../types"

export const growerSections: PortalSection[] = [
  {
    label: "Market Recommendations",
    id: "market-recommendations",
    view: 0,
  },
  { label: "Skill Half-Life", id: "skill-half-life", view: 1 },
  { label: "Adjacent Leap", id: "adjacent-leap", view: 2 },
  {
    label: "Compensation Trajectory",
    id: "compensation-trajectory",
    view: 3,
  },
  { label: "Future-You Mentor", id: "future-you-mentor", view: 4 },
]

export const growerRecommendations: GrowerRecommendation[] = [
  {
    status: "Growing",
    role: "AI Engineering",
    signal: "Strong predicted growth",
    reason:
      "Your existing Python and backend skills transfer well into production AI systems.",
    skills: ["Python", "APIs", "System design"],
    next: "Model deployment",
  },
  {
    status: "Emerging",
    role: "AI Platform Engineering",
    signal: "New infrastructure demand",
    reason:
      "Platform experience can become more differentiated when combined with ML operations.",
    skills: ["Cloud", "Backend", "Observability"],
    next: "MLOps foundations",
  },
  {
    status: "Watch",
    role: "Generalist Backend Work",
    signal: "Parts may become more commoditised",
    reason:
      "Routine implementation is becoming easier to automate; architecture and domain depth matter more.",
    skills: ["APIs", "Databases", "Services"],
    next: "System ownership",
  },
  {
    status: "Growing",
    role: "Data Product Engineering",
    signal: "Cross-functional relevance",
    reason:
      "Your technical foundation can connect data systems to customer and product decisions.",
    skills: ["SQL", "Python", "Product thinking"],
    next: "Analytics engineering",
  },
]

export const halfLifeCombos = [
  {
    name: "Python + SQL + Basic Reporting",
    runway: "18–24 month illustrative runway",
    summary:
      "Strong today, but routine analysis may become less differentiated without domain or automation depth.",
    points: [88, 82, 70, 56, 43],
  },
  {
    name: "Backend + Cloud + System Design",
    runway: "36–48 month illustrative runway",
    summary:
      "System ownership and architecture retain relevance longer than routine implementation.",
    points: [90, 88, 84, 78, 70],
  },
  {
    name: "Python + MLOps + Model Systems",
    runway: "Increasing illustrative relevance",
    summary:
      "A growing combination as organisations move from AI experiments to reliable production systems.",
    points: [62, 70, 79, 86, 91],
  },
]

export const compensationPaths = [
  {
    name: "Leadership path",
    roles: ["Software Developer", "Senior Engineer", "Engineering Lead"],
    bands: ["₹12–18L", "₹20–30L", "₹32–48L"],
    note: "Broader ownership, architecture and team leadership.",
  },
  {
    name: "Specialist path",
    roles: ["Software Developer", "ML Engineer", "AI Platform Specialist"],
    bands: ["₹12–18L", "₹22–34L", "₹36–55L"],
    note: "Focused technical depth in production AI systems.",
  },
]

export const growerAdjacentRoles: GrowerAdjacentRole[] = [
  {
    role: "ML Engineer",
    gap: "Moderate gap · 3 focused skills",
    transfer: ["Python", "Programming", "APIs", "System design"],
    build: ["Machine Learning", "Statistics", "Model evaluation"],
    why:
      "Your software foundation already covers production thinking; the main bridge is model reasoning.",
  },
  {
    role: "Data Engineer",
    gap: "Small gap · 2 focused skills",
    transfer: ["Python", "SQL", "APIs", "Databases"],
    build: ["Data pipelines", "Distributed processing"],
    why:
      "Database and backend experience transfer directly into reliable data movement and modelling.",
  },
  {
    role: "Solutions Engineer",
    gap: "Small gap · 2 focused skills",
    transfer: ["APIs", "System design", "Communication", "Debugging"],
    build: ["Discovery", "Commercial context"],
    why:
      "Technical breadth and explanation skills make this a nearby customer-facing path.",
  },
]

export const growerMentors: GrowerMentor[] = [
  {
    name: "Mentor A",
    role: "Senior ML Engineer",
    experience: "7 years experience",
    path: "Backend Engineer → MLOps Engineer → Senior ML Engineer",
    skills: ["Python", "MLOps", "Model systems"],
    start: "Started in backend development",
    match:
      "Three years ahead on the same backend-to-ML transition you are considering.",
  },
  {
    name: "Mentor B",
    role: "Staff Data Engineer",
    experience: "8 years experience",
    path: "Software Developer → Data Engineer → Staff Data Engineer",
    skills: ["SQL", "Data platforms", "Architecture"],
    start: "Started with APIs and databases",
    match:
      "Can explain how to turn general software experience into deep data-system ownership.",
  },
  {
    name: "Mentor C",
    role: "AI Solutions Lead",
    experience: "6 years experience",
    path: "Backend Developer → Solutions Engineer → AI Solutions Lead",
    skills: ["System design", "Discovery", "AI products"],
    start: "Started as an individual contributor",
    match:
      "A useful match if you want technical depth with more customer and business context.",
  },
]
