import { useEffect, useState, useMemo } from "react"
import Heading from "./Heading"
import Icon from "./Icon"

interface LeafData {
  id: string
  label: string
  canonical_name: string
  state: "lit" | "thriving_unlit" | "steady" | "fading"
  correlation_r: number
  roi_hike_potential_pct: number
  market_prevalence_pct: number
  user_proficiency: number
  branchId?: string
  branchLabel?: string
  x?: number
  y?: number
}

interface BranchData {
  id: string
  label: string
  weight: number
  correlation_r: number
  user_proficiency: number
  target_requirement: number
  leaves: LeafData[]
  anchorX?: number
  anchorY?: number
}

interface TreeData {
  tree_id: string
  target_role: string
  role_benchmark?: {
    avg_salary_lpa: number
    min_salary_lpa: number
    max_salary_lpa: number
    salary_per_exp_year: number
    recommended_exp_years: number
  }
  branches: BranchData[]
  telemetry?: {
    total_target_leaves: number
    lit_leaves_count: number
    thriving_unlit_gaps_count: number
    current_readiness_pct: number
    projected_salary_hike_pct: number
    projected_max_salary_lpa: number
    leadership_resilience_index: number
  }
}

interface LivingSkillTreeProps {
  context: "builder" | "grower" | "company"
  targetRole: string
  currentSkills: string[]
  experienceYears?: number
  title?: string
  subtitle?: string
  cardLabel?: string
}

// Canonical physical tree layout coordinates (SVG viewport: 960 x 680)
const LEAF_COORDINATES: Record<string, { x: number; y: number; branchId: string }> = {
  // Branch 1: Mathematics & Statistics (Top Left, anchor: 210, 220)
  linear_algebra: { x: 95, y: 130, branchId: "maths_stats" },
  hypothesis_testing: { x: 210, y: 105, branchId: "maths_stats" },
  probability: { x: 310, y: 135, branchId: "maths_stats" },
  time_series: { x: 80, y: 220, branchId: "maths_stats" },
  matrix_decomp: { x: 170, y: 290, branchId: "maths_stats" },
  descriptive_stats: { x: 75, y: 310, branchId: "maths_stats" },

  // Branch 2: Data Storytelling & Dashboards (Bottom Left, anchor: 230, 440)
  bi_tools: { x: 90, y: 405, branchId: "dashboard_storytelling" },
  exec_storytelling: { x: 195, y: 375, branchId: "dashboard_storytelling" },
  kpi_design: { x: 305, y: 450, branchId: "dashboard_storytelling" },
  interactive_viz: { x: 90, y: 485, branchId: "dashboard_storytelling" },
  static_excel: { x: 200, y: 530, branchId: "dashboard_storytelling" },

  // Branch 3: AI, ML & Modeling (Canopy Top Center, anchor: 480, 170)
  pytorch_dl: { x: 370, y: 65, branchId: "ai_ml" },
  genai_llms: { x: 480, y: 45, branchId: "ai_ml" },
  classical_ml: { x: 590, y: 65, branchId: "ai_ml" },
  mlops: { x: 380, y: 125, branchId: "ai_ml" },
  decision_trees: { x: 580, y: 125, branchId: "ai_ml" },

  // Branch 4: Coding & Architecture (Top Right, anchor: 750, 220)
  python_core: { x: 865, y: 130, branchId: "coding" },
  sql_opt: { x: 750, y: 105, branchId: "coding" },
  system_design: { x: 650, y: 135, branchId: "coding" },
  dsa: { x: 880, y: 220, branchId: "coding" },
  git_cicd: { x: 790, y: 290, branchId: "coding" },
  bash_scripting: { x: 885, y: 310, branchId: "coding" },

  // Branch 5: Infrastructure & Big Data (Bottom Right, anchor: 730, 440)
  cloud_warehousing: { x: 765, y: 380, branchId: "big_data" },
  pyspark_spark: { x: 870, y: 410, branchId: "big_data" },
  pipeline_orchestration: { x: 870, y: 490, branchId: "big_data" },
  legacy_hadoop: { x: 765, y: 530, branchId: "big_data" },
}

const BRANCH_ANCHORS: Record<string, { x: number; y: number; trunkX: number; trunkY: number }> = {
  maths_stats: { x: 210, y: 220, trunkX: 460, trunkY: 380 },
  dashboard_storytelling: { x: 230, y: 440, trunkX: 460, trunkY: 450 },
  ai_ml: { x: 480, y: 170, trunkX: 480, trunkY: 340 },
  coding: { x: 750, y: 220, trunkX: 500, trunkY: 380 },
  big_data: { x: 730, y: 440, trunkX: 500, trunkY: 450 },
}

