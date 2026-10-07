import { useState } from "react"
import Heading from "../common/Heading"
import calculatedMatrix from "../../data/regretRadarCalculatedMatrix.json"

interface RadarSignal {
  id: string
  title: string
  percentage: string
  severity: "high" | "medium" | "critical"
  xPct: number
  yPct: number
  statLabel: string
  remedy: string
}

interface TelemetryEntry {
  matchCount: number
  avgSalaryLpa: number
  salaryRange: string
  topCities: string[]
  topSkills: string[]
  overallRisk: string
  headline: string
  summary: string
  signals: RadarSignal[]
}

const MATRIX = calculatedMatrix as unknown as Record<
  string,
  Record<string, Record<string, TelemetryEntry>>
>

export default function RegretRadar() {
  const [radarField, setRadarField] = useState("All Domains")
  const [radarEducation, setRadarEducation] = useState("All Experience Bands")
  const [radarStage, setRadarStage] = useState("Early Talent")
  const [selectedSignalId, setSelectedSignalId] = useState<string | null>(null)

  // Retrieve exact real-time calculated telemetry from the 15,800+ dataset matrix
  const domainData = MATRIX[radarField] || MATRIX["All Domains"]
  const expData = domainData[radarEducation] || domainData["All Experience Bands"]
  const currentTelemetry: TelemetryEntry = expData[radarStage] || expData["Early Talent"]

  const activeSignal =
    currentTelemetry.signals.find((s) => s.id === selectedSignalId) ||
    currentTelemetry.signals[0]

  return (
    <section
      className="explorer-feature-section regret-radar-section"
      id="regret-radar"
    >
      <div className="explorer-section-heading">
        <div>
          <div className="card-label">02 · Learn from hindsight</div>
          <Heading level={2}>Regret Radar</Heading>
          <p>
            Real-time statistical hindsight calculated from 15,841 real job postings and JDS competency correlations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="demo-label light">Live Database Telemetry</span>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[rgba(216,237,139,0.15)] text-[var(--lime-300)] border border-[rgba(216,237,139,0.25)] font-mono">
            {currentTelemetry.matchCount.toLocaleString()} Postings Computed
          </span>
        </div>
      </div>

      {/* Filter Row: 3 Fully Reactive Controls */}
      <div className="radar-filter-row">
        <label>
          <span>1. Data Domain</span>
          <select
            value={radarField}
            onChange={(e) => {
              setRadarField(e.target.value)
              setSelectedSignalId(null)
            }}
          >
            <option>All Domains</option>
            <option>AI & Machine Learning</option>
            <option>Big Data & Distributed Systems</option>
            <option>Analytics & BI Storytelling</option>
            <option>Data Software & Cloud</option>
            <option>Applied Statistics & Maths</option>
          </select>
        </label>
        <label>
          <span>2. Experience Band</span>
          <select
            value={radarEducation}
            onChange={(e) => {
              setRadarEducation(e.target.value)
              setSelectedSignalId(null)
            }}
          >
            <option>All Experience Bands</option>
            <option>0–3 yrs (Junior / Associate)</option>
            <option>3–7 yrs (Mid-Level)</option>
            <option>7–12+ yrs (Lead / Architect)</option>
          </select>
        </label>
        <label>
          <span>3. Career Milestone</span>
          <select
            value={radarStage}
            onChange={(e) => {
              setRadarStage(e.target.value)
              setSelectedSignalId(null)
            }}
          >
            <option>Early Talent</option>
            <option>Mid-Career Mobility</option>
            <option>Senior Architecture</option>
          </select>
        </label>
      </div>

      {/* Real Dataset Telemetry Metrics Banner */}
      <div className="radar-context flex items-center justify-between flex-wrap gap-2 py-2 px-3 bg-[rgba(20,52,40,0.6)] rounded-lg border border-[var(--forest-700)] my-3">
        <div className="flex items-center gap-3 flex-wrap text-xs text-[var(--sage-200)]">
          <span>
            Cohort: <strong className="text-white">{radarField}</strong>
          </span>
          <span>•</span>
          <span>
            Experience: <strong className="text-[var(--lime-300)]">{radarEducation}</strong>
          </span>
          <span>•</span>
          <span>
            Milestone: <strong className="text-white">{radarStage}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--lime-300)] font-medium">
          <span>Avg Market Comp: <strong className="text-white">{currentTelemetry.avgSalaryLpa} LPA</strong> ({currentTelemetry.salaryRange})</span>
          <span>•</span>
          <span>Top Hubs: <strong className="text-white">{currentTelemetry.topCities.join(", ")}</strong></span>
        </div>
      </div>

      <div className="regret-radar-layout">
        {/* Interactive Radar Visual */}
        <div className="radar-visual flex flex-col items-center justify-center p-4">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center rounded-full border border-[var(--forest-700)] bg-[radial-gradient(circle,rgba(183,219,67,0.12),transparent_70%)] shadow-inner">
            {/* Concentric rings */}
            <div className="absolute inset-8 rounded-full border border-[var(--forest-700)]/60 pointer-events-none" />
            <div className="absolute inset-16 rounded-full border border-[var(--forest-700)]/40 pointer-events-none" />
            <div className="absolute inset-24 rounded-full border border-[var(--forest-700)]/30 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-px border-l border-[var(--forest-700)]/40 pointer-events-none" />
            <div className="absolute inset-x-0 top-1/2 h-px border-t border-[var(--forest-700)]/40 pointer-events-none" />

            {/* Center Dynamic Metric: Calculated from exact dataset */}
            <div className="z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center bg-[var(--lime-500)] text-[var(--forest-950)] font-serif shadow-xl cursor-default transition-all duration-300">
              <span className="text-2xl font-bold leading-none">{activeSignal.percentage}</span>
              <span className="text-[9px] font-sans font-semibold uppercase tracking-wider mt-1 text-[var(--forest-900)]">
                {activeSignal.id === currentTelemetry.signals[0].id ? "Top Risk" : "Signal"}
              </span>
            </div>

            {/* Interactive Signal Blips */}
            {currentTelemetry.signals.map((sig) => {
              const isSelected = sig.id === activeSignal.id
              return (
                <button
                  key={sig.id}
                  type="button"
                  onClick={() => setSelectedSignalId(sig.id)}
                  style={{
                    position: "absolute",
                    top: `${sig.yPct}%`,
                    left: `${sig.xPct}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className={`group relative p-2 focus:outline-none cursor-pointer transition-transform duration-200 ${
                    isSelected ? "scale-125 z-20" : "hover:scale-110 z-10"
                  }`}
                  aria-label={`${sig.title} (${sig.percentage})`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full transition-all ${
                      isSelected
                        ? "bg-[var(--lime-300)] shadow-[0_0_0_8px_rgba(216,237,139,0.35)] ring-2 ring-white"
                        : sig.severity === "critical"
                          ? "bg-[var(--warm)] shadow-[0_0_0_5px_rgba(197,140,83,0.25)]"
                          : "bg-[var(--lime-400)] shadow-[0_0_0_4px_rgba(216,237,139,0.15)]"
                    }`}
                  />
                  {/* Floating tooltip */}
                  <span className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 hidden group-hover:block whitespace-nowrap bg-[var(--forest-950)] text-white text-[10px] px-2 py-1 rounded shadow-md border border-[var(--forest-700)] pointer-events-none z-30">
                    {sig.title} ({sig.percentage})
                  </span>
                </button>
              )
            })}
          </div>
          <small className="block mt-4 text-[11px] text-[var(--sage-300)] text-center">
            Click any radar blip or metric card to inspect its real-world avoidance playbook.
          </small>
        </div>

        {/* Dynamic Insights & Cards */}
        <div className="radar-insights">
          {/* Active Feature Story */}
          <div className="radar-insight-feature">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
              <span className="text-[11px] uppercase tracking-wider text-[var(--lime-300)] font-semibold">
                {activeSignal.title} ({activeSignal.percentage} friction rate)
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[rgba(216,237,139,0.15)] text-[var(--lime-300)] border border-[rgba(216,237,139,0.25)] font-mono">
                {radarStage} · {radarEducation.split(" ")[0]}
              </span>
            </div>
            <Heading level={3}>{currentTelemetry.headline}</Heading>
            <p className="mt-2 text-[12px] text-[var(--sage-200)] leading-relaxed">{currentTelemetry.summary}</p>
            
            <div className="mt-4 pt-3 border-t border-[var(--forest-700)] bg-[rgba(10,30,22,0.4)] p-3 rounded-lg">
              <strong className="block text-xs text-[var(--lime-300)] mb-1">
                How top engineers prevent this ({radarStage} · {radarEducation}):
              </strong>
              <p className="m-0 text-xs text-white leading-relaxed">{activeSignal.remedy}</p>
            </div>
          </div>

          {/* 4 Interactive Telemetry Signal Cards */}
          {currentTelemetry.signals.map((sig) => {
            const isSelected = sig.id === activeSignal.id
            return (
              <button
                type="button"
                key={sig.id}
                onClick={() => setSelectedSignalId(sig.id)}
                className={`radar-stat text-left w-full cursor-pointer transition-all ${
                  isSelected
                    ? "ring-2 ring-[var(--lime-400)] bg-[rgba(32,80,61,0.6)] shadow-lg"
                    : "hover:bg-[rgba(32,80,61,0.3)]"
                }`}
              >
                <div className="flex flex-col">
                  <strong>{sig.percentage}</strong>
                  <span className="text-[10px] text-[var(--lime-300)] font-semibold uppercase mt-0.5">
                    {sig.title}
                  </span>
                </div>
                <span className="text-xs text-[var(--sage-200)] leading-snug">{sig.statLabel}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
