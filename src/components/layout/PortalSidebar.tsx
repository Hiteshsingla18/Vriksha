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

      {/* Track Your Progress Card matching Figma reference */}
      <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <strong className="block text-xs font-bold text-slate-900 mb-1">Track Your Progress</strong>
        <p className="text-[11px] text-slate-500 leading-snug mb-3">Complete skills and move closer to your dream role.</p>
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#10b981] rounded-full w-[70%]" />
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-700">70%</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById("tree-overlay")
            if (el) el.scrollIntoView({ behavior: "smooth" })
          }}
          className="text-[11px] font-semibold text-slate-700 hover:text-emerald-700 flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <span>View Learning Plan</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      </div>
    </aside>
  )
}
