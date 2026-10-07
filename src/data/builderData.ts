import { BuilderTrail, PortalSection } from "../types"

export const builderSections: PortalSection[] = [
  { label: "Tree Overlay", id: "tree-overlay", view: 0 },
  { label: "Stuck Detector", id: "stuck-detector", view: 1 },
  { label: "Micro-Project", id: "micro-project", view: 2 },
  { label: "Trail Matching", id: "trail-matching", view: 3 },
  {
    label: "Confidence vs Competence",
    id: "confidence-vs-competence",
    view: 4,
  },
]

export const builderTrails: BuilderTrail[] = [
  {
    name: "Trail 01",
    profile: "Anonymised backend learner",
    started: "Basic Python",
    gap: "Data Structures",
    action: "Solved 80 targeted problems and built one indexing tool",
    learning: "Peer review plus two focused algorithm sessions",
    outcome: "Junior Software Engineer",
  },
  {
    name: "Trail 02",
    profile: "Anonymised analyst",
    started: "SQL reporting",
    gap: "Query Optimization",
    action: "Benchmarked slow queries and documented three fixes",
    learning: "Execution plans, indexing and query profiling",
    outcome: "Analytics Engineer",
  },
  {
    name: "Trail 03",
    profile: "Anonymised ML learner",
    started: "Model notebooks",
    gap: "Model Evaluation",
    action:
      "Compared four models against one consistent evaluation framework",
    learning: "Metrics, validation and error analysis",
    outcome: "Machine Learning Associate",
  },
]

export const builderGaps = [
  { skill: "Model Evaluation", gap: "49 pt gap", value: 31, priority: true },
  { skill: "Deployment", gap: "47 pt gap", value: 18, priority: false },
  { skill: "Machine Learning", gap: "33 pt gap", value: 52, priority: false },
  { skill: "Data Processing", gap: "29 pt gap", value: 46, priority: false },
]

export const behaviourSignals = [
  {
    signal: "Repeatedly abandoning a topic",
    evidence: "3 exits during validation lessons",
    skill: "Model Evaluation",
  },
  {
    signal: "Spending unusually long on a skill",
    evidence: "2.4× the demo completion time",
    skill: "Evaluation Metrics",
  },
  {
    signal: "Repeating similar mistakes",
    evidence: "Same validation error in 4 attempts",
    skill: "Cross-validation",
  },
  {
    signal: "Avoiding certain task types",
    evidence: "Skipped interpretation tasks twice",
    skill: "Error Analysis",
  },
  {
    signal: "Revisiting the same concept",
    evidence: "Returned to precision vs recall 5 times",
    skill: "Metric Selection",
  },
]

export const builderTreeLeaves: {
  skill: string
  status: "verified" | "strong" | "priority" | "gap"
  left: number
  top: number
}[] = [
  { skill: "Python", status: "verified", left: 50, top: 18 },
  { skill: "SQL", status: "verified", left: 25, top: 36 },
  { skill: "Statistics", status: "strong", left: 14, top: 20 },
  { skill: "Machine Learning", status: "gap", left: 73, top: 27 },
  { skill: "Model Evaluation", status: "priority", left: 87, top: 14 },
  { skill: "Data Processing", status: "gap", left: 78, top: 61 },
  { skill: "Deployment", status: "gap", left: 91, top: 48 },
  { skill: "Communication", status: "verified", left: 38, top: 50 },
]

export const projectChecklistItems = [
  { step: "Choose a small public dataset", time: "30 min" },
  { step: "Create five baseline queries", time: "90 min" },
  { step: "Profile and improve each query", time: "3–4 hours" },
  { step: "Write the before-and-after note", time: "90 min" },
]
