import { useState } from "react"
import Home from "./components/home/Home"
import Footer from "./components/layout/Footer"
import Header from "./components/layout/Header"
import PortalPage from "./components/portal/PortalPage"
import { PortalId } from "./types"

export default function App() {
  const [active, setActive] = useState<PortalId>("home")
  const [builderFromExplorer, setBuilderFromExplorer] = useState(false)
  const [builderFromGrower, setBuilderFromGrower] = useState(false)
  const [builderFromColleges, setBuilderFromColleges] = useState(false)
  const [builderFromHiring, setBuilderFromHiring] = useState(false)
  const [growerFromBuilder, setGrowerFromBuilder] = useState(false)
  const [hiringFromGrower, setHiringFromGrower] = useState(false)
  const [hiringFromColleges, setHiringFromColleges] = useState(false)
  const [companyFromHiring, setCompanyFromHiring] = useState(false)

  const navigate = (id: PortalId) => {
    setBuilderFromExplorer(false)
    setBuilderFromGrower(false)
    setBuilderFromColleges(false)
    setBuilderFromHiring(false)
    setGrowerFromBuilder(false)
    setHiringFromGrower(false)
    setHiringFromColleges(false)
    setCompanyFromHiring(false)
    setActive(id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handoffToBuilder = () => {
    setBuilderFromExplorer(true)
    setBuilderFromGrower(false)
    setBuilderFromColleges(false)
    setBuilderFromHiring(false)
    setActive("builder")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handoffFromGrowerToBuilder = () => {
    setBuilderFromExplorer(false)
    setBuilderFromGrower(true)
    setBuilderFromColleges(false)
    setBuilderFromHiring(false)
    setActive("builder")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handoffFromCollegesToBuilder = () => {
    setBuilderFromExplorer(false)
    setBuilderFromGrower(false)
    setBuilderFromColleges(true)
    setBuilderFromHiring(false)
    setActive("builder")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handoffFromHiringToBuilder = () => {
    setBuilderFromExplorer(false)
    setBuilderFromGrower(false)
    setBuilderFromColleges(false)
    setBuilderFromHiring(true)
    setActive("builder")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handoffToGrower = () => {
    setGrowerFromBuilder(true)
    setActive("grower")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handoffToHiring = () => {
    setHiringFromGrower(true)
    setHiringFromColleges(false)
    setActive("hiring")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handoffFromCollegesToHiring = () => {
    setHiringFromGrower(false)
    setHiringFromColleges(true)
    setActive("hiring")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handoffFromHiringToGrower = () => {
    setGrowerFromBuilder(false)
    setActive("grower")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handoffFromHiringToCompany = () => {
    setCompanyFromHiring(true)
    setActive("company")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <Header active={active} onNavigate={navigate} />

      {active === "home" ? (
        <Home onNavigate={navigate} />
      ) : (
        <PortalPage
          key={active}
          id={active}
          onNavigate={navigate}
          onBuilderHandoff={handoffToBuilder}
          onGrowerBuilderHandoff={handoffFromGrowerToBuilder}
          onCollegesBuilderHandoff={handoffFromCollegesToBuilder}
          onHiringBuilderHandoff={handoffFromHiringToBuilder}
          onGrowerHandoff={handoffToGrower}
          onHiringGrowerHandoff={handoffFromHiringToGrower}
          onHiringHandoff={handoffToHiring}
          onCollegesHiringHandoff={handoffFromCollegesToHiring}
          onCompanyHandoff={handoffFromHiringToCompany}
          builderFromExplorer={builderFromExplorer}
          builderFromGrower={builderFromGrower}
          builderFromColleges={builderFromColleges}
          builderFromHiring={builderFromHiring}
          growerFromBuilder={growerFromBuilder}
          hiringFromGrower={hiringFromGrower}
          hiringFromColleges={hiringFromColleges}
          companyFromHiring={companyFromHiring}
        />
      )}

      {active === "home" && <Footer onNavigate={navigate} />}
    </>
  )
}
