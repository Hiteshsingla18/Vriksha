import { useState } from "react"
import { CareerRoom } from "../../types"
import MiniVirtualLab from "./MiniVirtualLab"

interface CareerRoomDetailProps {
  room: CareerRoom
  onBack: () => void
}

const tabs = [
  { id: "overview", label: "The landscape", icon: "◉" },
  { id: "lab", label: "Virtual lab", icon: "⌘" },
]

export default function CareerRoomDetail({
  room,
  onBack,
}: CareerRoomDetailProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "lab">("overview")
  const [completedTasks, setCompletedTasks] = useState<boolean[]>(() =>
    new Array(room.tasks?.length || 0).fill(false)
  )
  const [labSucceeded, setLabSucceeded] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const tasks = room.tasks || []
  const doneCount = completedTasks.filter(Boolean).length
  const totalSteps = tasks.length + (room.lab ? 1 : 0)
  const completedSteps = doneCount + (labSucceeded ? 1 : 0)
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0
  const canComplete = doneCount === tasks.length && (room.lab ? labSucceeded : true)

  const toggleTask = (index: number) => {
    setCompletedTasks((prev) => {
      const copy = [...prev]
      copy[index] = !copy[index]
      return copy
    })
  }

  const handleCompleteRoom = () => {
    setIsCompleted(true)
  }

  return (
    <div className="detail-content animate-fadeIn">
      <div className="flex items-center justify-between pb-2">
        <button className="back-button" onClick={onBack} type="button">
          <span aria-hidden="true">←</span> Back to All Career Rooms
        </button>
        <button
          type="button"
          onClick={onBack}
          className="text-xs px-2.5 py-1 rounded bg-[rgba(0,0,0,0.06)] hover:bg-[rgba(0,0,0,0.12)] text-[var(--text-muted)] cursor-pointer"
        >
          Close [Esc]
        </button>
      </div>

      <header className="room-header">
        <span className="room-header-icon">{room.icon || "◈"}</span>
        <div className="room-header-copy">
          <p className="eyebrow">
            {room.field.toUpperCase()} <span className="crumb-slash">/</span> CAREER ROOM
          </p>
          <h1>{room.title}</h1>
          <p>{room.description}</p>
        </div>
        <div className="room-header-status">
          <span className={`status-tag ${isCompleted ? "status-complete" : ""}`}>
            <span className={isCompleted ? "" : "status-live-dot"}>
              {isCompleted ? "✓" : "●"}
            </span>
            {isCompleted ? "ROOM COMPLETE" : "ROOM IN PROGRESS"}
          </span>
          <span className="room-time">◷ &nbsp;{room.time} interactive slice</span>
        </div>
      </header>

      <div className="room-progress-card">
        <div className="progress-copy">
          <span className="progress-label">YOUR ROOM PROGRESS</span>
          <span className="progress-count">
            {doneCount} of {tasks.length} steps <span>·</span>{" "}
            {room.lab ? (labSucceeded ? "Lab passed ✓" : "Lab in progress") : "No lab"}
          </span>
        </div>
        <div
          aria-label={`${progressPercent}% complete`}
          className="progress-track"
        >
          <span style={{ width: `${progressPercent}%` }} />
        </div>
        <span className="progress-percent">{progressPercent}%</span>
      </div>

      <div
        aria-label="Career room sections"
        className="room-tabs"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            aria-selected={activeTab === tab.id}
            className={`room-tab ${activeTab === tab.id ? "selected" : ""}`}
            onClick={() => setActiveTab(tab.id as "overview" | "lab")}
            role="tab"
            type="button"
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.id === "lab" && room.lab && (
              <span className={`lab-tab-status ${labSucceeded ? "done" : ""}`}>
                {labSucceeded ? "✓" : "1"}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="room-workspace">
        <div className="room-main-column">
          {activeTab === "overview" ? (
            <>
              {room.workOverview && (
                <section className="overview-card">
                  <div className="card-overline">
                    <span className="overline-icon">◉</span> DAY IN THE LIFE & WORK CONTEXT
                  </div>
                  <h2>Real Work Reality</h2>
                  {room.workOverview.map((paragraph, i) => (
                    <p key={i} className="landscape-copy">
                      {paragraph}
                    </p>
                  ))}
                  <div className="day-flow">
                    <span><i className="flow-dot flow-green" /> Frame decision</span>
                    <span className="flow-connector" />
                    <span><i className="flow-dot flow-blue" /> Profile source</span>
                    <span className="flow-connector" />
                    <span><i className="flow-dot flow-amber" /> Test & validate</span>
                    <span className="flow-connector" />
                    <span><i className="flow-dot flow-green" /> Deliver impact</span>
                  </div>
                </section>
              )}

              {room.trends && (
                <section className="insights-card">
                  <div className="card-overline">
                    <span className="overline-icon">⌘</span> MARKET CONTEXT
                  </div>
                  <h2>Signals Shaping This Role</h2>
                  <p className="card-subtitle">
                    Synthesized from 15,800+ live Data Science & Analytics job postings across Indian tech hubs.
                  </p>
                  <ul className="trend-list">
                    {room.trends.map((trend, i) => (
                      <li key={i}>
                        <span className="trend-check">✓</span>
                        <span>{trend}</span>
                      </li>
                    ))}
                  </ul>

                  {room.tools && (
                    <>
                      <div className="tool-divider" />
                      <div className="mini-heading">STACK & ESSENTIAL TOOLS</div>
                      <div className="tool-chips">
                        {room.tools.map((tool, i) => (
                          <span key={i} className="tool-chip">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {room.halfLife && (
                    <div className="half-life">
                      <span className="half-life-icon">◷</span>
                      <div>
                        <strong>Skill Durability & Half-Life:</strong> {room.halfLife}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {room.growth && (
                <section className="growth-card">
                  <div className="card-overline">
                    <span className="overline-icon">◈</span> CAREER RUNWAY
                  </div>
                  <h2>Career Progression Ladder</h2>
                  <div className="growth-path">
                    {room.growth.map((title, i) => (
                      <div key={i} className="growth-step">
                        <span className={`growth-number ${i === 1 ? "current" : ""}`}>
                          {i + 1}
                        </span>
                        {i < (room.growth?.length || 0) - 1 && (
                          <span className="growth-connector" />
                        )}
                        <span className="growth-label">{title}</span>
                      </div>
                    ))}
                  </div>
                  {room.careerRunway && (
                    <p className="card-subtitle mt-3">
                      <strong>Ladder Dynamics:</strong> {room.careerRunway}
                    </p>
                  )}
                </section>
              )}
            </>
          ) : (
            <>
              {room.lab ? (
                <MiniVirtualLab
                  lab={room.lab}
                  succeeded={labSucceeded}
                  onSuccess={() => setLabSucceeded(true)}
                />
              ) : (
                <div className="virtual-lab-card p-6">
                  <h3>No Virtual Lab configured for this room.</h3>
                </div>
              )}
            </>
          )}
        </div>

        <aside className="room-side-column">
          <div className="checklist-card">
            <div className="checklist-heading">
              <span className="card-overline">WORK SLICE CHECKLIST</span>
              <span className="checklist-count">
                {doneCount} / {tasks.length}
              </span>
            </div>
            <h2>Daily Work Steps</h2>
            <p className="checklist-intro">
              Mark tasks as you review the operational reality.
            </p>

            <div className="task-list">
              {tasks.map((task, index) => {
                const isChecked = completedTasks[index]
                return (
                  <label
                    key={index}
                    className={`task-item ${isChecked ? "task-done" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleTask(index)}
                    />
                    <span className="custom-checkbox">
                      {isChecked ? "✓" : ""}
                    </span>
                    <span className="task-text">
                      <span className="task-step-label">STEP 0{index + 1}</span>
                      <strong>{task.title}</strong>
                      <span>{task.description}</span>
                    </span>
                  </label>
                )
              })}
            </div>

            <button
              type="button"
              className="complete-room-button"
              disabled={!canComplete || isCompleted}
              onClick={handleCompleteRoom}
            >
              <span>{isCompleted ? "Room Completed ✓" : "Complete Career Room"}</span>
              <span>→</span>
            </button>

            {!canComplete && !isCompleted && (
              <p className="completion-hint">
                Check all {tasks.length} tasks and pass the Virtual Lab to complete this room.
              </p>
            )}

            {isCompleted && (
              <div className="room-complete-message">
                <span>✓</span>
                <div>
                  <strong>Room milestone recorded!</strong>
                  <p className="m-0">
                    Your demonstrated competence has been added to your Talent Graph.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="graph-card">
            <span className="graph-card-icon">◈</span>
            <div>
              <h3>Talent Graph Synchronization</h3>
              <p>
                Steps completed in this room provide empirical behavioral evidence for your Vriksha radar.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
