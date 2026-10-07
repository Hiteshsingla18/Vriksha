import { useState } from "react"
import { halfLifeCombos } from "../../data/growerData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

export default function SkillHalfLife() {
  const [skillCombo, setSkillCombo] = useState(0)
  const currentCombo = halfLifeCombos[skillCombo]

  const timeLabels = ["Now", "Year 1", "Year 2", "Year 3", "Year 4"]

  return (
    <section
      className="grower-feature-section half-life-section"
      id="skill-half-life"
    >
      <div className="grower-section-heading">
        <div>
          <div className="card-label">02 · Understand your runway</div>
          <Heading level={2}>Skill Half-Life</Heading>
          <p>Your runway before this skill combo gets commoditised.</p>
        </div>
        <span className="grower-demo-label light">
          Illustrative scenario model
        </span>
      </div>

      <div className="half-life-layout">
        <nav className="skill-combo-selector" aria-label="Skill combinations">
          {halfLifeCombos.map((combo, index) => (
            <button
              type="button"
              key={combo.name}
              className={skillCombo === index ? "active" : ""}
              onClick={() => setSkillCombo(index)}
            >
              <span>0{index + 1}</span>
              <div>
                <strong>{combo.name}</strong>
                <small>{combo.runway}</small>
              </div>
              <Icon name="chevron" size={14} />
            </button>
          ))}
        </nav>

        <div className="half-life-chart-card">
          <div className="half-life-chart-head">
            <div>
              <span>Selected combination</span>
              <Heading level={3}>{currentCombo.name}</Heading>
            </div>
            <SkillChip tone="lime">Demo runway</SkillChip>
          </div>

          <div className="skill-runway-chart p-5 rounded-xl bg-[var(--forest-950)] border border-[var(--forest-800)] flex flex-col justify-between min-h-[300px]">
            {/* Zones header */}
            <div className="grid grid-cols-3 border-b border-dashed border-[var(--forest-700)] pb-2 text-[10px] text-[var(--sage-500)] uppercase tracking-wider text-center">
              <span>Strong now</span>
              <span>Stable relevance</span>
              <span>Potential commoditisation</span>
            </div>

            {/* Responsive bars */}
            <div className="grid grid-cols-5 gap-3 sm:gap-6 items-end h-44 pt-6 px-2">
              {currentCombo.points.map((point, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-end h-full gap-2 group"
                >
                  <span
                    className="w-full max-w-[44px] rounded-t-md bg-gradient-to-b from-[var(--lime-500)] to-[var(--forest-700)] transition-all duration-300 relative flex items-center justify-center"
                    style={{ height: `${point}%` }}
                  >
                    <i className="absolute -top-5 text-[11px] font-sans font-semibold text-[var(--lime-300)] not-italic">
                      {point}
                    </i>
                  </span>
                  <small className="text-[11px] text-[var(--sage-500)] whitespace-nowrap">
                    {timeLabels[index]}
                  </small>
                </div>
              ))}
            </div>
          </div>

          <div className="runway-insight">
            <Icon name="spark" size={17} />
            <span>
              <strong>{currentCombo.runway}</strong>
              {currentCombo.summary}
            </span>
          </div>
          <small className="chart-disclaimer">
            Illustrative scenario only · not an actual market prediction
          </small>
        </div>
      </div>
    </section>
  )
}
