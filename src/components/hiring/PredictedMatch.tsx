import { useState } from "react"
import { hiringCandidates } from "../../data/hiringData"

// ==========================================
// Types
// ==========================================
interface PredictedMatchProps {
  selectedCandidate: number
  onSelectCandidate: (index: number) => void
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

function ChevronDownIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

export default function PredictedMatch({
  selectedCandidate,
  onSelectCandidate,
}: PredictedMatchProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleToggleExpand = (index: number) => {
    onSelectCandidate(index)
    setExpandedIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section
      className="hiring-feature-section bg-transparent"
      id="predicted-success-match"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="hiring-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#1f5b50] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1f5b50] inline-block" />
            01 · Rank for capability
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Predicted-Success Match
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Ranked on verified evidence, production ownership, and transferability—not literal résumé keywords.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4]">
          <SparklesIcon className="w-3 h-3 text-[#1f5b50]" />
          ML Candidate Rankings
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Concept Comparison Banner                             */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5 p-3.5 bg-[#fcfbf9] border border-gray-200 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center font-mono text-xs font-bold text-gray-600 shrink-0">
            KW
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
              Keyword Matching Trap
            </span>
            <strong className="text-xs text-gray-800 font-semibold">
              Literal terms, title match, and buzzword density
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-gray-200 pt-2 md:pt-0 md:pl-4">
          <div className="w-8 h-8 rounded-lg bg-[#e2f0ec] border border-[#a9cec4] flex items-center justify-center font-mono text-xs font-bold text-[#1f5b50] shrink-0">
            AI
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1f5b50] block">
              Predicted Success Signal
            </span>
            <strong className="text-xs text-gray-950 font-semibold">
              Real code artifacts, production ownership, and learning velocity
            </strong>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Candidate Ranking Cards with Expandable Drawers       */}
      {/* ======================================================== */}
      <div className="space-y-3">
        {hiringCandidates.map((candidate, index) => {
          const isSelected = selectedCandidate === index
          const isExpanded = expandedIndex === index

          return (
            <article
              key={candidate.name}
              className={`rounded-2xl transition-all border overflow-hidden ${
                isSelected
                  ? "bg-white border-[#1f5b50] ring-1 ring-[#1f5b50]/20 shadow-xs"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:bg-[#faf9f6]"
              }`}
            >
              {/* Candidate Summary Row */}
              <button
                type="button"
                onClick={() => handleToggleExpand(index)}
                className="w-full text-left p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-[200px]">
                  <span className="font-serif text-sm font-bold text-gray-400 w-5">
                    0{index + 1}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#1f5b50] text-white flex items-center justify-center font-serif text-xs font-bold shrink-0">
                    {candidate.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-gray-950 leading-tight">
                      {candidate.name}
                    </h3>
                    <p className="text-xs text-gray-600 m-0">
                      {candidate.title}
                    </p>
                  </div>
                </div>

                {/* Score Badges */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold block">
                      Keyword Match
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-600">
                      {candidate.keyword}%
                    </span>
                  </div>

                  <div className="text-right pl-3 border-l border-gray-200">
                    <span className="text-[9px] uppercase tracking-wider text-[#1f5b50] font-bold block">
                      Predicted Success
                    </span>
                    <span className="text-sm font-mono font-bold text-[#1f5b50]">
                      {candidate.predicted}%
                    </span>
                  </div>

                  <span
                    className={`hidden sm:inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                      index === 0
                        ? "bg-[#e2f0ec] text-[#1f5b50] border-[#a9cec4]"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {candidate.roleMatch}
                  </span>

                  <ChevronDownIcon
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180 text-[#1f5b50]" : ""
                    }`}
                  />
                </div>
              </button>

              {/* ==================================================== */}
              {/* Expandable Detail Drawer                             */}
              {/* ==================================================== */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-gray-100 bg-[#fcfbf9]">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-2">
                    {/* Left: Verified Skills & Key Strengths (7 cols) */}
                    <div className="md:col-span-7 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                          Verified Skill Signals:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[11px] font-medium bg-white text-gray-800 border border-gray-200 px-2.5 py-0.5 rounded-lg"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1.5">
                          Key Strengths Observed:
                        </span>
                        <div className="space-y-1">
                          {candidate.strengths.map((str) => (
                            <div
                              key={str}
                              className="flex items-center gap-1.5 text-xs text-gray-800"
                            >
                              <CheckIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{str}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Gaps & Verified Project Evidence (5 cols) */}
                    <div className="md:col-span-5 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1.5">
                          Gaps to Probe in Interview:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {candidate.gaps.map((gap) => (
                            <span
                              key={gap}
                              className="text-[10px] font-semibold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md"
                            >
                              {gap}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-gray-200 text-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                          Verified Project Telemetry:
                        </span>
                        <p className="text-gray-700 leading-relaxed m-0 text-[11px]">
                          {candidate.evidence}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-between text-xs">
                    <span className="text-gray-500 text-[11px]">
                      Selected for Interview Panel Evaluation
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectCandidate(index)}
                      className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#1f5b50] text-white"
                          : "bg-white border border-gray-200 text-gray-700 hover:text-gray-950"
                      }`}
                    >
                      {isSelected ? "✓ Active Candidate" : "Select Candidate"}
                    </button>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
