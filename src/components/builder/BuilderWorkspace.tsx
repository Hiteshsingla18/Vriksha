import { builderSections } from "../../data/builderData"
import { useActiveSection } from "../../hooks/useActiveSection"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import ProgressBar from "../common/ProgressBar"
import CompetenceChart from "./CompetenceChart"
import MicroProject from "./MicroProject"
import SkillTreeOverlay from "./SkillTreeOverlay"
import StuckDetector from "./StuckDetector"
import TrailMatching from "./TrailMatching"

interface BuilderWorkspaceProps {
  fromExplorer?: boolean
  fromGrower?: boolean
  fromColleges?: boolean
  fromHiring?: boolean
  view: number
  onViewChange: (view: number) => void
  onGrowerHandoff: () => void
  scrollTargetRef: { current: string | null }
}

export default function BuilderWorkspace({
  fromExplorer = false,
  fromGrower = false,
  fromColleges = false,
  fromHiring = false,
  onViewChange,
  onGrowerHandoff,
  scrollTargetRef,
}: BuilderWorkspaceProps) {
  // Register scroll spy
  useActiveSection(builderSections, onViewChange, scrollTargetRef)

  const targetRole = fromGrower
    ? "MLOps Engineer"
    : fromColleges
      ? "Cloud Skills Pathway"
      : fromHiring
        ? "Candidate Capability Path"
        : "Machine Learning Engineer"

  return (
    <div className="builder-product">
      <section className="builder-product-hero">
        <div className="builder-hero-copy">
          <div className="eyebrow">Builder</div>
          <Heading level={1}>Build the path, not another course list.</Heading>
          <p>
            Career chosen, stuck on how to build it — tell me exactly where I
            need help.
          </p>
          <div className="builder-target-role">
            <span className="activity-icon">
              <Icon name="target" size={17} />
            </span>
            <div>
              <small>Active target role</small>
              <strong>{targetRole}</strong>
              <span>
                {fromExplorer || fromGrower || fromColleges || fromHiring
                  ? "Context carried forward from your connected Vriksha journey."
                  : "Illustrative Builder target for this prototype."}
              </span>
            </div>
          </div>
        </div>

        <div className="builder-hero-progress">
          <span>Target readiness · Illustrative</span>
          <strong>64%</strong>
          <ProgressBar value={64} tone="gold" />
          <div>
            <small>3 verified strengths</small>
            <small>4 ranked gaps</small>
          </div>
        </div>
      </section>

      {/* 01. Tree Overlay */}
      <SkillTreeOverlay targetRole={targetRole} />

      {/* 02. Stuck Detector */}
      <StuckDetector />

      {/* 03. Micro-Project */}
      <MicroProject />

      {/* 04. Trail Matching */}
      <TrailMatching />

      {/* 05. Confidence vs Competence */}
      <CompetenceChart />

      <div className="builder-ending">
        <div>
          <span>Builder outcome</span>
          <Heading level={3}>
            One clear gap. One useful project. Evidence you can trust.
          </Heading>
        </div>
        <Button variant="secondary" icon="arrow" onClick={onGrowerHandoff}>
          See where this growth could lead
        </Button>
      </div>
    </div>
  )
}
