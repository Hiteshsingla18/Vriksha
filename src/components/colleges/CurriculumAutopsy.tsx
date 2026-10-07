import { useState } from "react"
import { collegeCourses } from "../../data/collegesData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

export default function CurriculumAutopsy() {
  const [selectedCourse, setSelectedCourse] = useState(0)
  const currentCourse = collegeCourses[selectedCourse]

  return (
    <section
      className="colleges-feature-section autopsy-section"
      id="curriculum-autopsy"
    >
      <div className="colleges-section-heading">
        <div>
          <div className="card-label">02 · Inspect course outcomes</div>
          <Heading level={2}>Curriculum Autopsy</Heading>
          <p>Per-course correlation with graduates&apos; real outcomes.</p>
        </div>
        <span className="college-demo-label light">
          Illustrative correlation only
        </span>
      </div>

      <div className="autopsy-layout">
        <nav className="course-autopsy-list" aria-label="Courses">
          {collegeCourses.map((course, index) => (
            <button
              type="button"
              key={course.code}
              className={selectedCourse === index ? "active" : ""}
              onClick={() => setSelectedCourse(index)}
            >
              <span>{course.code}</span>
              <div>
                <strong>{course.name}</strong>
                <small>{course.skill}</small>
              </div>
              <Icon name="chevron" size={14} />
            </button>
          ))}
        </nav>

        <div className="course-autopsy-detail">
          <div className="autopsy-detail-head">
            <div>
              <span>{currentCourse.code} · Demo analysis</span>
              <Heading level={2}>{currentCourse.name}</Heading>
            </div>
            <span className="autopsy-score">
              {currentCourse.score}
              <small>/100</small>
            </span>
          </div>

          <div className="autopsy-metrics">
            <div>
              <small>Skill developed</small>
              <strong>{currentCourse.skill}</strong>
            </div>
            <div>
              <small>Outcome relationship</small>
              <strong>{currentCourse.correlation}</strong>
            </div>
            <div>
              <small>Market relevance</small>
              <strong>{currentCourse.relevance}</strong>
            </div>
            <div>
              <small>Status</small>
              <strong>{currentCourse.status}</strong>
            </div>
          </div>

          <div className="correlation-visual">
            <span>Weak / unclear</span>
            <div className="flex-1 h-2 rounded-full bg-[#261f32] overflow-hidden mx-2">
              <i
                className="block h-full rounded-full bg-gradient-to-r from-[var(--college-purple)] to-[#b8a5ce]"
                style={{ width: `${currentCourse.score}%` }}
              />
            </div>
            <span>Stronger association</span>
          </div>

          <div className="autopsy-insight">
            <Icon name="book" size={18} />
            <span>
              <strong>What the demo correlation suggests</strong>
              {currentCourse.insight}
            </span>
          </div>
          <small className="course-causation-note">
            Correlation does not establish that this course caused the graduate
            outcome.
          </small>
        </div>
      </div>
    </section>
  )
}
