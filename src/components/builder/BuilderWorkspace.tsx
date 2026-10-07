import { useState } from "react"
import { builderSections } from "../../data/builderData"
import { useActiveSection } from "../../hooks/useActiveSection"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import ProgressBar from "../common/ProgressBar"
import CompetenceChart from "./CompetenceChart"
import MicroProject from "./MicroProject"
import SkillTreeOverlay from "./SkillTreeOverlay"
import StuckDetector from "./StuckDetector"
import TrailMatching from "./TrailMatching"

interface BuilderWorkspaceProps {
  fromExplorer?: boolean
  fromGrower?: boolean
  fromColleges?: boolean
  fromHiring?: boolean
  view: number
  onViewChange: (view: number) => void
  onGrowerHandoff: () => void
  scrollTargetRef: { current: string | null }
}

export default function BuilderWorkspace({
  fromExplorer = false,
  fromGrower = false,
  fromColleges = false,
  fromHiring = false,
  onViewChange,
  onGrowerHandoff,
  scrollTargetRef,
}: BuilderWorkspaceProps) {
  // Register scroll spy
  useActiveSection(builderSections, onViewChange, scrollTargetRef)

  const [microProjectPhase, setMicroProjectPhase] = useState<number>(0)
  const [remediatedPhases, setRemediatedPhases] = useState<Record<number, boolean>>({})

  const handleRemediateFromDetector = (phaseIndex: number) => {
    setMicroProjectPhase(phaseIndex)
  }

  const handlePhaseCompletedInProject = (phaseIndex: number) => {
    setRemediatedPhases((prev) => ({ ...prev, [phaseIndex]: true }))
  }

  const targetRole = fromGrower
    ? "MLOps Engineer"
    : fromColleges
      ? "Cloud Skills Pathway"
      : fromHiring
        ? "Candidate Capability Path"
        : "Machine Learning Engineer"

  return (
    <div className="builder-product flex flex-col gap-10">
      {/* 01. Tree Overlay (Primary Figma screen) */}
      <SkillTreeOverlay targetRole={targetRole} />

      {/* 02. Stuck Detector */}
      <StuckDetector
        activeMicroProjectPhase={microProjectPhase}
        remediatedPhases={remediatedPhases}
        onRemediate={handleRemediateFromDetector}
      />

      {/* 03. Micro-Project */}
      <MicroProject
        externalPhaseIndex={microProjectPhase}
        onPhaseChange={(phase) => setMicroProjectPhase(phase)}
        onPhaseCompleted={handlePhaseCompletedInProject}
      />

      {/* 04. Trail Matching */}
      <TrailMatching />

      {/* 05. Confidence vs Competence */}
      <CompetenceChart />

      <div className="builder-ending">
        <div>
          <span>Builder outcome</span>
          <Heading level={3}>
            One clear gap. One useful project. Evidence you can trust.
          </Heading>
        </div>
        <Button variant="secondary" icon="arrow" onClick={onGrowerHandoff}>
          See where this growth could lead
        </Button>
      </div>
    </div>
  )
}
