import { useRef, useState } from "react"
import { builderSections } from "../../data/builderData"
import { collegesSections } from "../../data/collegesData"
import { companySections } from "../../data/companyData"
import { explorerSections } from "../../data/explorerData"
import { growerSections } from "../../data/growerData"
import { hiringSections } from "../../data/hiringData"
import { scrollToSection, useActiveSection } from "../../hooks/useActiveSection"
import { PortalId, PortalSection } from "../../types"
import BuilderWorkspace from "../builder/BuilderWorkspace"
import CollegesWorkspace from "../colleges/CollegesWorkspace"
import CompanyWorkspace from "../company/CompanyWorkspace"
import ExplorerContent from "../explorer/ExplorerContent"
import GrowerWorkspace from "../grower/GrowerWorkspace"
import HiringWorkspace from "../hiring/HiringWorkspace"
import PortalLayout from "../layout/PortalLayout"

interface PortalPageProps {
  id: Exclude<PortalId, "home">
  onNavigate: (id: PortalId) => void
  onBuilderHandoff: () => void
  onGrowerBuilderHandoff: () => void
  onCollegesBuilderHandoff: () => void
  onHiringBuilderHandoff: () => void
  onGrowerHandoff: () => void
  onHiringGrowerHandoff: () => void
  onHiringHandoff: () => void
  onCollegesHiringHandoff: () => void
  onCompanyHandoff: () => void
  builderFromExplorer: boolean
  builderFromGrower: boolean
  builderFromColleges: boolean
  builderFromHiring: boolean
  growerFromBuilder: boolean
  hiringFromGrower: boolean
  hiringFromColleges: boolean
  companyFromHiring: boolean
}

const portalSectionsMap: Record<Exclude<PortalId, "home">, PortalSection[]> = {
  explorer: explorerSections,
  builder: builderSections,
  grower: growerSections,
  colleges: collegesSections,
  hiring: hiringSections,
  company: companySections,
}

export default function PortalPage({
  id,
  onNavigate,
  onBuilderHandoff,
  onGrowerBuilderHandoff,
  onCollegesBuilderHandoff,
  onHiringBuilderHandoff,
  onGrowerHandoff,
  onHiringGrowerHandoff,
  onHiringHandoff,
  onCollegesHiringHandoff,
  onCompanyHandoff,
  builderFromExplorer,
  builderFromGrower,
  builderFromColleges,
  builderFromHiring,
  growerFromBuilder,
  hiringFromGrower,
  hiringFromColleges,
  companyFromHiring,
}: PortalPageProps) {
  const [activeSub, setActiveSub] = useState(0)
  const scrollTargetRef = useRef<string | null>(null)
  const sections = portalSectionsMap[id] || []

  useActiveSection(sections, setActiveSub, scrollTargetRef)

  const handleSelectSection = (section: PortalSection) => {
    scrollToSection(section.id, section.view, scrollTargetRef, setActiveSub)
  }

  return (
    <PortalLayout
      id={id}
      activeSub={activeSub}
      sections={sections}
      onNavigate={onNavigate}
      onSelectSection={handleSelectSection}
    >
      {id === "explorer" && (
        <ExplorerContent
          navigate={onNavigate}
          view={activeSub}
          onViewChange={setActiveSub}
          onBuilderHandoff={onBuilderHandoff}
          scrollTargetRef={scrollTargetRef}
        />
      )}

      {id === "builder" && (
        <BuilderWorkspace
          navigate={onNavigate}
          view={activeSub}
          onViewChange={setActiveSub}
          onGrowerHandoff={onGrowerHandoff}
          fromExplorer={builderFromExplorer}
          fromGrower={builderFromGrower}
          fromColleges={builderFromColleges}
          fromHiring={builderFromHiring}
          scrollTargetRef={scrollTargetRef}
        />
      )}

      {id === "grower" && (
        <GrowerWorkspace
          fromBuilder={growerFromBuilder}
          onBuilderHandoff={onGrowerBuilderHandoff}
          onHiringHandoff={onHiringGrowerHandoff}
        />
      )}

      {id === "colleges" && (
        <CollegesWorkspace
          onBuilderHandoff={onCollegesBuilderHandoff}
          onHiringHandoff={onCollegesHiringHandoff}
        />
      )}

      {id === "hiring" && (
        <HiringWorkspace
          fromGrower={hiringFromGrower}
          fromColleges={hiringFromColleges}
          onGrowerHandoff={onGrowerHandoff}
          onCompanyHandoff={onCompanyHandoff}
        />
      )}

      {id === "company" && (
        <CompanyWorkspace fromHiring={companyFromHiring} />
      )}
    </PortalLayout>
  )
}
