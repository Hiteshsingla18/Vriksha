import { useState } from "react"
import Button from "../common/Button"
import Heading from "../common/Heading"

interface EarlyWarningProps {
  onBuilderHandoff: () => void
}

export default function EarlyWarning({ onBuilderHandoff }: EarlyWarningProps) {
  const [warningStage, setWarningStage] = useState(1)

  const warningSignals = [
    {
      signal: "Falling skill relevance",
      detail: "Legacy framework emphasis",
    },
    {
      signal: "Declining market demand",
      detail: "Fewer matching entry-role signals",
    },
    {
      signal: "Weakening alignment",
      detail: "Cloud and automation underrepresented",
    },
    {
      signal: "Placement-risk indicator",
      detail: "Early—not yet reflected in outcomes",
    },
  ]

  const stageLabels = ["Healthy", "Warning", "Declining"]

  const leaves = [
    { skill: "Core Java", isAtRisk: false },
    { skill: "Enterprise patterns", isAtRisk: warningStage >= 1 },
    { skill: "Cloud readiness", isAtRisk: warningStage >= 2 },
    { skill: "System design", isAtRisk: warningStage >= 1 },
    { skill: "Deployment", isAtRisk: warningStage >= 1 },
  ]

  return (
    <section className="colleges-feature-section" id="early-warning">
      <div className="colleges-section-heading">
        <div>
          <div className="card-label">03 · See weakening early</div>
          <Heading level={2}>Early Warning</Heading>
          <p>A specialisation browning years before placements suffer.</p>
        </div>
        <span className="college-demo-label">Illustrative warning scenario</span>
      </div>

      <div className="early-warning-layout">
        <div className="warning-tree-card flex flex-col justify-between p-6 bg-white border border-[var(--line)] rounded-2xl min-h-[480px]">
          <div className="warning-stage-control flex gap-2">
            {stageLabels.map((stage, index) => (
              <button
                type="button"
                key={stage}
                className={warningStage === index ? "active" : ""}
                onClick={() => setWarningStage(index)}
              >
                {stage}
              </button>
            ))}
          </div>

          <div
            className={`specialisation-tree warning-stage-${warningStage} relative my-6 flex flex-col items-center justify-center p-6 bg-[var(--ivory)] rounded-xl border border-[var(--line)]`}
          >
            {/* Tree branch background */}
            <svg
              className="w-full max-w-[320px] h-40 opacity-30 pointer-events-none mb-4"
              viewBox="0 0 420 360"
              aria-hidden="true"
            >
              <path
                d="M205 330 C210 265 204 196 210 105"
                fill="none"
                stroke={warningStage === 2 ? "#72583f" : "var(--forest-800)"}
                strokeWidth="11"
                strokeLinecap="round"
              />
              <path
                d="M208 245 C154 221 120 184 94 142"
                fill="none"
                stroke={warningStage === 2 ? "#72583f" : "var(--forest-800)"}
                strokeWidth="9"
                strokeLinecap="round"
              />
              <path
                d="M208 203 C262 185 302 151 326 111"
                fill="none"
                stroke={warningStage === 2 ? "#72583f" : "var(--forest-800)"}
                strokeWidth="9"
                strokeLinecap="round"
              />
            </svg>

            {/* Responsive skill leaves grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
              {leaves.map((leaf) => (
                <div
                  key={leaf.skill}
                  className={`px-3 py-2.5 rounded-xl border text-center text-xs font-medium transition-all ${
                    leaf.isAtRisk
                      ? warningStage === 2
                        ? "bg-[#795a3d] border-[#ad8258] text-white"
                        : "bg-[#92704c] border-[#c49a6c] text-white"
                      : "bg-[var(--forest-700)] border-[var(--sage-500)] text-white"
                  }`}
                >
                  {leaf.skill}
                </div>
              ))}
            </div>

            <strong className="block text-center text-base sm:text-lg font-serif text-[var(--forest-900)] mt-6">
              Enterprise Application Development
            </strong>
          </div>

          <small className="text-[10px] text-[var(--sage-500)] block">
            Visual scenario changes with the selected warning stage.
          </small>
        </div>

        <aside className="warning-panel">
          <span className="warning-label">Early warning · Demo</span>
          <Heading level={2}>Enterprise Application Development</Heading>
          <p>
            The specialisation still has active placements, but multiple leading
            indicators suggest weakening alignment before outcomes visibly fall.
          </p>

          <div className="warning-signals">
            {warningSignals.map((item, index) => (
              <div key={item.signal}>
                <span>0{index + 1}</span>
                <p>
                  <strong>{item.signal}</strong>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            onClick={onBuilderHandoff}
            icon="arrow"
            className="mt-auto"
          >
            Build an updated skill pathway
          </Button>
        </aside>
      </div>
    </section>
  )
}
