import { useState } from "react"
import { attritionProfiles } from "../../data/companyData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

export default function AttritionRisk() {
  const [selectedRisk, setSelectedRisk] = useState(0)
  const [selectedRiskSignal, setSelectedRiskSignal] = useState(0)
  const currentProfile = attritionProfiles[selectedRisk]

  const dimensions = [
    { label: "Skill relevance", value: currentProfile.relevance },
    { label: "Growth", value: currentProfile.growth },
    { label: "Internal mobility", value: currentProfile.mobility },
  ]

  return (
    <section
      className="company-feature-section attrition-section"
      id="attrition-aware-planning"
    >
      <div className="company-section-heading">
        <div>
          <div className="card-label">04 · Intervene before capability leaves</div>
          <Heading level={2}>Attrition-Aware Planning</Heading>
          <p>Flags stagnating skills plus flight risk before someone quits.</p>
        </div>
        <span className="company-demo-label light">
          Illustrative attention signals
        </span>
      </div>

      <div className="attrition-layout">
        <nav
          className="risk-profile-list"
          aria-label="Workforce attention profiles"
        >
          {attritionProfiles.map((profile, index) => (
            <button
              key={profile.name}
              className={selectedRisk === index ? "active" : ""}
              onClick={() => {
                setSelectedRisk(index)
                setSelectedRiskSignal(0)
              }}
            >
              <span
                className={`employee-avatar employee-avatar-${index + 1}`}
              >
                R{index + 1}
              </span>
              <div>
                <strong>{profile.team}</strong>
                <small>{profile.name}</small>
              </div>
              <span>{profile.signal}</span>
            </button>
          ))}
        </nav>

        <div className="risk-planning-panel">
          <div className="risk-profile-head">
            <div>
              <span>Workforce attention view · Demo</span>
              <Heading level={2}>{currentProfile.team}</Heading>
              <p>{currentProfile.name}</p>
            </div>
            <span className="risk-overall">{currentProfile.signal}</span>
          </div>

          <div className="risk-dimensions">
            {dimensions.map((dim, index) => (
              <button
                key={dim.label}
                className={selectedRiskSignal === index ? "active" : ""}
                onClick={() => setSelectedRiskSignal(index)}
              >
                <small>{dim.label}</small>
                <strong>{dim.value}</strong>
                <span />
              </button>
            ))}
          </div>

          <div className="risk-signal-detail">
            <span>Signal contributing to this state</span>
            <Heading level={3}>
              {currentProfile.signals[selectedRiskSignal]}
            </Heading>
            <p>
              This pattern may warrant attention; it does not predict that a
              specific employee will leave.
            </p>
          </div>

          <div className="risk-actions">
            <strong>Possible workforce actions</strong>
            {currentProfile.actions.map((action, index) => (
              <button key={action}>
                <span>0{index + 1}</span>
                {action}
                <Icon name="arrow" size={13} />
              </button>
            ))}
          </div>
        </div>

        <aside className="risk-guardrail">
          <Icon name="people" size={20} />
          <Heading level={3}>
            Use signals to start a conversation, not label a person.
          </Heading>
          <p>
            This prototype combines capability staleness, growth and mobility
            signals to identify where support may be valuable. It does not
            predict resignation or guarantee retention.
          </p>
        </aside>
      </div>
    </section>
  )
}
