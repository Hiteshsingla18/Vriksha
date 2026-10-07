import { useState } from "react"
import { benchSignals } from "../../data/companyData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

const radarPositions = [
  { left: "28%", top: "32%" },
  { left: "70%", top: "25%" },
  { left: "72%", top: "68%" },
  { left: "30%", top: "66%" },
]

export default function BenchRadar() {
  const [selectedBench, setSelectedBench] = useState(0)
  const currentSignal = benchSignals[selectedBench]

  return (
    <section className="company-feature-section" id="bench-radar">
      <div className="company-section-heading">
        <div>
          <div className="card-label">01 · See staleness early</div>
          <Heading level={2}>Bench Radar</Heading>
          <p>Internal skills about to go stale, before performance drops.</p>
        </div>
        <span className="company-demo-label">Illustrative workforce activity</span>
      </div>

      <div className="bench-radar-layout">
        <div className="bench-radar-map relative min-h-[340px] flex items-center justify-center overflow-hidden">
          <div className="bench-radar-rings pointer-events-none">
            <i />
            <i />
            <i />
            <span>Skill freshness</span>
          </div>

          {benchSignals.map((signal, index) => {
            const pos = radarPositions[index] || { left: "50%", top: "50%" }
            const isSelected = selectedBench === index
            const stateClass = signal.freshness.toLowerCase().replace(/ /g, "-")

            return (
              <button
                key={signal.employee}
                className={`bench-radar-node node-${stateClass} ${
                  isSelected ? "active" : ""
                }`}
                style={{ left: pos.left, top: pos.top }}
                onClick={() => setSelectedBench(index)}
              >
                <span>{signal.employee.slice(-1)}</span>
                <strong>{signal.skill}</strong>
                <small>{signal.freshness}</small>
              </button>
            )
          })}
        </div>

        <aside className="bench-radar-detail">
          <span className="company-demo-label">Selected capability</span>
          <Heading level={2}>{currentSignal.skill}</Heading>
          <p>
            {currentSignal.employee} · {currentSignal.team}
          </p>

          <div className="bench-freshness-score">
            <span
              style={
                {
                  "--freshness": `${currentSignal.score}%`,
                } as React.CSSProperties
              }
            >
              <strong>{currentSignal.score}</strong>
              <small>/100</small>
            </span>
            <div>
              <small>Freshness state</small>
              <strong>{currentSignal.freshness}</strong>
            </div>
          </div>

          <div className="bench-detail-list">
            <div>
              <small>Last evidence</small>
              <strong>{currentSignal.last}</strong>
            </div>
            <div>
              <small>Current relevance</small>
              <strong>{currentSignal.relevance}</strong>
            </div>
            <div>
              <small>Status</small>
              <strong>{currentSignal.risk}</strong>
            </div>
          </div>

          <div className="bench-note">
            <Icon name="spark" size={16} />
            {currentSignal.note}
          </div>

          <small className="bench-guardrail">
            Low recent activity does not mean the employee has lost the skill.
          </small>
        </aside>
      </div>
    </section>
  )
}
