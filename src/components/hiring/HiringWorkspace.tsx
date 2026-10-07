import { useState } from "react"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import CalibratedQuestions from "./CalibratedQuestions"
import PredictedMatch from "./PredictedMatch"
import ShadowAudit from "./ShadowAudit"
import SkillDecay from "./SkillDecay"
import TeamFitView from "./TeamFitView"

interface HiringWorkspaceProps {
  fromGrower?: boolean
  fromColleges?: boolean
  onGrowerHandoff?: () => void
  onCompanyHandoff?: () => void
}

export default function HiringWorkspace({
  fromGrower,
  fromColleges,
  onGrowerHandoff,
  onCompanyHandoff,
}: HiringWorkspaceProps) {
  const [selectedCandidate, setSelectedCandidate] = useState(0)

  return (
    <div className="hiring-product">
      <section className="hiring-product-hero">
        <div className="hiring-hero-copy">
          <div className="eyebrow">Hiring</div>
          <Heading level={1}>See capability beyond the résumé.</Heading>
          <p>
            HR and recruiters — the best-fit candidate, not the best-keyword
            candidate.
          </p>
          <div className="hiring-role-context">
            <span className="activity-icon">
              <Icon name="people" size={17} />
            </span>
            <div>
              <small>Active hiring decision</small>
              <strong>Machine Learning Platform Engineer</strong>
              <span>
                {fromGrower
                  ? "Role context connected from a Grower opportunity."
                  : fromColleges
                    ? "Capability context connected from Colleges."
                    : "Illustrative role and candidate evidence."}
              </span>
            </div>
          </div>
        </div>

        <div className="hiring-hero-decision">
          <span>Decision intelligence · Demo</span>
          <strong>3</strong>
          <p>
            candidates ranked through skills, evidence and transferable
            capability.
          </p>
          <div>
            <small>Role capabilities</small>
            <b>8 mapped</b>
            <small>Evidence signals</small>
            <b>24 reviewed</b>
          </div>
        </div>
      </section>

      <PredictedMatch
        selectedCandidate={selectedCandidate}
        onSelectCandidate={setSelectedCandidate}
      />

      <ShadowAudit />

      <SkillDecay />

      <TeamFitView />

      <CalibratedQuestions selectedCandidate={selectedCandidate} />

      <div className="hiring-ending">
        <div>
          <span>Hiring outcome</span>
          <Heading level={3}>
            Choose with evidence, understand trade-offs, and see what the
            candidate adds.
          </Heading>
        </div>
        <div className="button-row">
          <Button variant="secondary" onClick={onGrowerHandoff}>
            Review adjacent talent
          </Button>
          <Button icon="arrow" onClick={onCompanyHandoff}>
            See workforce impact
          </Button>
        </div>
      </div>
    </div>
  )
}
