"use client";

import { useMemo, useState } from "react";

function LabFrame({ lab, succeeded, children }) {
  return (
    <article className="virtual-lab-card">
      <div className="lab-card-header">
        <div>
          <div className="card-overline"><span className="overline-icon">⌘</span> MINI VIRTUAL LAB <span className="lab-level">HANDS-ON</span></div>
          <h2>{lab.title}</h2>
          <p className="card-subtitle">{lab.description}</p>
        </div>
        <span className={`lab-status ${succeeded ? "lab-status-done" : ""}`}><i />{succeeded ? "PASSED" : "IN PROGRESS"}</span>
      </div>
      {children}
      <div className="lab-safety-note"><span>✳</span> This is a simulated exercise. No real systems, people or cases are involved.</div>
    </article>
  );
}

function SecurityLab({ lab, succeeded, onSuccess }) {
  const initialLog = [
    "2026-04-18T09:14:01Z INFO  auth user=maya result=success src=10.0.4.12",
    "2026-04-18T09:14:05Z WARN  auth user=admin result=failed src=185.199.108.153",
    "2026-04-18T09:14:06Z WARN  auth user=admin result=failed src=185.199.108.153",
    "2026-04-18T09:14:11Z ALERT web path=/wp-login.php user=unknown src=185.199.108.153",
    "2026-04-18T09:15:02Z INFO  auth user=maya result=success src=10.0.4.12"
  ].join("\n");
  const [logs, setLogs] = useState(initialLog);
  const [scanned, setScanned] = useState(false);
  const suspiciousLines = useMemo(() => {
    const markers = /\/wp-login|union\s+select|<script|powershell\s+-enc|result=failed/i;
    return logs.split(/\r?\n/).filter((line) => markers.test(line));
  }, [logs]);
  const runScan = () => {
    setScanned(true);
    if (suspiciousLines.some((line) => /\/wp-login/i.test(line))) onSuccess();
  };

  return (
    <LabFrame lab={lab} succeeded={succeeded}>
      <div className="terminal-window">
        <div className="terminal-titlebar"><span className="terminal-lights"><i /><i /><i /></span><span>vriksha-soc / event-triage</span><span className="terminal-readonly">SIMULATION</span></div>
        <label className="lab-input-label" htmlFor="event-log">SAMPLE AUTH & WEB LOG <span>EDITABLE</span></label>
        <textarea className="terminal-input" id="event-log" onChange={(event) => { setLogs(event.target.value); setScanned(false); }} spellCheck="false" value={logs} />
        <div className="terminal-command"><span className="terminal-prompt">$</span> vriksha scan --indicators <button className="lab-action-button terminal-button" onClick={runScan} type="button">Run scan <span>↵</span></button></div>
      </div>
      {scanned && (
        <div aria-live="polite" className={`lab-result ${suspiciousLines.length ? "result-alert" : "result-neutral"}`}>
          <strong>{suspiciousLines.length ? `${suspiciousLines.length} suspicious event${suspiciousLines.length === 1 ? "" : "s"} isolated` : "No known indicators found"}</strong>
          {suspiciousLines.length ? (
            <div className="isolate-list">{suspiciousLines.map((line, index) => <code key={`${line}-${index}`}>{line}</code>)}</div>
          ) : <span>Try locating the /wp-login indicator in the supplied events.</span>}
          {succeeded && <span className="success-detail">✓ You isolated the suspicious path. Good triage preserves evidence before escalation.</span>}
        </div>
      )}
    </LabFrame>
  );
}

