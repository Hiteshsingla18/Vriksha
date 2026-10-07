import { Portal, PortalId } from "../types"

export const portals: Portal[] = [
  {
    id: "explorer",
    label: "Explorer",
    kicker: "Discover",
    description: "Discover where you could go.",
    icon: "search",
  },
  {
    id: "builder",
    label: "Builder",
    kicker: "Develop",
    description: "Build the skills to get there.",
    icon: "grid",
  },
  {
    id: "grower",
    label: "Grower",
    kicker: "Progress",
    description: "Find what could come next.",
    icon: "branch",
  },
  {
    id: "colleges",
    label: "Colleges",
    kicker: "Align",
    description: "Connect curriculum with the market.",
    icon: "book",
  },
  {
    id: "hiring",
    label: "Hiring",
    kicker: "Match",
    description: "Find talent through skills.",
    icon: "people",
  },
  {
    id: "company",
    label: "Company",
    kicker: "Plan",
    description: "Plan the skills your workforce needs.",
    icon: "building",
  },
]

export const portalMeta: Record<
  Exclude<PortalId, "home">,
  {
    eyebrow: string
    title: string
    sub: string
    nav: string[]
  }
> = {
  explorer: {
    eyebrow: "Career intelligence",
    title: "Find a direction that feels like yours.",
    sub: "Explore careers through skills, real work and the choices that shape them.",
    nav: [
      "Career Rooms",
      "Regret Radar",
      "Family Brief",
      "React to Real Work",
      "Nearby, Not Famous",
      "Forest View",
    ],
  },
  builder: {
    eyebrow: "Skill development",
    title: "Build your way to ML Engineer.",
    sub: "Turn your current skills into a focused path with practical evidence.",
    nav: [
      "Tree Overlay",
      "Stuck Detector",
      "Micro-Project",
      "Trail Matching",
      "Confidence vs Competence",
    ],
  },
  grower: {
    eyebrow: "Career mobility",
    title: "Your experience opens more than one path.",
    sub: "See where your transferable skills can take you next.",
    nav: [
      "Market Recommendations",
      "Skill Half-Life",
      "Adjacent Leap",
      "Compensation Trajectory",
      "Future-You Mentor",
    ],
  },
  colleges: {
    eyebrow: "Education intelligence",
    title: "Where curriculum meets the market.",
    sub: "Understand the alignment between what students learn and what industry needs.",
    nav: [
      "Curriculum vs Market",
      "Curriculum Autopsy",
      "Early Warning",
      "Guest-Faculty Match",
      "Cohort Heat-Map",
    ],
  },
  hiring: {
    eyebrow: "Talent intelligence",
    title: "See potential beyond the job title.",
    sub: "Discover relevant talent through skills, evidence and adjacent experience.",
    nav: [
      "Predicted-Success Match",
      "Shadow Candidate Audit",
      "Skill-Decay Screening",
      "Team-Fit View",
      "Calibrated Questions",
    ],
  },
  company: {
    eyebrow: "Workforce intelligence",
    title: "Build the capabilities your strategy needs.",
    sub: "Anticipate capability gaps, model build-vs-buy decisions and plan internal mobility.",
    nav: [
      "Bench Radar",
      "Build-vs-Buy Simulator",
      "Internal Mobility",
      "Attrition-Aware Planning",
    ],
  },
}
