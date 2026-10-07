import { useState } from "react"
import { mobilityCandidates } from "../../data/companyData"

// ==========================================
// Embedded SVG Icons
// Zero external file dependencies
// ==========================================
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

function ChevronRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

// ==========================================
// Main MobilityPathways Component
// ==========================================
export default function MobilityPathways() {
  const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(0)
  const [planInitiated, setPlanInitiated] = useState<Record<string, boolean>>({})

  const candidate = mobilityCandidates[selectedCandidateIndex] || mobilityCandidates[0]

  const handleInitiatePlan = (name: string) => {
    setPlanInitiated((prev) => ({ ...prev, [name]: true }))
  }

  return (
    <section
      className="company-feature-section bg-transparent"
      id="internal-mobility"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="company-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#8b5e3c] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8b5e3c] inline-block" />
            03 · Search inside first
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Internal Mobility
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Evaluate adjacent engineering talent across departments before committing to costly external recruitment.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#f7f2ed] text-[#8b5e3c] border border-[#d6c4b2]">
          <UsersIcon className="w-3.5 h-3.5 text-[#8b5e3c]" />
          Adjacent Internal Pipeline
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Target Role Banner Context                            */}
      {/* ======================================================== */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-[#fcfbf9] border border-gray-200 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-xs text-[#8b5e3c] shrink-0">
            REQ
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              Active Opening Under Review
            </span>
            <strong className="text-sm font-bold text-gray-950">
              Machine Learning Platform Engineer
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">Core Stack:</span>
          <div className="flex gap-1 flex-wrap">
            {["Python", "Kubernetes", "MLOps", "Reliability"].map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-[11px] font-mono text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Main 2-Column Mobility Workspace                      */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* -------------------------------------------------------- */}
        {/* Left Column: Selectable Candidate List (4.5 cols)        */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1 mb-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
              Adjacent Internal Talent ({mobilityCandidates.length})
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              Ranked by Transition Feasibility
            </span>
          </div>

          {mobilityCandidates.map((c, index) => {
            const isSelected = selectedCandidateIndex === index
            const isDone = !!planInitiated[c.name]

            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedCandidateIndex(index)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? "bg-white border-[#8b5e3c] shadow-sm ring-1 ring-[#8b5e3c]"
                    : "bg-[#fcfbf9] border-gray-200 hover:bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? "bg-[#8b5e3c] text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    M{index + 1}
                  </div>

                  <div className="min-w-0">
                    <strong className="text-xs sm:text-sm font-bold text-gray-950 truncate block">
                      {c.role}
                    </strong>
                    <span className="text-[11px] text-gray-500 truncate block mt-0.5">
                      {c.department}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                      c.match >= 80
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-blue-50 text-blue-800 border-blue-200"
                    }`}
                  >
                    {c.match}% Match
                  </span>
                  <ChevronRightIcon
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "text-[#8b5e3c] translate-x-0.5" : "text-gray-300"
                    }`}
                  />
                </div>
              </button>
            )
          })}
        </div>

        {/* -------------------------------------------------------- */}
        {/* Right Column: Dynamic Pathway Breakdown (7.5 cols)       */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-5">
          <div>
            {/* Candidate Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b5e3c] block">
                  Transition Feasibility Pathway
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-gray-950 font-bold tracking-tight mt-0.5">
                  {candidate.role} → {candidate.target}
                </h3>
                <span className="text-xs text-gray-500 block">
                  Current: {candidate.department}
                </span>
              </div>

              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-gray-950 block">
                  {candidate.match}%
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  Capability Match
                </span>
              </div>
            </div>

            {/* 3-Step Visual Transition Pathway */}
            <div className="my-4 p-3.5 rounded-xl bg-[#fcfbf9] border border-gray-200">
              <span className="text-[10px] uppercase font-bold text-gray-500 block mb-2.5">
                Ramp Progression Blueprint
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-stretch">
                {/* Step 1 */}
                <div className="p-2.5 rounded-lg bg-white border border-gray-200 text-left">
                  <span className="text-[9px] uppercase font-bold text-gray-400 block">
                    Step 01 · Baseline
                  </span>
                  <strong className="text-xs font-bold text-gray-950 block mt-0.5 truncate">
                    {candidate.role}
                  </strong>
                  <span className="text-[10px] text-gray-500 block mt-0.5">
                    Verified Production Base
                  </span>
                </div>

                {/* Step 2 */}
                <div className="p-2.5 rounded-lg bg-[#f7f2ed] border border-[#d6c4b2] text-left">
                  <span className="text-[9px] uppercase font-bold text-[#8b5e3c] block">
                    Step 02 · 6-Wk Sprint
                  </span>
                  <strong className="text-xs font-bold text-gray-950 block mt-0.5 truncate">
                    +{candidate.gap.join(", ")}
                  </strong>
                  <span className="text-[10px] text-gray-600 block mt-0.5">
                    Targeted Upskilling Ramp
                  </span>
                </div>

                {/* Step 3 */}
                <div className="p-2.5 rounded-lg bg-white border border-gray-200 text-left">
                  <span className="text-[9px] uppercase font-bold text-gray-400 block">
                    Step 03 · Destination
                  </span>
                  <strong className="text-xs font-bold text-gray-950 block mt-0.5 truncate">
                    {candidate.target}
                  </strong>
                  <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                    Full Autonomy Achieved
                  </span>
                </div>
              </div>
            </div>

            {/* Skill Comparison Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
              {/* Transferable Skills */}
              <div className="p-3.5 rounded-xl bg-[#fcfbf9] border border-gray-200">
                <span className="text-[11px] font-bold text-[#1f5b50] flex items-center gap-1.5 mb-2">
                  <CheckIcon className="w-3.5 h-3.5" />
                  Already Covered ({candidate.transfer.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.transfer.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full bg-[#eaf4f1] text-[#1f5b50] border border-[#b2d8ce] text-[11px] font-medium"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Remaining Gap */}
              <div className="p-3.5 rounded-xl bg-[#fcfbf9] border border-gray-200">
                <span className="text-[11px] font-bold text-[#8b5e3c] flex items-center gap-1.5 mb-2">
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                  Bridge Requirement ({candidate.gap.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.gap.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full bg-[#f7f2ed] text-[#8b5e3c] border border-[#d6c4b2] text-[11px] font-medium"
                    >
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Why Credible Note */}
            <div className="p-3 rounded-xl bg-[#fcfbf9] border border-gray-200 text-xs text-gray-700">
              <strong className="text-gray-950 block mb-0.5 font-bold">
                Why this mobility move is credible:
              </strong>
              {candidate.why}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => handleInitiatePlan(candidate.name)}
              className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                planInitiated[candidate.name]
                  ? "bg-[#eaf4f1] text-[#1f5b50] border border-[#a9cec4]"
                  : "bg-gray-900 text-white hover:bg-gray-800 shadow-2xs"
              }`}
            >
              {planInitiated[candidate.name] ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5" />
                  Mobility Pathway Activated · HR Notified
                </>
              ) : (
                <>
                  <span>Initiate Transition Pathway</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <span className="text-[11px] text-gray-400">
              Estimated ramp: 6-8 weeks with zero recruitment fee
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
