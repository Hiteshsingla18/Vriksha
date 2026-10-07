import { useState } from "react"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

export default function RealWork() {
  const [reactions, setReactions] = useState<Record<string, string>>({})

  const workScenarios = [
    {
      role: "Product Designer",
      situation:
        "You receive a complaint that users cannot find the checkout button.",
      question:
        "You need to trace the friction, speak to users and test a clearer screen.",
    },
    {
      role: "Data Analyst",
      situation:
        "Two teams have different explanations for why customer sign-ups fell.",
      question:
        "You need to inspect the data, test assumptions and explain what changed.",
    },
    {
      role: "Cybersecurity Analyst",
      situation:
        "An unusual login appears just before an important client presentation.",
      question:
        "You need to judge the risk quickly without interrupting legitimate work.",
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
