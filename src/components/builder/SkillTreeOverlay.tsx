import { builderGaps, builderTreeLeaves } from "../../data/builderData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

interface SkillTreeOverlayProps {
  targetRole: string
}

export default function SkillTreeOverlay({ targetRole }: SkillTreeOverlayProps) {
  const legendItems = [
    { tone: "verified", label: "Verified / already strong" },
    { tone: "priority", label: "Highest-ranked gap" },
    { tone: "gap", label: "Relevant skill to develop" },
  ]

  return (
    <section className="builder-feature-section" id="tree-overlay">
      <div className="builder-section-heading">
        <div>
          <div className="card-label">01 · See the exact gap</div>
          <Heading level={2}>Tree Overlay</Heading>
          <p>Your lit skills vs. the live tree for your target role.</p>
        </div>
        <span className="builder-demo-label">Illustrative skill graph</span>
      </div>

      <div className="tree-overlay-layout">
        <div className="builder-skill-tree relative flex flex-col justify-between p-6 rounded-2xl min-h-[500px] overflow-hidden bg-gradient-to-b from-[var(--forest-950)] to-[var(--forest-900)]">
          <div className="builder-tree-role z-10">
            <small className="text-[var(--sage-500)] text-[10px] tracking-wider uppercase font-semibold">
              Live role tree
            </small>
            <strong className="text-white text-xl font-serif block mt-1">
              {targetRole}
            </strong>
          </div>

          {/* Background branch curves */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            viewBox="0 0 700 460"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M350 415 C348 330 354 250 350 112"
              fill="none"
              stroke="var(--forest-700)"
              strokeWidth="6"
            />
            <path
              d="M350 315 C285 282 232 240 185 190"
              fill="none"
              stroke="var(--forest-700)"
              strokeWidth="5"
            />
            <path
              d="M350 265 C425 238 477 193 515 142"
              fill="none"
              stroke="var(--forest-700)"
              strokeWidth="5"
            />
            <path
              d="M350 214 C301 177 278 136 267 88"
              fill="none"
              stroke="var(--forest-700)"
              strokeWidth="4"
            />
            <path
              d="M350 358 C420 344 486 318 545 279"
              fill="none"
              stroke="var(--forest-700)"
              strokeWidth="5"
            />
          </svg>

          {/* Interactive tree leaf nodes */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-auto py-8">
            {builderTreeLeaves.map((leaf) => {
              const isVerified = leaf.status === "verified" || leaf.status === "strong"
              const isPriority = leaf.status === "priority"

              return (
                <div
                  key={leaf.skill}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all text-xs font-medium cursor-pointer shadow-sm ${
                    isPriority
                      ? "bg-[var(--warm)] border-[#e8b77f] text-[var(--forest-950)] font-semibold shadow-[0_0_15px_rgba(197,140,83,0.3)]"
                      : isVerified
                        ? "bg-[var(--forest-800)] border-[var(--sage-500)] text-white hover:border-[var(--lime-500)]"
                        : "bg-[var(--forest-950)]/80 border-dashed border-[var(--sage-500)]/60 text-[var(--sage-300)]"
                  }`}
                  title={`${leaf.skill} · ${leaf.status}`}
                >
                  <Icon
                    name={isVerified ? "check" : isPriority ? "target" : "branch"}
                    size={14}
                  />
                  <span className="truncate">{leaf.skill}</span>
                </div>
              )
            })}
          </div>

          <div className="z-10 text-center text-xs text-[var(--sage-500)] pt-4 border-t border-[var(--forest-800)]">
            Your current foundation
          </div>
        </div>

        <aside className="tree-overlay-summary">
          <span className="builder-demo-label">Role comparison</span>
          <Heading level={3}>Where you are vs. what the role needs</Heading>

          <div className="tree-legend">
            {legendItems.map((item) => (
              <span key={item.tone}>
                <i className={`legend-${item.tone}`} />
                {item.label}
              </span>
            ))}
          </div>

          <div className="overlay-gap-list">
            {builderGaps.map((item, index) => (
              <button
                type="button"
                key={item.skill}
                className={item.priority ? "priority" : ""}
              >
                <span>0{index + 1}</span>
                <div>
                  <strong>{item.skill}</strong>
                  <small>
                    {item.gap} · current demonstration {item.value}%
                  </small>
                </div>
                <Icon name="chevron" size={14} />
              </button>
            ))}
          </div>

          <div className="overlay-takeaway">
            <Icon name="spark" size={17} />
            <span>
              <strong>Your nearest useful gap</strong>
              Model Evaluation connects directly to skills already lit in your
              tree.
            </span>
          </div>
        </aside>
      </div>
    </section>
  )
}
