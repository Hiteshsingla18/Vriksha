import { useState } from "react"
import Heading from "../common/Heading"

export default function CompetenceChart() {
  const [confidence, setConfidence] = useState(82)
  const [competence, setCompetence] = useState(61)

  const mismatch = confidence - competence

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
        <div className="confidence-controls">
          <span className="builder-demo-label">Interactive calibration</span>
          <Heading level={3}>
            Compare belief with demonstrated evidence.
          </Heading>
          <p>
            Adjust the demo values to see how Builder explains different
            readiness states. This is not a validated assessment.
          </p>

          <label className="block mt-6">
            <span className="flex justify-between items-center text-xs">
              <strong>Confidence</strong>
              <b className="text-[var(--warm)]">{confidence}%</b>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full my-2 accent-[var(--warm)]"
            />
            <small className="text-[var(--sage-500)] text-[10px]">
              How ready you believe you are
            </small>
          </label>

          <label className="block mt-4">
            <span className="flex justify-between items-center text-xs">
              <strong>Competence</strong>
              <b className="text-[var(--warm)]">{competence}%</b>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={competence}
              onChange={(e) => setCompetence(Number(e.target.value))}
              className="w-full my-2 accent-[var(--warm)]"
            />
            <small className="text-[var(--sage-500)] text-[10px]">
              What demonstrated skills currently indicate
            </small>
          </label>
        </div>

        <div className="competence-chart relative p-6 min-h-[360px] flex flex-col justify-between rounded-2xl border border-[var(--forest-700)] bg-[var(--forest-900)] overflow-hidden">
          <div className="competence-axis-label vertical">Competence</div>
          <div className="competence-axis-label horizontal">Confidence</div>

          {/* 4 Quadrants Grid */}
          <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-2 relative">
            {/* Center crosshair lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--forest-700)]" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--forest-700)]" />

            <div className="competence-quadrant q1 p-3 text-[10px] text-[var(--sage-500)]">
              <span>Low confidence<br />High competence</span>
            </div>
            <div className="competence-quadrant q2 p-3 text-[10px] text-[var(--sage-500)] text-right">
              <span>High confidence<br />High competence</span>
            </div>
            <div className="competence-quadrant q3 p-3 text-[10px] text-[var(--sage-500)] flex items-end">
              <span>Low confidence<br />Low competence</span>
            </div>
            <div className="competence-quadrant q4 p-3 text-[10px] text-[var(--sage-500)] flex items-end justify-end text-right">
              <span>High confidence<br />Low competence</span>
            </div>

            {/* Dynamic Plotted marker */}
            <div
              className="competence-marker absolute pointer-events-none transition-all duration-150"
              style={{
                left: `${Math.max(6, Math.min(94, confidence))}%`,
                bottom: `${Math.max(6, Math.min(94, competence))}%`,
              }}
            >
              <i className="w-4 h-4 rounded-full border-4 border-[var(--warm)] bg-white shadow-[0_0_0_6px_rgba(197,140,83,0.15)] inline-block" />
              <span className="ml-1.5 text-xs font-semibold text-[#f1c899]">You</span>
            </div>
          </div>
        </div>

        <aside className="competence-insight">
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
            {mismatch > 0
              ? "Prioritise one evidence-producing project before increasing the scope of your target."
              : "Your evidence suggests you may be more ready than you feel. A reviewed project could make that visible."}
          </p>
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
