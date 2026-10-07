import { useState, useEffect } from "react"
import { MarketRadarFlightDeck } from "./components/grower/MarketRadarFlightDeck"


type PortalId = "home" | "explorer" | "builder" | "grower" | "colleges" | "hiring" | "company"
type IconName = "search" | "bell" | "arrow" | "spark" | "grid" | "branch" | "book" | "people" | "building" | "menu" | "close" | "chevron" | "check" | "target"

const portals: {
  id: PortalId
  label: string
  kicker: string
  description: string
  icon: IconName
}[] = [
  {
    id: "explorer",
    label: "Explorer",
    kicker: "Discover",
    description: "Discover where you could go.",
    icon: "search",
  },
  {
    id: "builder",
    label: "Builder",
    kicker: "Develop",
    description: "Build the skills to get there.",
    icon: "grid",
  },
  {
    id: "grower",
    label: "Grower",
    kicker: "Progress",
    description: "Find what could come next.",
    icon: "branch",
  },
  {
    id: "colleges",
    label: "Colleges",
    kicker: "Align",
    description: "Connect curriculum with the market.",
    icon: "book",
  },
  {
    id: "hiring",
    label: "Hiring",
    kicker: "Match",
    description: "Find talent through skills.",
    icon: "people",
  },
  {
    id: "company",
    label: "Company",
    kicker: "Plan",
    description: "Plan the skills your workforce needs.",
    icon: "building",
  },
]

function Icon({ name, size = 18 }: { name: IconName size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
        <path d="M10 20h4" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    spark: (
      <>
        <path d="M12 2c.5 5.5 2.5 8 8 8-5.5.5-7.5 3-8 8-.5-5-2.5-7.5-8-8 5.5 0 7.5-2.5 8-8Z" />
      </>
    ),
    grid: (
      <>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </>
    ),
    branch: (
      <>
        <path d="M6 3v8a5 5 0 0 0 5 5h7" />
        <path d="m15 13 3 3-3 3" />
        <path d="M6 8h5a4 4 0 0 0 4-4V3" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5Z" />
        <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5Z" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2" />
        <path d="M3 20c0-4 2-6 6-6s6 2 6 6" />
        <path d="M15 15c3 0 5 1.5 5 4" />
      </>
    ),
    building: (
      <>
        <path d="M5 21V4h10v17" />
        <path d="M15 9h4v12" />
        <path d="M8 8h4M8 12h4M8 16h4M3 21h18" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    chevron: (
      <>
        <path d="m9 6 6 6-6 6" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  variant = "primary",
  onClick,
  icon,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "text"
  onClick?: () => void
  icon?: IconName
}) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
      {icon && <Icon name={icon} />}
    </button>
  )
}

function Heading({
  children,
  level = 2,
  className = "",
}: {
  children: React.ReactNode
  level?: 1 | 2 | 3
  className?: string
}) {
  return (
    <div className={`heading heading-${level} ${className}`}>{children}</div>
  )
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button className="logo" onClick={onClick} aria-label="Vriksha home">
      <span className="logo-mark">
        <span />
        <span />
        <span />
      </span>
      VRIKSHA
    </button>
  )
}

