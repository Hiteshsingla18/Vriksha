import { useState } from "react"
import { VirtualLabScenario } from "../../types"

interface MiniVirtualLabProps {
  lab: VirtualLabScenario
  succeeded: boolean
  onSuccess: () => void
}

function LabFrame({
  lab,
  succeeded,
  children,
}: {
  lab: VirtualLabScenario
  succeeded: boolean
  children: React.ReactNode
}) {
  return (
    <article className="virtual-lab-card">
      <div className="lab-card-header">
        <div>
          <div className="card-overline">
            <span className="overline-icon">⌘</span> MINI VIRTUAL LAB{" "}
            <span className="lab-level">HANDS-ON SIMULATION</span>
          </div>
          <h2>{lab.title}</h2>
          <p className="card-subtitle">{lab.description}</p>
        </div>
        <span className={`lab-status ${succeeded ? "lab-status-done" : ""}`}>
          <i />
          {succeeded ? "PASSED" : "IN PROGRESS"}
        </span>
      </div>
      {children}
      <div className="lab-safety-note">
        <span>✳</span> Real-world Data Science simulation based on 15,800+ job dataset competencies.
      </div>
    </article>
  )
}

export default function MiniVirtualLab({
  lab,
  succeeded,
  onSuccess,
}: MiniVirtualLabProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)

  const submit = () => {
    if (selected === lab.answer) {
      onSuccess()
    }
    setChecked(true)
  }

  const handleReset = () => {
    setSelected(null)
    setChecked(false)
  }

  return (
    <LabFrame lab={lab} succeeded={succeeded}>
      <div className="scenario-panel">
        <span className="scenario-label">
          <span>01</span> A MOMENT TO THINK · CRITICAL WORKFLOW DECISION
        </span>
        <h3>{lab.question}</h3>
        <div className="scenario-options">
          {lab.options.map((option, index) => {
            const isSelected = selected === index
            const isCorrect = checked && index === lab.answer
            const isIncorrect = checked && isSelected && index !== lab.answer

            return (
              <button
                key={option}
                type="button"
                aria-pressed={isSelected}
                disabled={succeeded}
                className={`scenario-option ${isSelected ? "option-selected" : ""} ${
                  isCorrect ? "option-correct" : ""
                } ${isIncorrect ? "option-incorrect" : ""}`}
                onClick={() => {
                  if (!succeeded) {
                    setSelected(index)
                    setChecked(false)
                  }
                }}
              >
                <span className="option-marker">
                  {isCorrect ? "✓" : String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </button>
            )
          })}
        </div>

        <div className="lab-controls">
          <span>
            {succeeded
              ? "Simulation challenge verified!"
              : selected === null
              ? "Choose the strongest data science next step."
              : "Ready to check your thinking."}
          </span>
          <div className="flex items-center gap-2">
            {checked && !succeeded && (
              <button
                type="button"
                onClick={handleReset}
                className="lab-action-button"
                style={{ opacity: 0.8 }}
              >
                Try again
              </button>
            )}
            <button
              type="button"
              className="lab-action-button"
              disabled={selected === null || succeeded}
              onClick={submit}
            >
              {succeeded ? "Check passed ✓" : "Check my answer →"}
            </button>
          </div>
        </div>

        {checked && !succeeded && (
          <p aria-live="polite" className="inline-feedback">
            Not quite. Revisit the choices, reflect on production data safeguards, and try another approach.
          </p>
        )}
        {succeeded && (
          <p className="success-detail">
            ✓ Excellent choice. Clear reasoning, reproducible evaluation, and sound pipeline governance are verified competencies in this domain.
          </p>
        )}
      </div>
    </LabFrame>
  )
}
