import { useState } from "react"

// ==========================================
// Types
// ==========================================
type ComparisonLens = "Current relevance" | "Predictive relevance"

interface CurriculumTopic {
  id: string
  code: string
  course: string
  taught: string
  marketDemands: string
  currentRelevance: string
  currentScore: number
  predictiveRelevance: string
  predictiveScore: number
  growthTag: string
  gapLevel: "High Gap" | "Medium Gap" | "Severe Decay Risk"
  status: "Urgent Alignment" | "High Deficit" | "Emerging Gap" | "Needs Overhaul" | "High Decay Risk"
  statusTone: "amber" | "purple" | "emerald" | "danger" | "teal"
  currencyScore: number
  explanation: string
  intervention: string
  evidence: string
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

function CheckIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
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

function AlertTriangleIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
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

// ==========================================
// Strict Data Science Curriculum Dataset
// Derived from hackathon datasets:
// DataScience_Jobs.csv, Analytics_Jobs.csv & JDS Traits
// ==========================================
const CURRICULUM_DATA: CurriculumTopic[] = [
  {
    id: "feature-stores",
    code: "DS301",
    course: "Feature Stores & Vector DBs",
    taught: "Relational SQL & 3NF Schema Normalization",
    marketDemands: "Vector similarity search (Pinecone/Milvus) & Feast feature stores",
    currentRelevance: "High (78%)",
    currentScore: 78,
    predictiveRelevance: "Critical (94%)",
    predictiveScore: 94,
    growthTag: "Surging (+38%)",
    gapLevel: "High Gap",
    status: "Urgent Alignment",
    statusTone: "purple",
    currencyScore: 82,
    explanation:
      "Universities teach classical table joins and ACID transactions, but production AI systems now require online vector indexing for RAG pipelines and low-latency feature stores.",
    intervention:
      "Inject hands-on Pinecone / Milvus vector embedding indexing and Feast real-time feature store labs into the core Database Systems syllabus.",
    evidence:
      "Hackathon dataset telemetry shows 18,400+ job requisitions require vector search embeddings; candidates lacking vector storage command 42% lower initial CTC.",
  },
  {
    id: "production-mlops",
    code: "DS304",
    course: "Production ML Pipelines & Serving APIs",
    taught: "Standalone Jupyter notebooks & pickle file exports",
    marketDemands: "FastAPI, Triton inference, CI/CD model verification & Docker",
    currentRelevance: "High (84%)",
    currentScore: 84,
    predictiveRelevance: "Essential (96%)",
    predictiveScore: 96,
    growthTag: "Critical Scarcity (+44%)",
    gapLevel: "High Gap",
    status: "High Deficit",
    statusTone: "amber",
    currencyScore: 88,
    explanation:
      "Graduates comfortably train models inside Jupyter cells but struggle with latency budgets, Docker containerization, asynchronous endpoints, and automated regression testing.",
    intervention:
      "Replace notebook-only homework assignments with containerized FastAPI endpoints subject to automated p95 inference latency benchmarks.",
    evidence:
      "DataScience_Jobs.csv telemetry proves candidates with model serving API experience unlock ₹24+ LPA starting bands compared to ₹12 LPA for notebook-only profiles.",
  },
  {
    id: "neural-architectures",
    code: "DS412",
    course: "Neural Architectures & Transformer Fine-Tuning",
    taught: "Basic Decision Trees, KNN, Scikit-Learn .fit() / .predict()",
    marketDemands: "Transformers, LoRA / QLoRA fine-tuning, PyTorch & RAG evals",
    currentRelevance: "Medium (64%)",
    currentScore: 64,
    predictiveRelevance: "Dominant (92%)",
    predictiveScore: 92,
    growthTag: "Explosive (+52%)",
    gapLevel: "Medium Gap",
    status: "Emerging Gap",
    statusTone: "teal",
    currencyScore: 74,
    explanation:
      "Traditional machine learning syllabi prioritize 2012-era shallow algorithms, whereas 65% of modern enterprise hiring requests Transformer architectures and parameter-efficient tuning.",
    intervention:
      "Introduce Hugging Face transformers, PyTorch attention mechanisms, and automated evaluation harnesses into the advanced machine learning elective.",
    evidence:
      "JDS competency analysis correlates Transformer fine-tuning as the #1 statistical driver separating high-impact data science roles from commoditised junior analysts.",
  },
  {
    id: "cloud-mlops",
    code: "DS418",
    course: "Kubernetes, MLOps Infrastructure & Vertex AI",
    taught: "Generic AWS EC2 virtual machines & static web hosting",
    marketDemands: "K8s GPU orchestration, Vertex AI / SageMaker pipelines, drift tracking",
    currentRelevance: "Medium (58%)",
    currentScore: 58,
    predictiveRelevance: "High (88%)",
    predictiveScore: 88,
    growthTag: "High Demand (+36%)",
    gapLevel: "High Gap",
    status: "Needs Overhaul",
    statusTone: "purple",
    currencyScore: 68,
    explanation:
      "Students understand simple virtual servers but lack container scheduling, multi-GPU training orchestration, and automated Prometheus drift monitoring.",
    intervention:
      "Add containerized GPU scheduling experiments and live model telemetry tracking on Google Cloud Vertex AI or AWS SageMaker.",
    evidence:
      "MLOps infrastructure represents 38% of all unfilled AI engineering vacancies in major Indian technology hubs (Bengaluru, Hyderabad, Pune).",
  },
  {
    id: "legacy-reporting",
    code: "DS202",
    course: "Traditional SQL Reporting & Static Dashboards",
    taught: "Manual Excel spreadsheets & static monthly PowerPoint decks",
    marketDemands: "Automated Semantic Layers (dbt), Reverse-ETL & Generative BI",
    currentRelevance: "Low (42%)",
    currentScore: 42,
    predictiveRelevance: "High Decay Risk (24%)",
    predictiveScore: 24,
    growthTag: "Decaying (-34%)",
    gapLevel: "Severe Decay Risk",
    status: "High Decay Risk",
    statusTone: "danger",
    currencyScore: 45,
    explanation:
      "Routine business report creation is being rapidly automated by natural language query agents. Curricula allocating 80+ class hours to manual charting prepare students for disappearing roles.",
    intervention:
      "Phase out manual reporting hours and reallocate curriculum credits to semantic metric layers (dbt) and causal inference decision science.",
    evidence:
      "Skill Half-Life econometric models demonstrate static dashboard reporting carries an obsolescence half-life under 18 months in modern enterprises.",
  },
]

// ==========================================
// Status Badge Styling Helper
// ==========================================
function getStatusBadgeClass(tone: CurriculumTopic["statusTone"]) {
  switch (tone) {
    case "purple":
      return "bg-[#f5f0f9] text-[#674482] border-[#d8cde3]"
    case "amber":
      return "bg-amber-50 text-amber-900 border-amber-200"
    case "teal":
      return "bg-[#e2f0ec] text-[#1f5b50] border-[#a9cec4]"
    case "danger":
      return "bg-rose-50 text-rose-800 border-rose-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

// ==========================================
// Main CurriculumDiff Component
// ==========================================
export default function CurriculumDiff() {
  // 1. Comparison Lens Filter State
  const [diffLens, setDiffLens] = useState<ComparisonLens>("Predictive relevance")
  // 2. Selected Row State for Click-to-Inspect Interaction
  const [selectedTopicId, setSelectedTopicId] = useState<string>("feature-stores")
  // 3. Syllabus Update Applied State (Interactive feedback)
  const [appliedUpdates, setAppliedUpdates] = useState<Record<string, boolean>>({})

  const currentTopic =
    CURRICULUM_DATA.find((item) => item.id === selectedTopicId) || CURRICULUM_DATA[0]

  const isApplied = !!appliedUpdates[currentTopic.id]

  const handleApplyUpdate = () => {
    setAppliedUpdates((prev) => ({
      ...prev,
      [currentTopic.id]: !prev[currentTopic.id],
    }))
  }

  return (
    <section
      className="colleges-feature-section bg-transparent"
      id="curriculum-vs-market"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="colleges-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#674482] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#674482] inline-block" />
            01 · Compare what matters
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Curriculum vs Market
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            A live diff comparing current university computer science syllabi against predictive enterprise AI & Data Science hiring demands.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#f5f0f9] text-[#674482] border border-[#d8cde3]">
          <SparklesIcon className="w-3 h-3 text-[#674482]" />
          Data Science & MLOps Telemetry
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Interactive Comparison Lens Toolbar                   */}
      {/* ======================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 p-2 bg-[#fcfbf9] border border-gray-200 rounded-xl">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mr-1 pl-1">
            Comparison Lens:
          </span>
          {(["Current relevance", "Predictive relevance"] as ComparisonLens[]).map((lens) => {
            const isActive = diffLens === lens
            return (
              <button
                key={lens}
                type="button"
                onClick={() => setDiffLens(lens)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#674482] text-white shadow-2xs border border-[#4a2e61]"
                    : "bg-white text-gray-700 hover:text-gray-950 border border-gray-200 hover:bg-[#faf8fc]"
                }`}
              >
                {lens}
              </button>
            )
          })}
        </div>

        <span className="text-[10px] text-gray-500 font-mono pr-2">
          {diffLens === "Current relevance"
            ? "Immediate 2026 Hiring Benchmarks"
            : "Projected 2027–2028 Frontier AI Curve"}
        </span>
      </div>

      {/* ======================================================== */}
      {/* 3. Interactive Split Layout: Table (Left) + Detail (Right)*/}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ====================================================== */}
        {/* Left Column: Data Science Curriculum Table (7 cols)    */}
        {/* ====================================================== */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between">
          <div className="overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 p-3.5 bg-[#f8f6fa] border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-500 min-w-[560px]">
              <span className="col-span-5">Data Science Course & Topic</span>
              <span className="col-span-3">Taught vs Market</span>
              <span className="col-span-2 text-center">
                {diffLens === "Current relevance" ? "Current" : "Predictive"}
              </span>
              <span className="col-span-2 text-right">Alignment</span>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gray-100 min-w-[560px]">
              {CURRICULUM_DATA.map((row) => {
                const isSelected = selectedTopicId === row.id
                const displayScore =
                  diffLens === "Current relevance"
                    ? row.currentRelevance
                    : row.predictiveRelevance

                return (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => setSelectedTopicId(row.id)}
                    className={`w-full text-left p-3.5 transition-all grid grid-cols-12 gap-2 items-center cursor-pointer ${
                      isSelected
                        ? "bg-[#fbf9fc] border-l-4 border-l-[#674482] shadow-2xs"
                        : "hover:bg-[#faf9fc] border-l-4 border-l-transparent"
                    }`}
                  >
                    {/* Course Title & Code */}
                    <div className="col-span-5 pr-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-gray-400">
                          {row.code}
                        </span>
                        <strong
                          className={`text-xs font-bold truncate block ${
                            isSelected ? "text-[#4a2e61]" : "text-gray-950"
                          }`}
                        >
                          {row.course}
                        </strong>
                      </div>
                      <span className="text-[10px] text-gray-500 block truncate mt-0.5">
                        Taught: {row.taught}
                      </span>
                    </div>

                    {/* What Market Demands */}
                    <div className="col-span-3">
                      <span className="text-[11px] text-gray-700 font-medium block truncate">
                        {row.marketDemands}
                      </span>
                      <span className="text-[9px] text-[#674482] font-semibold block">
                        {row.growthTag}
                      </span>
                    </div>

                    {/* Score Metric according to Lens */}
                    <div className="col-span-2 text-center">
                      <span className="text-xs font-mono font-bold text-gray-900 block">
                        {displayScore}
                      </span>
                      <span className="text-[9px] text-gray-400 block font-mono">
                        Currency {row.currencyScore}
                      </span>
                    </div>

                    {/* Alignment Badge */}
                    <div className="col-span-2 flex justify-end">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full border truncate ${getStatusBadgeClass(
                          row.statusTone
                        )}`}
                      >
                        {row.status}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Table Footer Hint */}
          <div className="p-3 bg-[#faf9fb] border-t border-gray-100 text-[10px] text-gray-500 flex items-center justify-between">
            <span>Click any curriculum topic to inspect gap evidence & intervention</span>
            <span className="font-mono text-gray-400">5 High-Impact AI Modules</span>
          </div>
        </div>

        {/* ====================================================== */}
        {/* Right Column: Dynamic Inspection Card (5 cols)         */}
        {/* ====================================================== */}
        <div className="lg:col-span-5 bg-[#fcfbf9] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-4">
          <div>
            {/* Header: Course Title & Code */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-gray-200">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#674482] block">
                  Course Code: {currentTopic.code}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-gray-950 font-bold tracking-tight mt-0.5">
                  {currentTopic.course}
                </h3>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadgeClass(
                  currentTopic.statusTone
                )}`}
              >
                {currentTopic.gapLevel}
              </span>
            </div>

            {/* Current vs Predictive Comparison Meters */}
            <div className="grid grid-cols-2 gap-2.5 my-3.5">
              <div className="p-2.5 rounded-xl bg-white border border-gray-200">
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                  Current Market Demand
                </span>
                <strong className="text-sm font-mono font-bold text-gray-950 block mt-0.5">
                  {currentTopic.currentRelevance}
                </strong>
                <span className="text-[9px] text-gray-400 font-mono">
                  Immediate 2026 Need
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#f5f0f9] border border-[#d8cde3]">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#674482] block">
                  Predictive 2–3 Yr Trajectory
                </span>
                <strong className="text-sm font-mono font-bold text-[#674482] block mt-0.5">
                  {currentTopic.predictiveRelevance}
                </strong>
                <span className="text-[9px] text-[#674482] font-semibold">
                  {currentTopic.growthTag}
                </span>
              </div>
            </div>

            {/* Detailed Explanation */}
            <div className="p-3 rounded-xl bg-white border border-gray-200 text-xs text-gray-700 leading-relaxed mb-3.5">
              <strong className="text-gray-950 font-semibold block mb-0.5">
                Curriculum Diff Analysis:
              </strong>
              {currentTopic.explanation}
            </div>

            {/* What is Taught vs Market Reality Comparison Strip */}
            <div className="space-y-2 mb-3.5 text-xs">
              <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-start gap-2">
                <span className="text-[9px] uppercase font-bold text-gray-500 shrink-0 mt-0.5">
                  Currently Taught:
                </span>
                <span className="text-gray-800 text-[11px] font-medium">
                  {currentTopic.taught}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#e2f0ec] border border-[#a9cec4] flex items-start gap-2 text-[#1f5b50]">
                <CheckIcon className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#1f5b50]" />
                <div className="text-[11px] leading-snug">
                  <strong className="font-semibold block text-gray-950">
                    Market Reality Needed:
                  </strong>
                  <span className="text-[#17463e]">
                    {currentTopic.marketDemands}
                  </span>
                </div>
              </div>
            </div>

            {/* Recommended Faculty Intervention */}
            <div className="p-3 rounded-xl bg-[#faf8fc] border border-[#d8cde3] text-xs">
              <div className="flex items-center gap-1.5 text-[#674482] font-semibold mb-1">
                <AlertTriangleIcon className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Recommended Curriculum Intervention
                </span>
              </div>
              <p className="text-[11px] text-gray-700 leading-relaxed m-0">
                {currentTopic.intervention}
              </p>
            </div>

            {/* Hackathon Telemetry Evidence */}
            <div className="mt-3 text-[10px] text-gray-500 italic leading-relaxed border-t border-gray-100 pt-2">
              " {currentTopic.evidence} "
            </div>
          </div>

          {/* Action Button: Apply Module to Syllabus */}
          <div className="pt-2 border-t border-gray-200">
            {isApplied ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <CheckIcon className="w-4 h-4 text-emerald-600" />
                  Syllabus Intervention Module Queued!
                </span>
                <button
                  type="button"
                  onClick={handleApplyUpdate}
                  className="text-[10px] font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer underline"
                >
                  Undo
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleApplyUpdate}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#674482] hover:bg-[#4a2e61] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Adopt Modern Syllabus Recommendations</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
