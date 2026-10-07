import { useState } from "react"
import { mobilityCandidates } from "../../data/companyData"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

export default function MobilityPathways() {
  const [selectedMobility, setSelectedMobility] = useState(0)
  const candidate = mobilityCandidates[selectedMobility]

  return (
    <section className="company-feature-section" id="internal-mobility">
      <div className="company-section-heading">
        <div>
          <div className="card-label">03 · Search inside first</div>
          <Heading level={2}>Internal Mobility</Heading>
          <p>Checks other departments before recommending an external hire.</p>
        </div>
        <span className="company-demo-label">
          Illustrative employee profiles
        </span>
      </div>

      <div className="mobility-role-bridge">
        <div>
          <small>Open role</small>
          <strong>ML Platform Engineer</strong>
        </div>
        <Icon name="arrow" size={18} />
        <div>
          <small>Required capability</small>
          <strong>Python · Cloud · MLOps · Reliability</strong>
        </div>
        <Icon name="arrow" size={18} />
        <div>
          <small>Internal search</small>
          <strong>{mobilityCandidates.length} nearby employees</strong>
        </div>
      </div>

      <div className="company-mobility-layout">
        <nav
          className="company-mobility-list"
          aria-label="Internal mobility candidates"
        >
          {mobilityCandidates.map((c, index) => (
            <button
              key={c.name}
              className={selectedMobility === index ? "active" : ""}
              onClick={() => setSelectedMobility(index)}
            >
              <span
                className={`employee-avatar employee-avatar-${index + 1}`}
              >
                M{index + 1}
              </span>
              <div>
                <strong>{c.role}</strong>
                <small>{c.department}</small>
              </div>
              <span className="mobility-match">{c.match}%</span>
              <Icon name="chevron" size={14} />
            </button>
          ))}
        </nav>

        <div className="mobility-path-detail">
          <div className="mobility-path-head">
            <div>
              <span>Internal candidate · Demo</span>
              <Heading level={2}>{candidate.role}</Heading>
              <p>{candidate.department}</p>
            </div>
            <span className="mobility-score">
              <strong>{candidate.match}%</strong>
              <small>match strength</small>
            </span>
          </div>

          <div className="mobility-path-flow">
            <div>
              <small>Current role</small>
              <strong>{candidate.role}</strong>
            </div>
            <Icon name="arrow" size={17} />
            <div>
              <small>Focused development</small>
              <strong>{candidate.gap.join(" + ")}</strong>
            </div>
            <Icon name="arrow" size={17} />
            <div>
              <small>Target role</small>
              <strong>{candidate.target}</strong>
            </div>
          </div>

          <div className="mobility-skill-columns">
            <div>
              <strong>Already covered</strong>
              <div className="chip-row">
                {candidate.transfer.map((skill) => (
                  <SkillChip key={skill} tone="sage">
                    {skill}
                  </SkillChip>
                ))}
              </div>
            </div>
            <div>
              <strong>Remaining gap</strong>
              <div className="chip-row">
                {candidate.gap.map((skill) => (
                  <SkillChip key={skill} tone="warm">
                    {skill}
                  </SkillChip>
                ))}
              </div>
            </div>
          </div>

          <div className="mobility-reason">
            <Icon name="spark" size={16} />
            <span>
              <strong>Why this move is credible</strong>
              {candidate.why}
            </span>
          </div>

          <Button icon="arrow">View Mobility Path</Button>
        </div>
      </div>
    </section>
  )
}
