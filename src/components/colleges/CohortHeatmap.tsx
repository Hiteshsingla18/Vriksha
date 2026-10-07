import { useState, useMemo } from "react"

// ==========================================
// Types
// ==========================================
interface CellInsight {
  segment: string
  skill: string
  score: number
  tier: "strong" | "steady" | "watch" | "risk"
  gapSummary: string
  rootCause: string
  recommendedIntervention: string
  impactCohortSize: string
  estimatedTimeToBridge: string
}

interface SegmentData {
  segment: string
  specialization: "Computer Science" | "Data Science" | "Electronics" | "Cross-Disciplinary"
  scores: Record<string, number> // map of skill name -> score (0-100)
}

// ==========================================
// Skill Pillars
// ==========================================
const SKILL_PILLARS = [
  { id: "maths", label: "Maths / Stats", category: "Technical" },
  { id: "python", label: "Python / Dev", category: "Technical" },
  { id: "cloud", label: "Cloud Systems", category: "Technical" },
  { id: "aiml", label: "AI / ML", category: "Technical" },
  { id: "comm", label: "Communication", category: "Professional" },
]

// ==========================================
// Mock Dataset Matrix by Cohort & Year
// ==========================================
const BASE_SEGMENTS: SegmentData[] = [
  {
    segment: "Computer Science · Urban",
    specialization: "Computer Science",
    scores: {
      "Maths / Stats": 82,
      "Python / Dev": 88,
      "Cloud Systems": 74,
      "AI / ML": 71,
      "Communication": 76,
    },
  },
  {
    segment: "Computer Science · Regional",
    specialization: "Computer Science",
    scores: {
      "Maths / Stats": 74,
      "Python / Dev": 72,
      "Cloud Systems": 56,
      "AI / ML": 49,
      "Communication": 62,
    },
  },
  {
    segment: "Data Science · Urban",
    specialization: "Data Science",
    scores: {
      "Maths / Stats": 86,
      "Python / Dev": 81,
      "Cloud Systems": 70,
      "AI / ML": 68,
      "Communication": 73,
    },
  },
  {
    segment: "Data Science · First-gen",
    specialization: "Data Science",
    scores: {
      "Maths / Stats": 68,
      "Python / Dev": 64,
      "Cloud Systems": 47,
      "AI / ML": 42,
      "Communication": 55,
    },
  },
  {
    segment: "Electronics · Career switchers",
    specialization: "Electronics",
    scores: {
      "Maths / Stats": 71,
      "Python / Dev": 63,
      "Cloud Systems": 52,
      "AI / ML": 45,
      "Communication": 60,
    },
  },
  {
    segment: "AI/ML · Scholar Scheme",
    specialization: "Cross-Disciplinary",
    scores: {
      "Maths / Stats": 79,
      "Python / Dev": 76,
      "Cloud Systems": 65,
      "AI / ML": 58,
      "Communication": 68,
    },
  },
]

