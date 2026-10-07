import { growerSections } from "../../data/growerData"
import { useActiveSection } from "../../hooks/useActiveSection"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import AdjacentLeap from "./AdjacentLeap"
import CompensationTrajectory from "./CompensationTrajectory"
import MarketRecommendations from "./MarketRecommendations"
import MentorSection from "./MentorSection"
import SkillHalfLife from "./SkillHalfLife"
import { MarketRadarFlightDeck } from "./MarketRadarFlightDeck"

interface GrowerWorkspaceProps {
  fromBuilder?: boolean
  view: number
  onViewChange: (view: number) => void
  onBuilderHandoff: () => void
  onHiringHandoff: () => void
  scrollTargetRef: { current: string | null }
}

export default function GrowerWorkspace({
  fromBuilder = false,
  onViewChange,
  onBuilderHandoff,
  onHiringHandoff,
  scrollTargetRef,
}: GrowerWorkspaceProps) {
  // Register scroll spy
  useActiveSection(growerSections, onViewChange, scrollTargetRef)

  return (
    <div className="grower-product">
      <section className="grower-product-hero">
        <div className="grower-hero-copy">
          <div className="eyebrow">Grower</div>
          <Heading level={1}>See where your experience can grow next.</Heading>
          <p>
            Working professional — where is the market going, and where do I fit
            in it?
          </p>
          <div className="grower-current-context">
            <span className="activity-icon">
              <Icon name="branch" size={17} />
            </span>
            <div>
              <small>Current professional context</small>
              <strong>Software Developer · 5 years</strong>
              <span>
                {fromBuilder
                  ? "Builder progress is included in this market view."
                  : "Illustrative skill profile: Python, SQL, APIs and system design."}
              </span>
            </div>
          </div>
        </div>

        <div className="grower-market-pulse">
          <span>Forward view · Demo intelligence</span>
          <div className="market-pulse-orbit">
            <strong>4</strong>
            <small>nearby growth directions</small>
            <i />
            <i />
            <i />
          </div>
          <p>
            Market direction, skill runway and adjacent roles in one connected
            view.
          </p>
        </div>
      </section>

      <div className="mb-8">
        <MarketRadarFlightDeck />
      </div>

      {/* 01. Market Recommendations */}
      <MarketRecommendations />

      {/* 02. Skill Half-Life */}
      <SkillHalfLife />

      {/* 03. Adjacent Leap */}
      <AdjacentLeap onBuilderHandoff={onBuilderHandoff} />

      {/* 04. Compensation Trajectory */}
      <CompensationTrajectory />

      {/* 05. Future-You Mentor */}
      <MentorSection />

      <div className="grower-ending">
        <div>
          <span>Grower outcome</span>
          <Heading level={3}>
            See the signal. Understand your runway. Make a credible next move.
          </Heading>
        </div>
        <Button variant="secondary" icon="arrow" onClick={onHiringHandoff}>
          See connected opportunities
        </Button>
      </div>
    </div>
  )
}
