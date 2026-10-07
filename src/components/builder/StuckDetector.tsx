import { useState } from "react"
import { behaviourSignals } from "../../data/builderData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

export default function StuckDetector() {
  const [selectedSignal, setSelectedSignal] = useState(2)

  const bottleneckSkills = [
    "Model Evaluation",
    "Evaluation Metrics",
    "Cross-validation",
    "Error Analysis",
    "Metric Selection",
  ]

  return (
    <section
      className="builder-feature-section stuck-detector-section"
      id="stuck-detector"
    >
      <div className="builder-section-heading">
        <div>
          <div className="card-label">02 · Diagnose behaviour</div>
          <Heading level={2}>Stuck Detector</Heading>
          <p>
            Reads behaviour, not a self-report, to find where you&apos;re stuck.
          </p>
        </div>
        <span className="builder-demo-label light">
          Illustrative behaviour signals
        </span>
      </div>

      <div className="stuck-detector-layout">
        <div className="behaviour-signal-list">
          {behaviourSignals.map((item, index) => (
            <button
              type="button"
              key={item.signal}
              className={selectedSignal === index ? "active" : ""}
              onClick={() => setSelectedSignal(index)}
            >
              <span className="signal-index">0{index + 1}</span>
              <div>
                <strong>{item.signal}</strong>
                <small>{item.evidence}</small>
              </div>
              <SkillChip tone={selectedSignal === index ? "warm" : "sage"}>
                {item.skill}
              </SkillChip>
            </button>
          ))}
        </div>

        <aside className="bottleneck-output">
          <span>Current bottleneck · Demo diagnosis</span>
          <div className="bottleneck-pulse">
            <Icon name="target" size={25} />
          </div>
          <Heading level={2}>{bottleneckSkills[selectedSignal]}</Heading>
          <p>
            Your behaviour suggests the issue is not motivation. The pattern
            points to difficulty connecting evaluation choices to the
            model&apos;s real-world objective.
          </p>
          <div className="bottleneck-evidence">
            <strong>Why Builder flagged this</strong>
            <span>Observed repetition</span>
            <span>Time concentration</span>
            <span>Task avoidance pattern</span>
          </div>
          <small>Prototype insight only · not a validated assessment</small>
        </aside>
      </div>
    </section>
  )
}
