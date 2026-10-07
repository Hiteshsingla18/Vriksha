import { useState } from "react"

// ==========================================
// Types
// ==========================================
type TimeHorizon = "Market Size" | "Current Baseline" | "Predicted 2–3 yrs"

interface RoleDataPoint {
  status: string
  statusTone: "green" | "teal" | "amber" | "indigo" | "purple"
  signal: string
  skills: string[]
  payGrowth: string
  nextFocus: string
  payTrajectory: {
    junior: string
    mid: string
    lead: string
  }
  transitionSteps: string[]
  hiringHubs: string[]
  marketScore: string
}

interface DataScienceRole {
  id: string
  number: string
  role: string
  domain: string
  horizons: Record<TimeHorizon, RoleDataPoint>
}

// ==========================================
// Embedded Self-Contained SVG Icons
// Zero external file dependencies
// ==========================================
function ArrowRightIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function ChevronDownIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

function CheckIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

// ==========================================
// Data Science Market Recommendations Database
// Derived from hackathon datasets:
// DataScience_Jobs.csv, Analytics_Jobs.csv, JDS competency traits
// ==========================================
const ROLES_DATA: DataScienceRole[] = [
  {
    id: "ai-engineering",
    number: "01",
    role: "AI Engineering",
    domain: "Applied LLMs, Fine-Tuning & Production AI",
    horizons: {
      "Current Baseline": {
        status: "High Demand",
        statusTone: "green",
        signal: "Immediate surge in enterprise GenAI integrations and LLM fine-tuning pipelines.",
        skills: ["Python", "PyTorch", "LLMs", "LangChain"],
        payGrowth: "₹22 – 38 LPA · +28% YoY",
        nextFocus: "Low-latency inference & quantization",
        payTrajectory: { junior: "₹16 LPA", mid: "₹28 LPA", lead: "₹42+ LPA" },
        transitionSteps: [
          "Master LoRA / QLoRA parameter-efficient fine-tuning workflows.",
          "Build deterministic evaluation harnesses for hallucination tracking.",
          "Integrate enterprise vector stores (Pinecone, pgvector) with hybrid search.",
        ],
        hiringHubs: ["Bengaluru", "Hyderabad", "Pune"],
        marketScore: "94/100 · High Inflow",
      },
      "Predicted 2–3 yrs": {
        status: "Explosive (+42%)",
        statusTone: "green",
        signal: "Autonomous agent architectures replacing single-model prompt endpoints.",
        skills: ["Agentic AI", "PyTorch", "Model Routing", "System Design"],
        payGrowth: "₹32 – 55+ LPA · Critical Spikes",
        nextFocus: "Multi-agent orchestration & safety guardrails",
        payTrajectory: { junior: "₹24 LPA", mid: "₹40 LPA", lead: "₹60+ LPA" },
        transitionSteps: [
          "Architect stateful multi-agent workflows (LangGraph / AutoGen).",
          "Implement dynamic semantic caching and speculative decoding.",
          "Lead enterprise governance and safety alignment benchmarks.",
        ],
        hiringHubs: ["Bengaluru", "Gurugram", "Global Remote"],
        marketScore: "98/100 · Scarcity Premium",
      },
      "Market Size": {
        status: "₹4,200 Cr TAM",
        statusTone: "teal",
        signal: "India's largest emerging technology capital allocation pool in 2026–2028.",
        skills: ["Enterprise AI", "Cloud GPUs", "Python", "API Scalability"],
        payGrowth: "18,500+ Open Positions in India",
        nextFocus: "Enterprise architecture scaling",
        payTrajectory: { junior: "₹18 LPA", mid: "₹34 LPA", lead: "₹50+ LPA" },
        transitionSteps: [
          "Target BFSI and SaaS product leaders building internal AI stacks.",
          "Standardize enterprise data contracts across disparate databases.",
          "Build reusable LLM gateways to prevent third-party vendor lock-in.",
        ],
        hiringHubs: ["Bengaluru (52%)", "Hyderabad (24%)", "Pune (14%)"],
        marketScore: "₹4,200 Cr · 34% CAGR",
      },
    },
  },
  {
    id: "ai-platform-engineering",
    number: "02",
    role: "AI Platform Engineering",
    domain: "MLOps, Distributed Serving & Cloud Infrastructure",
    horizons: {
      "Current Baseline": {
        status: "Scarcity (+36%)",
        statusTone: "amber",
        signal: "Acute shortage of engineers bridging machine learning with cloud reliability.",
        skills: ["Kubernetes", "MLOps", "Docker", "Triton Server"],
        payGrowth: "₹20 – 36 LPA · Talent Deficit",
        nextFocus: "GPU cluster autoscaling",
        payTrajectory: { junior: "₹15 LPA", mid: "₹26 LPA", lead: "₹40+ LPA" },
        transitionSteps: [
          "Deploy high-throughput model inference servers (Triton / vLLM).",
          "Build automated feature store pipelines with Feast / Redis.",
          "Set up continuous data and concept drift detection triggers.",
        ],
        hiringHubs: ["Bengaluru", "Pune", "Noida"],
        marketScore: "91/100 · High Retention",
      },
      "Predicted 2–3 yrs": {
        status: "Critical Pillar",
        statusTone: "amber",
        signal: "Platform reliability becomes the #1 defensive moat against AI downtime & cloud bills.",
        skills: ["Distributed Systems", "vLLM", "Ray / Slurm", "MLOps"],
        payGrowth: "₹30 – 52+ LPA · Top Tier Stability",
        nextFocus: "Heterogeneous hardware & distributed serving",
        payTrajectory: { junior: "₹22 LPA", mid: "₹38 LPA", lead: "₹58+ LPA" },
        transitionSteps: [
          "Master distributed training clusters using Ray, Slurm, and InfiniBand.",
          "Automate continuous model retraining with zero-downtime canary rollouts.",
          "Implement cloud GPU spot instance orchestration to cut spend by 60%.",
        ],
        hiringHubs: ["Bengaluru", "Hyderabad", "Chennai"],
        marketScore: "96/100 · Structural Need",
      },
      "Market Size": {
        status: "₹3,100 Cr TAM",
        statusTone: "teal",
        signal: "Core infrastructure spend driving 40% of all new enterprise IT budgets.",
        skills: ["AWS / GCP", "Kubernetes", "Observability", "Data Pipelines"],
        payGrowth: "12,800+ Platform Roles",
        nextFocus: "Enterprise infrastructure consolidation",
        payTrajectory: { junior: "₹16 LPA", mid: "₹30 LPA", lead: "₹46+ LPA" },
        transitionSteps: [
          "Unify scattered Jupyter workflows into centralized ML platform CI/CD.",
          "Build telemetry dashboards tracking P99 latency and inference cost per token.",
          "Secure AI endpoints with enterprise OAuth2 and role-based data isolation.",
        ],
        hiringHubs: ["Bengaluru (48%)", "Pune (22%)", "Hyderabad (18%)"],
        marketScore: "₹3,100 Cr · 38% CAGR",
      },
    },
  },
  {
    id: "data-product-engineering",
    number: "03",
    role: "Data Product Engineering",
    domain: "Analytics Engineering, dbt & Reverse ETL",
    horizons: {
      "Current Baseline": {
        status: "High Growth",
        statusTone: "indigo",
        signal: "Connecting complex data warehouses directly into customer-facing applications.",
        skills: ["SQL", "Python", "dbt", "Reverse ETL"],
        payGrowth: "₹18 – 32 LPA · +24% YoY",
        nextFocus: "Real-time streaming analytics",
        payTrajectory: { junior: "₹12 LPA", mid: "₹22 LPA", lead: "₹35+ LPA" },
        transitionSteps: [
          "Build semantic data layers in dbt for single-source-of-truth metrics.",
          "Implement reverse-ETL pipelines feeding operational CRM/ERP tools.",
          "Design data contract specifications between engineers and product teams.",
        ],
        hiringHubs: ["Bengaluru", "Mumbai", "Gurugram"],
        marketScore: "88/100 · High Velocity",
      },
      "Predicted 2–3 yrs": {
        status: "Strategic (+31%)",
        statusTone: "indigo",
        signal: "Companies shift from internal dashboards to monetizable external data APIs.",
        skills: ["Streaming SQL", "Kafka / Flink", "Data APIs", "dbt"],
        payGrowth: "₹26 – 44+ LPA · High Product Value",
        nextFocus: "Embedded intelligence & event-driven data",
        payTrajectory: { junior: "₹18 LPA", mid: "₹30 LPA", lead: "₹48+ LPA" },
        transitionSteps: [
          "Transition batch reporting tables into real-time Apache Kafka streams.",
          "Package analytics as authenticated public microservices.",
          "Institute data quality SLAs with automated circuit breakers.",
        ],
        hiringHubs: ["Bengaluru", "Mumbai", "Pune"],
        marketScore: "92/100 · High Autonomy",
      },
      "Market Size": {
        status: "₹2,800 Cr TAM",
        statusTone: "teal",
        signal: "Massive demand in Retail, E-Commerce, and Fintech analytics modernization.",
        skills: ["Snowflake / BigQuery", "Product Analytics", "SQL", "Data Contracts"],
        payGrowth: "14,200+ Active Openings",
        nextFocus: "Product analytics monetization",
        payTrajectory: { junior: "₹14 LPA", mid: "₹25 LPA", lead: "₹40+ LPA" },
        transitionSteps: [
          "Partner with growth product managers to optimize conversion funnels.",
          "Construct unified customer 360 schemas with automated deduplication.",
          "Deploy automated cohort churn and lifetime value scoring pipelines.",
        ],
        hiringHubs: ["Bengaluru (45%)", "Mumbai (28%)", "Gurugram (16%)"],
        marketScore: "₹2,800 Cr · 29% CAGR",
      },
    },
  },
  {
    id: "advanced-analytics-lead",
    number: "04",
    role: "Advanced Analytics Lead",
    domain: "Causal Inference, Decision Science & P&L Attribution",
    horizons: {
      "Current Baseline": {
        status: "Established",
        statusTone: "purple",
        signal: "Leading cross-functional decisions with statistical rigor and causal analysis.",
        skills: ["Causal Inference", "Python", "SQL", "Metric Storytelling"],
        payGrowth: "₹24 – 42 LPA · Executive Visibility",
        nextFocus: "Executive P&L metric attribution",
        payTrajectory: { junior: "₹18 LPA", mid: "₹32 LPA", lead: "₹48+ LPA" },
        transitionSteps: [
          "Replace simple correlation metrics with rigorous causal inference (DoWhy).",
          "Design multi-variant A/B experimentation frameworks with variance reduction.",
          "Translate model telemetry directly into EBITDA margin contributions.",
        ],
        hiringHubs: ["Bengaluru", "Mumbai", "Delhi-NCR"],
        marketScore: "89/100 · Low Volatility",
      },
      "Predicted 2–3 yrs": {
        status: "Indispensable (+35%)",
        statusTone: "purple",
        signal: "The human differentiator: Translating AI model outputs into board-level strategy.",
        skills: ["Decision Science", "Econometrics", "SHAP", "Leadership"],
        payGrowth: "₹34 – 58+ LPA · Executive Ceilings",
        nextFocus: "Strategic AI capital governance",
        payTrajectory: { junior: "₹24 LPA", mid: "₹42 LPA", lead: "₹65+ LPA" },
        transitionSteps: [
          "Audit AI recommendation pipelines for systemic bias and regulatory compliance.",
          "Build econometric demand elasticity simulators for board strategy sessions.",
          "Establish company-wide AI decision thresholds balancing risk vs yield.",
        ],
        hiringHubs: ["Bengaluru", "Mumbai", "Global Remote"],
        marketScore: "95/100 · High Leadership Demand",
      },
      "Market Size": {
        status: "₹2,500 Cr TAM",
        statusTone: "teal",
        signal: "Direct bridge between technical modeling and enterprise executive committees.",
        skills: ["Executive Storytelling", "Statistical Rigor", "P&L Strategy", "Leadership"],
        payGrowth: "9,600+ Strategic Lead Openings",
        nextFocus: "Board advisory & CDO pathways",
        payTrajectory: { junior: "₹20 LPA", mid: "₹36 LPA", lead: "₹55+ LPA" },
        transitionSteps: [
          "Direct cross-functional squads of analysts, data scientists, and engineers.",
          "Drive company-wide data literacy and self-serve analytical adoption.",
          "Establish clear attribution methodologies for multi-channel business investments.",
        ],
        hiringHubs: ["Mumbai (38%)", "Bengaluru (34%)", "Delhi-NCR (20%)"],
        marketScore: "₹2,500 Cr · 26% CAGR",
      },
    },
  },
]