// ==========================================
// Cell Detail Insight Generator
// ==========================================
function getCellInsight(segment: string, skill: string, score: number): CellInsight {
  const tier: CellInsight["tier"] =
    score >= 75 ? "strong" : score >= 60 ? "steady" : score >= 50 ? "watch" : "risk"

  // Contextual gaps and interventions based on skill pillar
  switch (skill) {
    case "Cloud Systems":
      return {
        segment,
        skill,
        score,
        tier,
        gapSummary:
          tier === "risk"
            ? "Critical latency in Dockerization, Kubernetes manifests, and cloud infrastructure telemetry."
            : "Moderate friction with cloud cost budgeting and distributed microservice deployments.",
        rootCause:
          "Lack of individualized cloud sandbox credits; students rely solely on local localhost execution without hands-on AWS/Azure exposure.",
        recommendedIntervention:
          "Grant $100 student cloud compute vouchers; integrate 3-week Swiggy MLOps guest faculty clinic on production deployments.",
        impactCohortSize: "68 students in segment",
        estimatedTimeToBridge: "4–6 weeks",
      }
    case "AI / ML":
      return {
        segment,
        skill,
        score,
        tier,
        gapSummary:
          tier === "risk"
            ? "Severe deficiency in model serving, PyTorch inference optimization, and LLM fine-tuning."
            : "Adequate classical ML foundations but lags in modern transformer architectures and RAG pipelines.",
        rootCause:
          "Coursework over-emphasizes scikit-learn toy datasets; zero exposure to GPU-accelerated training or real-world inference bounds.",
        recommendedIntervention:
          "Embed 4 hands-on Google AI Studio micro-projects with automated AST code verification into the semester curriculum.",
        impactCohortSize: "84 students in segment",
        estimatedTimeToBridge: "6 weeks",
      }
    case "Maths / Stats":
      return {
        segment,
        skill,
        score,
        tier,
        gapSummary:
          tier === "risk"
            ? "Difficulty translating calculus and linear algebra into loss function optimization."
            : "Solid computational arithmetic but struggles with Bayesian inference and multivariate distributions.",
        rootCause:
          "Pure theory taught by general mathematics faculty detached from computer science applications.",
        recommendedIntervention:
          "Host weekend 'Math for Machine Learning' workshops led by quantitative finance practitioners.",
        impactCohortSize: "52 students in segment",
        estimatedTimeToBridge: "3 weeks",
      }
    case "Python / Dev":
      return {
        segment,
        skill,
        score,
        tier,
        gapSummary:
          tier === "risk"
            ? "Struggles with clean code paradigms, object-oriented design, and Git version control workflows."
            : "Good procedural scripting skills but needs practice with unit testing (pytest) and typing.",
        rootCause:
          "Single-file homework submissions without team pull requests, code reviews, or continuous integration pipelines.",
        recommendedIntervention:
          "Mandate GitHub classroom repositories with automated linter checks and pre-commit hooks for all labs.",
        impactCohortSize: "40 students in segment",
        estimatedTimeToBridge: "2–3 weeks",
      }
    case "Communication":
    default:
      return {
        segment,
        skill,
        score,
        tier,
        gapSummary:
          tier === "risk"
            ? "High anxiety and hesitation during technical explanation and architectural design defenses."
            : "Clear written technical reports but needs refinement in live stakeholder presentations.",
        rootCause:
          "Absence of structured mock defense interviews; exams test rote memorization rather than design trade-offs.",
        recommendedIntervention:
          "Introduce bi-weekly 5-minute peer code defense walkthroughs and industry capstone jury reviews.",
        impactCohortSize: "75 students in segment",
        estimatedTimeToBridge: "4 weeks",
      }
  }
}

// ==========================================
// Clean Inline SVG Icons
// ==========================================
function FilterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  )
}

function AlertTriangleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}

function CheckCircleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
}

function SparklesIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}

