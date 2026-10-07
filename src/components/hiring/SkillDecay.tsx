import { useState } from "react"

// ==========================================
// Types
// ==========================================
interface CandidateSkillFreshness {
  skill: string
  state: "Recently Verified" | "Fresh" | "Aging" | "At Risk"
  stateTone: "emerald" | "teal" | "amber" | "danger"
  evidence: string
  freshnessPct: number
  lastActivity: string
}

interface FreshnessProfile {
  candidate: string
  initials: string
  role: string
  overallFreshness: number
  skills: CandidateSkillFreshness[]
}

// ==========================================
// Embedded Self-Contained SVG Icons
// Zero external file dependencies
// ==========================================
function ClockIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
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

// ==========================================
// Skill Freshness & Decay Profiles Database
// Derived from hackathon candidate evidence logs
// ==========================================
const PROFILES: FreshnessProfile[] = [
  {
    candidate: "Maya Rao",
    initials: "MR",
    role: "Backend Engineer → ML Platform",
    overallFreshness: 76,
    skills: [
      {
        skill: "Python Core & Asynchronous APIs",
        state: "Recently Verified",
        stateTone: "emerald",
        evidence: "Production microservice migration and automated test suite merged 3 weeks ago.",
        freshnessPct: 92,
        lastActivity: "3 weeks ago",
      },
      {
        skill: "Cloud Infrastructure (AWS)",
        state: "Fresh",
        stateTone: "teal",
        evidence: "Terraform cloud deployment and VPC security auditing delivered 2 months ago.",
        freshnessPct: 86,
        lastActivity: "2 months ago",
      },
      {
        skill: "Kubernetes Orchestration",
        state: "Aging",
        stateTone: "amber",
        evidence: "Last verified Helm chart and container staging project was 18 months ago.",
        freshnessPct: 52,
        lastActivity: "18 months ago",
      },
      {
        skill: "TensorFlow & Deep Learning",
        state: "At Risk",
        stateTone: "danger",
        evidence: "Listed on resume, but zero verified Git commits or production pipelines in 30+ months.",
        freshnessPct: 24,
        lastActivity: "30+ months ago",
      },
    ],
  },
  {
    candidate: "Sara Khan",
    initials: "SK",
    role: "Data Platform Engineer",
    overallFreshness: 84,
    skills: [
      {
        skill: "SQL & Query Partitioning",
        state: "Recently Verified",
        stateTone: "emerald",
        evidence: "High-throughput pipeline indexing and query refactoring delivered 2 weeks ago.",
        freshnessPct: 95,
        lastActivity: "2 weeks ago",
      },
      {
        skill: "Observability & Prometheus",
        state: "Recently Verified",
        stateTone: "emerald",
        evidence: "Real-time telemetry and alerting redesign merged 6 weeks ago.",
        freshnessPct: 90,
        lastActivity: "6 weeks ago",
      },
      {
        skill: "Python Data Tooling",
        state: "Fresh",
        stateTone: "teal",
        evidence: "Automated data quality verification library deployed 1 month ago.",
        freshnessPct: 88,
        lastActivity: "1 month ago",
      },
      {
        skill: "Apache Spark / PySpark",
        state: "Aging",
        stateTone: "amber",
        evidence: "Last large-scale batch ETL pipeline project was 14 months ago.",
        freshnessPct: 58,
        lastActivity: "14 months ago",
      },
    ],
  },
  {
    candidate: "Arjun Mehta",
    initials: "AM",
    role: "ML Engineer",
    overallFreshness: 68,
    skills: [
      {
        skill: "Machine Learning Modeling (PyTorch)",
        state: "Recently Verified",
        stateTone: "emerald",
        evidence: "Trained and benchmarked customer churn classifier model 3 weeks ago.",
        freshnessPct: 92,
        lastActivity: "3 weeks ago",
      },
      {
        skill: "Statistical Analysis & Experimentation",
        state: "Fresh",
        stateTone: "teal",
        evidence: "Designed multi-variant A/B test framework 2 months ago.",
        freshnessPct: 85,
        lastActivity: "2 months ago",
      },
      {
        skill: "Docker & Model Serving APIs",
        state: "Aging",
        stateTone: "amber",
        evidence: "FastAPI inference container built 15 months ago; limited recent CI/CD activity.",
        freshnessPct: 48,
        lastActivity: "15 months ago",
      },
      {
        skill: "Kubernetes Cluster Scheduling",
        state: "At Risk",
        stateTone: "danger",
        evidence: "Listed skill, but no verifiable container deployment history in recent Git repositories.",
        freshnessPct: 20,
        lastActivity: "36+ months ago",
      },
    ],
  },
]

