import { collegesSections } from "../../data/collegesData"
import { useActiveSection } from "../../hooks/useActiveSection"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import CohortHeatmap from "./CohortHeatmap"
import CurriculumAutopsy from "./CurriculumAutopsy"
import CurriculumDiff from "./CurriculumDiff"
import EarlyWarning from "./EarlyWarning"
import FacultyMatch from "./FacultyMatch"

interface CollegesWorkspaceProps {
  view: number
  onViewChange: (view: number) => void
  onBuilderHandoff: () => void
  onHiringHandoff: () => void
  scrollTargetRef: { current: string | null }
}

export default function CollegesWorkspace({
  onViewChange,
  onBuilderHandoff,
  onHiringHandoff,
  scrollTargetRef,
}: CollegesWorkspaceProps) {
  // Register scroll spy
  useActiveSection(collegesSections, onViewChange, scrollTargetRef)

  return (
    <div className="colleges-product">
      <section className="colleges-product-hero">
        <div className="colleges-hero-copy">
          <div className="eyebrow">Colleges</div>
          <Heading level={1}>Make curriculum intelligence visible.</Heading>
          <p>
            Universities, colleges, schools — which parts of our curriculum are
            actually working?
          </p>
          <div className="college-institution-context">
            <span className="activity-icon">
              <Icon name="book" size={17} />
            </span>
            <div>
              <small>Institution prototype</small>
              <strong>School of Computing · 2026 review</strong>
              <span>
                Illustrative curriculum, market and cohort information
              </span>
            </div>
          </div>
        </div>

        <div className="college-hero-summary">
          <span>Curriculum intelligence · Demo</span>
          <strong>5</strong>
          <p>
            connected lenses from curriculum alignment to student-segment risk.
          </p>
          <div>
            <small>Courses</small>
            <b>42 reviewed</b>
            <small>Specialisations</small>
            <b>6 compared</b>
          </div>
        </div>
      </section>

      {/* 01. Curriculum vs Market */}
      <CurriculumDiff />

      {/* 02. Curriculum Autopsy */}
      <CurriculumAutopsy />

      {/* 03. Early Warning */}
      <EarlyWarning onBuilderHandoff={onBuilderHandoff} />

      {/* 04. Guest-Faculty Match */}
      <FacultyMatch />

      {/* 05. Cohort Heat-Map */}
      <CohortHeatmap />

      <div className="colleges-ending">
        <div>
          <span>Colleges outcome</span>
          <Heading level={3}>
            See what aligns, what weakens, and which students need support first.
          </Heading>
        </div>
        <Button variant="secondary" icon="arrow" onClick={onHiringHandoff}>
          Connect curriculum to opportunities
        </Button>
      </div>
    </div>
  )
}
