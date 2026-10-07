import { useState } from "react"

interface EarlyWarningProps {
  onBuilderHandoff?: () => void
}

export type CollegeSkillState = "lit" | "priority" | "steady"

export interface CollegeSubSkill {
  id: string
  name: string
  state: CollegeSkillState
  riskLevel?: string
  prevalence?: string
  evidenceNote?: string
  x: number
  y: number
}

export interface CollegeBranchCategory {
  id: string
  label: string
  hours: string
  icon: "cloud" | "java" | "patterns" | "sysdesign" | "deploy"
  x: number
  y: number
  subSkills: CollegeSubSkill[]
}

const COLLEGE_BRANCH_CATEGORIES: CollegeBranchCategory[] = [
  {
    id: "java",
    label: "Core Java & OOP",
    hours: "60 hrs",
    icon: "java",
    x: 310,
    y: 250,
    subSkills: [
      { id: "java-21", name: "Java 21 LTS Features", state: "lit", riskLevel: "Modern", prevalence: "88%", evidenceNote: "Virtual threads & modern pattern matching", x: 215, y: 185 },
      { id: "concurrency", name: "Concurrency & Threads", state: "priority", riskLevel: "+62% Gap", prevalence: "80%", evidenceNote: "Missing modern concurrent primitives", x: 310, y: 175 },
      { id: "clean-arch", name: "Clean Architecture", state: "priority", riskLevel: "+52% Gap", prevalence: "75%", evidenceNote: "Overly coupled monolithic designs taught", x: 375, y: 210 },
      { id: "memory-gc", name: "Memory Model & GC", state: "priority", riskLevel: "+45% Gap", prevalence: "70%", evidenceNote: "Legacy JVM tuning without ZGC", x: 205, y: 255 },
      { id: "collections", name: "Core Collections API", state: "steady", riskLevel: "Evergreen", prevalence: "95%", evidenceNote: "Foundational data structures durable", x: 230, y: 330 },
      { id: "streams-legacy", name: "Java 8 Streams (Legacy)", state: "steady", riskLevel: "Baseline", prevalence: "90%", evidenceNote: "Basic stream pipelines covered", x: 280, y: 365 },
    ],
  },
  {
    id: "sysdesign",
    label: "System Design",
    hours: "40 hrs",
    icon: "sysdesign",
    x: 290,
    y: 425,
    subSkills: [
      { id: "caching-redis", name: "Distributed Caching (Redis)", state: "priority", riskLevel: "+85% Gap", prevalence: "82%", evidenceNote: "Missing in semester 5 capstone", x: 320, y: 355 },
      { id: "sharding-db", name: "Relational DB Sharding", state: "lit", riskLevel: "Modern", prevalence: "86%", evidenceNote: "Horizontal partitioning covered in advanced DB lab", x: 205, y: 390 },
      { id: "kafka-messaging", name: "Asynchronous Messaging", state: "priority", riskLevel: "+72% Gap", prevalence: "78%", evidenceNote: "Students lack hands-on Kafka cluster experience", x: 375, y: 410 },
      { id: "horiz-scale", name: "Horizontal Scalability", state: "priority", riskLevel: "+48% Gap", prevalence: "65%", evidenceNote: "Only single-instance servers tested", x: 200, y: 460 },
      { id: "three-tier", name: "Client-Server 3-Tier", state: "steady", riskLevel: "Baseline", prevalence: "95%", evidenceNote: "Standard architecture fully covered", x: 265, y: 515 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud Readiness",
    hours: "24 hrs",
    icon: "cloud",
    x: 480,
    y: 205,
    subSkills: [
      { id: "docker", name: "Docker Containers", state: "lit", riskLevel: "Modern", prevalence: "90%", evidenceNote: "Containerization integrated into cloud elective", x: 395, y: 145 },
      { id: "k8s", name: "Kubernetes Orchestration", state: "priority", riskLevel: "+78% Gap", prevalence: "84%", evidenceNote: "Missing hands-on pod deployment evidence", x: 480, y: 120 },
      { id: "cloud-labs", name: "AWS / GCP Cloud Labs", state: "lit", riskLevel: "Modern", prevalence: "85%", evidenceNote: "Free tier sandbox project completed", x: 575, y: 145 },
    ],
  },
  {
    id: "patterns",
    label: "Enterprise Patterns",
    hours: "50 hrs",
    icon: "patterns",
    x: 635,
    y: 265,
    subSkills: [
      { id: "microservices", name: "Event-Driven Microservices", state: "priority", riskLevel: "+88% Risk", prevalence: "84%", evidenceNote: "Crucial for tier-1 recruiter conversion", x: 565, y: 230 },
      { id: "rest-grpc", name: "REST & gRPC Contracts", state: "lit", riskLevel: "Modern", prevalence: "91%", evidenceNote: "API schemas validated via OpenAPI", x: 595, y: 180 },
      { id: "spring-boot", name: "Spring Boot 3 Ecosystem", state: "lit", riskLevel: "Modern", prevalence: "94%", evidenceNote: "Production microframework tested in assignments", x: 695, y: 195 },
      { id: "ddd", name: "Domain-Driven Design (DDD)", state: "priority", riskLevel: "+55% Gap", prevalence: "70%", evidenceNote: "Bounded context modeling omitted in lecture", x: 705, y: 265 },
      { id: "mvc-pattern", name: "Monolithic MVC Pattern", state: "steady", riskLevel: "Durable", prevalence: "80%", evidenceNote: "Traditional web paradigm understood", x: 595, y: 335 },
      { id: "soap-ejb", name: "EJB / SOAP XML (Obsolete)", state: "steady", riskLevel: "Deprecated", prevalence: "60%", evidenceNote: "1990s legacy syllabus over-indexed", x: 675, y: 335 },
    ],
  },
  {
    id: "deploy",
    label: "DevOps & Delivery",
    hours: "30 hrs",
    icon: "deploy",
    x: 635,
    y: 430,
    subSkills: [
      { id: "actions-cicd", name: "GitHub Actions CI/CD", state: "priority", riskLevel: "+65% Gap", prevalence: "80%", evidenceNote: "Students lack automated delivery pipelines", x: 615, y: 365 },
      { id: "test-gates", name: "Automated Test Gates", state: "priority", riskLevel: "+52% Gap", prevalence: "68%", evidenceNote: "Unit test coverage thresholds missing in lab", x: 695, y: 380 },
      { id: "monitoring", name: "Cloud Observability", state: "steady", riskLevel: "Baseline", prevalence: "55%", evidenceNote: "Prometheus / Grafana basic metrics", x: 690, y: 480 },
      { id: "localhost", name: "Localhost Testing (Legacy)", state: "steady", riskLevel: "Deprecated", prevalence: "35%", evidenceNote: "Manual WAR deployment into Tomcat", x: 650, y: 525 },
    ],
  },
]

export default function EarlyWarning({ onBuilderHandoff }: EarlyWarningProps) {
  // Scenario Stage: 0 = Healthy (94%), 1 = Warning (68%), 2 = Declining (41%)
  const [warningStage, setWarningStage] = useState<number>(1)
  // Expanded nodes set: if empty, tree displays initial 5 core pillars (Image 1 style)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [activeFilter, setActiveFilter] = useState<"all" | "lit" | "priority" | "steady">("all")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const isAnyExpanded = expandedNodes.size > 0
  const isAllExpanded = expandedNodes.size === COLLEGE_BRANCH_CATEGORIES.length

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(nodeId)) {
        next.delete(nodeId)
      } else {
        next.add(nodeId)
      }
      return next
    })
  }

  const toggleAll = () => {
    if (isAllExpanded || isAnyExpanded) {
      setExpandedNodes(new Set())
    } else {
      setExpandedNodes(new Set(COLLEGE_BRANCH_CATEGORIES.map((c) => c.id)))
    }
  }

  const isNodeExpanded = (nodeId: string) => expandedNodes.has(nodeId)

  // Stage details matching the College portal context
  const stageData = [
    {
      name: "Healthy",
      pct: 94,
      badge: "Lush & Aligned",
      conversion: "92% Tier-1 Benchmark",
      riskText: "0 Years · Strong conversion",
      tone: "emerald",
    },
    {
      name: "Warning",
      pct: 68,
      badge: "Early Browning · 2.4 yr Leading Indicator",
      conversion: "88% Trailing (Vulnerable)",
      riskText: "2.4 Years ahead of placement dip",
      tone: "amber",
    },
    {
      name: "Declining",
      pct: 41,
      badge: "Severe Decay · Placement Threat Imminent",
      conversion: "64% Placement Deficit",
      riskText: "Immediate · Recruiter down-tiering",
      tone: "rose",
    },
  ]

  const currentStage = stageData[warningStage]

  // Render icons matching the College specialisation categories
  const renderIcon = (type: "cloud" | "java" | "patterns" | "sysdesign" | "deploy") => {
    switch (type) {
      case "cloud":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        )
      case "java":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        )
      case "patterns":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
        )
      case "sysdesign":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        )
      case "deploy":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        )
    }
  }

  const allCount = isAnyExpanded ? 26 : 5
  const litCount = isAnyExpanded ? 5 : 1
  const priorityCount = isAnyExpanded ? 14 : 3
  const steadyCount = isAnyExpanded ? 7 : 1

  return (
    <section className="w-full relative my-8" id="early-warning">
      {/* 2-Column Grid Layout matching the Figma screen pixel-for-pixel */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
        {/* ========================================================
            LEFT COLUMN: THE BOTANICAL SKILL TREE CANVAS CARD
            ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
          {/* Card Header: CURRICULUM INTELLIGENCE + Title + Specialisation Dropdown */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block font-sans">
                CURRICULUM INTELLIGENCE
              </span>
              <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight mt-0.5 font-sans">
                Enterprise Application Development
              </h2>
            </div>

            {/* Specialisation Dropdown Capsule */}
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-xs font-semibold text-slate-800 flex items-center gap-2 cursor-pointer shadow-2xs transition-colors">
              <span className="w-5 h-5 rounded bg-[#10b981] flex items-center justify-center text-white text-[10px] shadow-2xs">
                🎓
              </span>
              <span>Software Engineering Specialisation</span>
              <span className="text-slate-400 text-xs font-mono ml-0.5">⌄</span>
            </div>
          </div>

          {/* Filter Pills Bar & Scenario Stage Simulator Bar */}
          <div className="flex items-center justify-between gap-2.5 my-3 flex-wrap">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={toggleAll}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all shadow-2xs ${
                  activeFilter === "all"
                    ? "bg-[#10b981] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All ({allCount})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter(activeFilter === "lit" ? "all" : "lit")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                  activeFilter === "lit"
                    ? "bg-emerald-100 text-emerald-900 border border-emerald-300 font-semibold"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>Aligned ({litCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter(activeFilter === "priority" ? "all" : "priority")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                  activeFilter === "priority"
                    ? "bg-amber-100 text-amber-900 border border-amber-300 font-semibold"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <span>Browning ({priorityCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter(activeFilter === "steady" ? "all" : "steady")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all flex items-center gap-1.5 ${
                  activeFilter === "steady"
                    ? "bg-slate-200 text-slate-900 border border-slate-300 font-semibold"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#94a3b8]" />
                <span>Baseline ({steadyCount})</span>
              </button>
            </div>

            {/* Scenario Stage Toggle (Healthy, Warning, Declining) */}
            <div className="flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-full border border-slate-200/80">
              {stageData.map((stage, idx) => (
                <button
                  type="button"
                  key={stage.name}
                  onClick={() => setWarningStage(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all ${
                    warningStage === idx
                      ? idx === 0
                        ? "bg-emerald-600 text-white font-semibold shadow-2xs"
                        : idx === 1
                        ? "bg-amber-500 text-white font-semibold shadow-2xs"
                        : "bg-rose-600 text-white font-semibold shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {stage.name} ({stage.pct}%)
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================
              THE BOTANICAL SKILL TREE CANVAS (viewBox: 0 0 960 620)
              ======================================================== */}
          <div className="relative w-full aspect-[960/620] bg-gradient-to-b from-white via-[#fcfefd] to-[#f4faf5] rounded-2xl border border-slate-100 overflow-hidden my-2 select-none">
            {/* SVG Illustration: Grassy Mound, Trunk, Limbs, Botanical Leaves, Sub-Branches */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 960 620"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                {/* Natural Wood Trunk Gradient */}
                <linearGradient id="college-oak-wood" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={warningStage === 0 ? "#786047" : warningStage === 1 ? "#6e5239" : "#5a3d28"} />
                  <stop offset="30%" stopColor={warningStage === 0 ? "#8f755a" : warningStage === 1 ? "#806245" : "#694931"} />
                  <stop offset="65%" stopColor={warningStage === 0 ? "#a58c70" : warningStage === 1 ? "#967554" : "#7c573b"} />
                  <stop offset="100%" stopColor={warningStage === 0 ? "#6b533b" : warningStage === 1 ? "#5e432c" : "#4a301f"} />
                </linearGradient>

                {/* Leaves Gradients adapted to Stage (Healthy vs Warning vs Declining) */}
                <linearGradient id="college-leaf-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor={
                      warningStage === 0 ? "#dcf0da" : warningStage === 1 ? "#fde68a" : "#fca5a5"
                    }
                  />
                  <stop
                    offset="100%"
                    stopColor={
                      warningStage === 0 ? "#98ce95" : warningStage === 1 ? "#d97706" : "#b91c1c"
                    }
                  />
                </linearGradient>

                <linearGradient id="college-leaf-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor={
                      warningStage === 0 ? "#ceebcc" : warningStage === 1 ? "#f59e0b" : "#ef4444"
                    }
                  />
                  <stop
                    offset="100%"
                    stopColor={
                      warningStage === 0 ? "#87c383" : warningStage === 1 ? "#b45309" : "#7f1d1d"
                    }
                  />
                </linearGradient>

                <linearGradient id="college-grass-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#eaf7ed" />
                  <stop offset="100%" stopColor="#d8eedd" />
                </linearGradient>
              </defs>

              {/* 1. Rolling Grassy Hill at Bottom */}
              <g className="grassy-mound">
                <path
                  d="M -40 620 L -40 575 Q 480 470 1000 575 L 1000 620 Z"
                  fill="url(#college-grass-grad)"
                />
                <path
                  d="M 40 620 Q 480 505 920 620 Z"
                  fill="#cde9d3"
                  opacity="0.6"
                />

                {/* Sprouting Grass Blades and Foliage along the hill */}
                <path d="M 270 565 C 265 540 273 525 280 515 C 283 535 278 550 276 565" fill="#4ade80" opacity="0.8" />
                <path d="M 285 570 C 295 545 310 535 320 525 C 312 545 302 560 293 570" fill="#22c55e" opacity="0.8" />
                <circle cx="282" cy="516" r="4.5" fill="#86efac" opacity="0.9" />

                <path d="M 360 550 C 355 525 365 512 372 500 C 375 520 370 535 368 550" fill="#22c55e" opacity="0.8" />
                <path d="M 378 555 C 390 530 405 525 415 515 C 405 535 395 548 385 555" fill="#15803d" opacity="0.8" />

                <path d="M 575 555 C 565 535 555 525 545 515 C 555 530 568 545 572 555" fill="#22c55e" opacity="0.8" />
                <path d="M 588 550 C 595 525 588 512 582 500 C 585 520 590 535 592 550" fill="#15803d" opacity="0.8" />

                <path d="M 665 570 C 655 545 645 535 635 525 C 648 540 658 555 662 570" fill="#4ade80" opacity="0.8" />
                <path d="M 680 565 C 685 540 680 525 674 515 C 676 535 680 550 682 565" fill="#22c55e" opacity="0.8" />
                <circle cx="676" cy="516" r="4.5" fill="#86efac" opacity="0.9" />
              </g>

              {/* 2. Realistic Tree Trunk & Roots */}
              <g className="tree-trunk-body">
                <path
                  d="M 405 570 C 435 540 452 485 458 420 C 462 385 465 375 468 360 C 476 360 484 360 492 360 C 495 375 498 385 502 420 C 508 485 525 540 555 570 Z"
                  fill="url(#college-oak-wood)"
                />
                <path d="M 445 560 C 462 495 468 435 470 365" fill="none" stroke="#5a422b" strokeWidth="2.5" opacity="0.5" />
                <path d="M 515 560 C 498 495 492 435 490 365" fill="none" stroke="#bfaa95" strokeWidth="2.5" opacity="0.6" />
                <path d="M 480 565 C 480 490 480 430 480 365" fill="none" stroke="#685038" strokeWidth="1.8" opacity="0.4" />
              </g>

              {/* 3. Five Organic Botanical Limbs */}
              <g className="tree-limbs">
                {/* Limb 1: Center Vertical to Cloud Readiness (480, 205) */}
                <path
                  d="M 480 360 C 480 300 480 250 480 205"
                  fill="none"
                  stroke={warningStage === 0 ? "#8f755a" : warningStage === 1 ? "#7d5d3e" : "#63442a"}
                  strokeWidth="8.5"
                  strokeLinecap="round"
                />

                {/* Limb 2: Upper Left to Core Java (310, 250) */}
                <path
                  d="M 470 360 C 400 330 350 290 310 250"
                  fill="none"
                  stroke={warningStage === 0 ? "#8f755a" : warningStage === 1 ? "#7d5d3e" : "#63442a"}
                  strokeWidth="7.5"
                  strokeLinecap="round"
                />

                {/* Limb 3: Upper Right to Enterprise Patterns (635, 265) */}
                <path
                  d="M 490 360 C 560 330 600 295 635 265"
                  fill="none"
                  stroke={warningStage === 0 ? "#8f755a" : warningStage === 1 ? "#7d5d3e" : "#63442a"}
                  strokeWidth="7.5"
                  strokeLinecap="round"
                />

                {/* Limb 4: Lower Left to System Design (290, 425) */}
                <path
                  d="M 460 425 C 380 420 335 423 290 425"
                  fill="none"
                  stroke={warningStage === 0 ? "#8f755a" : warningStage === 1 ? "#7d5d3e" : "#63442a"}
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />

                {/* Limb 5: Lower Right to DevOps & Delivery (635, 430) */}
                <path
                  d="M 500 425 C 570 420 605 425 635 430"
                  fill="none"
                  stroke={warningStage === 0 ? "#8f755a" : warningStage === 1 ? "#7d5d3e" : "#63442a"}
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />
              </g>

              {/* 4. Botanical Leaves Sprouting Naturally on Limbs */}
              <g className="foliage-leaves">
                <ellipse cx="465" cy="180" rx="15" ry="7" transform="rotate(-40 465 180)" fill="url(#college-leaf-1)" />
                <ellipse cx="495" cy="180" rx="15" ry="7" transform="rotate(40 495 180)" fill="url(#college-leaf-2)" />
                <ellipse cx="450" cy="270" rx="16" ry="7.5" transform="rotate(-30 450 270)" fill="url(#college-leaf-1)" />
                <ellipse cx="510" cy="270" rx="16" ry="7.5" transform="rotate(30 510 270)" fill="url(#college-leaf-2)" />

                <ellipse cx="370" cy="300" rx="16" ry="7.5" transform="rotate(-45 370 300)" fill="url(#college-leaf-2)" />
                <ellipse cx="395" cy="285" rx="14" ry="7" transform="rotate(-20 395 285)" fill="url(#college-leaf-1)" />
                <ellipse cx="410" cy="330" rx="15" ry="7" transform="rotate(-70 410 330)" fill="url(#college-leaf-2)" />

                <ellipse cx="550" cy="330" rx="16" ry="7.5" transform="rotate(45 550 330)" fill="url(#college-leaf-1)" />
                <ellipse cx="590" cy="300" rx="16" ry="7.5" transform="rotate(25 590 300)" fill="url(#college-leaf-2)" />
                <ellipse cx="570" cy="285" rx="14" ry="7" transform="rotate(60 570 285)" fill="url(#college-leaf-1)" />

                <ellipse cx="350" cy="438" rx="16" ry="7.5" transform="rotate(-15 350 438)" fill="url(#college-leaf-2)" />
                <ellipse cx="390" cy="445" rx="14" ry="7" transform="rotate(35 390 445)" fill="url(#college-leaf-1)" />
                <ellipse cx="415" cy="415" rx="15" ry="7" transform="rotate(-30 415 415)" fill="url(#college-leaf-2)" />

                <ellipse cx="540" cy="442" rx="16" ry="7.5" transform="rotate(25 540 442)" fill="url(#college-leaf-1)" />
                <ellipse cx="570" cy="448" rx="14" ry="7" transform="rotate(-25 570 448)" fill="url(#college-leaf-2)" />
                <ellipse cx="595" cy="425" rx="15" ry="7" transform="rotate(30 595 425)" fill="url(#college-leaf-1)" />
              </g>

              {/* 5. Radiating Fine Twig Connectors to Sub-Modules (Revealed in Image 2) */}
              <g className="sub-branches-connecting-lines">
                {COLLEGE_BRANCH_CATEGORIES.map((cat) => {
                  if (!isNodeExpanded(cat.id)) return null

                  return cat.subSkills.map((sub) => {
                    const matchesFilter =
                      activeFilter === "all" ||
                      (activeFilter === "lit" && sub.state === "lit") ||
                      (activeFilter === "priority" && sub.state === "priority") ||
                      (activeFilter === "steady" && sub.state === "steady")

                    if (!matchesFilter) return null

                    const strokeColor =
                      sub.state === "lit"
                        ? "#10b981"
                        : sub.state === "priority"
                        ? "#f59e0b"
                        : "#94a3b8"

                    const midX = (cat.x + sub.x) / 2
                    const midY = (cat.y + sub.y) / 2 - 8

                    return (
                      <g key={`college-twig-${sub.id}`} className="transition-opacity duration-300">
                        <path
                          d={`M ${cat.x} ${cat.y} Q ${midX} ${midY}, ${sub.x} ${sub.y}`}
                          fill="none"
                          stroke={strokeColor}
                          strokeWidth="1.6"
                          opacity="0.85"
                          strokeLinecap="round"
                        />
                        <circle cx={sub.x} cy={sub.y} r="3" fill={strokeColor} />
                      </g>
                    )
                  })
                })}
              </g>
            </svg>

            {/* ========================================================
                6. THE 5 CORE BRANCH CATEGORY NODES (Capsules)
                ======================================================== */}
            {COLLEGE_BRANCH_CATEGORIES.map((cat) => {
              const isExpanded = isNodeExpanded(cat.id)
              const leftPct = `${(cat.x / 960) * 100}%`
              const topPct = `${(cat.y / 620) * 100}%`

              // Highlight specific categories if in warning / declining state
              const isAtRisk =
                (cat.id === "patterns" || cat.id === "sysdesign" || cat.id === "deploy") &&
                warningStage > 0

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleNode(cat.id)}
                  style={{
                    left: leftPct,
                    top: topPct,
                    transform: "translate(-50%, -50%)",
                  }}
                  className={`absolute z-10 px-4 py-2 rounded-full bg-white shadow-sm border transition-all duration-300 cursor-pointer flex items-center gap-2.5 group hover:scale-105 select-none ${
                    isExpanded
                      ? "border-emerald-500 ring-4 ring-emerald-500/20 shadow-md"
                      : isAtRisk
                      ? warningStage === 1
                        ? "border-amber-300 hover:border-amber-400"
                        : "border-rose-300 hover:border-rose-400"
                      : "border-slate-200/90 hover:border-emerald-400"
                  }`}
                  aria-label={`${cat.label} category pill`}
                >
                  {/* Round Icon Badge */}
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform ${
                      isAtRisk
                        ? warningStage === 1
                          ? "bg-[#f59e0b]"
                          : "bg-[#ef4444]"
                        : "bg-[#10b981]"
                    }`}
                  >
                    {renderIcon(cat.icon)}
                  </span>

                  {/* Label (and Hours in Image 2 / expanded state) */}
                  <div className="text-left flex flex-col justify-center">
                    <span className="text-xs font-bold text-slate-900 tracking-tight leading-tight whitespace-nowrap font-sans">
                      {cat.label}
                    </span>
                    {isExpanded && (
                      <span className="text-[11px] font-mono text-slate-500 leading-none mt-0.5 font-medium">
                        {cat.hours}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}

            {/* ========================================================
                7. REVEALED SUB-MODULE CAPSULES (Image 2)
                ======================================================== */}
            {COLLEGE_BRANCH_CATEGORIES.flatMap((cat) => {
              if (!isNodeExpanded(cat.id)) return []

              return cat.subSkills.map((sub) => {
                const matchesFilter =
                  activeFilter === "all" ||
                  (activeFilter === "lit" && sub.state === "lit") ||
                  (activeFilter === "priority" && sub.state === "priority") ||
                  (activeFilter === "steady" && sub.state === "steady")

                if (!matchesFilter) return null

                const leftPct = `${(sub.x / 960) * 100}%`
                const topPct = `${(sub.y / 620) * 100}%`
                const isSelected = selectedSkill === sub.id

                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSkill(sub.id === selectedSkill ? null : sub.id)}
                    style={{
                      left: leftPct,
                      top: topPct,
                      transform: "translate(-50%, -50%)",
                    }}
                    className={`absolute z-20 px-2.5 py-1 rounded-full bg-white shadow-2xs border transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap hover:scale-105 select-none ${
                      isSelected
                        ? "border-slate-800 ring-2 ring-slate-800/20 shadow-md scale-105"
                        : sub.state === "lit"
                        ? "border-emerald-300 text-slate-800"
                        : sub.state === "priority"
                        ? "border-amber-300 text-slate-800"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        sub.state === "lit"
                          ? "bg-[#10b981]"
                          : sub.state === "priority"
                          ? "bg-[#f59e0b]"
                          : "bg-[#94a3b8]"
                      }`}
                    />
                    <span className="text-[11px] font-medium leading-none font-sans">
                      {sub.name}
                    </span>
                  </button>
                )
              })
            })}

            {/* ========================================================
                8. BASE FOUNDATION PILL (Sitting on the Grassy Hill)
                ======================================================== */}
            <div className="absolute left-1/2 bottom-5 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-emerald-300 shadow-2xs text-xs font-semibold text-emerald-950 flex items-center gap-2 whitespace-nowrap z-20 select-none">
              <span>Curriculum Foundation · Verified Baseline (CS Theory, Algorithms, OS)</span>
            </div>
          </div>

          {/* ========================================================
              BOTTOM LEGEND BAR (Shown in Image 2 / Expanded State)
              ======================================================== */}
          {isAnyExpanded ? (
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-slate-600 mt-1">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <span className="text-[11px] font-medium text-slate-700">Market-Aligned Syllabus (5)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="text-[11px] font-medium text-slate-700">Browning Curriculum Gaps (14)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]" />
                  <span className="text-[11px] font-medium text-slate-700">Foundational Baseline (7)</span>
                </span>
              </div>

              <span className="text-[11px] text-slate-500 font-sans">
                Click any curriculum node to inspect syllabus divergence.
              </span>
            </div>
          ) : (
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px]">Click any branch on the tree to reveal detailed syllabus modules</span>
            </div>
          )}
        </div>

        {/* ========================================================
            RIGHT COLUMN: THE 3 FIGMA METRIC CARDS
            ======================================================== */}
        <div className="flex flex-col gap-4">
          {/* --------------------------------------------------------
              CARD 1: Top Curriculum Gaps (Equivalent to Top Skills)
              -------------------------------------------------------- */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Top Curriculum Gaps
              </h3>
              <span className="text-slate-400 text-xs cursor-pointer hover:text-slate-600" title="Ranked by recruiter hiring velocity and curriculum divergence">
                ⓘ
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Courses strategically ranked by recruiter hiring velocity and placement vulnerability.
            </p>

            <div className="flex flex-col gap-2.5">
              {/* Item 01: Enterprise Patterns */}
              <div
                onClick={() => {
                  setExpandedNodes((prev) => new Set(prev).add("patterns"))
                  setSelectedSkill("microservices")
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">01</span>
                    <strong className="text-xs font-bold text-slate-900 group-hover:text-amber-950 font-sans">
                      Enterprise Patterns
                    </strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                      +85% Risk
                    </span>
                    <span className="text-slate-400 text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 pl-6">
                  Prevalence: 80% legacy · Missing microservices
                </div>
              </div>

              {/* Item 02: Cloud Native & GitOps */}
              <div
                onClick={() => {
                  setExpandedNodes((prev) => new Set(prev).add("cloud"))
                  setSelectedSkill("k8s")
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">02</span>
                    <strong className="text-xs font-bold text-slate-900 group-hover:text-amber-950 font-sans">
                      Cloud Native & GitOps
                    </strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                      +68% Gap
                    </span>
                    <span className="text-slate-400 text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 pl-6">
                  Prevalence: 82% demand · Missing Docker/K8s
                </div>
              </div>

              {/* Item 03: Distributed Caching */}
              <div
                onClick={() => {
                  setExpandedNodes((prev) => new Set(prev).add("sysdesign"))
                  setSelectedSkill("caching-redis")
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">03</span>
                    <strong className="text-xs font-bold text-slate-900 group-hover:text-amber-950 font-sans">
                      Distributed Caching
                    </strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                      +55% Gap
                    </span>
                    <span className="text-slate-400 text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 pl-6">
                  Prevalence: 78% parity · Missing Redis/Kafka
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------
              CARD 2: Projected Placement Spike
              -------------------------------------------------------- */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Projected Placement Spike
              </h3>
              <span className="text-slate-400 text-xs cursor-pointer hover:text-slate-600">
                ⓘ
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <strong className="text-3xl font-extrabold text-[#065f46] tracking-tight font-sans">
                {currentStage.pct}%
              </strong>
              <span className="text-xs font-semibold text-slate-600">Placement Target</span>
              <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]">
                +65%
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mt-2 font-sans">
              Closing the top 3 browning gaps moves graduate cohort conversion from warning to 94% tier-1 benchmark.
            </p>
          </div>

          {/* --------------------------------------------------------
              CARD 3: Strategic Takeaway
              -------------------------------------------------------- */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-[#10b981]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10" />
                <path d="M12 20V4" />
                <path d="M6 20v-6" />
              </svg>
              <strong className="text-xs font-bold text-slate-900 uppercase tracking-wide font-sans">
                Strategic Takeaway
              </strong>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans mb-3">
              Enterprise Patterns is your highest curriculum divergence. Replacing legacy SOAP/EJB with event-driven microservices protects your 2026 recruiter conversion.
            </p>

            {onBuilderHandoff && (
              <button
                type="button"
                onClick={onBuilderHandoff}
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-semibold text-slate-800 hover:text-emerald-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Modernize Syllabus in Curriculum Diff</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
