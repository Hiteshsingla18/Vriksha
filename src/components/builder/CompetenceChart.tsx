import { useState } from "react"
import Heading from "../common/Heading"

export default function CompetenceChart() {
  const [confidence, setConfidence] = useState(95)
  const [competence, setCompetence] = useState(61)

  const mismatch = confidence - competence

  // Identify active quadrant
  // Q1: Low Conf, High Comp (top-left)
  // Q2: High Conf, High Comp (top-right)
  // Q3: Low Conf, Low Comp (bottom-left)
  // Q4: High Conf, Low Comp (bottom-right)
  const isQ1 = confidence < 50 && competence >= 50
  const isQ2 = confidence >= 50 && competence >= 50
  const isQ3 = confidence < 50 && competence < 50
  const isQ4 = confidence >= 50 && competence < 50

  // Presets for quick calibration
  const setPreset = (conf: number, comp: number) => {
    setConfidence(conf)
    setCompetence(comp)
  }

  return (
    <section
      className="builder-feature-section competence-section"
      id="confidence-vs-competence"
    >
      <div className="builder-section-heading">
        <div>
          <div className="card-label">05 · Calibrate readiness</div>
          <Heading level={2}>Confidence vs Competence</Heading>
          <p>Flags the gap between how ready you feel and how ready you are.</p>
        </div>
        <span className="builder-demo-label light">
          Illustrative demo values
        </span>
      </div>

      <div className="competence-layout">
        {/* ========================================================
            CARD 1: INTERACTIVE CALIBRATION SLIDERS
            ======================================================== */}
        <div className="confidence-controls flex flex-col justify-between">
          <div>
            <span className="builder-demo-label">Interactive calibration</span>
            <Heading level={3}>
              Compare belief with demonstrated evidence.
            </Heading>
            <p>
              Adjust the demo values to see how Builder explains different
              readiness states. This is not a validated assessment.
            </p>

            {/* Slider 1: Confidence */}
            <label className="block mt-6">
              <span className="flex justify-between items-center text-xs">
                <strong className="text-white font-medium">Confidence</strong>
                <b className="text-amber-400 font-mono font-bold text-sm">
                  {confidence}%
                </b>
              </span>
              <input
                type="range"
                min="5"
                max="95"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full my-2.5 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <small className="text-[var(--sage-500)] text-[10px] block">
                How ready you believe you are
              </small>
            </label>

            {/* Slider 2: Competence */}
            <label className="block mt-5">
              <span className="flex justify-between items-center text-xs">
                <strong className="text-white font-medium">Competence</strong>
                <b className="text-amber-400 font-mono font-bold text-sm">
                  {competence}%
                </b>
              </span>
              <input
                type="range"
                min="5"
                max="95"
                value={competence}
                onChange={(e) => setCompetence(Number(e.target.value))}
                className="w-full my-2.5 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <small className="text-[var(--sage-500)] text-[10px] block">
                What demonstrated skills currently indicate
              </small>
            </label>
          </div>

          {/* Quick presets */}
          <div className="pt-4 border-t border-[var(--forest-700)] mt-6">
            <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider block mb-2">
              Quick Scenarios:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setPreset(95, 61)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all ${
                  confidence === 95 && competence === 61
                    ? "bg-amber-400 text-slate-950 font-bold"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Overconfident (95/61)
              </button>
              <button
                type="button"
                onClick={() => setPreset(82, 84)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all ${
                  confidence === 82 && competence === 84
                    ? "bg-emerald-400 text-slate-950 font-bold"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Calibrated (82/84)
              </button>
              <button
                type="button"
                onClick={() => setPreset(38, 76)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all ${
                  confidence === 38 && competence === 76
                    ? "bg-sky-400 text-slate-950 font-bold"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Imposter (38/76)
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            CARD 2: THE 2x2 CALIBRATION RADAR / GRAPH (FIXED)
            ======================================================== */}
        <div className="relative p-5 sm:p-6 min-h-[380px] flex flex-col justify-between rounded-2xl border border-[var(--forest-700)] bg-[var(--forest-900)] overflow-hidden shadow-sm">
          {/* Top Label & Axis indicators */}
          <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-slate-400 pb-2 border-b border-[var(--forest-700)]/60">
            <span>Readiness Matrix</span>
            <span className="text-amber-400/90 font-semibold">
              Live Coordinate: ({confidence}%, {competence}%)
            </span>
          </div>

          {/* Main 2x2 Coordinate Grid Container */}
          <div className="relative my-3 w-full aspect-[4/3] rounded-xl border border-[var(--forest-700)] bg-[var(--forest-950)]/90 overflow-hidden select-none">
            {/* 1. Subtle Radar Concentric Circles */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85%] h-[85%] rounded-full border border-emerald-500/10" />
              <div className="w-[55%] h-[55%] rounded-full border border-emerald-500/10" />
              <div className="w-[28%] h-[28%] rounded-full border border-emerald-500/15" />
            </div>

            {/* 2. Center Dividing Crosshair Axes */}
            {/* Horizontal Axis Line (Competence 50%) */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-600/40 z-10" />
            {/* Vertical Axis Line (Confidence 50%) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-600/40 z-10" />

            {/* 3. The 4 Quadrants (Grid) */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              {/* Q1: Top-Left (Low confidence, High competence) */}
              <div
                className={`p-3.5 flex flex-col justify-start items-start text-[11px] transition-colors duration-300 ${
                  isQ1 ? "bg-sky-500/10" : ""
                }`}
              >
                <span className="text-slate-300 font-medium leading-tight">
                  Low confidence
                </span>
                <span className="text-emerald-400/90 font-medium leading-tight">
                  High competence
                </span>
                {isQ1 && (
                  <span className="mt-1.5 px-2 py-0.5 rounded text-[9px] font-mono bg-sky-950 text-sky-300 border border-sky-500/30">
                    Imposter Phenomenon
                  </span>
                )}
              </div>

              {/* Q2: Top-Right (High confidence, High competence) */}
              <div
                className={`p-3.5 flex flex-col justify-start items-end text-right text-[11px] transition-colors duration-300 ${
                  isQ2 ? "bg-emerald-500/10" : ""
                }`}
              >
                <span className="text-amber-300/90 font-medium leading-tight">
                  High confidence
                </span>
                <span className="text-emerald-400/90 font-medium leading-tight">
                  High competence
                </span>
                {isQ2 && (
                  <span className="mt-1.5 px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    Calibrated Mastery
                  </span>
                )}
              </div>

              {/* Q3: Bottom-Left (Low confidence, Low competence) */}
              <div
                className={`p-3.5 flex flex-col justify-end items-start text-[11px] transition-colors duration-300 ${
                  isQ3 ? "bg-slate-500/10" : ""
                }`}
              >
                {isQ3 && (
                  <span className="mb-1.5 px-2 py-0.5 rounded text-[9px] font-mono bg-slate-900 text-slate-300 border border-slate-600/40">
                    Early Foundation
                  </span>
                )}
                <span className="text-slate-400 font-medium leading-tight">
                  Low confidence
                </span>
                <span className="text-slate-400 font-medium leading-tight">
                  Low competence
                </span>
              </div>

              {/* Q4: Bottom-Right (High confidence, Low competence) */}
              <div
                className={`p-3.5 flex flex-col justify-end items-end text-right text-[11px] transition-colors duration-300 ${
                  isQ4 ? "bg-amber-500/10" : ""
                }`}
              >
                {isQ4 && (
                  <span className="mb-1.5 px-2 py-0.5 rounded text-[9px] font-mono bg-amber-950 text-amber-300 border border-amber-500/30">
                    Dunning-Kruger Risk
                  </span>
                )}
                <span className="text-amber-300/90 font-medium leading-tight">
                  High confidence
                </span>
                <span className="text-slate-400 font-medium leading-tight">
                  Low competence
                </span>
              </div>
            </div>

            {/* 4. Plotted "You" Radar Blip Marker */}
            <div
              className="absolute z-20 pointer-events-none transition-all duration-150 ease-out flex items-center gap-2"
              style={{
                left: `${confidence}%`,
                top: `${100 - competence}%`, // Invert Y coordinate so 100% competence is at top
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Outer pulsing glow */}
              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white shadow-[0_0_14px_rgba(245,158,11,0.9)] items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                </span>
              </span>

              {/* Pill Badge Tag */}
              <span className="px-2 py-0.5 rounded-full bg-slate-900/90 border border-amber-400/80 text-[11px] font-bold text-amber-300 whitespace-nowrap shadow-md backdrop-blur-xs">
                You
              </span>
            </div>
          </div>

          {/* Bottom Axis Labels Ribbon */}
          <div className="flex items-center justify-between text-[10px] uppercase font-mono text-[var(--sage-500)] pt-1">
            <span className="flex items-center gap-1">
              <span>↑</span>
              <span>Competence</span>
            </span>
            <span className="flex items-center gap-1">
              <span>Confidence</span>
              <span>→</span>
            </span>
          </div>
        </div>

        {/* ========================================================
            CARD 3: CURRENT MISMATCH INSIGHT
            ======================================================== */}
        <aside className="competence-insight flex flex-col justify-between">
          <div>
            <span>Current mismatch</span>
            <strong>{Math.abs(mismatch)} points</strong>

            <Heading level={3}>
              {Math.abs(mismatch) <= 8
                ? "Your confidence and demonstrated competence are aligned."
                : mismatch > 0
                ? "Your confidence is currently ahead of demonstrated competence."
                : "Your demonstrated competence is ahead of your confidence."}
            </Heading>

            <p>
              {mismatch > 8
                ? "Prioritise one evidence-producing project before increasing the scope of your target."
                : mismatch < -8
                ? "Your evidence suggests you may be more ready than you feel. A reviewed project could make that visible."
                : "Your self-perception matches empirical project proof. You are ready to accelerate into higher-scope challenges."}
            </p>
          </div>

          <div className="competence-values">
            <span>
              <small>Confidence</small>
              <strong>{confidence}%</strong>
            </span>
            <span>
              <small>Competence</small>
              <strong>{competence}%</strong>
            </span>
          </div>
        </aside>
      </div>
    </section>
  )
}
