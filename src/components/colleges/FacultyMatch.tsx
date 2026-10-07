import { useState, useMemo } from "react"

// ==========================================
// Types
// ==========================================
interface FacultyExpert {
  id: string
  name: string
  initials: string
  role: string
  company: string
  experience: string
  education: string
  avatarColor: string
  domainCategory: "mlops" | "data" | "nlp" | "quant"
  matchingGap: {
    gapTitle: string
    requiredExpertise: string
    syllabusUnit: string
  }
  skillsToTeach: {
    name: string
    level: "Advanced" | "Core" | "Emerging"
    desc: string
  }[]
  matchScore: number
  engagementFormat: string
  compensation: string
  whyThisMatch: string
  verificationBadge: string
}

// ==========================================
// 5 Realistic Industry Faculty Experts Data
// ==========================================
const FACULTY_DIRECTORY: FacultyExpert[] = [
  {
    id: "rajesh-sharma",
    name: "Dr. Rajesh Sharma",
    initials: "RS",
    role: "Principal AI Scientist",
    company: "Fractal Analytics",
    experience: "14 years industry experience",
    education: "Ph.D. IIT Bombay • Ex-IBM Research",
    avatarColor: "from-[#6f5b91] to-[#80698f]",
    domainCategory: "mlops",
    matchingGap: {
      gapTitle: "Production ML Systems",
      requiredExpertise: "Distributed Training · Model Architecture · TensorRT",
      syllabusUnit: "CS-402: Scalable Enterprise AI (Semester VII)",
    },
    skillsToTeach: [
      { name: "Distributed PyTorch", level: "Advanced", desc: "Multi-GPU DDP training clusters" },
      { name: "Production ML Systems", level: "Core", desc: "Real-time inference microservices" },
      { name: "TensorRT Acceleration", level: "Advanced", desc: "Sub-5ms model quantization & CUDA kernels" },
      { name: "Feature Stores", level: "Core", desc: "Feast / Hopsworks offline-online sync" },
      { name: "Latency Profiling", level: "Emerging", desc: "P99 SLA monitoring under high concurrency" },
    ],
    matchScore: 98,
    engagementFormat: "Weekend Masterclass • 8 Hours / Semester",
    compensation: "Honorarium sponsored via Fractal University Alliance",
    whyThisMatch:
      "Directly addresses the critical gap between theoretical gradient descent and high-concurrency production inference. Fractal's deployment case studies bridge student portfolios with top placement criteria.",
    verificationBadge: "Fractal AI Labs Fellow",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    initials: "PN",
    role: "MLOps Platform Lead",
    company: "Swiggy",
    experience: "10 years industry experience",
    education: "B.Tech BITS Pilani • Ex-Amazon AWS",
    avatarColor: "from-[#5d427d] to-[#6f5b91]",
    domainCategory: "mlops",
    matchingGap: {
      gapTitle: "Deployment & MLOps Infrastructure",
      requiredExpertise: "CI/CD for ML · Drift Monitoring · Kubernetes",
      syllabusUnit: "CS-308: Cloud Computing & Systems (Semester VI)",
    },
    skillsToTeach: [
      { name: "Kubeflow Pipelines", level: "Advanced", desc: "Automated DAG training workflows" },
      { name: "Drift Telemetry", level: "Core", desc: "EvidentlyAI covariate shift detection" },
      { name: "CI/CD for Models", level: "Core", desc: "GitHub Actions automated regression tests" },
      { name: "Triton Server", level: "Advanced", desc: "Dynamic batching on production clusters" },
      { name: "Data Version Control", level: "Emerging", desc: "DVC lineage tracking for regulated data" },
    ],
    matchScore: 96,
    engagementFormat: "Bi-weekly Lab Mentorship • 12 Hours",
    compensation: "Industry Practitioner CSR Grant",
    whyThisMatch:
      "Architected Swiggy's real-time ETA and dispatch models handling 40,000 orders/minute. Solves the college's biggest curriculum lag by introducing hands-on Docker and Kubernetes telemetry.",
    verificationBadge: "Production Systems Leader",
  },
  {
    id: "ankit-verma",
    name: "Ankit Verma",
    initials: "AV",
    role: "Senior Data Architect",
    company: "EXL Service",
    experience: "12 years industry experience",
    education: "M.Tech IIT Kharagpur • Ex-Mu Sigma",
    avatarColor: "from-[#4e3b6e] to-[#614b82]",
    domainCategory: "data",
    matchingGap: {
      gapTitle: "Modern Data Stack & Warehousing",
      requiredExpertise: "dbt Semantic Layer · Snowflake · PySpark Streaming",
      syllabusUnit: "CS-204: Database Management Systems (Semester IV)",
    },
    skillsToTeach: [
      { name: "dbt Semantic Modeling", level: "Advanced", desc: "Modular SQL transformation pipelines" },
      { name: "Snowflake Lakehouse", level: "Core", desc: "Zero-copy cloning & columnar analytics" },
      { name: "PySpark Streaming", level: "Advanced", desc: "Structured real-time stream processing" },
      { name: "Data Quality Testing", level: "Core", desc: "Great Expectations schema validation" },
      { name: "Event Streaming (Kafka)", level: "Emerging", desc: "Pub/Sub message brokers for telemetry" },
    ],
    matchScore: 94,
    engagementFormat: "Full-day Saturday Bootcamp • 6 Hours",
    compensation: "Industry Advisory Honorarium",
    whyThisMatch:
      "Transforms outdated relational SQL coursework into modern lakehouse architectures. Provides students with immediate competence in dbt and Snowflake, the two most sought-after data engineering qualifications.",
    verificationBadge: "Enterprise Cloud Architect",
  },
  {
    id: "neha-gupta",
    name: "Neha Gupta",
    initials: "NG",
    role: "Lead NLP Researcher",
    company: "Microsoft India R&D",
    experience: "9 years industry experience",
    education: "M.Tech IISc Bangalore",
    avatarColor: "from-[#6a538c] to-[#7f66a6]",
    domainCategory: "nlp",
    matchingGap: {
      gapTitle: "Generative AI & Transformer Fine-Tuning",
      requiredExpertise: "Subword Tokenization · PEFT/LoRA · RAG Pipelines",
      syllabusUnit: "CS-415: Natural Language Processing (Semester VII)",
    },
    skillsToTeach: [
      { name: "LoRA / PEFT Fine-Tuning", level: "Advanced", desc: "Parameter-efficient foundation model tuning" },
      { name: "RAG Architecture", level: "Core", desc: "Hybrid dense-sparse retrieval pipelines" },
      { name: "Vector Databases", level: "Core", desc: "Milvus / Qdrant indexing & HNSW graphs" },
      { name: "Subword Tokenization", level: "Advanced", desc: "Byte-Pair Encoding for Indic languages" },
      { name: "LLM Guardrails", level: "Emerging", desc: "Hallucination mitigation & safety alignment" },
    ],
    matchScore: 97,
    engagementFormat: "4-Part Guest Lecture Series • 8 Hours",
    compensation: "Microsoft Academic Outreach Program",
    whyThisMatch:
      "Co-developed Indic foundation language models. Equips seniors with modern transformer engineering and retrieval-augmented generation (RAG) rather than obsolete bag-of-words heuristics.",
    verificationBadge: "Applied Research Scientist",
  },
  {
    id: "vikramaditya-sen",
    name: "Vikramaditya Sen",
    initials: "VS",
    role: "VP, Quantitative Risk Analytics",
    company: "Morgan Stanley",
    experience: "15 years industry experience",
    education: "PGDM IIM Calcutta • B.Stat Indian Statistical Institute",
    avatarColor: "from-[#574075] to-[#715494]",
    domainCategory: "quant",
    matchingGap: {
      gapTitle: "Statistical Modeling & Algorithmic Risk",
      requiredExpertise: "Stochastic Processes · Extreme Value Theory · Python/SAS",
      syllabusUnit: "MATH-301: Probability & Applied Statistics (Semester V)",
    },
    skillsToTeach: [
      { name: "Monte Carlo Simulation", level: "Advanced", desc: "Multivariate geometric Brownian paths" },
      { name: "Statistical Risk Modeling", level: "Core", desc: "Value-at-Risk (VaR) & Expected Shortfall" },
      { name: "Time-Series Econometrics", level: "Core", desc: "GARCH volatility modeling & cointegration" },
      { name: "Regulatory Stress Testing", level: "Advanced", desc: "Basel III capital adequacy simulations" },
      { name: "Backtesting Frameworks", level: "Emerging", desc: "Walk-forward validation of quantitative alphas" },
    ],
    matchScore: 93,
    engagementFormat: "Executive Guest Lecture • 6 Hours",
    compensation: "Morgan Stanley FinTech CSR",
    whyThisMatch:
      "Bridges the university's pure mathematics curriculum with quantitative finance workflows. Connects high-aptitude statistics students directly with Tier-1 investment bank recruiting pipelines.",
    verificationBadge: "Financial Engineering Mentor",
  },
]

