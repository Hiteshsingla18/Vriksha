import { useState } from "react"

interface CompanySkillTreeProps {
  targetRole?: string
}

export type CompanySkillState = "lit" | "priority" | "steady"

export interface CompanySubSkill {
  id: string
  name: string
  state: CompanySkillState
  roi?: string
  benchDepth?: string
  evidenceNote?: string
  x: number
  y: number
}

export interface CompanyBranchCategory {
  id: string
  label: string
  weight: string
  icon: "ai" | "data" | "arch" | "gov" | "mlops"
  x: number
  y: number
  subSkills: CompanySubSkill[]
}

const COMPANY_BRANCH_CATEGORIES: CompanyBranchCategory[] = [
  {
    id: "data",
    label: "Data Engineering",
    weight: "25%",
    icon: "data",
    x: 310,
    y: 250,
    subSkills: [
      { id: "vector-db", name: "Vector Databases", state: "priority", roi: "+55% ROI", benchDepth: "30%", evidenceNote: "Fast internal mobility path", x: 215, y: 185 },
      { id: "rag-pipe", name: "RAG Pipelines", state: "priority", roi: "+68% ROI", benchDepth: "22%", evidenceNote: "Core generative search tier", x: 310, y: 175 },
      { id: "feature-store", name: "Feature Stores", state: "priority", roi: "+48% ROI", benchDepth: "18%", evidenceNote: "Needed for low-latency inference", x: 375, y: 210 },
      { id: "stream-ingest", name: "Streaming Ingestion", state: "priority", roi: "+44% ROI", benchDepth: "35%", evidenceNote: "Kafka event feeds", x: 205, y: 255 },
      { id: "dwh-bigquery", name: "BigQuery / Snowflake", state: "steady", roi: "Verified", benchDepth: "85%", evidenceNote: "Strong existing data bench", x: 230, y: 330 },
      { id: "etl-pipelines", name: "ETL Maintenance", state: "steady", roi: "Verified", benchDepth: "90%", evidenceNote: "Standard pipelines intact", x: 280, y: 365 },
    ],
  },
  {
    id: "gov",
    label: "Enterprise Governance",
    weight: "15%",
    icon: "gov",
    x: 290,
    y: 425,
    subSkills: [
      { id: "ai-safety", name: "AI Safety & Compliance", state: "priority", roi: "+85% ROI", benchDepth: "14%", evidenceNote: "Critical for enterprise deployment", x: 320, y: 355 },
      { id: "roi-story", name: "Executive Storytelling", state: "lit", roi: "Verified", benchDepth: "78%", evidenceNote: "Strong cross-functional leads", x: 205, y: 390 },
      { id: "risk-audit", name: "Model Risk Auditing", state: "priority", roi: "+52% ROI", benchDepth: "20%", evidenceNote: "Missing automated bias checks", x: 375, y: 410 },
      { id: "kpi-dash", name: "KPI Dashboarding", state: "priority", roi: "+42% ROI", benchDepth: "45%", evidenceNote: "Telemetry reporting", x: 200, y: 460 },
      { id: "finops-cost", name: "FinOps & Token Budgeting", state: "steady", roi: "Verified", benchDepth: "80%", evidenceNote: "Cloud budget tracking active", x: 265, y: 515 },
    ],
  },
  {
    id: "ai",
    label: "AI / ML Systems",
    weight: "30%",
    icon: "ai",
    x: 480,
    y: 205,
    subSkills: [
      { id: "llm-tune", name: "LLM Fine-Tuning", state: "priority", roi: "+75% ROI", benchDepth: "16%", evidenceNote: "High external hire premium", x: 395, y: 145 },
      { id: "agents", name: "Agentic Workflows", state: "priority", roi: "+85% ROI", benchDepth: "12%", evidenceNote: "Top build vs buy priority", x: 480, y: 120 },
      { id: "core-ml", name: "Production ML Models", state: "lit", roi: "Verified", benchDepth: "82%", evidenceNote: "Existing data science team asset", x: 575, y: 145 },
    ],
  },
  {
    id: "arch",
    label: "Core Architecture",
    weight: "20%",
    icon: "arch",
    x: 635,
    y: 265,
    subSkills: [
      { id: "dist-serving", name: "Distributed Model Serving", state: "priority", roi: "+64% ROI", benchDepth: "26%", evidenceNote: "vLLM / TensorRT deployment", x: 565, y: 230 },
      { id: "fast-apis", name: "High-Throughput APIs", state: "lit", roi: "Verified", benchDepth: "92%", evidenceNote: "FastAPI / gRPC services verified", x: 595, y: 180 },
      { id: "python-stack", name: "Production Python", state: "lit", roi: "Verified", benchDepth: "95%", evidenceNote: "Senior backend engineers ready", x: 695, y: 195 },
      { id: "microservices", name: "Microservice Topology", state: "priority", roi: "+46% ROI", benchDepth: "70%", evidenceNote: "Service mesh routing", x: 705, y: 265 },
      { id: "git-ops", name: "Git & Review Standard", state: "lit", roi: "Verified", benchDepth: "96%", evidenceNote: "Rigorous CI code review gates", x: 595, y: 335 },
      { id: "linux-script", name: "Linux Systems Scripting", state: "steady", roi: "Verified", benchDepth: "90%", evidenceNote: "Foundational operations", x: 675, y: 335 },
    ],
  },
  {
    id: "mlops",
    label: "Cloud & MLOps Infra",
    weight: "10%",
    icon: "mlops",
    x: 635,
    y: 430,
    subSkills: [
      { id: "gpu-k8s", name: "Kubernetes GPU Clusters", state: "priority", roi: "+68% ROI", benchDepth: "24%", evidenceNote: "Upskill internal DevOps leads", x: 615, y: 365 },
      { id: "triton", name: "Triton Inference Server", state: "priority", roi: "+58% ROI", benchDepth: "19%", evidenceNote: "Model pipeline optimization", x: 695, y: 380 },
      { id: "drift-observ", name: "Model Drift Observability", state: "steady", roi: "Verified", benchDepth: "52%", evidenceNote: "Prometheus alerts baseline", x: 690, y: 480 },
      { id: "cloud-storage", name: "Cloud Object Storage", state: "steady", roi: "Verified", benchDepth: "94%", evidenceNote: "S3 / GCS buckets durable", x: 650, y: 525 },
    ],
  },
]

