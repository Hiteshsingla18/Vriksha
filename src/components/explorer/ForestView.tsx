import { useState } from "react"
import { explorerFields } from "../../data/explorerData"
import { ExplorerField } from "../../types"
import Button from "../common/Button"
import Heading from "../common/Heading"
import SkillChip from "../common/SkillChip"

interface ForestViewProps {
  selectedField: ExplorerField
  onSelectField: (field: ExplorerField) => void
  onExploreField: (fieldName: string) => void
}

type StatusType = "All" | "Growing" | "Steady" | "Emerging"

export default function ForestView({
  selectedField,
  onSelectField,
  onExploreField,
}: ForestViewProps) {
  const [statusFilter, setStatusFilter] = useState<StatusType>("All")

  const counts = {
    All: explorerFields.length,
    Growing: explorerFields.filter((f) => f.status === "Growing").length,
    Steady: explorerFields.filter((f) => f.status === "Steady").length,
    Emerging: explorerFields.filter((f) => f.status === "Emerging").length,
  }

  const filteredFields =
    statusFilter === "All"
      ? explorerFields
      : explorerFields.filter((f) => f.status === statusFilter)

  const handleFilterChange = (status: StatusType) => {
    setStatusFilter(status)
    const matching =
      status === "All"
        ? explorerFields
        : explorerFields.filter((f) => f.status === status)

    if (matching.length > 0 && !matching.some((f) => f.name === selectedField.name)) {
      onSelectField(matching[0])
    }
  }

  return (
    <section
      className="explorer-feature-section forest-view-section"
      id="forest-view"
    >
      <div className="explorer-section-heading">
        <div>
          <div className="card-label">06 · Start wide</div>
          <Heading level={2}>Forest View</Heading>
          <p>Before you choose one tree, inspect growth velocity across the whole technology forest.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="demo-label">Interactive Field Matrix</span>
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[rgba(32,80,61,0.08)] text-[var(--forest-800)] font-semibold border border-[rgba(32,80,61,0.18)]">
            {filteredFields.length} of {explorerFields.length} Domains Active
          </span>
        </div>
      </div>

      <div className="forest-view-layout">
        <div className="career-forest" aria-label="Interactive career fields">
          {/* Interactive Status Filter Tabs */}
          <div className="forest-status-key flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-[var(--text-soft)] mr-1">
              Filter Velocity:
            </span>
            {(["All", "Growing", "Steady", "Emerging"] as StatusType[]).map(
              (status) => {
                const isActive = statusFilter === status
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleFilterChange(status)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[var(--forest-800)] text-white border-[var(--forest-900)] shadow-2xs font-semibold"
                        : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:bg-[var(--surface-hover)]"
                    }`}
                  >
                    {status !== "All" && (
                      <i className={status.toLowerCase()} />
                    )}
                    <span>{status}</span>
                    <span
                      className={`text-[10px] px-1 py-0.2 rounded-full ${
                        isActive
                          ? "bg-[rgba(255,255,255,0.25)] text-white"
                          : "bg-[rgba(0,0,0,0.06)] text-[var(--text-soft)]"
                      }`}
                    >
                      {counts[status]}
                    </span>
                  </button>
                )
              }
            )}
          </div>

          <div className="forest-tree-line">
            {filteredFields.map((field) => (
              <button
                key={field.name}
                type="button"
                className={`career-tree ${
                  selectedField.name === field.name ? "active" : ""
                }`}
                onClick={() => onSelectField(field)}
                aria-pressed={selectedField.name === field.name}
              >
                <span
                  className={`career-tree-crown status-${field.status.toLowerCase()}`}
                  style={{ height: `${field.height}%` }}
                >
                  <i />
                  <i />
                  <i />
                </span>
                <span className="career-tree-trunk" />
                <strong>{field.name}</strong>
                <small className="flex items-center justify-center gap-1">
                  <span>{field.status}</span>
                  <span>· {field.height}% vel</span>
                </small>
              </button>
            ))}
          </div>
        </div>

        <aside className="forest-field-detail">
          <div className="flex items-center justify-between">
            <span className="demo-label">Domain Perspective</span>
            <div className="field-status">
              <i className={`status-${selectedField.status.toLowerCase()}`} />
              <span className="font-semibold text-xs">{selectedField.status} Velocity</span>
            </div>
          </div>

          <Heading level={2} className="mt-2 mb-1">{selectedField.name}</Heading>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{selectedField.overview}</p>

          <div className="field-detail-group">
            <strong>Example market roles</strong>
            <div className="chip-row">
              {selectedField.roles.map((role) => (
                <SkillChip key={role} tone="lime">
                  {role}
                </SkillChip>
              ))}
            </div>
          </div>

          <div className="field-detail-group">
            <strong>Key foundation skills</strong>
            <div className="chip-row">
              {selectedField.skills.map((skill) => (
                <SkillChip key={skill}>{skill}</SkillChip>
              ))}
            </div>
          </div>

          <div className="field-detail-group">
            <strong>Adjacent career pathways</strong>
            <span className="text-xs text-[var(--text-muted)]">{selectedField.related.join(" · ")}</span>
          </div>

          <Button
            icon="arrow"
            onClick={() => onExploreField(selectedField.name)}
            className="w-full mt-2"
          >
            Explore {selectedField.name} in Career Rooms
          </Button>
        </aside>
      </div>
    </section>
  )
}
