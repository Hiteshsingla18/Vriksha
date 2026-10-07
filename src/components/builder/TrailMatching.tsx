import { useState } from "react"
import { builderTrails } from "../../data/builderData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

export default function TrailMatching() {
  const [selectedTrail, setSelectedTrail] = useState(0)
  const currentTrail = builderTrails[selectedTrail]

  const trailSteps = [
    { label: "Started with", description: currentTrail.started },
    { label: "Skill gap", description: currentTrail.gap },
    { label: "Action", description: currentTrail.action },
    { label: "Learning step", description: currentTrail.learning },
    { label: "Outcome", description: currentTrail.outcome },
  ]

  return (
    <section
      className="builder-feature-section trail-matching-section"
      id="trail-matching"
    >
      <div className="builder-section-heading">
        <div>
          <div className="card-label">04 · Learn from a real route</div>
          <Heading level={2}>Trail Matching</Heading>
          <p>Real paths of people who closed this exact gap before you.</p>
        </div>
        <span className="builder-demo-label">Anonymised demo journeys</span>
      </div>

      <div className="trail-matching-layout">
        <nav className="trail-selector" aria-label="Demo learning trails">
          {builderTrails.map((trail, index) => (
            <button
              type="button"
              key={trail.name}
              className={selectedTrail === index ? "active" : ""}
              onClick={() => setSelectedTrail(index)}
            >
              <span>0{index + 1}</span>
              <div>
                <strong>{trail.gap}</strong>
                <small>{trail.outcome}</small>
              </div>
              <Icon name="chevron" size={14} />
            </button>
          ))}
        </nav>

        <div className="selected-trail">
          <div className="selected-trail-head">
            <div>
              <span>{currentTrail.name} · Demo</span>
              <Heading level={3}>{currentTrail.profile}</Heading>
            </div>
            <SkillChip tone="warm">Similar gap</SkillChip>
          </div>

          <div className="trail-path">
            {trailSteps.map((item, index) => (
              <div key={item.label}>
                <span>0{index + 1}</span>
                <small>{item.label}</small>
                <strong>{item.description}</strong>
                {index < 4 && <Icon name="arrow" size={14} />}
              </div>
            ))}
          </div>

          <div className="trail-takeaway">
            <Icon name="branch" size={18} />
            <span>
              <strong>What transfers to your path</strong>
              A focused project, targeted practice and one review checkpoint—not
              another broad course.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
