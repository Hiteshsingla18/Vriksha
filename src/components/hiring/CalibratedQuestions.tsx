import { useState } from "react"
import { hiringCandidates, hiringQuestions } from "../../data/hiringData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

interface CalibratedQuestionsProps {
  selectedCandidate: number
}

export default function CalibratedQuestions({
  selectedCandidate,
}: CalibratedQuestionsProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number>(-1)
  const candidate = hiringCandidates[selectedCandidate] || hiringCandidates[0]

  return (
    <section className="hiring-feature-section" id="calibrated-questions">
      <div className="hiring-section-heading">
        <div>
          <div className="card-label">05 · Interview for evidence</div>
          <Heading level={2}>Calibrated Questions</Heading>
          <p>Generated from what really separated past hires&apos; success.</p>
        </div>
        <span className="hiring-demo-label">Illustrative historical signals</span>
      </div>

      <div className="question-context">
        <div>
          <small>Candidate</small>
          <strong>{candidate.name}</strong>
        </div>
        <Icon name="arrow" size={17} />
        <div>
          <small>Role</small>
          <strong>ML Platform Engineer</strong>
        </div>
        <Icon name="arrow" size={17} />
        <div>
          <small>Question focus</small>
          <strong>Evidence that separates outcomes</strong>
        </div>
      </div>

      <div className="calibrated-question-list">
        {hiringQuestions.map((item, index) => {
          const isExpanded = expandedQuestion === index
          return (
            <article
              className={isExpanded ? "expanded" : ""}
              key={item.capability}
            >
              <button
                onClick={() =>
                  setExpandedQuestion(isExpanded ? -1 : index)
                }
              >
                <span>0{index + 1}</span>
                <div>
                  <small>Capability</small>
                  <strong>{item.capability}</strong>
                </div>
                <p>{item.question}</p>
                <Icon name="chevron" size={15} />
              </button>

              {isExpanded && (
                <div className="question-evaluation">
                  <div>
                    <small>Why this question</small>
                    <p>{item.why}</p>
                  </div>
                  <div>
                    <small>Evaluation signal</small>
                    <p>{item.signal}</p>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>

      <div className="question-disclaimer">
        <Icon name="spark" size={16} />
        Demo questions and historical signals only. They are not derived from a
        connected hiring-outcomes dataset.
      </div>
    </section>
  )
}
