import { useState } from "react"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

export default function CohortHeatmap() {
  const [cohort, setCohort] = useState("2026 cohort")
  const [specialisation, setSpecialisation] = useState("All specialisations")
  const [year, setYear] = useState("Year 3")
  const [skillArea, setSkillArea] = useState("All skill areas")

  const heatColumns = [
    "Programming",
    "Data",
    "Cloud",
    "AI systems",
    "Communication",
  ]

  const heatRows: [string, number[]][] = [
    ["Computer Science · Urban", [84, 78, 71, 68, 74]],
    ["Computer Science · Regional", [72, 64, 55, 48, 61]],
    ["Data Science · Urban", [80, 76, 69, 57, 72]],
    ["Data Science · First-gen", [65, 58, 46, 41, 54]],
    ["Electronics · Career switchers", [69, 62, 51, 44, 59]],
    ["All programmes · Scholarship", [76, 70, 63, 52, 66]],
  ]

  return (
    <section className="colleges-feature-section" id="cohort-heat-map">
      <div className="colleges-section-heading">
        <div>
          <div className="card-label">05 · Find who needs attention</div>
          <Heading level={2}>Cohort Heat-Map</Heading>
          <p>
            Which student segments are falling behind, not just which courses.
          </p>
        </div>
        <span className="college-demo-label">Illustrative cohort data</span>
      </div>

      <div className="heat-map-filters">
        <label>
          <span>Cohort</span>
          <select value={cohort} onChange={(e) => setCohort(e.target.value)}>
            <option>2026 cohort</option>
            <option>2027 cohort</option>
          </select>
        </label>
        <label>
          <span>Specialisation</span>
          <select
            value={specialisation}
            onChange={(e) => setSpecialisation(e.target.value)}
          >
            <option>All specialisations</option>
            <option>Computer Science</option>
            <option>Data Science</option>
          </select>
        </label>
        <label>
          <span>Year</span>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option>Year 3</option>
            <option>Year 2</option>
            <option>Year 4</option>
          </select>
        </label>
        <label>
          <span>Skill area</span>
          <select
            value={skillArea}
            onChange={(e) => setSkillArea(e.target.value)}
          >
            <option>All skill areas</option>
            <option>Technical</option>
            <option>Professional</option>
          </select>
        </label>
      </div>

      <div className="cohort-heat-layout">
        <div className="cohort-heat-scroll overflow-x-auto">
          <div className="cohort-heat-grid min-w-[680px]">
            <div className="heat-corner">Student segment</div>
            {heatColumns.map((col) => (
              <div className="heat-column" key={col}>
                {col}
              </div>
            ))}
            {heatRows.map(([segment, values]) => (
              <div key={segment} className="contents">
                <div className="heat-row-label">{segment}</div>
                {values.map((val, idx) => (
                  <button
                    type="button"
                    key={`${segment}-${heatColumns[idx]}`}
                    className={`heat-cell heat-${
                      val >= 75
                        ? "strong"
                        : val >= 60
                          ? "steady"
                          : val >= 50
                            ? "watch"
                            : "risk"
                    }`}
                    data-tooltip={`${segment} · ${heatColumns[idx]} · ${val}% illustrative alignment`}
                    aria-label={`${segment}, ${heatColumns[idx]}, ${val}% alignment`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <aside className="heat-map-insight">
          <span>Segment requiring attention</span>
          <Heading level={3}>
            Data Science · First-generation students
          </Heading>
          <p>
            The demo pattern is weaker across cloud and AI systems even where
            overall course averages appear acceptable.
          </p>
          <div className="heat-legend">
            <span>
              <i className="strong" />
              Stronger
            </span>
            <span>
              <i className="steady" />
              Steady
            </span>
            <span>
              <i className="watch" />
              Watch
            </span>
            <span>
              <i className="risk" />
              Needs attention
            </span>
          </div>
          <div className="demo-notice">
            <Icon name="people" size={15} />
            Entirely illustrative student-segment data for interface
            demonstration.
          </div>
        </aside>
      </div>
    </section>
  )
}