// ==========================================
// Status Badge Tone Helper
// ==========================================
function getStatusBadgeStyle(tone: RoleDataPoint["statusTone"]) {
  switch (tone) {
    case "green":
      return "bg-emerald-50 text-emerald-800 border-emerald-200"
    case "amber":
      return "bg-amber-50 text-amber-800 border-amber-200"
    case "indigo":
      return "bg-indigo-50 text-indigo-800 border-indigo-200"
    case "purple":
      return "bg-purple-50 text-purple-800 border-purple-200"
    case "teal":
      return "bg-[#e2f0ec] text-[#1f5b50] border-[#a9cec4]"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// ==========================================
// Main Component
// ==========================================
export default function MarketRecommendations() {
  // 1. Time Horizon Filter State
  const [activeHorizon, setActiveHorizon] = useState<TimeHorizon>("Predicted 2–3 yrs")
  // 2. Active Selected Card for Inline Details Drawer
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>("ai-engineering")
  // 3. User Targeted Roles (Checkmark toggle)
  const [targetRoleId, setTargetRoleId] = useState<string>("ai-engineering")

  const horizonOptions: TimeHorizon[] = [
    "Market Size",
    "Current Baseline",
    "Predicted 2–3 yrs",
  ]

  const handleToggleCard = (roleId: string) => {
    setSelectedRoleId((prev) => (prev === roleId ? null : roleId))
  }

  return (
    <section
      className="grower-feature-section bg-transparent"
      id="market-recommendations"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="grower-section-heading mb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#1f5b50] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1f5b50] inline-block" />
            01 · What to watch next
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Market Recommendations
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Current + predicted-market growth suggestions tailored for Data Science & AI careers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4]">
            <SparklesIcon className="w-3 h-3 text-[#1f5b50]" />
            Illustrative Market Signals
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Minimal Horizon Filter Bar                            */}
      {/* ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 p-2 bg-[#fcfbf9] border border-gray-200 rounded-xl">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mr-1 pl-1">
            Market Lens:
          </span>
          {horizonOptions.map((lens) => {
            const isActive = activeHorizon === lens
            return (
              <button
                key={lens}
                type="button"
                onClick={() => setActiveHorizon(lens)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#1f5b50] text-white shadow-2xs border border-[#17463e]"
                    : "bg-white text-gray-700 hover:text-gray-950 border border-gray-200 hover:bg-[#f5f3ee]"
                }`}
              >
                {lens}
              </button>
            )
          })}
        </div>

        <span className="text-[10px] text-gray-500 font-mono pr-2">
          {activeHorizon} · 4 Core DS Disciplines
        </span>
      </div>

      {/* ======================================================== */}
      {/* 3. 4 Precise Data Science Cards Grid                     */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ROLES_DATA.map((item) => {
          const currentPoint = item.horizons[activeHorizon]
          const isSelected = selectedRoleId === item.id
          const isTarget = targetRoleId === item.id

          return (
            <article
              key={item.id}
              className={`rounded-2xl transition-all border p-5 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? "bg-white border-[#1f5b50] ring-1 ring-[#1f5b50]/20 shadow-xs"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:bg-[#fdfcf9]"
              }`}
              onClick={() => handleToggleCard(item.id)}
            >
              <div>
                {/* Card Top: Status & Number */}
                <div className="flex items-center justify-between mb-2.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getStatusBadgeStyle(
                      currentPoint.statusTone
                    )}`}
                  >
                    {currentPoint.status}
                  </span>
                  <div className="flex items-center gap-2">
                    {isTarget && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1f5b50] bg-[#e2f0ec] px-1.5 py-0.5 rounded">
                        <CheckIcon className="w-3 h-3" />
                        Target Leap
                      </span>
                    )}
                    <span className="text-xs font-serif text-gray-400 font-bold">
                      {item.number}
                    </span>
                  </div>
                </div>

                {/* Role Title & Domain */}
                <div className="mb-2">
                  <h3 className="text-xl font-serif font-bold text-gray-950 tracking-tight">
                    {item.role}
                  </h3>
                  <div className="flex items-center justify-between gap-2 mt-0.5">
                    <span className="text-[11px] text-gray-500">
                      {item.domain}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1f5b50] shrink-0">
                      {currentPoint.payGrowth}
                    </span>
                  </div>
                </div>

                {/* Punchy Signal */}
                <p className="text-xs text-gray-700 leading-relaxed mb-3">
                  {currentPoint.signal}
                </p>

                {/* 3-4 Key Skill Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {currentPoint.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium bg-[#f5f3ec] text-gray-800 px-2 py-0.5 rounded-md border border-[#e4dfd3]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Next Skill Focus & Toggle Button */}
              <div>
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-gray-600 truncate mr-2">
                    <span className="text-gray-400 text-[10px] uppercase font-semibold">
                      Pay attention to:
                    </span>
                    <strong className="text-gray-900 font-semibold truncate">
                      {currentPoint.nextFocus}
                    </strong>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 font-semibold text-[#1f5b50] hover:text-[#17463e] shrink-0 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleCard(item.id)
                    }}
                  >
                    <span>{isSelected ? "Hide" : "Details"}</span>
                    <ChevronDownIcon
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* ==================================================== */}
                {/* Inline Compact Detail Drawer                        */}
                {/* ==================================================== */}
                {isSelected && (
                  <div
                    className="mt-3.5 pt-3.5 border-t border-gray-200 bg-[#fbfaf6] -mx-5 -mb-5 p-4 rounded-b-2xl text-left"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                        Transition Blueprint & Scarcity
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#1f5b50]">
                        {currentPoint.marketScore}
                      </span>
                    </div>

                    {/* Pay Trajectory Mini-Strip */}
                    <div className="grid grid-cols-3 gap-1.5 bg-white p-2 rounded-lg border border-gray-200 text-center mb-3 text-[10px]">
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase">
                          Junior
                        </span>
                        <strong className="font-mono text-gray-900 font-bold">
                          {currentPoint.payTrajectory.junior}
                        </strong>
                      </div>
                      <div className="border-x border-gray-100">
                        <span className="text-gray-400 block text-[9px] uppercase">
                          Mid-Level
                        </span>
                        <strong className="font-mono text-gray-900 font-bold">
                          {currentPoint.payTrajectory.mid}
                        </strong>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase">
                          Staff / Lead
                        </span>
                        <strong className="font-mono text-[#1f5b50] font-bold">
                          {currentPoint.payTrajectory.lead}
                        </strong>
                      </div>
                    </div>

                    {/* Transition Steps */}
                    <div className="space-y-1.5 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                        Actionable Milestones:
                      </span>
                      {currentPoint.transitionSteps.map((step, idx) => (
                        <div
                          key={step}
                          className="flex items-start gap-1.5 text-[11px] text-gray-700 leading-snug"
                        >
                          <span className="w-3.5 h-3.5 rounded-full bg-[#1f5b50]/10 text-[#1f5b50] text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between gap-2">
                      <div className="text-[10px] text-gray-500">
                        Top Hubs:{" "}
                        <strong className="text-gray-800">
                          {currentPoint.hiringHubs.join(", ")}
                        </strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTargetRoleId(item.id)}
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          isTarget
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-[#1f5b50] text-white hover:bg-[#17463e]"
                        }`}
                      >
                        {isTarget ? "✓ Current Target" : "Set Target Leap"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
