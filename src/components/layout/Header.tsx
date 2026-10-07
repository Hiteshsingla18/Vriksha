import { useState } from "react"
import { portals } from "../../data/portals"
import { PortalId } from "../../types"
import Icon from "../common/Icon"
import Logo from "../common/Logo"

interface HeaderProps {
  active: PortalId
  onNavigate: (id: PortalId) => void
}

export default function Header({ active, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [switcherOpen, setSwitcherOpen] = useState(false)

  if (active !== "home") {
    const currentPortal =
      portals.find((portal) => portal.id === active) || portals[0]

    return (
      <header className="global-header app-header">
        <div className="app-nav-wrap">
          <div className="app-brand">
            <Logo onClick={() => onNavigate("home")} />
            <span className="app-divider" />
            <div className="portal-switcher">
              <button
                className={`portal-switcher-trigger ${
                  switcherOpen ? "open" : ""
                }`}
                onClick={() => setSwitcherOpen(!switcherOpen)}
                aria-expanded={switcherOpen}
                aria-haspopup="true"
              >
                <span className="switcher-icon">
                  <Icon name={currentPortal.icon} size={16} />
                </span>
                <span>
                  <small>Current portal</small>
                  <strong>{currentPortal.label}</strong>
                </span>
                <Icon name="chevron" size={15} />
              </button>

              {switcherOpen && (
                <div className="portal-switcher-menu">
                  <div className="switcher-menu-label">Switch perspective</div>
                  {portals.map((portal) => (
                    <button
                      key={portal.id}
                      className={active === portal.id ? "active" : ""}
                      onClick={() => {
                        onNavigate(portal.id)
                        setSwitcherOpen(false)
                      }}
                    >
                      <span className="switcher-option-icon">
                        <Icon name={portal.icon} size={17} />
                      </span>
                      <span>
                        <strong>{portal.label}</strong>
                        <small>{portal.description}</small>
                      </span>
                      {active === portal.id && <Icon name="check" size={15} />}
                    </button>
                  ))}
                  <div className="switcher-menu-note">
                    One skill graph. Six connected perspectives.
                  </div>
                </div>
              )}
            </div>
          </div>

          <label className="app-search">
            <Icon name="search" size={17} />
            <input
              type="search"
              placeholder="Search skills, careers, people or roles"
              aria-label="Global search"
            />
            <span>⌘ K</span>
          </label>

          <div className="app-actions">
            <button
              className="icon-btn notification"
              aria-label="Notifications"
            >
              <Icon name="bell" />
              <span />
            </button>
            <span className="app-action-divider" />
            <button className="profile-menu" aria-label="Open profile menu">
              <span className="avatar">AK</span>
              <span className="profile-copy">
                <strong>Arman Kumar</strong>
                <small>Student · Chandigarh University</small>
              </span>
              <Icon name="chevron" size={13} />
            </button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="global-header">
      <div className="nav-wrap">
        <Logo onClick={() => onNavigate("home")} />
        <nav
          className={`main-nav ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {portals.map((portal) => (
            <button
              key={portal.id}
              className={`nav-link ${active === portal.id ? "active" : ""}`}
              onClick={() => {
                onNavigate(portal.id)
                setOpen(false)
              }}
            >
              {portal.label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn search-action" aria-label="Search">
            <Icon name="search" />
          </button>
          <button className="icon-btn notification" aria-label="Notifications">
            <Icon name="bell" />
            <span />
          </button>
          <button className="avatar" aria-label="Profile">
            AK
          </button>
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  )
}
