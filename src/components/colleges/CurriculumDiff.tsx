import { useState } from "react"
import { collegeCurriculumDiff } from "../../data/collegesData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

export default function CurriculumDiff() {
  const [diffLens, setDiffLens] = useState("Predictive relevance")
  const [selectedDiff, setSelectedDiff] = useState(2)
  const currentDiff = collegeCurriculumDiff[selectedDiff]

  return (
    <section className="colleges-feature-section" id="curriculum-vs-market">
      <div className="colleges-section-heading">
        <div>
          <div className="card-label">01 · Compare what matters</div>
          <Heading level={2}>Curriculum vs Market</Heading>
          <p>A live diff between what&apos;s taught and what&apos;s predictive.</p>
        </div>
        <span className="college-demo-label">
          Illustrative market comparison
        </span>
      </div>

      <div className="curriculum-diff-toolbar">
        <span>Comparison lens</span>
        {["Current relevance", "Predictive relevance"].map((lens) => (
          <button
            type="button"
            key={lens}
            className={diffLens === lens ? "active" : ""}
            onClick={() => setDiffLens(lens)}
          >
            {lens}
          </button>
        ))}
        <small>Prototype signals · not verified market forecasting</small>
      </div>

      <div className="curriculum-diff-layout">
        <div className="curriculum-diff-table">
          <div className="curriculum-diff-head">
            <span>Course / curriculum skill</span>
            <span>What is taught</span>
            <span>Current</span>
            <span>Predictive</span>
            <span>Status</span>
          </div>
          {collegeCurriculumDiff.map((row, index) => (
            <button
              type="button"
              key={row.course}
              className={selectedDiff === index ? "active" : ""}
              onClick={() => setSelectedDiff(index)}
            >
              <strong>{row.course}</strong>
              <span>{row.taught}</span>
              <span>{row.current}</span>
              <span>{row.predictive}</span>
              <span
                className={`diff-status status-${row.status
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
              >
                {row.status}
              </span>
            </button>
          ))}
        </div>

        <aside className="curriculum-diff-insight">
          <span className="college-demo-label">Selected live diff</span>
          <Heading level={3}>{currentDiff.course}</Heading>
          <p>{currentDiff.explanation}</p>
          <div className="diff-comparison">
            <div>
              <small>Current relevance</small>
              <strong>{currentDiff.current}</strong>
            </div>
            <Icon name="arrow" size={17} />
            <div>
              <small>{diffLens}</small>
              <strong>{currentDiff.predictive}</strong>
            </div>
          </div>
          <div className="diff-action">
            <Icon name="spark" size={16} />
            <span>
              <strong>{currentDiff.status}</strong>Review the balance of
              taught evidence against emerging capability needs.
            </span>
          </div>
        </aside>
      </div>
    </section>
  )
}
