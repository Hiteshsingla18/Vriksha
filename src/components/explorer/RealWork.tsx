import { useState, useMemo } from "react"
import { explorerRooms } from "../../data/explorerData"
import { CareerRoom } from "../../types"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

interface RealWorkProps {
  onSelectRoom?: (room: CareerRoom) => void
}

interface Scenario {
  role: string
  domainKey: string
  roomField: string
  personaTitle: string
  situation: string
  question: string
  resonanceTrait: string
}

export default function RealWork({ onSelectRoom }: RealWorkProps) {
  const [reactions, setReactions] = useState<Record<string, string>>({})

  const workScenarios: Scenario[] = [
    {
      role: "Data Scientist",
      domainKey: "ai-data-science",
      roomField: "AI & Deep Learning",
      personaTitle: "Statistical Modeler & Causal Reasoner",
      situation:
        "A business stakeholder asks you to guarantee 99% accuracy on a customer churn model before checking class imbalance.",
      question:
        "You need to explain precision/recall trade-offs, design an ROC-AUC benchmark, and align on realistic business ROI.",
      resonanceTrait: "Enjoys statistical rigor, experiment design, and balancing technical nuance with commercial expectations.",
    },
    {
      role: "Big Data Engineer",
      domainKey: "big-data",
      roomField: "Big Data Engineering",
      personaTitle: "Systems Architect & Pipeline Builder",
      situation:
        "At 2 AM, the nocturnal batch ETL pipeline fails due to an unexpected null byte in an upstream Kafka event stream.",
      question:
        "You need to inspect the dead-letter queue, patch the PySpark schema inference, and re-trigger without duplicating rows.",
      resonanceTrait: "Thrives on high-throughput distributed systems, operational reliability, and deep troubleshooting under pressure.",
    },
    {
      role: "BI & Analytics Consultant",
      domainKey: "analytics",
      roomField: "Data Analytics & BI",
      personaTitle: "Executive Strategist & Visual Storyteller",
      situation:
        "Two department heads present conflicting revenue numbers for the exact same quarter from two separate dashboards.",
      question:
        "You need to audit the underlying SQL joins, isolate duplicate transaction attribution, and unify the metric logic.",
      resonanceTrait: "Excel at cross-functional diplomacy, data governance, and turning confusing database rows into authoritative clarity.",
    },
    {
      role: "MLOps Platform Lead",
      domainKey: "mlops",
      roomField: "Machine Learning Engineering",
      personaTitle: "Infrastructure Optimizer & Reliability Engineer",
      situation:
        "The GPU cloud bill doubled over the weekend because an unquantized deep learning model was deployed with no autoscale limits.",
      question:
        "You need to profile memory consumption, implement INT8 quantization, and establish strict rate-limiting policies.",
      resonanceTrait: "Drawn to cloud efficiency, model monitoring, scalable production architecture, and cost governance.",
    },
  ]

  const options = ["Excited", "Curious", "Neutral", "Not for me"]

  const reactionWeights: Record<string, number> = {
    Excited: 100,
    Curious: 75,
    Neutral: 45,
    "Not for me": 15,
  }

  // Calculate scores
  const answeredCount = Object.keys(reactions).length

  // Calculate top affinity using useMemo to preserve proper typing
  const topScenario = useMemo<Scenario | null>(() => {
    let bestScore = -1
    let bestScenario: Scenario | null = null
    for (const s of workScenarios) {
      const r = reactions[s.role]
      if (r) {
        const score = reactionWeights[r] || 0
        if (score > bestScore) {
          bestScore = score
          bestScenario = s
        }
      }
    }
    return bestScenario
  }, [reactions])

  // Find corresponding Career Room for top scenario
  const matchingRoom = useMemo(() => {
    if (!topScenario) return null
    return (
      explorerRooms.find(
        (r) =>
          r.field.toLowerCase() === topScenario.roomField.toLowerCase() ||
          r.title.toLowerCase().includes(topScenario.role.toLowerCase())
      ) || explorerRooms[0]
    )
  }, [topScenario])

  const handleReset = () => {
    setReactions({})
  }

  return (
    <section
      className="explorer-feature-section real-work-section"
      id="react-to-real-work"
    >
      <div className="explorer-section-heading">
        <div>
          <div className="card-label">04 · Notice your reaction</div>
          <Heading level={2}>React to Real Work</Heading>
          <p>Don&apos;t just read a job description. Notice how actual production friction feels.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="demo-label">Interactive Resonance Engine</span>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[rgba(32,80,61,0.08)] text-[var(--forest-800)] font-semibold border border-[rgba(32,80,61,0.18)]">
            {answeredCount} of {workScenarios.length} Scenarios Rated
          </span>
        </div>
      </div>

      <div className="real-work-grid">
        {workScenarios.map((item, index) => {
          const currentReaction = reactions[item.role]
          return (
            <article className="real-work-card" key={item.role}>
              <div className="real-work-card-head">
                <span className="activity-icon">
                  <Icon name="target" size={15} />
                </span>
                <div>
                  <small>Day-in-the-life Operational Friction</small>
                  <Heading level={3}>{item.role}</Heading>
                </div>
              </div>
              <blockquote>“{item.situation}”</blockquote>
              <p>{item.question}</p>

              <div
                className="reaction-options"
                aria-label={`Reaction to ${item.role}`}
              >
                {options.map((reaction) => (
                  <button
                    type="button"
                    key={reaction}
                    className={currentReaction === reaction ? "active" : ""}
                    onClick={() =>
                      setReactions((current) => ({
                        ...current,
                        [item.role]: reaction,
                      }))
                    }
                  >
                    {reaction}
                  </button>
                ))}
              </div>

              {currentReaction && (
                <div className="reaction-confirmation" role="status">
                  <Icon name="check" size={14} />
                  <span>
                    Rated: <strong>{currentReaction}</strong> (Affinity: {reactionWeights[currentReaction]}%)
                  </span>
                </div>
              )}
              <span className="real-work-index">0{index + 1}</span>
            </article>
          )
        })}
      </div>

      {/* Real-time Work Resonance Synthesis Card */}
      {answeredCount > 0 && topScenario && (
        <div className="mt-6 p-5 rounded-xl border border-[rgba(32,80,61,0.22)] bg-[rgba(32,80,61,0.03)] shadow-xs animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[rgba(32,80,61,0.15)] pb-3 mb-4">
            <div>
              <span className="text-[10px] font-bold tracking-wider text-[var(--forest-800)] uppercase block">
                Synthesized Behavioral Resonance Telemetry
              </span>
              <h3 className="text-base font-bold text-[var(--text)] m-0">
                Your Natural Operational Alignment: <span className="text-[var(--forest-900)]">{topScenario.role}</span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 rounded-full bg-[rgba(32,80,61,0.1)] text-[var(--forest-900)] font-bold">
                Persona: {topScenario.personaTitle}
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] underline cursor-pointer px-1"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
            <div>
              <span className="font-semibold text-[var(--text)] block mb-1">
                Why this feels natural to you:
              </span>
              <p className="text-[var(--text-muted)] leading-relaxed m-0">
                {topScenario.resonanceTrait}
              </p>
            </div>

            <div>
              <span className="font-semibold text-[var(--text)] block mb-1.5">
                Resonance Breakdown Across Scenarios:
              </span>
              <div className="space-y-1.5">
                {workScenarios.map((s) => {
                  const r = reactions[s.role]
                  const val = r ? reactionWeights[r] : 0
                  return (
                    <div key={s.role} className="flex items-center gap-2">
                      <span className="w-36 truncate text-[11px] text-[var(--text-muted)]">
                        {s.role}
                      </span>
                      <div className="flex-1 bg-[rgba(0,0,0,0.06)] rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${val}%`,
                            backgroundColor:
                              val >= 75
                                ? "var(--forest-800)"
                                : val >= 45
                                ? "var(--amber)"
                                : "var(--text-soft)",
                          }}
                        />
                      </div>
                      <span className="w-10 text-right font-mono text-[11px] font-semibold">
                        {val}%
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {matchingRoom && onSelectRoom && (
            <div className="pt-3 border-t border-[rgba(32,80,61,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-[var(--text-muted)]">
                Ready to try this slice? Step into the simulated {matchingRoom.title} Career Room.
              </span>
              <button
                type="button"
                onClick={() => onSelectRoom(matchingRoom)}
                className="text-xs px-4 py-2 rounded-lg bg-[var(--forest-800)] hover:bg-[var(--forest-900)] text-white font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Step into {matchingRoom.title} slice</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
