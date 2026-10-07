import { useState } from "react"

// ==========================================
// Types
// ==========================================
interface SkillCombo {
  id: string
  name: string
  runway: string
  statusTag: string
  statusTone: "danger" | "stable" | "surge" | "scarcity"
  summary: string
  bridgeAction: string
  durabilityScore: number
  points: number[] // Now, Year 1, Year 2, Year 3, Year 4
}

// ==========================================
// Minimal Embedded SVG Icons
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
// Concise Skill Half-Life Dataset
// Derived from hackathon datasets: JDS Competencies & Tech Runway Telemetry
// ==========================================
const COMBOS: SkillCombo[] = [
  {
    id: "python-sql-reporting",
    name: "Python + SQL + Basic Reporting",
    runway: "18–24 mo runway",
    statusTag: "Commoditising",
    statusTone: "danger",
    summary: "Routine querying faces rapid automation; predictive depth extends runway.",
    bridgeAction: "Layer in MLOps pipelines or causal econometrics within 12 months.",
    durabilityScore: 52,
    points: [88, 82, 70, 56, 43],
  },
  {
    id: "backend-cloud-architecture",
    name: "Backend + Cloud + System Design",
    runway: "36–48 mo runway",
    statusTag: "Durable Core",
    statusTone: "stable",
    summary: "Architecture ownership and system reliability stay resilient against syntax automation.",
    bridgeAction: "Incorporate distributed ML serving (vLLM / Triton) for AI salary premiums.",
    durabilityScore: 82,
    points: [90, 88, 84, 78, 70],
  },
  {
    id: "python-mlops-models",
    name: "Python + MLOps + Model Systems",
    runway: "48+ mo runway",
    statusTag: "Surging (+48%)",
    statusTone: "surge",
    summary: "Acute talent shortage as organizations deploy models into production infrastructure.",
    bridgeAction: "Master GPU cluster orchestration with Ray and Slurm.",
    durabilityScore: 94,
    points: [65, 74, 82, 89, 94],
  },
  {
    id: "pytorch-llm-tuning",
    name: "PyTorch + LLM Tuning + Evals",
    runway: "42–50 mo runway",
    statusTag: "High Scarcity",
    statusTone: "scarcity",
    summary: "Frontier parameter tuning and evaluation benchmarks command top retention.",
    bridgeAction: "Specialize in stateful agent routing and speculative decoding.",
    durabilityScore: 91,
    points: [74, 83, 89, 93, 96],
  },
]

// ==========================================
// Helpers for Color Zones
// ==========================================
function getZoneDetails(value: number) {
  if (value >= 75) {
    return {
      label: "Strong",
      textClass: "text-[#b7db43]",
      barGradient: "from-[#b7db43] to-[#1f4e3b]",
    }
  }
  if (value >= 55) {
    return {
      label: "Stable",
      textClass: "text-[#7ec29e]",
      barGradient: "from-[#7ec29e] to-[#163c2e]",
    }
  }
  return {
    label: "At Risk",
    textClass: "text-[#f5a76c]",
    barGradient: "from-[#e09f53] to-[#3a2618]",
  }
}

