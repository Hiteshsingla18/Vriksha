import { portals } from "../../data/portals"
import { PortalId } from "../../types"
import Logo from "../common/Logo"

interface FooterProps {
  onNavigate: (id: PortalId) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Logo onClick={() => onNavigate("home")} />
        <span>Skills are connected. So are opportunities.</span>
      </div>
      <div className="footer-links">
        <nav className="footer-section" aria-label="Platform links">
          <strong>Platform</strong>
          {portals.map((portal) => (
            <button key={portal.id} onClick={() => onNavigate(portal.id)}>
              {portal.label}
            </button>
          ))}
        </nav>
        <div className="footer-section">
          <strong>Guidelines</strong>
          <span>How Vriksha works</span>
          <span>Skill intelligence guidelines</span>
          <span>Explainable matching</span>
          <span>Responsible use</span>
        </div>
        <div className="footer-section">
          <strong>Company</strong>
          <span>About Vriksha</span>
          <span>Our approach</span>
          <span>Contact</span>
        </div>
        <div className="footer-section">
          <strong>Legal</strong>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Accessibility</span>
        </div>
      </div>
      <small className="footer-copyright">
        © 2026 Vriksha. Building a connected skill ecosystem.
      </small>
    </footer>
  )
}
