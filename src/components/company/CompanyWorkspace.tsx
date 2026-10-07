import Heading from "../common/Heading"
import Icon from "../common/Icon"
import AttritionRisk from "./AttritionRisk"
import BenchRadar from "./BenchRadar"
import BuildBuySimulator from "./BuildBuySimulator"
import MobilityPathways from "./MobilityPathways"

interface CompanyWorkspaceProps {
  fromHiring?: boolean
}

export default function CompanyWorkspace({
  fromHiring,
}: CompanyWorkspaceProps) {
  return (
    <div className="company-product">
      <section className="company-product-hero">
        <div className="company-hero-copy">
          <div className="eyebrow">Company</div>
          <Heading level={1}>
            Plan capability before the gap becomes urgent.
          </Heading>
          <p>
            Train existing staff or hire new — build or buy, proven with numbers.
          </p>
          <div className="company-strategy-context">
            <span className="activity-icon">
              <Icon name="building" size={17} />
            </span>
            <div>
              <small>Active workforce question</small>
              <strong>Build AI Engineering capability</strong>
              <span>
                {fromHiring
                  ? "Open-role demand is connected from Hiring."
                  : "Illustrative workforce, cost and mobility information."}
              </span>
            </div>
          </div>
        </div>
        <div className="company-hero-decision">
          <span>Enterprise decision view · Demo</span>
          <div className="company-build-buy-mark">
            <strong>BUILD</strong>
            <i>or</i>
            <strong>BUY</strong>
          </div>
          <p>
            Compare capability freshness, economics, internal mobility and
            retention signals.
          </p>
        </div>
      </section>

      <BenchRadar />

      <BuildBuySimulator />

      <MobilityPathways />

      <AttritionRisk />

      <div className="company-ending">
        <div>
          <span>Company outcome</span>
          <Heading level={3}>
            Know what to refresh, what to build, when to hire, and where to
            intervene.
          </Heading>
        </div>
        <span className="company-demo-label">
          Workforce strategy prototype
        </span>
      </div>
    </div>
  )
}
