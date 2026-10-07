import { useState } from "react"

interface SkillTreeOverlayProps {
  targetRole?: string
}

export type SkillState = "lit" | "priority" | "steady"

export interface SubSkill {
  id: string
  name: string
  state: SkillState
  roi?: string
  prevalence?: string
  evidenceNote?: string
  x: number
  y: number
}

export interface BranchCategory {
  id: string
  label: string
  weight: string
  icon: "math" | "story" | "ai" | "code" | "infra"
  x: number
  y: number
  subSkills: SubSkill[]
}

const BRANCH_CATEGORIES: BranchCategory[] = [
  {
    id: "math",
    label: "Mathematics",
    weight: "28%",
    icon: "math",
    x: 310,
    y: 250,
    subSkills: [
      { id: "lin-alg", name: "Linear Algebra", state: "priority", roi: "+55% ROI", prevalence: "78%", evidenceNote: "Missing evidence", x: 215, y: 185 },
      { id: "ab-test", name: "A/B Testing", state: "priority", roi: "+68% ROI", prevalence: "82%", evidenceNote: "Missing evidence", x: 310, y: 175 },
      { id: "prob", name: "Probability", state: "priority", roi: "+48% ROI", prevalence: "75%", evidenceNote: "Missing evidence", x: 375, y: 210 },
      { id: "time-series", name: "Time Series", state: "priority", roi: "+44% ROI", prevalence: "68%", evidenceNote: "Missing evidence", x: 205, y: 255 },
      { id: "stats", name: "Statistics", state: "steady", roi: "+18% ROI", prevalence: "90%", evidenceNote: "Foundational", x: 230, y: 330 },
      { id: "pca", name: "PCA", state: "steady", roi: "+35% ROI", prevalence: "55%", evidenceNote: "Foundational", x: 280, y: 365 },
    ],
  },
  {
    id: "story",
    label: "Data Storytelling",
    weight: "18%",
    icon: "story",
    x: 290,
    y: 425,
    subSkills: [
      { id: "exec-story", name: "Data Storytelling", state: "priority", roi: "+85% ROI", prevalence: "80%", evidenceNote: "Missing evidence", x: 320, y: 355 },
      { id: "tableau", name: "Tableau", state: "lit", roi: "Verified", prevalence: "85%", evidenceNote: "Verified in project", x: 205, y: 390 },
      { id: "kpi", name: "KPI Design", state: "priority", roi: "+52% ROI", prevalence: "76%", evidenceNote: "Missing evidence", x: 375, y: 410 },
      { id: "plotly", name: "Plotly", state: "priority", roi: "+42% ROI", prevalence: "60%", evidenceNote: "Missing evidence", x: 200, y: 460 },
      { id: "excel", name: "Excel", state: "steady", roi: "Verified", prevalence: "95%", evidenceNote: "Foundational", x: 265, y: 515 },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    weight: "17%",
    icon: "ai",
    x: 480,
    y: 205,
    subSkills: [
      { id: "pytorch", name: "PyTorch", state: "priority", roi: "+62% ROI", prevalence: "84%", evidenceNote: "Missing evidence", x: 395, y: 145 },
      { id: "transformers", name: "Transformers", state: "priority", roi: "+74% ROI", prevalence: "79%", evidenceNote: "Missing evidence", x: 480, y: 120 },
      { id: "ml", name: "Machine Learning", state: "lit", roi: "Verified", prevalence: "88%", evidenceNote: "Verified in project", x: 575, y: 145 },
    ],
  },
  {
    id: "code",
    label: "Coding",
    weight: "22%",
    icon: "code",
    x: 635,
    y: 265,
    subSkills: [
      { id: "sys-design", name: "System Design", state: "priority", roi: "+46% ROI", prevalence: "70%", evidenceNote: "Missing evidence", x: 565, y: 230 },
      { id: "sql", name: "SQL", state: "lit", roi: "Verified", prevalence: "91%", evidenceNote: "Verified in project", x: 595, y: 180 },
      { id: "python", name: "Python", state: "lit", roi: "Verified", prevalence: "94%", evidenceNote: "Verified in project", x: 695, y: 195 },
      { id: "algo", name: "Algorithms", state: "priority", roi: "+42% ROI", prevalence: "74%", evidenceNote: "Missing evidence", x: 705, y: 265 },
      { id: "git", name: "Git", state: "lit", roi: "Verified", prevalence: "80%", evidenceNote: "Verified in project", x: 595, y: 335 },
      { id: "bash", name: "Bash", state: "steady", roi: "+22% ROI", prevalence: "65%", evidenceNote: "Foundational", x: 675, y: 335 },
    ],
  },
  {
    id: "infra",
    label: "Infrastructure",
    weight: "8%",
    icon: "infra",
    x: 635,
    y: 430,
    subSkills: [
      { id: "bigquery", name: "BigQuery", state: "priority", roi: "+42% ROI", prevalence: "62%", evidenceNote: "Missing evidence", x: 615, y: 365 },
      { id: "pyspark", name: "PySpark", state: "priority", roi: "+45% ROI", prevalence: "65%", evidenceNote: "Missing evidence", x: 695, y: 380 },
      { id: "airflow", name: "Airflow", state: "steady", roi: "+36% ROI", prevalence: "54%", evidenceNote: "Foundational", x: 690, y: 480 },
      { id: "hadoop", name: "Hadoop", state: "steady", roi: "+8% ROI", prevalence: "30%", evidenceNote: "Legacy", x: 650, y: 525 },
    ],
  },
]

export default function SkillTreeOverlay({
  targetRole = "Machine Learning Engineer",
}: SkillTreeOverlayProps) {
  // Expanded nodes set: if empty, tree looks like Image 1. When nodes are added, they bloom like Image 2.
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [activeFilter, setActiveFilter] = useState<"all" | "lit" | "priority" | "steady">("all")
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)

  const isAnyExpanded = expandedNodes.size > 0
  const isAllExpanded = expandedNodes.size === BRANCH_CATEGORIES.length

  // Toggle single node expansion
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

  // Toggle all nodes (Image 1 vs Image 2)
  const toggleAll = () => {
    if (isAllExpanded || isAnyExpanded) {
      setExpandedNodes(new Set())
    } else {
      setExpandedNodes(new Set(BRANCH_CATEGORIES.map((c) => c.id)))
    }
  }

  // Check if a node's sub-skills should be rendered
  const isNodeExpanded = (nodeId: string) => expandedNodes.has(nodeId)

  // Node Icon renderer matching Figma design
  const renderIcon = (type: "math" | "story" | "ai" | "code" | "infra") => {
    switch (type) {
      case "math":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        )
      case "story":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        )
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
      case "code":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        )
      case "infra":
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        )
    }
  }

  // Calculate counts depending on whether tree is collapsed (Image 1) or expanded (Image 2)
  const allCount = isAnyExpanded ? 26 : 6
  const litCount = isAnyExpanded ? 5 : 1
  const priorityCount = isAnyExpanded ? 14 : 3
  const steadyCount = isAnyExpanded ? 7 : 2

  return (
    <section className="w-full relative" id="tree-overlay">
      {/* 2-Column Grid Layout matching the Figma screen */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
        {/* ========================================================
            LEFT COLUMN: THE BOTANICAL SKILL TREE CANVAS CARD
            ======================================================== */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
          {/* Card Header: LEARNING PATH + Role Title + Role Selector Dropdown */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block font-sans">
                LEARNING PATH
              </span>
              <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight mt-0.5 font-sans">
                {targetRole}
              </h2>
            </div>

            {/* Target Role Dropdown Capsule */}
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-xs font-semibold text-slate-800 flex items-center gap-2 cursor-pointer shadow-2xs transition-colors">
              <span className="w-5 h-5 rounded bg-[#10b981] flex items-center justify-center text-white text-[10px] shadow-2xs">
                💼
              </span>
              <span>{targetRole}</span>
              <span className="text-slate-400 text-xs font-mono ml-0.5">⌄</span>
            </div>
          </div>

          {/* Filter Pills Bar (All, Lit, Priority, Steady) */}
          <div className="flex items-center gap-2.5 my-3 flex-wrap">
            {/* All button */}
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

            {/* Lit pill */}
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
              <span>Lit ({litCount})</span>
            </button>

            {/* Priority pill */}
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
              <span>Priority ({priorityCount})</span>
            </button>

            {/* Steady pill */}
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
              <span>Steady ({steadyCount})</span>
            </button>
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
                <linearGradient id="natural-oak-wood" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#786047" />
                  <stop offset="30%" stopColor="#8f755a" />
                  <stop offset="65%" stopColor="#a58c70" />
                  <stop offset="100%" stopColor="#6b533b" />
                </linearGradient>

                {/* Soft Light Green Foliage Leaves Gradients (Gentle, Natural & Theme-Aligned) */}
                <linearGradient id="spring-leaf-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dcf0da" />
                  <stop offset="100%" stopColor="#98ce95" />
                </linearGradient>

                <linearGradient id="spring-leaf-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ceebcc" />
                  <stop offset="100%" stopColor="#87c383" />
                </linearGradient>

                <linearGradient id="spring-leaf-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e8f5e5" />
                  <stop offset="100%" stopColor="#aedaa9" />
                </linearGradient>

                <linearGradient id="grass-mound-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#edf8f0" />
                  <stop offset="100%" stopColor="#d8eedd" />
                </linearGradient>
              </defs>

              {/* 1. Rolling Grassy Hill at Bottom */}
              <g className="grassy-mound">
                {/* Main curved hill */}
                <path
                  d="M -40 620 L -40 575 Q 480 470 1000 575 L 1000 620 Z"
                  fill="url(#grass-mound-grad)"
                />
                {/* Foreground layer */}
                <path
                  d="M 40 620 Q 480 505 920 620 Z"
                  fill="#cde9d3"
                  opacity="0.6"
                />

                {/* Sprouting Grass Blades and Foliage along the hill (Soft Light Green) */}
                {/* Left Cluster 1 */}
                <path d="M 270 565 C 265 540 273 525 280 515 C 283 535 278 550 276 565" fill="#a2d59e" opacity="0.85" />
                <path d="M 285 570 C 295 545 310 535 320 525 C 312 545 302 560 293 570" fill="#87c383" opacity="0.85" />
                <circle cx="282" cy="516" r="4.5" fill="#bce4b9" opacity="0.9" />

                {/* Left Cluster 2 */}
                <path d="M 360 550 C 355 525 365 512 372 500 C 375 520 370 535 368 550" fill="#98ce95" opacity="0.85" />
                <path d="M 378 555 C 390 530 405 525 415 515 C 405 535 395 548 385 555" fill="#87c383" opacity="0.85" />

                {/* Right Cluster 1 */}
                <path d="M 575 555 C 565 535 555 525 545 515 C 555 530 568 545 572 555" fill="#98ce95" opacity="0.85" />
                <path d="M 588 550 C 595 525 588 512 582 500 C 585 520 590 535 592 550" fill="#87c383" opacity="0.85" />

                {/* Right Cluster 2 */}
                <path d="M 665 570 C 655 545 645 535 635 525 C 648 540 658 555 662 570" fill="#a2d59e" opacity="0.85" />
                <path d="M 680 565 C 685 540 680 525 674 515 C 676 535 680 550 682 565" fill="#87c383" opacity="0.85" />
                <circle cx="676" cy="516" r="4.5" fill="#bce4b9" opacity="0.9" />
              </g>

              {/* 2. Realistic Tree Trunk & Roots */}
              <g className="tree-trunk-body">
                {/* Organic Trunk Contour */}
                <path
                  d="M 405 570 C 435 540 452 485 458 420 C 462 385 465 375 468 360 C 476 360 484 360 492 360 C 495 375 498 385 502 420 C 508 485 525 540 555 570 Z"
                  fill="url(#natural-oak-wood)"
                />
                {/* Wood Bark Contour Lines */}
                <path d="M 445 560 C 462 495 468 435 470 365" fill="none" stroke="#5a422b" strokeWidth="2.5" opacity="0.5" />
                <path d="M 515 560 C 498 495 492 435 490 365" fill="none" stroke="#bfaa95" strokeWidth="2.5" opacity="0.6" />
                <path d="M 480 565 C 480 490 480 430 480 365" fill="none" stroke="#685038" strokeWidth="1.8" opacity="0.4" />
              </g>

              {/* 3. Five Organic Botanical Limbs (Connecting to the 5 Core Nodes) */}
              <g className="tree-limbs">
                {/* Limb 1: Center Vertical to AI / ML (480, 205) */}
                <path
                  d="M 480 360 C 480 300 480 250 480 205"
                  fill="none"
                  stroke="#8f755a"
                  strokeWidth="8.5"
                  strokeLinecap="round"
                />

                {/* Limb 2: Upper Left to Mathematics (310, 250) */}
                <path
                  d="M 470 360 C 400 330 350 290 310 250"
                  fill="none"
                  stroke="#8f755a"
                  strokeWidth="7.5"
                  strokeLinecap="round"
                />

                {/* Limb 3: Upper Right to Coding (635, 265) */}
                <path
                  d="M 490 360 C 560 330 600 295 635 265"
                  fill="none"
                  stroke="#8f755a"
                  strokeWidth="7.5"
                  strokeLinecap="round"
                />

                {/* Limb 4: Lower Left to Data Storytelling (290, 425) */}
                <path
                  d="M 460 425 C 380 420 335 423 290 425"
                  fill="none"
                  stroke="#8f755a"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />

                {/* Limb 5: Lower Right to Infrastructure (635, 430) */}
                <path
                  d="M 500 425 C 570 420 605 425 635 430"
                  fill="none"
                  stroke="#8f755a"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                />
              </g>

              {/* 4. Botanical Leaves Sprouting Naturally on Limbs (Soft Light Green Theme) */}
              <g className="foliage-leaves" stroke="#79b375" strokeWidth="0.5" strokeOpacity="0.4">
                {/* Leaves near AI/ML Branch */}
                <ellipse cx="465" cy="180" rx="15" ry="7" transform="rotate(-40 465 180)" fill="url(#spring-leaf-1)" />
                <ellipse cx="495" cy="180" rx="15" ry="7" transform="rotate(40 495 180)" fill="url(#spring-leaf-2)" />
                <ellipse cx="450" cy="270" rx="16" ry="7.5" transform="rotate(-30 450 270)" fill="url(#spring-leaf-light)" />
                <ellipse cx="510" cy="270" rx="16" ry="7.5" transform="rotate(30 510 270)" fill="url(#spring-leaf-2)" />

                {/* Leaves near Math Branch */}
                <ellipse cx="370" cy="300" rx="16" ry="7.5" transform="rotate(-45 370 300)" fill="url(#spring-leaf-2)" />
                <ellipse cx="395" cy="285" rx="14" ry="7" transform="rotate(-20 395 285)" fill="url(#spring-leaf-light)" />
                <ellipse cx="410" cy="330" rx="15" ry="7" transform="rotate(-70 410 330)" fill="url(#spring-leaf-1)" />

                {/* Leaves near Coding Branch */}
                <ellipse cx="550" cy="330" rx="16" ry="7.5" transform="rotate(45 550 330)" fill="url(#spring-leaf-1)" />
                <ellipse cx="590" cy="300" rx="16" ry="7.5" transform="rotate(25 590 300)" fill="url(#spring-leaf-2)" />
                <ellipse cx="570" cy="285" rx="14" ry="7" transform="rotate(60 570 285)" fill="url(#spring-leaf-light)" />

                {/* Leaves near Data Storytelling Branch */}
                <ellipse cx="350" cy="438" rx="16" ry="7.5" transform="rotate(-15 350 438)" fill="url(#spring-leaf-2)" />
                <ellipse cx="390" cy="445" rx="14" ry="7" transform="rotate(35 390 445)" fill="url(#spring-leaf-light)" />
                <ellipse cx="415" cy="415" rx="15" ry="7" transform="rotate(-30 415 415)" fill="url(#spring-leaf-1)" />

                {/* Leaves near Infrastructure Branch */}
                <ellipse cx="540" cy="442" rx="16" ry="7.5" transform="rotate(25 540 442)" fill="url(#spring-leaf-1)" />
                <ellipse cx="570" cy="448" rx="14" ry="7" transform="rotate(-25 570 448)" fill="url(#spring-leaf-2)" />
                <ellipse cx="595" cy="425" rx="15" ry="7" transform="rotate(30 595 425)" fill="url(#spring-leaf-light)" />
              </g>

              {/* 5. Radiating Fine Twig Connectors to Sub-Skills (Revealed in Image 2) */}
              <g className="sub-branches-connecting-lines">
                {BRANCH_CATEGORIES.map((cat) => {
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

                    // Calculate a gentle arc from the category node to the sub-skill
                    const midX = (cat.x + sub.x) / 2
                    const midY = (cat.y + sub.y) / 2 - 8

                    return (
                      <g key={`twig-${sub.id}`} className="transition-opacity duration-300">
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
            {BRANCH_CATEGORIES.map((cat) => {
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
                      ? "border-emerald-500 ring-4 ring-emerald-500/20 shadow-md"
                      : "border-slate-200/90 hover:border-emerald-400"
                  }`}
                  aria-label={`${cat.label} category pill`}
                >
                  {/* Round Emerald Green Icon Badge */}
                  <span className="w-7 h-7 rounded-full bg-[#10b981] flex items-center justify-center text-white flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                    {renderIcon(cat.icon)}
                  </span>

                  {/* Label (and Weight in Image 2 / expanded state) */}
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
            {BRANCH_CATEGORIES.flatMap((cat) => {
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
              <span>Your Foundation · Verified Roots (Python, SQL, APIs)</span>
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
                  <span className="text-[11px] font-medium text-slate-700">Lit & Verified Skills (5)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="text-[11px] font-medium text-slate-700">Highest-ROI Gaps (14)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]" />
                  <span className="text-[11px] font-medium text-slate-700">Steady Requirements (7)</span>
                </span>
              </div>

              <span className="text-[11px] text-slate-500 font-sans">
                Click any skill to inspect its market trajectory.
              </span>
            </div>
          ) : (
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px]">Click any node on the tree to reveal its branches</span>
            </div>
          )}
        </div>

        {/* ========================================================
            RIGHT COLUMN: THE 3 FIGMA METRIC CARDS
            ======================================================== */}
        <div className="flex flex-col gap-4">
          {/* --------------------------------------------------------
              CARD 1: Top Skill Recommendations
              -------------------------------------------------------- */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Top Skill Recommendations
              </h3>
              <span className="text-slate-400 text-xs cursor-pointer hover:text-slate-600" title="Strategically ranked by salary correlation">
                ⓘ
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Skills strategically ranked by salary correlation and hiring velocity for Machine Learning Engineer.
            </p>

            <div className="flex flex-col gap-2.5">
              {/* Item 01: Data Storytelling */}
              <div
                onClick={() => {
                  setExpandedNodes((prev) => new Set(prev).add("story"))
                  setSelectedSkill("exec-story")
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">01</span>
                    <strong className="text-xs font-bold text-slate-900 group-hover:text-amber-950 font-sans">
                      Data Storytelling
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
                  Prevalence: 80% · Missing evidence
                </div>
              </div>

              {/* Item 02: A/B Testing */}
              <div
                onClick={() => {
                  setExpandedNodes((prev) => new Set(prev).add("math"))
                  setSelectedSkill("ab-test")
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">02</span>
                    <strong className="text-xs font-bold text-slate-900 group-hover:text-amber-950 font-sans">
                      A/B Testing
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
                  Prevalence: 82% · Missing evidence
                </div>
              </div>

              {/* Item 03: Linear Algebra */}
              <div
                onClick={() => {
                  setExpandedNodes((prev) => new Set(prev).add("math"))
                  setSelectedSkill("lin-alg")
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200/80 hover:border-amber-300 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-500">03</span>
                    <strong className="text-xs font-bold text-slate-900 group-hover:text-amber-950 font-sans">
                      Linear Algebra
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
                  Prevalence: 78% · Missing evidence
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------------
              CARD 2: Projected Compensation Spike
              -------------------------------------------------------- */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900 font-sans">
                Projected Compensation Spike
              </h3>
              <span className="text-slate-400 text-xs cursor-pointer hover:text-slate-600">
                ⓘ
              </span>
            </div>

            <div className="flex items-baseline gap-2 my-2">
              <strong className="text-3xl font-extrabold text-[#065f46] tracking-tight font-sans">
                ₹16.7
              </strong>
              <span className="text-xs font-semibold text-slate-600">LPA Target</span>
              <span className="ml-auto px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#dcfce7] text-[#166534] border border-[#bbf7d0]">
                +65%
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed mt-2 font-sans">
              Closing the top 3 until-leaves move your profile from baseline to the 75th percentile benchmark.
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

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Data Storytelling is your highest ROI gap to bridge the threshold into Machine Learning Engineer.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
