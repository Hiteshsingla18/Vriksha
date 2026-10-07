import { useState } from "react"
import { growerMentors } from "../../data/growerData"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

export default function MentorSection() {
  const [selectedMentor, setSelectedMentor] = useState(0)
  const [connectRequested, setConnectRequested] = useState(false)
  const currentMentor = growerMentors[selectedMentor]

  const conversationQuestions = [
    "Which skill became more valuable than expected?",
    "What work proved you were ready for the next step?",
    "What would you stop learning if you started again?",
  ]

  const pathSteps = currentMentor.path.split(" → ")

  return (
    <section className="grower-feature-section" id="future-you-mentor">
      <div className="grower-section-heading">
        <div>
          <div className="card-label">05 · Learn from three years ahead</div>
          <Heading level={2}>Future-You Mentor</Heading>
          <p>A short connect with someone 3–5 years ahead on your path.</p>
        </div>
        <span className="grower-demo-label">Anonymised demo profiles</span>
      </div>

      <div className="mentor-layout">
        <nav className="mentor-list" aria-label="Demo mentors">
          {growerMentors.map((mentor, index) => (
            <button
              type="button"
              key={mentor.name}
              className={selectedMentor === index ? "active" : ""}
              onClick={() => {
                setSelectedMentor(index)
                setConnectRequested(false)
              }}
            >
              <span className={`mentor-avatar mentor-avatar-${index + 1}`}>
                {mentor.name.slice(-1)}
              </span>
              <div>
                <strong>{mentor.role}</strong>
                <small>{mentor.experience}</small>
              </div>
              <Icon name="chevron" size={14} />
            </button>
          ))}
        </nav>

        <div className="mentor-profile">
          <div className="mentor-profile-head">
            <span
              className={`mentor-avatar mentor-avatar-${selectedMentor + 1}`}
            >
              {currentMentor.name.slice(-1)}
            </span>
            <div>
              <span>Anonymised demo mentor</span>
              <Heading level={2}>{currentMentor.role}</Heading>
              <p>{currentMentor.experience}</p>
            </div>
          </div>

          <div className="mentor-path">
            {pathSteps.map((step, index) => (
              <div key={step}>
                <span>0{index + 1}</span>
                <strong>{step}</strong>
                {index < pathSteps.length - 1 && (
                  <Icon name="arrow" size={14} />
                )}
              </div>
            ))}
          </div>

          <div className="mentor-detail-grid">
            <div>
              <small>Similar starting point</small>
              <strong>{currentMentor.start}</strong>
            </div>
            <div>
              <small>Why this match</small>
              <strong>{currentMentor.match}</strong>
            </div>
          </div>

          <div className="chip-row">
            {currentMentor.skills.map((skill) => (
              <SkillChip key={skill} tone="sage">
                {skill}
              </SkillChip>
            ))}
          </div>

          {connectRequested ? (
            <div className="mentor-requested" role="status">
              <Icon name="check" size={17} />
              Short-connect request added to this frontend prototype.
            </div>
          ) : (
            <Button
              icon="arrow"
              onClick={() => setConnectRequested(true)}
              className="mt-4"
            >
              Request a short connect
            </Button>
          )}
        </div>

        <aside className="mentor-conversation">
          <span>Suggested 20-minute conversation</span>
          <Heading level={3}>Ask what changed between here and there.</Heading>
          {conversationQuestions.map((question, index) => (
            <div key={question}>
              <span>0{index + 1}</span>
              <p>{question}</p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  )
}
