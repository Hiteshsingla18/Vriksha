import { useState, useMemo } from "react"
import { explorerFields } from "../../data/explorerData"
import { ExplorerField } from "../../types"

interface ForestViewProps {
  selectedField: ExplorerField
  onSelectField: (field: ExplorerField) => void
  onExploreField: (fieldName: string) => void
}

type VelocityFilter = "All" | "Thriving" | "Growing" | "Steady"

// ==========================================
// Embedded Tree Canopy SVG Renderer
// Realistic botanical tech tree with organic layers
// ==========================================
interface TreeSvgProps {
  name: string
  velocity: number
  status: string
  isSelected: boolean
  onClick: () => void
}

function TechForestTree({
  name,
  velocity,
  status,
  isSelected,
  onClick,
}: TreeSvgProps) {
  // Determine canopy colors based on growth velocity and status
  const isThriving = velocity >= 90
  const isEmerging = status === "Emerging"

  // Primary canopy colors
  const crownColor = isThriving
    ? "#b7db43" // Vibrant Lime
    : isEmerging
      ? "#e6b042" // Warm Amber Gold
      : status === "Growing"
        ? "#48b284" // Lush Emerald
        : "#6fa894" // Soft Sage

  const midColor = isThriving
    ? "#388358"
    : isEmerging
      ? "#a06f23"
      : status === "Growing"
        ? "#2b6d50"
        : "#3f6d5e"

  const baseColor = isThriving
    ? "#194a34"
    : isEmerging
      ? "#613f12"
      : "#163a2b"

  // Trunk height scales with velocity (between 38px and 72px)
  const trunkHeight = Math.round(34 + (velocity / 100) * 36)
  const canopyScale = 0.85 + (velocity / 100) * 0.35

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center justify-end relative h-full py-2 px-1 focus:outline-none cursor-pointer transition-transform duration-300 ${
        isSelected ? "scale-105 z-20" : "hover:scale-102 hover:brightness-110 z-10"
      }`}
      aria-label={`Select ${name} canopy`}
    >
      {/* Selection Glow Halo on Forest Floor */}
      {isSelected && (
        <div className="absolute bottom-6 w-14 h-4 bg-[#b7db43]/30 rounded-full blur-md pointer-events-none" />
      )}

      {/* Floating Velocity Tag */}
      <div
        className={`mb-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${
          isSelected
            ? "bg-[#b7db43] text-[#0a1e17] shadow-xs"
            : "bg-[#081711]/80 text-gray-300 border border-[#20503d]/60 group-hover:text-white"
        }`}
      >
        {velocity}%
      </div>

      {/* Botanical Tree SVG */}
      <svg
        width="84"
        height="140"
        viewBox="0 0 84 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        style={{ transform: `scale(${canopyScale})`, transformOrigin: "bottom center" }}
      >
        <defs>
          {/* Canopy Radial Gradient */}
          <radialGradient id={`canopy-glow-${name.replace(/\s+/g, "")}`} cx="42" cy="40" r="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={crownColor} />
            <stop offset="65%" stopColor={midColor} />
            <stop offset="100%" stopColor={baseColor} />
          </radialGradient>

          {/* Trunk Gradient */}
          <linearGradient id={`trunk-grad-${name.replace(/\s+/g, "")}`} x1="39" y1="65" x2="45" y2="135" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2a4538" />
            <stop offset="50%" stopColor="#1e342a" />
            <stop offset="100%" stopColor="#13231c" />
          </linearGradient>

          {/* Leaf Highlight Glow */}
          <filter id={`leaf-glow-${name.replace(/\s+/g, "")}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Tree Trunk & Roots --- */}
        <g id="trunk">
          {/* Root flare at base */}
          <path
            d={`M 36 ${135} Q 42 ${132} 48 ${135} L 45 ${135 - trunkHeight} L 39 ${135 - trunkHeight} Z`}
            fill={`url(#trunk-grad-${name.replace(/\s+/g, "")})`}
          />
          {/* Bark texture line */}
          <line
            x1="42"
            y1={135 - trunkHeight + 6}
            x2="42"
            y2="133"
            stroke="#3a5c4c"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>

        {/* --- Organic Layered Canopy Layers --- */}
        <g
          id="canopy"
          filter={isSelected ? `url(#leaf-glow-${name.replace(/\s+/g, "")})` : undefined}
        >
          {/* Bottom Canopy Tier (Deep Shadow Layer) */}
          <ellipse cx="42" cy="62" rx="34" ry="19" fill={baseColor} opacity="0.9" />

          {/* Mid Canopy Tier (Organic Overlapping Leaves) */}
          <ellipse cx="26" cy="52" rx="20" ry="16" fill={midColor} />
          <ellipse cx="58" cy="52" rx="20" ry="16" fill={midColor} />
          <ellipse cx="42" cy="46" rx="26" ry="20" fill={`url(#canopy-glow-${name.replace(/\s+/g, "")})`} />

          {/* Upper Crown (Lush Vibrant Leaves) */}
          <ellipse cx="32" cy="35" rx="17" ry="14" fill={crownColor} opacity="0.85" />
          <ellipse cx="52" cy="35" rx="17" ry="14" fill={crownColor} opacity="0.85" />
          <ellipse cx="42" cy="28" rx="19" ry="15" fill={crownColor} opacity="0.95" />

          {/* Peak Foliage Accent */}
          <circle cx="42" cy="20" r="10" fill={crownColor} />

          {/* Luminous Data Node Fruit / Signal Dot */}
          <circle
            cx="42"
            cy="36"
            r={isSelected ? "4" : "3"}
            fill={isThriving ? "#ffffff" : "#ffeaa7"}
            className={isSelected ? "animate-ping" : ""}
            opacity={isSelected ? "0.9" : "0.7"}
          />
          <circle
            cx="42"
            cy="36"
            r="2.5"
            fill={isThriving ? "#ffffff" : "#ffeaa7"}
          />
        </g>
      </svg>

      {/* Root Baseline Stone / Grass Base */}
      <div
        className={`w-6 h-1 rounded-full mb-1 transition-colors ${
          isSelected ? "bg-[#b7db43]" : "bg-[#1f4a38]"
        }`}
      />

      {/* Domain Label */}
      <span
        className={`text-[10px] text-center font-medium leading-tight max-w-[80px] line-clamp-2 transition-colors ${
          isSelected
            ? "text-[#b7db43] font-bold"
            : "text-gray-300 group-hover:text-white"
        }`}
      >
        {name.split("&")[0].trim()}
      </span>
      <span className="text-[8px] text-gray-500 font-mono mt-0.5">
        {status}
      </span>
    </button>
  )
}

