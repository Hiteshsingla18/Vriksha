import { useState } from "react"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

export default function RealWork() {
  const [reactions, setReactions] = useState<Record<string, string>>({})

  const workScenarios = [
    {
      role: "Data Scientist",
      situation:
        "A business stakeholder asks you to guarantee 99% accuracy on a customer churn model before checking class imbalance.",
      question:
        "You need to explain precision/recall trade-offs, design an ROC-AUC benchmark, and align on realistic business ROI.",
    },
    {
      role: "Big Data Engineer",
      situation:
        "At 2 AM, the nocturnal batch ETL pipeline fails due to an unexpected null byte in an upstream Kafka event stream.",
      question:
        "You need to inspect the dead-letter queue, patch the PySpark schema inference, and re-trigger without duplicating rows.",
    },
    {
      role: "BI & Analytics Consultant",
      situation:
        "Two department heads present conflicting revenue numbers for the exact same quarter from two separate dashboards.",
      question:
        "You need to audit the underlying SQL joins, isolate duplicate transaction attribution, and unify the metric logic.",
    },
    {
      role: "MLOps Platform Lead",
      situation:
        "The GPU cloud bill doubled over the weekend because an unquantized deep learning model was deployed with no autoscale limits.",
      question:
        "You need to profile memory consumption, implement INT8 quantization, and establish strict rate-limiting policies.",
    },
  ]

  const options = ["Excited", "Curious", "Neutral", "Not for me"]

  return (
    <section
      className="explorer-feature-section real-work-section"
      id="react-to-real-work"
    >
      <div className="explorer-section-heading">
        <div>
          <div className="card-label">04 · Notice your reaction</div>
          <Heading level={2}>React to Real Work</Heading>
          <p>Don&apos;t just read a job description. Experience the day.</p>
        </div>
        <span className="demo-label">Not a psychological assessment</span>
      </div>

      <div className="real-work-grid">
        {workScenarios.map((item, index) => (
          <article className="real-work-card" key={item.role}>
            <div className="real-work-card-head">
              <span className="activity-icon">
                <Icon name="target" size={15} />
              </span>
              <div>
                <small>Day-in-the-life · Demo</small>
                <Heading level={3}>{item.role}</Heading>
              </div>
            </div>
            <blockquote>“{item.situation}”</blockquote>
            <p>{item.question}</p>

            <div
              className="reaction-options"
              aria-label={`Reaction to ${item.role}`}
            >
              {options.map((reaction) => (
                <button
                  type="button"
                  key={reaction}
                  className={
                    reactions[item.role] === reaction ? "active" : ""
                  }
                  onClick={() =>
                    setReactions((current) => ({
                      ...current,
                      [item.role]: reaction,
                    }))
                  }
                >
                  {reaction}
                </button>
              ))}
            </div>

            {reactions[item.role] && (
              <div className="reaction-confirmation" role="status">
                <Icon name="check" size={14} />
                Your reaction has been added to your Explorer profile.
              </div>
            )}
            <span className="real-work-index">0{index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  )
}