function getStateBadgeClass(tone: CandidateSkillFreshness["stateTone"]) {
  switch (tone) {
    case "emerald":
      return "bg-[#e2f0ec] text-[#1f5b50] border-[#a9cec4]"
    case "teal":
      return "bg-teal-50 text-teal-800 border-teal-200"
    case "amber":
      return "bg-amber-50 text-amber-900 border-amber-200"
    case "danger":
      return "bg-rose-50 text-rose-800 border-rose-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function SkillDecay() {
  const [selectedCandidateIdx, setSelectedCandidateIdx] = useState<number>(0)
  const [verifiedFlags, setVerifiedFlags] = useState<Record<string, boolean>>({})

  const currentProfile = PROFILES[selectedCandidateIdx]

  const handleToggleVerification = (skillName: string) => {
    setVerifiedFlags((prev) => ({
      ...prev,
      [`${currentProfile.candidate}-${skillName}`]: !prev[`${currentProfile.candidate}-${skillName}`],
    }))
  }

  return (
    <section
      className="hiring-feature-section bg-transparent"
      id="skill-decay-screening"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="hiring-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#1f5b50] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1f5b50] inline-block" />
            03 · Check evidence freshness
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Skill-Decay Screening
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Distinguish between active production muscle memory and listed resume skills with no recent verified evidence.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4]">
          <ClockIcon className="w-3 h-3 text-[#1f5b50]" />
          Activity Freshness Sliders
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Interactive Workspace (Clean Light Theme Split)       */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ====================================================== */}
        {/* Left Column: Selectable Candidate Tabs (4 cols)        */}
        {/* ====================================================== */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Select Candidate
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              {PROFILES.length} Candidates
            </span>
          </div>

          {PROFILES.map((profile, idx) => {
            const isSelected = selectedCandidateIdx === idx
            return (
              <button
                key={profile.candidate}
                type="button"
                onClick={() => setSelectedCandidateIdx(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? "bg-[#1f5b50] border-[#17463e] text-white shadow-xs"
                    : "bg-white border-gray-200 text-gray-800 hover:border-gray-300 hover:bg-[#faf9f6]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-xs font-bold shrink-0 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#e2f0ec] text-[#1f5b50]"
                  }`}
                >
                  {profile.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <strong
                      className={`text-xs font-bold truncate ${
                        isSelected ? "text-white" : "text-gray-950"
                      }`}
                    >
                      {profile.candidate}
                    </strong>
                    <span
                      className={`text-[10px] font-mono font-semibold ${
                        isSelected ? "text-[#a9cec4]" : "text-[#1f5b50]"
                      }`}
                    >
                      {profile.overallFreshness}% Fresh
                    </span>
                  </div>
                  <span
                    className={`text-[11px] truncate block ${
                      isSelected ? "text-[#d0e5df]" : "text-gray-600"
                    }`}
                  >
                    {profile.role}
                  </span>
                </div>
              </button>
            )
          })}

          <div className="p-3.5 rounded-xl bg-[#fcfbf9] border border-gray-200 text-xs text-gray-600 mt-auto">
            <strong className="text-gray-950 block mb-0.5 font-semibold">
              Recruiter Insight:
            </strong>
            Decaying skills indicate where a 10-minute technical calibration or coding challenge is actually needed.
          </div>
        </div>

        {/* ====================================================== */}
        {/* Right Column: Dynamic Freshness & Decay Sliders (8 cols)*/}
        {/* ====================================================== */}
        <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-5">
          <div>
            {/* Header: Candidate Name & Overall Health */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                  Candidate Freshness Profile
                </span>
                <h3 className="text-2xl font-serif text-gray-950 font-bold tracking-tight mt-0.5">
                  {currentProfile.candidate}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-500 font-medium">
                  Overall Currency Score:
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#e2f0ec] text-[#1f5b50] font-mono font-bold text-xs border border-[#a9cec4]">
                  {currentProfile.overallFreshness} / 100
                </span>
              </div>
            </div>

            {/* List of Skills with Dynamic Decay Sliders */}
            <div className="divide-y divide-gray-100 my-2">
              {currentProfile.skills.map((item) => {
                const key = `${currentProfile.candidate}-${item.skill}`
                const isVerified = !!verifiedFlags[key]

                return (
                  <article key={item.skill} className="py-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h4 className="text-xs font-bold text-gray-950 m-0">
                        {item.skill}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-mono">
                          Last activity: {item.lastActivity}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStateBadgeClass(
                            item.stateTone
                          )}`}
                        >
                          {item.state}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-600 leading-relaxed mb-2.5">
                      {item.evidence}
                    </p>

                    {/* Freshness Slider / Progress Bar */}
                    <div className="space-y-1">
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden relative">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            item.freshnessPct >= 80
                              ? "bg-[#1f5b50]"
                              : item.freshnessPct >= 50
                                ? "bg-amber-500"
                                : "bg-rose-500"
                          }`}
                          style={{ width: `${item.freshnessPct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-gray-400 font-mono">
                        <span>Older evidence (&gt;2 yrs)</span>
                        <span className="font-bold text-gray-700">
                          {item.freshnessPct}% Freshness
                        </span>
                        <span>Recent verified code (&lt;3 mos)</span>
                      </div>
                    </div>

                    {/* Verification Toggle */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <span className="text-[10px] text-gray-400">
                        {item.freshnessPct < 60
                          ? "Recommend live probe in technical interview"
                          : "Strong verified recency"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleVerification(item.skill)}
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded border transition cursor-pointer ${
                          isVerified
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-white text-gray-600 border-gray-200 hover:text-gray-950"
                        }`}
                      >
                        {isVerified ? "✓ Probed in Interview" : "Flag for Verification"}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          {/* Freshness Note Disclaimer */}
          <div className="p-3.5 rounded-xl bg-[#fcfbf9] border border-gray-200 text-xs text-gray-600 flex items-start gap-2.5">
            <SparklesIcon className="w-4 h-4 text-[#1f5b50] shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong className="text-gray-950 font-semibold block mb-0.5">
                Fair Evaluation Protocol:
              </strong>
              No recent verified activity does not mean the candidate lacks competence. It identifies exactly which modules warrant a fast hands-on calibration.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
