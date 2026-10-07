import { useState } from "react"
import { hiringCandidates } from "../../data/hiringData"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

interface PredictedMatchProps {
  selectedCandidate: number
  onSelectCandidate: (index: number) => void
}

export default function PredictedMatch({
  selectedCandidate,
  onSelectCandidate,
}: PredictedMatchProps) {
  const [expandedCandidate, setExpandedCandidate] = useState<number | null>(0)

  return (
    <section className="hiring-feature-section" id="predicted-success-match">
      <div className="hiring-section-heading">
        <div>
          <div className="card-label">01 · Rank for capability</div>
          <Heading level={2}>Predicted-Success Match</Heading>
          <p>Ranked on predicted success, not keyword overlap.</p>
        </div>
        <span className="hiring-demo-label">Illustrative prototype score</span>
      </div>

      <div className="success-explanation">
        <div>
          <span>Keyword match</span>
          <strong>Literal terms and exact-title overlap</strong>
        </div>
        <Icon name="arrow" size={18} />
        <div>
          <span>Predicted success</span>
          <strong>Skills, evidence, transferability and role context</strong>
        </div>
        <small>No real predictive model is connected.</small>
      </div>

      <div className="candidate-ranking">
        {hiringCandidates.map((candidate, index) => {
          const isSelected = selectedCandidate === index
          const isExpanded = expandedCandidate === index

          return (
            <article
              className={`ranked-candidate ${isSelected ? "selected" : ""}`}
              key={candidate.name}
            >
              <button
                className="candidate-rank-main"
                onClick={() => {
                  onSelectCandidate(index)
                  setExpandedCandidate(isExpanded ? null : index)
                }}
              >
                <span className="candidate-rank">0{index + 1}</span>
                <span className={`candidate-avatar avatar-${index + 1}`}>
                  {candidate.initials}
                </span>
                <span className="candidate-identity">
                  <strong>{candidate.name}</strong>
                  <small>{candidate.title}</small>
                </span>
                <span className="candidate-score keyword">
                  <small>Keyword match</small>
                  <strong>{candidate.keyword}%</strong>
                </span>
                <span className="candidate-score predicted">
                  <small>Predicted success</small>
                  <strong>{candidate.predicted}%</strong>
                </span>
                <SkillChip tone={index === 0 ? "lime" : "sage"}>
                  {candidate.roleMatch}
                </SkillChip>
                <Icon name="chevron" size={15} />
              </button>

              {isExpanded && (
                <div className="candidate-evidence-detail">
                  <div>
                    <small>Relevant skills</small>
                    <div className="chip-row">
                      {candidate.skills.map((skill) => (
                        <SkillChip key={skill}>{skill}</SkillChip>
                      ))}
                    </div>
                  </div>
                  <div>
                    <small>Key strengths</small>
                    {candidate.strengths.map((strength) => (
                      <span key={strength}>
                        <Icon name="check" size={12} />
                        {strength}
                      </span>
                    ))}
                  </div>
                  <div>
                    <small>Skill gaps</small>
                    {candidate.gaps.map((gap) => (
                      <span key={gap}>
                        <Icon name="branch" size={12} />
                        {gap}
                      </span>
                    ))}
                  </div>
                  <p>
                    <strong>Evidence signal</strong>
                    {candidate.evidence}
                  </p>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
