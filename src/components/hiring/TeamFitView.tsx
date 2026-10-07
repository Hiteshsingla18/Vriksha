import { useState } from "react"
import { teamCandidates } from "../../data/hiringData"

// ==========================================
// Types & Extended Data Science Metadata
// ==========================================
interface CandidateTeamMetric {
  name: string
  role: string
  experience: string
  complementScore: number
  netNewCount: number
  synergyLift: string
  valueLabel: string
  gapResolution: {
    status: "resolved" | "partial" | "unaddressed"
    badge: string
    summary: string
  }
  adds: string[]
  strengthens: string[]
  duplicates: string[]
  rationale: string
  coverageSimulation: {
    platform: number
    modelling: number
    dataOps: number
  }
}

const EXTENDED_TEAM_CANDIDATES: CandidateTeamMetric[] = [
  {
    name: "Maya Rao",
    role: "ML Platform Engineer (Transitioned from Backend)",
    experience: "5 yrs production exp",
    complementScore: 94,
    netNewCount: 3,
    synergyLift: "+38% Autonomy",
    valueLabel: "High incremental team value",
    gapResolution: {
      status: "resolved",
      badge: "Targeted Gap Resolved",
      summary: "Directly closes the Cloud Infrastructure & Kubernetes deployment void.",
    },
    adds: [
      "Cloud infrastructure",
      "Production ownership",
      "API reliability",
    ],
    strengthens: ["Python", "System design", "Observability"],
    duplicates: ["Backend development"],
    rationale: "Eliminates handoff bottlenecks between data scientists and platform ops, achieving end-to-end model deployment autonomy.",
    coverageSimulation: {
      platform: 92,
      modelling: 85,
      dataOps: 78,
    },
  },
  {
    name: "Sara Khan",
    role: "Data Platform Specialist",
    experience: "4.5 yrs data telemetry",
    complementScore: 91,
    netNewCount: 3,
    synergyLift: "+35% Data SLA",
    valueLabel: "High complementary value",
    gapResolution: {
      status: "partial",
      badge: "Upstream Guardrail Secured",
      summary: "Stabilizes data telemetry and feature pipelines; leaves core K8s ops secondary.",
    },
    adds: [
      "Data reliability",
      "Observability",
      "Analytics systems",
    ],
    strengthens: ["Python", "SQL", "ETL orchestration"],
    duplicates: ["Data pipelines"],
    rationale: "Prevents silent data drift and pipeline stalls, shielding downstream inference models from low-quality feature stores.",
    coverageSimulation: {
      platform: 72,
      modelling: 84,
      dataOps: 95,
    },
  },
  {
    name: "Arjun Mehta",
    role: "Applied Machine Learning Engineer",
    experience: "4 yrs deep learning",
    complementScore: 74,
    netNewCount: 2,
    synergyLift: "+14% Research Depth",
    valueLabel: "Moderate incremental value",
    gapResolution: {
      status: "unaddressed",
      badge: "Platform Gap Remains Open",
      summary: "Substantially overlaps existing modeling talent; DevOps bottleneck remains unresolved.",
    },
    adds: ["Model research", "Statistical depth"],
    strengthens: ["Machine learning", "Python", "Experimentation"],
    duplicates: ["Model development", "Experimentation", "Hyperparameter tuning"],
    rationale: "Strong algorithmic depth, but heavily replicates current team competencies while leaving production infrastructure bare.",
    coverageSimulation: {
      platform: 48,
      modelling: 98,
      dataOps: 62,
    },
  },
]

// Baseline Team Capabilities (Pre-Hire)
const BASELINE_TEAM_COVERAGE = {
  platform: 45,
  modelling: 88,
  dataOps: 60,
}

// ==========================================
// Self-Contained SVG Icons
// Zero external file dependencies
// ==========================================
function CheckCircleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

function PlusIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
    </svg>
  )
}

function ArrowUpIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  )
}

function DuplicateIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  )
}

function UsersIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )
}

function SparklesIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.286L13 21l-2.286-6.857L5 12l5.714-2.286L13 3z"
      />
    </svg>
  )
}

function AlertTriangleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  )
}

// ==========================================
// Main TeamFitView Component
// ==========================================
interface TeamFitViewProps {
  selectedCandidate?: number
  onSelectCandidate?: (idx: number) => void
}