function Header({
  active,
  onNavigate,
}: {
  active: PortalId
  onNavigate: (id: PortalId) => void
}) {
  const [open, setOpen] = useState(false)
  const [switcherOpen, setSwitcherOpen] = useState(false)

  if (active !== "home") {
    const currentPortal = portals.find((portal) => portal.id === active)!
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
                <strong>Arun Kumar</strong>
                <small>Personal workspace</small>
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

function SkillGraph({ compact = false }: { compact?: boolean }) {
  const nodes = compact
    ? [
        { l: "Python", m: "Skill", x: 49, y: 15, t: "skill" },
        { l: "Machine Learning", m: "Skill", x: 34, y: 48, t: "skill" },
        { l: "Data", m: "Skill", x: 66, y: 50, t: "skill" },
        { l: "ML Engineer", m: "Role", x: 50, y: 82, t: "role" },
      ]
    : [
        { l: "Skills", m: "4.8k mapped", x: 50, y: 10, t: "core" },
        { l: "People", m: "Profiles", x: 16, y: 39, t: "people" },
        { l: "Careers", m: "Pathways", x: 40, y: 44, t: "career" },
        { l: "Education", m: "Learning", x: 76, y: 38, t: "education" },
        { l: "Employers", m: "Demand", x: 31, y: 76, t: "employer" },
        { l: "Companies", m: "Workforce", x: 68, y: 78, t: "company" },
      ]
  const links = compact
    ? [
        [49, 15, 34, 48],
        [49, 15, 66, 50],
        [34, 48, 50, 82],
        [66, 50, 50, 82],
      ]
    : [
        [50, 10, 16, 39],
        [50, 10, 40, 44],
        [50, 10, 76, 38],
        [16, 39, 31, 76],
        [40, 44, 31, 76],
        [40, 44, 68, 78],
        [76, 38, 68, 78],
        [31, 76, 68, 78],
      ]
  return (
    <div className={`skill-graph ${compact ? "compact" : ""}`}>
      <svg
        className="graph-lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {links.map((line, i) => (
          <path
            key={i}
            d={`M${line[0]} ${line[1]} C${line[0]} ${(line[1] + line[3]) / 2}, ${line[2]} ${(line[1] + line[3]) / 2}, ${line[2]} ${line[3]}`}
          />
        ))}
      </svg>
      {nodes.map((node) => (
        <div
          key={node.l}
          className={`graph-node node-${node.t}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <span>
            {node.l}
            <small>{node.m}</small>
          </span>
        </div>
      ))}
      <div className="graph-pulse pulse-one" />
      <div className="graph-pulse pulse-two" />
    </div>
  )
}

function PortalTree({ onNavigate }: { onNavigate: (id: PortalId) => void }) {
  const treePortals = [
    { id: "explorer" as PortalId, label: "Explorer", x: 16, y: 21 },
    { id: "builder" as PortalId, label: "Builder", x: 39, y: 12 },
    { id: "grower" as PortalId, label: "Grower", x: 62, y: 12 },
    { id: "colleges" as PortalId, label: "Colleges", x: 84, y: 21 },
    { id: "hiring" as PortalId, label: "Hiring", x: 27, y: 48 },
    { id: "company" as PortalId, label: "Company", x: 74, y: 48 },
  ]
  const branches = [
    "M50 82 C50 68 42 61 27 48",
    "M50 82 C50 67 60 60 74 48",
    "M27 48 C24 37 20 29 16 21",
    "M27 48 C31 34 35 22 39 12",
    "M74 48 C68 32 66 22 62 12",
    "M74 48 C78 37 81 29 84 21",
    "M27 48 C41 43 59 43 74 48",
  ]
  return (
    <div className="portal-tree">
      <svg viewBox="0 0 100 100" role="img" aria-label="Vriksha portal tree">
        <g className="tree-branches">
          {branches.map((branch) => (
            <path key={branch} d={branch} />
          ))}
        </g>
        <g className="tree-trunk">
          <path d="M50 94 C49 88 50 85 50 82" />
          <circle cx="50" cy="83" r="6" />
          <text x="50" y="82">
            VRIKSHA
          </text>
          <text x="50" y="86">
            ONE SKILL GRAPH
          </text>
        </g>
        {treePortals.map((portal) => (
          <g
            key={portal.id}
            className="tree-portal-node"
            role="button"
            tabIndex={0}
            aria-label={`Open ${portal.label}`}
            onClick={() => onNavigate(portal.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onNavigate(portal.id)
              }
            }}
            transform={`translate(${portal.x} ${portal.y})`}
          >
            <circle r="7.5" />
            <circle className="node-core-ring" r="5.8" />
            <text y=".5">{portal.label}</text>
          </g>
        ))}
      </svg>
      <div className="tree-key">
        <span>Discover</span>
        <i />
        <span>Build</span>
        <i />
        <span>Grow</span>
        <i />
        <span>Connect</span>
      </div>
    </div>
  )
}

function Home({ onNavigate }: { onNavigate: (id: PortalId) => void }) {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <Icon name="spark" size={15} /> The live skill intelligence platform
          </div>
          <Heading level={1}>
            Skills are connected.
            <br />
            <em>So are opportunities.</em>
          </Heading>
          <div className="hero-sub">
            Vriksha connects people, skills, careers, education and
            companies—turning a changing world of work into paths everyone can
            understand.
          </div>
          <div className="button-row">
            <Button onClick={() => onNavigate("explorer")} icon="arrow">
              Explore Vriksha
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                document
                  .querySelector("#ecosystem")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              See how it works
            </Button>
          </div>
          <div className="trust-row">
            <span>
              <Icon name="check" size={14} /> Evidence-led pathways
            </span>
            <span>
              <Icon name="check" size={14} /> One shared skill language
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-label">
            <span>Vriksha</span> One platform · Six connected portals
          </div>
          <PortalTree onNavigate={onNavigate} />
          <div className="graph-caption">
            <span className="caption-dot" /> Select a portal to enter the skill
            intelligence ecosystem
          </div>
        </div>
      </section>

      <section className="portal-section" id="ecosystem">
        <div className="section-intro">
          <div>
            <div className="eyebrow">Six user portals</div>
            <Heading>
              One platform.
              <br />
              <em>Six perspectives.</em>
            </Heading>
          </div>
          <div className="section-copy">
            Every portal sees the same living skill graph from a different point
            of view—so discovery, development, education and work stay
            connected.
          </div>
        </div>
        <div className="portal-grid">
          {portals.map((portal, index) => (
            <button
              className="portal-card"
              key={portal.id}
              onClick={() => onNavigate(portal.id)}
            >
              <div className="card-index">0{index + 1}</div>
              <div className="portal-kicker">{portal.kicker}</div>
              <Heading level={3}>{portal.label}</Heading>
              <div className="portal-desc">{portal.description}</div>
              <div className="card-link">
                Enter portal <Icon name="arrow" size={16} />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="journey-section">
        <div className="journey-copy">
          <div className="eyebrow light">One connected journey</div>
          <Heading>
            From first question
            <br />
            to workforce decision.
          </Heading>
          <div className="journey-text">
            A career isn't a single choice. Vriksha makes every next step
            visible—and connects individual ambition to real market needs.
          </div>
          <Button
            variant="secondary"
            onClick={() => onNavigate("builder")}
            icon="arrow"
          >
            Follow the pathway
          </Button>
        </div>
        <div className="journey-path">
          {[
            ["Explore a direction", "Explorer", "explorer"],
            ["Build evidence", "Builder", "builder"],
            ["Find an adjacent leap", "Grower", "grower"],
            ["Connect learning to demand", "Colleges", "colleges"],
            ["Match with opportunity", "Hiring", "hiring"],
            ["Plan future capability", "Company", "company"],
          ].map(([step, portal, id], i) => (
            <button
              className="journey-step"
              key={step}
              onClick={() => onNavigate(id as PortalId)}
            >
              <span>0{i + 1}</span>
              <div>
                {step}
                <small>{portal}</small>
              </div>
              <Icon name="arrow" size={17} />
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

const portalMeta: Record<Exclude<PortalId, "home">, {
  eyebrow: string
  title: string
  sub: string
  nav: string[]
}> = {
  explorer: {
    eyebrow: "Career intelligence",
    title: "Find a direction that feels like yours.",
    sub: "Explore careers through skills, real work and the choices that shape them.",
    nav: [
      "Explorer Dashboard",
      "Career Discovery",
      "Skill Graph",
      "My Exploration",
      "Explorer Profile",
    ],
  },
  builder: {
    eyebrow: "Skill development",
    title: "Build your way to ML Engineer.",
    sub: "Turn your current skills into a focused path with practical evidence.",
    nav: [
      "Builder Dashboard",
      "Skill Gap",
      "Build Path",
      "Micro-Projects",
      "Skill Detail",
      "My Builder",
    ],
  },
  grower: {
    eyebrow: "Career mobility",
    title: "Your experience opens more than one path.",
    sub: "See where your transferable skills can take you next.",
    nav: [
      "Grower Dashboard",
      "Adjacent Leaps",
      "Transition Detail",
      "Opportunities",
      "Skill Mobility",
      "My Growth",
    ],
  },
  colleges: {
    eyebrow: "Education intelligence",
    title: "Where curriculum meets the market.",
    sub: "Understand the alignment between what students learn and what industry needs.",
    nav: [
      "Colleges Dashboard",
      "Curriculum vs Market",
      "Skill Gap Analysis",
      "Curriculum Explorer",
      "Industry Alignment",
      "Student Readiness",
      "Recommendations",
    ],
  },
  hiring: {
    eyebrow: "Talent intelligence",
    title: "See potential beyond the job title.",
    sub: "Discover relevant talent through skills, evidence and adjacent experience.",
    nav: [
      "Hiring Dashboard",
      "Role Detail",
      "Talent Discovery",
      "Explainable Matching",
      "Candidate Profile",
      "Skill-Based Search",
      "Talent Pipeline",
      "Talent Insights",
    ],
  },
  company: {
    eyebrow: "Workforce intelligence",
    title: "Build the capabilities your strategy needs.",
    sub: "Connect today’s workforce skills to tomorrow’s business priorities.",
    nav: [
      "Workforce Overview",
      "Skill Intelligence",
      "Skill Gaps",
      "Internal Mobility",
      "Build vs Buy",
    ],
  },
}

function Metric({
  value,
  label,
  change,
}: {
  value: string
  label: string
  change?: string
}) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {change && <div className="metric-change">{change}</div>}
    </div>
  )
}

function SkillChip({
  children,
  tone = "default",
}: {
  children: React.ReactNode
  tone?: "default" | "lime" | "sage" | "warm"
}) {
  return <span className={`skill-chip chip-${tone}`}>{children}</span>
}

function ProgressBar({
  value,
  tone = "green",
}: {
  value: number
  tone?: "green" | "lime" | "gold"
}) {
  return (
    <div className="progress-track">
      <div
        className={`progress-fill fill-${tone}`}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

const explorerCareers = [
  {
    role: "Machine Learning Engineer",
    category: "AI & Data",
    context: "High demand · Technology",
    skills: ["Python", "Machine Learning", "Data"],
    match: "Strong skill overlap",
    coverage: 74,
  },
  {
    role: "Data Scientist",
    category: "Analytics",
    context: "Growing demand · Cross-industry",
    skills: ["Python", "Statistics", "SQL"],
    match: "5 shared skills",
    coverage: 68,
  },
  {
    role: "MLOps Engineer",
    category: "Cloud & Infrastructure",
    context: "High demand · Technology",
    skills: ["Python", "Cloud", "Deployment"],
    match: "Adjacent direction",
    coverage: 61,
  },
  {
    role: "AI Product Manager",
    category: "Product & Strategy",
    context: "Emerging · Cross-industry",
    skills: ["Research", "ML literacy", "Strategy"],
    match: "Transferable potential",
    coverage: 52,
  },
]

function ExplorerCareerCard({
  career,
  saved,
  onSave,
  onOpen,
}: {
  career: typeof explorerCareers[number]
  saved: boolean
  onSave: () => void
  onOpen: () => void
}) {
  return (
    <div className="explorer-career-card">
      <div className="career-card-top">
        <span className="career-domain">{career.category}</span>
        <button
          className={`save-button ${saved ? "saved" : ""}`}
          onClick={onSave}
        >
          <Icon name={saved ? "check" : "spark"} size={14} />
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      <Heading level={3}>{career.role}</Heading>
      <div className="career-context">{career.context}</div>
      <div className="chip-row">
        {career.skills.map((skill) => (
          <SkillChip key={skill}>{skill}</SkillChip>
        ))}
      </div>
      <div className="career-coverage">
        <div>
          <span>{career.match}</span>
          <strong>{career.coverage}%</strong>
        </div>
        <ProgressBar value={career.coverage} tone="lime" />
      </div>
      <button className="career-open" onClick={onOpen}>
        Explore career <Icon name="arrow" size={15} />
      </button>
    </div>
  )
}

function ExplorerContent({
  navigate,
  view,
  onViewChange,
  onBuilderHandoff,
}: {
  navigate: (id: PortalId) => void
  view: number
  onViewChange: (view: number) => void
  onBuilderHandoff: () => void
}) {
  const [savedCareers, setSavedCareers] = useState(["Data Scientist"])
  const [selectedSkill, setSelectedSkill] = useState("Python")
  const toggleSaved = (role: string) =>
    setSavedCareers((current) =>
      current.includes(role)
        ? current.filter((item) => item !== role)
        : [...current, role],
    )

  if (view === 1) {
    return (
      <div className="explorer-screen">
        <div className="discovery-toolbar panel">
          <label className="discovery-search">
            <Icon name="search" size={17} />
            <input
              type="search"
              placeholder="Search careers, roles or skills"
              aria-label="Search careers"
            />
          </label>
          {[
            "Skills: Any",
            "Domain: Any",
            "Experience: Early career",
            "Demand",
          ].map((filter) => (
            <button className="filter-button" key={filter}>
              {filter} <Icon name="chevron" size={12} />
            </button>
          ))}
        </div>
        <div className="category-strip">
          {[
            ["All careers", "184"],
            ["AI & Data", "38"],
            ["Engineering", "46"],
            ["Product", "27"],
            ["Design", "19"],
            ["Business", "54"],
          ].map((category, i) => (
            <button className={i === 0 ? "active" : ""} key={category[0]}>
              <span>{category[0]}</span>
              <small>{category[1]}</small>
            </button>
          ))}
        </div>
        <div className="results-heading">
          <div>
            <div className="card-label">Recommended for your profile</div>
            <Heading level={3}>
              Career directions with credible connections
            </Heading>
          </div>
          <span>24 directions · Sorted by relevance</span>
        </div>
        <div className="career-card-grid">
          {explorerCareers.map((career) => (
            <ExplorerCareerCard
              key={career.role}
              career={career}
              saved={savedCareers.includes(career.role)}
              onSave={() => toggleSaved(career.role)}
              onOpen={() => onViewChange(5)}
            />
          ))}
        </div>
      </div>
    )
  }

  if (view === 2) {
    const related = {
      Python: ["Data analysis", "Machine learning", "APIs", "Automation"],
      "Machine Learning": ["Statistics", "Python", "Model evaluation", "MLOps"],
      SQL: ["Data modelling", "Analytics", "Databases", "BI tools"],
    }[selectedSkill] || [
      "Systems thinking",
      "Data",
      "Research",
      "Communication",
    ]
    return (
      <div className="skill-explorer-layout">
        <div className="panel skill-map-panel">
          <div className="skill-map-toolbar">
            <label className="discovery-search">
              <Icon name="search" size={16} />
              <input
                type="search"
                placeholder="Find a skill in the graph"
                aria-label="Search skills"
              />
            </label>
            <div className="map-legend">
              <span>
                <i className="legend-skill" /> Skill
              </span>
              <span>
                <i className="legend-career" /> Career
              </span>
              <span>
                <i className="legend-opportunity" /> Opportunity
              </span>
            </div>
          </div>
          <div className="explorer-skill-map">
            <svg viewBox="0 0 100 65" preserveAspectRatio="none">
              {[
                [50, 31, 22, 14],
                [50, 31, 20, 50],
                [50, 31, 77, 12],
                [50, 31, 80, 49],
                [22, 14, 8, 32],
                [20, 50, 43, 57],
                [77, 12, 91, 29],
                [80, 49, 60, 57],
              ].map((line, i) => (
                <path
                  key={i}
                  d={`M${line[0]} ${line[1]} C${line[0]} ${line[3]}, ${line[2]} ${line[1]}, ${line[2]} ${line[3]}`}
                />
              ))}
            </svg>
            {[
              ["Python", 50, 31, "primary"],
              ["Data Science", 22, 14, "career"],
              ["Backend Engineer", 20, 50, "career"],
              ["Machine Learning", 77, 12, "skill"],
              ["Automation", 80, 49, "skill"],
              ["Data Analyst", 8, 32, "career"],
              ["Fintech roles", 43, 57, "opportunity"],
              ["ML Engineer", 91, 29, "career"],
              ["Climate tech", 60, 57, "opportunity"],
            ].map(([name, x, y, type]) => (
              <button
                key={name}
                className={`map-node map-node-${type} ${
                  selectedSkill === name ? "selected" : ""
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
                onClick={() => setSelectedSkill(name as string)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="map-footer">
            <span>
              <span className="live-dot" /> 48 visible connections
            </span>
            <div>
              <button>−</button>
              <span>100%</span>
              <button>+</button>
            </div>
          </div>
        </div>
        <div className="panel skill-detail-panel">
          <div className="card-label">Selected skill</div>
          <Heading level={2}>{selectedSkill}</Heading>
          <p>
            A versatile technical skill used across data, software, automation
            and emerging AI roles.
          </p>
          <div className="skill-signal-row">
            <span>
              <small>Market demand</small>
              <strong>High</strong>
            </span>
            <span>
              <small>Your level</small>
              <strong>Proficient</strong>
            </span>
          </div>
          <div className="detail-section">
            <strong>Related skills</strong>
            <div className="chip-row">
              {related.map((skill) => (
                <SkillChip key={skill}>{skill}</SkillChip>
              ))}
            </div>
          </div>
          <div className="detail-section">
            <strong>Connected careers</strong>
            {["ML Engineer", "Data Scientist", "Backend Engineer"].map(
              (career, i) => (
                <button
                  className="detail-link-row"
                  key={career}
                  onClick={() => onViewChange(5)}
                >
                  <span>
                    <small>0{i + 1}</small>
                    {career}
                  </span>
                  <Icon name="chevron" size={14} />
                </button>
              ),
            )}
          </div>
          <Button onClick={() => navigate("builder")} icon="arrow">
            Build this skill
          </Button>
        </div>
      </div>
    )
  }

  if (view === 3) {
    return (
      <div className="saved-layout">
        <div className="explorer-tabs">
          {[
            "Saved careers  3",
            "Saved skills  6",
            "Recently viewed  8",
            "History",
          ].map((tab, i) => (
            <button className={i === 0 ? "active" : ""} key={tab}>
              {tab}
            </button>
          ))}
        </div>
        <div className="saved-grid">
          {explorerCareers.slice(0, 3).map((career) => (
            <ExplorerCareerCard
              key={career.role}
              career={career}
              saved
              onSave={() => toggleSaved(career.role)}
              onOpen={() => onViewChange(5)}
            />
          ))}
        </div>
        <div className="panel history-panel">
          <div className="panel-head">
            <div>
              <div className="card-label">Exploration history</div>
              <Heading level={3}>Your recent trail</Heading>
            </div>
            <Button variant="text">Clear history</Button>
          </div>
          {[
            ["Compared ML Engineer and Data Scientist", "Today · 10:42"],
            ["Explored Python skill connections", "Yesterday · 16:18"],
            ["Saved MLOps Engineer", "May 18 · 12:06"],
            ["Updated interest: Climate technology", "May 16 · 09:34"],
          ].map((event, i) => (
            <div className="history-row" key={event[0]}>
              <span className="history-marker">{i + 1}</span>
              <span>
                <strong>{event[0]}</strong>
                <small>{event[1]}</small>
              </span>
              <Icon name="chevron" size={14} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (view === 4) {
    return (
      <div className="profile-layout">
        <div className="panel profile-summary">
          <div className="profile-identity">
            <span className="profile-large-avatar">AK</span>
            <div>
              <Heading level={3}>Arun Kumar</Heading>
              <p>Software engineering student · Bengaluru</p>
            </div>
          </div>
          <div className="completion-ring">
            <span>
              78<small>%</small>
            </span>
          </div>
          <div className="completion-copy">
            <strong>Profile completeness</strong>
            <p>
              Add one project and your preferred work environments to improve
              career connections.
            </p>
          </div>
          <Button variant="secondary">Complete profile</Button>
        </div>
        <div className="panel profile-details">
          <div className="panel-head">
            <div>
              <div className="card-label">Skill profile</div>
              <Heading level={3}>Skills and proficiency</Heading>
            </div>
            <Button variant="text">Edit skills</Button>
          </div>
          {[
            ["Programming", "Python, JavaScript, SQL", 84],
            ["Data & analysis", "Pandas, statistics, visualisation", 68],
            ["Product thinking", "Research, problem framing", 61],
            ["Collaboration", "Communication, teamwork", 79],
          ].map(([category, skills, value]) => (
            <div className="profile-skill-row" key={category as string}>
              <span>
                <strong>{category}</strong>
                <small>{skills}</small>
              </span>
              <div>
                <ProgressBar value={value as number} />
                <small>{value}%</small>
              </div>
            </div>
          ))}
        </div>
        <div className="panel profile-block">
          <div className="panel-head">
            <div>
              <div className="card-label">Interests</div>
              <Heading level={3}>What draws your attention</Heading>
            </div>
            <Button variant="text">Edit</Button>
          </div>
          <div className="interest-grid">
            {[
              "Artificial intelligence",
              "Climate technology",
              "Developer tools",
              "Education",
            ].map((x) => (
              <SkillChip tone="sage" key={x}>
                {x}
              </SkillChip>
            ))}
          </div>
        </div>
        <div className="panel profile-block">
          <div className="panel-head">
            <div>
              <div className="card-label">Experience & projects</div>
              <Heading level={3}>Evidence so far</Heading>
            </div>
            <Button variant="text">Add project</Button>
          </div>
          <div className="project-summary">
            <span className="project-symbol">
              <Icon name="grid" />
            </span>
            <span>
              <strong>Campus energy dashboard</strong>
              <small>Python · Data visualisation · APIs</small>
            </span>
          </div>
          <div className="project-summary">
            <span className="project-symbol">
              <Icon name="branch" />
            </span>
            <span>
              <strong>Open-source contributor</strong>
              <small>JavaScript · Git · Collaboration</small>
            </span>
          </div>
        </div>
        <div className="panel full-width interest-direction">
          <div>
            <div className="card-label">Career interests</div>
            <Heading level={3}>Directions you are considering</Heading>
          </div>
          <div className="chip-row">
            <SkillChip tone="lime">ML Engineer</SkillChip>
            <SkillChip>Data Scientist</SkillChip>
            <SkillChip>MLOps Engineer</SkillChip>
          </div>
          <Button variant="secondary" onClick={() => onViewChange(1)}>
            Explore more directions
          </Button>
        </div>
      </div>
    )
  }

  if (view === 5) {
    return (
      <div className="career-detail-layout">
        <button className="back-link" onClick={() => onViewChange(1)}>
          <Icon name="arrow" size={14} /> Back to career discovery
        </button>
        <div className="career-detail-hero">
          <div>
            <div className="career-detail-meta">
              <SkillChip tone="lime">High demand</SkillChip>
              <span>AI & Data · Technology</span>
            </div>
            <Heading level={1}>Machine Learning Engineer</Heading>
            <p>
              Design, build and operate intelligent systems that learn from data
              and improve products, services and decisions.
            </p>
            <div className="button-row">
              <Button onClick={onBuilderHandoff} icon="arrow">
                Explore build pathway
              </Button>
              <Button variant="secondary">Save career</Button>
            </div>
          </div>
          <div className="career-fit-panel">
            <div className="card-label">Your connection</div>
            <strong>Credible direction</strong>
            <div className="fit-score">
              <span>74%</span>
              <ProgressBar value={74} tone="lime" />
            </div>
            <p>
              You already have 5 of 8 foundational skills. Production ML is your
              largest development area.
            </p>
          </div>
        </div>
        <div className="career-detail-grid">
          <div className="panel span-two">
            <div className="panel-head">
              <div>
                <div className="card-label">Personal skill gap</div>
                <Heading level={3}>Your skill landscape</Heading>
              </div>
              <span className="updated">Based on your Explorer profile</span>
            </div>
            <div className="skill-comparison">
              <div className="skill-landscape-group have">
                <strong>You already have</strong>
                {["Python", "SQL", "Statistics"].map((x) => (
                  <div className="skill-check" key={x}>
                    <Icon name="check" size={13} />
                    {x}
                    <SkillChip tone="sage">In profile</SkillChip>
                  </div>
                ))}
              </div>
              <div className="skill-landscape-bridge">
                <span>Skill gap</span>
                <Icon name="arrow" size={18} />
              </div>
              <div className="skill-landscape-group build">
                <strong>Skills to build</strong>
                {[
                  "Machine Learning",
                  "Model Evaluation",
                  "Data Processing",
                ].map((x, i) => (
                  <div className="skill-check skill-gap-item" key={x}>
                    <span>{i + 1}</span>
                    {x}
                    <SkillChip tone="warm">Gap</SkillChip>
                  </div>
                ))}
              </div>
            </div>
            <div className="skill-landscape-actions">
              <Button onClick={onBuilderHandoff} icon="arrow">
                Build these skills
              </Button>
              <Button variant="text" onClick={() => onViewChange(1)}>
                Explore another path
              </Button>
            </div>
          </div>
          <div className="panel">
            <div className="card-label">Typical progression</div>
            <Heading level={3}>A pathway, not a ladder</Heading>
            <div className="career-timeline">
              {[
                "Software Engineer",
                "MLOps Engineer",
                "ML Engineer",
                "AI Platform Lead",
              ].map((x, i) => (
                <div className={i === 2 ? "current" : ""} key={x}>
                  <span>{i + 1}</span>
                  <p>
                    <strong>{x}</strong>
                    <small>
                      {i === 2
                        ? "Target direction"
                        : i < 2
                          ? "Credible entry route"
                          : "Future possibility"}
                    </small>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="panel full-width related-opportunities">
            <div>
              <div className="card-label">Related opportunities</div>
              <Heading level={3}>See where this direction appears</Heading>
            </div>
            {[
              "Product ML · Northstar Labs",
              "Applied AI · GreenGrid",
              "ML Platform · Aster Health",
            ].map((x, i) => (
              <button key={x}>
                <span>
                  <strong>{x}</strong>
                  <small>
                    {
                      [
                        "Bengaluru · Hybrid",
                        "Remote · Climate tech",
                        "Mumbai · Healthcare",
                      ][i]
                    }
                  </small>
                </span>
                <SkillChip>
                  {["5 shared skills", "4 shared skills", "6 shared skills"][i]}
                </SkillChip>
                <Icon name="chevron" size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="explorer-dashboard">
      <div className="welcome-strip">
        <div>
          <span>Tuesday, 20 May</span>
          <Heading level={3}>
            Good morning, Arun. Where could your skills take you?
          </Heading>
        </div>
        <Button
          variant="secondary"
          onClick={() => onViewChange(1)}
          icon="arrow"
        >
          Discover careers
        </Button>
      </div>
      <div className="dashboard-grid explorer-overview-grid">
        <div className="panel skill-profile-card">
          <div className="panel-head">
            <div>
              <div className="card-label">Current skill profile</div>
              <Heading level={3}>Your strongest foundations</Heading>
            </div>
            <span className="updated">12 mapped skills</span>
          </div>
          {[
            ["Programming", 84, "Python · JavaScript · SQL"],
            ["Data & analysis", 68, "Pandas · Statistics"],
            ["Product thinking", 61, "Research · Problem framing"],
            ["Collaboration", 79, "Communication · Teamwork"],
          ].map(([name, value, skills]) => (
            <div className="dashboard-skill-row" key={name as string}>
              <div>
                <span>
                  <strong>{name}</strong>
                  <small>{skills}</small>
                </span>
                <b>{value}%</b>
              </div>
              <ProgressBar
                value={value as number}
                tone={value as number > 75 ? "lime" : "green"}
              />
            </div>
          ))}
          <Button variant="text" onClick={() => onViewChange(4)} icon="arrow">
            View full profile
          </Button>
        </div>
        <div className="panel position-graph-card">
          <div className="panel-head">
            <div>
              <div className="card-label">Your position in the graph</div>
              <Heading level={3}>Skills open nearby directions</Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(2)}>
              Explore graph
            </Button>
          </div>
          <SkillGraph compact />
          <div className="graph-insight">
            <Icon name="spark" size={15} />
            <span>
              <strong>3 new connections</strong> appeared after adding your data
              project.
            </span>
          </div>
        </div>
        <div className="panel full-width">
          <div className="panel-head">
            <div>
              <div className="card-label">Recommended directions</div>
              <Heading level={3}>
                Careers connected to what you already know
              </Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(1)} icon="arrow">
              View all careers
            </Button>
          </div>
          <div className="dashboard-career-row">
            {explorerCareers.slice(0, 3).map((career, i) => (
              <button key={career.role} onClick={() => onViewChange(5)}>
                <span className="rank">0{i + 1}</span>
                <span>
                  <strong>{career.role}</strong>
                  <small>{career.category}</small>
                </span>
                <div className="mini-skill-stack">
                  {career.skills.slice(0, 2).map((x) => (
                    <SkillChip key={x}>{x}</SkillChip>
                  ))}
                </div>
                <span className="career-match-label">
                  {career.match}
                  <small>{career.coverage}% connection</small>
                </span>
                <Icon name="chevron" size={15} />
              </button>
            ))}
          </div>
        </div>
        <div className="panel activity-panel">
          <div className="panel-head">
            <div>
              <div className="card-label">Recent exploration</div>
              <Heading level={3}>Continue where you left off</Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(3)}>
              View history
            </Button>
          </div>
          {[
            "Machine Learning Engineer",
            "Python skill connections",
            "MLOps Engineer",
          ].map((x, i) => (
            <button
              key={x}
              onClick={() => (i === 1 ? onViewChange(2) : onViewChange(5))}
            >
              <span className="activity-icon">
                <Icon name={i === 1 ? "branch" : "target"} size={15} />
              </span>
              <span>
                <strong>{x}</strong>
                <small>
                  {
                    [
                      "Viewed 2 hours ago",
                      "Explored yesterday",
                      "Saved on 18 May",
                    ][i]
                  }
                </small>
              </span>
              <Icon name="chevron" size={14} />
            </button>
          ))}
        </div>
        <div className="panel next-actions-panel">
          <div className="card-label">Suggested next actions</div>
          <Heading level={3}>Make your next exploration count</Heading>
          {[
            ["Compare two directions", "See trade-offs side by side"],
            ["Add a project", "Reveal more skill connections"],
            ["Explore a missing skill", "Understand the shortest path"],
          ].map((x, i) => (
            <button
              key={x[0]}
              onClick={() =>
                i === 1 ? onViewChange(4) : onViewChange(i === 2 ? 2 : 1)
              }
            >
              <span>0{i + 1}</span>
              <span>
                <strong>{x[0]}</strong>
                <small>{x[1]}</small>
              </span>
              <Icon name="arrow" size={14} />
            </button>
          ))}
        </div>
/* --- BUILDER PORTAL — TREE OVERLAY ENGINE --- */
function TreeOverlayVisualizer() {
  const [targetRole, setTargetRole] = useState("Data Scientist")
  const [expYears, setExpYears] = useState(2.0)
  const [skillsText, setSkillsText] = useState("Python, SQL, Tableau, Statistics, Excel")
  const [resumeText, setResumeText] = useState("Aspiring Data Practitioner skilled in Python, SQL, Tableau, A/B Testing, and Descriptive Statistics.")
  const [activeFilter, setActiveFilter] = useState<"all" | "thriving_unlit" | "lit">("all")
  const [treeData, setTreeData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [selectedLeaf, setSelectedLeaf] = useState<any>(null)

  const rolesList = [
    "Data Scientist",
    "Machine Learning Engineer",
    "Data Engineer",
    "Data Analyst",
    "Senior Data Scientist"
  ]

  const fetchTreeOverlay = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:8000/api/v1/builder/tree-overlay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_role: targetRole,
          current_experience_years: expYears,
          user_skills: skillsText.split(",").map(s => s.trim()).filter(Boolean),
          raw_resume_text: resumeText
        })
      })
      if (res.ok) {
        const data = await res.json()
        setTreeData(data)
      } else {
        throw new Error("Backend offline")
      }
    } catch {
      simulateTreeOverlay()
    } finally {
      setLoading(false)
    }
  }

  const simulateTreeOverlay = () => {
    const userSkillsSet = new Set(skillsText.toLowerCase().split(",").map(s => s.trim()).filter(Boolean))
    
    const branchDefs = [
      {
        id: "maths_stats", label: "Mathematics & Statistics", weight: 0.28, correlation_r: 0.51,
        leaves: [
          { id: "la", label: "Linear Algebra & Matrix Ops", canonical: "Linear Algebra", correlation_r: 0.52, prevalence: 78 },
          { id: "ab", label: "Hypothesis & A/B Testing", canonical: "A/B Testing", correlation_r: 0.54, prevalence: 82 },
          { id: "prob", label: "Probability & Bayesian Models", canonical: "Probability", correlation_r: 0.48, prevalence: 75 },
          { id: "ts", label: "Time Series & Forecasting", canonical: "Time Series", correlation_r: 0.44, prevalence: 68 },
          { id: "pca", label: "PCA & SVD Matrix Decomposition", canonical: "PCA", correlation_r: 0.35, prevalence: 55 },
          { id: "stats", label: "Descriptive Summary Stats", canonical: "Statistics", correlation_r: 0.18, prevalence: 90 }
        ]
      },
      {
        id: "dashboard_storytelling", label: "Data Storytelling & Dashboarding", weight: 0.28, correlation_r: 0.54,
        leaves: [
          { id: "tab", label: "Tableau & PowerBI Dashboards", canonical: "Tableau", correlation_r: 0.56, prevalence: 85 },
          { id: "story", label: "Executive Data Storytelling", canonical: "Data Storytelling", correlation_r: 0.58, prevalence: 80 },
          { id: "kpi", label: "KPI Design & BI Metrics", canonical: "KPI Design", correlation_r: 0.52, prevalence: 76 },
          { id: "plotly", label: "Plotly & D3.js Custom Charts", canonical: "Plotly", correlation_r: 0.42, prevalence: 60 },
          { id: "excel", label: "Spreadsheet Reporting", canonical: "Excel", correlation_r: 0.15, prevalence: 92 }
        ]
      },
      {
        id: "coding", label: "Coding & Software Fundamentals", weight: 0.22, correlation_r: 0.43,
        leaves: [
          { id: "py", label: "Advanced Python Architecture", canonical: "Python", correlation_r: 0.55, prevalence: 94 },
          { id: "sql", label: "SQL & Query Optimization", canonical: "SQL", correlation_r: 0.49, prevalence: 91 },
          { id: "sd", label: "System Design & Clean Code", canonical: "System Design", correlation_r: 0.46, prevalence: 70 },
          { id: "dsa", label: "Data Structures & Algorithms", canonical: "Algorithms", correlation_r: 0.42, prevalence: 74 },
          { id: "git", label: "Git Version Control & CI/CD", canonical: "Git", correlation_r: 0.38, prevalence: 80 }
        ]
      },
      {
        id: "ai_ml", label: "AI, ML & Modeling", weight: 0.17, correlation_r: 0.41,
        leaves: [
          { id: "torch", label: "PyTorch Deep Learning & Neural Nets", canonical: "PyTorch", correlation_r: 0.58, prevalence: 72 },
          { id: "llm", label: "LLMs, RAG & Transformers", canonical: "Transformers", correlation_r: 0.62, prevalence: 68 },
          { id: "ml", label: "XGBoost & Scikit-Learn Ensembles", canonical: "Machine Learning", correlation_r: 0.47, prevalence: 88 },
          { id: "mlops", label: "MLOps & Model Deployment", canonical: "FastAPI", correlation_r: 0.51, prevalence: 58 }
        ]
      },
      {
        id: "big_data", label: "Infrastructure & Big Data Tools", weight: 0.05, correlation_r: 0.11,
        leaves: [
          { id: "spark", label: "Apache Spark & PySpark", canonical: "PySpark", correlation_r: 0.45, prevalence: 65 },
          { id: "bq", label: "Snowflake & Google BigQuery", canonical: "BigQuery", correlation_r: 0.42, prevalence: 62 },
          { id: "airflow", label: "Apache Airflow & ETL Pipelines", canonical: "Airflow", correlation_r: 0.36, prevalence: 54 },
          { id: "hadoop", label: "Legacy Hadoop / MapReduce", canonical: "Hadoop", correlation_r: 0.08, prevalence: 30 }
        ]
      }
    ]

    let totalLeaves = 0, litCount = 0, thrivingUnlitCount = 0, accumRoi = 0.0
    const processedBranches = branchDefs.map(b => {
      let userProf = 0.0
      const processedLeaves = b.leaves.map(l => {
        totalLeaves++
        const isPossessed = Array.from(userSkillsSet).some(u => 
          l.canonical.toLowerCase().includes(u) || l.label.toLowerCase().includes(u) || u.includes(l.canonical.toLowerCase())
        )
        let state = "steady"
        let roiHike = 0.0
        let prof = 0.0

        if (isPossessed) {
          state = "lit"
          litCount++
          userProf += 1.0
          prof = Math.min(5.0, 3.2 + expYears * 0.4)
        } else if (l.correlation_r >= 0.40 && l.prevalence >= 50) {
          state = "thriving_unlit"
          thrivingUnlitCount++
          roiHike = Math.round(l.correlation_r * b.weight * 100 * 10) / 10
          accumRoi += roiHike
        } else if (l.correlation_r >= 0.25) {
          state = "steady"
        } else {
          state = "fading"
        }

        return {
          id: l.id,
          label: l.label,
          canonical_name: l.canonical,
          state,
          correlation_r: l.correlation_r,
          roi_hike_potential_pct: roiHike,
          market_prevalence_pct: l.prevalence,
          user_proficiency: prof
        }
      })

      const leafRatio = userProf / Math.max(1, b.leaves.length)
      const branchProf = Math.min(5.0, Math.max(1.0, 1.0 + leafRatio * 4.0))

      return {
        id: b.id,
        label: b.label,
        weight: b.weight,
        correlation_r: b.correlation_r,
        user_proficiency: Math.round(branchProf * 100) / 100,
        target_requirement: 4.5,
        leaves: processedLeaves
      }
    })

    const readinessPct = Math.round((litCount / Math.max(1, totalLeaves)) * 100)
    const baseSalary = Math.round((4.5 + expYears * 2.8) * 10) / 10
    const projHikePct = Math.min(65.0, Math.round(accumRoi * 0.75 * 10) / 10)
    const projMaxSalary = Math.round(baseSalary * (1 + projHikePct / 100) * 10) / 10

    setTreeData({
      tree_id: "tree_simulated",
      target_role: targetRole,
      role_benchmark: {
        avg_salary_lpa: baseSalary,
        min_salary_lpa: Math.round(baseSalary * 0.6 * 10) / 10,
        max_salary_lpa: Math.round(baseSalary * 1.8 * 10) / 10,
        salary_per_exp_year: Math.round((baseSalary / Math.max(1, expYears)) * 100) / 100,
        recommended_exp_years: expYears
      },
      branches: processedBranches,
      telemetry: {
        total_target_leaves: totalLeaves,
        lit_leaves_count: litCount,
        thriving_unlit_gaps_count: thrivingUnlitCount,
        current_readiness_pct: readinessPct,
        projected_salary_hike_pct: projHikePct,
        projected_max_salary_lpa: projMaxSalary,
        leadership_resilience_index: Math.round((1.2 + expYears * 0.4) * 100) / 100
      }
    })
  }

  useEffect(() => {
    fetchTreeOverlay()
  }, [targetRole, expYears])

  return (
    <div className="builder-tree-overlay-wrapper" style={{ marginTop: 24 }}>
      <div className="panel" style={{ background: "var(--forest-950)", color: "white", padding: 24, borderRadius: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
          <div>
            <div style={{ color: "var(--lime-300)", textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em" }}>
              🌳 Builder Portal — Tree Overlay Engine
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 28, margin: "6px 0 0 0", fontWeight: 400, color: "white" }}>
              Data Science Talent Graph & High-ROI Gap Overlay
            </h2>
            <p style={{ color: "var(--sage-300)", fontSize: 14, margin: "4px 0 0 0" }}>
              Compare your verified lit skills against target market role benchmarks. Identify immediate high-ROI target gaps.
            </p>
          </div>
          <button 
            onClick={fetchTreeOverlay}
            style={{ background: "var(--lime-500)", color: "var(--forest-950)", border: 0, padding: "10px 20px", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}
          >
            {loading ? "Re-computing Tree..." : "Generate Tree Overlay"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, background: "rgba(255,255,255,0.06)", padding: 16, borderRadius: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "var(--sage-300)", marginBottom: 6 }}>Target Data Science Role</label>
            <select 
              value={targetRole} 
              onChange={e => setTargetRole(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: 8, background: "var(--forest-900)", color: "white", border: "1px solid var(--forest-800)", fontSize: 14 }}
            >
              {rolesList.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, color: "var(--sage-300)", marginBottom: 6 }}>Current Experience Level (Years)</label>
            <input 
              type="number" 
              step="0.5" 
              min="0" 
              max="15"
              value={expYears} 
              onChange={e => setExpYears(parseFloat(e.target.value) || 0)}
              style={{ width: "100%", padding: "10px", borderRadius: 8, background: "var(--forest-900)", color: "white", border: "1px solid var(--forest-800)", fontSize: 14 }}
            />
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", fontSize: 12, color: "var(--sage-300)", marginBottom: 6 }}>Verified Skills (Comma Separated)</label>
            <input 
              type="text" 
              value={skillsText} 
              onChange={e => setSkillsText(e.target.value)}
              placeholder="e.g. Python, SQL, Tableau, Statistics, PyTorch"
              style={{ width: "100%", padding: "10px", borderRadius: 8, background: "var(--forest-900)", color: "white", border: "1px solid var(--forest-800)", fontSize: 14 }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--sage-300)" }}>Filter Leaf States:</span>
          <button 
            onClick={() => setActiveFilter("all")}
            style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: "1px solid var(--forest-700)", cursor: "pointer", background: activeFilter === "all" ? "var(--lime-500)" : "transparent", color: activeFilter === "all" ? "var(--forest-950)" : "white" }}
          >
            All Leaves
          </button>
          <button 
            onClick={() => setActiveFilter("thriving_unlit")}
            style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: "1px solid var(--warm)", cursor: "pointer", background: activeFilter === "thriving_unlit" ? "var(--warm)" : "transparent", color: activeFilter === "thriving_unlit" ? "var(--forest-950)" : "white" }}
          >
            🔥 Thriving Unlit (High ROI Gaps)
          </button>
          <button 
            onClick={() => setActiveFilter("lit")}
            style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: "1px solid var(--sage-500)", cursor: "pointer", background: activeFilter === "lit" ? "var(--sage-500)" : "transparent", color: activeFilter === "lit" ? "var(--forest-950)" : "white" }}
          >
            🟢 Verified Lit Skills
          </button>
        </div>
      </div>

      {treeData && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, margin: "20px 0" }}>
            <div className="panel" style={{ background: "white", border: "1px solid var(--line)", padding: 20, borderRadius: 14 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>Role Target Readiness</div>
              <div style={{ fontSize: 32, fontFamily: "var(--serif)", color: "var(--forest-950)", marginTop: 4 }}>
                {treeData.telemetry.current_readiness_pct}%
              </div>
              <div style={{ fontSize: 12, color: "var(--forest-700)", marginTop: 4 }}>
                {treeData.telemetry.lit_leaves_count} of {treeData.telemetry.total_target_leaves} target skills verified
              </div>
            </div>

            <div className="panel" style={{ background: "white", border: "1px solid var(--line)", padding: 20, borderRadius: 14 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>High-ROI Skill Gaps</div>
              <div style={{ fontSize: 32, fontFamily: "var(--serif)", color: "var(--warm)", marginTop: 4 }}>
                {treeData.telemetry.thriving_unlit_gaps_count}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                Immediate Thriving Unlit priority skills
              </div>
            </div>

            <div className="panel" style={{ background: "white", border: "1px solid var(--line)", padding: 20, borderRadius: 14 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>Market Salary Benchmark</div>
              <div style={{ fontSize: 32, fontFamily: "var(--serif)", color: "var(--forest-950)", marginTop: 4 }}>
                ₹{treeData.role_benchmark.avg_salary_lpa} <small style={{ fontSize: 16 }}>LPA</small>
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                Range: ₹{treeData.role_benchmark.min_salary_lpa} - ₹{treeData.role_benchmark.max_salary_lpa} LPA
              </div>
            </div>

            <div className="panel" style={{ background: "#163c2e", color: "white", padding: 20, borderRadius: 14 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", color: "var(--lime-300)", fontWeight: 600 }}>Projected Hike Potential</div>
              <div style={{ fontSize: 32, fontFamily: "var(--serif)", color: "var(--lime-500)", marginTop: 4 }}>
                +{treeData.telemetry.projected_salary_hike_pct}%
              </div>
              <div style={{ fontSize: 12, color: "var(--sage-200)", marginTop: 4 }}>
                Projected Max: ₹{treeData.telemetry.projected_max_salary_lpa} LPA
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {treeData.branches.map((branch: any) => {
              const filteredLeaves = branch.leaves.filter((l: any) => {
                if (activeFilter === "lit") return l.state === "lit"
                if (activeFilter === "thriving_unlit") return l.state === "thriving_unlit"
                return true
              })

              if (filteredLeaves.length === 0) return null

              return (
                <div key={branch.id} className="panel" style={{ background: "white", padding: 24, borderRadius: 16, border: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div>
                      <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, color: "var(--forest-700)" }}>
                        BRANCH WEIGHT: {(branch.weight * 100).toFixed(0)}% · HIKE CORRELATION r = {branch.correlation_r}
                      </span>
                      <h3 style={{ margin: "4px 0 0 0", fontSize: 20, fontFamily: "var(--serif)", color: "var(--forest-950)" }}>
                        {branch.label}
                      </h3>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>Proficiency Rating</div>
                      <strong style={{ fontSize: 18, color: "var(--forest-900)" }}>{branch.user_proficiency} / 5.0</strong>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                    {filteredLeaves.map((leaf: any) => {
                      const isLit = leaf.state === "lit"
                      const isThriving = leaf.state === "thriving_unlit"
                      const isSteady = leaf.state === "steady"

                      let cardBg = "#f7f5ee"
                      let borderColor = "var(--line)"
                      let stateBadge = null

                      if (isLit) {
                        cardBg = "rgba(45, 103, 79, 0.08)"
                        borderColor = "var(--forest-700)"
                        stateBadge = <span style={{ background: "var(--forest-700)", color: "white", fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>🟢 Lit (Verified)</span>
                      } else if (isThriving) {
                        cardBg = "rgba(197, 140, 83, 0.12)"
                        borderColor = "var(--warm)"
                        stateBadge = <span style={{ background: "var(--warm)", color: "white", fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>🔥 Thriving Unlit (+{leaf.roi_hike_potential_pct}% ROI)</span>
                      } else if (isSteady) {
                        cardBg = "#ffffff"
                        borderColor = "var(--line)"
                        stateBadge = <span style={{ background: "#e9eee7", color: "var(--forest-900)", fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>🔵 Steady Baseline</span>
                      } else {
                        cardBg = "#f3f3f0"
                        borderColor = "#deded9"
                        stateBadge = <span style={{ background: "#d0d0c8", color: "#606058", fontSize: 10, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>🍂 Fading / Commoditized</span>
                      }

                      return (
                        <div 
                          key={leaf.id}
                          onClick={() => setSelectedLeaf(leaf)}
                          style={{
                            background: cardBg,
                            border: `1.5px solid ${borderColor}`,
                            borderRadius: 12,
                            padding: 16,
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                            <strong style={{ fontSize: 14, color: "var(--ink)" }}>{leaf.label}</strong>
                            {stateBadge}
                          </div>

                          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)" }}>
                            <span>Prevalence: {leaf.market_prevalence_pct}%</span>
                            <span>Correlation: r = {leaf.correlation_r}</span>
                          </div>

                          {isLit && (
                            <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: "var(--forest-700)" }}>
                              User Skill Rating: {leaf.user_proficiency} / 5.0
                            </div>
                          )}

                          {isThriving && (
                            <div style={{ marginTop: 8, fontSize: 12, fontWeight: 600, color: "var(--warm)" }}>
                              High ROI Target Gap · Prioritize Learning
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

/* --- HIRING PORTAL — SHADOW CANDIDATE AUDIT DASHBOARD --- */
function ShadowCandidateAuditDashboard() {
  const [jobTitle, setJobTitle] = useState("Senior Data Scientist")
  const [minExp, setMinExp] = useState(3.0)
  const [jdText, setJdText] = useState("Seeking a Senior Data Scientist proficient in Python, Statistics, Machine Learning, Tableau, and PySpark.")
  const [auditData, setAuditData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runAudit = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:8000/api/v1/audit/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_deconstruction: {
            job_designation: jobTitle,
            min_experience: minExp,
            raw_text: jdText
          }
        })
      })
      if (res.ok) {
        const data = await res.json()
        setAuditData(data)
      } else {
        throw new Error("Backend offline")
      }
    } catch {
      simulateAudit()
    } finally {
      setLoading(false)
    }
  }

  const simulateAudit = () => {
    setAuditData({
      audit_id: "audit_simulated",
      timestamp: new Date().toISOString(),
      summary: {
        total_processed: 5,
        passed_ats_count: 2,
        filtered_out_count: 3,
        shadow_candidates_recovered: 2,
        shadow_candidate_ratio_pct: 66.7,
        high_fit_total_count: 3
      },
      over_filtering_tax: {
        shadow_candidate_ratio_pct: 66.7,
        avg_market_salary_filtered_high_fit_lpa: 12.8,
        avg_market_salary_recruited_lpa: 16.5,
        salary_spread_lpa: 3.7,
        cost_inefficiency_tax_pct: 28.9,
        missed_talent_pool_count: 2
      },
      ranked_candidates: [
        {
          candidate_id: "c1",
          candidate_name: "Priya Patel (Shadow Gem)",
          match_index_pct: 88.5,
          composite_score: 4.45,
          composite_score_pct: 89.0,
          ats_status: "Filtered Out",
          is_shadow_candidate: true,
          rejection_reasons: ["Insufficient Experience: Has 2.5 yrs, JD requires minimum 3.0 yrs."],
          years_experience: 2.5,
          recent_titles: ["Data Analyst"],
          missing_skills: ["PySpark"],
          complementary_strengths: ["Linear Algebra", "Tableau", "Python", "A/B Testing"]
        },
        {
          candidate_id: "c2",
          candidate_name: "Rohan Gupta",
          match_index_pct: 84.0,
          composite_score: 4.20,
          composite_score_pct: 84.0,
          ats_status: "Passed ATS",
          is_shadow_candidate: false,
          rejection_reasons: [],
          years_experience: 5.0,
          recent_titles: ["Senior Data Scientist"],
          missing_skills: [],
          complementary_strengths: ["TensorFlow", "AWS"]
        },
        {
          candidate_id: "c3",
          candidate_name: "Ananya Roy (Shadow Gem)",
          match_index_pct: 79.2,
          composite_score: 3.96,
          composite_score_pct: 79.2,
          ats_status: "Filtered Out",
          is_shadow_candidate: true,
          rejection_reasons: ["Title Mismatch: Title 'Backend Software Engineer' does not match 'Senior Data Scientist'."],
          years_experience: 5.0,
          recent_titles: ["Backend Software Engineer"],
          missing_skills: ["Tableau"],
          complementary_strengths: ["C++", "PySpark", "Algorithms"]
        }
      ]
    })
  }

  useEffect(() => {
    runAudit()
  }, [])

  return (
    <div style={{ marginTop: 24 }}>
      <div className="panel" style={{ background: "var(--forest-950)", color: "white", padding: 24, borderRadius: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ color: "var(--lime-300)", textTransform: "uppercase", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em" }}>
              🛡️ Hiring Portal — Shadow Candidate Audit Engine
            </div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: 26, margin: "4px 0 0 0", color: "white" }}>
              Recover High-Fit Talent Filtered Out by Rigid Recruiter Constraints
            </h2>
          </div>
          <button onClick={runAudit} style={{ background: "var(--lime-500)", color: "var(--forest-950)", border: 0, padding: "10px 20px", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
            {loading ? "Auditing Pool..." : "Run Shadow Candidate Audit"}
          </button>
        </div>
      </div>

      {auditData && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, margin: "20px 0" }}>
            <div className="panel" style={{ background: "white", padding: 20, borderRadius: 14, border: "1px solid var(--line)" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>Shadow Candidate Ratio</div>
              <div style={{ fontSize: 32, fontFamily: "var(--serif)", color: "var(--warm)", marginTop: 4 }}>
                {auditData.summary.shadow_candidate_ratio_pct}%
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                {auditData.summary.shadow_candidates_recovered} high-fit candidates wrongly filtered out
              </div>
            </div>

            <div className="panel" style={{ background: "white", padding: 20, borderRadius: 14, border: "1px solid var(--line)" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 }}>Over-Filtering Tax (Salary Spread)</div>
              <div style={{ fontSize: 32, fontFamily: "var(--serif)", color: "var(--forest-950)", marginTop: 4 }}>
                ₹{auditData.over_filtering_tax.salary_spread_lpa} <small style={{ fontSize: 16 }}>LPA</small>
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                Recruited: ₹{auditData.over_filtering_tax.avg_market_salary_recruited_lpa} vs Shadow: ₹{auditData.over_filtering_tax.avg_market_salary_filtered_high_fit_lpa} LPA
              </div>
            </div>

            <div className="panel" style={{ background: "#163c2e", color: "white", padding: 20, borderRadius: 14 }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", color: "var(--lime-300)", fontWeight: 600 }}>Cost Inefficiency Premium</div>
              <div style={{ fontSize: 32, fontFamily: "var(--serif)", color: "var(--lime-500)", marginTop: 4 }}>
                +{auditData.over_filtering_tax.cost_inefficiency_tax_pct}%
              </div>
              <div style={{ fontSize: 12, color: "var(--sage-200)", marginTop: 4 }}>
                Premium paid for strict title-matched candidates
              </div>
            </div>
          </div>

          <div className="panel" style={{ background: "white", padding: 24, borderRadius: 16, border: "1px solid var(--line)" }}>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: 22, margin: "0 0 16px 0", color: "var(--forest-950)" }}>
              Ranked Candidate Match & Shadow Candidate Audit Table
            </h3>
            
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--line)", fontSize: 12, color: "var(--muted)", textTransform: "uppercase" }}>
                  <th style={{ padding: 10 }}>Candidate</th>
                  <th style={{ padding: 10 }}>Match Index</th>
                  <th style={{ padding: 10 }}>Composite Score</th>
                  <th style={{ padding: 10 }}>ATS Status</th>
                  <th style={{ padding: 10 }}>Audit Finding</th>
                  <th style={{ padding: 10 }}>Rejection Reason / Complementary Strengths</th>
                </tr>
              </thead>
              <tbody>
                {auditData.ranked_candidates.map((cand: any) => (
                  <tr key={cand.candidate_id} style={{ borderBottom: "1px solid var(--line)", background: cand.is_shadow_candidate ? "rgba(197, 140, 83, 0.08)" : "transparent" }}>
                    <td style={{ padding: 12 }}>
                      <strong style={{ display: "block", color: "var(--ink)" }}>{cand.candidate_name}</strong>
                      <small style={{ color: "var(--muted)" }}>{cand.years_experience} yrs exp · {cand.recent_titles.join(", ")}</small>
                    </td>
                    <td style={{ padding: 12 }}>
                      <strong style={{ fontSize: 16, color: "var(--forest-950)" }}>{cand.match_index_pct}%</strong>
                    </td>
                    <td style={{ padding: 12 }}>
                      <strong>{cand.composite_score} / 5.0</strong> ({cand.composite_score_pct}%)
                    </td>
                    <td style={{ padding: 12 }}>
                      <span style={{ 
                        padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 600,
                        background: cand.ats_status === "Passed ATS" ? "#d5dfd3" : "#f5e9d8",
                        color: cand.ats_status === "Passed ATS" ? "var(--forest-900)" : "var(--warm)"
                      }}>
                        {cand.ats_status}
                      </span>
                    </td>
                    <td style={{ padding: 12 }}>
                      {cand.is_shadow_candidate ? (
                        <span style={{ background: "var(--warm)", color: "white", padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>
                          💎 SHADOW CANDIDATE RECOVERED
                        </span>
                      ) : (
                        <span style={{ color: "var(--muted)", fontSize: 12 }}>Standard Filter</span>
                      )}
                    </td>
                    <td style={{ padding: 12, fontSize: 12 }}>
                      {cand.rejection_reasons.length > 0 ? (
                        <div style={{ color: "#b91c1c", marginBottom: 4 }}>⚠️ {cand.rejection_reasons[0]}</div>
                      ) : null}
                      <div style={{ color: "var(--forest-700)" }}>
                        Strengths: {cand.complementary_strengths.join(", ")}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

function BuilderContent({
  navigate,
  fromExplorer,
  fromGrower,
  fromColleges,
  fromHiring,
  view,
  onViewChange,
  onGrowerHandoff,
}: {
  navigate: (id: PortalId) => void
  fromExplorer: boolean
  fromGrower: boolean
  fromColleges: boolean
  fromHiring: boolean
  view: number
  onViewChange: (view: number) => void
  onGrowerHandoff: () => void
}) {
  const builderTarget = fromGrower
    ? "MLOps Engineer"
    : fromColleges
      ? "Cloud Skills Learning Pathway"
      : fromHiring
        ? "Candidate Skill-Building Path"
        : "Machine Learning Engineer"
  const targetContext = (
    <div
      className={`builder-target-context ${
        fromExplorer || fromGrower || fromColleges || fromHiring
          ? "from-explorer"
          : ""
      }`}
    >
      {(fromExplorer || fromGrower || fromColleges || fromHiring) && (
        <div className="transition-route">
          <span>
            <Icon
              name={
                fromGrower
                  ? "branch"
                  : fromColleges
                    ? "book"
                    : fromHiring
                      ? "people"
                      : "search"
              }
              size={14}
            />{" "}
            {fromGrower
              ? "Grower"
              : fromColleges
                ? "Colleges"
                : fromHiring
                  ? "Hiring"
                  : "Explorer"}
          </span>
          <Icon name="arrow" size={15} />
          <span className="active">
            <Icon name="grid" size={14} /> Builder
          </span>
        </div>
      )}
      <div className="transition-context">
        <div className="card-label">Building toward</div>
        <Heading level={3}>{builderTarget}</Heading>
        <p>
          {fromHiring
            ? "Based on a candidate capability gap."
            : fromColleges
              ? "Based on an institutional curriculum gap."
              : fromGrower
                ? "Based on your Grower transition plan."
                : fromExplorer
                  ? "Based on your Explorer profile."
                  : "Your active target career."}
        </p>
      </div>
      <div className="target-progress">
        <span>
          <strong>64%</strong> overall progress
        </span>
        <ProgressBar value={64} tone="lime" />
      </div>
      {(fromExplorer || fromGrower || fromColleges || fromHiring) && (
        <SkillChip tone="lime">Context carried forward</SkillChip>
      )}
    </div>
  )

  if (view === 1) {
    const gapRows = [
      ["Python", 88, 80, "Ready", "Essential"],
      ["SQL", 82, 75, "Ready", "Important"],
      ["Statistics", 74, 80, "Small gap", "Essential"],
      ["Machine Learning", 52, 85, "33 pts", "Essential"],
      ["Model Evaluation", 31, 80, "49 pts", "Essential"],
      ["Data Processing", 46, 75, "29 pts", "Important"],
      ["Deployment", 18, 65, "47 pts", "Emerging"],
    ]
    return (
      <div className="builder-context-screen">
        {targetContext}
        <TreeOverlayVisualizer />
        <div className="builder-skill-summary">
          <div className="panel">
            <div className="card-label">Current skills</div>
            <Heading level={3}>7 skills mapped</Heading>
            <p className="summary-note">
              Three meet or exceed role expectations.
            </p>
            <div className="builder-skill-chips">
              {["Python", "SQL", "Statistics"].map((x) => (
                <span key={x}>
                  <Icon name="check" size={12} />
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div className="panel">
            <div className="card-label">Required skills</div>
            <Heading level={3}>7 role requirements</Heading>
            <p className="summary-note">
              Benchmarked against current ML Engineer roles.
            </p>
            <div className="builder-skill-chips required">
              {["ML", "Evaluation", "Processing", "Deployment"].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
          <div className="panel gap-summary-card">
            <div className="card-label">Skills to develop</div>
            <Heading level={3}>4 active gaps</Heading>
            <strong>Largest gap · Model Evaluation</strong>
            <ProgressBar value={39} tone="gold" />
            <p>Prioritize evaluation before production deployment.</p>
          </div>
        </div>
        <div className="panel skill-gap-table-panel">
          <div className="panel-head">
            <div>
              <div className="card-label">Detailed analysis</div>
              <Heading level={3}>
                Current proficiency vs role requirement
              </Heading>
            </div>
            <button className="filter-button">
              All importance <Icon name="chevron" size={12} />
            </button>
          </div>
          <div className="builder-gap-table">
            <div className="builder-gap-head">
              <span>Skill</span>
              <span>Current</span>
              <span>Required</span>
              <span>Gap</span>
              <span>Importance</span>
              <span>Related career</span>
            </div>
            {gapRows.map((row, i) => (
              <button
                key={row[0] as string}
                onClick={() => {
                  if (i > 2) onViewChange(4)
                }}
              >
                <strong>{row[0]}</strong>
                <span>
                  <ProgressBar value={row[1] as number} />
                  <small>{row[1]}%</small>
                </span>
                <span>
                  <ProgressBar value={row[2] as number} tone="lime" />
                  <small>{row[2]}%</small>
                </span>
                <SkillChip
                  tone={
                    row[3] === "Ready"
                      ? "sage"
                      : row[3] === "Small gap"
                        ? "default"
                        : "warm"
                  }
                >
                  {row[3]}
                </SkillChip>
                <small>{row[4]}</small>
                <span className="career-cell">
                  ML Engineer <Icon name="chevron" size={12} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (view === 2) {
    const stages = [
      [
        "01",
        "Foundations",
        "Python · Statistics",
        "Complete",
        "Core concepts are established.",
      ],
      [
        "02",
        "Machine Learning",
        "Supervised · Unsupervised learning",
        "In progress",
        "Choose activities that fit your experience.",
      ],
      [
        "03",
        "Applied ML",
        "Model evaluation · Feature engineering",
        "Up next",
        "Practice judgement with real datasets.",
      ],
      [
        "04",
        "Evidence",
        "Build an end-to-end ML project",
        "Planned",
        "Turn skills into observable evidence.",
      ],
      [
        "05",
        "Deployment",
        "API · Cloud · Monitoring",
        "Planned",
        "Take a model into a production setting.",
      ],
    ]
    return (
      <div className="builder-context-screen">
        {targetContext}
        <div className="path-controls">
          <div>
            <div className="card-label">Flexible roadmap</div>
            <Heading level={3}>
              Your build path to Machine Learning Engineer
            </Heading>
          </div>
          <div>
            <button className="filter-button">
              Balanced pace <Icon name="chevron" size={12} />
            </button>
            <Button variant="secondary">Adjust path</Button>
          </div>
        </div>
        <div className="builder-roadmap">
          {stages.map((stage, i) => (
            <div
              className={`roadmap-stage ${
                i === 0 ? "complete" : i === 1 ? "active" : ""
              }`}
              key={stage[1]}
            >
              <div className="roadmap-number">
                {stage[0]}
                <span>{i === 0 ? <Icon name="check" size={13} /> : null}</span>
              </div>
              <div className="roadmap-content">
                <div className="roadmap-stage-head">
                  <div>
                    <div className="card-label">{stage[3]}</div>
                    <Heading level={3}>{stage[1]}</Heading>
                    <p>{stage[4]}</p>
                  </div>
                  <SkillChip
                    tone={i === 0 ? "sage" : i === 1 ? "lime" : "default"}
                  >
                    {stage[3]}
                  </SkillChip>
                </div>
                <div className="roadmap-activities">
                  {(stage[2] as string).split(" · ").map((activity, j) => (
                    <button
                      key={activity}
                      onClick={() => i === 2 && onViewChange(4)}
                    >
                      <span>
                        {i === 0 ? <Icon name="check" size={13} /> : j + 1}
                      </span>
                      <strong>{activity}</strong>
                      <small>
                        {[
                          "Skill foundation",
                          "Guided build",
                          "Practical evidence",
                        ][j] || "Build activity"}
                      </small>
                      <Icon name="chevron" size={13} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="path-note">
          <Icon name="branch" size={16} />
          <span>
            <strong>This path can change with you.</strong> Complete activities
            in a different order, add evidence you already have, or adjust your
            target at any time.
          </span>
        </div>
      </div>
    )
  }

  if (view === 3) {
    const projects = [
      [
        "Customer Churn Prediction",
        "Machine Learning · Evaluation · Data Processing",
        "Intermediate",
        "8–10 hours",
        "In progress",
        62,
      ],
      [
        "Model Performance Audit",
        "Model Evaluation · Statistics · Communication",
        "Beginner",
        "4–6 hours",
        "Not started",
        0,
      ],
      [
        "Deploy a Prediction API",
        "Deployment · API · Monitoring",
        "Advanced",
        "12–16 hours",
        "Not started",
        0,
      ],
      [
        "Energy Demand Forecast",
        "Time Series · Feature Engineering · Python",
        "Intermediate",
        "10–12 hours",
        "Completed",
        100,
      ],
    ]
    return (
      <div className="builder-context-screen">
        <div className="project-library-toolbar">
          <div>
            <div className="card-label">Practical evidence</div>
            <Heading level={3}>Build proof, not just knowledge.</Heading>
          </div>
          <div>
            <button className="filter-button">
              All skills <Icon name="chevron" size={12} />
            </button>
            <button className="filter-button">
              All status <Icon name="chevron" size={12} />
            </button>
          </div>
        </div>
        <div className="builder-project-grid">
          {projects.map((project, i) => (
            <div
              className={`builder-project-card ${i === 0 ? "featured" : ""}`}
              key={project[0] as string}
            >
              <div className="project-card-head">
                <SkillChip
                  tone={
                    project[4] === "Completed"
                      ? "sage"
                      : project[4] === "In progress"
                        ? "lime"
                        : "default"
                  }
                >
                  {project[4]}
                </SkillChip>
                <span>0{i + 1}</span>
              </div>
              <Heading level={3}>{project[0]}</Heading>
              <div className="project-skill-line">{project[1]}</div>
              <div className="project-facts">
                <span>
                  <small>Difficulty</small>
                  <strong>{project[2]}</strong>
                </span>
                <span>
                  <small>Estimated effort</small>
                  <strong>{project[3]}</strong>
                </span>
              </div>
              <div className="project-outcome">
                <strong>Expected outcome</strong>
                <p>
                  {
                    [
                      "A validated classification model with a clear evaluation report.",
                      "A concise audit explaining model trade-offs and failure modes.",
                      "A monitored prediction service deployed to a cloud environment.",
                      "A forecasting model with documented feature decisions.",
                    ][i]
                  }
                </p>
              </div>
              {project[5] as number > 0 && (
                <div className="project-progress">
                  <span>
                    Progress <b>{project[5]}%</b>
                  </span>
                  <ProgressBar value={project[5] as number} tone="lime" />
                </div>
              )}
              <Button
                variant={i === 0 ? "primary" : "secondary"}
                onClick={() => onViewChange(i === 0 ? 5 : 3)}
                icon="arrow"
              >
                {project[4] === "In progress"
                  ? "Continue project"
                  : project[4] === "Completed"
                    ? "View evidence"
                    : "Start project"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (view === 4) {
    return (
      <div className="builder-context-screen">
        <button className="back-link" onClick={() => onViewChange(1)}>
          <Icon name="arrow" size={14} /> Back to skill gap
        </button>
        <div className="builder-skill-detail-hero">
          <div>
            <div className="card-label">Priority skill · Essential</div>
            <Heading level={1}>Model Evaluation</Heading>
            <p>
              Assess how well a model works, where it fails, and whether it is
              suitable for a real decision or product.
            </p>
            <div className="chip-row">
              <SkillChip>Machine Learning</SkillChip>
              <SkillChip>Statistics</SkillChip>
              <SkillChip>Experimentation</SkillChip>
            </div>
          </div>
          <div className="level-comparison">
            <span>
              <small>Current level</small>
              <strong>Foundational</strong>
              <b>31%</b>
            </span>
            <Icon name="arrow" />
            <span>
              <small>Target level</small>
              <strong>Proficient</strong>
              <b>80%</b>
            </span>
          </div>
        </div>
        <div className="skill-detail-builder-grid">
          <div className="panel">
            <div className="card-label">Why it matters</div>
            <Heading level={3}>Make models trustworthy</Heading>
            <p>
              Evaluation helps you choose useful metrics, detect failure modes
              and explain trade-offs to product and engineering teams.
            </p>
            <div className="related-career-list">
              {["ML Engineer", "Data Scientist", "Applied Scientist"].map(
                (x) => (
                  <button key={x}>
                    {x}
                    <Icon name="chevron" size={13} />
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="panel">
            <div className="card-label">Related skills</div>
            <Heading level={3}>Skills that reinforce it</Heading>
            <div className="builder-skill-chips required">
              {[
                "Statistics",
                "Experiment design",
                "Feature engineering",
                "Data validation",
                "Communication",
              ].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
          <div className="panel span-two">
            <div className="panel-head">
              <div>
                <div className="card-label">Suggested activities</div>
                <Heading level={3}>Choose how you want to build it</Heading>
              </div>
              <span className="updated">Flexible · 3 options</span>
            </div>
            <div className="build-activity-grid">
              {[
                ["Learn", "Evaluation foundations", "90 min guided primer"],
                ["Practice", "Compare three classifiers", "2–3 hour exercise"],
                [
                  "Build",
                  "Model Performance Audit",
                  "4–6 hour evidence project",
                ],
              ].map((x, i) => (
                <button key={x[0]} onClick={() => i === 2 && onViewChange(3)}>
                  <span>0{i + 1}</span>
                  <small>{x[0]}</small>
                  <strong>{x[1]}</strong>
                  <p>{x[2]}</p>
                  <Icon name="arrow" size={14} />
                </button>
              ))}
            </div>
          </div>
          <div className="panel full-width evidence-project-row">
            <div>
              <div className="card-label">Project evidence</div>
              <Heading level={3}>Projects that demonstrate this skill</Heading>
            </div>
            <div>
              <strong>Customer Churn Prediction</strong>
              <small>In progress · 62%</small>
            </div>
            <div>
              <strong>Model Performance Audit</strong>
              <small>Recommended · Not started</small>
            </div>
            <Button variant="secondary" onClick={() => onViewChange(3)}>
              View projects
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (view === 5) {
    return (
      <div className="builder-context-screen">
        {targetContext}
        <div className="builder-progress-metrics">
          <Metric value="6" label="Skills developed" change="+2 this month" />
          <Metric
            value="3"
            label="Skills in progress"
            change="1 priority skill"
          />
          <Metric
            value="4"
            label="Projects completed"
            change="7 evidence items"
          />
          <Metric
            value="5 wks"
            label="Consistent building"
            change="Steady, not competitive"
          />
        </div>
        <div className="dashboard-grid">
          <div className="panel span-two builder-progress-panel">
            <div className="panel-head">
              <div>
                <div className="card-label">Career readiness</div>
                <Heading level={3}>
                  Progress toward Machine Learning Engineer
                </Heading>
              </div>
              <strong className="progress-number">64%</strong>
            </div>
            <div className="progress-milestones">
              {[
                "Foundations",
                "Core ML",
                "Applied ML",
                "Evidence",
                "Deployment",
              ].map((x, i) => (
                <div
                  className={i < 2 ? "complete" : i === 2 ? "active" : ""}
                  key={x}
                >
                  <span>{i < 2 ? <Icon name="check" size={13} /> : i + 1}</span>
                  <strong>{x}</strong>
                  <small>
                    {
                      [
                        "Complete",
                        "Complete",
                        "In progress",
                        "1 of 2",
                        "Not started",
                      ][i]
                    }
                  </small>
                </div>
              ))}
            </div>
          </div>
          <div className="panel evidence-summary">
            <div className="card-label">Evidence collected</div>
            <Heading level={3}>7 proof points</Heading>
            {[
              ["Projects", "4"],
              ["Skill assessments", "2"],
              ["Peer review", "1"],
            ].map((x) => (
              <div key={x[0]}>
                <span>{x[0]}</span>
                <strong>{x[1]}</strong>
              </div>
            ))}
            <Button variant="text" icon="arrow">
              View evidence profile
            </Button>
          </div>
          <div className="panel span-two completed-work">
            <div className="panel-head">
              <div>
                <div className="card-label">Recent progress</div>
                <Heading level={3}>What you have built</Heading>
              </div>
              <Button variant="text" onClick={() => onViewChange(3)}>
                All projects
              </Button>
            </div>
            {[
              ["Energy Demand Forecast", "Completed", "Time Series · Python"],
              ["Data Quality Monitor", "Completed", "Validation · SQL"],
              ["Customer Churn Prediction", "In progress", "ML · Evaluation"],
            ].map((x, i) => (
              <button key={x[0]}>
                <span className="project-symbol">
                  <Icon name={i === 2 ? "branch" : "check"} size={14} />
                </span>
                <span>
                  <strong>{x[0]}</strong>
                  <small>{x[2]}</small>
                </span>
                <SkillChip tone={i === 2 ? "lime" : "sage"}>{x[1]}</SkillChip>
                <Icon name="chevron" size={13} />
              </button>
            ))}
          </div>
          <div className="grower-handoff">
            <div className="transition-route">
              <span>
                <Icon name="grid" size={14} /> Builder
              </span>
              <Icon name="arrow" size={15} />
              <span className="active">
                <Icon name="branch" size={14} /> Grower
              </span>
            </div>
            <div>
              <div className="card-label">You've been building toward</div>
              <Heading level={3}>Machine Learning Engineer</Heading>
              <p>Ready to explore what could come next?</p>
            </div>
            <Button onClick={onGrowerHandoff} icon="arrow">
              Explore adjacent paths
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="builder-context-screen">
      {targetContext}
      <div className="builder-dashboard-welcome">
        <div>
          <span>Builder workspace</span>
          <Heading level={3}>
            Keep building, Arun. Your next evidence milestone is close.
          </Heading>
        </div>
        <Button
          variant="secondary"
          onClick={() => onViewChange(2)}
          icon="arrow"
        >
          View build path
        </Button>
      </div>
      <div className="builder-dashboard-grid">
        <div className="panel builder-progress-overview">
          <div className="card-label">Overall skill-building progress</div>
          <div className="builder-progress-score">
            <span>
              64<small>%</small>
            </span>
            <div>
              <strong>On a credible path</strong>
              <p>3 of 6 required skills developed</p>
            </div>
          </div>
          <ProgressBar value={64} tone="lime" />
          <div className="builder-status-counts">
            <span>
              <b>3</b>Developed
            </span>
            <span>
              <b>1</b>In progress
            </span>
            <span>
              <b>2</b>Required
            </span>
          </div>
        </div>
        <div className="panel builder-skill-status">
          <div className="panel-head">
            <div>
              <div className="card-label">Skill status</div>
              <Heading level={3}>What you have and what is next</Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(1)}>
              Full gap analysis
            </Button>
          </div>
          {[
            ["Python", "Developed", 100],
            ["SQL", "Developed", 100],
            ["Statistics", "Developed", 100],
            ["Machine Learning", "In progress", 52],
            ["Model Evaluation", "Not started", 0],
            ["Deployment", "Not started", 0],
          ].map((x) => (
            <button
              key={x[0] as string}
              onClick={() => x[1] !== "Developed" && onViewChange(4)}
            >
              <span
                className={`skill-state state-${(x[1] as string).replace(" ", "-").toLowerCase()}`}
              >
                {x[1] === "Developed" ? <Icon name="check" size={12} /> : null}
              </span>
              <strong>{x[0]}</strong>
              <small>{x[1]}</small>
              <div>
                <ProgressBar
                  value={x[2] as number}
                  tone={x[1] === "In progress" ? "lime" : "green"}
                />
              </div>
              <Icon name="chevron" size={13} />
            </button>
          ))}
        </div>
        <div className="panel active-path-card">
          <div className="panel-head">
            <div>
              <div className="card-label">Active build path</div>
              <Heading level={3}>Core Machine Learning</Heading>
            </div>
            <SkillChip tone="lime">Step 2 of 5</SkillChip>
          </div>
          <div className="active-path-line">
            {["Foundations", "Core ML", "Applied ML", "Evidence", "Deploy"].map(
              (x, i) => (
                <span
                  className={i === 0 ? "complete" : i === 1 ? "active" : ""}
                  key={x}
                >
                  <i>{i === 0 ? <Icon name="check" size={10} /> : i + 1}</i>
                  <small>{x}</small>
                </span>
              ),
            )}
          </div>
          <Button
            variant="secondary"
            onClick={() => onViewChange(2)}
            icon="arrow"
          >
            Continue path
          </Button>
        </div>
        <div className="panel builder-next-actions">
          <div className="card-label">Recommended next actions</div>
          <Heading level={3}>A focused next step</Heading>
          {[
            ["Continue ML foundations", "35 min left"],
            ["Start model evaluation primer", "90 min"],
            ["Add evidence to Python", "From existing project"],
          ].map((x, i) => (
            <button
              key={x[0]}
              onClick={() => onViewChange(i === 2 ? 5 : i === 1 ? 4 : 2)}
            >
              <span>0{i + 1}</span>
              <span>
                <strong>{x[0]}</strong>
                <small>{x[1]}</small>
              </span>
              <Icon name="arrow" size={13} />
            </button>
          ))}
        </div>
        <div className="panel recent-projects-card">
          <div className="panel-head">
            <div>
              <div className="card-label">Recent projects</div>
              <Heading level={3}>Evidence in motion</Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(3)}>
              View all
            </Button>
          </div>
          {[
            ["Customer Churn Prediction", "In progress", "62%"],
            ["Energy Demand Forecast", "Completed", "Evidence added"],
          ].map((x, i) => (
            <button key={x[0]} onClick={() => onViewChange(3)}>
              <span className="project-symbol">
                <Icon name={i === 0 ? "branch" : "check"} size={14} />
              </span>
              <span>
                <strong>{x[0]}</strong>
                <small>
                  {x[1]} · {x[2]}
                </small>
              </span>
              <Icon name="chevron" size={13} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const growerPaths = [
  {
    role: "MLOps Engineer",
    transfer: ["Python", "Linux", "APIs", "Software engineering"],
    build: ["Docker", "Kubernetes", "CI/CD", "ML deployment"],
    effort: "8–12 weeks",
    reason:
      "Your backend and systems foundation maps directly to production ML infrastructure.",
    opportunity: "14 relevant opportunities",
  },
  {
    role: "Data Engineer",
    transfer: ["Python", "SQL", "APIs", "System design"],
    build: ["Data pipelines", "Spark", "Data modelling"],
    effort: "6–10 weeks",
    reason:
      "Your software engineering skills transfer well to reliable data systems.",
    opportunity: "21 relevant opportunities",
  },
  {
    role: "AI Platform Engineer",
    transfer: ["Python", "Cloud", "System design", "APIs"],
    build: ["ML platforms", "Kubernetes", "Observability"],
    effort: "12–16 weeks",
    reason:
      "A natural longer-term path combining platform engineering with ML systems.",
    opportunity: "9 emerging opportunities",
  },
  {
    role: "Solutions Engineer",
    transfer: ["APIs", "Communication", "System design", "Java"],
    build: ["Discovery", "Technical demos", "Commercial context"],
    effort: "4–8 weeks",
    reason:
      "Your technical breadth can translate complex products into customer outcomes.",
    opportunity: "18 relevant opportunities",
  },
]

function GrowerContent({
  view,
  onViewChange,
  onBuilderHandoff,
  onHiringHandoff,
  fromBuilder,
}: {
  view: number
  onViewChange: (view: number) => void
  onBuilderHandoff: () => void
  onHiringHandoff: () => void
  fromBuilder: boolean
}) {
  const [selectedMobilitySkill, setSelectedMobilitySkill] = useState("Python")
  const context = (
    <div
      className={`grower-context-strip ${fromBuilder ? "from-builder" : ""}`}
    >
      {fromBuilder && (
        <div className="transition-route">
          <span>
            <Icon name="grid" size={14} /> Builder
          </span>
          <Icon name="arrow" size={15} />
          <span className="active">
            <Icon name="branch" size={14} /> Grower
          </span>
        </div>
      )}
      <div>
        <div className="card-label">Current position</div>
        <Heading level={3}>Software Engineer</Heading>
        <p>Your skills connect to 14 adjacent career directions.</p>
      </div>
      <div className="chip-row">
        {["Python", "Java", "SQL", "System Design"].map((x) => (
          <SkillChip tone="sage" key={x}>
            {x}
          </SkillChip>
        ))}
      </div>
    </div>
  )

  if (view === 1) {
    return (
      <div className="grower-screen">
        {context}
        <div className="mb-8">
          <MarketRadarFlightDeck />
        </div>
        <div className="mobility-map panel">
          <div className="panel-head">
            <div>
              <div className="card-label">Career mobility map</div>
              <Heading level={3}>Four credible adjacent leaps</Heading>
            </div>
            <div className="map-legend">
              <span>
                <i className="legend-skill" />
                Current
              </span>
              <span>
                <i className="legend-career" />
                Adjacent
              </span>
              <span>
                <i className="legend-opportunity" />
                Emerging
              </span>
            </div>
          </div>
          <div className="adjacent-branch-map">
            <div className="current-career-node">
              <small>Current career</small>
              <strong>Software Engineer</strong>
              <span>8 transferable skills</span>
            </div>
            <div className="branch-lines">
              {growerPaths.map((path, i) => (
                <button key={path.role} onClick={() => onViewChange(2)}>
                  <span className="branch-connector" />
                  <span className="adjacent-node-index">0{i + 1}</span>
                  <span>
                    <small>
                      {i === 0
                        ? "Closest leap"
                        : i === 2
                          ? "Emerging path"
                          : "Adjacent path"}
                    </small>
                    <strong>{path.role}</strong>
                    <b>{path.transfer.length} skills transfer</b>
                  </span>
                  <Icon name="arrow" size={14} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="adjacent-path-grid">
          {growerPaths.map((path, i) => (
            <div
              className={`adjacent-path-card ${i === 0 ? "recommended" : ""}`}
              key={path.role}
            >
              <div className="path-card-label">
                <span>
                  {i === 0 ? "Recommended next move" : "Adjacent direction"}
                </span>
                <small>{path.effort}</small>
              </div>
              <Heading level={3}>{path.role}</Heading>
              <div className="reason-box">
                <Icon name="branch" size={15} />
                <span>
                  <strong>Why adjacent</strong>
                  {path.reason}
                </span>
              </div>
              <div className="path-skills">
                <div>
                  <small>Skills that transfer</small>
                  <p>{path.transfer.slice(0, 3).join(" · ")}</p>
                </div>
                <div>
                  <small>Additional skills</small>
                  <p>{path.build.slice(0, 3).join(" · ")}</p>
                </div>
              </div>
              <button className="career-open" onClick={() => onViewChange(2)}>
                Explore transition <Icon name="arrow" size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (view === 2) {
    return (
      <div className="grower-screen">
        <button className="back-link" onClick={() => onViewChange(1)}>
          <Icon name="arrow" size={14} /> Back to adjacent leaps
        </button>
        <div className="transition-detail-hero">
          <div className="transition-career">
            <small>Current career</small>
            <Heading level={3}>Software Engineer</Heading>
            <span>Backend systems · 4 years</span>
          </div>
          <div className="transition-arrow">
            <span>Adjacent leap</span>
            <Icon name="arrow" size={24} />
            <small>8–12 weeks estimated build effort</small>
          </div>
          <div className="transition-career target">
            <small>Target career</small>
            <Heading level={3}>MLOps Engineer</Heading>
            <span>Production ML systems</span>
          </div>
        </div>
        <div className="transition-detail-grid">
          <div className="panel transition-skills transferable">
            <div className="card-label">Transferable skills</div>
            <Heading level={3}>Your foundation travels with you</Heading>
            {["Python", "Linux", "APIs", "Software engineering"].map((x) => (
              <div key={x}>
                <Icon name="check" size={14} />
                <strong>{x}</strong>
                <SkillChip tone="sage">Transfers directly</SkillChip>
              </div>
            ))}
          </div>
          <div className="transition-skill-bridge">
            <span>Build on what you know</span>
            <Icon name="arrow" size={20} />
          </div>
          <div className="panel transition-skills develop">
            <div className="card-label">Skills to develop</div>
            <Heading level={3}>Close the production ML gap</Heading>
            {["Docker", "Kubernetes", "CI/CD", "ML deployment"].map((x, i) => (
              <div key={x}>
                <span>{i + 1}</span>
                <strong>{x}</strong>
                <SkillChip tone="warm">
                  {i < 2 ? "Priority" : "Build next"}
                </SkillChip>
              </div>
            ))}
          </div>
          <div className="panel why-transition">
            <div>
              <div className="card-label">Why this transition makes sense</div>
              <Heading level={3}>
                The infrastructure changes. Your engineering judgement stays
                valuable.
              </Heading>
            </div>
            <p>
              MLOps applies familiar software engineering
              principles—reliability, automation, testing and observability—to
              machine learning systems. Your backend experience covers the
              hard-to-teach foundation; the remaining gap is focused tooling and
              ML lifecycle knowledge.
            </p>
            <div className="transition-actions">
              <Button onClick={onBuilderHandoff} icon="arrow">
                Build missing skills
              </Button>
              <Button variant="secondary" onClick={() => onViewChange(3)}>
                Explore opportunities
              </Button>
            </div>
          </div>
          <div className="panel opportunities-preview">
            <div className="panel-head">
              <div>
                <div className="card-label">Potential next opportunities</div>
                <Heading level={3}>Where this path is appearing</Heading>
              </div>
              <Button variant="text" onClick={() => onViewChange(3)}>
                View all
              </Button>
            </div>
            {[
              "MLOps Engineer · Northstar Labs",
              "ML Platform Engineer · Aster Health",
              "Cloud ML Engineer · GreenGrid",
            ].map((x, i) => (
              <button key={x}>
                <span>
                  <strong>{x}</strong>
                  <small>
                    {
                      [
                        "Bengaluru · Hybrid",
                        "Mumbai · Hybrid",
                        "Remote · Climate tech",
                      ][i]
                    }
                  </small>
                </span>
                <SkillChip>
                  {["5 shared skills", "6 shared skills", "4 shared skills"][i]}
                </SkillChip>
                <Icon name="chevron" size={13} />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (view === 3) {
    const opportunities = [
      [
        "Career transition",
        "MLOps Engineer",
        "Northstar Labs · Bengaluru",
        "Your backend and deployment evidence maps to 5 role requirements.",
        "Job",
      ],
      [
        "Internal opportunity",
        "ML Infrastructure rotation",
        "Platform team · 12 weeks",
        "Use your systems experience while building Kubernetes and model serving.",
        "Internal",
      ],
      [
        "Project",
        "Deploy a model monitoring stack",
        "Vriksha evidence project · 10 hours",
        "Demonstrate observability, deployment and incident thinking.",
        "Project",
      ],
      [
        "Learning opportunity",
        "Production ML systems lab",
        "Guided cohort · 4 weeks",
        "Build a deployment pipeline with feedback from platform engineers.",
        "Learning",
      ],
      [
        "Career transition",
        "Data Engineer",
        "Aster Health · Mumbai",
        "Python, SQL and API experience create a credible adjacent path.",
        "Job",
      ],
    ]
    return (
      <div className="grower-screen">
        <div className="opportunity-toolbar panel">
          <div className="explorer-tabs">
            {[
              "All  18",
              "Career transitions  6",
              "Projects  4",
              "Jobs  5",
              "Learning  3",
            ].map((x, i) => (
              <button className={i === 0 ? "active" : ""} key={x}>
                {x}
              </button>
            ))}
          </div>
          <div>
            <button className="filter-button">
              MLOps path <Icon name="chevron" size={12} />
            </button>
            <button className="filter-button">
              All locations <Icon name="chevron" size={12} />
            </button>
          </div>
        </div>
        <div className="opportunity-list">
          {opportunities.map((item, i) => (
            <div className="growth-opportunity-card" key={item[1]}>
              <span className="opportunity-type-icon">
                <Icon
                  name={
                    i === 1
                      ? "building"
                      : i === 2
                        ? "grid"
                        : i === 3
                          ? "book"
                          : "target"
                  }
                  size={17}
                />
              </span>
              <div>
                <div className="card-label">{item[0]}</div>
                <Heading level={3}>{item[1]}</Heading>
                <span className="opportunity-org">{item[2]}</span>
                <div className="opportunity-reason">
                  <Icon name="spark" size={14} />
                  <span>
                    <strong>Why it connects</strong>
                    {item[3]}
                  </span>
                </div>
              </div>
              <div className="opportunity-card-actions">
                <SkillChip tone={i < 2 ? "lime" : "default"}>
                  {item[4]}
                </SkillChip>
                <Button
                  variant="secondary"
                  onClick={() =>
                    i === 0 ? onHiringHandoff() : onViewChange(3)
                  }
                >
                  {i === 0 ? "Explore opportunity" : "View details"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="hiring-preview">
          <div className="transition-route">
            <span>
              <Icon name="branch" size={14} /> Grower
            </span>
            <Icon name="arrow" size={15} />
            <span className="active">
              <Icon name="people" size={14} /> Hiring
            </span>
          </div>
          <div>
            <div className="card-label">Opportunities for this path</div>
            <Heading level={3}>See where MLOps skills are needed.</Heading>
          </div>
          <Button onClick={onHiringHandoff} icon="arrow">
            Explore opportunities
          </Button>
        </div>
      </div>
    )
  }

  if (view === 4) {
    const skillConnections: Record<string, string[]> = {
      Python: [
        "Backend Engineering",
        "Data Engineering",
        "Data Science",
        "Machine Learning",
        "Automation",
      ],
      SQL: [
        "Analytics",
        "Data Engineering",
        "Business Intelligence",
        "Data Science",
      ],
      "System Design": [
        "Platform Engineering",
        "Solutions Engineering",
        "MLOps",
        "Technical Architecture",
      ],
    }
    const connected =
      skillConnections[selectedMobilitySkill] || skillConnections.Python
    return (
      <div className="skill-mobility-layout">
        <div className="panel mobility-graph-panel">
          <div className="skill-map-toolbar">
            <label className="discovery-search">
              <Icon name="search" size={15} />
              <input
                placeholder="Search your skills"
                aria-label="Search mobility skills"
              />
            </label>
            <div className="map-legend">
              <span>
                <i className="legend-skill" />
                Skill
              </span>
              <span>
                <i className="legend-career" />
                Career
              </span>
              <span>
                <i className="legend-opportunity" />
                Opportunity
              </span>
            </div>
          </div>
          <div className="mobility-skill-map">
            <svg viewBox="0 0 100 70" preserveAspectRatio="none">
              {connected.map((_, i) => (
                <path
                  key={i}
                  d={`M24 35 C46 35, 46 ${12 + i * 12}, 70 ${12 + i * 12}`}
                />
              ))}
            </svg>
            <button className="mobility-source-node">
              {selectedMobilitySkill}
              <small>Transferable skill</small>
            </button>
            <div className="mobility-career-nodes">
              {connected.map((career, i) => (
                <button
                  key={career}
                  onClick={() => career === "MLOps" && onViewChange(2)}
                  style={{ top: `${8 + i * 18}%` }}
                >
                  <small>Career direction</small>
                  <strong>{career}</strong>
                  <span>{3 + i} related opportunities</span>
                </button>
              ))}
            </div>
          </div>
          <div className="map-footer">
            <span>
              <span className="live-dot" />
              Showing {connected.length} career connections
            </span>
            <div>
              <button>−</button>
              <span>100%</span>
              <button>+</button>
            </div>
          </div>
        </div>
        <div className="panel mobility-skill-detail">
          <div className="card-label">Selected skill</div>
          <Heading level={2}>{selectedMobilitySkill}</Heading>
          <p>
            A highly transferable capability connecting software, data,
            automation and AI work.
          </p>
          <div className="skill-selector">
            {Object.keys(skillConnections).map((x) => (
              <button
                className={selectedMobilitySkill === x ? "active" : ""}
                onClick={() => setSelectedMobilitySkill(x)}
                key={x}
              >
                {x}
                <Icon name="chevron" size={12} />
              </button>
            ))}
          </div>
          <div className="detail-section">
            <strong>New directions this skill supports</strong>
            {connected.slice(0, 3).map((x, i) => (
              <button className="detail-link-row" key={x}>
                <span>
                  <small>0{i + 1}</small>
                  {x}
                </span>
                <Icon name="chevron" size={13} />
              </button>
            ))}
          </div>
          <div className="mobility-insight">
            <Icon name="spark" size={15} />
            <span>
              <strong>Mobility insight</strong>Adding Kubernetes would
              strengthen your connection to MLOps and Platform Engineering.
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (view === 5) {
    return (
      <div className="grower-screen">
        {context}
        <div className="growth-metrics">
          <Metric
            value="14"
            label="Adjacent paths identified"
            change="4 strong connections"
          />
          <Metric
            value="7"
            label="Skills developed"
            change="+2 since last review"
          />
          <Metric value="3" label="Paths explored" change="MLOps most active" />
          <Metric value="5" label="Evidence projects" change="4 completed" />
        </div>
        <div className="dashboard-grid">
          <div className="panel span-two growth-journey-panel">
            <div className="panel-head">
              <div>
                <div className="card-label">Your growth journey</div>
                <Heading level={3}>
                  Skills and evidence are widening your options
                </Heading>
              </div>
              <span className="updated">Last 6 months</span>
            </div>
            <div className="growth-timeline">
              {[
                ["Jan", "Added Python", "Skill"],
                ["Feb", "Energy forecast", "Project"],
                ["Mar", "Explored Data Engineer", "Path"],
                ["Apr", "Added system design", "Skill"],
                ["May", "Exploring MLOps", "Current"],
              ].map((x, i) => (
                <div className={i === 4 ? "current" : ""} key={x[0]}>
                  <span>{i < 4 ? <Icon name="check" size={11} /> : 5}</span>
                  <small>{x[0]}</small>
                  <strong>{x[1]}</strong>
                  <b>{x[2]}</b>
                </div>
              ))}
            </div>
          </div>
          <div className="panel possible-moves">
            <div className="card-label">Possible next moves</div>
            <Heading level={3}>Directions still in view</Heading>
            {growerPaths.slice(0, 3).map((x, i) => (
              <button key={x.role} onClick={() => onViewChange(2)}>
                <span>0{i + 1}</span>
                <span>
                  <strong>{x.role}</strong>
                  <small>
                    {x.effort} · {x.transfer.length} skills transfer
                  </small>
                </span>
                <Icon name="chevron" size={13} />
              </button>
            ))}
          </div>
          <div className="panel growth-evidence">
            <div className="card-label">Completed evidence</div>
            <Heading level={3}>Work that travels with you</Heading>
            {[
              ["Energy Demand Forecast", "Python · Data"],
              ["Churn Prediction API", "ML · Deployment"],
              ["Platform Health Monitor", "Systems · Observability"],
            ].map((x) => (
              <div key={x[0]}>
                <span className="project-symbol">
                  <Icon name="check" size={13} />
                </span>
                <span>
                  <strong>{x[0]}</strong>
                  <small>{x[1]}</small>
                </span>
              </div>
            ))}
          </div>
          <div className="hiring-preview span-two">
            <div className="transition-route">
              <span>
                <Icon name="branch" size={14} /> Grower
              </span>
              <Icon name="arrow" size={15} />
              <span className="active">
                <Icon name="people" size={14} /> Hiring
              </span>
            </div>
            <div>
              <div className="card-label">Your most explored next path</div>
              <Heading level={3}>MLOps Engineer</Heading>
              <p>Ready to see where these skills are needed?</p>
            </div>
            <Button onClick={onHiringHandoff} icon="arrow">
              Explore opportunities
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grower-screen">
      {context}
      <div className="grower-welcome">
        <div>
          <span>Career mobility workspace</span>
          <Heading level={3}>
            Good morning, Arun. Your experience opens more than one path.
          </Heading>
        </div>
        <Button
          variant="secondary"
          onClick={() => onViewChange(1)}
          icon="arrow"
        >
          Explore adjacent leaps
        </Button>
      </div>
      <div className="grower-dashboard-grid">
        <div className="panel current-profile-card">
          <div className="card-label">Current path</div>
          <Heading level={2}>Software Engineer</Heading>
          <p>Backend systems · 4 years experience</p>
          <div className="transfer-strengths">
            <small>Your strongest transferable skills</small>
            <div className="chip-row">
              {["Python", "Java", "SQL", "System Design"].map((x) => (
                <SkillChip tone="sage" key={x}>
                  {x}
                </SkillChip>
              ))}
            </div>
          </div>
          <button className="career-open" onClick={() => onViewChange(4)}>
            See skill mobility <Icon name="arrow" size={14} />
          </button>
        </div>
        <div className="panel growth-overview-card">
          <div className="panel-head">
            <div>
              <div className="card-label">Career growth overview</div>
              <Heading level={3}>Your mobility is expanding</Heading>
            </div>
            <span className="updated">Updated today</span>
          </div>
          <div className="mobility-overview">
            <span>
              <strong>14</strong>
              <small>Adjacent paths</small>
            </span>
            <span>
              <strong>4</strong>
              <small>Strong connections</small>
            </span>
            <span>
              <strong>7</strong>
              <small>Transferable skills</small>
            </span>
          </div>
          <div className="mobility-signal">
            <Icon name="spark" size={15} />
            <span>
              <strong>New connection found</strong>Your deployment project
              strengthened your path to MLOps Engineer.
            </span>
          </div>
        </div>
        <div className="panel full-width">
          <div className="panel-head">
            <div>
              <div className="card-label">Adjacent career paths</div>
              <Heading level={3}>Possible moves from where you are now</Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(1)} icon="arrow">
              View mobility map
            </Button>
          </div>
          <div className="dashboard-adjacent-row">
            {growerPaths.map((x, i) => (
              <button key={x.role} onClick={() => onViewChange(2)}>
                <span className="rank">0{i + 1}</span>
                <span>
                  <strong>{x.role}</strong>
                  <small>{x.reason}</small>
                </span>
                <span>
                  <b>{x.transfer.length}</b> skills transfer
                </span>
                <span>
                  <b>{x.effort}</b> build effort
                </span>
                <Icon name="chevron" size={14} />
              </button>
            ))}
          </div>
        </div>
        <div className="panel grower-next-moves">
          <div className="card-label">Recommended next moves</div>
          <Heading level={3}>Keep your options moving</Heading>
          {[
            ["Explore MLOps transition", "Closest adjacent path"],
            ["Add Kubernetes", "Unlocks 3 more roles"],
            ["Review live opportunities", "14 connected options"],
          ].map((x, i) => (
            <button
              key={x[0]}
              onClick={() => onViewChange(i === 0 ? 2 : i === 1 ? 4 : 3)}
            >
              <span>0{i + 1}</span>
              <span>
                <strong>{x[0]}</strong>
                <small>{x[1]}</small>
              </span>
              <Icon name="arrow" size={13} />
            </button>
          ))}
        </div>
        <div className="panel grower-activity">
          <div className="panel-head">
            <div>
              <div className="card-label">Recent activity</div>
              <Heading level={3}>Your mobility trail</Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(5)}>
              My growth
            </Button>
          </div>
          {[
            ["Explored MLOps Engineer", "Today"],
            ["Added deployment evidence", "Yesterday"],
            ["Compared Data and Platform paths", "18 May"],
          ].map((x, i) => (
            <div key={x[0]}>
              <span className="activity-icon">
                <Icon name={i === 1 ? "check" : "branch"} size={14} />
              </span>
              <span>
                <strong>{x[0]}</strong>
                <small>{x[1]}</small>
              </span>
            </div>
          ))}
        </div>
        <div className="panel unlock-skills-card">
          <div className="card-label">Skills that unlock opportunities</div>
          <Heading level={3}>Small additions, wider options</Heading>
          {[
            ["Kubernetes", "3 new paths"],
            ["Cloud platforms", "5 new paths"],
            ["ML deployment", "2 stronger connections"],
          ].map((x) => (
            <button key={x[0]} onClick={() => onBuilderHandoff()}>
              <span>
                <strong>{x[0]}</strong>
                <small>{x[1]}</small>
              </span>
              <SkillChip tone="lime">Build skill</SkillChip>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const collegeSkillRows = [
  ["Python", 82, 90, "Strong alignment", "Growing", "Data · ML · Software"],
  [
    "Machine Learning",
    55,
    91,
    "Significant gap",
    "Growing",
    "ML Engineer · Data Scientist",
  ],
  [
    "Cloud",
    31,
    84,
    "Significant gap",
    "Fast growth",
    "Cloud · DevOps · Platform",
  ],
  ["MLOps", 18, 78, "Significant gap", "Fast growth", "MLOps · ML Platform"],
  [
    "Data Engineering",
    44,
    83,
    "Emerging gap",
    "Growing",
    "Data Engineer · Analytics",
  ],
  ["Cybersecurity", 38, 69, "Emerging gap", "Stable", "Security · Cloud"],
  [
    "Legacy Java EE",
    72,
    46,
    "Oversupplied",
    "Declining",
    "Enterprise Software",
  ],
]

function CollegesContent({
  view,
  onViewChange,
  onHiringHandoff,
  onBuilderHandoff,
}: {
  view: number
  onViewChange: (view: number) => void
  onHiringHandoff: () => void
  onBuilderHandoff: () => void
}) {
  const [selectedSkill, setSelectedSkill] = useState("MLOps")
  const [selectedCourse, setSelectedCourse] = useState(
    "CS305 · Database Systems",
  )
  const institution = (
    <div className="college-context">
      <div>
        <div className="card-label">Institution workspace</div>
        <Heading level={3}>Vriksha Institute of Technology</Heading>
        <p>Academic year 2025–26 · 4 programs · 2,840 students</p>
      </div>
      <div className="college-context-controls">
        <button className="filter-button">
          B.Tech Computer Science <Icon name="chevron" size={12} />
        </button>
        <button className="filter-button">
          2025 curriculum <Icon name="chevron" size={12} />
        </button>
      </div>
    </div>
  )

  if (view === 1) {
    const selected =
      collegeSkillRows.find((row) => row[0] === selectedSkill) ||
      collegeSkillRows[3]
    return (
      <div className="college-screen">
        {institution}
        <div className="curriculum-market-layout">
          <div className="panel comparison-panel">
            <div className="panel-head">
              <div>
                <div className="card-label">Curriculum ↔ Market</div>
                <Heading level={3}>
                  What students learn compared with what roles require
                </Heading>
              </div>
              <div className="legend">
                <span>
                  <i className="curriculum" />
                  Curriculum
                </span>
                <span>
                  <i className="market" />
                  Market
                </span>
              </div>
            </div>
            <div className="comparison-head">
              <span>Skill</span>
              <span>Curriculum teaches</span>
              <span>Market requires</span>
              <span>Relationship</span>
            </div>
            {collegeSkillRows.slice(0, 6).map((row) => (
              <button
                className={selectedSkill === row[0] ? "selected" : ""}
                key={row[0] as string}
                onClick={() => setSelectedSkill(row[0] as string)}
              >
                <strong>{row[0]}</strong>
                <div className="comparison-bar">
                  <span style={{ width: `${row[1]}%` }} />
                  <small>
                    {row[1]} · {row[1] as number > 70 ? "Strong" : "Limited"}
                  </small>
                </div>
                <div className="comparison-bar market-bar">
                  <span style={{ width: `${row[2]}%` }} />
                  <small>
                    {row[2]} · {row[2] as number > 80 ? "High" : "Medium"}
                  </small>
                </div>
                <SkillChip
                  tone={
                    row[3] === "Strong alignment"
                      ? "sage"
                      : row[3] === "Significant gap"
                        ? "warm"
                        : "default"
                  }
                >
                  {row[3]}
                </SkillChip>
              </button>
            ))}
          </div>
          <div className="panel comparison-detail">
            <div className="card-label">Selected relationship</div>
            <Heading level={2}>{selected[0]}</Heading>
            <p>
              Inspect how this skill appears across courses, careers and current
              employer requirements.
            </p>
            <div className="comparison-signal">
              <span>
                <small>Curriculum coverage</small>
                <strong>
                  {selected[1]} ·{" "}
                  {selected[1] as number < 40 ? "Low" : "Medium"}
                </strong>
              </span>
              <Icon name="arrow" />
              <span>
                <small>Market demand</small>
                <strong>{selected[2]} · High</strong>
              </span>
            </div>
            <div className="detail-section">
              <strong>Where it is currently taught</strong>
              <div className="course-tags">
                <span>AI Elective · 6 hours</span>
                <span>Capstone · Optional</span>
              </div>
            </div>
            <div className="detail-section">
              <strong>Careers connected</strong>
              {(selected[5] as string).split(" · ").map((x, i) => (
                <button className="detail-link-row" key={x}>
                  <span>
                    <small>0{i + 1}</small>
                    {x}
                  </span>
                  <Icon name="chevron" size={13} />
                </button>
              ))}
            </div>
            <div className="comparison-action">
              <Icon name="spark" size={15} />
              <span>
                <strong>Recommended response</strong>Introduce practical{" "}
                {selected[0]} exposure through a required project or lab.
              </span>
            </div>
            <Button onClick={onBuilderHandoff} icon="arrow">
              Build a learning pathway
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (view === 2) {
    return (
      <div className="college-screen">
        {institution}
        <div className="college-gap-summary">
          <div className="panel">
            <span className="gap-signal high">4</span>
            <div>
              <div className="card-label">High priority gaps</div>
              <Heading level={3}>Act this curriculum cycle</Heading>
            </div>
          </div>
          <div className="panel">
            <span className="gap-signal emerging">7</span>
            <div>
              <div className="card-label">Emerging skills</div>
              <Heading level={3}>Monitor and pilot</Heading>
            </div>
          </div>
          <div className="panel">
            <span className="gap-signal decline">2</span>
            <div>
              <div className="card-label">Reducing demand</div>
              <Heading level={3}>Review teaching weight</Heading>
            </div>
          </div>
        </div>
        <div className="panel college-gap-panel">
          <div className="panel-head">
            <div>
              <div className="card-label">Detailed skill-gap analysis</div>
              <Heading level={3}>
                Where curriculum coverage and demand diverge
              </Heading>
            </div>
            <div className="college-context-controls">
              <button className="filter-button">
                All trends <Icon name="chevron" size={12} />
              </button>
              <button className="filter-button">
                Highest gap first <Icon name="chevron" size={12} />
              </button>
            </div>
          </div>
          <div className="college-gap-table">
            <div className="college-gap-head">
              <span>Skill</span>
              <span>Coverage</span>
              <span>Market demand</span>
              <span>Gap</span>
              <span>Trend</span>
              <span>Suggested action</span>
            </div>
            {collegeSkillRows.map((row, i) => (
              <button
                key={row[0] as string}
                onClick={() => {
                  setSelectedSkill(row[0] as string)
                  onViewChange(1)
                }}
              >
                <strong>{row[0]}</strong>
                <span>
                  <ProgressBar value={row[1] as number} />
                  <small>
                    {row[1] as number < 40
                      ? "Low"
                      : row[1] as number < 70
                        ? "Medium"
                        : "High"}
                  </small>
                </span>
                <span>
                  <ProgressBar value={row[2] as number} tone="lime" />
                  <small>{row[2] as number > 80 ? "High" : "Medium"}</small>
                </span>
                <SkillChip
                  tone={
                    row[3] === "Strong alignment"
                      ? "sage"
                      : row[3] === "Significant gap"
                        ? "warm"
                        : "default"
                  }
                >
                  {row[3]}
                </SkillChip>
                <span
                  className={`trend trend-${(row[4] as string).replace(" ", "-").toLowerCase()}`}
                >
                  {row[4]}
                </span>
                <span className="action-cell">
                  {
                    [
                      "Maintain advanced project depth.",
                      "Increase project-based ML work.",
                      "Add practical cloud deployment labs.",
                      "Introduce MLOps fundamentals.",
                      "Strengthen pipeline-oriented projects.",
                      "Add applied security labs.",
                      "Reduce elective teaching weight.",
                    ][i]
                  }
                  <Icon name="chevron" size={12} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (view === 3) {
    const semesters = [
      ["Semester 1", ["Mathematics I", "Programming Fundamentals"]],
      ["Semester 2", ["Data Structures", "Digital Systems"]],
      [
        "Semester 3",
        ["CS305 · Database Systems", "Object-Oriented Programming"],
      ],
      ["Semester 4", ["Operating Systems", "Computer Networks"]],
      ["Semester 5", ["Machine Learning", "Cloud Computing Elective"]],
    ]
    return (
      <div className="college-screen">
        {institution}
        <div className="curriculum-explorer-layout">
          <div className="panel curriculum-tree">
            <div className="panel-head">
              <div>
                <div className="card-label">Program structure</div>
                <Heading level={3}>B.Tech Computer Science</Heading>
              </div>
              <button className="filter-button">
                All semesters <Icon name="chevron" size={12} />
              </button>
            </div>
            {semesters.map((semester) => (
              <div className="semester-group" key={semester[0] as string}>
                <span>{semester[0]}</span>
                {(semester[1] as string[]).map((course) => (
                  <button
                    className={selectedCourse === course ? "selected" : ""}
                    onClick={() => setSelectedCourse(course)}
                    key={course}
                  >
                    <Icon name="book" size={14} />
                    <span>
                      <strong>{course}</strong>
                      <small>
                        {course.includes("Database")
                          ? "4 credits · Core"
                          : "3 credits"}
                      </small>
                    </span>
                    <Icon name="chevron" size={12} />
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div className="panel course-detail-panel">
            <div className="card-label">Selected course</div>
            <Heading level={2}>{selectedCourse}</Heading>
            <p>
              Builds foundational knowledge of relational data systems, querying
              and data integrity.
            </p>
            <div className="course-skill-chain">
              <div>
                <small>Course</small>
                <strong>Database Systems</strong>
              </div>
              <Icon name="arrow" />
              <div>
                <small>Skills taught</small>
                <strong>SQL · Data modelling</strong>
              </div>
              <Icon name="arrow" />
              <div>
                <small>Connected careers</small>
                <strong>Data · Software · Analytics</strong>
              </div>
              <Icon name="arrow" />
              <div>
                <small>Market signal</small>
                <strong>High, stable demand</strong>
              </div>
            </div>
            <div className="course-skills-grid">
              <div>
                <strong>Skills taught</strong>
                {[
                  "SQL",
                  "Relational modelling",
                  "Data integrity",
                  "Query optimization",
                ].map((x) => (
                  <div key={x}>
                    <Icon name="check" size={13} />
                    {x}
                    <SkillChip tone="sage">Covered</SkillChip>
                  </div>
                ))}
              </div>
              <div>
                <strong>Connected careers</strong>
                {["Data Engineer", "Backend Engineer", "Data Analyst"].map(
                  (x, i) => (
                    <button key={x}>
                      <span>
                        <small>0{i + 1}</small>
                        {x}
                      </span>
                      <Icon name="chevron" size={12} />
                    </button>
                  ),
                )}
              </div>
            </div>
            <div className="course-market-note">
              <Icon name="spark" size={15} />
              <span>
                <strong>Market relationship</strong>SQL remains highly relevant,
                but employers increasingly expect pipeline and cloud data skills
                alongside it.
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === 4) {
    const domains = [
      [
        "Software Engineering",
        "High",
        ["Programming", "DSA", "System design"],
        "Strong foundations and consistent project evidence.",
      ],
      [
        "Data & Analytics",
        "Medium",
        ["SQL", "Statistics", "Python"],
        "Core skills are present; pipeline depth is uneven.",
      ],
      [
        "AI / ML",
        "Medium",
        ["Python", "ML foundations"],
        "Theory is covered, but applied evaluation needs strengthening.",
      ],
      [
        "Cloud / DevOps",
        "Low",
        ["Linux"],
        "Limited deployment, infrastructure and automation exposure.",
      ],
      [
        "Cybersecurity",
        "Low",
        ["Networks"],
        "Security skills appear mainly in one elective.",
      ],
    ]
    return (
      <div className="college-screen">
        {institution}
        <div className="industry-alignment-grid">
          {domains.map((domain, i) => (
            <div
              className={`industry-domain-card status-${(domain[1] as string).toLowerCase()}`}
              key={domain[0] as string}
            >
              <div className="industry-card-head">
                <span>0{i + 1}</span>
                <SkillChip
                  tone={
                    domain[1] === "High"
                      ? "sage"
                      : domain[1] === "Low"
                        ? "warm"
                        : "default"
                  }
                >
                  {domain[1]} alignment
                </SkillChip>
              </div>
              <Heading level={3}>{domain[0]}</Heading>
              <p>{domain[3]}</p>
              <div>
                <small>Supporting skill relationships</small>
                <div className="chip-row">
                  {(domain[2] as string[]).map((x) => (
                    <SkillChip key={x}>{x}</SkillChip>
                  ))}
                </div>
              </div>
              <button
                className="career-open"
                onClick={() => (i > 2 ? onViewChange(6) : onViewChange(1))}
              >
                Inspect alignment <Icon name="arrow" size={13} />
              </button>
            </div>
          ))}
        </div>
        <div className="panel industry-graph">
          <div className="panel-head">
            <div>
              <div className="card-label">Shared skill graph</div>
              <Heading level={3}>
                How teaching connects to industry demand
              </Heading>
            </div>
            <span className="updated">
              42 courses · 186 skills · 74 career families
            </span>
          </div>
          <div className="education-skill-chain">
            {[
              ["COURSES", "42 mapped"],
              ["SKILLS", "186 taught"],
              ["CAREERS", "74 connected"],
              ["JOB REQUIREMENTS", "1.8k signals"],
              ["INDUSTRY DEMAND", "12 sectors"],
            ].map((x, i) => (
              <div key={x[0]}>
                <span>{i + 1}</span>
                <strong>{x[0]}</strong>
                <small>{x[1]}</small>
                {i < 4 && <Icon name="arrow" size={16} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (view === 5) {
    const readiness = [
      ["Python", 86, "High"],
      ["DSA", 81, "High"],
      ["SQL", 68, "Medium"],
      ["Machine Learning", 57, "Medium"],
      ["Cloud", 32, "Low"],
      ["MLOps", 18, "Low"],
    ]
    return (
      <div className="college-screen">
        <div className="readiness-toolbar">
          {institution}
          <button className="filter-button">
            2027 CSE Cohort <Icon name="chevron" size={12} />
          </button>
        </div>
        <div className="readiness-metrics">
          <Metric
            value="68%"
            label="Overall skill readiness"
            change="+5 pts vs 2026 cohort"
          />
          <Metric
            value="42%"
            label="Project evidence readiness"
            change="Needs practical depth"
          />
          <Metric
            value="71%"
            label="Career-foundation coverage"
            change="Strongest in software"
          />
          <Metric
            value="18%"
            label="Production ML readiness"
            change="Priority gap"
          />
        </div>
        <div className="student-readiness-grid">
          <div className="panel readiness-distribution">
            <div className="panel-head">
              <div>
                <div className="card-label">Cohort skill distribution</div>
                <Heading level={3}>
                  Common strengths and missing capabilities
                </Heading>
              </div>
              <span className="updated">684 students</span>
            </div>
            {readiness.map((row) => (
              <div key={row[0] as string}>
                <span>
                  <strong>{row[0]}</strong>
                  <small>{row[2]} readiness</small>
                </span>
                <ProgressBar
                  value={row[1] as number}
                  tone={
                    row[2] === "Low"
                      ? "gold"
                      : row[2] === "High"
                        ? "lime"
                        : "green"
                  }
                />
                <b>{row[1]}%</b>
              </div>
            ))}
          </div>
          <div className="panel readiness-domain">
            <div className="card-label">Career readiness by domain</div>
            <Heading level={3}>Where students can credibly compete</Heading>
            {[
              ["Software Engineering", 79],
              ["Data & Analytics", 66],
              ["AI / ML", 52],
              ["Cloud / DevOps", 34],
              ["Cybersecurity", 39],
            ].map((x) => (
              <div key={x[0] as string}>
                <span>
                  <strong>{x[0]}</strong>
                  <small>
                    {x[1] as number > 70
                      ? "Ready"
                      : x[1] as number > 50
                        ? "Developing"
                        : "Limited evidence"}
                  </small>
                </span>
                <b>{x[1]}%</b>
              </div>
            ))}
          </div>
          <div className="panel full-width project-readiness">
            <div>
              <div className="card-label">Evidence readiness</div>
              <Heading level={3}>
                Projects exist, but production context is limited.
              </Heading>
              <p>
                Most students complete academic projects. Fewer can demonstrate
                deployment, collaboration or measurable outcomes.
              </p>
            </div>
            {[
              ["Academic projects", "78%"],
              ["Industry-framed projects", "41%"],
              ["Deployed projects", "22%"],
              ["Team evidence", "36%"],
            ].map((x) => (
              <span key={x[0]}>
                <strong>{x[1]}</strong>
                <small>{x[0]}</small>
              </span>
            ))}
            <Button variant="secondary" onClick={() => onViewChange(6)}>
              View recommendations
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (view === 6) {
    const recommendations = [
      [
        "Priority",
        "Add practical cloud deployment exposure.",
        "Cloud curriculum coverage is low while demand appears across software, data and AI roles.",
        "Cloud · Deployment",
        "Add a required deployment lab to the third-year software project.",
      ],
      [
        "Priority",
        "Increase project-based Machine Learning work.",
        "Students know ML concepts but have limited evaluation and production evidence.",
        "Machine Learning · Evaluation",
        "Require one end-to-end ML project with model evaluation.",
      ],
      [
        "Emerging",
        "Introduce MLOps fundamentals.",
        "MLOps demand is growing quickly and current exposure is optional.",
        "MLOps · CI/CD",
        "Pilot a four-week production ML module or lab.",
      ],
      [
        "Important",
        "Strengthen industry-oriented data engineering projects.",
        "SQL is strong, but pipeline and cloud data experience is uneven.",
        "Data Engineering",
        "Add a pipeline project using realistic scale and quality constraints.",
      ],
    ]
    return (
      <div className="college-screen">
        {institution}
        <div className="recommendation-summary">
          <div>
            <div className="card-label">Decision support</div>
            <Heading level={3}>
              Four changes with the strongest market relevance
            </Heading>
            <p>
              Prioritized by skill gap, demand trend and breadth of career
              impact.
            </p>
          </div>
          <div>
            <span>
              <strong>2</strong>Act now
            </span>
            <span>
              <strong>2</strong>Pilot next
            </span>
          </div>
        </div>
        <div className="recommendation-list">
          {recommendations.map((rec, i) => (
            <div className="recommendation-card" key={rec[1]}>
              <span className="recommendation-index">0{i + 1}</span>
              <div>
                <SkillChip tone={i < 2 ? "warm" : "default"}>
                  {rec[0]}
                </SkillChip>
                <Heading level={3}>{rec[1]}</Heading>
                <p>{rec[2]}</p>
                <div className="recommendation-evidence">
                  <span>
                    <small>Skill gap</small>
                    <strong>{rec[3]}</strong>
                  </span>
                  <span>
                    <small>Market signal</small>
                    <strong>
                      {i === 2 ? "Fast-growing" : "High, sustained demand"}
                    </strong>
                  </span>
                </div>
                <div className="suggested-action">
                  <Icon name="target" size={15} />
                  <span>
                    <strong>Suggested action</strong>
                    {rec[4]}
                  </span>
                </div>
              </div>
              <div className="recommendation-actions">
                <Button
                  variant="secondary"
                  onClick={() =>
                    i === 0 || i === 2 ? onBuilderHandoff() : onViewChange(1)
                  }
                >
                  Build learning pathway
                </Button>
                <Button variant="text">Review evidence</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="college-hiring-handoff">
          <div className="transition-route">
            <span>
              <Icon name="book" size={14} /> Colleges
            </span>
            <Icon name="arrow" size={15} />
            <span className="active">
              <Icon name="people" size={14} /> Hiring
            </span>
          </div>
          <div>
            <div className="card-label">
              High employer demand · Low deployment exposure
            </div>
            <Heading level={3}>
              Your students may be missing skills employers seek in Machine
              Learning Engineers.
            </Heading>
            <p>
              Python · Machine Learning · SQL · Model Evaluation · Deployment
            </p>
          </div>
          <Button onClick={onHiringHandoff} icon="arrow">
            View Hiring demand
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="college-screen">
      {institution}
      <div className="college-dashboard-metrics">
        <div className="alignment-hero">
          <div>
            <div className="card-label">Curriculum alignment</div>
            <Heading level={2}>74%</Heading>
            <p>Overall alignment with current market skill demand</p>
          </div>
          <span>
            +6 pts<small>this academic year</small>
          </span>
        </div>
        <Metric value="12" label="Emerging skill gaps" change="4 need action" />
        <Metric
          value="68%"
          label="Student skill readiness"
          change="+5 pts vs prior cohort"
        />
        <Metric
          value="7"
          label="Fast-growing skills"
          change="Cloud and MLOps lead"
        />
      </div>
      <div className="college-dashboard-grid">
        <div className="panel program-alignment">
          <div className="panel-head">
            <div>
              <div className="card-label">Program alignment</div>
              <Heading level={3}>Where curriculum meets current demand</Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(1)}>
              Full comparison
            </Button>
          </div>
          {[
            ["Computer Science", 82, "Strong"],
            ["Data Science", 68, "Developing"],
            ["AI / ML", 61, "Emerging gap"],
            ["Cloud / DevOps", 54, "Priority gap"],
          ].map((x) => (
            <button key={x[0] as string} onClick={() => onViewChange(1)}>
              <span>
                <strong>{x[0]}</strong>
                <small>{x[2]}</small>
              </span>
              <ProgressBar
                value={x[1] as number}
                tone={
                  x[1] as number < 60
                    ? "gold"
                    : x[1] as number > 75
                      ? "lime"
                      : "green"
                }
              />
              <b>{x[1]}%</b>
              <Icon name="chevron" size={13} />
            </button>
          ))}
        </div>
        <div className="panel market-change-card">
          <div className="card-label">Recent market changes</div>
          <Heading level={3}>Demand is moving toward production skills</Heading>
          {[
            ["MLOps", "+28%", "Fast growth"],
            ["Cloud deployment", "+22%", "Growing"],
            ["Model evaluation", "+17%", "Growing"],
            ["Legacy frameworks", "−9%", "Declining"],
          ].map((x, i) => (
            <div key={x[0]}>
              <span className={`trend-mark ${i === 3 ? "down" : ""}`} />
              <span>
                <strong>{x[0]}</strong>
                <small>{x[2]}</small>
              </span>
              <b>{x[1]}</b>
            </div>
          ))}
        </div>
        <div className="panel full-width college-gap-overview">
          <div className="panel-head">
            <div>
              <div className="card-label">Major curriculum gaps</div>
              <Heading level={3}>
                Skills requiring an institutional response
              </Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(2)} icon="arrow">
              View gap analysis
            </Button>
          </div>
          {collegeSkillRows.slice(1, 5).map((row, i) => (
            <button
              key={row[0] as string}
              onClick={() => {
                setSelectedSkill(row[0] as string)
                onViewChange(1)
              }}
            >
              <span className="rank">0{i + 1}</span>
              <span>
                <strong>{row[0]}</strong>
                <small>{row[5]}</small>
              </span>
              <span>
                <small>Curriculum</small>
                <b>{row[1]}</b>
              </span>
              <span>
                <small>Market</small>
                <b>{row[2]}</b>
              </span>
              <SkillChip
                tone={row[3] === "Significant gap" ? "warm" : "default"}
              >
                {row[3]}
              </SkillChip>
              <Icon name="chevron" size={13} />
            </button>
          ))}
        </div>
        <div className="panel recommended-actions-card">
          <div className="card-label">Recommended actions</div>
          <Heading level={3}>What to improve next</Heading>
          {[
            "Add practical cloud deployment exposure",
            "Increase project-based ML work",
            "Introduce MLOps fundamentals",
          ].map((x, i) => (
            <button key={x} onClick={() => onViewChange(6)}>
              <span>0{i + 1}</span>
              <span>
                <strong>{x}</strong>
                <small>
                  {
                    [
                      "Affects 3 programs",
                      "Closes evidence gap",
                      "Fast-growing demand",
                    ][i]
                  }
                </small>
              </span>
              <Icon name="arrow" size={13} />
            </button>
          ))}
        </div>
        <div className="college-demand-bridge">
          <div>
            <div className="card-label">Curriculum → Hiring demand</div>
            <Heading level={3}>
              ML Engineer demand is high. Student deployment exposure is low.
            </Heading>
            <p>Connect this finding to current employer requirements.</p>
          </div>
          <Button onClick={onHiringHandoff} icon="arrow">
            View Hiring demand
          </Button>
        </div>
      </div>
    </div>
  )
}

function HiringContent({
  fromGrower,
  fromColleges,
  view,
  onViewChange,
  onBuilderHandoff,
  onGrowerHandoff,
  onCompanyHandoff,
}: {
  fromGrower: boolean
  fromColleges: boolean
  view: number
  onViewChange: (view: number) => void
  onBuilderHandoff: () => void
  onGrowerHandoff: () => void
  onCompanyHandoff: () => void
}) {
  const [searchSkills, setSearchSkills] = useState([
    "Python",
    "SQL",
    "Machine Learning",
  ])
  const candidates = [
    {
      name: "Maya Rao",
      initials: "MR",
      role: "Backend Engineer",
      location: "Bengaluru",
      skills: ["Python", "SQL", "Machine Learning", "APIs"],
      projects: "2 ML projects",
      evidence: "Production API · Churn model",
      transfer: "Backend engineering · Data processing",
      experience: "4 years",
      availability: "Available in 30 days",
    },
    {
      name: "Arjun Mehta",
      initials: "AM",
      role: "Data Analyst",
      location: "Mumbai",
      skills: ["Python", "SQL", "Statistics", "Data processing"],
      projects: "3 analytics projects",
      evidence: "Forecasting · Experimentation",
      transfer: "Analytics · Stakeholder communication",
      experience: "3 years",
      availability: "Open to opportunities",
    },
    {
      name: "Sara Khan",
      initials: "SK",
      role: "ML Engineer Intern",
      location: "Remote",
      skills: ["Python", "PyTorch", "Machine Learning", "Research"],
      projects: "2 applied ML projects",
      evidence: "NLP classifier · Model audit",
      transfer: "Research · Model experimentation",
      experience: "1 year",
      availability: "Available now",
    },
    {
      name: "Vikram Shah",
      initials: "VS",
      role: "DevOps Engineer",
      location: "Pune",
      skills: ["Python", "Docker", "Kubernetes", "Cloud"],
      projects: "4 platform projects",
      evidence: "CI/CD · Monitoring platform",
      transfer: "Infrastructure · Reliability",
      experience: "5 years",
      availability: "Available in 60 days",
    },
  ]
  const contextBanner = (fromGrower || fromColleges) && (
    <div className="hiring-context-banner">
      <div className="transition-route">
        <span>
          <Icon name={fromColleges ? "book" : "branch"} size={14} />
          {fromColleges ? "Colleges" : "Grower"}
        </span>
        <Icon name="arrow" size={15} />
        <span className="active">
          <Icon name="people" size={14} />
          Hiring
        </span>
      </div>
      <div>
        <div className="card-label">
          {fromColleges ? "Hiring demand" : "Target path"}
        </div>
        <Heading level={3}>
          {fromColleges ? "Machine Learning Engineer" : "MLOps Engineer"}
        </Heading>
        <p>
          {fromColleges
            ? "Required skills: Python · Machine Learning · SQL · Model Evaluation · Deployment"
            : "Showing where the skills from your Grower path are currently needed."}
        </p>
      </div>
      <SkillChip tone="lime">Context carried forward</SkillChip>
    </div>
  )

  if (view === 1) {
    return (
      <div className="hiring-screen">
        {contextBanner}
        <div className="role-detail-hero">
          <div>
            <div className="card-label">Open role · Platform team</div>
            <Heading level={1}>Machine Learning Engineer</Heading>
            <p>
              Build and operate production machine-learning systems that create
              reliable product outcomes.
            </p>
            <div className="role-detail-facts">
              <span>
                <small>Location</small>
                <strong>Bengaluru · Hybrid</strong>
              </span>
              <span>
                <small>Experience</small>
                <strong>3–6 years</strong>
              </span>
              <span>
                <small>Role status</small>
                <strong>Actively hiring</strong>
              </span>
            </div>
          </div>
          <div className="role-detail-action">
            <span>
              <strong>24</strong> relevant profiles discovered
            </span>
            <span>
              <strong>8</strong> include direct project evidence
            </span>
            <Button onClick={() => onViewChange(2)} icon="arrow">
              Find talent
            </Button>
          </div>
        </div>
        <div className="role-requirements-grid">
          {[
            [
              "Core skills",
              ["Python", "Machine Learning", "SQL", "Statistics"],
            ],
            [
              "Supporting skills",
              ["Model Evaluation", "Data Processing", "APIs", "Git"],
            ],
            ["Nice-to-have", ["Deployment", "Cloud", "MLOps", "Monitoring"]],
          ].map((group, i) => (
            <div
              className={`panel requirement-group group-${i}`}
              key={group[0] as string}
            >
              <div className="card-label">{group[0]}</div>
              <Heading level={3}>
                {
                  [
                    "Essential for the work",
                    "Strengthen delivery",
                    "Useful adjacent capability",
                  ][i]
                }
              </Heading>
              {(group[1] as string[]).map((x, j) => (
                <button key={x} onClick={() => onViewChange(5)}>
                  <span>{j + 1}</span>
                  <strong>{x}</strong>
                  <SkillChip tone={i === 0 ? "lime" : "default"}>
                    {i === 0 ? "Required" : i === 1 ? "Supporting" : "Optional"}
                  </SkillChip>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="panel role-context-grid">
          <div>
            <div className="card-label">Experience signals</div>
            <Heading level={3}>Evidence that supports review</Heading>
            <p>
              Production software ownership, applied model work, experimentation
              and cross-functional delivery.
            </p>
          </div>
          <div>
            <div className="card-label">Project context</div>
            <Heading level={3}>Relevant project evidence</Heading>
            <p>
              End-to-end ML project, model evaluation report or deployed
              prediction service.
            </p>
          </div>
          <div>
            <div className="card-label">Education context</div>
            <Heading level={3}>One signal among many</Heading>
            <p>
              Relevant technical learning is useful, but equivalent practical
              evidence is considered.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (view === 2) {
    return (
      <div className="hiring-screen">
        {contextBanner}
        <div className="talent-toolbar panel">
          <label className="discovery-search">
            <Icon name="search" size={16} />
            <input
              placeholder="Search candidates, skills or evidence"
              aria-label="Search candidates"
            />
          </label>
          {[
            "Skills",
            "Experience",
            "Career background",
            "Location",
            "Projects",
            "Availability",
            "Education",
          ].map((x) => (
            <button className="filter-button" key={x}>
              {x}
              <Icon name="chevron" size={11} />
            </button>
          ))}
        </div>
        <div className="talent-results-head">
          <div>
            <div className="card-label">Skill-based talent discovery</div>
            <Heading level={3}>
              People with relevant evidence and adjacent experience
            </Heading>
          </div>
          <span>36 profiles · Role: ML Engineer</span>
        </div>
        <div className="talent-card-grid">
          {candidates.map((c, i) => (
            <div className="talent-card" key={c.name}>
              <div className="talent-card-head">
                <span className={`candidate-avatar avatar-${i}`}>
                  {c.initials}
                </span>
                <div>
                  <Heading level={3}>{c.name}</Heading>
                  <p>
                    {c.role} · {c.location}
                  </p>
                </div>
                <button className="save-button">
                  <Icon name="spark" size={13} />
                  Save
                </button>
              </div>
              <div className="talent-section">
                <small>Core skills</small>
                <div className="chip-row">
                  {c.skills.map((x) => (
                    <SkillChip
                      tone={x === "Python" ? "sage" : "default"}
                      key={x}
                    >
                      {x}
                    </SkillChip>
                  ))}
                </div>
              </div>
              <div className="talent-evidence-row">
                <span>
                  <small>Evidence includes</small>
                  <strong>{c.projects}</strong>
                  <p>{c.evidence}</p>
                </span>
                <span>
                  <small>Transferable experience</small>
                  <strong>{c.role}</strong>
                  <p>{c.transfer}</p>
                </span>
              </div>
              <div className="talent-card-foot">
                <span>
                  {c.experience} · {c.availability}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => onViewChange(i === 0 ? 3 : 4)}
                >
                  View profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (view === 3) {
    return (
      <div className="hiring-screen">
        <button className="back-link" onClick={() => onViewChange(2)}>
          <Icon name="arrow" size={14} />
          Back to talent discovery
        </button>
        <div className="explain-match-header">
          <div>
            <span className="candidate-avatar avatar-0">MR</span>
            <div>
              <div className="card-label">Candidate under review</div>
              <Heading level={2}>Maya Rao</Heading>
              <p>Backend Engineer · 4 years · Bengaluru</p>
            </div>
          </div>
          <div>
            <div className="card-label">Role</div>
            <Heading level={3}>Machine Learning Engineer</Heading>
            <p>Platform team · Bengaluru</p>
          </div>
          <Button variant="secondary">Add to shortlist</Button>
        </div>
        <div className="explainability-intro">
          <Icon name="spark" size={17} />
          <div>
            <div className="card-label">
              Why this candidate appears relevant
            </div>
            <Heading level={3}>
              Strong software foundations, direct data skills and credible
              applied ML evidence.
            </Heading>
            <p>
              This view organizes available evidence for recruiter review. It
              does not make or recommend a hiring decision.
            </p>
          </div>
        </div>
        <div className="reasoning-chain">
          {[
            ["Role requirements", "Python · ML · SQL · Evaluation", "target"],
            ["Candidate skills", "Python · SQL · ML foundations", "check"],
            [
              "Transferable skills",
              "Backend engineering · Data processing",
              "branch",
            ],
            ["Project evidence", "Churn model · Prediction API", "grid"],
            ["Potential gaps", "Limited production ML deployment", "spark"],
          ].map((x, i) => (
            <div className={i === 4 ? "gap" : ""} key={x[0]}>
              <span>
                <Icon name={x[2] as IconName} size={14} />
              </span>
              <small>0{i + 1}</small>
              <strong>{x[0]}</strong>
              <p>{x[1]}</p>
              {i < 4 && <Icon name="arrow" size={14} />}
            </div>
          ))}
        </div>
        <div className="explain-grid">
          <div className="panel explain-strengths">
            <div className="card-label">Candidate strengths</div>
            <Heading level={3}>Directly evidenced capabilities</Heading>
            {["Python", "Machine Learning", "SQL", "Statistics"].map((x) => (
              <div key={x}>
                <Icon name="check" size={13} />
                <strong>{x}</strong>
                <SkillChip tone="sage">Evidence found</SkillChip>
              </div>
            ))}
          </div>
          <div className="panel explain-transfer">
            <div className="card-label">Transferable experience</div>
            <Heading level={3}>Relevant beyond the title</Heading>
            {[
              "Backend engineering",
              "Data processing",
              "Model experimentation",
            ].map((x) => (
              <div key={x}>
                <Icon name="branch" size={13} />
                <span>
                  <strong>{x}</strong>
                  <small>
                    {
                      [
                        "4 years building reliable APIs",
                        "Pipeline and validation project evidence",
                        "Two applied ML projects",
                      ][
                        [
                          "Backend engineering",
                          "Data processing",
                          "Model experimentation",
                        ].indexOf(x)
                      ]
                    }
                  </small>
                </span>
              </div>
            ))}
            <button className="career-open" onClick={onGrowerHandoff}>
              Explore career adjacency <Icon name="arrow" size={13} />
            </button>
          </div>
          <div className="panel explain-gap">
            <div className="card-label">Potential gap</div>
            <Heading level={3}>Production ML deployment</Heading>
            <p>
              Evidence for Kubernetes and monitored model deployment is
              currently limited. This may be explored during review rather than
              treated as a definitive weakness.
            </p>
            <div className="chip-row">
              <SkillChip tone="warm">Kubernetes</SkillChip>
              <SkillChip tone="warm">ML Deployment</SkillChip>
            </div>
            <Button variant="secondary" onClick={onBuilderHandoff} icon="arrow">
              Recommended skill-building path
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (view === 4) {
    return (
      <div className="hiring-screen">
        <div className="candidate-profile-hero">
          <div className="candidate-profile-person">
            <span className="profile-large-avatar">MR</span>
            <div>
              <Heading level={2}>Maya Rao</Heading>
              <p>Backend Engineer · Bengaluru · Open to ML platform roles</p>
              <div className="chip-row">
                <SkillChip tone="lime">Available in 30 days</SkillChip>
                <SkillChip>4 years experience</SkillChip>
              </div>
            </div>
          </div>
          <div className="candidate-profile-actions">
            <Button variant="secondary">Save profile</Button>
            <Button onClick={() => onViewChange(3)} icon="arrow">
              Explain relevance
            </Button>
          </div>
        </div>
        <div className="candidate-profile-grid">
          <div className="panel candidate-main-profile">
            <div className="profile-section">
              <div className="panel-head">
                <div>
                  <div className="card-label">Skills & proficiency</div>
                  <Heading level={3}>
                    Capabilities with supporting evidence
                  </Heading>
                </div>
                <Button variant="text">View all 12</Button>
              </div>
              {[
                ["Python", 88, "4 projects"],
                ["SQL", 81, "3 projects"],
                ["Machine Learning", 67, "2 projects"],
                ["Statistics", 64, "2 projects"],
                ["Docker", 58, "1 project"],
              ].map((x) => (
                <button key={x[0] as string} onClick={() => onViewChange(5)}>
                  <strong>{x[0]}</strong>
                  <ProgressBar
                    value={x[1] as number}
                    tone={x[1] as number > 75 ? "lime" : "green"}
                  />
                  <small>
                    {x[1]} · {x[2]}
                  </small>
                  <Icon name="chevron" size={12} />
                </button>
              ))}
            </div>
            <div className="profile-section">
              <div className="card-label">Projects & evidence</div>
              <Heading level={3}>Observable work</Heading>
              {[
                [
                  "Customer Churn Prediction",
                  "Python · ML · Evaluation",
                  "Validated model and evaluation report",
                ],
                [
                  "Prediction API",
                  "Python · FastAPI · Docker",
                  "Deployed API with test coverage",
                ],
              ].map((x) => (
                <div className="candidate-project" key={x[0]}>
                  <span className="project-symbol">
                    <Icon name="grid" size={14} />
                  </span>
                  <span>
                    <strong>{x[0]}</strong>
                    <small>{x[1]}</small>
                    <p>{x[2]}</p>
                  </span>
                  <SkillChip tone="sage">Evidence</SkillChip>
                </div>
              ))}
            </div>
            <div className="profile-section">
              <div className="card-label">Experience & education</div>
              <Heading level={3}>Career history</Heading>
              <div className="career-history">
                {[
                  ["2022—Now", "Backend Engineer", "Northstar Commerce"],
                  ["2020—2022", "Software Engineer", "Fieldnote Systems"],
                  [
                    "2016—2020",
                    "B.Tech Computer Science",
                    "Pune Institute of Technology",
                  ],
                ].map((x) => (
                  <div key={x[0]}>
                    <small>{x[0]}</small>
                    <span>
                      <strong>{x[1]}</strong>
                      <p>{x[2]}</p>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="panel candidate-skill-graph">
            <div className="card-label">Adjacent skill graph</div>
            <Heading level={3}>Where Maya's skills can travel</Heading>
            <SkillGraph compact />
            <div className="detail-section">
              <strong>Potential career paths</strong>
              {[
                "Machine Learning Engineer",
                "MLOps Engineer",
                "Data Engineer",
              ].map((x, i) => (
                <button
                  className="detail-link-row"
                  key={x}
                  onClick={onGrowerHandoff}
                >
                  <span>
                    <small>0{i + 1}</small>
                    {x}
                  </span>
                  <Icon name="chevron" size={12} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (view === 5) {
    const removeSkill = (skill: string) =>
      setSearchSkills((current) => current.filter((x) => x !== skill))
    return (
      <div className="hiring-screen">
        <div className="skill-search-builder">
          <div>
            <div className="card-label">Search by capability</div>
            <Heading level={3}>
              Find people through skills, not only titles.
            </Heading>
          </div>
          <div className="skill-query">
            <Icon name="search" size={16} />
            {searchSkills.map((x) => (
              <button key={x} onClick={() => removeSkill(x)}>
                {x}
                <span>×</span>
              </button>
            ))}
            <input placeholder="Add a skill" />
          </div>
          <Button icon="arrow">Search talent</Button>
        </div>
        <div className="skill-search-suggestions">
          <span>Suggested additions</span>
          {["Statistics", "Model Evaluation", "Docker", "Data Processing"].map(
            (x) => (
              <button
                key={x}
                onClick={() =>
                  !searchSkills.includes(x) &&
                  setSearchSkills([...searchSkills, x])
                }
              >
                + {x}
              </button>
            ),
          )}
        </div>
        <div className="talent-results-head">
          <div>
            <div className="card-label">Capability search results</div>
            <Heading level={3}>
              14 people with direct or transferable evidence
            </Heading>
          </div>
          <button className="filter-button">
            Evidence strength <Icon name="chevron" size={11} />
          </button>
        </div>
        <div className="skill-search-results">
          {candidates.slice(0, 3).map((c, i) => (
            <button key={c.name} onClick={() => onViewChange(3)}>
              <span className={`candidate-avatar avatar-${i}`}>
                {c.initials}
              </span>
              <span>
                <strong>{c.name}</strong>
                <small>
                  {c.role} · {c.location}
                </small>
              </span>
              <span className="search-relevance">
                <strong>
                  {i === 1
                    ? "Transferable skill connection"
                    : "Direct skill evidence"}
                </strong>
                <small>
                  {c.skills
                    .filter((x) => searchSkills.includes(x))
                    .join(" · ") || "Python · Related evidence"}
                </small>
              </span>
              <span className="search-evidence">
                <strong>{c.projects}</strong>
                <small>{c.evidence}</small>
              </span>
              <Icon name="chevron" size={13} />
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (view === 6) {
    const stages = [
      ["Discovered", ["Sara Khan", "Vikram Shah"]],
      ["Reviewed", ["Arjun Mehta"]],
      ["Shortlisted", ["Maya Rao", "Nikhil Bose"]],
      ["Interview", ["Leena Nair"]],
      ["Offer", ["Dev Patel"]],
      ["Hired", []],
    ]
    return (
      <div className="hiring-screen">
        <div className="pipeline-toolbar">
          <div>
            <div className="card-label">Role pipeline</div>
            <Heading level={3}>Machine Learning Engineer</Heading>
          </div>
          <div>
            <button className="filter-button">
              All owners <Icon name="chevron" size={11} />
            </button>
            <Button variant="secondary">Add candidate</Button>
          </div>
        </div>
        <div className="pipeline-board">
          {stages.map((stage, i) => (
            <div className="pipeline-column" key={stage[0] as string}>
              <div className="pipeline-column-head">
                <span>
                  <i className={`pipeline-dot dot-${i}`} />
                  <strong>{stage[0]}</strong>
                </span>
                <b>{(stage[1] as string[]).length}</b>
              </div>
              <div className="pipeline-cards">
                {(stage[1] as string[]).map((name, j) => (
                  <button key={name} onClick={() => onViewChange(3)}>
                    <span className={`candidate-avatar avatar-${(i + j) % 3}`}>
                      {name
                        .split(" ")
                        .map((x) => x[0])
                        .join("")}
                    </span>
                    <strong>{name}</strong>
                    <small>
                      {
                        ["Backend Engineer", "Data Analyst", "ML Researcher"][
                          (i + j) % 3
                        ]
                      }
                    </small>
                    <div className="chip-row">
                      <SkillChip>
                        {i < 2
                          ? "Needs review"
                          : i === 2
                            ? "Evidence reviewed"
                            : "Active"}
                      </SkillChip>
                    </div>
                    <p>
                      {
                        [
                          "Python · SQL · APIs",
                          "ML · Statistics · Python",
                          "Docker · Cloud · Python",
                        ][(i + j) % 3]
                      }
                    </p>
                  </button>
                ))}
                {i === 5 && (
                  <div className="empty-pipeline">
                    No candidates at this stage
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="pipeline-note">
          <Icon name="spark" size={14} />
          <span>
            Pipeline stages support team review. Skill relevance and evidence
            remain visible throughout the process.
          </span>
        </div>
      </div>
    )
  }

  if (view === 7) {
    return (
      <div className="hiring-screen">
        <div className="talent-insight-metrics">
          <Metric value="5" label="Open roles" change="3 high priority" />
          <Metric
            value="86"
            label="Active candidates"
            change="24 newly discovered"
          />
          <Metric value="12" label="Hard-to-find skills" change="MLOps leads" />
          <Metric
            value="34%"
            label="Adjacent talent"
            change="Beyond title matches"
          />
        </div>
        <div className="talent-insights-grid">
          <div className="panel requested-skills">
            <div className="panel-head">
              <div>
                <div className="card-label">Most requested skills</div>
                <Heading level={3}>Demand across open roles</Heading>
              </div>
              <span className="updated">5 active roles</span>
            </div>
            {[
              ["Python", 92, "5 roles"],
              ["Machine Learning", 84, "3 roles"],
              ["SQL", 78, "4 roles"],
              ["Cloud", 69, "3 roles"],
              ["MLOps", 61, "2 roles"],
            ].map((x) => (
              <div key={x[0] as string}>
                <span>
                  <strong>{x[0]}</strong>
                  <small>{x[2]}</small>
                </span>
                <ProgressBar
                  value={x[1] as number}
                  tone={x[0] === "MLOps" ? "gold" : "lime"}
                />
                <b>{x[1]}</b>
              </div>
            ))}
          </div>
          <div className="panel talent-availability">
            <div className="card-label">Talent availability</div>
            <Heading level={3}>Supply relative to current demand</Heading>
            {[
              ["Backend engineering", "Healthy"],
              ["Data analytics", "Moderate"],
              ["Machine Learning", "Constrained"],
              ["MLOps", "Hard to find"],
              ["Cloud platform", "Constrained"],
            ].map((x, i) => (
              <div key={x[0]}>
                <span>
                  <strong>{x[0]}</strong>
                  <small>
                    {
                      [
                        "142 profiles",
                        "86 profiles",
                        "43 profiles",
                        "18 profiles",
                        "37 profiles",
                      ][i]
                    }
                  </small>
                </span>
                <SkillChip
                  tone={
                    x[1] === "Healthy"
                      ? "sage"
                      : x[1] === "Hard to find"
                        ? "warm"
                        : "default"
                  }
                >
                  {x[1]}
                </SkillChip>
              </div>
            ))}
          </div>
          <div className="panel transferable-patterns">
            <div className="card-label">Transferable skill patterns</div>
            <Heading level={3}>Adjacent backgrounds entering demand</Heading>
            {[
              ["Backend Engineer", "MLOps Engineer", "Python · APIs · Systems"],
              ["Data Analyst", "Data Scientist", "SQL · Statistics · Python"],
              ["DevOps Engineer", "ML Platform", "Cloud · CI/CD · Kubernetes"],
            ].map((x) => (
              <div key={x[0]}>
                <span>
                  <strong>{x[0]}</strong>
                  <small>{x[2]}</small>
                </span>
                <Icon name="arrow" size={14} />
                <span>
                  <strong>{x[1]}</strong>
                  <small>Adjacent talent pool</small>
                </span>
              </div>
            ))}
          </div>
          <div className="panel role-gap-insights">
            <div className="card-label">Skill gaps across roles</div>
            <Heading level={3}>Capabilities limiting the pipeline</Heading>
            {[
              ["MLOps", "3 roles affected"],
              ["Kubernetes", "2 roles affected"],
              ["Model Evaluation", "2 roles affected"],
            ].map((x, i) => (
              <button key={x[0]} onClick={onBuilderHandoff}>
                <span>0{i + 1}</span>
                <span>
                  <strong>{x[0]}</strong>
                  <small>{x[1]}</small>
                </span>
                <SkillChip tone="warm">Build capability</SkillChip>
              </button>
            ))}
          </div>
          <div className="company-demand-handoff">
            <div className="transition-route">
              <span>
                <Icon name="people" size={14} />
                Hiring
              </span>
              <Icon name="arrow" size={15} />
              <span className="active">
                <Icon name="building" size={14} />
                Company
              </span>
            </div>
            <div>
              <div className="card-label">Workforce skill demand</div>
              <Heading level={3}>
                Machine Learning · MLOps · Cloud Engineering
              </Heading>
              <p>Compare hiring demand with current workforce capability.</p>
            </div>
            <Button onClick={onCompanyHandoff} icon="arrow">
              View workforce skill demand
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="hiring-screen">
      {contextBanner}
      <div className="hiring-dashboard-metrics">
        <Metric value="5" label="Open roles" change="3 high priority" />
        <Metric value="86" label="Active candidates" change="+24 this month" />
        <Metric
          value="34"
          label="Talent discovered"
          change="Through adjacent skills"
        />
        <Metric value="12" label="Cross-role skill gaps" change="MLOps leads" />
      </div>
      <div className="hiring-dashboard-grid">
        <div className="panel open-roles-card">
          <div className="panel-head">
            <div>
              <div className="card-label">Open roles</div>
              <Heading level={3}>Hiring demand in progress</Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(1)}>
              View role
            </Button>
          </div>
          {[
            ["Machine Learning Engineer", 12, "Python · ML · Evaluation"],
            ["Data Engineer", 8, "Python · SQL · Pipelines"],
            ["Backend Engineer", 21, "Java · APIs · Systems"],
            ["MLOps Engineer", 9, "Docker · Cloud · ML"],
          ].map((x, i) => (
            <button key={x[0] as string} onClick={() => onViewChange(1)}>
              <span className="rank">0{i + 1}</span>
              <span>
                <strong>{x[0]}</strong>
                <small>{x[2]}</small>
              </span>
              <b>
                {x[1]}
                <small>candidates</small>
              </b>
              <Icon name="chevron" size={13} />
            </button>
          ))}
        </div>
        <div className="panel top-demand-card">
          <div className="card-label">Top skill demand</div>
          <Heading level={3}>Across every open role</Heading>
          {[
            ["Python", 5],
            ["Machine Learning", 3],
            ["SQL", 4],
            ["Cloud", 3],
            ["MLOps", 2],
          ].map((x, i) => (
            <div key={x[0] as string}>
              <span>
                <i style={{ height: `${24 + i * 6}px` }} />
                <strong>{x[0]}</strong>
              </span>
              <small>{x[1]} roles</small>
            </div>
          ))}
        </div>
        <div className="panel full-width recommended-talent">
          <div className="panel-head">
            <div>
              <div className="card-label">Recommended candidates</div>
              <Heading level={3}>
                Relevant because of skills and evidence
              </Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(2)} icon="arrow">
              Discover talent
            </Button>
          </div>
          {candidates.slice(0, 3).map((c, i) => (
            <button key={c.name} onClick={() => onViewChange(3)}>
              <span className={`candidate-avatar avatar-${i}`}>
                {c.initials}
              </span>
              <span>
                <strong>{c.name}</strong>
                <small>{c.role}</small>
              </span>
              <span>
                <strong>
                  {i === 0
                    ? "Direct skills + evidence"
                    : "Transferable skill path"}
                </strong>
                <small>{c.skills.slice(0, 3).join(" · ")}</small>
              </span>
              <span>
                <strong>{c.projects}</strong>
                <small>{c.evidence}</small>
              </span>
              <SkillChip tone={i === 0 ? "lime" : "default"}>
                Review relevance
              </SkillChip>
              <Icon name="chevron" size={13} />
            </button>
          ))}
        </div>
        <div className="panel pipeline-preview">
          <div className="panel-head">
            <div>
              <div className="card-label">Hiring pipeline</div>
              <Heading level={3}>ML Engineer</Heading>
            </div>
            <Button variant="text" onClick={() => onViewChange(6)}>
              Open pipeline
            </Button>
          </div>
          <div className="pipeline-mini">
            {[
              ["Discovered", 24],
              ["Reviewed", 12],
              ["Shortlisted", 6],
              ["Interview", 3],
              ["Offer", 1],
            ].map((x, i) => (
              <div key={x[0]}>
                <span style={{ height: `${(30 + x[1]) as number * 2}px` }} />
                <strong>{x[1]}</strong>
                <small>{x[0]}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="panel hiring-activity">
          <div className="card-label">Recent candidate activity</div>
          <Heading level={3}>What changed today</Heading>
          {[
            ["Maya Rao added to shortlist", "10:42"],
            ["Sara Khan project evidence reviewed", "09:18"],
            ["4 new profiles discovered for MLOps", "Yesterday"],
          ].map((x, i) => (
            <div key={x[0]}>
              <span className="activity-icon">
                <Icon
                  name={i === 0 ? "check" : i === 1 ? "grid" : "people"}
                  size={13}
                />
              </span>
              <span>
                <strong>{x[0]}</strong>
                <small>{x[1]}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CompanyContent({
  navigate,
  fromHiring,
}: {
  navigate: (id: PortalId) => void
  fromHiring: boolean
}) {
  return (
    <div className="dashboard-grid">
      {fromHiring && (
        <div className="company-hiring-context full-width">
          <div className="transition-route">
            <span>
              <Icon name="people" size={14} /> Hiring
            </span>
            <Icon name="arrow" size={15} />
            <span className="active">
              <Icon name="building" size={14} /> Company
            </span>
          </div>
          <div>
            <div className="card-label">Company skill demand</div>
            <Heading level={3}>
              Machine Learning · MLOps · Cloud Engineering
            </Heading>
            <p>
              Compare open-role demand with current workforce capability and
              future requirements.
            </p>
          </div>
          <SkillChip tone="lime">Context carried forward</SkillChip>
        </div>
      )}
      <Metric
        value="68%"
        label="Future capability readiness"
        change="+8 pts since Q2"
      />
      <Metric
        value="46"
        label="Internal mobility candidates"
        change="Across 7 teams"
      />
      <Metric value="9" label="Priority capability gaps" change="3 critical" />
      <div className="panel span-two decision-panel">
        <div className="panel-head">
          <div>
            <div className="card-label">Build vs buy decision</div>
            <Heading level={3}>AI Engineering capability</Heading>
          </div>
          <SkillChip tone="warm">Priority need</SkillChip>
        </div>
        <div className="decision-options">
          {[
            ["Build internally", "18 people", "Best long-term value", 72],
            ["Hire externally", "6 roles", "Fastest capability", 58],
            ["Upskill teams", "34 people", "Strongest culture fit", 84],
            ["Partner", "2 vendors", "Lowest commitment", 46],
          ].map((x, i) => (
            <div
              className={`decision-option ${i === 2 ? "recommended" : ""}`}
              key={x[0] as string}
            >
              {i === 2 && (
                <span className="recommend-label">Recommended mix</span>
              )}
              <div className="decision-icon">
                <Icon
                  name={["grid", "people", "branch", "building"][i] as IconName}
                />
              </div>
              <strong>{x[0]}</strong>
              <small>{x[1]}</small>
              <ProgressBar
                value={x[3] as number}
                tone={i === 2 ? "lime" : "green"}
              />
              <p>{x[2]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="panel workforce-panel">
        <div className="card-label">Capability signals</div>
        <Heading level={3}>Where demand is moving</Heading>
        {[
          ["Machine Learning", "+24%"],
          ["Cloud platforms", "+18%"],
          ["Data governance", "+13%"],
        ].map((x, i) => (
          <div className="signal" key={x[0]}>
            <span>
              <i style={{ height: `${28 + i * 9}px` }} />
              <strong>{x[0]}</strong>
            </span>
            <SkillChip tone="sage">{x[1]}</SkillChip>
          </div>
        ))}
        <Button
          variant="text"
          onClick={() => navigate("colleges")}
          icon="arrow"
        >
          See education alignment
        </Button>
      </div>
    </div>
  )
}

function PortalPage({
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
}: {
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
}) {
  const [activeSub, setActiveSub] = useState(0)
  const meta = portalMeta[id]
  const explorerPageHeaders = [
    {
      eyebrow: "Your Explorer",
      title: "Discover where you could go.",
      sub: "Understand your skills, uncover connected directions and decide what to explore next.",
    },
    {
      eyebrow: "Career discovery",
      title: "Explore directions, not just job titles.",
      sub: "Search and compare careers through the skills, context and possibilities behind them.",
    },
    {
      eyebrow: "Live skill graph",
      title: "See where one skill can lead.",
      sub: "Explore relationships between your skills, nearby careers and emerging opportunities.",
    },
    {
      eyebrow: "My exploration",
      title: "Your ideas, saved in one place.",
      sub: "Return to careers, skills and pathways that caught your attention.",
    },
    {
      eyebrow: "Explorer profile",
      title: "The starting point for every direction.",
      sub: "Keep your skills, interests and experiences current to improve every connection.",
    },
    {
      eyebrow: "Career room",
      title: "Understand the work behind the title.",
      sub: "See the skills, progression and opportunities connected to this career direction.",
    },
  ]
  const builderPageHeaders = [
    {
      eyebrow: "Your Builder",
      title: "Build the skills to get there.",
      sub: "Turn your target direction into practical skills, projects and evidence.",
    },
    {
      eyebrow: "Skill gap",
      title: "Know exactly what stands between you and the role.",
      sub: "Compare your current proficiency with the skills your target career requires.",
    },
    {
      eyebrow: "Build path",
      title: "A flexible route from foundation to evidence.",
      sub: "Move through skills and practical work in an order that fits your experience.",
    },
    {
      eyebrow: "Micro-projects & evidence",
      title: "Make your ability visible.",
      sub: "Practice important skills through focused projects that create credible evidence.",
    },
    {
      eyebrow: "Skill detail",
      title: "Understand what to build and why it matters.",
      sub: "Explore proficiency, related skills and practical ways to demonstrate this capability.",
    },
    {
      eyebrow: "My Builder",
      title: "See the progress behind your direction.",
      sub: "Review developed skills, project evidence and readiness for your target career.",
    },
  ]
  const growerPageHeaders = [
    {
      eyebrow: "Your Grower",
      title: "Find what could come next.",
      sub: "See how your experience and transferable skills open adjacent career directions.",
    },
    {
      eyebrow: "Adjacent leaps",
      title: "Career mobility is wider than a ladder.",
      sub: "Understand which paths are close, what transfers and what each move would require.",
    },
    {
      eyebrow: "Career transition",
      title: "See the bridge between where you are and where you could go.",
      sub: "Make the transferable foundation and focused skill gap visible.",
    },
    {
      eyebrow: "Opportunities",
      title: "Turn a possible direction into a practical next step.",
      sub: "Explore transitions, projects, jobs and learning connected to your mobility path.",
    },
    {
      eyebrow: "Skill mobility",
      title: "One skill can unlock more than one direction.",
      sub: "Trace how your strongest capabilities connect to careers and opportunities.",
    },
    {
      eyebrow: "My growth",
      title: "Your progression is creating more options.",
      sub: "Review new skills, explored paths, evidence and credible next moves.",
    },
  ]
  const collegesPageHeaders = [
    {
      eyebrow: "Institution intelligence",
      title: "Connect curriculum with the market.",
      sub: "See what your institution teaches, what demand is changing and where action matters most.",
    },
    {
      eyebrow: "Curriculum ↔ Market",
      title: "Compare teaching with real skill demand.",
      sub: "Inspect the relationship behind every strong alignment and significant gap.",
    },
    {
      eyebrow: "Skill gap analysis",
      title: "Find the gaps that deserve an institutional response.",
      sub: "Prioritize curriculum changes through coverage, demand, trend and career relevance.",
    },
    {
      eyebrow: "Curriculum explorer",
      title: "Trace every course to skills, careers and demand.",
      sub: "Understand how program structure contributes to student capability and market relevance.",
    },
    {
      eyebrow: "Industry alignment",
      title: "See where your programs connect to industry.",
      sub: "Make alignment explainable through supporting skills rather than isolated scores.",
    },
    {
      eyebrow: "Student readiness",
      title: "Understand the capabilities students can demonstrate.",
      sub: "Compare common strengths, missing skills, evidence and career readiness across cohorts.",
    },
    {
      eyebrow: "Recommendations",
      title: "Turn market signals into curriculum decisions.",
      sub: "Review focused actions supported by skill gaps, demand trends and student readiness.",
    },
  ]
  const hiringPageHeaders = [
    {
      eyebrow: "Talent intelligence",
      title: "Find talent through skills.",
      sub: "Review open roles, candidate evidence and transferable capability in one explainable workflow.",
    },
    {
      eyebrow: "Role detail",
      title: "Define the capabilities the work requires.",
      sub: "Separate core, supporting and adjacent skills before beginning talent discovery.",
    },
    {
      eyebrow: "Talent discovery",
      title: "Discover relevant people beyond job titles.",
      sub: "Search direct skills, transferable experience and project evidence.",
    },
    {
      eyebrow: "Explainable matching",
      title: "Understand why this profile appears relevant.",
      sub: "Review role requirements, candidate skills, evidence and potential gaps without an opaque score.",
    },
    {
      eyebrow: "Candidate profile",
      title: "See the evidence behind the capability.",
      sub: "Explore skills, projects, career history and adjacent pathways in context.",
    },
    {
      eyebrow: "Skill-based search",
      title: "Search capabilities, not only titles.",
      sub: "Combine direct skills, related evidence and transferable backgrounds.",
    },
    {
      eyebrow: "Talent pipeline",
      title: "Keep evidence visible throughout review.",
      sub: "Move candidates through a professional hiring workflow without losing skill context.",
    },
    {
      eyebrow: "Talent insights",
      title: "See where demand and talent supply diverge.",
      sub: "Understand requested skills, adjacent talent pools and hard-to-find capabilities.",
    },
  ]
  const pageMeta =
    id === "explorer"
      ? explorerPageHeaders[activeSub]
      : id === "builder"
        ? builderPageHeaders[activeSub]
        : id === "grower"
          ? growerPageHeaders[activeSub]
          : id === "colleges"
            ? collegesPageHeaders[activeSub]
            : id === "hiring"
              ? hiringPageHeaders[activeSub]
              : meta
  return (
    <main className={`portal-page portal-${id}`}>
      <div className="portal-topbar">
        <div className="breadcrumb">
          <button onClick={() => onNavigate("home")}>Vriksha</button>
          <Icon name="chevron" size={14} />
          <span>{id}</span>
          {(id === "explorer" ||
            id === "builder" ||
            id === "grower" ||
            id === "colleges" ||
            id === "hiring") && (
            <>
              <Icon name="chevron" size={14} />
              <span>
                {id === "explorer" && activeSub === 5
                  ? "Career detail"
                  : meta.nav[activeSub]}
              </span>
            </>
          )}
        </div>
        <div className="context-pill">
          <span className="live-dot" />
          Live skill graph updated 2h ago
        </div>
      </div>
      <div className="portal-layout">
        <aside className="sidebar">
          <div className="sidebar-title">{id}</div>
          {meta.nav.map((x, i) => (
            <button
              key={x}
              onClick={() => {
                setActiveSub(i)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className={activeSub === i ? "active" : ""}
            >
              <span>{x}</span>
              {activeSub === i && <Icon name="chevron" size={14} />}
            </button>
          ))}
          <div className="sidebar-help">
            <Icon name="spark" />
            <strong>Shared context</strong>
            <p>Your activity connects across every Vriksha portal.</p>
          </div>
        </aside>
        <div className="portal-main">
          <div className="page-heading">
            <div>
              <div className="eyebrow">{pageMeta.eyebrow}</div>
              <Heading level={1}>{pageMeta.title}</Heading>
              <p>{pageMeta.sub}</p>
            </div>
            <div className="page-actions">
              <Button variant="secondary">Save view</Button>
              <Button icon="arrow">Explore insights</Button>
            </div>
          </div>
          {id === "explorer" && (
            <ExplorerContent
              navigate={onNavigate}
              view={activeSub}
              onBuilderHandoff={onBuilderHandoff}
              onViewChange={(view) => {
                setActiveSub(view)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          )}
          {id === "builder" && (
            <BuilderContent
              navigate={onNavigate}
              fromExplorer={builderFromExplorer}
              fromGrower={builderFromGrower}
              fromColleges={builderFromColleges}
              fromHiring={builderFromHiring}
              view={activeSub}
              onGrowerHandoff={onGrowerHandoff}
              onViewChange={(view) => {
                setActiveSub(view)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          )}
          {id === "grower" && (
            <GrowerContent
              view={activeSub}
              fromBuilder={growerFromBuilder}
              onBuilderHandoff={onGrowerBuilderHandoff}
              onHiringHandoff={onHiringHandoff}
              onViewChange={(view) => {
                setActiveSub(view)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          )}
          {id === "colleges" && (
            <CollegesContent
              view={activeSub}
              onBuilderHandoff={onCollegesBuilderHandoff}
              onHiringHandoff={onCollegesHiringHandoff}
              onViewChange={(view) => {
                setActiveSub(view)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          )}
          {id === "hiring" && (
            <HiringContent
              fromGrower={hiringFromGrower}
              fromColleges={hiringFromColleges}
              view={activeSub}
              onBuilderHandoff={onHiringBuilderHandoff}
              onGrowerHandoff={onHiringGrowerHandoff}
              onCompanyHandoff={onCompanyHandoff}
              onViewChange={(view) => {
                setActiveSub(view)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          )}
          {id === "company" && (
            <CompanyContent
              navigate={onNavigate}
              fromHiring={companyFromHiring}
            />
          )}
        </div>
      </div>
    </main>
  )
}

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
      {active === "home" && (
        <footer>
          <div className="footer-brand">
            <Logo onClick={() => navigate("home")} />
            <span>One living language for skills and opportunity.</span>
          </div>
          <nav className="footer-portals" aria-label="Portal links">
            {portals.map((portal) => (
              <button key={portal.id} onClick={() => navigate(portal.id)}>
                {portal.label}
              </button>
            ))}
          </nav>
          <nav className="footer-legal" aria-label="Company links">
            <button>About</button>
            <button>Contact</button>
            <button>Privacy</button>
            <button>Terms</button>
          </nav>
          <small>© 2025 Vriksha Intelligence</small>
        </footer>
      )}
    </>
  )
}
