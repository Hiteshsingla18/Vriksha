import { useState } from "react"

// ==========================================
// Types
// ==========================================
interface BaselineProfile {
  title: string
  experience: string
  domain: string
  currentSalary: string
  skills: string[]
}

interface AdjacentRole {
  id: string
  role: string
  gapLevel: string
  matchPct: number
  salaryLift: string
  runwayMonths: string
  transferSkills: string[]
  gapSkills: string[]
  why: string
  milestones: string[]
}

interface AdjacentLeapProps {
  onBuilderHandoff?: () => void
}

// ==========================================
// Embedded Self-Contained SVG Icons
// Zero external file dependencies
// ==========================================
function ArrowRightIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function CheckIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function SparklesIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
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

function ChevronRightIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

function TargetIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="9" strokeWidth={2} />
      <circle cx="12" cy="12" r="5" strokeWidth={2} />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

// ==========================================
// Baseline Profile
// ==========================================
const BASELINE: BaselineProfile = {
  title: "Software Developer",
  experience: "5 Years Exp · Backend Systems",
  domain: "Cloud Services & Relational Data",
  currentSalary: "₹16 – 22 LPA",
  skills: ["Python", "SQL", "APIs", "System Design"],
}

// ==========================================
// Adjacent Roles Database
// Derived from hackathon datasets:
// DataScience_Jobs.csv & JDS Skill Competencies
// ==========================================
const ADJACENT_ROLES: AdjacentRole[] = [
  {
    id: "ml-engineer",
    role: "ML Engineer",
    gapLevel: "Moderate Gap · 3 focused skills",
    matchPct: 68,
    salaryLift: "₹24 – 38 LPA (+35% Lift)",
    runwayMonths: "3–5 Months",
    transferSkills: ["Python", "SQL", "APIs", "System Design"],
    gapSkills: ["Machine Learning", "Applied Statistics", "Model Evaluation"],
    why: "Your software foundation already covers production APIs and system resilience; the primary bridge is statistical model reasoning and eval benchmarks.",
    milestones: [
      "Stage 1: Core Scikit-Learn classification & data preprocessing",
      "Stage 2: Model evaluation metrics (Precision/Recall curves, ROC-AUC)",
      "Stage 3: Containerized model deployment with FastAPI & Docker",
    ],
  },
  {
    id: "data-engineer",
    role: "Data Engineer",
    gapLevel: "Low Gap · 2 focused skills",
    matchPct: 82,
    salaryLift: "₹22 – 36 LPA (+28% Lift)",
    runwayMonths: "2–3 Months",
    transferSkills: ["Python", "SQL", "APIs", "System Design"],
    gapSkills: ["Distributed Spark", "Pipeline Orchestration (Airflow)"],
    why: "Direct horizontal extension of backend databases into large-scale distributed cloud data warehouses and automated streaming pipelines.",
    milestones: [
      "Stage 1: Data warehouse partitioning & schema optimization",
      "Stage 2: DAG dependency scheduling with Apache Airflow",
      "Stage 3: High-throughput batch streaming with PySpark",
    ],
  },
  {
    id: "solutions-engineer",
    role: "Solutions Engineer",
    gapLevel: "Low Gap · 2 focused skills",
    matchPct: 78,
    salaryLift: "₹25 – 42 LPA (+40% Lift)",
    runwayMonths: "2–4 Months",
    transferSkills: ["APIs", "System Design", "Python", "Cloud Architecture"],
    gapSkills: ["Executive Client Discovery", "Enterprise Security Proofs"],
    why: "Combines technical system design credibility with high-value stakeholder architecture discovery and pre-sales technical alignment.",
    milestones: [
      "Stage 1: Enterprise RFP solution architecture mapping",
      "Stage 2: Technical proof-of-concept (PoC) delivery within 14 days",
      "Stage 3: Boardroom executive stakeholder translation",
    ],
  },
  {
    id: "ai-platform-engineer",
    role: "AI Platform Engineer",
    gapLevel: "Moderate Gap · 3 focused skills",
    matchPct: 72,
    salaryLift: "₹28 – 45 LPA (+48% Lift)",
    runwayMonths: "3–5 Months",
    transferSkills: ["System Design", "Python", "APIs", "Cloud Services"],
    gapSkills: ["Kubernetes / Triton", "Feature Stores (Feast)", "Inference Latency"],
    why: "Leap from standard backend services into high-throughput GPU model serving infrastructure and automated MLOps pipelines.",
    milestones: [
      "Stage 1: Triton / vLLM high-concurrency model hosting",
      "Stage 2: Low-latency feature caching with Redis & Feast",
      "Stage 3: Automated drift monitoring with Prometheus & Grafana",
    ],
  },
]

