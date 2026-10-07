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

export default function ForestView({
  selectedField,
  onSelectField,
  onExploreField,
}: ForestViewProps) {
  return (
    <section
      className="explorer-feature-section forest-view-section"
      id="forest-view"
    >
      <div className="explorer-section-heading">
        <div>
          <div className="card-label">06 · Start wide</div>
          <Heading level={2}>Forest View</Heading>
          <p>Before you choose one tree, see the whole forest.</p>
        </div>
        <span className="demo-label">Interactive prototype</span>
      </div>

      <div className="forest-view-layout">
        <div className="career-forest" aria-label="Interactive career fields">
          <div className="forest-status-key">
            <span>
              <i className="growing" />
              Growing
            </span>
            <span>
              <i className="steady" />
              Steady
            </span>
            <span>
              <i className="emerging" />
              Emerging
            </span>
          </div>

          <div className="forest-tree-line">
            {explorerFields.map((field) => (
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
                <small>{field.status}</small>
              </button>
            ))}
          </div>
        </div>

        <aside className="forest-field-detail">
          <span className="demo-label">Illustrative field view</span>
          <div className="field-status">
            <i className={`status-${selectedField.status.toLowerCase()}`} />
            {selectedField.status}
          </div>
          <Heading level={2}>{selectedField.name}</Heading>
          <p>{selectedField.overview}</p>

          <div className="field-detail-group">
            <strong>Example roles</strong>
            <div className="chip-row">
              {selectedField.roles.map((role) => (
                <SkillChip key={role} tone="lime">
                  {role}
                </SkillChip>
              ))}
            </div>
          </div>

          <div className="field-detail-group">
            <strong>Key skills</strong>
            <div className="chip-row">
              {selectedField.skills.map((skill) => (
                <SkillChip key={skill}>{skill}</SkillChip>
              ))}
            </div>
          </div>

          <div className="field-detail-group">
            <strong>Related paths</strong>
            <span>{selectedField.related.join(" · ")}</span>
          </div>

          <Button
            icon="arrow"
            onClick={() => onExploreField(selectedField.name)}
          >
            Explore this field
          </Button>
        </aside>
      </div>
    </section>
  )
}
