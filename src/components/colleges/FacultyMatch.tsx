import { useState } from "react"
import { facultyMatches } from "../../data/collegesData"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

export default function FacultyMatch() {
  const [selectedFaculty, setSelectedFaculty] = useState(0)
  const [inviteSent, setInviteSent] = useState(false)
  const currentFaculty = facultyMatches[selectedFaculty]

  return (
    <section
      className="colleges-feature-section faculty-section"
      id="guest-faculty-match"
    >
      <div className="colleges-section-heading">
        <div>
          <div className="card-label">04 · Bring in exact expertise</div>
          <Heading level={2}>Guest-Faculty Match</Heading>
          <p>Opted-in professionals who can teach the exact emerging gap.</p>
        </div>
        <span className="college-demo-label light">
          Anonymised demo professionals
        </span>
      </div>

      <div className="faculty-gap-bridge">
        <div>
          <small>Emerging skill gap</small>
          <strong>Production ML Systems</strong>
        </div>
        <Icon name="arrow" size={18} />
        <div>
          <small>Required expertise</small>
          <strong>Deployment · Monitoring · MLOps</strong>
        </div>
        <Icon name="arrow" size={18} />
        <div>
          <small>Matched professional</small>
          <strong>{currentFaculty.role}</strong>
        </div>
      </div>

      <div className="faculty-match-layout">
        <nav className="faculty-list" aria-label="Matched professionals">
          {facultyMatches.map((faculty, index) => (
            <button
              type="button"
              key={faculty.name}
              className={selectedFaculty === index ? "active" : ""}
              onClick={() => {
                setSelectedFaculty(index)
                setInviteSent(false)
              }}
            >
              <span className={`faculty-avatar faculty-avatar-${index + 1}`}>
                {faculty.name.slice(-1)}
              </span>
              <div>
                <strong>{faculty.role}</strong>
                <small>{faculty.expertise}</small>
              </div>
              <Icon name="chevron" size={14} />
            </button>
          ))}
        </nav>

        <div className="faculty-profile">
          <div className="faculty-profile-head">
            <span
              className={`faculty-avatar faculty-avatar-${
                selectedFaculty + 1
              }`}
            >
              {currentFaculty.name.slice(-1)}
            </span>
            <div>
              <span>Opted-in anonymised demo profile</span>
              <Heading level={2}>{currentFaculty.role}</Heading>
              <p>{currentFaculty.experience}</p>
            </div>
          </div>

          <div className="faculty-expertise">
            <small>Relevant expertise</small>
            <strong>{currentFaculty.expertise}</strong>
          </div>

          <div className="field-detail-group">
            <strong>Skills they can teach</strong>
            <div className="chip-row">
              {currentFaculty.skills.map((skill) => (
                <SkillChip key={skill} tone="sage">
                  {skill}
                </SkillChip>
              ))}
            </div>
          </div>

          <div className="faculty-reason">
            <Icon name="spark" size={17} />
            <span>
              <strong>Why this match</strong>
              {currentFaculty.reason}
            </span>
          </div>

          {inviteSent ? (
            <div className="faculty-invited" role="status">
              <Icon name="check" size={16} />
              Teaching invitation added to this frontend prototype.
            </div>
          ) : (
            <Button
              icon="arrow"
              onClick={() => setInviteSent(true)}
              className="mt-4"
            >
              Invite to Teach
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
