import { useState } from "react"
import { familyBriefRoles, FamilyBriefRole } from "../../data/explorerData"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"

interface FamilyBriefProps {
  onGeneratePreview: (
    role: FamilyBriefRole,
    studentName: string,
    audience: string
  ) => void
}

export default function FamilyBrief({ onGeneratePreview }: FamilyBriefProps) {
  const [selectedRoleId, setSelectedRoleId] = useState(familyBriefRoles[0].id)
  const [studentName, setStudentName] = useState("Candidate")
  const [audience, setAudience] = useState("Parents & Guardians")
  const [copied, setCopied] = useState(false)

  const activeRole =
    familyBriefRoles.find((r) => r.id === selectedRoleId) ||
    familyBriefRoles[0]

  const handleCopy = () => {
    const textToCopy = `Vriksha Family Brief: ${activeRole.roleTitle}
Audience: ${audience} | For: ${studentName}

• What they do: ${activeRole.plainEnglishSummary}
• Typical compensation: ${activeRole.avgSalaryRange}
• Skills match: ${activeRole.skillsMatch}
• Learning trajectory: ${activeRole.learningPath}
• Resilient alternatives: ${activeRole.alternativePaths}

Key talking points for family:
${activeRole.familyTalkingPoints.map((pt, i) => `${i + 1}. ${pt}`).join("\n")}
`
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handlePrint = () => {
    window.print()
  }

  const briefPoints = [
    {
      label: "Skills match",
      description: activeRole.skillsMatch,
    },
    {
      label: "Typical daily work",
      description: activeRole.typicalWork,
    },
    {
      label: "Growth & market outlook",
      description: `${activeRole.growthOutlook} Benchmark: ${activeRole.avgSalaryRange}.`,
    },
    {
      label: "Learning pathway",
      description: activeRole.learningPath,
    },
    {
      label: "Alternative career pivots",
      description: activeRole.alternativePaths,
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
          <p>Take a data-backed career conversation home without technical jargon.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="demo-label">Interactive Generator</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[rgba(32,80,61,0.08)] text-[var(--forest-800)] font-semibold border border-[rgba(32,80,61,0.18)]">
            5 Distinct Paths
          </span>
        </div>
      </div>

      {/* Role Picker Toolbar */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
          <span>Choose Career Path to Brief:</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {familyBriefRoles.map((role) => (
            <button
              key={role.id}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedRoleId === role.id
                  ? "bg-[var(--forest-800)] text-white border-[var(--forest-900)] shadow-xs"
                  : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
              }`}
              onClick={() => setSelectedRoleId(role.id)}
            >
              <span>{role.icon}</span>
              <span>{role.roleTitle}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="family-brief-layout">
        <div className="family-brief-copy">
          <Heading level={3}>
            A clear explanation for the people helping you decide.
          </Heading>
          <p>
            Generate a simple, plain-language view of {activeRole.roleTitle}, what the work
            involves, salary ranges, and safe alternatives—structured for constructive family dialogue.
          </p>

          {/* Customization controls */}
          <div className="bg-[var(--surface-subtle)] p-3.5 rounded-xl border border-[var(--border)] space-y-3 mb-4">
            <div className="text-[10px] font-bold tracking-wider text-[var(--text-soft)] uppercase">
              Customize Discussion Document
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label className="text-xs flex flex-col gap-1">
                <span className="font-medium text-[var(--text-muted)]">Candidate / Student Name</span>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Candidate"
                  className="px-2.5 py-1.5 text-xs rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                />
              </label>

              <label className="text-xs flex flex-col gap-1">
                <span className="font-medium text-[var(--text-muted)]">Target Audience</span>
                <select
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] focus:outline-none focus:border-[var(--accent)]"
                >
                  <option>Parents & Guardians</option>
                  <option>Mentors & Advisors</option>
                  <option>Non-Technical Family</option>
                </select>
              </label>
            </div>
          </div>

          <div className="family-conversation-note">
            <Icon name="people" size={18} />
            <span>
              <strong>Designed for transparent communication</strong>
              Grounded in 15,800+ live Data Science job market postings, not theoretical assumptions.
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap mt-4">
            <Button
              icon="arrow"
              onClick={() => onGeneratePreview(activeRole, studentName, audience)}
            >
              Generate Full Family Brief
            </Button>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text)] font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Icon name="spark" size={14} />
              <span>{copied ? "Copied to Clipboard! ✓" : "Copy Brief"}</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="text-xs px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all cursor-pointer flex items-center gap-1"
              title="Print one-pager"
            >
              <span>🖨️ Print</span>
            </button>
          </div>
        </div>

        {/* Paper Document Preview */}
        <div className="family-brief-paper transition-all">
          <div className="brief-paper-head flex items-center justify-between pb-2 border-b border-[var(--border)] mb-3">
            <div className="flex items-center gap-2">
              <span className="brief-logo font-bold text-sm tracking-wider text-[var(--forest-900)]">VRIKSHA</span>
              <span className="text-[11px] text-[var(--text-muted)]">Family Brief</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(32,80,61,0.06)] text-[var(--forest-800)] font-semibold border border-[rgba(32,80,61,0.15)]">
              {audience}
            </span>
          </div>

          <div className="text-[11px] text-[var(--text-soft)] uppercase tracking-wide font-semibold">
            Career Prepared For {studentName}
          </div>

          <div className="flex items-center justify-between gap-2 mt-0.5 mb-1.5">
            <Heading level={2} className="text-xl font-bold text-[var(--text)]">
              {activeRole.roleTitle}
            </Heading>
            <span className="text-lg font-mono text-[var(--forest-800)]">
              {activeRole.icon}
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed italic border-l-2 border-[var(--accent)] pl-2.5 my-2">
            “{activeRole.plainEnglishSummary}”
          </p>

          <div className="bg-[rgba(32,80,61,0.04)] p-2 rounded-lg border border-[rgba(32,80,61,0.12)] my-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[var(--text-soft)]">
                Indicative Indian Market Compensation
              </span>
              <span className="font-mono text-xs font-bold text-[var(--forest-900)]">
                {activeRole.avgSalaryRange}
              </span>
            </div>
          </div>

          <strong className="text-xs font-bold text-[var(--text)] block mt-3 mb-2">
            Why this path makes sense
          </strong>

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

          {/* Family Talking Points */}
          <div className="mt-4 pt-3 border-t border-[var(--border)]">
            <div className="text-[11px] font-bold text-[var(--text)] mb-2 flex items-center gap-1.5">
              <span>💬 Key points to discuss together:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[var(--text-muted)] pl-4 list-disc">
              {activeRole.familyTalkingPoints.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
