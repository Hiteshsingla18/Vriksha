import { useEffect, useState } from "react"
import Heading from "./Heading"
import Icon from "./Icon"

interface LivingSkillTreeProps {
  context: "builder" | "grower" | "company"
  targetRole: string
  currentSkills: string[]
  experienceYears?: number
  title?: string
  subtitle?: string
  cardLabel?: string
}

export default function LivingSkillTree({
  context,
  targetRole,
  currentSkills,
  experienceYears = 2.0,
  title = "Living Skill Tree",
  subtitle = "Your lit skills vs. the live tree for your target role.",
  cardLabel = "01 · See the exact gap",
}: LivingSkillTreeProps) {
  const [treeData, setTreeData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/builder/tree-overlay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        target_role: targetRole,
        user_skills: currentSkills,
        current_experience_years: experienceYears,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTreeData(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch tree overlay:", err)
        setLoading(false)
      })
  }, [targetRole, currentSkills.join(",")])

  const legendItems = [
    { tone: "verified", label: context === "company" ? "Workforce baseline" : "Verified / already strong" },
    { tone: "priority", label: "Highest-ranked gap" },
    { tone: "gap", label: "Relevant skill to develop" },
  ]

  let leavesToRender: any[] = []
  let gapsToRender: any[] = []

  if (treeData && treeData.branches) {
    const allLeaves = treeData.branches.flatMap((b: any) => b.leaves)
    leavesToRender = allLeaves.map((leaf: any) => ({
      skill: leaf.canonical_name || leaf.label,
      status: leaf.state === "lit" ? "verified" : leaf.state === "thriving_unlit" ? "priority" : "gap",
    }))

    const unlit = allLeaves.filter((l: any) => l.state === "thriving_unlit" || l.state === "steady")
    unlit.sort((a: any, b: any) => b.roi_hike_potential_pct - a.roi_hike_potential_pct)

    gapsToRender = unlit.slice(0, 3).map((l: any) => ({
      skill: l.canonical_name,
      gap: "Missing critical evidence",
      value: l.market_prevalence_pct,
      priority: l.state === "thriving_unlit",
    }))
  }

  return (
    <section className={`${context}-feature-section mt-8 mb-8`} id="living-skill-tree">
      <div className={`${context}-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4`}>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--sage-500)] font-semibold mb-2">
            {cardLabel}
          </div>
          <Heading level={2}>{title}</Heading>
          <p className="text-[var(--sage-400)] text-sm mt-1">{subtitle}</p>
        </div>
        <span className="px-3 py-1 bg-[var(--forest-900)] border border-[var(--forest-800)] rounded-full text-xs text-[var(--sage-400)]">
          {loading ? "Loading live data..." : "Live skill graph"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 relative flex flex-col justify-between p-6 rounded-2xl min-h-[500px] overflow-hidden bg-gradient-to-b from-[var(--forest-950)] to-[var(--forest-900)] border border-[var(--forest-800)]">
          <div className="z-10">
            <small className="text-[var(--sage-500)] text-[10px] tracking-wider uppercase font-semibold">
              Target Blueprint
            </small>
            <strong className="text-white text-xl font-serif block mt-1">{targetRole}</strong>
          </div>

          {/* Background branch curves */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            viewBox="0 0 700 460"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M350 415 C348 330 354 250 350 112" fill="none" stroke="var(--forest-700)" strokeWidth="6" />
            <path d="M350 315 C285 282 232 240 185 190" fill="none" stroke="var(--forest-700)" strokeWidth="5" />
            <path d="M350 265 C425 238 477 193 515 142" fill="none" stroke="var(--forest-700)" strokeWidth="5" />
            <path d="M350 214 C301 177 278 136 267 88" fill="none" stroke="var(--forest-700)" strokeWidth="4" />
            <path d="M350 358 C420 344 486 318 545 279" fill="none" stroke="var(--forest-700)" strokeWidth="5" />
          </svg>

          {/* Interactive tree leaf nodes */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 my-auto py-8">
            {leavesToRender.map((leaf, i) => {
              const isVerified = leaf.status === "verified" || leaf.status === "strong"
              const isPriority = leaf.status === "priority"

              return (
                <div
                  key={`${leaf.skill}-${i}`}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all text-xs font-medium cursor-pointer shadow-sm ${
                    isPriority
                      ? "bg-[var(--warm)] border-[#e8b77f] text-[var(--forest-950)] font-semibold shadow-[0_0_15px_rgba(197,140,83,0.3)]"
                      : isVerified
                      ? "bg-[var(--forest-800)] border-[var(--sage-500)] text-white hover:border-[var(--lime-500)]"
                      : "bg-[var(--forest-950)]/80 border-dashed border-[var(--sage-500)]/60 text-[var(--sage-300)]"
                  }`}
                  title={`${leaf.skill} · ${leaf.status}`}
                >
                  <Icon name={isVerified ? "check" : isPriority ? "target" : "branch"} size={14} />
                  <span className="truncate">{leaf.skill}</span>
                </div>
              )
            })}
          </div>

          <div className="z-10 text-center text-xs text-[var(--sage-500)] pt-4 border-t border-[var(--forest-800)]">
            {context === "company" ? "Current Workforce Baseline" : "Your Current Foundation"}
          </div>
        </div>

        <aside className="flex flex-col gap-4 bg-[#12160e] p-6 rounded-2xl border border-slate-800/80">
          <span className="text-[10px] tracking-wider uppercase text-emerald-500 font-bold mb-1">
            Gap Analysis
          </span>
          <Heading level={3}>Actionable Insights</Heading>

          <div className="flex flex-col gap-2 mb-4">
            {legendItems.map((item) => (
              <span key={item.tone} className="flex items-center gap-2 text-xs text-slate-300">
                <i
                  className={`w-3 h-3 rounded-sm ${
                    item.tone === "verified"
                      ? "bg-slate-700 border border-slate-500"
                      : item.tone === "priority"
                      ? "bg-amber-400 border border-amber-600 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                      : "bg-transparent border border-dashed border-slate-600"
                  }`}
                />
                {item.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {gapsToRender.map((item, index) => (
              <button
                type="button"
                key={item.skill}
                className={`flex items-start gap-3 p-3 text-left rounded-xl border transition-all ${
                  item.priority
                    ? "bg-amber-950/20 border-amber-500/50 hover:bg-amber-950/40"
                    : "bg-slate-900/40 border-slate-800 hover:bg-slate-900/80"
                }`}
              >
                <span className="text-[10px] font-mono text-slate-500 mt-0.5">0{index + 1}</span>
                <div className="flex-1">
                  <strong className="block text-sm text-slate-200 mb-0.5">{item.skill}</strong>
                  <small className="block text-xs text-slate-500">
                    {item.gap} · prevalence {item.value}%
                  </small>
                </div>
                <Icon name="chevron" size={14} />
              </button>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
            <div className="mt-0.5 text-emerald-400">
              <Icon name="spark" size={15} />
            </div>
            <span>
              <strong className="block text-slate-200 mb-1">Strategic Takeaway</strong>
              {gapsToRender.length > 0 ? gapsToRender[0].skill : "Model Evaluation"} is your highest ROI gap to cross the threshold into {targetRole}.
            </span>
          </div>
        </aside>
      </div>
    </section>
  )
}
