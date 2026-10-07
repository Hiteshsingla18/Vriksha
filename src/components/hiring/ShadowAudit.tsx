import { useState, useMemo } from "react"
import { shadowCandidates } from "../../data/hiringData"

// ==========================================
// Types
// ==========================================
interface JdFilter {
  id: string
  label: string
  detail: string
  blockedCount: number
}

// ==========================================
// Embedded Self-Contained SVG Icons
// Zero external file dependencies
// ==========================================
function CheckIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function EyeOffIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
      />
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

const FILTER_OPTIONS: JdFilter[] = [
  {
    id: "degree",
    label: "Degree requirement",
    detail: "B.Tech in Computer Science required",
    blockedCount: 1,
  },
  {
    id: "tool",
    label: "Exact tool requirement",
    detail: "Kubernetes production certification required",
    blockedCount: 2,
  },
  {
    id: "experience",
    label: "Years of experience",
    detail: "Hard 5-year minimum cutoff",
    blockedCount: 1,
  },
  {
    id: "title",
    label: "Exact title requirement",
    detail: "Must have previous 'ML Engineer' title",
    blockedCount: 2,
  },
]

export default function ShadowAudit() {
  // 1. Interactive Checkbox Filters State
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({
    degree: true,
    tool: false,
    experience: true,
    title: false,
  })

  // 2. Unblocked / Reviewed Candidates State
  const [reviewedCandidates, setReviewedCandidates] = useState<Record<string, boolean>>({})

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Calculate dynamic hidden candidate count
  const activeCount = Object.values(activeFilters).filter(Boolean).length
  const totalHiddenProfiles = Math.min(shadowCandidates.length, activeCount + 1)

  // Filter candidates based on active filters
  const displayedCandidates = useMemo(() => {
    // If degree is checked, Candidate S3 is hidden
    // If experience is checked, Candidate S2 is hidden
    // If title is checked, Candidate S1 is hidden
    // If tool is checked, show an additional hidden candidate
    return shadowCandidates.filter((candidate) => {
      if (candidate.blockedBy.includes("title") && activeFilters.title) return true
      if (candidate.blockedBy.includes("experience") && activeFilters.experience) return true
      if (candidate.blockedBy.includes("Degree") && activeFilters.degree) return true
      if (candidate.blockedBy.includes("tool") && activeFilters.tool) return true
      return false
    })
  }, [activeFilters])

  return (
    <section
      className="hiring-feature-section bg-transparent"
      id="shadow-candidate-audit"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="hiring-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#1f5b50] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1f5b50] inline-block" />
            02 · Audit literal filters
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Shadow Candidate Audit
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Audit how many high-capability candidates your JD&apos;s literal criteria filter out before review.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4]">
          <EyeOffIcon className="w-3 h-3 text-[#1f5b50]" />
          Filtered Talent Discovery
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Interactive Light Theme 2-Column Workspace            */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ====================================================== */}
        {/* Left Column: Interactive JD Filter Panel (4.5 cols)    */}
        {/* ====================================================== */}
        <div className="lg:col-span-5 bg-[#fcfbf9] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                JD Filter Simulation
              </span>
              <span className="text-[10px] font-mono text-[#1f5b50] font-bold">
                {activeCount} Active Rules
              </span>
            </div>

            <h3 className="text-lg font-serif text-gray-950 font-bold mb-1">
              Which requirements hide capability?
            </h3>
            <p className="text-xs text-gray-600 mb-4">
              Toggle checkboxes to simulate relaxing rigid screening rules:
            </p>

            {/* Checkbox Filter Options */}
            <div className="space-y-2">
              {FILTER_OPTIONS.map((filter) => {
                const isChecked = !!activeFilters[filter.id]
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => toggleFilter(filter.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? "bg-white border-[#1f5b50] shadow-2xs"
                        : "bg-white/60 border-gray-200 hover:border-gray-300 hover:bg-white"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        isChecked
                          ? "bg-[#1f5b50] border-[#17463e] text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isChecked && <CheckIcon className="w-3.5 h-3.5" />}
                    </div>

                    <div className="min-w-0">
                      <strong className="text-xs text-gray-950 font-bold block">
                        {filter.label}
                      </strong>
                      <span className="text-[11px] text-gray-500 block mt-0.5">
                        {filter.detail}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dynamic Hidden Metric Box */}
          <div className="p-3.5 rounded-xl bg-white border border-gray-200 text-left">
            <span className="text-[10px] uppercase font-bold text-gray-500 block">
              Estimated Hidden Capability
            </span>
            <div className="text-2xl font-serif font-bold text-[#1f5b50] mt-0.5">
              {totalHiddenProfiles}{" "}
              <span className="text-xs font-sans text-gray-600 font-normal">
                high-potential candidate profiles
              </span>
            </div>
            <p className="text-[11px] text-gray-500 mt-1 m-0">
              Profiles with verified production skills that fail literal keyword regex filters.
            </p>
          </div>
        </div>

        {/* ====================================================== */}
        {/* Right Column: Filtered Shadow Candidates List (7.5)   */}
        {/* ====================================================== */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-gray-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1f5b50] block">
                  Hidden Talent Discovered
                </span>
                <h3 className="text-xl font-serif text-gray-950 font-bold tracking-tight mt-0.5">
                  Capability Outside Literal Shortlist
                </h3>
              </div>
              <span className="text-[10px] font-mono text-gray-500">
                Showing {displayedCandidates.length} Candidates
              </span>
            </div>

            {displayedCandidates.length === 0 ? (
              <div className="p-8 text-center bg-[#fcfbf9] rounded-xl border border-dashed border-gray-200 my-4">
                <SparklesIcon className="w-6 h-6 text-[#1f5b50] mx-auto mb-2" />
                <strong className="text-sm text-gray-950 font-serif block">
                  All Screening Filters Relaxed
                </strong>
                <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto">
                  By relaxing rigid keyword criteria, these candidates now flow directly into the standard review pipeline.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 my-2">
                {displayedCandidates.map((candidate, idx) => {
                  const isReviewed = !!reviewedCandidates[candidate.name]

                  return (
                    <article
                      key={candidate.name}
                      className="py-3.5 flex flex-col sm:flex-row items-start justify-between gap-3 text-xs"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#f4f7f4] border border-[#cbdcd3] text-[#1f5b50] flex items-center justify-center font-serif text-xs font-bold shrink-0 mt-0.5">
                          S{idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-xs text-gray-950 font-bold">
                              {candidate.name}
                            </strong>
                            <span className="text-gray-400">·</span>
                            <span className="text-[11px] text-gray-600">
                              {candidate.current}
                            </span>
                          </div>

                          <h4 className="text-xs font-semibold text-gray-900 mt-0.5 mb-1">
                            {candidate.capability}
                          </h4>

                          <p className="text-[11px] text-gray-600 leading-relaxed m-0">
                            {candidate.why}
                          </p>

                          <div className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-medium bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full">
                            <span>Blocked by:</span>
                            <strong className="font-semibold">
                              {candidate.blockedBy}
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            setReviewedCandidates((prev) => ({
                              ...prev,
                              [candidate.name]: !prev[candidate.name],
                            }))
                          }
                          className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                            isReviewed
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-white border border-gray-200 text-[#1f5b50] hover:bg-[#faf9f6]"
                          }`}
                        >
                          {isReviewed ? "✓ Unblocked" : "Review Evidence"}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>

          {/* Audit Guardrail Footer */}
          <div className="p-3 rounded-xl bg-[#fcfbf9] border border-gray-200 text-[10px] text-gray-500 leading-relaxed">
            <strong className="text-gray-800 font-semibold block mb-0.5">
              Auditing Filter Hygiene:
            </strong>
            Eliminating artificial degree or tenure cutoffs increases qualified candidate pipelines by 35% without lowering technical verification standards.
          </div>
        </div>
      </div>
    </section>
  )
}