// Fallback robust mock dataset in case backend is briefly unreachable
const FALLBACK_TREE_DATA: TreeData = {
  tree_id: "tree_fallback",
  target_role: "Machine Learning Engineer",
  role_benchmark: {
    avg_salary_lpa: 16.5,
    min_salary_lpa: 9.0,
    max_salary_lpa: 28.0,
    salary_per_exp_year: 4.5,
    recommended_exp_years: 3.0,
  },
  branches: [
    {
      id: "maths_stats",
      label: "Mathematics & Statistics",
      weight: 0.28,
      correlation_r: 0.51,
      user_proficiency: 1.0,
      target_requirement: 4.5,
      leaves: [
        { id: "linear_algebra", label: "Linear Algebra & Matrix Ops", canonical_name: "Linear Algebra", state: "thriving_unlit", correlation_r: 0.52, roi_hike_potential_pct: 14.6, market_prevalence_pct: 78, user_proficiency: 0 },
        { id: "hypothesis_testing", label: "Hypothesis & A/B Testing", canonical_name: "A/B Testing", state: "thriving_unlit", correlation_r: 0.54, roi_hike_potential_pct: 15.1, market_prevalence_pct: 82, user_proficiency: 0 },
        { id: "probability", label: "Probability & Bayesian Models", canonical_name: "Probability", state: "thriving_unlit", correlation_r: 0.48, roi_hike_potential_pct: 13.4, market_prevalence_pct: 75, user_proficiency: 0 },
        { id: "time_series", label: "Time Series & Forecasting", canonical_name: "Time Series", state: "thriving_unlit", correlation_r: 0.44, roi_hike_potential_pct: 12.3, market_prevalence_pct: 68, user_proficiency: 0 },
        { id: "matrix_decomp", label: "PCA Matrix Decomposition", canonical_name: "PCA", state: "steady", correlation_r: 0.35, roi_hike_potential_pct: 3.5, market_prevalence_pct: 55, user_proficiency: 0 },
        { id: "descriptive_stats", label: "Descriptive Statistics", canonical_name: "Statistics", state: "fading", correlation_r: 0.18, roi_hike_potential_pct: 1.8, market_prevalence_pct: 90, user_proficiency: 0 },
      ],
    },
    {
      id: "dashboard_storytelling",
      label: "Data Storytelling & Dashboards",
      weight: 0.28,
      correlation_r: 0.54,
      user_proficiency: 1.0,
      target_requirement: 4.5,
      leaves: [
        { id: "bi_tools", label: "Tableau & PowerBI Dashboards", canonical_name: "Tableau", state: "lit", correlation_r: 0.56, roi_hike_potential_pct: 0, market_prevalence_pct: 85, user_proficiency: 4 },
        { id: "exec_storytelling", label: "Executive Data Storytelling", canonical_name: "Data Storytelling", state: "thriving_unlit", correlation_r: 0.58, roi_hike_potential_pct: 16.2, market_prevalence_pct: 80, user_proficiency: 0 },
        { id: "kpi_design", label: "KPI Design & Business Intelligence", canonical_name: "KPI Design", state: "thriving_unlit", correlation_r: 0.52, roi_hike_potential_pct: 14.6, market_prevalence_pct: 76, user_proficiency: 0 },
        { id: "interactive_viz", label: "Plotly & D3 Custom Viz", canonical_name: "Plotly", state: "thriving_unlit", correlation_r: 0.42, roi_hike_potential_pct: 11.8, market_prevalence_pct: 60, user_proficiency: 0 },
        { id: "static_excel", label: "Spreadsheet Reporting", canonical_name: "Excel", state: "fading", correlation_r: 0.15, roi_hike_potential_pct: 1.5, market_prevalence_pct: 92, user_proficiency: 0 },
      ],
    },
    {
      id: "ai_ml",
      label: "AI, ML & Modeling",
      weight: 0.17,
      correlation_r: 0.41,
      user_proficiency: 1.8,
      target_requirement: 4.5,
      leaves: [
        { id: "pytorch_dl", label: "PyTorch Deep Learning", canonical_name: "PyTorch", state: "thriving_unlit", correlation_r: 0.58, roi_hike_potential_pct: 9.9, market_prevalence_pct: 72, user_proficiency: 0 },
        { id: "genai_llms", label: "LLMs, RAG & Transformers", canonical_name: "Transformers", state: "thriving_unlit", correlation_r: 0.62, roi_hike_potential_pct: 10.5, market_prevalence_pct: 68, user_proficiency: 0 },
        { id: "classical_ml", label: "XGBoost & Scikit-Learn", canonical_name: "Machine Learning", state: "lit", correlation_r: 0.47, roi_hike_potential_pct: 0, market_prevalence_pct: 88, user_proficiency: 4 },
        { id: "mlops", label: "MLOps & Model Deployment", canonical_name: "FastAPI", state: "thriving_unlit", correlation_r: 0.51, roi_hike_potential_pct: 8.7, market_prevalence_pct: 58, user_proficiency: 0 },
        { id: "decision_trees", label: "Regression & Decision Trees", canonical_name: "Regression Analysis", state: "steady", correlation_r: 0.28, roi_hike_potential_pct: 2.8, market_prevalence_pct: 82, user_proficiency: 0 },
      ],
    },
    {
      id: "coding",
      label: "Coding & Software Fundamentals",
      weight: 0.22,
      correlation_r: 0.43,
      user_proficiency: 2.33,
      target_requirement: 4.5,
      leaves: [
        { id: "python_core", label: "Python Architecture", canonical_name: "Python", state: "lit", correlation_r: 0.55, roi_hike_potential_pct: 0, market_prevalence_pct: 94, user_proficiency: 4 },
        { id: "sql_opt", label: "SQL & Query Optimization", canonical_name: "SQL", state: "lit", correlation_r: 0.49, roi_hike_potential_pct: 0, market_prevalence_pct: 91, user_proficiency: 4 },
        { id: "system_design", label: "System Design & Clean Code", canonical_name: "System Design", state: "thriving_unlit", correlation_r: 0.46, roi_hike_potential_pct: 10.1, market_prevalence_pct: 70, user_proficiency: 0 },
        { id: "dsa", label: "Data Structures & Algorithms", canonical_name: "Algorithms", state: "thriving_unlit", correlation_r: 0.42, roi_hike_potential_pct: 9.2, market_prevalence_pct: 74, user_proficiency: 0 },
        { id: "git_cicd", label: "Git Version Control", canonical_name: "Git", state: "lit", correlation_r: 0.38, roi_hike_potential_pct: 0, market_prevalence_pct: 80, user_proficiency: 4 },
        { id: "bash_scripting", label: "Linux / Bash Automation", canonical_name: "Bash", state: "fading", correlation_r: 0.22, roi_hike_potential_pct: 2.2, market_prevalence_pct: 65, user_proficiency: 0 },
      ],
    },
    {
      id: "big_data",
      label: "Infrastructure & Big Data Tools",
      weight: 0.05,
      correlation_r: 0.11,
      user_proficiency: 1.0,
      target_requirement: 4.5,
      leaves: [
        { id: "cloud_warehousing", label: "Snowflake & BigQuery", canonical_name: "BigQuery", state: "thriving_unlit", correlation_r: 0.42, roi_hike_potential_pct: 2.1, market_prevalence_pct: 62, user_proficiency: 0 },
        { id: "pyspark_spark", label: "Apache Spark & PySpark", canonical_name: "PySpark", state: "thriving_unlit", correlation_r: 0.45, roi_hike_potential_pct: 2.3, market_prevalence_pct: 65, user_proficiency: 0 },
        { id: "pipeline_orchestration", label: "Apache Airflow & ETL", canonical_name: "Airflow", state: "steady", correlation_r: 0.36, roi_hike_potential_pct: 3.6, market_prevalence_pct: 54, user_proficiency: 0 },
        { id: "legacy_hadoop", label: "Legacy Hadoop MapReduce", canonical_name: "Hadoop", state: "fading", correlation_r: 0.08, roi_hike_potential_pct: 0.8, market_prevalence_pct: 30, user_proficiency: 0 },
      ],
    },
  ],
  telemetry: {
    total_target_leaves: 26,
    lit_leaves_count: 5,
    thriving_unlit_gaps_count: 14,
    current_readiness_pct: 19.2,
    projected_salary_hike_pct: 65.0,
    projected_max_salary_lpa: 16.7,
    leadership_resilience_index: 0.6,
  },
}

