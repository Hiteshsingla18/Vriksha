export type PortalId =
  | "home"
  | "explorer"
  | "builder"
  | "grower"
  | "colleges"
  | "hiring"
  | "company"

export type IconName =
  | "search"
  | "bell"
  | "arrow"
  | "spark"
  | "grid"
  | "branch"
  | "book"
  | "people"
  | "building"
  | "menu"
  | "close"
  | "chevron"
  | "check"
  | "target"

export interface Portal {
  id: PortalId
  label: string
  kicker: string
  description: string
  icon: IconName
}

export interface PortalSection {
  label: string
  id: string
  view: number
}

export interface CareerRoom {
  field: string
  title: string
  time: string
  description: string
  task: string
  skills: string[]
}

export interface ExplorerProfile {
  name: string
  role: string
  location: string
  years: string
  pathway: string
  skills: string[]
}

export interface ExplorerField {
  name: string
  status: "Growing" | "Steady" | "Emerging"
  height: number
  overview: string
  roles: string[]
  skills: string[]
  related: string[]
}

export interface BuilderTrail {
  name: string
  profile: string
  started: string
  gap: string
  action: string
  learning: string
  outcome: string
}

export interface GrowerRecommendation {
  status: "Growing" | "Emerging" | "Watch"
  role: string
  signal: string
  reason: string
  skills: string[]
  next: string
}

export interface GrowerAdjacentRole {
  role: string
  gap: string
  transfer: string[]
  build: string[]
  why: string
}

export interface GrowerMentor {
  name: string
  role: string
  experience: string
  path: string
  skills: string[]
  start: string
  match: string
}

export interface CollegeCurriculumDiffItem {
  course: string
  taught: string
  current: string
  predictive: string
  status: "Aligned" | "Emerging gap" | "Needs attention"
  explanation: string
}

export interface CollegeCourse {
  code: string
  name: string
  skill: string
  correlation: string
  relevance: string
  status: string
  score: number
  insight: string
}

export interface FacultyMatch {
  name: string
  role: string
  experience: string
  expertise: string
  skills: string[]
  reason: string
}

export interface HiringCandidate {
  name: string
  initials: string
  title: string
  keyword: number
  predicted: number
  roleMatch: string
  skills: string[]
  strengths: string[]
  gaps: string[]
  evidence: string
}

export interface ShadowCandidate {
  name: string
  current: string
  blockedBy: string
  capability: string
  why: string
}

export interface HiringQuestion {
  capability: string
  question: string
  why: string
  signal: string
}

export interface BenchSignal {
  employee: string
  team: string
  skill: string
  freshness: "Aging" | "Fresh" | "At Risk" | "Stable"
  last: string
  relevance: string
  risk: string
  score: number
  note: string
}

export interface MobilityCandidate {
  name: string
  department: string
  role: string
  target: string
  match: number
  transfer: string[]
  gap: string[]
  why: string
}

export interface AttritionProfile {
  name: string
  team: string
  signal: string
  relevance: string
  growth: string
  mobility: string
  signals: string[]
  actions: string[]
}
