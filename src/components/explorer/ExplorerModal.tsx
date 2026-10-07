import { CareerRoom, ExplorerProfile } from "../../types"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import ProgressBar from "../common/ProgressBar"
import SkillChip from "../common/SkillChip"

interface ExplorerModalProps {
  selectedRoom: CareerRoom | null
  roomStarted: boolean
  onCloseRoom: () => void
  onStartRoom: () => void
  selectedProfile: ExplorerProfile | null
  onCloseProfile: () => void
  familyPreview: boolean
  onCloseFamilyPreview: () => void
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
          className="explorer-modal-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="room-title"
        >
          <button
            type="button"
            className="modal-close"
            onClick={onCloseRoom}
            aria-label="Close Career Room"
          >
            <Icon name="close" size={16} />
          </button>
          <span className="demo-label">Career Room · Interactive prototype</span>
          <div className="career-domain">{selectedRoom.field}</div>
          <Heading level={2}>
            <span id="room-title">{selectedRoom.title}</span>
          </Heading>
          <p>{selectedRoom.description}</p>

          <div className="room-detail-grid">
            <div>
              <small>What you will do</small>
              <strong>{selectedRoom.task}</strong>
            </div>
            <div>
              <small>Estimated time</small>
              <strong>{selectedRoom.time}</strong>
            </div>
          </div>

          <div className="field-detail-group">
            <strong>Skills being observed</strong>
            <div className="chip-row">
              {selectedRoom.skills.map((skill) => (
                <SkillChip key={skill} tone="sage">
                  {skill}
                </SkillChip>
              ))}
            </div>
          </div>

          {roomStarted ? (
            <div className="room-started-state" role="status">
              <Icon name="check" size={18} />
              <div>
                <strong>Career Room started</strong>
                <p className="m-0 text-xs text-[var(--forest-800)]">Prototype checkpoint 1 of 3 is ready.</p>
              </div>
              <ProgressBar value={33} tone="lime" className="w-full mt-2" />
            </div>
          ) : (
            <Button icon="arrow" onClick={onStartRoom} className="mt-4">
              Start Career Room
            </Button>
          )}
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
        >
          <button
            type="button"
            className="modal-close"
            onClick={onCloseFamilyPreview}
            aria-label="Close Family Brief"
          >
            <Icon name="close" size={16} />
          </button>
          <span className="demo-label">Generated frontend preview</span>
          <Heading level={2}>
            <span id="family-preview-title">Your Family Brief is ready.</span>
          </Heading>
          <p>
            A one-page Data Analyst brief has been prepared with plain-language
            work examples, a learning path and nearby alternatives.
          </p>
          <div className="generated-brief-summary">
            <Icon name="check" size={20} />
            <div>
              <strong>Data Analyst</strong>
              <p className="m-0 text-xs">5 clear discussion points · Demo preview</p>
            </div>
          </div>
          <Button onClick={onCloseFamilyPreview} className="mt-4">
            View brief on page
          </Button>
        </div>
      </div>
    )
  }

  return null
}
