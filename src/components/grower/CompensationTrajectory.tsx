import { useState } from "react"
import { compensationPaths } from "../../data/growerData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

export default function CompensationTrajectory() {
  const [selectedPath, setSelectedPath] = useState(0)
  const currentPath = compensationPaths[selectedPath]

  const bandHeights = ["h-[38%]", "h-[62%]", "h-[90%]"]

  return (
    <section
      className="grower-feature-section compensation-section"
      id="compensation-trajectory"
    >
      <div className="grower-section-heading">
        <div>
          <div className="card-label">04 · Compare possible growth</div>
          <Heading level={2}>Compensation Trajectory</Heading>
          <p>Real pay-growth bands from aggregated outcomes.</p>
        </div>
        <span className="grower-demo-label light">
          Illustrative compensation bands
        </span>
      </div>

      <div className="compensation-layout">
        <nav
          className="compensation-path-tabs"
          aria-label="Compensation paths"
        >
          {compensationPaths.map((path, index) => (
            <button
              type="button"
              key={path.name}
              className={selectedPath === index ? "active" : ""}
              onClick={() => setSelectedPath(index)}
            >
              <span>Path {String.fromCharCode(65 + index)}</span>
              <strong>{path.name}</strong>
            </button>
          ))}
        </nav>

        <div className="compensation-chart flex flex-col justify-between p-6 rounded-2xl bg-white border border-[var(--line)] min-h-[360px]">
          <div className="flex justify-between items-center text-[10px] text-[var(--sage-500)] pb-4 border-b border-dashed border-[var(--line)]">
            <span>Aggregated compensation trajectory</span>
            <span>Outcome-benchmarked ranges</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end my-6 h-56 pt-4">
            {currentPath.roles.map((role, index) => (
              <div
                key={role}
                className="flex flex-col items-center justify-end h-full gap-3 relative"
              >
                <div
                  className={`w-full max-w-[140px] flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${bandHeights[index]} ${
                    index === 0
                      ? "bg-[var(--sage-100)] border-[var(--sage-300)] text-[var(--forest-800)]"
                      : index === 1
                        ? "bg-[var(--lime-100)] border-[var(--lime-300)] text-[var(--forest-900)] shadow-sm"
                        : "bg-[var(--forest-800)] border-[var(--forest-700)] text-white shadow-md"
                  }`}
                >
                  <small className="text-[10px] opacity-75">
                    Illustrative range
                  </small>
                  <strong className="font-serif text-lg block mt-1">
                    {currentPath.bands[index]}
                  </strong>
                </div>

                <div className="text-center">
                  <small className="text-[10px] text-[var(--sage-500)] block">
                    Stage 0{index + 1}
                  </small>
                  <strong className="text-xs text-[var(--forest-900)] block mt-0.5">
                    {role}
                  </strong>
                </div>

                {index < 2 && (
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 text-[var(--sage-500)] z-10">
                    <Icon name="arrow" size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-[10px] text-[var(--muted)] pt-3 border-t border-[var(--line)]">
            Progression model reflects market median milestones.
          </div>
        </div>

        <aside className="compensation-note">
          <span>How to read this</span>
          <Heading level={3}>{currentPath.name}</Heading>
          <p>{currentPath.note}</p>
          <div className="demo-notice mt-6 flex items-start gap-2">
            <Icon name="spark" size={15} />
            <span className="text-[11px] leading-relaxed">
              Demo ranges only. Compensation varies by geography, company, scope
              and demonstrated outcomes.
            </span>
          </div>
        </aside>
      </div>
    </section>
  )
}
