"use client";

import { useState } from "react";
import MiniVirtualLab from "./MiniVirtualLab";

const tabs = [
  { id: "overview", label: "The landscape", icon: "◉" },
  { id: "lab", label: "Virtual lab", icon: "⌘" }
];

export default function CareerRoomDetail({
  room,
  completed,
  graphUpdate,
  completedTasks,
  labSucceeded,
  onToggleTask,
  onLabSuccess,
  onBack,
  onComplete
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const domain = room.category;
  const doneCount = completedTasks.filter(Boolean).length;
  const readyToComplete = doneCount === room.tasks.length && labSucceeded;
  const progressPercent = Math.round(
    ((doneCount + Number(labSucceeded)) / (room.tasks.length + 1)) * 100
  );

  return (
    <section className="detail-content">
      <button className="back-button" onClick={onBack} type="button"><span aria-hidden="true">←</span> All career rooms</button>

      <header className="room-header">
        <span className="room-header-icon">{room.icon}</span>
        <div className="room-header-copy">
          <p className="eyebrow">{domain.toUpperCase()} <span className="crumb-slash">/</span> CAREER ROOM</p>
          <h1>{room.title}</h1>
          <p>Explore what the work looks like, then put your thinking into practice.</p>
        </div>
        <div className="room-header-status">
          <span className={`status-tag ${completed ? "status-complete" : ""}`}>
            <span className={completed ? "" : "status-live-dot"}>{completed ? "✓" : "●"}</span>
            {completed ? "ROOM COMPLETE" : "ROOM IN PROGRESS"}
          </span>
          <span className="room-time">◷ &nbsp;About 10 minutes</span>
        </div>
      </header>

      <div className="room-progress-card">
        <div className="progress-copy">
          <span className="progress-label">YOUR ROOM PROGRESS</span>
          <span className="progress-count">{doneCount} of {room.tasks.length} steps <span>·</span> {labSucceeded ? "Lab passed" : "Lab to go"}</span>
        </div>
        <div aria-label={`${progressPercent}% complete`} className="progress-track"><span style={{ width: `${progressPercent}%` }} /></div>
        <span className="progress-percent">{progressPercent}%</span>
      </div>

      <div aria-label="Career room sections" className="room-tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            aria-selected={activeTab === tab.id}
            className={`room-tab ${activeTab === tab.id ? "selected" : ""}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            type="button"
          >
            <span aria-hidden="true">{tab.icon}</span> {tab.label}
            {tab.id === "lab" && <span className={`lab-tab-status ${labSucceeded ? "done" : ""}`}>{labSucceeded ? "✓" : "1"}</span>}
          </button>
        ))}
      </div>

      <div className="room-workspace">
        <div className="room-main-column">
          {activeTab === "overview" ? (
            <>
              <details className="overview-accordion">
                <summary><span className="accordion-icon">◉</span><span className="accordion-title">What the work really looks like</span><span className="year-chip">2026</span><span className="accordion-toggle" aria-hidden="true" /></summary>
                <div className="accordion-content">
                  {(room.workOverview ?? [room.brief]).map((paragraph) => (
                    <p className="landscape-copy" key={paragraph}>{paragraph}</p>
                  ))}
                  <div className="day-flow">
                    <span><i className="flow-dot flow-green" />Focus work</span><span className="flow-connector" />
                    <span><i className="flow-dot flow-blue" />Team decisions</span><span className="flow-connector" />
                    <span><i className="flow-dot flow-amber" />Real-world impact</span>
                  </div>
                </div>
              </details>

              <details className="overview-accordion">
                <summary><span className="accordion-icon">✧</span><span className="accordion-title">What’s changing</span><span className="accordion-toggle" aria-hidden="true" /></summary>
                <div className="accordion-content">
                  <p className="card-subtitle">A few signals shaping this career in 2026.</p>
                  <ul className="trend-list">
                    {room.trends.map((trend) => <li key={trend}><span className="trend-check">↗</span>{trend}</li>)}
                  </ul>
                  <div className="half-life">
                    <span className="half-life-icon">◷</span>
                    <span><strong>Skill half-life, honestly.</strong><br />{room.halfLife}. Keep learning the fundamentals; refresh the tools as the work changes.</span>
                  </div>
                </div>
              </details>

              <details className="overview-accordion">
                <summary><span className="accordion-icon">⌘</span><span className="accordion-title">Tools you’ll meet</span><span className="accordion-toggle" aria-hidden="true" /></summary>
                <div className="accordion-content">
                  <div className="tool-chips">{room.tools.map((tool) => <span className="tool-chip" key={tool}>{tool}</span>)}</div>
                </div>
              </details>

              <details className="overview-accordion">
                <summary><span className="accordion-icon">↗</span><span className="accordion-title">Your growth path</span><span className="accordion-toggle" aria-hidden="true" /></summary>
                <div className="accordion-content">
                  <div className="growth-path">
                    {room.growth.map((step, index) => (
                      <div className="growth-step" key={step}>
                        <span className={`growth-number ${index === 0 ? "current" : ""}`}>{String(index + 1).padStart(2, "0")}</span>
                        {index < room.growth.length - 1 && <span className="growth-connector" />}
                        <span className="growth-label">{step}</span>
                      </div>
                    ))}
                  </div>
                  {room.careerRunway && <p className="card-subtitle">{room.careerRunway}</p>}
                </div>
              </details>
            </>
          ) : (
            <MiniVirtualLab
              key={room.id}
              lab={room.lab}
              onSuccess={onLabSuccess}
              succeeded={labSucceeded}
            />
          )}
        </div>

        <aside className="room-side-column">
          <section className="checklist-card">
            <div className="checklist-heading">
              <div><div className="card-overline"><span className="overline-icon">☑</span> YOUR FIELD NOTES</div><h2>Room checklist</h2></div>
              <span className="checklist-count">{doneCount}/{room.tasks.length}</span>
            </div>
            <p className="checklist-intro">Small steps to make this room your own. No wrong pace.</p>
            <div className="task-list">
              {room.tasks.map((task, index) => (
                <label className={`task-item ${completedTasks[index] ? "task-done" : ""}`} key={task.title}>
                  <input
                    checked={completedTasks[index]}
                    onChange={() => onToggleTask(room.id, index)}
                    type="checkbox"
                  />
                  <span aria-hidden="true" className="custom-checkbox">{completedTasks[index] ? "✓" : ""}</span>
                  <span className="task-text">
                    <span className="task-step-label">STEP {String(index + 1).padStart(2, "0")}</span>
                    <strong>{task.title}</strong>
                    <span>{task.description}</span>
                  </span>
                </label>
              ))}
            </div>

            {completed ? (
              <div className="room-complete-message" role="status"><span>✳</span><span><strong>Nicely done.</strong><br />This room is now part of your capability graph.</span></div>
            ) : (
              <button
                className="complete-room-button"
                disabled={!readyToComplete}
                onClick={() => onComplete({ domain, roomId: room.id, status: "completed" })}
                type="button"
              >
                Complete this room <span aria-hidden="true">→</span>
              </button>
            )}
            {!completed && <p className="completion-hint">{readyToComplete ? "Your work is ready to add to the graph." : "Complete the steps and pass the lab to finish."}</p>}
            {graphUpdate && <p className="graph-sync-note">Graph synced {new Date(graphUpdate.updatedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</p>}
          </section>

          <section className="graph-card">
            <div className="graph-card-icon">⌁</div>
            <div><h3>Your capability graph</h3><p>Finishing a room adds a learning signal to your Vriksha graph.</p></div>
            <span className="graph-card-status"><i /> LOCAL</span>
          </section>
          <p className="safe-note">Labs are fictional learning exercises, not professional, legal or medical advice.</p>
        </aside>
      </div>
    </section>
  );
}
