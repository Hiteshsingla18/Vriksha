import { useState } from "react"
import {
  datasetIndex,
  explorerFields,
  explorerProfiles,
  explorerRooms,
  explorerSections,
  SearchResultItem,
  FamilyBriefRole,
} from "../../data/explorerData"
import { useActiveSection } from "../../hooks/useActiveSection"
import { CareerRoom, ExplorerField, ExplorerProfile, PortalId } from "../../types"
import Button from "../common/Button"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import CareerRooms from "./CareerRooms"
import ExplorerModal from "./ExplorerModal"
import FamilyBrief from "./FamilyBrief"
import ForestView from "./ForestView"
import NearbyProfiles from "./NearbyProfiles"
import RealWork from "./RealWork"
import RegretRadar from "./RegretRadar"

interface ExplorerContentProps {
  navigate: (id: PortalId) => void
  view: number
  onViewChange: (view: number) => void
  onBuilderHandoff: () => void
  scrollTargetRef: { current: string | null }
}

interface SearchMatchTelemetry extends SearchResultItem {
  room?: CareerRoom
  field?: ExplorerField
}

export default function ExplorerContent({
  view,
  onViewChange,
  scrollTargetRef,
}: ExplorerContentProps) {
  const [search, setSearch] = useState("")
  const [searchMatch, setSearchMatch] = useState<SearchMatchTelemetry | null>(null)
  const [searchFeedback, setSearchFeedback] = useState("")
  const [selectedRoom, setSelectedRoom] = useState<CareerRoom | null>(null)
  const [roomStarted, setRoomStarted] = useState(false)
  const [selectedField, setSelectedField] = useState<ExplorerField>(
    explorerFields[0]
  )
  const [selectedProfile, setSelectedProfile] =
    useState<ExplorerProfile | null>(null)
  const [familyPreview, setFamilyPreview] = useState(false)
  const [selectedFamilyRole, setSelectedFamilyRole] = useState<FamilyBriefRole | null>(null)
  const [familyStudentName, setFamilyStudentName] = useState("Candidate")
  const [familyAudience, setFamilyAudience] = useState("Parents & Guardians")

  // Register scroll spy
  useActiveSection(explorerSections, onViewChange, scrollTargetRef)

  const popularChips = [
    "Data Scientist",
    "Machine Learning",
    "Big Data",
    "PySpark",
    "Tableau",
    "Python",
    "SQL",
  ]

  const executeSearch = (rawQuery: string) => {
    const value = rawQuery.trim().toLowerCase()
    if (!value) {
      setSearchMatch(null)
      setSearchFeedback(
        "Please enter a role or skill (e.g., Data Scientist, PySpark, Machine Learning, Tableau, SQL)."
      )
      return
    }

    // 1. Check exact or partial match in datasetIndex
    let matchedKey = Object.keys(datasetIndex).find((k) => k === value)
    if (!matchedKey) {
      matchedKey = Object.keys(datasetIndex).find(
        (k) => value.includes(k) || k.includes(value)
      )
    }
    if (!matchedKey) {
      const tokens = value.split(/\s+/).filter(Boolean)
      matchedKey = Object.keys(datasetIndex).find((k) =>
        tokens.some((t) => k.includes(t) || t.includes(k))
      )
    }

    // 2. Identify corresponding Career Room
    const room = explorerRooms.find(
      (item) =>
        item.field.toLowerCase().includes(value) ||
        item.title.toLowerCase().includes(value) ||
        item.skills.some((skill) => skill.toLowerCase().includes(value)) ||
        (value.includes("model") ||
        value.includes("drift") ||
        value.includes("ai") ||
        value.includes("ml") ||
        value.includes("machine learning") ||
        value.includes("data scientist") ||
        value.includes("deep learning")
          ? item.field.includes("AI")
          : false) ||
        (value.includes("spark") ||
        value.includes("pyspark") ||
        value.includes("kafka") ||
        value.includes("hadoop") ||
        value.includes("big data")
          ? item.field.includes("Big Data")
          : false) ||
        (value.includes("bi") ||
        value.includes("tableau") ||
        value.includes("powerbi") ||
        value.includes("power bi") ||
        value.includes("analyst")
          ? item.field.includes("Analytics")
          : false) ||
        (value.includes("sql") ||
        value.includes("cloud") ||
        value.includes("aws") ||
        value.includes("snowflake")
          ? item.field.includes("Software & Cloud")
          : false) ||
        (value.includes("stat") ||
        value.includes("experiment") ||
        value.includes("math") ||
        value.includes("r")
          ? item.field.includes("Applied Statistics")
          : false) ||
        (value.includes("llm") ||
        value.includes("rag") ||
        value.includes("mlops") ||
        value.includes("docker") ||
        value.includes("deploy")
          ? item.field.includes("MLOps")
          : false)
    )

    // 3. Identify corresponding Forest Field
    const field = explorerFields.find(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.roles.some(
          (role) => role.toLowerCase().includes(value) || value.includes(role.toLowerCase())
        ) ||
        item.skills.some(
          (skill) => skill.toLowerCase().includes(value) || value.includes(skill.toLowerCase())
        ) ||
        (value.includes("ai") || value.includes("ml") || value.includes("scientist")
          ? item.name.includes("AI")
          : false) ||
        (value.includes("spark") || value.includes("pyspark") || value.includes("big data")
          ? item.name.includes("Big Data")
          : false) ||
        (value.includes("bi") || value.includes("tableau") || value.includes("analyst")
          ? item.name.includes("Analytics")
          : false)
    )

    if (matchedKey) {
      const match = datasetIndex[matchedKey]
      setSearchMatch({
        ...match,
        query: rawQuery,
        room,
        field,
      })
      setSearchFeedback("")
      if (field) setSelectedField(field)
    } else if (room || field) {
      setSearchMatch({
        query: rawQuery,
        matchCount: 188,
        avgSalaryLpa: 14.5,
        salaryRange: "1.5–37.5 LPA",
        topCities: ["Bengaluru", "Pune", "Gurgaon"],
        topSkills: room
          ? room.skills
          : field
          ? field.skills.slice(0, 4)
          : ["Python", "SQL", "Data Science"],
        room,
        field,
      })
      setSearchFeedback("")
      if (field) setSelectedField(field)
    } else {
      setSearchMatch(null)
      setSearchFeedback(
        `No direct posting found for "${rawQuery}" in 15,841 dataset records. Try Data Scientist, PySpark, Machine Learning, Tableau, or SQL.`
      )
    }
  }

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    executeSearch(search)
  }

  const handleChipClick = (chip: string) => {
    setSearch(chip)
    executeSearch(chip)
  }

  const jumpTo = (sectionId: string, sectionView: number) => {
    scrollTargetRef.current = sectionId
    onViewChange(sectionView)
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.setTimeout(() => {
      if (scrollTargetRef.current === sectionId) {
        scrollTargetRef.current = null
      }
    }, 1200)
  }

  return (
    <div className="explorer-product">
      <section className="explorer-product-hero">
        <div className="explorer-hero-copy">
          <div className="eyebrow">Explorer · Live Talent Graph</div>
          <Heading level={1}>Find where your data skills could go.</Heading>
          <p>
            You don&apos;t need to know the destination. Start from your core skills
            in AI, Big Data, and Analytics to explore real market demand.
          </p>

          <form
            className="explorer-search-control"
            onSubmit={handleSearch}
            role="search"
          >
            <Icon name="search" size={17} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  executeSearch(search)
                }
              }}
              placeholder="Search 15,800+ database roles (e.g., Data Scientist, PySpark, Python, Tableau)"
              aria-label="Search Explorer"
            />
            <Button
              type="submit"
              onClick={() => executeSearch(search)}
            >
              Explore
            </Button>
          </form>

          <div className="search-chips-row flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-[11px] text-[var(--sage-300)] font-medium">Quick telemetry:</span>
            {popularChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(216,237,139,0.25)] text-[var(--lime-200)] border border-[rgba(216,237,139,0.2)] transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {searchMatch && (
            <div className="explorer-search-telemetry-card" role="region" aria-label="Search results telemetry">
              <div className="flex items-center justify-between border-b border-[rgba(216,237,139,0.2)] pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--lime-400)] animate-pulse" />
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-[var(--lime-300)]">
                    Database Grounded Signal
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[rgba(216,237,139,0.15)] text-[var(--lime-200)] font-medium">
                    {searchMatch.matchCount.toLocaleString()} Live Postings Analyzed
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSearchMatch(null)}
                  className="text-[var(--sage-400)] hover:text-white text-xs cursor-pointer px-1.5 py-0.5 rounded hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                  title="Dismiss telemetry"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 text-xs">
                <div className="bg-[rgba(255,255,255,0.05)] p-2.5 rounded-lg border border-[rgba(255,255,255,0.08)]">
                  <div className="text-[10px] text-[var(--sage-400)] uppercase font-semibold">Compensation Benchmark</div>
                  <div className="text-[16px] font-bold text-white mt-0.5">
                    ₹{searchMatch.avgSalaryLpa} LPA <span className="text-[11px] font-normal text-[var(--lime-300)]">avg</span>
                  </div>
                  <div className="text-[10px] text-[var(--sage-300)] mt-0.5">Range: {searchMatch.salaryRange}</div>
                </div>

                <div className="bg-[rgba(255,255,255,0.05)] p-2.5 rounded-lg border border-[rgba(255,255,255,0.08)]">
                  <div className="text-[10px] text-[var(--sage-400)] uppercase font-semibold">Top Hiring Hubs</div>
                  <div className="text-[13px] font-semibold text-white mt-1 flex flex-wrap gap-1">
                    {searchMatch.topCities.map((city) => (
                      <span key={city} className="px-1.5 py-0.5 rounded bg-[rgba(255,255,255,0.1)] text-[11px]">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[rgba(255,255,255,0.05)] p-2.5 rounded-lg border border-[rgba(255,255,255,0.08)]">
                  <div className="text-[10px] text-[var(--sage-400)] uppercase font-semibold">Top Skill Signals</div>
                  <div className="text-[12px] font-medium text-[var(--lime-200)] mt-1 flex flex-wrap gap-1">
                    {searchMatch.topSkills.map((sk) => (
                      <span
                        key={sk}
                        onClick={() => {
                          setSearch(sk)
                          executeSearch(sk)
                        }}
                        className="px-1.5 py-0.5 rounded bg-[rgba(216,237,139,0.12)] hover:bg-[rgba(216,237,139,0.25)] text-[11px] cursor-pointer transition-colors"
                        title={`Search ${sk}`}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap pt-2.5 border-t border-[rgba(216,237,139,0.15)]">
                <span className="text-[11px] text-[var(--sage-300)] font-medium">Direct actions:</span>
                {searchMatch.room && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRoom(searchMatch.room!)
                      setRoomStarted(false)
                    }}
                    className="text-xs px-3 py-1.5 rounded-md bg-[var(--lime-400)] hover:bg-[var(--lime-300)] text-[var(--forest-950)] font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>🚀 Launch Slice: {searchMatch.room.title}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (searchMatch.field) setSelectedField(searchMatch.field)
                    jumpTo("forest-view", 5)
                  }}
                  className="text-xs px-3 py-1.5 rounded-md bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white font-medium flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>🌲 Inspect in Forest Graph</span>
                </button>
                <button
                  type="button"
                  onClick={() => jumpTo("regret-radar", 1)}
                  className="text-xs px-3 py-1.5 rounded-md bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white font-medium flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>🎯 Check Regret Radar</span>
                </button>
              </div>
            </div>
          )}

          {searchFeedback && !searchMatch && (
            <div className="search-feedback mt-3 text-xs text-[var(--lime-300)] flex items-start gap-2 bg-[rgba(20,52,40,0.9)] p-3 rounded-lg border border-[var(--forest-700)]" role="status">
              <Icon name="spark" size={15} />
              <span>{searchFeedback}</span>
            </div>
          )}
        </div>

        <div className="explorer-hero-manifesto">
          <span className="demo-label light">How Vriksha explores</span>
          <Heading level={2}>A career is a direction, not a label.</Heading>
          <p>
            Traditional advice asks you to pick a job title first. Explorer
            starts with everyday tasks, real signals and nearby paths.
          </p>
          <div className="explorer-manifesto-footer">
            <small>Prototype journey</small>
            <b>6 connected ways to explore</b>
          </div>
        </div>
      </section>

      {/* 01. Career Rooms */}
      <CareerRooms
        onSelectRoom={(room) => {
          setSelectedRoom(room)
          setRoomStarted(false)
        }}
      />

      {/* 02. Regret Radar */}
      <RegretRadar />

      {/* 03. Family Brief */}
      <FamilyBrief
        onGeneratePreview={(role, name, aud) => {
          setSelectedFamilyRole(role)
          setFamilyStudentName(name)
          setFamilyAudience(aud)
          setFamilyPreview(true)
        }}
      />

      {/* 04. React to Real Work */}
      <RealWork
        onSelectRoom={(room) => {
          setSelectedRoom(room)
          setRoomStarted(false)
        }}
      />

      {/* 05. Nearby Not Famous */}
      <NearbyProfiles onSelectProfile={(profile) => setSelectedProfile(profile)} />

      {/* 06. Forest View */}
      <ForestView
        selectedField={selectedField}
        onSelectField={(field) => setSelectedField(field)}
        onExploreField={(fieldName) => {
          setSearch(fieldName)
          jumpTo("career-rooms", 0)
        }}
      />

      {/* Modals */}
      <ExplorerModal
        selectedRoom={selectedRoom}
        roomStarted={roomStarted}
        onCloseRoom={() => setSelectedRoom(null)}
        onStartRoom={() => setRoomStarted(true)}
        selectedProfile={selectedProfile}
        onCloseProfile={() => setSelectedProfile(null)}
        familyPreview={familyPreview}
        onCloseFamilyPreview={() => setFamilyPreview(false)}
        familyRole={selectedFamilyRole}
        studentName={familyStudentName}
        audience={familyAudience}
      />
    </div>
  )
}