// ==========================================
// Main AdjacentLeap Component
// ==========================================
export default function AdjacentLeap({ onBuilderHandoff }: AdjacentLeapProps) {
  // 1. Interactive Selected Target Role
  const [selectedRoleId, setSelectedRoleId] = useState<string>("ml-engineer")
  // 2. Local State for "Build the focused gap" Action
  const [builtRoles, setBuiltRoles] = useState<Record<string, boolean>>({})

  const currentTarget =
    ADJACENT_ROLES.find((r) => r.id === selectedRoleId) || ADJACENT_ROLES[0]

  const isCurrentBuilt = !!builtRoles[currentTarget.id]

  const handleBuildGap = () => {
    setBuiltRoles((prev) => ({
      ...prev,
      [currentTarget.id]: true,
    }))
    if (onBuilderHandoff) {
      onBuilderHandoff()
    }
  }

  return (
    <section
      className="grower-feature-section bg-transparent"
      id="adjacent-leap"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="grower-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#1f5b50] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1f5b50] inline-block" />
            03 · Move without restarting
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Adjacent Leap
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Nearby career paths where 70%+ of your existing software engineering skills already transfer.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4]">
          <TargetIcon className="w-3 h-3 text-[#1f5b50]" />
          Skill-Transfer Matrix
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Sleek 3-Column Structured Card Interface              */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* ====================================================== */}
        {/* Column 1: Current Baseline Profile (3 cols)            */}
        {/* ====================================================== */}
        <div className="lg:col-span-3 bg-[#fcfbf9] border border-gray-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                01 · Current Baseline
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>

            <h3 className="text-2xl font-serif text-gray-950 font-bold tracking-tight">
              {BASELINE.title}
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              {BASELINE.experience}
            </p>
            <span className="text-[11px] text-gray-500 font-mono block mt-1">
              Base: {BASELINE.currentSalary}
            </span>

            {/* Verified Skills */}
            <div className="mt-5 pt-4 border-t border-gray-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-2">
                Transferable Foundation:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {BASELINE.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4] px-2.5 py-1 rounded-lg"
                  >
                    <CheckIcon className="w-3 h-3 text-[#1f5b50]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-left">
            <span className="text-[10px] text-gray-500 font-medium block">
              Foundation Ready
            </span>
            <span className="text-xs text-gray-800 font-semibold flex items-center gap-1 mt-0.5">
              Explore 4 Adjacent Roles
              <ArrowRightIcon className="w-3.5 h-3.5 text-[#1f5b50]" />
            </span>
          </div>
        </div>

        {/* ====================================================== */}
        {/* Column 2: Available Adjacent Target Roles (4 cols)     */}
        {/* ====================================================== */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                02 · Target Role Selection
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                {ADJACENT_ROLES.length} Paths
              </span>
            </div>

            <h3 className="text-lg font-serif text-gray-950 font-bold mb-1">
              Select Adjacent Target
            </h3>
            <p className="text-xs text-gray-600 mb-3.5">
              Roles requiring 3 or fewer focused skill additions.
            </p>

            {/* Role Buttons Stack */}
            <div className="space-y-2">
              {ADJACENT_ROLES.map((item, idx) => {
                const isSelected = selectedRoleId === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedRoleId(item.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-[#f4f7f4] border-[#1f5b50] ring-1 ring-[#1f5b50]/30 shadow-xs"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:bg-[#faf9f6]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-[11px] font-bold text-gray-400">
                          0{idx + 1}
                        </span>
                        <strong className="text-xs font-bold text-gray-950">
                          {item.role}
                        </strong>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-[#1f5b50] text-white"
                            : "bg-[#e2f0ec] text-[#1f5b50]"
                        }`}
                      >
                        {item.matchPct}% Match
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1.5 text-[11px]">
                      <span className="text-gray-500 text-[10px]">
                        {item.gapLevel}
                      </span>
                      <span className="text-[#1f5b50] font-semibold text-[10px] font-mono">
                        {item.salaryLift}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-500 flex items-center justify-between">
            <span>Click any target to inspect gap</span>
            <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>

        {/* ====================================================== */}
        {/* Column 3: Dynamic Gap Analysis & Action Panel (5 cols) */}
        {/* ====================================================== */}
        <div className="lg:col-span-5 bg-[#fcfbf9] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div>
            {/* Top Row: Title & Readiness Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1f5b50] block">
                  03 · Gap Analysis Blueprint
                </span>
                <h3 className="text-2xl font-serif text-gray-950 font-bold tracking-tight mt-0.5">
                  {currentTarget.role}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 block font-bold">
                  Expected Trajectory
                </span>
                <span className="text-xs font-mono font-bold text-[#1f5b50]">
                  {currentTarget.salaryLift}
                </span>
              </div>
            </div>

            {/* Match Readiness Progress Meter */}
            <div className="mt-3.5">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-gray-950">
                  Skill Transfer Readiness
                </span>
                <span className="font-mono font-bold text-[#1f5b50]">
                  {currentTarget.matchPct}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1f5b50] transition-all duration-300"
                  style={{ width: `${currentTarget.matchPct}%` }}
                />
              </div>
            </div>

            {/* Why This Leap Works */}
            <div className="mt-3.5 p-3 rounded-xl bg-white border border-gray-200 text-xs text-gray-700 leading-relaxed">
              <strong className="text-gray-950 font-semibold block mb-0.5">
                Why this path transfers:
              </strong>
              {currentTarget.why}
            </div>

            {/* Skills Breakdown Grid */}
            <div className="mt-4 space-y-3">
              {/* Transferable Skills */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1.5 flex items-center gap-1">
                  <CheckIcon className="w-3 h-3 text-emerald-600" />
                  Already Transferable ({currentTarget.transferSkills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTarget.transferSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-semibold bg-[#e8f5e9] text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-md"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Focused Gaps to Build */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-1.5 flex items-center gap-1">
                  <SparklesIcon className="w-3 h-3 text-amber-600" />
                  Focused Gaps to Build ({currentTarget.gapSkills.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTarget.gapSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-semibold bg-[#fef3c7] text-amber-950 border border-amber-300 px-2 py-0.5 rounded-md"
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 3 Transition Milestones */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 block mb-1.5">
                Target Runway: {currentTarget.runwayMonths}
              </span>
              <div className="space-y-1">
                {currentTarget.milestones.map((step) => (
                  <div
                    key={step}
                    className="flex items-center gap-1.5 text-[11px] text-gray-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1f5b50]" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-5 pt-4 border-t border-gray-200">
            {isCurrentBuilt ? (
              <div className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <CheckIcon className="w-4 h-4 text-emerald-600" />
                  Gap Added to Growth Roadmap!
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setBuiltRoles((prev) => ({ ...prev, [currentTarget.id]: false }))
                  }
                  className="text-[10px] font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer underline"
                >
                  Reset
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleBuildGap}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1f5b50] hover:bg-[#17463e] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Build the focused gap</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
