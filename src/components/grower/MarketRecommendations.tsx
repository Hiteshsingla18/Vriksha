import { useState } from "react"
import { growerRecommendations } from "../../data/growerData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

export default function MarketRecommendations() {
  const [marketLens, setMarketLens] = useState("Predicted 2–3 years")

  return (
    <section className="grower-feature-section" id="market-recommendations">
      <div className="grower-section-heading">
        <div>
          <div className="card-label">01 · What to watch next</div>
          <Heading level={2}>Market Recommendations</Heading>
          <p>Current + predicted-market growth suggestions.</p>
        </div>
        <span className="grower-demo-label">Illustrative market signals</span>
      </div>

      <div className="market-lens">
        <span>Market lens</span>
        {["Current direction", "Predicted 2–3 years"].map((lens) => (
          <button
            type="button"
            key={lens}
            className={marketLens === lens ? "active" : ""}
            onClick={() => setMarketLens(lens)}
          >
            {lens}
          </button>
        ))}
        <small>{marketLens} · Prototype, not verified forecasting</small>
      </div>

      <div className="market-recommendation-grid">
        {growerRecommendations.map((recommendation, index) => (
          <article
            className={`market-recommendation-card market-${recommendation.status.toLowerCase()}`}
            key={recommendation.role}
          >
            <div className="market-card-top">
              <span>{recommendation.status}</span>
              <small>0{index + 1}</small>
            </div>
            <Heading level={3}>{recommendation.role}</Heading>
            <strong>{recommendation.signal}</strong>
            <p>{recommendation.reason}</p>
            <div className="chip-row">
              {recommendation.skills.map((skill) => (
                <SkillChip key={skill} tone="sage">
                  {skill}
                </SkillChip>
              ))}
            </div>
            <div className="market-next-skill">
              <span>Pay attention to</span>
              <strong>{recommendation.next}</strong>
              <Icon name="arrow" size={14} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
