import { useState } from "react"
import { benchSignals } from "../../data/companyData"

// ==========================================
// Types & Extended Data Science Bench Data
// ==========================================
interface BenchSkillNode {
  id: string
  employee: string
  team: string
  skill: string
  freshness: "Fresh" | "Stable" | "Aging" | "At Risk"
  score: number
  lastActivity: string
  marketRelevance: string
  riskLevel: "Low" | "Medium" | "High" | "Critical"
  pos: { left: string; top: string }
  diagnosis: string
  recommendedAction: string
}

const EXTENDED_BENCH_SIGNALS: BenchSkillNode[] = [
  {
    id: "cloud-infra",
    employee: "Engineer A (Staff Infra)",
    team: "Platform Engineering",
    skill: "Cloud Infrastructure",
    freshness: "Aging",
    score: 48,
    lastActivity: "14 months ago · Kubernetes v1.22",
    marketRelevance: "High Current Demand (Kubernetes / Terraform)",
    riskLevel: "High",
    pos: { left: "28%", top: "32%" },
    diagnosis: "Core capability is highly demanded across products, but verified internal deployment activity is stale by >1 year.",
    recommendedAction: "Assign to upcoming ML Platform migration sprint to refresh active telemetry.",
  },
  {
    id: "data-analysis",
    employee: "Engineer B (Senior Analyst)",
    team: "Business Analytics",
    skill: "Vector DBs & Embeddings",
    freshness: "Fresh",
    score: 92,
    lastActivity: "3 weeks ago · Pinecone RAG Pipeline",
    marketRelevance: "Critical Strategic Asset",
    riskLevel: "Low",
    pos: { left: "70%", top: "26%" },
    diagnosis: "Recent production deployment evidence confirms leading-edge skill currency in modern retrieval architectures.",
    recommendedAction: "Anchor candidate as technical mentor for adjacent analytics engineering teams.",
  },
  {
    id: "legacy-java",
    employee: "Engineer C (Applications)",
    team: "Application Engineering",
    skill: "Legacy Batch ETL",
    freshness: "At Risk",
    score: 28,
    lastActivity: "22 months ago · On-Prem Hadoop Cron",
    marketRelevance: "Rapidly Declining / Commoditised",
    riskLevel: "Critical",
    pos: { left: "72%", top: "72%" },
    diagnosis: "Technology stack is being deprecated across business units; candidate requires an adjacent upskilling ramp.",
    recommendedAction: "Enroll in Streaming Data Pipelines (Kafka + Flink) transition pathway.",
  },
  {
    id: "sql-data",
    employee: "Engineer D (Data Platform)",
    team: "Data Platform",
    skill: "ML Serving & Model APIs",
    freshness: "Stable",
    score: 74,
    lastActivity: "4 months ago · FastAPI Model Endpoint",
    marketRelevance: "Stable Production Standard",
    riskLevel: "Medium",
    pos: { left: "30%", top: "68%" },
    diagnosis: "Consistent recent deployment footprint; expanding into asynchronous inference will extend runway.",
    recommendedAction: "Pair with Staff MLOps engineer for low-latency Triton serving pilot.",
  },
]

