import { useState } from "react"
import { freshnessProfiles } from "../../data/hiringData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

export default function SkillDecay() {
  const [freshnessCandidate, setFreshnessCandidate] = useState(0)
  const currentProfile = freshnessProfiles[freshnessCandidate]

  return (
    <section className="hiring-feature-section" id="skill-decay-screening">
      <div className="hiring-section-heading">
        <div>
          <div className="card-label">03 · Check evidence freshness</div>
          <Heading level={2}>Skill-Decay Screening</Heading>
          <p>Flags listed skills with no recent verified activity.</p>
        </div>
        <span className="hiring-demo-label">Illustrative activity timeline</span>
      </div>

      <div className="freshness-layout">
        <nav
          className="freshness-candidate-tabs"
          aria-label="Candidate skill freshness"
        >
          {freshnessProfiles.map((profile, index) => (
            <button
              key={profile.candidate}
              className={freshnessCandidate === index ? "active" : ""}
              onClick={() => setFreshnessCandidate(index)}
            >
              <span className={`candidate-avatar avatar-${index + 1}`}>
                {profile.candidate
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <div>
                <strong>{profile.candidate}</strong>
                <small>{profile.skills.length} listed skills reviewed</small>
              </div>
            </button>
          ))}
        </nav>

        <div className="skill-freshness-list">
          {currentProfile.skills.map(([skill, state, evidence, freshness]) => (
            <article key={skill}>
              <div className="freshness-skill">
                <Heading level={3}>{skill}</Heading>
                <span
                  className={`freshness-state state-${String(state)
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                >
                  {state}
                </span>
              </div>
              <p>{evidence}</p>
              <div className="freshness-timeline">
                <span style={{ width: `${freshness}%` }} />
                <i style={{ left: `${freshness}%` }} />
              </div>
              <div className="freshness-axis">
                <span>Older evidence</span>
                <span>Recent verified activity</span>
              </div>
            </article>
          ))}
          <div className="freshness-note">
            <Icon name="spark" size={16} />
            No recent verified activity does not mean the candidate lacks the skill.
            It identifies where verification may be useful.
          </div>
        </div>
      </div>
    </section>
  )
}
