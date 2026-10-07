import { useState } from "react"
import { growerAdjacentRoles } from "../../data/growerData"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

interface AdjacentLeapProps {
  onBuilderHandoff: () => void
}

export default function AdjacentLeap({ onBuilderHandoff }: AdjacentLeapProps) {
  const [selectedLeap, setSelectedLeap] = useState(0)
  const currentLeap = growerAdjacentRoles[selectedLeap]

  return (
    <section className="grower-feature-section" id="adjacent-leap">
      <div className="grower-section-heading">
        <div>
          <div className="card-label">03 · Move without restarting</div>
          <Heading level={2}>Adjacent Leap</Heading>
          <p>Nearby roles where most of your skills already transfer.</p>
        </div>
        <span className="grower-demo-label">Skill-transfer prototype</span>
      </div>

      <div className="adjacent-leap-layout">
        <div className="adjacent-source">
          <span>Current role</span>
          <Heading level={2}>Software Developer</Heading>
          <p>5 years · Backend systems</p>
          <div className="chip-row">
            {["Python", "SQL", "APIs", "System design"].map((skill) => (
              <SkillChip key={skill} tone="lime">
                {skill}
              </SkillChip>
            ))}
          </div>
          <div className="adjacent-source-line">
            <span />
            <Icon name="arrow" size={18} />
          </div>
        </div>

        <nav className="adjacent-role-selector" aria-label="Adjacent roles">
          {growerAdjacentRoles.map((role, index) => (
            <button
              type="button"
              key={role.role}
              className={selectedLeap === index ? "active" : ""}
              onClick={() => setSelectedLeap(index)}
            >
              <span>0{index + 1}</span>
              <div>
                <strong>{role.role}</strong>
                <small>{role.gap}</small>
              </div>
              <Icon name="chevron" size={14} />
            </button>
          ))}
        </nav>

        <div className="adjacent-role-detail">
          <span className="grower-demo-label">Adjacent role</span>
          <Heading level={2}>{currentLeap.role}</Heading>
          <p>{currentLeap.why}</p>

          <div className="adjacent-skill-group transfer">
            <strong>Already transferable</strong>
            <div className="chip-row">
              {currentLeap.transfer.map((skill) => (
                <SkillChip key={skill} tone="lime">
                  {skill}
                </SkillChip>
              ))}
            </div>
          </div>

          <div className="adjacent-skill-group gap">
            <strong>Additional gap</strong>
            <div className="chip-row">
              {currentLeap.build.map((skill) => (
                <SkillChip key={skill} tone="warm">
                  {skill}
                </SkillChip>
              ))}
            </div>
          </div>

          <div className="adjacent-gap-summary">
            <span>Approximate gap</span>
            <strong>{currentLeap.gap}</strong>
          </div>

          <Button
            variant="secondary"
            onClick={onBuilderHandoff}
            icon="arrow"
            className="mt-auto"
          >
            Build the focused gap
          </Button>
        </div>
      </div>
    </section>
  )
}