function LawLab({ lab, succeeded, onSuccess }) {
  const [flagged, setFlagged] = useState([]);
  const risks = lab.clauses.map((clause, index) => clause.risk !== "low" ? index : -1).filter((index) => index !== -1);
  const toggle = (index) => setFlagged((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  const check = () => {
    if (risks.every((index) => flagged.includes(index)) && flagged.every((index) => risks.includes(index))) onSuccess();
  };
  return (
    <LabFrame lab={lab} succeeded={succeeded}>
      <div className="inspector-intro"><span className="inspector-icon">§</span><span>Choose every clause you would flag for a closer compliance review. You can change your selection at any time.</span></div>
      <div className="clause-list">
        {lab.clauses.map((clause, index) => (
          <button aria-pressed={flagged.includes(index)} className={`clause-row ${flagged.includes(index) ? "clause-flagged" : ""}`} key={clause.text} onClick={() => toggle(index)} type="button">
            <span className={`clause-marker risk-${clause.risk}`}>{flagged.includes(index) ? "✓" : "§"}</span>
            <span className="clause-copy"><span>{clause.text}</span><small>{clause.label}</small></span>
            <span className={`risk-label risk-text-${clause.risk}`}>{flagged.includes(index) ? "FLAGGED" : clause.risk === "low" ? "ROUTINE" : "REVIEW"}</span>
          </button>
        ))}
      </div>
      <div className="lab-controls">
        <span>{flagged.length} clause{flagged.length === 1 ? "" : "s"} selected</span>
        <button className="lab-action-button" disabled={succeeded} onClick={check} type="button">{succeeded ? "Review complete ✓" : "Check my review →"}</button>
      </div>
      {flagged.length > 0 && !succeeded && (
        <p aria-live="polite" className={flagged.length === risks.length && flagged.every((index) => risks.includes(index)) ? "inline-feedback feedback-good" : "inline-feedback"}>
          {flagged.length === risks.length && flagged.every((index) => risks.includes(index)) ? "That covers the clauses needing closer review. Submit to confirm." : "Look for broad or ambiguous obligations; avoid flagging routine clauses without cause."}
        </p>
      )}
      {succeeded && <p className="success-detail">✓ You identified each clause needing a closer compliance review.</p>}
    </LabFrame>
  );
}

function EngineeringLab({ lab, succeeded, onSuccess }) {
  const [load, setLoad] = useState(65);
  const capacity = 100;
  const margin = capacity - load;
  const safe = margin >= 20;
  return (
    <LabFrame lab={lab} succeeded={succeeded}>
      <div className="engineering-instructions"><span className="instruction-icon">⌁</span><span>Adjust the illustrative applied load. Leave a design margin of at least <strong>20 units</strong> before verification.</span></div>
      <div className="stress-panel">
        <div className="stress-graphic" aria-label={`Illustrative load ${load} of ${capacity}`} role="img">
          <div className="stress-beam"><span className="beam-load" style={{ height: `${Math.min(78, 12 + load * 0.64)}px` }} /><span className="beam-center" /><span className="beam-support beam-support-left" /><span className="beam-support beam-support-right" /></div>
          <span className="support-label support-left-label">SUPPORT</span><span className="support-label support-right-label">SUPPORT</span>
          <span className="load-arrow">↓</span>
        </div>
        <div className="stress-readings">
          <span className="reading-label">APPLIED LOAD</span><strong>{load}<small> / {capacity} units</small></strong>
          <div className="stress-meter"><span style={{ width: `${load}%` }} /></div>
          <label className="lab-input-label" htmlFor="load-slider">ADJUST LOAD</label>
          <input aria-valuetext={`${load} units`} className="load-slider" id="load-slider" max="120" min="10" onChange={(event) => setLoad(Number(event.target.value))} type="range" value={load} />
          <div className="margin-reading"><span>Safety margin</span><strong className={safe ? "margin-safe" : "margin-unsafe"}>{margin} units</strong></div>
          <span className={`safety-badge ${safe ? "safe" : "unsafe"}`}><i />{safe ? "WITHIN DESIGN LIMIT" : "REVIEW REQUIRED"}</span>
        </div>
      </div>
      <div className="lab-controls"><span>{safe ? "Margin meets the illustrative design target." : "Reduce the load to increase the safety margin."}</span><button className="lab-action-button" disabled={succeeded || !safe} onClick={onSuccess} type="button">{succeeded ? "Check passed ✓" : "Verify design →"}</button></div>
      {succeeded && <p className="success-detail">✓ Design margin verified. Real projects require qualified review and applicable codes.</p>}
    </LabFrame>
  );
}

function MedicalLab({ lab, succeeded, onSuccess }) {
  const [sort, setSort] = useState({});
  const allSorted = lab.cards.every((card) => sort[card.id]);
  const correct = allSorted && lab.cards.every((card) => sort[card.id] === card.condition);
  return (
    <LabFrame lab={lab} succeeded={succeeded}>
      <div className="medical-disclaimer"><span>✚</span><span><strong>Learning simulation only.</strong> Not a diagnosis or a substitute for clinical judgement. In real care, follow local guidance and escalate red flags.</span></div>
      <div className="symptom-layout">
        <div>
          <span className="lab-input-label">FICTIONAL INDICATORS</span>
          <div className="symptom-cards">
            {lab.cards.map((card) => (
              <label className="symptom-card" key={card.id}>
                <span className="symptom-indicator"><i /></span>
                <span>{card.text}</span>
                <select aria-label={`Sort indicator: ${card.text}`} disabled={succeeded} onChange={(event) => setSort((current) => ({ ...current, [card.id]: event.target.value }))} value={sort[card.id] || ""}>
                  <option value="">Sort to...</option>
                  {lab.conditions.map((condition) => <option key={condition} value={condition}>{condition[0].toUpperCase() + condition.slice(1)}</option>)}
                </select>
              </label>
            ))}
          </div>
        </div>
        <aside className="triage-guide"><span className="guide-icon">◎</span><strong>Notice patterns, not diagnoses.</strong><p>Consider which indicators belong together, and always treat sudden or severe symptoms as a reason to escalate.</p><span className="guide-disclaimer">Illustrative categories only</span></aside>
      </div>
      <div className="lab-controls"><span>{Object.keys(sort).length} of {lab.cards.length} indicators sorted</span><button className="lab-action-button" disabled={succeeded || !allSorted} onClick={onSuccess} type="button">{succeeded ? "Sort complete ✓" : "Check my sort →"}</button></div>
      {allSorted && !succeeded && <p aria-live="polite" className={correct ? "inline-feedback feedback-good" : "inline-feedback"}>{correct ? "Your pattern sort looks consistent. Submit to finish this exercise." : "One or more patterns could use another look. Recheck the indicators before submitting."}</p>}
      {succeeded && <p className="success-detail">✓ Indicators sorted. In real clinical work, red flags need prompt professional assessment.</p>}
    </LabFrame>
  );
}

function ScenarioLab({ lab, succeeded, onSuccess }) {
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const submit = () => {
    if (selected === lab.answer) onSuccess();
    setChecked(true);
  };
  return (
    <LabFrame lab={lab} succeeded={succeeded}>
      <div className="scenario-panel">
        <span className="scenario-label"><span>01</span> A MOMENT TO THINK</span>
        <h3>{lab.question}</h3>
        <div className="scenario-options">
          {lab.options.map((option, index) => (
            <button aria-pressed={selected === index} className={`scenario-option ${selected === index ? "option-selected" : ""} ${checked && index === lab.answer ? "option-correct" : ""} ${checked && selected === index && index !== lab.answer ? "option-incorrect" : ""}`} key={option} onClick={() => { if (!succeeded) { setSelected(index); setChecked(false); } }} type="button">
              <span className="option-marker">{checked && index === lab.answer ? "✓" : String.fromCharCode(65 + index)}</span><span>{option}</span>
            </button>
          ))}
        </div>
        <div className="lab-controls"><span>{selected === null ? "Choose the strongest next step." : "Ready to check your thinking."}</span><button className="lab-action-button" disabled={selected === null || succeeded} onClick={submit} type="button">{succeeded ? "Answer checked ✓" : "Check my answer →"}</button></div>
        {checked && !succeeded && <p aria-live="polite" className="inline-feedback">Not quite. Revisit the choices and try another approach.</p>}
        {succeeded && <p className="success-detail">✓ Strong choice. Clear reasoning and proportionate next steps are valuable in every career.</p>}
      </div>
    </LabFrame>
  );
}

export default function MiniVirtualLab({ lab, succeeded, onSuccess }) {
  if (lab.type === "security") return <SecurityLab lab={lab} succeeded={succeeded} onSuccess={onSuccess} />;
  if (lab.type === "law") return <LawLab lab={lab} succeeded={succeeded} onSuccess={onSuccess} />;
  if (lab.type === "engineering") return <EngineeringLab lab={lab} succeeded={succeeded} onSuccess={onSuccess} />;
  if (lab.type === "medical") return <MedicalLab lab={lab} succeeded={succeeded} onSuccess={onSuccess} />;
  return <ScenarioLab lab={lab} succeeded={succeeded} onSuccess={onSuccess} />;
}