// ==========================================
// Embedded SVG Icons
// Zero external file dependencies
// ==========================================
function RadarIcon({ className = "w-4 h-4" }: { className?: string }) {
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

function ArrowRightIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

// ==========================================
// Main BenchRadar Component
// ==========================================
export default function BenchRadar() {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0)
  const [filterMode, setFilterMode] = useState<"all" | "at-risk" | "fresh">("all")
  const [actionTriggered, setActionTriggered] = useState<Record<string, boolean>>({})

  const current = EXTENDED_BENCH_SIGNALS[selectedNodeIndex] || EXTENDED_BENCH_SIGNALS[0]

  const handleTriggerAction = (id: string) => {
    setActionTriggered((prev) => ({ ...prev, [id]: true }))
  }

  // Filter nodes if needed
  const visibleNodes = EXTENDED_BENCH_SIGNALS.filter((node) => {
    if (filterMode === "at-risk") return node.freshness === "Aging" || node.freshness === "At Risk"
    if (filterMode === "fresh") return node.freshness === "Fresh" || node.freshness === "Stable"
    return true
  })

  return (
    <section
      className="company-feature-section bg-transparent"
      id="bench-radar"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="company-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#8b5e3c] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8b5e3c] inline-block" />
            01 · See staleness early
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Bench Radar
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Identify internal skill decay across technical teams months before productivity or project quality declines.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#f7f2ed] text-[#8b5e3c] border border-[#d6c4b2]">
          <RadarIcon className="w-3.5 h-3.5 text-[#8b5e3c]" />
          Real-Time Skill Freshness Radar
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Filter Pills                                          */}
      {/* ======================================================== */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 bg-[#fcfbf9] border border-gray-200 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
              filterMode === "all"
                ? "bg-white text-gray-950 shadow-2xs border border-gray-200"
                : "text-gray-600 hover:text-gray-950"
            }`}
          >
            All Skills (4)
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("at-risk")}
            className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
              filterMode === "at-risk"
                ? "bg-white text-amber-800 shadow-2xs border border-gray-200"
                : "text-gray-600 hover:text-gray-950"
            }`}
          >
            Aging / At Risk (2)
          </button>
          <button
            type="button"
            onClick={() => setFilterMode("fresh")}
            className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
              filterMode === "fresh"
                ? "bg-white text-emerald-800 shadow-2xs border border-gray-200"
                : "text-gray-600 hover:text-gray-950"
            }`}
          >
            Fresh & Stable (2)
          </button>
        </div>
        <span className="text-[10px] font-mono text-gray-500">
          Click any skill node to inspect flight telemetry
        </span>
      </div>

      {/* ======================================================== */}
      {/* 3. Main 2-Column Radar Layout                            */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* -------------------------------------------------------- */}
        {/* Left Column: Light Theme Radar Map Canvas (7 cols)       */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-7 bg-[#fcfbf9] border border-gray-200 rounded-2xl relative min-h-[380px] sm:min-h-[440px] p-4 flex items-center justify-center overflow-hidden shadow-2xs">
          {/* Subtle Radar Rings & Axes (Light Theme) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Outer Ring */}
            <div className="w-[340px] sm:w-[390px] h-[340px] sm:h-[390px] rounded-full border border-gray-200/80 flex items-center justify-center">
              {/* Mid Ring */}
              <div className="w-[240px] sm:w-[280px] h-[240px] sm:h-[280px] rounded-full border border-gray-200/70 flex items-center justify-center">
                {/* Inner Ring */}
                <div className="w-[140px] sm:w-[170px] h-[140px] sm:h-[170px] rounded-full border border-gray-200/60 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#8b5e3c]/30" />
                </div>
              </div>
            </div>
            {/* Horizontal & Vertical Crosshair Lines */}
            <div className="absolute w-full h-[1px] bg-gray-200/60" />
            <div className="absolute h-full w-[1px] bg-gray-200/60" />
          </div>

          {/* Zone Labels */}
          <div className="absolute top-3 left-4 text-[9px] font-bold uppercase tracking-wider text-gray-400 pointer-events-none">
            High Relevance Zone
          </div>
          <div className="absolute bottom-3 right-4 text-[9px] font-bold uppercase tracking-wider text-gray-400 pointer-events-none">
            Commoditisation Risk Zone
          </div>

          {/* Radar Skill Nodes */}
          {visibleNodes.map((node) => {
            const actualIndex = EXTENDED_BENCH_SIGNALS.findIndex((n) => n.id === node.id)
            const isSelected = selectedNodeIndex === actualIndex

            const badgeBg =
              node.freshness === "Fresh"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : node.freshness === "Stable"
                  ? "bg-blue-50 text-blue-800 border-blue-200"
                  : node.freshness === "Aging"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-red-50 text-red-700 border-red-200"

            const dotBg =
              node.freshness === "Fresh"
                ? "bg-emerald-500"
                : node.freshness === "Stable"
                  ? "bg-blue-500"
                  : node.freshness === "Aging"
                    ? "bg-amber-500"
                    : "bg-red-500"

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeIndex(actualIndex)}
                style={{ left: node.pos.left, top: node.pos.top }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer max-w-[150px] sm:max-w-[170px] ${
                  isSelected
                    ? "bg-white border-[#8b5e3c] shadow-md ring-2 ring-[#8b5e3c]/20 scale-105 z-10"
                    : "bg-white/95 border-gray-200 hover:border-gray-300 hover:shadow-xs hover:scale-102 z-0"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${dotBg}`} />
                  <span className="text-[10px] font-mono text-gray-500 font-bold truncate">
                    {node.score}% Fresh
                  </span>
                </div>
                <strong className="text-xs font-bold text-gray-950 block truncate leading-tight">
                  {node.skill}
                </strong>
                <span className="text-[10px] text-gray-500 block truncate mt-0.5">
                  {node.team.split(" ")[0]}
                </span>
                <span
                  className={`inline-block mt-1.5 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${badgeBg}`}
                >
                  {node.freshness}
                </span>
              </button>
            )
          })}
        </div>

        {/* -------------------------------------------------------- */}
        {/* Right Column: Skill Freshness Detail Panel (5 cols)      */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-4">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b5e3c]">
                Telemetry Deep Dive
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                  current.freshness === "Fresh"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : current.freshness === "Stable"
                      ? "bg-blue-50 text-blue-800 border-blue-200"
                      : current.freshness === "Aging"
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {current.riskLevel} Attention
              </span>
            </div>

            <h3 className="text-xl font-serif text-gray-950 font-bold tracking-tight">
              {current.skill}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {current.employee} · {current.team}
            </p>

            {/* Score Ring & Freshness Overview */}
            <div className="flex items-center gap-4 my-4 p-3.5 rounded-xl bg-[#fcfbf9] border border-gray-200">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-serif text-xl font-bold"
                  style={{
                    background: `conic-gradient(#8b5e3c ${current.score}%, #e5e7eb 0)`,
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-white flex flex-col items-center justify-center">
                    <span className="text-sm font-bold text-gray-950 leading-none">
                      {current.score}
                    </span>
                    <span className="text-[8px] text-gray-400">/100</span>
                  </div>
                </div>
              </div>

              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-gray-500 block">
                  Capability Currency State
                </span>
                <strong className="text-sm text-gray-950 font-serif block mt-0.5">
                  {current.freshness} Capability
                </strong>
                <span className="text-[11px] text-gray-600 block mt-0.5">
                  {current.marketRelevance}
                </span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start justify-between text-xs py-1.5 border-b border-gray-100">
                <span className="text-gray-500 text-[11px]">Last Verified Production Activity</span>
                <strong className="text-gray-900 font-mono text-[11px] text-right">
                  {current.lastActivity}
                </strong>
              </div>

              <div className="flex items-start justify-between text-xs py-1.5 border-b border-gray-100">
                <span className="text-gray-500 text-[11px]">Market Opportunity Shelf-Life</span>
                <strong className="text-gray-900 text-[11px] text-right">
                  {current.freshness === "At Risk" ? "Under 6 Months" : "18-24 Months Stable"}
                </strong>
              </div>
            </div>

            {/* Diagnosis Box */}
            <div className="mt-4 p-3 rounded-xl bg-[#fcfbf9] border border-gray-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                Capability Diagnosis
              </span>
              <p className="text-xs text-gray-700 leading-relaxed m-0">
                {current.diagnosis}
              </p>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleTriggerAction(current.id)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                actionTriggered[current.id]
                  ? "bg-[#eaf4f1] text-[#1f5b50] border border-[#a9cec4]"
                  : "bg-gray-900 text-white hover:bg-gray-800 shadow-2xs"
              }`}
            >
              {actionTriggered[current.id] ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5" />
                  Upskilling Pathway Activated
                </>
              ) : (
                <>
                  <span>{current.recommendedAction}</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </>
              )}
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-2 m-0">
              Low activity indicates missing project exposure, not lost capability.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