// ==========================================
// Main CohortHeatmap Component
// ==========================================
export default function CohortHeatmap() {
  // 1. Interactive Dropdown Filter States
  const [cohort, setCohort] = useState<string>("2026 cohort")
  const [specialisation, setSpecialisation] = useState<string>("All specialisations")
  const [year, setYear] = useState<string>("Year 3")
  const [skillArea, setSkillArea] = useState<string>("All skill areas")

  // 2. Selected Cell for Real-time Inspection (default to critical gap)
  const [selectedCellTarget, setSelectedCellTarget] = useState<{
    segment: string
    skill: string
  }>({
    segment: "Data Science · First-gen",
    skill: "Cloud Systems",
  })

  // 3. Action State for Clinic Scheduling
  const [clinicScheduled, setClinicScheduled] = useState<boolean>(false)

  // Dynamic score adjustment factor based on Cohort and Year
  const scoreOffset = useMemo(() => {
    let offset = 0
    if (cohort === "2027 cohort") offset -= 5 // Younger batch
    if (cohort === "2025 cohort") offset += 6 // Graduating batch
    if (year === "Year 2") offset -= 4
    if (year === "Year 4") offset += 5
    return offset
  }, [cohort, year])

  // Filter Active Skill Pillars
  const visiblePillars = useMemo(() => {
    if (skillArea === "All skill areas") return SKILL_PILLARS
    return SKILL_PILLARS.filter((p) => p.category === skillArea)
  }, [skillArea])

  // Filter Active Student Segments
  const visibleSegments = useMemo(() => {
    let list = BASE_SEGMENTS
    if (specialisation !== "All specialisations") {
      list = list.filter((s) => s.specialization === specialisation)
    }
    return list.map((seg) => ({
      ...seg,
      calculatedScores: Object.fromEntries(
        Object.entries(seg.scores).map(([k, v]) => [
          k,
          Math.min(99, Math.max(30, v + scoreOffset)),
        ])
      ),
    }))
  }, [specialisation, scoreOffset])

  // Active Selected Cell Data
  const activeInsight = useMemo(() => {
    const targetSegment =
      visibleSegments.find((s) => s.segment === selectedCellTarget.segment) ||
      visibleSegments[0] ||
      BASE_SEGMENTS[3]

    const targetScore =
      targetSegment?.calculatedScores?.[selectedCellTarget.skill] ??
      targetSegment?.scores?.[selectedCellTarget.skill] ??
      47

    return getCellInsight(targetSegment.segment, selectedCellTarget.skill, targetScore)
  }, [visibleSegments, selectedCellTarget])

  return (
    <section
      id="cohort-heat-map"
      className="colleges-feature-section border-b border-[#e8e4dc] py-12"
      style={{ scrollMarginTop: "135px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Label                                */}
      {/* ======================================================== */}
      <div className="colleges-section-heading mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#7e689b] uppercase mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7e689b] inline-block" />
            05 · Find Who Needs Attention
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Cohort Heat-Map
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Identify which student demographic segments are falling behind across specific technical pillars, not just course averages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-[#7e689b] border border-[#d8d0e3] bg-[#f9f7fc]">
            <SparklesIcon className="w-3 h-3 text-[#7e689b]" />
            Live Segment Matrix
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Interactive Dropdown Filters                           */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 mb-6 rounded-xl bg-[#fcfbf9] border border-[#e8e4dc] shadow-xs">
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1">
            <FilterIcon className="w-3 h-3 text-[#7e689b]" />
            Cohort
          </span>
          <select
            value={cohort}
            onChange={(e) => {
              setCohort(e.target.value)
              setClinicScheduled(false)
            }}
            className="h-9 px-2.5 rounded-lg border border-[#dcded5] bg-white text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7e689b]/40 cursor-pointer"
          >
            <option>2026 cohort</option>
            <option>2027 cohort</option>
            <option>2025 cohort</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Specialisation
          </span>
          <select
            value={specialisation}
            onChange={(e) => {
              setSpecialisation(e.target.value)
              setClinicScheduled(false)
            }}
            className="h-9 px-2.5 rounded-lg border border-[#dcded5] bg-white text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7e689b]/40 cursor-pointer"
          >
            <option>All specialisations</option>
            <option>Computer Science</option>
            <option>Data Science</option>
            <option>Electronics</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Academic Year
          </span>
          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value)
              setClinicScheduled(false)
            }}
            className="h-9 px-2.5 rounded-lg border border-[#dcded5] bg-white text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7e689b]/40 cursor-pointer"
          >
            <option>Year 3</option>
            <option>Year 2</option>
            <option>Year 4</option>
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Skill Area Filter
          </span>
          <select
            value={skillArea}
            onChange={(e) => {
              setSkillArea(e.target.value)
              setClinicScheduled(false)
            }}
            className="h-9 px-2.5 rounded-lg border border-[#dcded5] bg-white text-xs font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7e689b]/40 cursor-pointer"
          >
            <option>All skill areas</option>
            <option>Technical</option>
            <option>Professional</option>
          </select>
        </label>
      </div>

      {/* ======================================================== */}
      {/* 3. Heatmap Grid + Inspection Panel                       */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side (8 cols): Structured Heatmap Grid */}
        <div className="lg:col-span-8 bg-[#fcfbf9] border border-[#e8e4dc] rounded-2xl p-4 sm:p-5 shadow-xs overflow-hidden">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold text-gray-900 flex items-center gap-1.5">
              <span>Competency Heatmap Matrix</span>
              <span className="text-[10px] font-normal text-gray-500">
                ({visibleSegments.length} student segments mapped)
              </span>
            </span>
            <span className="text-[10px] text-gray-500 hidden sm:inline">
              Click any cell to inspect competency gap
            </span>
          </div>

          <div className="overflow-x-auto">
            <div
              className="grid gap-1.5 min-w-[620px]"
              style={{
                gridTemplateColumns: `190px repeat(${visiblePillars.length}, minmax(0, 1fr))`,
              }}
            >
              {/* Header Corner */}
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 p-2.5 bg-[#f4f2ee] rounded-lg">
                Student Segment
              </div>

              {/* Column Headers */}
              {visiblePillars.map((col) => (
                <div
                  key={col.id}
                  className="text-[10px] font-bold uppercase tracking-wider text-center text-gray-700 p-2.5 bg-[#f4f2ee] rounded-lg"
                >
                  {col.label}
                </div>
              ))}

              {/* Data Rows */}
              {visibleSegments.map((row) => (
                <div key={row.segment} className="contents">
                  {/* Row Label */}
                  <div className="text-xs font-semibold text-gray-900 p-2.5 bg-white border border-[#e8e4dc] rounded-lg flex items-center truncate">
                    {row.segment}
                  </div>

                  {/* Heatmap Cells */}
                  {visiblePillars.map((pillar) => {
                    const val = row.calculatedScores[pillar.label] ?? 60
                    const isSelected =
                      selectedCellTarget.segment === row.segment &&
                      selectedCellTarget.skill === pillar.label

                    // Color tones matching Vriksha's purple-to-amber palette
                    let cellBg = "bg-[#7e689b] text-white" // strong
                    if (val < 50) {
                      cellBg = "bg-[#fbe8d3] text-[#9a3412] hover:bg-[#f6d2b5]" // risk (warm amber)
                    } else if (val < 60) {
                      cellBg = "bg-[#eee6f5] text-[#3d2b56] hover:bg-[#e4d7ee]" // watch (muted lavender)
                    } else if (val < 75) {
                      cellBg = "bg-[#c8badc] text-[#241a33] hover:bg-[#bcacd4]" // steady (soft purple)
                    } else {
                      cellBg = "bg-[#7e689b] text-white hover:bg-[#6e588b]" // strong (deep purple)
                    }

                    return (
                      <button
                        type="button"
                        key={`${row.segment}-${pillar.id}`}
                        onClick={() => {
                          setSelectedCellTarget({
                            segment: row.segment,
                            skill: pillar.label,
                          })
                          setClinicScheduled(false)
                        }}
                        className={`h-11 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer flex flex-col items-center justify-center relative ${cellBg} ${
                          isSelected
                            ? "ring-2 ring-[#7e689b] ring-offset-2 scale-[1.04] shadow-md z-10"
                            : "hover:scale-[1.02]"
                        }`}
                        title={`${row.segment} • ${pillar.label}: ${val}%`}
                      >
                        <span className="leading-none">{val}%</span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Legend */}
          <div className="mt-4 pt-3.5 border-t border-[#e8e4dc] flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
            <span className="text-[11px] font-medium text-gray-500">
              Alignment Legend:
            </span>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <i className="w-3.5 h-3.5 rounded bg-[#7e689b] inline-block" />
                <span className="font-medium text-gray-700">Strong (≥75%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <i className="w-3.5 h-3.5 rounded bg-[#c8badc] inline-block" />
                <span className="font-medium text-gray-700">Steady (60–74%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <i className="w-3.5 h-3.5 rounded bg-[#eee6f5] inline-block" />
                <span className="font-medium text-gray-700">Watch (50–59%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <i className="w-3.5 h-3.5 rounded bg-[#fbe8d3] border border-[#f6d2b5] inline-block" />
                <span className="font-medium text-[#9a3412]">Needs Attention (&lt;50%)</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Side (4 cols): Dynamic Inspection & Action Panel */}
        <aside className="lg:col-span-4 bg-[#fcfbf9] border border-[#e8e4dc] rounded-2xl p-5 shadow-xs flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7e689b] flex items-center gap-1">
                <AlertTriangleIcon className="w-3.5 h-3.5 text-[#9a3412]" />
                Segment Deep-Dive
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeInsight.tier === "risk"
                    ? "bg-[#fbe8d3] text-[#9a3412]"
                    : activeInsight.tier === "watch"
                    ? "bg-[#eee6f5] text-[#3d2b56]"
                    : "bg-[#e2daf0] text-[#241a33]"
                }`}
              >
                {activeInsight.score}% • {activeInsight.tier === "risk" ? "Needs Attention" : activeInsight.tier.toUpperCase()}
              </span>
            </div>

            <h3 className="text-base font-serif font-bold text-gray-950 leading-snug">
              {activeInsight.segment}
            </h3>
            <span className="text-[11px] font-mono text-gray-600 block mt-0.5">
              Inspecting Pillar: <strong className="text-gray-900">{activeInsight.skill}</strong>
            </span>
          </div>

          {/* Targeted Competency Deficit */}
          <div className="p-3 rounded-xl bg-white border border-[#e8e4dc] text-xs">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              Observed Competency Gap
            </span>
            <p className="text-gray-800 leading-relaxed font-medium">
              {activeInsight.gapSummary}
            </p>
          </div>

          {/* Root Cause Diagnosis */}
          <div className="p-3 rounded-xl bg-white border border-[#e8e4dc] text-xs">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-gray-500 mb-1">
              Root Cause Telemetry
            </span>
            <p className="text-gray-600 leading-relaxed">
              {activeInsight.rootCause}
            </p>
          </div>

          {/* Recommended Intervention */}
          <div className="p-3.5 rounded-xl bg-[#f9f7fc] border border-[#d8d0e3] text-xs">
            <div className="flex items-center gap-1.5 mb-1 text-[#7e689b]">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Prescribed Academic Action
              </span>
            </div>
            <p className="text-gray-800 font-medium leading-relaxed">
              {activeInsight.recommendedIntervention}
            </p>

            <div className="mt-2.5 pt-2 border-t border-[#e2daf0] flex items-center justify-between text-[10px] text-gray-500">
              <span>Impact: <strong>{activeInsight.impactCohortSize}</strong></span>
              <span>Estimated Duration: <strong>{activeInsight.estimatedTimeToBridge}</strong></span>
            </div>
          </div>

          {/* Interactive Scheduling Button */}
          {clinicScheduled ? (
            <div className="p-3 rounded-xl bg-[#edf7ee] border border-[#b2dfb6] text-xs text-[#206a28] font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-[#206a28]" />
                Remedial Workshop Scheduled!
              </span>
              <button
                type="button"
                onClick={() => setClinicScheduled(false)}
                className="text-[10px] underline hover:text-black cursor-pointer"
              >
                Reset
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setClinicScheduled(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#7e689b] hover:bg-[#6c5689] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Schedule Targeted Bridge Clinic</span>
            </button>
          )}
        </aside>
      </div>
    </section>
  )
}
