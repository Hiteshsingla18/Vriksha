import { FamilyBriefRole } from "../../data/explorerData"
import { CareerRoom, ExplorerProfile } from "../../types"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"
import CareerRoomDetail from "./CareerRoomDetail"

interface ExplorerModalProps {
  selectedRoom: CareerRoom | null
  roomStarted: boolean
  onCloseRoom: () => void
  onStartRoom: () => void
  selectedProfile: ExplorerProfile | null
  onCloseProfile: () => void
  familyPreview: boolean
  onCloseFamilyPreview: () => void
  familyRole?: FamilyBriefRole | null
  studentName?: string
  audience?: string
}

export default function ExplorerModal({
  selectedRoom,
  roomStarted,
  onCloseRoom,
  onStartRoom,
  selectedProfile,
  onCloseProfile,
  familyPreview,
  onCloseFamilyPreview,
  familyRole,
  studentName,
  audience,
}: ExplorerModalProps) {
  if (selectedRoom) {
    return (
      <div
        className="explorer-modal"
        role="presentation"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onCloseRoom()
        }}
      >
        <div
          className="explorer-modal-card explorer-room-detail-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="room-title"
          style={{
            maxWidth: "1150px",
            width: "95vw",
            maxHeight: "92vh",
            overflowY: "auto",
            padding: "24px 32px",
          }}
        >
          <CareerRoomDetail
            key={selectedRoom.title}
            room={selectedRoom}
            onBack={onCloseRoom}
          />
        </div>
      </div>
    )
  }

  if (selectedProfile) {
    const steps = selectedProfile.pathway.split(" → ")

    return (
      <div
        className="explorer-modal"
        role="presentation"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onCloseProfile()
        }}
      >
        <div
          className="explorer-modal-card pathway-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pathway-title"
        >
          <button
            type="button"
            className="modal-close"
            onClick={onCloseProfile}
            aria-label="Close pathway"
          >
            <Icon name="close" size={16} />
          </button>
          <span className="demo-label">Fictional demo pathway</span>
          <Heading level={2}>
            <span id="pathway-title">{selectedProfile.name}&apos;s pathway</span>
          </Heading>
          <p>
            {selectedProfile.role} · {selectedProfile.location} ·{" "}
            {selectedProfile.years}
          </p>

          <div className="pathway-steps">
            {steps.map((step, index) => (
              <div key={step}>
                <span>0{index + 1}</span>
                <strong>{step}</strong>
                {index < steps.length - 1 && (
                  <Icon name="arrow" size={14} />
                )}
              </div>
            ))}
          </div>

          <div className="field-detail-group">
            <strong>Skills developed along the way</strong>
            <div className="chip-row">
              {selectedProfile.skills.map((skill) => (
                <SkillChip key={skill}>{skill}</SkillChip>
              ))}
            </div>
          </div>
          <Button variant="secondary" onClick={onCloseProfile} className="mt-4">
            Close pathway
          </Button>
        </div>
      </div>
    )
  }

  if (familyPreview) {
    const role = familyRole || {
      id: "data-analytics-bi",
      roleTitle: "Data Analytics & Business Intelligence",
      category: "Analytics & Strategy",
      tagline: "Turns company numbers into crystal-clear executive decisions.",
      icon: "⌕",
      plainEnglishSummary:
        "Helps organizations navigate business challenges by inspecting transaction data, diagnosing performance dips, and creating live visual dashboards that leadership trusts.",
      targetAudienceHeadline:
        "The digital navigator — every major executive decision runs through their numbers.",
      skillsMatch:
        "Structured problem-solving, visual clarity, curiosity with customer habits, and concise verbal communication.",
      typicalWork:
        "Reconcile daily metrics, write SQL queries to clean datasets, build interactive charts in Tableau or Power BI, and answer questions like 'Why did checkout completion drop 8% this week?'",
      growthOutlook:
        "High hiring demand across Indian financial services, retail, e-commerce, and healthcare with strong career resilience.",
      avgSalaryRange: "₹6.5 – 10.5 LPA (Entry) → ₹16.0 – 24.0 LPA (Lead / Manager)",
      learningPath:
        "SQL Database Queries → Tableau & Power BI Storytelling → Metric Catalogs & dbt Governance.",
      alternativePaths:
        "Product Operations Analyst, Decision Scientist, Revenue Operations Manager.",
      familyTalkingPoints: [
        "Not solitary coding: Over 40% of their workday is spent interacting directly with business managers, product leads, and operations directors.",
        "High stability: Every modern company—from banks to hospitals—needs skilled professionals who can interpret data and explain the 'why'.",
        "Clear advancement: Clear progression from reporting analyst to analytics lead and director of decision science.",
      ],
      commonFamilyQuestions: [
        {
          question: "Is this job vulnerable to AI automation?",
          answer:
            "No. While AI can write simple queries, human judgment is essential to define what metrics actually mean, audit data for flaws, and explain subtle caveats to stakeholders.",
        },
        {
          question: "Do they need a pure computer science engineering degree?",
          answer:
            "Not mandatory. Many top analysts come from math, statistics, economics, commerce, or general engineering backgrounds by demonstrating strong SQL and business sense.",
        },
      ],
    }

    const name = studentName || "Candidate"
    const aud = audience || "Parents & Guardians"

    return (
      <div
        className="explorer-modal"
        role="presentation"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onCloseFamilyPreview()
        }}
      >
        <div
          className="explorer-modal-card family-preview-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="family-preview-title"
          style={{
            maxWidth: "860px",
            width: "95vw",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "26px 30px",
          }}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)] mb-4">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-sm tracking-wider text-[var(--forest-900)]">
                VRIKSHA
              </span>
              <span className="text-xs text-[var(--text-muted)] font-medium">
                Official Career Family Briefing
              </span>
            </div>
            <button
              type="button"
              className="text-xs px-2.5 py-1 rounded bg-[rgba(0,0,0,0.06)] hover:bg-[rgba(0,0,0,0.12)] text-[var(--text-muted)] cursor-pointer"
              onClick={onCloseFamilyPreview}
            >
              Close [Esc]
            </button>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <span className="text-[11px] font-semibold text-[var(--text-soft)] uppercase tracking-wide">
              Prepared for {name} · {aud}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[rgba(32,80,61,0.08)] text-[var(--forest-800)] font-semibold border border-[rgba(32,80,61,0.18)]">
              {role.category}
            </span>
          </div>

          <div className="flex items-center gap-3 my-2">
            <span className="text-3xl font-mono text-[var(--forest-800)]">
              {role.icon}
            </span>
            <div>
              <Heading level={2} className="text-xl sm:text-2xl font-bold text-[var(--text)] m-0">
                <span id="family-preview-title">{role.roleTitle}</span>
              </Heading>
              <p className="text-xs text-[var(--text-muted)] m-0 mt-0.5">
                {role.tagline}
              </p>
            </div>
          </div>

          <div className="bg-[rgba(32,80,61,0.04)] p-3.5 rounded-xl border border-[rgba(32,80,61,0.14)] my-3 text-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-semibold text-[var(--forest-900)]">
                Indicative Indian Market Compensation:
              </span>
              <span className="font-mono text-sm font-bold text-[var(--forest-900)]">
                {role.avgSalaryRange}
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1.5 m-0 leading-relaxed">
              Synthesized from 15,800+ live job postings across primary data science hubs (Bengaluru, Hyderabad, Pune, NCR).
            </p>
          </div>

          <div className="mb-4">
            <strong className="text-xs font-bold text-[var(--text)] block mb-1">
              Plain-Language Work Reality (No Jargon)
            </strong>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed bg-[var(--surface-subtle)] p-3 rounded-lg border border-[var(--border)] m-0">
              {role.plainEnglishSummary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-xs">
            <div className="bg-[var(--surface-subtle)] p-3 rounded-lg border border-[var(--border)]">
              <strong className="text-[var(--text)] block mb-1">Skills Match</strong>
              <p className="text-[var(--text-muted)] m-0 leading-relaxed">
                {role.skillsMatch}
              </p>
            </div>
            <div className="bg-[var(--surface-subtle)] p-3 rounded-lg border border-[var(--border)]">
              <strong className="text-[var(--text)] block mb-1">Learning Trajectory</strong>
              <p className="text-[var(--text-muted)] m-0 leading-relaxed">
                {role.learningPath}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <strong className="text-xs font-bold text-[var(--text)] block mb-1">
              Resilient Alternative Career Pivots
            </strong>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed m-0">
              {role.alternativePaths} (Ensures strong career runway if the candidate wishes to transition later).
            </p>
          </div>

          <div className="border-t border-[var(--border)] pt-3.5 mt-3">
            <strong className="text-xs font-bold text-[var(--text)] block mb-2">
              Frequently Asked Family Questions & Verified Answers
            </strong>
            <div className="space-y-2">
              {role.commonFamilyQuestions.map((faq, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-[var(--surface-subtle)] border border-[var(--border)] text-xs"
                >
                  <div className="font-semibold text-[var(--text)] mb-1">
                    Q: “{faq.question}”
                  </div>
                  <div className="text-[var(--text-muted)] leading-relaxed pl-2.5 border-l-2 border-[var(--accent)]">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[var(--border)] pt-4 mt-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="text-xs px-3.5 py-2 rounded-lg bg-[var(--forest-800)] hover:bg-[var(--forest-900)] text-white font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span>🖨️ Print / Save as PDF</span>
              </button>
            </div>
            <Button variant="secondary" onClick={onCloseFamilyPreview}>
              Done / Return to Explorer
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
