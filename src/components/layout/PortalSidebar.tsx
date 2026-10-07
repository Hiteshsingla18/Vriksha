import { PortalSection } from "../../types"
import Icon from "../common/Icon"

interface PortalSidebarProps {
  portalId: string
  nav: string[]
  sections: PortalSection[]
  activeSub: number
  onSelect: (section: PortalSection) => void
}

export default function PortalSidebar({
  portalId,
  nav,
  sections,
  activeSub,
  onSelect,
}: PortalSidebarProps) {
  return (
    <aside className="sidebar flex flex-col justify-between">
      <div className="w-full">
        <div className="sidebar-title capitalize">{portalId}</div>
        <nav aria-label={`${portalId} sections`} className="flex flex-col gap-1">
          {nav.map((label, index) => {
            const section = sections.find((s) => s.label === label) || {
              label,
              id: label.toLowerCase().replace(/\s+/g, "-"),
              view: index,
            }
            const isActive = activeSub === section.view

            return (
              <button
                key={label}
                type="button"
                onClick={() => onSelect(section)}
                className={`sidebar-nav-item ${isActive ? "active font-medium" : "text-muted"}`}
              >
                <span>{label}</span>
                {isActive && <Icon name="chevron" size={14} />}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="sidebar-help mt-8 hidden md:flex items-start gap-2 pt-4 border-t border-[var(--line)]">
        <Icon name="spark" size={16} />
        <div>
          <strong className="block text-xs text-[var(--forest-800)]">Shared context</strong>
          <p className="text-[11px] text-[var(--muted)] m-0">Your activity connects across every Vriksha portal.</p>
        </div>
      </div>
    </aside>
  )
}
