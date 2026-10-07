import { useState } from "react"
import Heading from "../common/Heading"

export default function RegretRadar() {
  const [radarField, setRadarField] = useState("All fields")
  const [radarEducation, setRadarEducation] = useState("All education levels")
  const [radarStage, setRadarStage] = useState("Exploring")

  const radarStats = [
    { value: "42%", label: "wished they had explored the day-to-day work earlier." },
    { value: "31%", label: "underestimated how much of the role involved communication." },
    { value: "27%", label: "changed direction after experiencing real work." },
    { value: "19%", label: "chose mainly because of external expectations." },
  ]

  return (
    <section
      className="explorer-feature-section regret-radar-section"
      id="regret-radar"
    >
      <div className="explorer-section-heading">
        <div>
          <div className="card-label">02 · Learn from hindsight</div>
          <Heading level={2}>Regret Radar</Heading>
          <p>Learn from people who would have chosen differently.</p>
        </div>
        <span className="demo-label light">Illustrative demo data</span>
      </div>

      <div className="radar-filter-row">
        <label>
          <span>Field</span>
          <select
            value={radarField}
            onChange={(e) => setRadarField(e.target.value)}
          >
            <option>All fields</option>
            <option>Technology</option>
            <option>Business</option>
            <option>Creative fields</option>
          </select>
        </label>
        <label>
          <span>Education level</span>
          <select
            value={radarEducation}
            onChange={(e) => setRadarEducation(e.target.value)}
          >
            <option>All education levels</option>
            <option>Senior secondary</option>
            <option>Undergraduate</option>
            <option>Postgraduate</option>
          </select>
        </label>
        <label>
          <span>Career stage</span>
          <select
            value={radarStage}
            onChange={(e) => setRadarStage(e.target.value)}
          >
            <option>Exploring</option>
            <option>Early career</option>
            <option>Changing direction</option>
          </select>
        </label>
      </div>

      <div className="radar-context">
        Viewing illustrative patterns for <strong>{radarField}</strong>,{" "}
        <strong>{radarEducation.toLowerCase()}</strong>,{" "}
        <strong>{radarStage.toLowerCase()}</strong>.
      </div>

      <div className="regret-radar-layout">
        <div className="radar-visual flex flex-col items-center justify-center p-4">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center rounded-full border border-[var(--forest-700)] bg-[radial-gradient(circle,rgba(183,219,67,0.09),transparent_65%)]">
            {/* Concentric rings */}
            <div className="absolute inset-8 rounded-full border border-[var(--forest-700)]/60 pointer-events-none" />
            <div className="absolute inset-16 rounded-full border border-[var(--forest-700)]/40 pointer-events-none" />
            <div className="absolute inset-y-0 left-1/2 w-px border-l border-[var(--forest-700)]/40 pointer-events-none" />
            <div className="absolute inset-x-0 top-1/2 h-px border-t border-[var(--forest-700)]/40 pointer-events-none" />

            {/* Center metric */}
            <div className="z-10 w-20 h-20 rounded-full flex items-center justify-center bg-[var(--lime-500)] text-[var(--forest-950)] font-serif text-2xl shadow-lg">
              42%
            </div>

            {/* Radar signal indicators */}
            <span
              className="absolute w-3 h-3 rounded-full bg-[var(--lime-300)] shadow-[0_0_0_5px_rgba(216,237,139,0.15)] top-[25%] left-[22%]"
              title="Work misalignment signal"
            />
            <span
              className="absolute w-3 h-3 rounded-full bg-[var(--lime-300)] shadow-[0_0_0_5px_rgba(216,237,139,0.15)] top-[35%] right-[20%]"
              title="Communication underestimation"
            />
            <span
              className="absolute w-3 h-3 rounded-full bg-[var(--lime-300)] shadow-[0_0_0_5px_rgba(216,237,139,0.15)] bottom-[20%] left-[32%]"
              title="Late direction shift"
            />
            <span
              className="absolute w-3 h-3 rounded-full bg-[var(--warm)] shadow-[0_0_0_5px_rgba(197,140,83,0.15)] top-[18%] right-[32%]"
              title="External pressure signal"
            />
          </div>
          <small className="block mt-4 text-[10px] text-[var(--sage-500)] text-center">
            Illustrative signal map · based on reflective interviews
          </small>
        </div>

        <div className="radar-insights">
          <div className="radar-insight-feature">
            <span>What people wish they knew earlier</span>
            <Heading level={3}>
              The day-to-day work matters more than the title.
            </Heading>
            <p>
              The strongest illustrative pattern is a desire to have experienced
              ordinary work before committing to a path.
            </p>
          </div>
          {radarStats.map((item) => (
            <div className="radar-stat" key={item.value}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