export default function TeamFitView({
  selectedCandidate,
  onSelectCandidate,
}: TeamFitViewProps) {
  const [internalCandidate, setInternalCandidate] = useState(0)
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null)
  const [showSimulatedCoverage, setShowSimulatedCoverage] = useState(true)

  // Support both external prop synchronization and self-contained state
  const currentIndex = selectedCandidate !== undefined ? selectedCandidate : internalCandidate
  const handleSelect = (idx: number) => {
    setInternalCandidate(idx)
    if (onSelectCandidate) {
      onSelectCandidate(idx)
    }
    setActiveSkillFilter(null)
  }

  const current = EXTENDED_TEAM_CANDIDATES[currentIndex] || EXTENDED_TEAM_CANDIDATES[0]

  return (
    <section
      className="hiring-feature-section bg-transparent"
      id="team-fit-view"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="hiring-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#1f5b50] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1f5b50] inline-block" />
            04 · Evaluate contribution
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Team-Fit View
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Evaluate what each candidate adds to the existing data science team profile rather than grading in isolation.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4]">
          <UsersIcon className="w-3 h-3 text-[#1f5b50]" />
          Synergistic Team Modeling
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Interactive Candidate Selector Tabs                   */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {EXTENDED_TEAM_CANDIDATES.map((candidate, index) => {
          const isSelected = currentIndex === index
          const initials = candidate.name
            .split(" ")
            .map((n) => n[0])
            .join("")

          return (
            <button
              key={candidate.name}
              type="button"
              onClick={() => handleSelect(index)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3.5 ${
                isSelected
                  ? "bg-white border-[#1f5b50] shadow-sm ring-1 ring-[#1f5b50]"
                  : "bg-[#fcfbf9] border-gray-200 hover:bg-white hover:border-gray-300"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[#1f5b50] text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {initials}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <strong className="text-xs sm:text-sm font-bold text-gray-950 truncate block">
                    {candidate.name}
                  </strong>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                      isSelected
                        ? "bg-[#e2f0ec] text-[#1f5b50]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {candidate.complementScore}% Fit
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 truncate block mt-0.5">
                  {candidate.role.split("(")[0]}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* ======================================================== */}
      {/* 3. Interactive Team Fit Equation (3 Columns)             */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* -------------------------------------------------------- */}
        {/* Column 1: Existing Team Profile Baseline (4 cols)        */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-4 bg-[#fcfbf9] border border-gray-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Baseline Team Matrix
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-600">
                4 Data Scientists
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-serif text-gray-950 font-bold leading-snug">
              Strong Modelling, Thin Platform Depth
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              Existing team has deep algorithmic strength but lacks deployment independence.
            </p>

            {/* Existing Core Competencies */}
            <div className="mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Core Capabilities Present:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: "Machine learning", strong: true },
                  { name: "Experimentation", strong: true },
                  { name: "Python", strong: true },
                  { name: "Statistics", strong: false },
                  { name: "Feature Store", strong: false },
                ].map((skill) => (
                  <span
                    key={skill.name}
                    className={`text-[11px] px-2.5 py-1 rounded-full border ${
                      skill.strong
                        ? "bg-[#eaf4f1] text-[#1f5b50] border-[#b2d8ce] font-semibold"
                        : "bg-white text-gray-700 border-gray-200 font-normal"
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Current Team Gap & Resolution Indicator */}
          <div className="p-3.5 rounded-xl bg-white border border-gray-200 text-left">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Critical Team Gap
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  current.gapResolution.status === "resolved"
                    ? "bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4]"
                    : current.gapResolution.status === "partial"
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {current.gapResolution.status === "resolved" ? (
                  <CheckCircleIcon className="w-3 h-3 text-[#1f5b50]" />
                ) : (
                  <AlertTriangleIcon className="w-3 h-3" />
                )}
                {current.gapResolution.badge}
              </span>
            </div>
            <strong className="text-xs font-bold text-gray-950 block">
              Cloud Infrastructure · Kubernetes · MLOps
            </strong>
            <p className="text-[11px] text-gray-500 mt-1 m-0">
              {current.gapResolution.summary}
            </p>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* Column 2: Candidate Contribution Breakdown (4.5 cols)    */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1f5b50]">
                Candidate Synergies
              </span>
              <span className="text-[10px] font-mono text-gray-500">
                {current.experience}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-serif text-gray-950 font-bold leading-snug">
              {current.name}
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">{current.role}</p>

            {/* Categorized Contribution Groups */}
            <div className="mt-4 space-y-3">
              {/* 1. Adds Missing Skills */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-[#1f5b50] flex items-center gap-1">
                    <PlusIcon className="w-3 h-3 text-[#1f5b50]" />
                    Adds Missing Skills
                  </span>
                  <span className="text-[10px] font-mono text-[#1f5b50] font-bold">
                    +{current.adds.length} new
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {current.adds.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => setActiveSkillFilter(skill)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        activeSkillFilter === skill
                          ? "bg-[#1f5b50] text-white border-[#1f5b50]"
                          : "bg-[#eaf4f1] text-[#1f5b50] border-[#b2d8ce] hover:bg-[#d8ece5]"
                      }`}
                    >
                      +{skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Strengthens Shared Depth */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-gray-800 flex items-center gap-1">
                    <ArrowUpIcon className="w-3 h-3 text-gray-700" />
                    Strengthens Shared Depth
                  </span>
                  <span className="text-[10px] font-mono text-gray-600 font-bold">
                    +{current.strengthens.length} areas
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {current.strengthens.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => setActiveSkillFilter(skill)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        activeSkillFilter === skill
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      ↑ {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Duplicates Existing Capabilities */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1">
                    <DuplicateIcon className="w-3 h-3 text-gray-400" />
                    Duplicates Existing
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    {current.duplicates.length} redundant
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {current.duplicates.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-gray-50 text-gray-500 border border-dashed border-gray-300"
                    >
                      = {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Active Skill Insight Feedback */}
          {activeSkillFilter && (
            <div className="p-2.5 rounded-lg bg-[#f7f5ee] border border-gray-200 text-[11px] text-gray-700">
              <strong>{activeSkillFilter}:</strong>{" "}
              {current.adds.includes(activeSkillFilter)
                ? "Bridges unrepresented infrastructure competency for the entire ML sprint team."
                : "Provides cross-review depth and redundancy for mission-critical production pipelines."}
            </div>
          )}
        </div>

        {/* -------------------------------------------------------- */}
        {/* Column 3: Combined Team Outcome & Metric Lift (3.5 cols) */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-4 bg-[#fcfbf9] border border-gray-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Combined Team Impact
              </span>
              <span className="text-[10px] font-bold text-[#1f5b50]">
                {current.synergyLift}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-gray-950">
                {current.complementScore}
              </span>
              <span className="text-xs font-mono text-gray-500">/ 100 Complement Score</span>
            </div>

            <strong className="text-xs font-bold text-[#1f5b50] block mt-1">
              {current.valueLabel}
            </strong>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              {current.rationale}
            </p>

            {/* Dynamic Coverage Simulation */}
            <div className="mt-4 pt-3.5 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                  Team Domain Coverage:
                </span>
                <button
                  type="button"
                  onClick={() => setShowSimulatedCoverage(!showSimulatedCoverage)}
                  className="text-[10px] font-mono text-[#1f5b50] hover:underline cursor-pointer"
                >
                  {showSimulatedCoverage ? "Showing +Post-Hire" : "Showing Baseline"}
                </button>
              </div>

              <div className="space-y-2">
                {[
                  {
                    label: "Platform & Deployment",
                    baseline: BASELINE_TEAM_COVERAGE.platform,
                    simulated: current.coverageSimulation.platform,
                  },
                  {
                    label: "Modelling & Experimentation",
                    baseline: BASELINE_TEAM_COVERAGE.modelling,
                    simulated: current.coverageSimulation.modelling,
                  },
                  {
                    label: "Data Quality & Telemetry",
                    baseline: BASELINE_TEAM_COVERAGE.dataOps,
                    simulated: current.coverageSimulation.dataOps,
                  },
                ].map((item) => {
                  const val = showSimulatedCoverage ? item.simulated : item.baseline
                  const diff = item.simulated - item.baseline

                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="text-gray-700">{item.label}</span>
                        <div className="flex items-center gap-1 font-mono">
                          <span className="font-bold text-gray-900">{val}%</span>
                          {showSimulatedCoverage && diff > 0 && (
                            <span className="text-[10px] text-[#1f5b50] font-semibold">
                              (+{diff}%)
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 rounded-full ${
                            val >= 85
                              ? "bg-[#1f5b50]"
                              : val >= 70
                                ? "bg-[#3d8376]"
                                : "bg-amber-600"
                          }`}
                          style={{ width: `${val}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Bottom Recommendation Pill */}
          <div className="p-3 rounded-xl bg-white border border-gray-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#e2f0ec] text-[#1f5b50] flex items-center justify-center shrink-0">
              <SparklesIcon className="w-4 h-4" />
            </div>
            <div className="text-[11px] text-gray-600 min-w-0">
              <strong className="text-gray-950 font-bold block">
                {current.netNewCount} Net-New Capabilities Unlocked
              </strong>
              Reduces team skill concentration risk.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
