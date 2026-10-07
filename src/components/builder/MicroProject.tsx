import { useState } from "react"
import { projectChecklistItems } from "../../data/builderData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import ProgressBar from "../common/ProgressBar"
import SkillChip from "../common/SkillChip"

export default function MicroProject() {
  const [projectSteps, setProjectSteps] = useState([true, true, false, false])
  const completedSteps = projectSteps.filter(Boolean).length

  const skillsPracticed = [
    "Execution plans",
    "Indexing",
    "Query profiling",
    "Technical explanation",
  ]

  const toggleStep = (index: number) => {
    setProjectSteps((current) =>
      current.map((val, i) => (i === index ? !val : val))
    )
  }

  return (
    <section className="builder-feature-section" id="micro-project">
      <div className="builder-section-heading">
        <div>
          <div className="card-label">03 · Close one ranked gap</div>
          <Heading level={2}>Micro-Project</Heading>
          <p>One weekend project scoped to close exactly one ranked gap.</p>
        </div>
        <span className="builder-demo-label">Focused project prototype</span>
      </div>

      <div className="micro-project-layout">
        <div className="micro-project-brief">
          <div className="micro-project-gap">
            <span>Ranked gap 01</span>
            <strong>SQL Query Optimization</strong>
            <small>
              Priority because it blocks your next evidence milestone.
            </small>
          </div>

          <div className="project-relationship">
            <span>Skill gap</span>
            <Icon name="arrow" size={17} />
            <span>Weekend project</span>
            <Icon name="arrow" size={17} />
            <span>Demonstrated capability</span>
          </div>

          <span className="project-kicker">Recommended weekend project</span>
          <Heading level={2}>Build a small query-performance analyzer.</Heading>
          <p>
            Compare five deliberately slow queries, identify the bottleneck and
            document a faster alternative with before-and-after evidence.
          </p>

          <div className="project-facts">
            <div>
              <small>Expected time</small>
              <strong>6–8 hours</strong>
            </div>
            <div>
              <small>Primary gap</small>
              <strong>Query optimization</strong>
            </div>
            <div>
              <small>Expected outcome</small>
              <strong>1 evidence artifact</strong>
            </div>
          </div>

          <div className="field-detail-group">
            <strong>Skills practiced</strong>
            <div className="chip-row">
              {skillsPracticed.map((skill) => (
                <SkillChip key={skill} tone="warm">
                  {skill}
                </SkillChip>
              ))}
            </div>
          </div>
        </div>

        <aside className="micro-project-progress">
          <div className="panel-head">
            <div>
              <div className="card-label">Weekend plan</div>
              <Heading level={3}>{completedSteps} of 4 steps</Heading>
            </div>
            <strong>{completedSteps * 25}%</strong>
          </div>

          <ProgressBar value={completedSteps * 25} tone="gold" />

          <div className="project-checklist">
            {projectChecklistItems.map((item, index) => (
              <button
                type="button"
                key={item.step}
                className={projectSteps[index] ? "complete" : ""}
                onClick={() => toggleStep(index)}
              >
                <span>
                  {projectSteps[index] && <Icon name="check" size={12} />}
                </span>
                <div>
                  <strong>{item.step}</strong>
                  <small>{item.time}</small>
                </div>
              </button>
            ))}
          </div>

          <div className="project-why">
            <Icon name="spark" size={16} />
            <span>
              <strong>Why this project</strong>
              It isolates one ranked gap and produces visible evidence without
              becoming a large portfolio build.
            </span>
          </div>
        </aside>
      </div>
    </section>
  )
}