// ==========================================
// Main Component
// ==========================================
export default function SkillHalfLife() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)
  const current = COMBOS[selectedIdx]
  const years = ["Now", "Year 1", "Year 2", "Year 3", "Year 4"]

  return (
    <section
      className="grower-feature-section half-life-section"
      id="skill-half-life"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header                                                */}
      {/* ======================================================== */}
      <div className="grower-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#b7db43] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#b7db43] inline-block" />
            02 · Understand your runway
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Skill Half-Life
          </h2>
          <p className="text-xs sm:text-sm text-[#b4cfc4] mt-1 max-w-xl">
            Calculated runway before common Data Science & Engineering skill combinations commoditise.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#20503d] text-[#b7db43] border border-[#b7db43]/30">
          <ClockIcon className="w-3 h-3 text-[#b7db43]" />
          4-Year Scenario Model
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Interactive Workspace (Clean Flexbox / Grid Layout)    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ====================================================== */}
        {/* Left Panel: 4 Minimal Skill Combo Cards                */}
        {/* Using explicit custom flex layout to prevent grid bugs  */}
        {/* ====================================================== */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          {COMBOS.map((combo, idx) => {
            const isSelected = selectedIdx === idx
            return (
              <div
                key={combo.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedIdx(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedIdx(idx)
                  }
                }}
                className={`w-full text-left p-4 rounded-xl transition-all border cursor-pointer select-none flex flex-col gap-2 ${
                  isSelected
                    ? "bg-[#163c2e] border-[#b7db43] shadow-[0_0_15px_rgba(183,219,67,0.12)] ring-1 ring-[#b7db43]/40"
                    : "bg-[#102b22] border-[#20503d] hover:border-[#2f6f57] hover:bg-[#133429]"
                }`}
              >
                {/* Top Row: Number & Title */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xs font-bold text-[#749e8d]">
                      0{idx + 1}
                    </span>
                    <h3 className="text-xs font-bold text-white tracking-tight leading-snug">
                      {combo.name}
                    </h3>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#b7db43] shrink-0" />
                  )}
                </div>

                {/* Bottom Row: Runway Tag & Status */}
                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#1b4334]">
                  <span className="text-[#b4cfc4] font-medium font-mono">
                    {combo.runway}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      combo.statusTone === "danger"
                        ? "bg-[#3d2417] text-[#f5a76c] border border-[#783e20]"
                        : "bg-[#1d4435] text-[#b7db43] border border-[#2d634f]"
                    }`}
                  >
                    {combo.statusTag}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* ====================================================== */}
        {/* Right Panel: Dynamic Clean Runway Visualizer           */}
        {/* Zero absolute positioning overlap, clean spacing        */}
        {/* ====================================================== */}
        <div className="lg:col-span-7 bg-[#163c2e] border border-[#20503d] rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between gap-5">
          {/* Card Top: Selected Combo Title & Primary Runway */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#20503d]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#749e8d] block">
                  Active Combination
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-bold tracking-tight mt-0.5">
                  {current.name}
                </h3>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-[#102b22] border border-[#2d634f] text-right">
                <span className="text-[9px] uppercase tracking-wider text-[#749e8d] block">
                  Illustrative Runway
                </span>
                <span className="text-sm font-mono font-bold text-[#b7db43]">
                  {current.runway}
                </span>
              </div>
            </div>

            {/* Concise One-Line Signal */}
            <p className="text-xs text-[#b4cfc4] mt-3 leading-relaxed">
              {current.summary}
            </p>

            {/* Zone Legend Indicator (Clean Flex Header) */}
            <div className="flex flex-wrap items-center justify-between gap-2 py-2 mt-3 border-y border-dashed border-[#20503d] text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1.5 text-[#b7db43]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b7db43]" />
                Strong Now (&gt;75%)
              </span>
              <span className="flex items-center gap-1.5 text-[#7ec29e]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7ec29e]" />
                Stable (55–75%)
              </span>
              <span className="flex items-center gap-1.5 text-[#f5a76c]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e09f53]" />
                Commoditising (&lt;55%)
              </span>
            </div>

            {/* Clean Reactive 4-Stage Bar Chart (Now to Year 4) */}
            {/* Zero absolute positioning: natural vertical flex stacking */}
            <div className="mt-4 p-4 rounded-xl bg-[#0b1e17] border border-[#1b4334]">
              <div className="grid grid-cols-5 gap-2 sm:gap-4 h-44 items-end px-1">
                {current.points.map((val, idx) => {
                  const zone = getZoneDetails(val)
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-end h-full gap-1.5"
                    >
                      {/* 1. Value label naturally stacked above bar */}
                      <span className={`text-xs font-mono font-bold ${zone.textClass}`}>
                        {val}%
                      </span>

                      {/* 2. Responsive Bar */}
                      <div
                        className={`w-full max-w-[40px] rounded-t-md bg-gradient-to-b ${zone.barGradient} transition-all duration-300 min-h-[14px]`}
                        style={{ height: `${val}%` }}
                      />

                      {/* 3. Year label beneath bar */}
                      <span className="text-[11px] text-[#b4cfc4] font-medium whitespace-nowrap pt-1">
                        {years[idx]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Actionable Strategic Bridge Box (Minimal & High Impact) */}
          <div className="p-3.5 rounded-xl bg-[#102b22] border border-[#2d634f] flex items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <SparklesIcon className="w-4 h-4 text-[#b7db43] shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="text-[#b7db43] font-semibold block">
                  Recommended Pivot Action:
                </span>
                <span className="text-[#a3c9b8]">
                  {current.bridgeAction}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0 pl-2 border-l border-[#20503d]">
              <span className="text-[9px] uppercase tracking-wider text-[#749e8d] block">
                Durability
              </span>
              <span className="text-xs font-mono font-bold text-white">
                {current.durabilityScore}
                <span className="text-[#749e8d] text-[10px]">/100</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
