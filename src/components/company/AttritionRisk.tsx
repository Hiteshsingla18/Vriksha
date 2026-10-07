import { useState } from "react"
import { attritionProfiles } from "../../data/companyData"

// ==========================================
// Embedded SVG Icons
// Zero external file dependencies
// ==========================================
function ShieldAlertIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  )
}

function CheckIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ArrowRightIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function HeartHandshakeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  )
}

// ==========================================
// Main AttritionRisk Component
// ==========================================
export default function AttritionRisk() {
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0)
  const [selectedDimension, setSelectedDimension] = useState(0)
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({})

  const currentProfile = attritionProfiles[selectedProfileIndex] || attritionProfiles[0]

  const dimensions = [
    { label: "Skill Relevance", value: currentProfile.relevance, signal: currentProfile.signals[0] },
    { label: "Growth Trajectory", value: currentProfile.growth, signal: currentProfile.signals[1] },
    { label: "Internal Mobility", value: currentProfile.mobility, signal: currentProfile.signals[2] },
  ]

  const handleActionToggle = (actionKey: string) => {
    setCompletedActions((prev) => ({
      ...prev,
      [actionKey]: !prev[actionKey],
    }))
  }

  const getSignalBadgeColor = (signal: string) => {
    if (signal.includes("Attention")) return "bg-amber-50 text-amber-800 border-amber-200"
    if (signal.includes("Monitor")) return "bg-blue-50 text-blue-800 border-blue-200"
    return "bg-emerald-50 text-emerald-800 border-emerald-200"
  }

  return (
    <section
      className="company-feature-section bg-transparent"
      id="attrition-aware-planning"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="company-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#8b5e3c] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8b5e3c] inline-block" />
            04 · Intervene before capability leaves
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Attrition-Aware Planning
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Detect early warning signals of capability stagnation and disengagement to intervene constructively before resignations occur.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#f7f2ed] text-[#8b5e3c] border border-[#d6c4b2]">
          <ShieldAlertIcon className="w-3.5 h-3.5 text-[#8b5e3c]" />
          Retention Early Warning Signal
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Main 3-Column Workspace                               */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* -------------------------------------------------------- */}
        {/* Left Column: Workforce Risk Profiles (3.5 cols)          */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1 mb-0.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
              Monitored Cohorts ({attritionProfiles.length})
            </span>
            <span className="text-[10px] font-mono text-gray-400">
              Flight Risk Telemetry
            </span>
          </div>

          {attritionProfiles.map((profile, index) => {
            const isSelected = selectedProfileIndex === index

            return (
              <button
                key={profile.name}
                type="button"
                onClick={() => {
                  setSelectedProfileIndex(index)
                  setSelectedDimension(0)
                }}
                className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? "bg-white border-[#8b5e3c] shadow-sm ring-1 ring-[#8b5e3c]"
                    : "bg-[#fcfbf9] border-gray-200 hover:bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? "bg-[#8b5e3c] text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    R{index + 1}
                  </div>

                  <div className="min-w-0">
                    <strong className="text-xs sm:text-sm font-bold text-gray-950 truncate block">
                      {profile.team}
                    </strong>
                    <span className="text-[11px] text-gray-500 truncate block mt-0.5">
                      {profile.name}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${getSignalBadgeColor(
                    profile.signal
                  )}`}
                >
                  {profile.signal}
                </span>
              </button>
            )
          })}
        </div>

        {/* -------------------------------------------------------- */}
        {/* Middle Column: Interactive Signal Dimensions (5 cols)    */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b5e3c] block">
                  Cohort Diagnosis
                </span>
                <h3 className="text-lg font-serif text-gray-950 font-bold mt-0.5">
                  {currentProfile.team}
                </h3>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getSignalBadgeColor(
                  currentProfile.signal
                )}`}
              >
                {currentProfile.signal}
              </span>
            </div>

            {/* Clickable 3 Dimensions */}
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-2">
              Select Dimension to Inspect:
            </span>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {dimensions.map((dim, idx) => {
                const isActive = selectedDimension === idx

                return (
                  <button
                    key={dim.label}
                    type="button"
                    onClick={() => setSelectedDimension(idx)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#f7f2ed] border-[#8b5e3c] text-gray-950 shadow-2xs"
                        : "bg-[#fcfbf9] border-gray-200 text-gray-600 hover:bg-white"
                    }`}
                  >
                    <span className="text-[9px] uppercase font-bold text-gray-400 block truncate">
                      {dim.label}
                    </span>
                    <strong className="text-xs font-bold text-gray-950 block mt-1">
                      {dim.value}
                    </strong>
                    <div
                      className={`w-full h-1 rounded-full mt-2 ${
                        isActive ? "bg-[#8b5e3c]" : "bg-gray-200"
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            {/* Detailed Active Signal Box */}
            <div className="p-3.5 rounded-xl bg-[#fcfbf9] border border-gray-200 mb-4">
              <span className="text-[10px] uppercase font-bold text-[#8b5e3c] block mb-1">
                Active Telemetry Driver:
              </span>
              <p className="text-xs text-gray-900 font-medium leading-relaxed m-0">
                {dimensions[selectedDimension].signal}
              </p>
            </div>

            {/* Actionable Interventions */}
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-2">
                Recommended Manager Interventions:
              </span>
              <div className="space-y-1.5">
                {currentProfile.actions.map((act, index) => {
                  const key = `${currentProfile.name}-${act}`
                  const isScheduled = !!completedActions[key]

                  return (
                    <button
                      key={act}
                      type="button"
                      onClick={() => handleActionToggle(key)}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isScheduled
                          ? "bg-[#eaf4f1] border-[#a9cec4] text-[#1f5b50]"
                          : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-mono text-gray-500">
                          0{index + 1}
                        </span>
                        <span className="font-medium">{act}</span>
                      </div>

                      {isScheduled ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-[#1f5b50]">
                          <CheckIcon className="w-3.5 h-3.5" />
                          Initiated
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400 flex items-center gap-1">
                          Schedule <ArrowRightIcon className="w-3 h-3" />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="pt-2 text-[10px] text-gray-400">
            Proactive conversations within 30 days resolve 82% of flight risk indicators.
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* Right Column: Ethical Guardrail & Playbook (3.5 cols)    */}
        {/* -------------------------------------------------------- */}
        <div className="lg:col-span-3 bg-[#fcfbf9] border border-gray-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#8b5e3c] mb-3">
              <HeartHandshakeIcon className="w-5 h-5" />
            </div>

            <h4 className="text-sm font-serif font-bold text-gray-950 mb-1 leading-snug">
              Constructive Dialogue Guardrail
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Use telemetry to initiate supportive development conversations, not to label individuals or predict resignation.
            </p>

            <div className="mt-4 pt-3 border-t border-gray-200 space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-white border border-gray-200">
                <strong className="text-[11px] text-gray-900 block font-bold">
                  Rule 1: Focus on Scope
                </strong>
                <span className="text-[10px] text-gray-500">
                  Assess if projects are stagnating rather than evaluating intent.
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-gray-200">
                <strong className="text-[11px] text-gray-900 block font-bold">
                  Rule 2: Open Mobility
                </strong>
                <span className="text-[10px] text-gray-500">
                  Offer adjacent lateral pathways before external search begins.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-lg bg-white border border-gray-200 text-center">
            <span className="text-[10px] font-bold text-[#8b5e3c] uppercase tracking-wider block">
              Workforce Strategy Engine
            </span>
            <span className="text-[10px] text-gray-400 block mt-0.5">
              Confidential Talent Intelligence
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
