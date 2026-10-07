import {
  CareerRoom,
  ExplorerField,
  ExplorerProfile,
  PortalSection,
} from "../types"

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
    field: "Cybersecurity",
    title: "Find the Intrusion",
    time: "45 min",
    description:
      "Inspect a small set of system signals and decide which activity needs attention.",
    task:
      "Review login patterns, flag suspicious behaviour and explain the evidence behind your decision.",
    skills: ["Pattern recognition", "Risk judgement", "Attention to detail"],
  },
  {
    field: "Sales",
    title: "Spot the Real Insight",
    time: "40 min",
    description:
      "Turn a messy customer conversation into a clear next step without overpromising.",
    task:
      "Read a discovery call summary, identify the real need and prepare a thoughtful follow-up.",
    skills: ["Listening", "Communication", "Commercial thinking"],
  },
  {
    field: "Product Design",
    title: "Fix the Broken Screen",
    time: "35 min",
    description:
      "Find why a familiar task feels difficult and improve the flow for the user.",
    task:
      "Review a checkout screen, locate the friction and propose a more understandable interaction.",
    skills: ["Empathy", "Visual reasoning", "Problem framing"],
  },
  {
    field: "Finance",
    title: "Catch the Anomaly",
    time: "50 min",
    description:
      "Investigate a simple financial report and find the number that does not belong.",
    task:
      "Compare monthly figures, identify the unusual movement and write a short explanation.",
    skills: ["Numeracy", "Analysis", "Evidence-based reasoning"],
  },
  {
    field: "Healthcare",
    title: "Read the Chart",
    time: "30 min",
    description:
      "Organise a patient snapshot and notice which information deserves a closer look.",
    task:
      "Review a fictional chart, prioritise the relevant details and prepare a concise handover.",
    skills: ["Careful observation", "Prioritisation", "Clear communication"],
  },
]

export const explorerProfiles: ExplorerProfile[] = [
  {
    name: "Aarav",
    role: "Data Analyst",
    location: "Chandigarh",
    years: "3 years",
    pathway:
      "Commerce degree → Excel projects → junior reporting role → data analyst",
    skills: ["SQL", "Data visualisation", "Business questions"],
  },
  {
    name: "Priya",
    role: "Product Designer",
    location: "Mohali",
    years: "4 years",
    pathway:
      "Psychology degree → community research → design bootcamp → product designer",
    skills: ["User research", "Prototyping", "Visual design"],
  },
  {
    name: "Rohan",
    role: "Cybersecurity Analyst",
    location: "Chandigarh",
    years: "2 years",
    pathway:
      "Computer applications → home lab → security internship → analyst",
    skills: ["Networks", "Threat analysis", "Incident response"],
  },
]

export const explorerFields: ExplorerField[] = [
  {
    name: "Technology",
    status: "Growing",
    height: 88,
    overview: "Build and improve digital products, platforms and services.",
    roles: ["Software Developer", "Cloud Engineer", "Product Manager"],
    skills: ["Systems thinking", "Programming", "Collaboration"],
    related: ["Data", "Cybersecurity", "Design"],
  },
  {
    name: "Design",
    status: "Steady",
    height: 68,
    overview:
      "Understand people and turn complex needs into useful experiences.",
    roles: ["Product Designer", "Service Designer", "Design Researcher"],
    skills: ["Research", "Prototyping", "Communication"],
    related: ["Technology", "Marketing", "Healthcare"],
  },
  {
    name: "Finance",
    status: "Steady",
    height: 72,
    overview:
      "Use evidence and judgement to understand money, risk and performance.",
    roles: ["Financial Analyst", "Risk Associate", "Fintech Strategist"],
    skills: ["Numeracy", "Analysis", "Commercial awareness"],
    related: ["Data", "Technology", "Marketing"],
  },
  {
    name: "Healthcare",
    status: "Growing",
    height: 82,
    overview:
      "Improve health outcomes through care, operations, research and technology.",
    roles: ["Clinical Researcher", "Health Data Analyst", "Care Coordinator"],
    skills: ["Observation", "Empathy", "Decision making"],
    related: ["Data", "Design", "Technology"],
  },
  {
    name: "Marketing",
    status: "Steady",
    height: 62,
    overview:
      "Understand audiences and connect useful ideas with the people they serve.",
    roles: ["Brand Strategist", "Growth Marketer", "Content Designer"],
    skills: ["Storytelling", "Research", "Experimentation"],
    related: ["Design", "Data", "Sales"],
  },
  {
    name: "Engineering",
    status: "Growing",
    height: 78,
    overview:
      "Design reliable systems and solve practical problems under real constraints.",
    roles: [
      "Mechanical Engineer",
      "Systems Engineer",
      "Sustainability Engineer",
    ],
    skills: ["Technical reasoning", "Modelling", "Problem solving"],
    related: ["Technology", "Data", "Healthcare"],
  },
  {
    name: "Cybersecurity",
    status: "Emerging",
    height: 92,
    overview:
      "Protect people and organisations by understanding systems, threats and risk.",
    roles: ["Security Analyst", "Threat Researcher", "Security Engineer"],
    skills: ["Pattern recognition", "Networks", "Risk judgement"],
    related: ["Technology", "Data", "Finance"],
  },
  {
    name: "Data",
    status: "Growing",
    height: 86,
    overview: "Turn information into questions, evidence and better decisions.",
    roles: ["Data Analyst", "Analytics Engineer", "Data Scientist"],
    skills: ["Statistics", "SQL", "Visual communication"],
    related: ["Finance", "Healthcare", "Technology"],
  },
]
