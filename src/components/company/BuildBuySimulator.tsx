import { useState } from "react"

// ==========================================
// Types & Domain Presets
// ==========================================
interface RolePreset {
  id: string
  title: string
  trainCount: number
  trainMonths: number
  trainingCost: number
  hireCount: number
  buyMonths: number
  hiringCost: number
}

const ROLE_PRESETS: RolePreset[] = [
  {
    id: "ml-platform",
    title: "ML Platform Engineer",
    trainCount: 8,
    trainMonths: 4,
    trainingCost: 1.2,
    hireCount: 3,
    buyMonths: 2,
    hiringCost: 8.5,
  },
  {
    id: "ai-architect",
    title: "AI Systems Architect",
    trainCount: 4,
    trainMonths: 6,
    trainingCost: 2.2,
    hireCount: 2,
    buyMonths: 3,
    hiringCost: 15.0,
  },
  {
    id: "data-reliability",
    title: "Data Reliability Specialist",
    trainCount: 10,
    trainMonths: 3,
    trainingCost: 0.9,
    hireCount: 4,
    buyMonths: 2,
    hiringCost: 7.0,
  },
]

// ==========================================
// Embedded SVG Icons
// Zero external file dependencies
// ==========================================
function CalculatorIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
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

function ClockIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

// ==========================================
// Main BuildBuySimulator Component
// ==========================================
export default function BuildBuySimulator() {
  const [activePreset, setActivePreset] = useState("ml-platform")

  // Simulator State
  const [trainCount, setTrainCount] = useState(8)
  const [trainMonths, setTrainMonths] = useState(4)
  const [trainingCost, setTrainingCost] = useState(1.2)

  const [hireCount, setHireCount] = useState(3)
  const [buyMonths, setBuyMonths] = useState(2)
  const [hiringCost, setHiringCost] = useState(8.5)

  // Apply Presets
  const handleApplyPreset = (preset: RolePreset) => {
    setActivePreset(preset.id)
    setTrainCount(preset.trainCount)
    setTrainMonths(preset.trainMonths)
    setTrainingCost(preset.trainingCost)
    setHireCount(preset.hireCount)
    setBuyMonths(preset.buyMonths)
    setHiringCost(preset.hiringCost)
  }

  // Reactive Calculations
  const buildTotal = Math.round(trainCount * trainingCost * 10) / 10
  const buyTotal = Math.round(hireCount * hiringCost * 10) / 10
  const costSavings = Math.abs(Math.round((buyTotal - buildTotal) * 10) / 10)
  const buildRecommended = buildTotal <= buyTotal && trainMonths <= 7
  const breakEvenMonth = Math.max(
    1,
    Math.round((Math.abs(buyTotal - buildTotal) + trainMonths * 2) / 3.2)
  )

  return (
    <section
      className="company-feature-section bg-transparent"
      id="build-vs-buy-simulator"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="company-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#8b5e3c] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8b5e3c] inline-block" />
            02 · Compare capability economics
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Build-vs-Buy Simulator
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Compare training existing engineering staff over M months against acquiring external specialists now.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#f7f2ed] text-[#8b5e3c] border border-[#d6c4b2]">
          <CalculatorIcon className="w-3.5 h-3.5 text-[#8b5e3c]" />
          Economic Trade-Off Engine
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Interactive Role Presets                              */}
      {/* ======================================================== */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 bg-[#fcfbf9] border border-gray-200 p-1 rounded-lg">
          <span className="text-[10px] uppercase font-bold text-gray-400 px-2">Preset Role:</span>
          {ROLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                activePreset === preset.id
                  ? "bg-white text-gray-950 shadow-2xs border border-gray-200"
                  : "text-gray-600 hover:text-gray-950"
              }`}
            >
              {preset.title}
            </button>
          ))}
        </div>
        <span className="text-[10px] font-mono text-gray-500">
          Adjust sliders below to simulate bespoke company scenarios
        </span>
      </div>

      {/* ======================================================== */}
      {/* 3. Interactive Slider Controls (2 Columns)               */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* BUILD Controls */}
        <div className="bg-[#fcfbf9] border border-gray-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#8b5e3c] text-white">
                BUILD
              </span>
              <strong className="text-sm font-bold text-gray-950">
                Train Existing Talent
              </strong>
            </div>
            <span className="text-xs font-mono font-bold text-[#8b5e3c]">
              ₹{buildTotal.toFixed(1)}L Total
            </span>
          </div>

          <div className="space-y-4">
            {/* Slider 1: Count */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Employees to Upskill:</span>
                <strong className="font-mono text-gray-950">{trainCount} engineers</strong>
              </div>
              <input
                type="range"
                min="2"
                max="20"
                value={trainCount}
                onChange={(e) => setTrainCount(Number(e.target.value))}
                className="w-full accent-[#8b5e3c] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>2</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>

            {/* Slider 2: Duration */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Training Ramp Duration:</span>
                <strong className="font-mono text-gray-950">{trainMonths} months</strong>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={trainMonths}
                onChange={(e) => setTrainMonths(Number(e.target.value))}
                className="w-full accent-[#8b5e3c] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>1 mo</span>
                <span>6 mos</span>
                <span>12 mos</span>
              </div>
            </div>

            {/* Slider 3: Cost per Head */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Curriculum / Capstone Cost per Head:</span>
                <strong className="font-mono text-gray-950">₹{trainingCost.toFixed(1)}L</strong>
              </div>
              <input
                type="range"
                min="0.5"
                max="4.0"
                step="0.1"
                value={trainingCost}
                onChange={(e) => setTrainingCost(Number(e.target.value))}
                className="w-full accent-[#8b5e3c] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>₹0.5L</span>
                <span>₹2.0L</span>
                <span>₹4.0L</span>
              </div>
            </div>
          </div>
        </div>

        {/* BUY Controls */}
        <div className="bg-[#fcfbf9] border border-gray-200 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-800 text-white">
                BUY
              </span>
              <strong className="text-sm font-bold text-gray-950">
                Hire External Specialists
              </strong>
            </div>
            <span className="text-xs font-mono font-bold text-gray-900">
              ₹{buyTotal.toFixed(1)}L Total
            </span>
          </div>

          <div className="space-y-4">
            {/* Slider 1: Hire Count */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Specialists Required:</span>
                <strong className="font-mono text-gray-950">{hireCount} hires</strong>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={hireCount}
                onChange={(e) => setHireCount(Number(e.target.value))}
                className="w-full accent-gray-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>

            {/* Slider 2: Time to Productivity */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Recruit & Onboarding Lead Time:</span>
                <strong className="font-mono text-gray-950">{buyMonths} months</strong>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={buyMonths}
                onChange={(e) => setBuyMonths(Number(e.target.value))}
                className="w-full accent-gray-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>1 mo</span>
                <span>4 mos</span>
                <span>8 mos</span>
              </div>
            </div>

            {/* Slider 3: Cost per Hire */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">Recruiting & Signing Fee / Hire:</span>
                <strong className="font-mono text-gray-950">₹{hiringCost.toFixed(1)}L</strong>
              </div>
              <input
                type="range"
                min="3.0"
                max="20.0"
                step="0.5"
                value={hiringCost}
                onChange={(e) => setHiringCost(Number(e.target.value))}
                className="w-full accent-gray-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>₹3.0L</span>
                <span>₹10.0L</span>
                <span>₹20.0L</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. Real-Time Economic Comparison (3 Cards)               */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Card 1: BUILD Result (4.5 cols) */}
        <div
          className={`lg:col-span-4 rounded-2xl p-5 border transition-all shadow-2xs flex flex-col justify-between ${
            buildRecommended
              ? "bg-white border-[#8b5e3c] ring-2 ring-[#8b5e3c]/20"
              : "bg-[#fcfbf9] border-gray-200"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b5e3c]">
                Build Pathway
              </span>
              {buildRecommended && (
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f7f2ed] text-[#8b5e3c] border border-[#d6c4b2]">
                  Recommended Strategy
                </span>
              )}
            </div>

            <div className="text-3xl sm:text-4xl font-serif font-bold text-gray-950 mt-1">
              ₹{buildTotal.toFixed(1)}L
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Upskill {trainCount} existing engineers over {trainMonths} months.
            </p>

            <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Ramp to Capability:</span>
                <strong className="text-gray-900 font-mono">{trainMonths} months</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Domain Retention:</span>
                <strong className="text-emerald-700 font-semibold">High (Preserves context)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Per-Head Investment:</span>
                <strong className="text-gray-900 font-mono">₹{trainingCost.toFixed(1)}L / engineer</strong>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-lg bg-[#fcfbf9] border border-gray-200 text-[11px] text-gray-600">
            Broadens institutional knowledge across {trainCount} team members.
          </div>
        </div>

        {/* Card 2: BUY Result (4.5 cols) */}
        <div
          className={`lg:col-span-4 rounded-2xl p-5 border transition-all shadow-2xs flex flex-col justify-between ${
            !buildRecommended
              ? "bg-white border-gray-800 ring-2 ring-gray-400/20"
              : "bg-[#fcfbf9] border-gray-200"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Buy Pathway
              </span>
              {!buildRecommended && (
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 border border-gray-300">
                  Recommended Strategy
                </span>
              )}
            </div>

            <div className="text-3xl sm:text-4xl font-serif font-bold text-gray-950 mt-1">
              ₹{buyTotal.toFixed(1)}L
            </div>
            <p className="text-xs text-gray-600 mt-1">
              Hire {hireCount} external specialists with {buyMonths} mo ramp time.
            </p>

            <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Ramp to Capability:</span>
                <strong className="text-gray-900 font-mono">{buyMonths} months</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Ramp Uncertainty:</span>
                <strong className="text-amber-800 font-semibold">Moderate (Cultural fit)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Per-Hire Acquisition:</span>
                <strong className="text-gray-900 font-mono">₹{hiringCost.toFixed(1)}L / hire</strong>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-lg bg-[#fcfbf9] border border-gray-200 text-[11px] text-gray-600">
            Brings immediate external expertise for urgent critical-path deadlines.
          </div>
        </div>

        {/* Card 3: Executive Synthesis & Break-Even (3 cols) */}
        <div className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Economic Synthesis
              </span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold">
                ₹{costSavings.toFixed(1)}L Delta
              </span>
            </div>

            <h3 className="text-base font-serif text-gray-950 font-bold leading-snug">
              {buildRecommended ? "Strategic Advantage: Build" : "Speed Advantage: Buy"}
            </h3>
            <p className="text-xs text-gray-600 mt-1 leading-relaxed">
              {buildRecommended
                ? `Upskilling internally saves ₹${costSavings.toFixed(1)}L while cultivating sustainable platform skills in ${trainCount} team members.`
                : `Hiring externally reaches production readiness ${Math.max(1, trainMonths - buyMonths)} months faster for high-priority roadmaps.`}
            </p>

            {/* Break Even Box */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#fcfbf9] border border-gray-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Estimated Break-Even:</span>
                <span className="font-serif text-base font-bold text-gray-950">
                  Month {breakEvenMonth}
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-[#8b5e3c] rounded-full transition-all"
                  style={{ width: `${Math.min(100, (breakEvenMonth / 12) * 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-400 block mt-1">
                Net positive return amortised across 12-month delivery window.
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>Illustrative workforce model</span>
            <span className="font-mono text-gray-700 font-bold">₹{(buildTotal + buyTotal).toFixed(1)}L combined</span>
          </div>
        </div>
      </div>
    </section>
  )
}