// ==========================================
// Embedded Self-Contained SVG Icons
// Zero external file dependencies
// ==========================================
function TreePineIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 2L4 12h5l-3 6h12l-3-6h5L12 2zM12 18v4"
      />
    </svg>
  )
}

function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function SparklesIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.286L13 21l-2.286-6.857L5 12l5.714-2.286L13 3z"
      />
    </svg>
  )
}

function CheckIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

// ==========================================
// Main ForestView Component
// ==========================================
export default function ForestView({
  selectedField,
  onSelectField,
  onExploreField,
}: ForestViewProps) {
  const [velocityFilter, setVelocityFilter] = useState<VelocityFilter>("All")

  // Counts for velocity tiers
  const counts = useMemo(
    () => ({
      All: explorerFields.length,
      Thriving: explorerFields.filter((f) => f.height >= 90).length,
      Growing: explorerFields.filter((f) => f.height >= 85 && f.height < 90).length,
      Steady: explorerFields.filter((f) => f.height < 85).length,
    }),
    []
  )

  // Filtered fields based on velocity tier
  const filteredFields = useMemo(() => {
    if (velocityFilter === "All") return explorerFields
    if (velocityFilter === "Thriving") return explorerFields.filter((f) => f.height >= 90)
    if (velocityFilter === "Growing")
      return explorerFields.filter((f) => f.height >= 85 && f.height < 90)
    if (velocityFilter === "Steady") return explorerFields.filter((f) => f.height < 85)
    return explorerFields
  }, [velocityFilter])

  const handleFilterChange = (filter: VelocityFilter) => {
    setVelocityFilter(filter)
    const matching =
      filter === "All"
        ? explorerFields
        : filter === "Thriving"
          ? explorerFields.filter((f) => f.height >= 90)
          : filter === "Growing"
            ? explorerFields.filter((f) => f.height >= 85 && f.height < 90)
            : explorerFields.filter((f) => f.height < 85)

    if (matching.length > 0 && !matching.some((f) => f.name === selectedField.name)) {
      onSelectField(matching[0])
    }
  }

  return (
    <section
      className="explorer-feature-section bg-transparent"
      id="forest-view"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="explorer-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#20503d] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#20503d] inline-block" />
            06 · Start wide
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Forest View
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Before anchoring onto a single role, inspect canopy height and growth velocity across the whole technology forest.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#eaf4f1] text-[#20503d] border border-[#a9cec4]">
          <TreePineIcon className="w-3.5 h-3.5 text-[#20503d]" />
          Lush Technology Ecosystem · {filteredFields.length} Domains
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Main 2-Column Forest Visualizer Layout                 */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* -------------------------------------------------------- */}
        {/* Left Column: Digital Tech Forest Ecosystem (7 cols)      */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#0a1e17] via-[#102b22] to-[#081711] border border-[#20503d]/70 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Canopy Mist Glows */}
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#b7db43]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -left-16 w-48 h-48 bg-[#20503d]/30 rounded-full blur-2xl pointer-events-none" />

          {/* Top Forest Toolbar: Velocity Filters */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-[#20503d]/50">
            <div className="flex items-center gap-1.5">
              {(["All", "Thriving", "Growing", "Steady"] as VelocityFilter[]).map((tab) => {
                const isActive = velocityFilter === tab

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleFilterChange(tab)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#b7db43] text-[#0a1e17] font-bold shadow-xs"
                        : "bg-[#081711]/70 text-gray-300 hover:text-white hover:bg-[#163a2c]"
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`text-[9px] px-1 py-0.2 rounded-full ${
                        isActive ? "bg-[#0a1e17]/20 text-[#0a1e17]" : "bg-white/10 text-gray-400"
                      }`}
                    >
                      {counts[tab]}
                    </span>
                  </button>
                )
              })}
            </div>

            <span className="text-[10px] font-mono text-[#a3c9b7] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b7db43] animate-pulse" />
              Live Ecosystem Telemetry
            </span>
          </div>

          {/* Forest Canopy Sky & Horizon Gridlines */}
          <div className="relative z-10 my-4 flex-1 min-h-[300px] sm:min-h-[340px] flex flex-col justify-end">
            {/* Horizon Guideline Tiers */}
            <div className="absolute inset-x-0 top-6 pointer-events-none border-b border-dashed border-[#20503d]/40 flex justify-end">
              <span className="text-[9px] font-mono text-[#a3c9b7]/60 pr-2 pt-0.5">
                Frontier Canopy (95%+)
              </span>
            </div>
            <div className="absolute inset-x-0 top-20 pointer-events-none border-b border-dashed border-[#20503d]/30 flex justify-end">
              <span className="text-[9px] font-mono text-[#a3c9b7]/40 pr-2 pt-0.5">
                Growth Canopy (85–90%)
              </span>
            </div>
            <div className="absolute inset-x-0 top-36 pointer-events-none border-b border-dashed border-[#20503d]/20 flex justify-end">
              <span className="text-[9px] font-mono text-[#a3c9b7]/30 pr-2 pt-0.5">
                Foundation Canopy (75–80%)
              </span>
            </div>

            {/* Tree Canopies Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 items-end justify-items-center w-full pb-3">
              {filteredFields.map((field) => (
                <TechForestTree
                  key={field.name}
                  name={field.name}
                  velocity={field.height}
                  status={field.status}
                  isSelected={selectedField.name === field.name}
                  onClick={() => onSelectField(field)}
                />
              ))}
            </div>

            {/* Mossy Forest Ground Plane */}
            <div className="w-full h-3 rounded-full bg-gradient-to-r from-[#173d30] via-[#2a6d54] to-[#173d30] shadow-inner relative">
              <div className="absolute inset-x-0 -top-1 h-[1px] bg-[#b7db43]/40" />
            </div>
          </div>

          {/* Bottom Forest Legend */}
          <div className="relative z-10 pt-3 border-t border-[#20503d]/50 flex items-center justify-between text-[10px] text-[#a3c9b7] flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b7db43]" />
                <span>Thriving (&gt;90% Vel)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#48b284]" />
                <span>Steady (80–90%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e6b042]" />
                <span>Emerging Frontier</span>
              </div>
            </div>
            <span className="font-mono text-gray-400">
              Click canopy to inspect domain
            </span>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* Right Column: High-Contrast Domain Perspective (5 cols)  */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-5">
          <div>
            {/* Header info */}
            <div className="flex items-center justify-between pb-3.5 border-b border-gray-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#20503d] flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5 text-[#20503d]" />
                Domain Perspective
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  selectedField.height >= 90
                    ? "bg-[#eaf4f1] text-[#20503d] border-[#a9cec4]"
                    : "bg-blue-50 text-blue-800 border-blue-200"
                }`}
              >
                {selectedField.status} Velocity · {selectedField.height}%
              </span>
            </div>

            {/* Title & Overview */}
            <div className="mt-3.5">
              <h3 className="text-xl sm:text-2xl font-serif text-gray-950 font-bold tracking-tight">
                {selectedField.name}
              </h3>
              <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                {selectedField.overview}
              </p>
            </div>

            {/* Example Market Roles */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Example Market Roles:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedField.roles.map((role) => (
                  <span
                    key={role}
                    className="px-2.5 py-1 rounded-full bg-[#f7fbf9] text-[#194a34] border border-[#b8decb] text-[11px] font-semibold"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Foundation Skills */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Key Foundation Skills:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedField.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200 text-[11px] font-medium flex items-center gap-1"
                  >
                    <CheckIcon className="w-2.5 h-2.5 text-[#20503d]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Adjacent Career Pathways */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                Adjacent Career Pathways:
              </span>
              <div className="text-xs text-gray-600 flex flex-wrap gap-1 items-center">
                {selectedField.related.map((rel, idx) => (
                  <span key={rel} className="inline-flex items-center">
                    <span className="hover:text-gray-950 font-medium">{rel}</span>
                    {idx < selectedField.related.length - 1 && (
                      <span className="mx-1.5 text-gray-300">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button: Explore in Career Rooms */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onExploreField(selectedField.name)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-gray-950 text-white hover:bg-gray-800 shadow-2xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore {selectedField.name} in Career Rooms</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-2 m-0">
              Direct access to interactive simulation rooms and task briefs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
