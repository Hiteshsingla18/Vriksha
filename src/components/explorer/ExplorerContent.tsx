import { useState } from "react"
import {
  explorerFields,
  explorerProfiles,
  explorerRooms,
  explorerSections,
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

export default function ExplorerContent({
  onViewChange,
  scrollTargetRef,
}: ExplorerContentProps) {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [selectedRoom, setSelectedRoom] = useState<CareerRoom | null>(null)
  const [roomStarted, setRoomStarted] = useState(false)
  const [selectedField, setSelectedField] = useState<ExplorerField>(
    explorerFields[0]
  )
  const [selectedProfile, setSelectedProfile] =
    useState<ExplorerProfile | null>(null)
  const [familyPreview, setFamilyPreview] = useState(false)

  // Register scroll spy
  useActiveSection(explorerSections, onViewChange, scrollTargetRef)

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const value = search.trim().toLowerCase()
    if (!value) {
      setSearchResult(
        "Try a field such as design, data, healthcare or cybersecurity."
      )
      return
    }
    const room = explorerRooms.find(
      (item) =>
        item.field.toLowerCase().includes(value) ||
        item.title.toLowerCase().includes(value) ||
        item.skills.some((skill) => skill.toLowerCase().includes(value))
    )
    const field = explorerFields.find(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.roles.some((role) => role.toLowerCase().includes(value)) ||
        item.skills.some((skill) => skill.toLowerCase().includes(value))
    )
    if (room) {
      setSearchResult(`${room.field} has a real-work Career Room ready to explore.`)
      setSelectedRoom(room)
    } else if (field) {
      setSelectedField(field)
      setSearchResult(`${field.name} is now selected in Forest View.`)
      document
        .getElementById("forest-view")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      setSearchResult(
        "No exact demo match yet. Try data, design, finance, healthcare or cybersecurity."
      )
    }
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
          <div className="eyebrow">Explorer</div>
          <Heading level={1}>Find where you could go.</Heading>
          <p>
            You don&apos;t need to know the destination. Start from who you are
            and explore what connects.
          </p>

          <form className="explorer-search-control" onSubmit={handleSearch}>
            <Icon name="search" size={17} />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a field, role, skill or question you care about"
              aria-label="Search Explorer"
            />
            <Button type="submit">Explore</Button>
          </form>

          {searchResult && (
            <div className="search-feedback" role="status">
              <Icon name="spark" size={14} />
              <span>{searchResult}</span>
            </div>
          )}

          <div className="explorer-journey">
            {explorerSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => jumpTo(section.id, section.view)}
              >
                <span>0{section.view + 1}</span>
                <strong>{section.label}</strong>
              </button>
            ))}
          </div>
        </div>

        <div className="explorer-hero-manifesto">
          <span className="demo-label light">How Vriksha explores</span>
          <Heading level={2}>A career is a direction, not a label.</Heading>
          <p>
            Traditional advice asks you to pick a job title first. Explorer
            starts with everyday tasks, real signals and nearby paths.
          </p>
          <div>
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
      <FamilyBrief onGeneratePreview={() => setFamilyPreview(true)} />

      {/* 04. React to Real Work */}
      <RealWork />

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
      />
    </div>
  )
}