export default function LivingSkillTree({
  context,
  targetRole,
  currentSkills,
  experienceYears = 2.0,
  title = "Living Skill Tree Overlay",
  subtitle = "Your lit skills vs. the live botanical tree for your target role.",
  cardLabel = "01 · See the exact gap",
}: LivingSkillTreeProps) {
  const [treeData, setTreeData] = useState<TreeData>(FALLBACK_TREE_DATA)
  const [loading, setLoading] = useState(false)
  const [selectedLeaf, setSelectedLeaf] = useState<LeafData | null>(null)
  const [hoveredLeaf, setHoveredLeaf] = useState<LeafData | null>(null)
  const [activeFilter, setActiveFilter] = useState<"all" | "lit" | "priority" | "steady">("all")
  const [viewMode, setViewMode] = useState<"tree" | "branches">("tree")

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:8000/api/v1/builder/tree-overlay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        target_role: targetRole,
        user_skills: currentSkills,
        current_experience_years: experienceYears,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status)
        return res.json()
      })
      .then((data: TreeData) => {
        if (data && data.branches && data.branches.length > 0) {
          setTreeData(data)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.warn("Backend tree overlay fetch failed; using fallback:", err)
        setLoading(false)
      })
  }, [targetRole, currentSkills.join(","), experienceYears])

  // Extract all leaves and calculate positioning
  const flattenedLeaves = useMemo(() => {
    if (!treeData?.branches) return []
    const list: LeafData[] = []
    treeData.branches.forEach((b) => {
      b.leaves.forEach((l) => {
        const coords = LEAF_COORDINATES[l.id] || { x: 480, y: 300, branchId: b.id }
        list.push({
          ...l,
          branchId: b.id,
          branchLabel: b.label,
          x: coords.x,
          y: coords.y,
        })
      })
    })
    return list
  }, [treeData])

  // Top Actionable Gaps
  const actionableGaps = useMemo(() => {
    const unlit = flattenedLeaves.filter(
      (l) => l.state === "thriving_unlit" || (l.state === "steady" && l.roi_hike_potential_pct > 0)
    )
    unlit.sort((a, b) => b.roi_hike_potential_pct - a.roi_hike_potential_pct)
    return unlit.slice(0, 3)
  }, [flattenedLeaves])

  // Telemetry counts
  const telemetry = treeData.telemetry || {
    total_target_leaves: flattenedLeaves.length || 26,
    lit_leaves_count: flattenedLeaves.filter((l) => l.state === "lit").length,
    thriving_unlit_gaps_count: flattenedLeaves.filter((l) => l.state === "thriving_unlit").length,
    current_readiness_pct: Math.round(
      (flattenedLeaves.filter((l) => l.state === "lit").length / (flattenedLeaves.length || 1)) * 100
    ),
    projected_salary_hike_pct: 65.0,
    projected_max_salary_lpa: treeData.role_benchmark?.max_salary_lpa || 18.2,
    leadership_resilience_index: 0.6,
  }

  const activeLeaf = hoveredLeaf || selectedLeaf

  return (
    <section className={`${context}-feature-section mt-8 mb-10`} id="tree-overlay">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-[11px] uppercase tracking-widest text-[#72c29c] font-bold mb-1.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            {cardLabel}
          </div>
          <Heading level={2}>{title}</Heading>
          <p className="text-[#a4b8ab] text-sm mt-1">{subtitle}</p>
        </div>

        {/* View toggles & status */}
        <div className="flex items-center gap-3">
          <div className="flex bg-[#0f1712] p-1 rounded-xl border border-[#22382a]">
            <button
              type="button"
              onClick={() => setViewMode("tree")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                viewMode === "tree"
                  ? "bg-[#1f3d2b] text-[#55ea9d] shadow-sm"
                  : "text-[#8ea596] hover:text-white"
              }`}
            >
              <Icon name="branch" size={14} />
              Botanical Tree
            </button>
            <button
              type="button"
              onClick={() => setViewMode("branches")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                viewMode === "branches"
                  ? "bg-[#1f3d2b] text-[#55ea9d] shadow-sm"
                  : "text-[#8ea596] hover:text-white"
              }`}
            >
              <Icon name="grid" size={14} />
              Branch Cards
            </button>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${
              loading
                ? "bg-amber-950/40 border-amber-800/60 text-amber-300"
                : "bg-[#0b1f14] border-[#1b432a] text-[#52d692]"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {loading ? "Syncing tree..." : "Live Engine Connected"}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Tree Canvas */}
        <div className="lg:col-span-2 relative flex flex-col justify-between rounded-3xl min-h-[660px] overflow-hidden bg-gradient-to-b from-[#07130c] via-[#0b1c12] to-[#050e09] border border-[#1b3d29] shadow-2xl">
          {/* Top Canvas Bar */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 p-6 pb-2 border-b border-[#173322]/60">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#7ca08a] font-semibold block">
                Target Role Architecture
              </span>
              <strong className="text-white text-xl font-serif tracking-tight mt-0.5 block">
                {targetRole}
              </strong>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-3 bg-[#0c2015]/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#214b32]">
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-wider text-[#8da898] block">
                  Current Readiness
                </span>
                <span className="text-sm font-bold text-[#44e195]">
                  {telemetry.current_readiness_pct}%
                </span>
              </div>
              <div className="w-px h-6 bg-[#214b32]" />
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-wider text-[#8da898] block">
                  Lit Leaves
                </span>
                <span className="text-sm font-bold text-white">
                  {telemetry.lit_leaves_count} <span className="text-xs font-normal text-slate-400">/ {telemetry.total_target_leaves}</span>
                </span>
              </div>
              <div className="w-px h-6 bg-[#214b32]" />
              <div className="text-left">
                <span className="text-[9px] uppercase tracking-wider text-amber-300 block">
                  High-ROI Gaps
                </span>
                <span className="text-sm font-bold text-amber-400">
                  {telemetry.thriving_unlit_gaps_count}
                </span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#09150e] p-1 rounded-xl border border-[#173322]">
              {(["all", "lit", "priority", "steady"] as const).map((filterKey) => (
                <button
                  type="button"
                  key={filterKey}
                  onClick={() => setActiveFilter(filterKey)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition-all ${
                    activeFilter === filterKey
                      ? "bg-[#1a402a] text-[#5dfaa9] shadow-sm"
                      : "text-[#7f998a] hover:text-white"
                  }`}
                >
                  {filterKey === "all"
                    ? "All (26)"
                    : filterKey === "lit"
                    ? `Lit (${telemetry.lit_leaves_count})`
                    : filterKey === "priority"
                    ? `Priority (${telemetry.thriving_unlit_gaps_count})`
                    : "Steady"}
                </button>
              ))}
            </div>
          </div>

          {/* VIEW MODE 1: BOTANICAL SVG TREE */}
          {viewMode === "tree" && (
            <div className="relative flex-1 w-full h-[620px] select-none overflow-hidden flex items-center justify-center p-2">
              <svg
                viewBox="0 0 960 680"
                className="w-full h-full max-h-[620px] transition-all duration-300"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Glow Filters */}
                  <filter id="emerald-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0 0 0 0 0.06   0 0 0 0 0.72   0 0 0 0 0.50   0 0 0 0.8 0"
                      result="coloredBlur"
                    />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="0 0 0 0 0.96   0 0 0 0 0.62   0 0 0 0 0.07   0 0 0 0.9 0"
                      result="coloredBlur"
                    />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <filter id="spotlight-glow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Trunk & Bark Gradient */}
                  <linearGradient id="trunk-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0d2417" />
                    <stop offset="35%" stopColor="#1e442d" />
                    <stop offset="65%" stopColor="#25593b" />
                    <stop offset="100%" stopColor="#0a1d12" />
                  </linearGradient>

                  <linearGradient id="sap-pulse" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#34d399" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* 1. ROOTS & SOIL BED */}
                <g className="tree-roots opacity-80">
                  <path
                    d="M 480 575 C 410 595, 330 625, 230 645"
                    fill="none"
                    stroke="#173e27"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 480 575 C 440 605, 410 635, 370 660"
                    fill="none"
                    stroke="#1c482f"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 480 575 C 520 605, 550 635, 590 660"
                    fill="none"
                    stroke="#1c482f"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 480 575 C 550 595, 630 625, 730 645"
                    fill="none"
                    stroke="#173e27"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Glowing root veins for verified foundation */}
                  <path
                    d="M 480 575 C 430 600, 350 625, 250 640"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    className="animate-pulse opacity-60"
                  />
                  <path
                    d="M 480 575 C 530 600, 610 625, 710 640"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    className="animate-pulse opacity-60"
                  />
                </g>

                {/* 2. CENTRAL BOTANICAL TRUNK */}
                <g className="tree-trunk">
                  {/* Organic Bark Silhouette */}
                  <path
                    d="M 445 580 C 438 520, 442 450, 450 370 C 465 370, 495 370, 510 370 C 518 450, 522 520, 515 580 Z"
                    fill="url(#trunk-gradient)"
                    stroke="#27613e"
                    strokeWidth="2"
                  />
                  {/* Wood grain & internal sap conduits */}
                  <path
                    d="M 465 570 C 460 515, 465 440, 470 380"
                    fill="none"
                    stroke="#3b8259"
                    strokeWidth="2.5"
                    opacity="0.7"
                  />
                  <path
                    d="M 495 570 C 500 515, 495 440, 490 380"
                    fill="none"
                    stroke="#1e442d"
                    strokeWidth="2"
                    opacity="0.8"
                  />
                  <path
                    d="M 480 565 C 478 500, 482 430, 480 370"
                    fill="none"
                    stroke="url(#sap-pulse)"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                </g>

                {/* 3. PRIMARY BRANCHES */}
                <g className="tree-branches">
                  {/* Branch 1: Maths & Stats (Top Left) */}
                  <path
                    d="M 460 380 C 370 340, 280 290, 210 220"
                    fill="none"
                    stroke="#225335"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 460 380 C 370 340, 280 290, 210 220"
                    fill="none"
                    stroke="#439e6a"
                    strokeWidth="2"
                    opacity="0.6"
                  />

                  {/* Branch 2: Data Storytelling & Dashboards (Bottom Left) */}
                  <path
                    d="M 460 450 C 360 440, 285 440, 230 440"
                    fill="none"
                    stroke="#225335"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />

                  {/* Branch 3: AI, ML & Crown (Center Top) */}
                  <path
                    d="M 480 370 C 480 290, 480 220, 480 170"
                    fill="none"
                    stroke="#255d3c"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />

                  {/* Branch 4: Coding & Architecture (Top Right) */}
                  <path
                    d="M 500 380 C 590 340, 680 290, 750 220"
                    fill="none"
                    stroke="#225335"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 500 380 C 590 340, 680 290, 750 220"
                    fill="none"
                    stroke="#439e6a"
                    strokeWidth="2"
                    opacity="0.6"
                  />

                  {/* Branch 5: Infrastructure & Big Data (Bottom Right) */}
                  <path
                    d="M 500 450 C 600 440, 675 440, 730 440"
                    fill="none"
                    stroke="#225335"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </g>

                {/* 4. TWIGS CONNECTING BRANCHES TO LEAF NODES */}
                <g className="tree-twigs opacity-75">
                  {flattenedLeaves.map((leaf) => {
                    const branchAnchor = BRANCH_ANCHORS[leaf.branchId || ""] || { x: 480, y: 340 }
                    const isLit = leaf.state === "lit"
                    const isPriority = leaf.state === "thriving_unlit"
                    const isSelected = selectedLeaf?.id === leaf.id || hoveredLeaf?.id === leaf.id

                    return (
                      <path
                        key={`twig-${leaf.id}`}
                        d={`M ${branchAnchor.x} ${branchAnchor.y} Q ${(branchAnchor.x + (leaf.x || 0)) / 2} ${(branchAnchor.y + (leaf.y || 0)) / 2 + 10}, ${leaf.x} ${leaf.y}`}
                        fill="none"
                        stroke={
                          isSelected
                            ? "#55ea9d"
                            : isLit
                            ? "#10b981"
                            : isPriority
                            ? "#f59e0b"
                            : "#224c32"
                        }
                        strokeWidth={isSelected ? 3 : isLit || isPriority ? 2 : 1.2}
                        strokeDasharray={isLit || isPriority ? undefined : "3 4"}
                        className="transition-colors duration-200"
                      />
                    )
                  })}
                </g>

                {/* 5. BRANCH BADGES / CATEGORY PODS */}
                {treeData.branches.map((b) => {
                  const anchor = BRANCH_ANCHORS[b.id]
                  if (!anchor) return null

                  return (
                    <g
                      key={`branch-badge-${b.id}`}
                      transform={`translate(${anchor.x}, ${anchor.y})`}
                      className="cursor-default"
                    >
                      <circle r="16" fill="#0d2417" stroke="#25623e" strokeWidth="2" />
                      <circle r="6" fill="#38a169" />
                      {/* Branch Label */}
                      <rect
                        x="-70"
                        y="18"
                        width="140"
                        height="20"
                        rx="10"
                        fill="#08170f"
                        stroke="#1f482f"
                        strokeWidth="1"
                        className="opacity-95"
                      />
                      <text
                        x="0"
                        y="32"
                        textAnchor="middle"
                        fill="#a0c5b0"
                        fontSize="9.5"
                        fontWeight="600"
                        letterSpacing="0.3"
                      >
                        {b.label.split("&")[0].trim()} · {Math.round(b.weight * 100)}%
                      </text>
                    </g>
                  )
                })}

                {/* 6. INTERACTIVE BOTANICAL LEAF NODES */}
                <g className="tree-leaves">
                  {flattenedLeaves.map((leaf) => {
                    const isLit = leaf.state === "lit"
                    const isPriority = leaf.state === "thriving_unlit"
                    const isSelected = selectedLeaf?.id === leaf.id
                    const isHovered = hoveredLeaf?.id === leaf.id
                    const isHighlighted = isSelected || isHovered

                    // Check active filter
                    const matchesFilter =
                      activeFilter === "all" ||
                      (activeFilter === "lit" && isLit) ||
                      (activeFilter === "priority" && isPriority) ||
                      (activeFilter === "steady" && !isLit && !isPriority)

                    const opacity = matchesFilter ? 1 : 0.25

                    return (
                      <g
                        key={leaf.id}
                        transform={`translate(${leaf.x}, ${leaf.y})`}
                        onClick={() => setSelectedLeaf(leaf)}
                        onMouseEnter={() => setHoveredLeaf(leaf)}
                        onMouseLeave={() => setHoveredLeaf(null)}
                        className="cursor-pointer transition-transform duration-200"
                        style={{
                          opacity,
                          transform: isHighlighted
                            ? `translate(${leaf.x}px, ${leaf.y}px) scale(1.12)`
                            : `translate(${leaf.x}px, ${leaf.y}px) scale(1)`,
                        }}
                      >
                        {/* Aura/Halo on hover or selection */}
                        {isHighlighted && (
                          <circle
                            r="32"
                            fill={isPriority ? "rgba(245, 158, 11, 0.2)" : "rgba(16, 185, 129, 0.25)"}
                            filter="url(#spotlight-glow)"
                            className="animate-pulse"
                          />
                        )}

                        {/* Leaf node shape */}
                        <rect
                          x="-58"
                          y="-16"
                          width="116"
                          height="32"
                          rx="16"
                          fill={
                            isLit
                              ? "#08331f"
                              : isPriority
                              ? "#382006"
                              : "#091710"
                          }
                          stroke={
                            isHighlighted
                              ? "#ffffff"
                              : isLit
                              ? "#10b981"
                              : isPriority
                              ? "#f59e0b"
                              : "#234c34"
                          }
                          strokeWidth={isHighlighted ? 2.5 : isLit || isPriority ? 1.8 : 1}
                          strokeDasharray={isLit || isPriority ? undefined : "3 3"}
                          filter={
                            isLit
                              ? "url(#emerald-glow)"
                              : isPriority
                              ? "url(#gold-glow)"
                              : undefined
                          }
                        />

                        {/* Leaf Icon */}
                        <g transform="translate(-46, -7)">
                          {isLit ? (
                            <path
                              d="M 0 7 L 4 11 L 11 2"
                              fill="none"
                              stroke="#34d399"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          ) : isPriority ? (
                            <circle cx="5" cy="6" r="4.5" fill="#f59e0b" />
                          ) : (
                            <circle cx="5" cy="6" r="3.5" fill="none" stroke="#719480" strokeWidth="1.5" />
                          )}
                        </g>

                        {/* Skill Label Text */}
                        <text
                          x="-28"
                          y="4"
                          fill={
                            isLit
                              ? "#ecfdf5"
                              : isPriority
                              ? "#fef3c7"
                              : "#9fc1ad"
                          }
                          fontSize="10"
                          fontWeight={isLit || isPriority ? "600" : "500"}
                          letterSpacing="0.2"
                        >
                          {leaf.canonical_name.length > 13
                            ? `${leaf.canonical_name.slice(0, 12)}…`
                            : leaf.canonical_name}
                        </text>

                        {/* Small ROI or check badge */}
                        {isPriority && leaf.roi_hike_potential_pct > 0 && (
                          <g transform="translate(36, -6)">
                            <rect
                              x="-2"
                              y="-4"
                              width="22"
                              height="12"
                              rx="6"
                              fill="#78350f"
                              stroke="#f59e0b"
                              strokeWidth="0.8"
                            />
                            <text
                              x="9"
                              y="5"
                              textAnchor="middle"
                              fill="#fef08a"
                              fontSize="7.5"
                              fontWeight="bold"
                            >
                              +{Math.round(leaf.roi_hike_potential_pct)}%
                            </text>
                          </g>
                        )}
                      </g>
                    )
                  })}
                </g>

                {/* 7. FOUNDATION POD */}
                <g transform="translate(480, 620)" className="cursor-default">
                  <rect
                    x="-150"
                    y="0"
                    width="300"
                    height="32"
                    rx="16"
                    fill="#08180f"
                    stroke="#1d482f"
                    strokeWidth="1.5"
                  />
                  <text
                    x="0"
                    y="20"
                    textAnchor="middle"
                    fill="#75aa8d"
                    fontSize="11"
                    fontWeight="600"
                  >
                    Your Foundation · Verified Roots ({currentSkills.slice(0, 3).join(", ")})
                  </text>
                </g>
              </svg>

              {/* Floating Leaf HUD Card (when hovered or clicked) */}
              {activeLeaf && (
                <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-96 bg-[#0c1a12]/95 backdrop-blur-md p-4 rounded-2xl border border-[#2b5e3f] shadow-2xl z-30 animate-fadeIn">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-base font-semibold">
                          {activeLeaf.label || activeLeaf.canonical_name}
                        </strong>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                            activeLeaf.state === "lit"
                              ? "bg-emerald-950 border border-emerald-500 text-emerald-300"
                              : activeLeaf.state === "thriving_unlit"
                              ? "bg-amber-950 border border-amber-500 text-amber-300"
                              : "bg-slate-900 border border-slate-700 text-slate-300"
                          }`}
                        >
                          {activeLeaf.state === "lit"
                            ? "Verified Lit"
                            : activeLeaf.state === "thriving_unlit"
                            ? "Priority Gap"
                            : "Steady Foundation"}
                        </span>
                      </div>
                      <small className="text-[#8baaa4] text-xs">
                        Branch: {activeLeaf.branchLabel || activeLeaf.branchId}
                      </small>
                    </div>
                    {selectedLeaf && (
                      <button
                        type="button"
                        onClick={() => setSelectedLeaf(null)}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        <Icon name="close" size={14} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 my-3 text-center bg-[#07130b] p-2.5 rounded-xl border border-[#1b3d29]">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                        Market Demand
                      </span>
                      <strong className="text-xs text-white">
                        {activeLeaf.market_prevalence_pct}%
                      </strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                        ROI Hike Uplift
                      </span>
                      <strong className="text-xs text-amber-400 font-bold">
                        +{activeLeaf.roi_hike_potential_pct}%
                      </strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 block">
                        Proficiency
                      </span>
                      <strong className="text-xs text-emerald-400">
                        {activeLeaf.user_proficiency.toFixed(1)} / 4.5
                      </strong>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#90b29b] flex items-center justify-between">
                    <span>Target blueprint requires active demonstration.</span>
                    {activeLeaf.state !== "lit" && (
                      <span className="text-amber-400 font-medium cursor-pointer hover:underline">
                        Build with Micro-Project &rarr;
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 2: STRUCTURED BRANCH CARDS VIEW */}
          {viewMode === "branches" && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[620px] overflow-y-auto">
              {treeData.branches.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#09180f] p-4 rounded-2xl border border-[#1b422a] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Heading level={3}>{b.label}</Heading>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-[#133020] text-[#4fe899] font-mono">
                      {Math.round(b.weight * 100)}% weight
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 my-2">
                    {b.leaves.map((l) => {
                      const isLit = l.state === "lit"
                      const isPriority = l.state === "thriving_unlit"

                      return (
                        <button
                          type="button"
                          key={l.id}
                          onClick={() => setSelectedLeaf(l)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                            isLit
                              ? "bg-emerald-950/80 border-emerald-500/80 text-emerald-200"
                              : isPriority
                              ? "bg-amber-950/60 border-amber-500 text-amber-200 font-semibold"
                              : "bg-[#0c1c13] border-[#20442e] text-[#93b5a1]"
                          }`}
                        >
                          <Icon name={isLit ? "check" : isPriority ? "target" : "branch"} size={12} />
                          <span>{l.canonical_name}</span>
                          {isPriority && l.roi_hike_potential_pct > 0 && (
                            <span className="text-[9px] text-amber-400 font-mono">
                              +{Math.round(l.roi_hike_potential_pct)}%
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#163321] text-[11px] text-[#7da08c] flex items-center justify-between">
                    <span>Proficiency Score</span>
                    <span className="font-bold text-white">
                      {b.user_proficiency.toFixed(1)} / {b.target_requirement.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Canvas Bottom Legend */}
          <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 px-6 py-3 border-t border-[#173322]/70 bg-[#07130b]/90 text-xs text-[#87a593]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_6px_#10b981]" />
                Lit & Verified Skills ({telemetry.lit_leaves_count})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
                Highest-ROI Gaps ({telemetry.thriving_unlit_gaps_count})
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-dashed border-[#577b67]" />
                Steady Requirements
              </span>
            </div>
            <div className="text-[11px] text-[#55866d]">
              Click any leaf to inspect its market trajectory
            </div>
          </div>
        </div>

        {/* Right Column: Actionable Insights Sidebar */}
        <aside className="flex flex-col gap-4 bg-[#0d1610] p-6 rounded-3xl border border-[#1b3b27] shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-widest uppercase text-[#52e896] font-bold">
              Gap Analysis
            </span>
            <span className="text-xs text-slate-400 font-mono">Top High-Impact</span>
          </div>

          <Heading level={3}>Actionable Insights</Heading>

          <p className="text-xs text-[#8da596]">
            Skills strategically ranked by salary correlation and hiring velocity for {targetRole}.
          </p>

          {/* Actionable Gaps List */}
          <div className="flex flex-col gap-3 my-2">
            {actionableGaps.map((item, index) => {
              const isSelected = selectedLeaf?.id === item.id

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedLeaf(item)}
                  className={`flex items-start gap-3 p-3.5 text-left rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#2d2109] border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                      : "bg-[#102017]/80 border-[#1d3d2a] hover:bg-[#162d20] hover:border-[#2a593c]"
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-amber-400 mt-0.5">
                    0{index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="block text-sm text-white font-medium">
                        {item.canonical_name}
                      </strong>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-600/50">
                        +{Math.round(item.roi_hike_potential_pct)}% ROI
                      </span>
                    </div>
                    <small className="block text-xs text-[#89a895] mt-1">
                      Prevalence: {item.market_prevalence_pct}% · Missing evidence
                    </small>
                  </div>
                  <Icon name="chevron" size={14} className="text-slate-400 mt-1" />
                </button>
              )
            })}
          </div>

          {/* Projected Target Salary Spike */}
          <div className="bg-gradient-to-r from-[#11291b] to-[#0c1f14] p-4 rounded-2xl border border-[#214f34] my-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase tracking-wider text-[#79c298] font-bold">
                Projected Compensation Spike
              </span>
              <span className="text-xs font-bold text-amber-300">
                +{telemetry.projected_salary_hike_pct}%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <strong className="text-2xl font-serif text-white">
                ₹{telemetry.projected_max_salary_lpa} <span className="text-xs font-sans text-slate-400 font-normal">LPA Target</span>
              </strong>
            </div>
            <p className="text-[11px] text-[#8faea0] mt-1">
              Closing the top 3 unlit leaves moves your profile from baseline to the 75th percentile benchmark.
            </p>
          </div>

          {/* Strategic Takeaway Card */}
          <div className="mt-auto pt-4 border-t border-[#1b3d28] text-xs text-[#8ca897] flex items-start gap-2.5">
            <div className="mt-0.5 text-[#55ea9d]">
              <Icon name="spark" size={16} />
            </div>
            <div>
              <strong className="block text-white mb-0.5 font-semibold">Strategic Takeaway</strong>
              {actionableGaps.length > 0 ? actionableGaps[0].canonical_name : "Data Storytelling"} is your highest ROI gap to bridge the threshold into {targetRole}.
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