// ==========================================
// Embedded Clean SVG Icons
// ==========================================
function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function CheckCircleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function SparkleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  )
}

function UserCheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm8 4l2 2 4-4"
      />
    </svg>
  )
}

function BuildingIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  )
}

function AcademicCapIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5"
      />
    </svg>
  )
}

// ==========================================
// Main FacultyMatch Component
// ==========================================
export default function FacultyMatch() {
  // 1. Local state management
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>("rajesh-sharma")
  const [domainFilter, setDomainFilter] = useState<string>("all")
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number | null>(null)

  // Track invitation confirmation per faculty ID
  const [invitedFaculty, setInvitedFaculty] = useState<Record<string, boolean>>({
    "rajesh-sharma": false,
    "priya-nair": false,
    "ankit-verma": false,
    "neha-gupta": false,
    "vikramaditya-sen": false,
  })

  // Filtered Faculty List
  const filteredFaculty = useMemo(() => {
    if (domainFilter === "all") return FACULTY_DIRECTORY
    return FACULTY_DIRECTORY.filter((f) => f.domainCategory === domainFilter)
  }, [domainFilter])

  // Current Selected Faculty
  const currentFaculty = useMemo(() => {
    return (
      FACULTY_DIRECTORY.find((f) => f.id === selectedFacultyId) ||
      FACULTY_DIRECTORY[0]
    )
  }, [selectedFacultyId])

  // Handle Invitation Click
  const handleToggleInvite = (id: string) => {
    setInvitedFaculty((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const isCurrentInvited = Boolean(invitedFaculty[currentFaculty.id])
  const totalInvitedCount = Object.values(invitedFaculty).filter(Boolean).length

  return (
    <section
      className="colleges-feature-section faculty-section relative text-[#eeeadf] rounded-2xl overflow-hidden border border-[#594c6c]/60 shadow-xl"
      id="guest-faculty-match"
      style={{
        background: "linear-gradient(175deg, #1f162c 0%, #261c36 40%, #1d142b 100%)",
        scrollMarginTop: "135px",
      }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Context Heading                             */}
      {/* ======================================================== */}
      <div className="p-5 sm:p-6 pb-4 border-b border-[#594c6c]/40 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#3d2b56] text-[#e5dcf2] border border-[#7d6a99]">
              <SparkleIcon className="w-3 h-3 text-[#b8a5ce]" />
              04 · Practitioner Network · Verified Gap Bridge
            </span>
            <span className="text-xs text-[#bcaecc]">|</span>
            <span className="text-[11px] text-[#d5ccde] font-medium tracking-wide">
              Executive Industry Faculty Hub
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-white tracking-tight">
            Guest-Faculty Match Hub
          </h2>
          <p className="text-xs sm:text-sm text-[#bcaecc] mt-1 max-w-2xl leading-relaxed">
            Opted-in senior industry leaders ready to teach emerging curriculum gaps. Direct matching based on institutional diff telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#2d203f]/80 px-3 py-1.5 rounded-xl border border-[#594c6c]">
            <span className="w-2 h-2 rounded-full bg-[#a7e8bd] animate-pulse" />
            <span className="text-xs font-semibold text-[#e5dcf2]">
              {FACULTY_DIRECTORY.length} Vetted Experts Available
            </span>
          </div>
          {totalInvitedCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-[#4a3666] text-[#d9cce8] border border-[#7d6a99]">
              <CheckCircleIcon className="w-3.5 h-3.5 text-[#a7e8bd]" />
              {totalInvitedCount} Invited
            </span>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Gap Bridge Banner (Institutional Diff Alignment)     */}
      {/* ======================================================== */}
      <div className="px-5 sm:px-6 py-3.5 bg-[#2d203f]/60 border-b border-[#594c6c]/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#bcaecc]">
          <span className="p-1 rounded bg-[#3d2b56] text-[#b8a5ce]">
            <AcademicCapIcon className="w-4 h-4" />
          </span>
          <span className="font-medium">Active Curriculum Gap:</span>
          <strong className="text-white font-semibold">
            {currentFaculty.matchingGap.gapTitle}
          </strong>
        </div>

        <div className="flex items-center gap-2 text-[#d5ccde] text-[11px]">
          <span className="hidden sm:inline text-[#bcaecc]">Target Syllabus:</span>
          <span className="px-2 py-0.5 rounded bg-[#382f49] text-[#e5dcf2] font-mono border border-[#594c6c]/60">
            {currentFaculty.matchingGap.syllabusUnit}
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Filter Navigation Pills                               */}
      {/* ======================================================== */}
      <div className="px-5 sm:px-6 pt-4 pb-2 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#bcaecc] mr-1">
          Domain:
        </span>
        {[
          { key: "all", label: "All Experts (5)" },
          { key: "mlops", label: "MLOps & Systems (2)" },
          { key: "data", label: "Data Architecture (1)" },
          { key: "nlp", label: "Generative AI & NLP (1)" },
          { key: "quant", label: "Quantitative Risk (1)" },
        ].map((tab) => (
          <button
            type="button"
            key={tab.key}
            onClick={() => setDomainFilter(tab.key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
              domainFilter === tab.key
                ? "bg-[#b8a5ce] text-[#1f162c] font-semibold shadow-sm"
                : "bg-[#2d203f] text-[#d5ccde] hover:bg-[#3d2b56] border border-[#594c6c]/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ======================================================== */}
      {/* 4. Main Two-Column Directory & Detailed Panel            */}
      {/* ======================================================== */}
      <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (5 cols): Compact Faculty Directory List */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[11px] text-[#bcaecc] px-1 mb-0.5">
            <span className="font-semibold uppercase tracking-wider">
              Matched Practitioners ({filteredFaculty.length})
            </span>
            <span>Select to inspect qualification</span>
          </div>

          <div className="space-y-2">
            {filteredFaculty.map((faculty) => {
              const isSelected = faculty.id === selectedFacultyId
              const isInvited = Boolean(invitedFaculty[faculty.id])

              return (
                <button
                  type="button"
                  key={faculty.id}
                  onClick={() => {
                    setSelectedFacultyId(faculty.id)
                    setSelectedSkillIndex(null)
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer relative flex items-start gap-3.5 ${
                    isSelected
                      ? "bg-[#3d2b56] border-[#b8a5ce] shadow-md ring-1 ring-[#b8a5ce]/40"
                      : "bg-[#2d203f]/90 border-[#594c6c]/60 hover:bg-[#382f49] hover:border-[#7d6a99]"
                  }`}
                >
                  {/* Avatar Circle */}
                  <div
                    className={`w-11 h-11 rounded-full shrink-0 flex items-center justify-center font-serif text-sm font-semibold text-white shadow-sm bg-gradient-to-br ${faculty.avatarColor} border border-[#7d6a99]/60`}
                  >
                    {faculty.initials}
                  </div>

                  {/* Card Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1.5 mb-0.5">
                      <h4
                        className={`text-xs font-semibold truncate ${
                          isSelected ? "text-white" : "text-[#e5dcf2]"
                        }`}
                      >
                        {faculty.name}
                      </h4>
                      <span className="text-[10px] font-mono font-bold text-[#a7e8bd] shrink-0">
                        {faculty.matchScore}% match
                      </span>
                    </div>

                    <p className="text-[11px] font-medium text-[#d9cce8] truncate">
                      {faculty.role}
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] text-[#bcaecc] mt-1">
                      <span className="font-semibold text-white">
                        {faculty.company}
                      </span>
                      <span>•</span>
                      <span>{faculty.experience.split(" ")[0]} yrs exp</span>
                    </div>

                    {/* Gap Match Pill */}
                    <div className="mt-2 flex items-center justify-between gap-1">
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[#1f162c]/80 text-[#d5ccde] border border-[#594c6c]/50 truncate">
                        Gap: {faculty.matchingGap.gapTitle}
                      </span>
                      {isInvited && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#a7e8bd] bg-[#1f162c]/90 px-1.5 py-0.5 rounded border border-[#a7e8bd]/40 shrink-0">
                          <CheckCircleIcon className="w-2.5 h-2.5" />
                          Invited
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Column (7 cols): Interactive Detailed Profile Panel */}
        <div className="lg:col-span-7 bg-[#2d203f] border border-[#594c6c] rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
          {/* 1. Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#594c6c]/40">
            <div className="flex items-start sm:items-center gap-3.5">
              <div
                className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center font-serif text-lg font-bold text-white shadow-md bg-gradient-to-br ${currentFaculty.avatarColor} border border-[#7d6a99]`}
              >
                {currentFaculty.initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-serif font-semibold text-white leading-tight">
                    {currentFaculty.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-[#4a3666] text-[#e5dcf2] border border-[#7d6a99]">
                    <CheckCircleIcon className="w-3 h-3 text-[#a7e8bd]" />
                    Vetted Fellow
                  </span>
                </div>
                <p className="text-xs font-medium text-[#d9cce8] mt-0.5">
                  {currentFaculty.role} <span className="text-[#bcaecc]">at</span>{" "}
                  <strong className="text-white">{currentFaculty.company}</strong>
                </p>
                <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#bcaecc] mt-1">
                  <span>{currentFaculty.experience}</span>
                  <span>•</span>
                  <span>{currentFaculty.education}</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 bg-[#1f162c] p-2.5 px-3.5 rounded-xl border border-[#594c6c]/60">
              <span className="text-[9px] uppercase tracking-wider text-[#bcaecc]">
                Curriculum Fit
              </span>
              <strong className="text-base font-mono font-bold text-[#a7e8bd]">
                {currentFaculty.matchScore}%
              </strong>
            </div>
          </div>

          {/* 2. Bridged Institutional Gap Box */}
          <div className="p-3.5 rounded-xl bg-[#1f162c]/80 border border-[#594c6c]/70 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b8a5ce] flex items-center gap-1">
                <AcademicCapIcon className="w-3.5 h-3.5" />
                Target Institutional Deficit Solved
              </span>
              <span className="text-[10px] text-[#bcaecc] font-mono">
                {currentFaculty.matchingGap.syllabusUnit.split(":")[0]}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-[#594c6c]/30 text-[11px]">
              <div>
                <small className="block text-[9px] uppercase tracking-wider text-[#bcaecc]">Emerging Gap</small>
                <strong className="block text-white mt-0.5">{currentFaculty.matchingGap.gapTitle}</strong>
              </div>
              <div className="sm:col-span-2">
                <small className="block text-[9px] uppercase tracking-wider text-[#bcaecc]">Industry Scope Qualified to Deliver</small>
                <strong className="block text-[#e5dcf2] mt-0.5 font-medium">{currentFaculty.matchingGap.requiredExpertise}</strong>
              </div>
            </div>
          </div>

          {/* 3. Interactive Skills They Can Teach */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#d9cce8]">
                Skills & Modules They Can Teach ({currentFaculty.skillsToTeach.length})
              </span>
              <span className="text-[10px] text-[#bcaecc]">
                Click skill to preview module scope
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {currentFaculty.skillsToTeach.map((skill, idx) => {
                const isSkillSelected = selectedSkillIndex === idx

                return (
                  <button
                    type="button"
                    key={skill.name}
                    onClick={() =>
                      setSelectedSkillIndex(isSkillSelected ? null : idx)
                    }
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                      isSkillSelected
                        ? "bg-[#b8a5ce] text-[#1f162c] font-semibold shadow-sm"
                        : "bg-[#382f49] text-[#e5dcf2] hover:bg-[#4a3666] border border-[#594c6c]/60"
                    }`}
                  >
                    <span>{skill.name}</span>
                    <span
                      className={`text-[9px] px-1 rounded ${
                        isSkillSelected
                          ? "bg-[#1f162c] text-[#e5dcf2]"
                          : "bg-[#1f162c]/60 text-[#bcaecc]"
                      }`}
                    >
                      {skill.level}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Selected Skill Detail Dropdown Callout */}
            {selectedSkillIndex !== null && currentFaculty.skillsToTeach[selectedSkillIndex] && (
              <div className="mt-2.5 p-2.5 rounded-lg bg-[#382f49] border border-[#7d6a99] text-xs text-[#e5dcf2] flex items-center justify-between gap-2 animate-fade-in">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b8a5ce] mr-2">
                    Module Syllabus:
                  </span>
                  <span>{currentFaculty.skillsToTeach[selectedSkillIndex].desc}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedSkillIndex(null)}
                  className="text-[10px] text-[#bcaecc] hover:text-white shrink-0 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
            )}
          </div>

          {/* 4. Why This Match (Institutional Impact) */}
          <div className="p-3.5 rounded-xl bg-[#382f49]/70 border border-[#594c6c]/60 flex items-start gap-2.5 text-xs text-[#d5ccde]">
            <SparkleIcon className="w-4 h-4 text-[#b8a5ce] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#e5dcf2] text-[11px] font-semibold mb-0.5">
                Institutional Justification
              </strong>
              <p className="leading-relaxed text-[11px]">{currentFaculty.whyThisMatch}</p>
            </div>
          </div>

          {/* 5. Engagement Format & Working Invite Action */}
          <div className="pt-3 border-t border-[#594c6c]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs">
              <span className="block text-[9px] uppercase tracking-wider text-[#bcaecc]">
                Proposed Engagement Mode
              </span>
              <strong className="text-white text-xs block mt-0.5">
                {currentFaculty.engagementFormat}
              </strong>
            </div>

            {/* Invite Button with Working Success State */}
            {isCurrentInvited ? (
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-2 rounded-xl bg-[#204030] border border-[#a7e8bd]/60 text-[#a7e8bd] text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Invitation Dispatched to Dean</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleInvite(currentFaculty.id)}
                  className="text-[11px] text-[#bcaecc] hover:text-[#e8b77f] underline cursor-pointer"
                  title="Withdraw invitation"
                >
                  Undo
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleToggleInvite(currentFaculty.id)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#b8a5ce] hover:bg-[#c9b7de] text-[#1f162c] shadow-md transition-all duration-150 cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
              >
                <UserCheckIcon className="w-4 h-4 text-[#1f162c]" />
                <span>Invite to Teach This Semester</span>
                <ArrowRightIcon className="w-3.5 h-3.5 text-[#1f162c]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
