import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

interface FamilyBriefProps {
  onGeneratePreview: () => void
}

export default function FamilyBrief({ onGeneratePreview }: FamilyBriefProps) {
  const briefPoints = [
    {
      label: "Skills match",
      description: "Comfort with numbers, patterns and clear explanations.",
    },
    {
      label: "Typical work",
      description: "Clean data, investigate questions and share findings.",
    },
    {
      label: "Growth outlook",
      description: "Illustrative view: useful across many industries.",
    },
    {
      label: "Learning path",
      description: "Spreadsheets → SQL → visualisation → portfolio.",
    },
    {
      label: "Alternative paths",
      description: "Business analysis, research and operations.",
    },
  ]

  return (
    <section
      className="explorer-feature-section family-brief-section"
      id="family-brief"
    >
      <div className="explorer-section-heading">
        <div>
          <div className="card-label">03 · Make the conversation easier</div>
          <Heading level={2}>Family Brief</Heading>
          <p>Take a data-backed career conversation home.</p>
        </div>
        <span className="demo-label">One-page prototype</span>
      </div>

      <div className="family-brief-layout">
        <div className="family-brief-copy">
          <Heading level={3}>
            A clear explanation for the people helping you decide.
          </Heading>
          <p>
            Generate a simple one-page view of a career option, what the work
            involves and the alternatives around it—without technical jargon.
          </p>
          <div className="family-conversation-note">
            <Icon name="people" size={18} />
            <span>
              <strong>Designed for a shared conversation</strong>
              Not a recommendation or a promise of an outcome.
            </span>
          </div>
          <Button icon="arrow" onClick={onGeneratePreview}>
            Generate Family Brief
          </Button>
        </div>

        <div className="family-brief-paper">
          <div className="brief-paper-head">
            <span className="brief-logo">VRIKSHA</span>
            <span>Family Brief · Demo</span>
          </div>
          <small>Career being explored</small>
          <Heading level={2}>Data Analyst</Heading>
          <p>
            Turns information into clear questions, patterns and decisions for
            organisations.
          </p>
          <strong>Why this path</strong>
          <div className="brief-reason-grid">
            {briefPoints.map((item, index) => (
              <div key={item.label}>
                <span>0{index + 1}</span>
                <p>
                  <strong>{item.label}</strong>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
