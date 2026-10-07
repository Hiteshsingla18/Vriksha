import { useState } from "react"
import { teamCandidates } from "../../data/hiringData"
import Heading from "../common/Heading"

export default function TeamFitView() {
  const [teamCandidate, setTeamCandidate] = useState(0)
  const current = teamCandidates[teamCandidate]

  return (
    <section className="hiring-feature-section team-fit-section" id="team-fit-view">
      <div className="hiring-section-heading">
        <div>
          <div className="card-label">04 · Evaluate contribution</div>
          <Heading level={2}>Team-Fit View</Heading>
          <p>What a candidate adds to the existing team&apos;s profile.</p>
        </div>
        <span className="hiring-demo-label light">Illustrative team composition</span>
      </div>

      <div className="team-fit-selector">
        {teamCandidates.map((candidate, index) => (
          <button
            key={candidate.name}
            className={teamCandidate === index ? "active" : ""}
            onClick={() => setTeamCandidate(index)}
          >
            <span className={`candidate-avatar avatar-${index + 1}`}>
              {candidate.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </span>
            <strong>{candidate.name}</strong>
          </button>
        ))}
      </div>

      <div className="team-fit-equation">
        <div className="team-capability-card existing-team">
          <span>Existing team profile</span>
          <Heading level={3}>Strong modelling, thinner platform depth</Heading>
          <div className="team-skill-cloud">
            {[
              "Machine learning",
              "Experimentation",
              "Python",
              "Statistics",
              "Product thinking",
            ].map((skill, index) => (
              <button
                key={skill}
                title={`${skill} · existing team strength`}
                className={index < 2 ? "strong" : ""}
              >
                {skill}
              </button>
            ))}
          </div>
          <div className="team-gap">
            <small>Current team gap</small>
            <strong>Cloud infrastructure · DevOps</strong>
          </div>
        </div>

        <span className="team-equation-symbol">+</span>

        <div className="team-capability-card candidate-team-card">
          <span>Candidate contribution</span>
          <Heading level={3}>{current.name}</Heading>
          <div className="team-contribution-groups">
            <div>
              <small>Adds missing skills</small>
              {current.adds.map((skill) => (
                <button key={skill} title={`${skill} · new team capability`}>
                  {skill}
                </button>
              ))}
            </div>
            <div>
              <small>Strengthens</small>
              {current.strengthens.map((skill) => (
                <button key={skill} title={`${skill} · stronger shared depth`}>
                  {skill}
                </button>
              ))}
            </div>
            <div>
              <small>Duplicates</small>
              {current.duplicates.map((skill) => (
                <button
                  key={skill}
                  className="duplicate"
                  title={`${skill} · already represented`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        <span className="team-equation-symbol">=</span>

        <div className="team-result-card">
          <span>Combined capability</span>
          <strong>{current.value}</strong>
          <p>
            The candidate increases team coverage rather than only matching the
            role in isolation.
          </p>
          <div className="team-result-ring">
            <span>+3</span>
            <small>new or deeper capability areas</small>
          </div>
        </div>
      </div>
    </section>
  )
}
