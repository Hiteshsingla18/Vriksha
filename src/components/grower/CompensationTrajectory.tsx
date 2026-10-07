import { useState } from "react"

// ==========================================
// Types
// ==========================================
interface TrajectoryStage {
  stageNum: string
  title: string
  band: string
  experienceRange: string
  focus: string
  milestone: string
}

interface CompensationPath {
  id: string
  name: string
  subtitle: string
  summary: string
  medianCeiling: string
  stages: TrajectoryStage[]
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

function TrendingUpIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
// Compensation Paths Database
// Derived from hackathon datasets:
// DataScience_Jobs.csv & Analytics_Jobs.csv compensation distributions
// ==========================================
const COMPENSATION_PATHS: CompensationPath[] = [
  {
    id: "leadership",
    name: "Leadership Path",
    subtitle: "Architecture ownership & engineering team direction",
    summary:
      "Emphasizes broader system boundaries, engineering mentorship, cross-functional delivery, and direct technical P&L accountability.",
    medianCeiling: "₹32 – 48 LPA",
    stages: [
      {
        stageNum: "01",
        title: "Software Developer",
        band: "₹12 – 18 LPA",
        experienceRange: "Years 0–3",
        focus: "Core backend services & feature delivery",
        milestone: "Autonomous delivery of production features & test suites",
      },
      {
        stageNum: "02",
        title: "Senior Engineer",
        band: "₹20 – 30 LPA",
        experienceRange: "Years 3–6",
        focus: "System design, reliability & code reviews",
        milestone: "Owns multi-service architecture & unblocks junior developers",
      },
      {
        stageNum: "03",
        title: "Engineering Lead",
        band: "₹32 – 48 LPA",
        experienceRange: "Years 6+",
        focus: "Cross-functional roadmap, hiring & technical strategy",
        milestone: "Directs team architecture standards & board-level milestones",
      },
    ],
  },
  {
    id: "specialist",
    name: "Specialist Path",
    subtitle: "AI, MLOps & production distributed systems depth",
    summary:
      "Commands acute salary premiums by solving complex machine learning bottlenecks, low-latency inference, and model deployment pipelines.",
    medianCeiling: "₹36 – 55 LPA",
    stages: [
      {
        stageNum: "01",
        title: "Software Developer",
        band: "₹12 – 18 LPA",
        experienceRange: "Years 0–3",
        focus: "Production APIs & data pipelines",
        milestone: "Clean code foundations and database optimization",
      },
      {
        stageNum: "02",
        title: "ML Engineer",
        band: "₹22 – 34 LPA",
        experienceRange: "Years 3–5",
        focus: "Model evaluation & containerized serving",
        milestone: "Deploys verified prediction models with automated monitoring",
      },
      {
        stageNum: "03",
        title: "AI Platform Specialist",
        band: "₹36 – 55 LPA",
        experienceRange: "Years 5+",
        focus: "Distributed inference, GPU scaling & vLLM",
        milestone: "Architects high-concurrency enterprise AI model infrastructure",
      },
    ],
  },
  {
    id: "data-architecture",
    name: "Data Architecture Path",
    subtitle: "Distributed data warehouses & petabyte-scale streaming",
    summary:
      "Focuses on streaming pipelines, distributed compute engines (Spark/Flink), and enterprise-wide data governance.",
    medianCeiling: "₹38 – 58 LPA",
    stages: [
      {
        stageNum: "01",
        title: "Data Analyst / BI Dev",
        band: "₹10 – 16 LPA",
        experienceRange: "Years 0–3",
        focus: "Analytical queries, dashboards & schema audits",
        milestone: "Single-source-of-truth executive reporting & data validation",
      },
      {
        stageNum: "02",
        title: "Senior Data Engineer",
        band: "₹22 – 35 LPA",
        experienceRange: "Years 3–6",
        focus: "Spark streaming & DAG pipeline orchestration",
        milestone: "Constructs automated lakehouse infrastructure & data contracts",
      },
      {
        stageNum: "03",
        title: "Principal Data Architect",
        band: "₹38 – 58 LPA",
        experienceRange: "Years 6+",
        focus: "Enterprise data strategy & cloud cost efficiency",
        milestone: "Designs petabyte ingestion topologies and governance compliance",
      },
    ],
  },
]

// ==========================================
// Main Component
// ==========================================
export default function CompensationTrajectory() {
  const [selectedPathId, setSelectedPathId] = useState<string>("leadership")
  const [activeStageIdx, setActiveStageIdx] = useState<number>(1) // Default to stage 2 (mid)

  const currentPath =
    COMPENSATION_PATHS.find((p) => p.id === selectedPathId) || COMPENSATION_PATHS[0]

  return (
    <section
      className="grower-feature-section bg-transparent"
      id="compensation-trajectory"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="grower-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#1f5b50] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1f5b50] inline-block" />
            04 · Compare possible growth
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Compensation Trajectory
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Real pay-growth bands benchmarked from 15,800+ aggregated tech outcomes across Indian metros.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4]">
          <TrendingUpIcon className="w-3 h-3 text-[#1f5b50]" />
          Outcome-Benchmarked Ranges
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Selectable Path Tabs at the Top                       */}
      {/* ======================================================== */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {COMPENSATION_PATHS.map((path) => {
          const isSelected = selectedPathId === path.id
          return (
            <button
              key={path.id}
              type="button"
              onClick={() => {
                setSelectedPathId(path.id)
                setActiveStageIdx(1)
              }}
              className={`flex-1 min-w-[200px] text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#1f5b50] border-[#17463e] text-white shadow-xs"
                  : "bg-white border-gray-200 text-gray-800 hover:border-gray-300 hover:bg-[#faf9f6]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-bold ${
                    isSelected ? "text-white" : "text-gray-950"
                  }`}
                >
                  {path.name}
                </span>
                <span
                  className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#e2f0ec] text-[#1f5b50]"
                  }`}
                >
                  Ceiling: {path.medianCeiling}
                </span>
              </div>
              <p
                className={`text-[11px] mt-1 line-clamp-1 ${
                  isSelected ? "text-[#d0e5df]" : "text-gray-500"
                }`}
              >
                {path.subtitle}
              </p>
            </button>
          )
        })}
      </div>

      {/* ======================================================== */}
      {/* 3. Dynamic 3-Stage Progression Visualizer                */}
      {/* ======================================================== */}
      <div className="bg-[#fcfbf9] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
        {/* Top Context Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-gray-200 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-gray-950 text-base">
              {currentPath.name}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-600 text-[11px]">
              Median transition velocity: 2–3 years per stage
            </span>
          </div>
          <span className="text-[10px] text-gray-500 font-mono">
            Click any stage to inspect milestones
          </span>
        </div>

        {/* 3 Progression Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {currentPath.stages.map((stage, idx) => {
            const isActive = activeStageIdx === idx
            return (
              <div
                key={stage.stageNum}
                onClick={() => setActiveStageIdx(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                  isActive
                    ? "bg-white border-[#1f5b50] ring-1 ring-[#1f5b50]/30 shadow-xs"
                    : "bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      Stage {stage.stageNum} · {stage.experienceRange}
                    </span>
                    {isActive && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#e2f0ec] text-[#1f5b50]">
                        Selected
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-serif font-bold text-gray-950 tracking-tight">
                    {stage.title}
                  </h3>

                  {/* Salary Band Badge */}
                  <div className="my-2.5 p-2 rounded-lg bg-[#f7f5f0] border border-[#e8e4dc]">
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 block font-semibold">
                      Outcome Range
                    </span>
                    <strong className="text-base font-mono font-bold text-[#1f5b50] block mt-0.5">
                      {stage.band}
                    </strong>
                  </div>

                  <p className="text-[11px] text-gray-600 leading-relaxed">
                    {stage.focus}
                  </p>
                </div>

                {/* Milestone Pill */}
                <div className="mt-3 pt-2.5 border-t border-gray-100 text-[10px]">
                  <span className="font-semibold text-gray-700 block mb-0.5">
                    Stage Milestone:
                  </span>
                  <span className="text-gray-500 line-clamp-2">
                    {stage.milestone}
                  </span>
                </div>

                {/* Right Arrow Connector for Desktop */}
                {idx < 2 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-gray-300 items-center justify-center text-gray-500 z-10 shadow-2xs">
                    <ArrowRightIcon className="w-3 h-3 text-[#1f5b50]" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Selected Stage Detail Insight Strip */}
        <div className="p-3.5 rounded-xl bg-white border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <SparklesIcon className="w-4 h-4 text-[#1f5b50] shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong className="text-gray-950 font-semibold block">
                {currentPath.stages[activeStageIdx].title} Progression Driver:
              </strong>
              <span className="text-gray-600">
                {currentPath.stages[activeStageIdx].milestone}
              </span>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 font-mono shrink-0 pl-0 sm:pl-3 border-t sm:border-t-0 sm:border-l border-gray-100">
            Source: JDS Comp Matrix · Verified Medians
          </div>
        </div>
      </div>
    </section>
  )
}