export default function CompanySkillTree({
  targetRole = "AI Architect",
}: CompanySkillTreeProps) {
  // Expanded nodes set: if empty, tree shows initial 5 core pillars (Image 1 style)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [activeFilter, setActiveFilter] = useState<"all" | "lit" | "priority" | "steady">("all")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const isAnyExpanded = expandedNodes.size > 0
  const isAllExpanded = expandedNodes.size === COMPANY_BRANCH_CATEGORIES.length

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
      setExpandedNodes(new Set(COMPANY_BRANCH_CATEGORIES.map((c) => c.id)))
    }
  }

  const isNodeExpanded = (nodeId: string) => expandedNodes.has(nodeId)

  const renderIcon = (type: "ai" | "data" | "arch" | "gov" | "mlops") => {
    switch (type) {
      case "ai":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4" />
            <path d="M12 2a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4" />
            <path d="M8 6H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4" />
            <path d="M16 6h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4" />
            <path d="M8 14H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4" />
            <path d="M16 14h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4" />
          </svg>
        )
      case "data":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        )
      case "arch":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        )
      case "gov":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        )
      case "mlops":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        )
    }
  }

  const allCount = isAnyExpanded ? 26 : 5
  const litCount = isAnyExpanded ? 5 : 1
  const priorityCount = isAnyExpanded ? 14 : 3
  const steadyCount = isAnyExpanded ? 7 : 1

  return (
    <section className="w-full relative my-8" id="workforce-tree">
      {/* 2-Column Grid Layout matching the Figma screen pixel-for-pixel */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
        {/* ========================================================
            LEFT COLUMN: THE BOTANICAL SKILL TREE CANVAS CARD
            ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
          {/* Card Header: WORKFORCE BLUEPRINT + Title + Role Selector Dropdown */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block font-sans">
                WORKFORCE CAPABILITY BLUEPRINT
              </span>
              <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight mt-0.5 font-sans">
                {targetRole}
              </h2>
            </div>

            {/* Target Role Dropdown Capsule */}
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-xs font-semibold text-slate-800 flex items-center gap-2 cursor-pointer shadow-2xs transition-colors">
              <span className="w-5 h-5 rounded bg-[#52b788] flex items-center justify-center text-white text-[10px] shadow-2xs">
                🏢
              </span>
              <span>Enterprise {targetRole} Blueprint</span>
              <span className="text-slate-400 text-xs font-mono ml-0.5">⌄</span>
            </div>
          </div>

          {/* Filter Pills Bar */}
          <div className="flex items-center gap-2.5 my-3 flex-wrap">
            <button
              type="button"
              onClick={toggleAll}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all shadow-2xs ${
                activeFilter === "all"
                  ? "bg-[#5ec290] text-white"
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
                  ? "bg-emerald-100 text-emerald-900 border border-[#a7ddbf] font-semibold"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/70"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#52b788]" />
              <span>In-House Strength ({litCount})</span>
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
              <span>Build Gaps ({priorityCount})</span>
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
              <span>Core Baseline ({steadyCount})</span>
            </button>
          </div>

          {/* ========================================================
              THE BOTANICAL SKILL TREE CANVAS (viewBox: 0 0 960 620)
              ======================================================== */}
          <div className="relative w-full aspect-[960/620] bg-gradient-to-b from-white via-[#fcfefd] to-[#f4faf5] rounded-2xl border border-slate-100 overflow-hidden my-2 select-none">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 960 620"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="company-oak-wood" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#786047" />
                  <stop offset="30%" stopColor="#8f755a" />
                  <stop offset="65%" stopColor="#a58c70" />
                  <stop offset="100%" stopColor="#6b533b" />
                </linearGradient>

                {/* Soft Light Green Foliage Leaves Gradients (Gentle, Natural & Theme-Aligned) */}
                <linearGradient id="company-leaf-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dcf0da" />
                  <stop offset="100%" stopColor="#98ce95" />
                </linearGradient>

                <linearGradient id="company-leaf-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ceebcc" />
                  <stop offset="100%" stopColor="#87c383" />
                </linearGradient>

                <linearGradient id="company-leaf-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e8f5e5" />
                  <stop offset="100%" stopColor="#aedaa9" />
                </linearGradient>

                <linearGradient id="company-grass-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#edf8f0" />
                  <stop offset="100%" stopColor="#d8eedd" />
                </linearGradient>
              </defs>

              {/* 1. Rolling Grassy Hill at Bottom */}
              <g className="grassy-mound">
                <path
                  d="M -40 620 L -40 575 Q 480 470 1000 575 L 1000 620 Z"
                  fill="url(#company-grass-grad)"
                />
                <path
                  d="M 40 620 Q 480 505 920 620 Z"
                  fill="#cde9d3"
                  opacity="0.6"
                />

                <path d="M 270 565 C 265 540 273 525 280 515 C 283 535 278 550 276 565" fill="#a2d59e" opacity="0.85" />
                <path d="M 285 570 C 295 545 310 535 320 525 C 312 545 302 560 293 570" fill="#87c383" opacity="0.85" />
                <circle cx="282" cy="516" r="4.5" fill="#bce4b9" opacity="0.9" />

                <path d="M 360 550 C 355 525 365 512 372 500 C 375 520 370 535 368 550" fill="#98ce95" opacity="0.85" />
                <path d="M 378 555 C 390 530 405 525 415 515 C 405 535 395 548 385 555" fill="#87c383" opacity="0.85" />

                <path d="M 575 555 C 565 535 555 525 545 515 C 555 530 568 545 572 555" fill="#98ce95" opacity="0.85" />
                <path d="M 588 550 C 595 525 588 512 582 500 C 585 520 590 535 592 550" fill="#87c383" opacity="0.85" />

                <path d="M 665 570 C 655 545 645 535 635 525 C 648 540 658 555 662 570" fill="#a2d59e" opacity="0.85" />
                <path d="M 680 565 C 685 540 680 525 674 515 C 676 535 680 550 682 565" fill="#87c383" opacity="0.85" />
                <circle cx="676" cy="516" r="4.5" fill="#bce4b9" opacity="0.9" />
              </g>

              {/* 2. Realistic Tree Trunk & Roots */}
              <g className="tree-trunk-body">
                <path
                  d="M 405 570 C 435 540 452 485 458 420 C 462 385 465 375 468 360 C 476 360 484 360 492 360 C 495 375 498 385 502 420 C 508 485 525 540 555 570 Z"
                  fill="url(#company-oak-wood)"
                />
                <path d="M 445 560 C 462 495 468 435 470 365" fill="none" stroke="#5a422b" strokeWidth="2.5" opacity="0.5" />
                <path d="M 515 560 C 498 495 492 435 490 365" fill="none" stroke="#bfaa95" strokeWidth="2.5" opacity="0.6" />
                <path d="M 480 565 C 480 490 480 430 480 365" fill="none" stroke="#685038" strokeWidth="1.8" opacity="0.4" />
              </g>

              {/* 3. Five Organic Botanical Limbs */}
              <g className="tree-limbs">
                <path d="M 480 360 C 480 300 480 250 480 205" fill="none" stroke="#8f755a" strokeWidth="8.5" strokeLinecap="round" />
                <path d="M 470 360 C 400 330 350 290 310 250" fill="none" stroke="#8f755a" strokeWidth="7.5" strokeLinecap="round" />
                <path d="M 490 360 C 560 330 600 295 635 265" fill="none" stroke="#8f755a" strokeWidth="7.5" strokeLinecap="round" />
                <path d="M 460 425 C 380 420 335 423 290 425" fill="none" stroke="#8f755a" strokeWidth="6.5" strokeLinecap="round" />
                <path d="M 500 425 C 570 420 605 425 635 430" fill="none" stroke="#8f755a" strokeWidth="6.5" strokeLinecap="round" />
              </g>

              {/* 4. Botanical Leaves Sprouting Naturally on Limbs (Soft Light Green Theme) */}
              <g className="foliage-leaves" stroke="#79b375" strokeWidth="0.5" strokeOpacity="0.4">
                <ellipse cx="465" cy="180" rx="15" ry="7" transform="rotate(-40 465 180)" fill="url(#company-leaf-1)" />
                <ellipse cx="495" cy="180" rx="15" ry="7" transform="rotate(40 495 180)" fill="url(#company-leaf-2)" />
                <ellipse cx="450" cy="270" rx="16" ry="7.5" transform="rotate(-30 450 270)" fill="url(#company-leaf-light)" />
                <ellipse cx="510" cy="270" rx="16" ry="7.5" transform="rotate(30 510 270)" fill="url(#company-leaf-2)" />

                <ellipse cx="370" cy="300" rx="16" ry="7.5" transform="rotate(-45 370 300)" fill="url(#company-leaf-2)" />
                <ellipse cx="395" cy="285" rx="14" ry="7" transform="rotate(-20 395 285)" fill="url(#company-leaf-light)" />
                <ellipse cx="410" cy="330" rx="15" ry="7" transform="rotate(-70 410 330)" fill="url(#company-leaf-1)" />

                <ellipse cx="550" cy="330" rx="16" ry="7.5" transform="rotate(45 550 330)" fill="url(#company-leaf-1)" />
                <ellipse cx="590" cy="300" rx="16" ry="7.5" transform="rotate(25 590 300)" fill="url(#company-leaf-2)" />
                <ellipse cx="570" cy="285" rx="14" ry="7" transform="rotate(60 570 285)" fill="url(#company-leaf-light)" />

                <ellipse cx="350" cy="438" rx="16" ry="7.5" transform="rotate(-15 350 438)" fill="url(#company-leaf-2)" />
                <ellipse cx="390" cy="445" rx="14" ry="7" transform="rotate(35 390 445)" fill="url(#company-leaf-light)" />
                <ellipse cx="415" cy="415" rx="15" ry="7" transform="rotate(-30 415 415)" fill="url(#company-leaf-1)" />

                <ellipse cx="540" cy="442" rx="16" ry="7.5" transform="rotate(25 540 442)" fill="url(#company-leaf-1)" />
                <ellipse cx="570" cy="448" rx="14" ry="7" transform="rotate(-25 570 448)" fill="url(#company-leaf-2)" />
                <ellipse cx="595" cy="425" rx="15" ry="7" transform="rotate(30 595 425)" fill="url(#company-leaf-light)" />
              </g>

              {/* 5. Radiating Fine Twig Connectors to Sub-Skills (Revealed in Image 2) */}
              <g className="sub-branches-connecting-lines">
                {COMPANY_BRANCH_CATEGORIES.map((cat) => {
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
                        ? "#52b788"
                        : sub.state === "priority"
                        ? "#f59e0b"
                        : "#94a3b8"

                    const midX = (cat.x + sub.x) / 2
                    const midY = (cat.y + sub.y) / 2 - 8

                    return (
                      <g key={`company-twig-${sub.id}`} className="transition-opacity duration-300">
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
            {COMPANY_BRANCH_CATEGORIES.map((cat) => {
              const isExpanded = isNodeExpanded(cat.id)
              const leftPct = `${(cat.x / 960) * 100}%`
              const topPct = `${(cat.y / 620) * 100}%`

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
                      ? "border-[#52b788] ring-4 ring-[#52b788]/20 shadow-md"
                      : "border-slate-200/90 hover:border-[#52b788]"
                  }`}
                  aria-label={`${cat.label} category pill`}
                >
                  <span className="w-7 h-7 rounded-full bg-[#52b788] flex items-center justify-center text-white flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                    {renderIcon(cat.icon)}
                  </span>

                  <div className="text-left flex flex-col justify-center">
                    <span className="text-xs font-bold text-slate-900 tracking-tight leading-tight whitespace-nowrap font-sans">
                      {cat.label}
                    </span>
                    {isExpanded && (
                      <span className="text-[11px] font-mono text-slate-500 leading-none mt-0.5 font-medium">
                        {cat.weight}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}

            {/* ========================================================
                7. REVEALED SUB-SKILL CAPSULES (Image 2)
                ======================================================== */}
            {COMPANY_BRANCH_CATEGORIES.flatMap((cat) => {
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
                        ? "border-[#a7ddbf] text-slate-800"
                        : sub.state === "priority"
                        ? "border-amber-300 text-slate-800"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        sub.state === "lit"
                          ? "bg-[#52b788]"
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
            <div className="absolute left-1/2 bottom-5 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-[#a7ddbf] shadow-2xs text-xs font-semibold text-[#1b4933] flex items-center gap-2 whitespace-nowrap z-20 select-none">
              <span>Workforce Foundation · Verified Internal Baseline (Backend Services, SQL, Core APIs)</span>
            </div>
          </div>

          {/* ========================================================
              BOTTOM LEGEND BAR (Shown in Image 2 / Expanded State)
              ======================================================== */}
          {isAnyExpanded ? (
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs text-slate-600 mt-1">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#52b788]" />
                  <span className="text-[11px] font-medium text-slate-700">In-House Verified (5)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="text-[11px] font-medium text-slate-700">Upskill Priority Gaps (14)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]" />
                  <span className="text-[11px] font-medium text-slate-700">Baseline Requirements (7)</span>
                </span>
              </div>

              <span className="text-[11px] text-slate-500 font-sans">
                Click any capability node to inspect workforce bench depth.
              </span>
            </div>
          ) : (
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px]">Click any node on the tree to reveal its workforce capability branches</span>
            </div>
          )}
        </div>

        {/* ========================================================
            RIGHT COLUMN: THE 3 FIGMA METRIC CARDS
            ======================================================== */}
        <div className="flex flex-col gap-4">
          {/* --------------------------------------------------------
              CARD 1: Top Capability Gaps (Equivalent to Top Skills)
              -------------------------------------------------------- */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Top Capability Gaps
              </h3>
              <span className="text-slate-400 text-xs cursor-pointer hover:text-slate-600" title="Ranked by build feasibility vs external hiring premium">
                ⓘ
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Strategic skills ranked by build feasibility vs. external hiring cost for AI Architect.
            </p>

            <div className="flex flex-col gap-2.5">
              {/* Item 01: LLM Orchestration & Agents */}
              <div
                onClick={() => {
                  setExpandedNodes((prev) => new Set(prev).add("ai"))
                  setSelectedSkill("agents")
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">01</span>
                    <strong className="text-xs font-bold text-slate-900 group-hover:text-amber-950 font-sans">
                      Agentic Workflows
                    </strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                      +85% ROI
                    </span>
                    <span className="text-slate-400 text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 pl-6">
                  Bench Depth: 12% · High external hire premium
                </div>
              </div>

              {/* Item 02: MLOps & GPU Clusters */}
              <div
                onClick={() => {
                  setExpandedNodes((prev) => new Set(prev).add("mlops"))
                  setSelectedSkill("gpu-k8s")
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">02</span>
                    <strong className="text-xs font-bold text-slate-900 group-hover:text-amber-950 font-sans">
                      Kubernetes GPU Clusters
                    </strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                      +68% ROI
                    </span>
                    <span className="text-slate-400 text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 pl-6">
                  Bench Depth: 24% · Internal upskill recommended
                </div>
              </div>

              {/* Item 03: Vector Databases */}
              <div
                onClick={() => {
                  setExpandedNodes((prev) => new Set(prev).add("data"))
                  setSelectedSkill("vector-db")
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">03</span>
                    <strong className="text-xs font-bold text-slate-900 group-hover:text-amber-950 font-sans">
                      Vector Databases & RAG
                    </strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                      +55% ROI
                    </span>
                    <span className="text-slate-400 text-xs group-hover:translate-x-0.5 transition-transform">›</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 pl-6">
                  Bench Depth: 30% · Fast internal mobility path
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------
              CARD 2: Projected Capability Spike
              -------------------------------------------------------- */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Projected Capability Spike
              </h3>
              <span className="text-slate-400 text-xs cursor-pointer hover:text-slate-600">
                ⓘ
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <strong className="text-3xl font-extrabold text-[#065f46] tracking-tight font-sans">
                ₹3.2 Cr
              </strong>
              <span className="text-xs font-semibold text-slate-600">Savings Target</span>
              <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]">
                +65%
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mt-2 font-sans">
              Upskilling the top 3 bench gaps internally saves ₹3.2 Cr in recruitment fees and accelerates time-to-delivery by 4 months.
            </p>
          </div>

          {/* --------------------------------------------------------
              CARD 3: Strategic Takeaway
              -------------------------------------------------------- */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-[#52b788]">
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
              LLM Orchestration is your highest internal ROI gap. Cross-training senior backend developers into this branch beats external hiring.
            </p>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("build-buy-simulator")
                if (el) el.scrollIntoView({ behavior: "smooth" })
              }}
              className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs font-semibold text-slate-800 hover:text-emerald-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Test Economics in Build vs Buy Simulator</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
