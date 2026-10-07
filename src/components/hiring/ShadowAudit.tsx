import { useState } from "react"
import { shadowCandidates } from "../../data/hiringData"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

const filterOptions = [
  { label: "Degree requirement", detail: "Computer Science degree required" },
  { label: "Exact tool requirement", detail: "Kubernetes production experience" },
  { label: "Years of experience", detail: "Minimum five years" },
  { label: "Exact title requirement", detail: "Previous ML Engineer title" },
]

export default function ShadowAudit() {
  const [jdFilters, setJdFilters] = useState<boolean[]>([true, false, true, false])

  const toggleFilter = (index: number) => {
    setJdFilters((current) =>
      current.map((value, itemIndex) => (itemIndex === index ? !value : value))
    )
  }

  const hiddenCount = jdFilters.filter(Boolean).length + 2

  return (
    <section
      className="hiring-feature-section shadow-audit-section"
      id="shadow-candidate-audit"
    >
      <div className="hiring-section-heading">
        <div>
          <div className="card-label">02 · Audit literal filters</div>
          <Heading level={2}>Shadow Candidate Audit</Heading>
          <p>How many good-fits your JD&apos;s requirements filtered out.</p>
        </div>
        <span className="hiring-demo-label light">Illustrative candidate audit</span>
      </div>

      <div className="shadow-audit-layout">
        <div className="jd-filter-panel">
          <span>Current JD filters · Demo</span>
          <Heading level={3}>Which requirements may be hiding capability?</Heading>

          {filterOptions.map((filter, index) => (
            <button
              key={filter.label}
              className={jdFilters[index] ? "active" : ""}
              onClick={() => toggleFilter(index)}
            >
              <span>{jdFilters[index] && <Icon name="check" size={12} />}</span>
              <div>
                <strong>{filter.label}</strong>
                <small>{filter.detail}</small>
              </div>
            </button>
          ))}

          <div className="shadow-count">
            <small>Potentially hidden by selected filters</small>
            <strong>{hiddenCount} demo profiles</strong>
          </div>
        </div>

        <div className="shadow-candidate-list">
          <div className="shadow-list-head">
            <div>
              <span>Potential shadow candidates</span>
              <Heading level={3}>Capability outside the literal shortlist</Heading>
            </div>
            <span className="hiring-demo-label">Demo only</span>
          </div>

          {shadowCandidates.map((candidate, index) => (
            <article key={candidate.name}>
              <span className={`candidate-avatar avatar-${index + 1}`}>
                S{index + 1}
              </span>
              <div>
                <small>
                  {candidate.name} · {candidate.current}
                </small>
                <Heading level={3}>{candidate.capability}</Heading>
                <p>{candidate.why}</p>
                <span className="blocked-by">
                  Filtered by: {candidate.blockedBy}
                </span>
              </div>
              <Button variant="text">Review evidence</Button>
            </article>
          ))}

          <p className="audit-guardrail">
            Audit unnecessary filters without bypassing legitimate legal, safety
            or role requirements.
          </p>
        </div>
      </div>
    </section>
  )
}
