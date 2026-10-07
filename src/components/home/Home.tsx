import { PortalId } from "../../types"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import AnimatedTree from "./AnimatedTree"

interface HomeProps {
  onNavigate: (id: PortalId) => void
}

export default function Home({ onNavigate }: HomeProps) {
  const journeySteps: [string, string, PortalId][] = [
    ["Explore a direction", "Explorer", "explorer"],
    ["Build evidence", "Builder", "builder"],
    ["Find an adjacent leap", "Grower", "grower"],
    ["Connect learning to demand", "Colleges", "colleges"],
    ["Match with opportunity", "Hiring", "hiring"],
    ["Plan future capability", "Company", "company"],
  ]

  return (
    <main>
      <section className="hero">
        <div className="hero-heading">
          <Heading level={1}>
            One platform.
            <br />
            <em>Six perspectives.</em>
          </Heading>
        </div>
        <div className="hero-visual">
          <AnimatedTree onNavigate={onNavigate} />
        </div>
        <div className="button-row hero-actions">
          <Button onClick={() => onNavigate("explorer")} icon="arrow">
            Explore Vriksha
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              document
                .querySelector("#ecosystem")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            See how it works
          </Button>
        </div>
      </section>

      <section className="journey-section" id="ecosystem">
        <div className="journey-copy">
          <div className="eyebrow light">One connected journey</div>
          <Heading>
            From first question
            <br />
            to workforce decision.
          </Heading>
          <div className="journey-text">
            A career isn't a single choice. Vriksha makes every next step
            visible—and connects individual ambition to real market needs.
          </div>
          <Button
            variant="secondary"
            onClick={() => onNavigate("builder")}
            icon="arrow"
          >
            Follow the pathway
          </Button>
        </div>
        <div className="journey-path">
          {journeySteps.map(([step, portal, id], i) => (
            <button
              className="journey-step"
              key={step}
              onClick={() => onNavigate(id)}
              type="button"
            >
              <span>0{i + 1}</span>
              <div>
                {step}
                <small>{portal}</small>
              </div>
              <Icon name="arrow" size={17} />
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
