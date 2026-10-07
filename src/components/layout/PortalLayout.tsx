import React from "react"
import { portalMeta } from "../../data/portals"
import { PortalId, PortalSection } from "../../types"
import Icon from "../common/Icon"
import PortalSidebar from "./PortalSidebar"

interface PortalLayoutProps {
  id: Exclude<PortalId, "home">
  activeSub: number
  sections: PortalSection[]
  onNavigate: (id: PortalId) => void
  onSelectSection: (section: PortalSection) => void
  children: React.ReactNode
}

export default function PortalLayout({
  id,
  activeSub,
  sections,
  onNavigate,
  onSelectSection,
  children,
}: PortalLayoutProps) {
  const meta = portalMeta[id]
  const currentNavLabel = meta.nav[activeSub] || meta.nav[0]

  return (
    <main className={`portal-page portal-${id}`}>
      <div className="portal-topbar">
        <div className="breadcrumb">
          <button onClick={() => onNavigate("home")}>Vriksha</button>
          <Icon name="chevron" size={14} />
          <span className="capitalize">{id}</span>
          <Icon name="chevron" size={14} />
          <span>{currentNavLabel}</span>
        </div>
        <div className="context-pill">
          <span className="live-dot" />
          {id === "explorer"
            ? "Explorer prototype · Illustrative content"
            : "Live skill graph updated 2h ago"}
        </div>
      </div>

      <div className="portal-layout">
        <PortalSidebar
          portalId={id}
          nav={meta.nav}
          sections={sections}
          activeSub={activeSub}
          onSelect={onSelectSection}
        />
        <div className="portal-main min-w-0">{children}</div>
      </div>
    </main>
  )
}
