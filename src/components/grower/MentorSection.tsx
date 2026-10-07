import { useState } from "react"

// ==========================================
// Types
// ==========================================
interface MentorProfile {
  id: string
  name: string
  avatarInitial: string
  role: string
  company: string
  experience: string
  timeline: string[]
  skills: string[]
  startingPoint: string
  matchReason: string
  adviceQuote: string
  coffeeChatQuestions: string[]
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

function UserGroupIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  )
}

function MessageSquareIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  )
}

// ==========================================
// Verified Mentor Profiles Database
// Derived from hackathon career trajectory datasets
// ==========================================
const MENTORS: MentorProfile[] = [
  {
    id: "mentor-rajesh",
    name: "Dr. Rajesh Sharma",
    avatarInitial: "R",
    role: "Senior ML Engineer",
    company: "Fractal AI · Enterprise Platforms",
    experience: "7 Years Exp · 3 Years Ahead of You",
    timeline: ["Backend Engineer", "MLOps Engineer", "Senior ML Engineer"],
    skills: ["Python", "MLOps", "Model Systems", "Triton Server", "PyTorch"],
    startingPoint: "Started as a Python backend developer building microservices.",
    matchReason: "Three years ahead on the exact backend-to-ML transition you are considering.",
    adviceQuote:
      "The hardest shift was moving from deterministic APIs to evaluating probabilistic model accuracy. Focus on learning eval harnesses and low-latency Triton serving.",
    coffeeChatQuestions: [
      "Which backend architectural skills transferred most directly into production MLOps?",
      "How did you build credibility in statistical model evaluation without a PhD?",
      "What concrete project convinced leadership you were ready for Senior ML scope?",
    ],
  },
  {
    id: "mentor-priya",
    name: "Priya Nair",
    avatarInitial: "P",
    role: "Staff Data Engineer",
    company: "Swiggy Core Infrastructure",
    experience: "8 Years Exp · 4 Years Ahead of You",
    timeline: ["Software Developer", "Data Engineer", "Staff Data Engineer"],
    skills: ["SQL", "Data Platforms", "Apache Spark", "Airflow", "Iceberg"],
    startingPoint: "Started with relational databases, APIs, and batch SQL scripts.",
    matchReason: "Exemplifies how to turn general software skills into deep distributed data platform ownership.",
    adviceQuote:
      "Learn distributed query partitioning early. Optimizing compute and storage cost at petabyte scale is what separates Staff engineers from mid-level coders.",
    coffeeChatQuestions: [
      "How do you evaluate when a company actually needs streaming vs batch pipelines?",
      "What data contracts or schemas do you insist on when working with product teams?",
      "What is the single highest-impact project you delivered to reach Staff tier?",
    ],
  },
  {
    id: "mentor-ankit",
    name: "Ankit Verma",
    avatarInitial: "A",
    role: "AI Solutions Lead",
    company: "EXL Enterprise Architecture",
    experience: "6 Years Exp · 3 Years Ahead of You",
    timeline: ["Backend Developer", "Solutions Engineer", "AI Solutions Lead"],
    skills: ["System Design", "Enterprise Discovery", "AI Products", "Cloud Security"],
    startingPoint: "Started as a full-stack engineer and transitioned into customer pre-sales.",
    matchReason: "A great match if you want high-compensation technical breadth combined with commercial and boardroom strategy.",
    adviceQuote:
      "The highest compensation leverage comes from translating complex AI trade-offs into executive EBITDA impact without compromising architectural integrity.",
    coffeeChatQuestions: [
      "How did you make the jump from behind-the-scenes engineering to client-facing discovery?",
      "How do you structure technical proofs-of-concept to close enterprise enterprise accounts?",
      "What is the day-to-day balance between hands-on prototyping and executive briefings?",
    ],
  },
]

// ==========================================
// Main MentorSection Component
// ==========================================
export default function MentorSection() {
  const [selectedMentorId, setSelectedMentorId] = useState<string>("mentor-rajesh")
  const [requestedConnects, setRequestedConnects] = useState<Record<string, boolean>>({})

  const currentMentor =
    MENTORS.find((m) => m.id === selectedMentorId) || MENTORS[0]

  const isConnected = !!requestedConnects[currentMentor.id]

  const handleToggleConnect = () => {
    setRequestedConnects((prev) => ({
      ...prev,
      [currentMentor.id]: !prev[currentMentor.id],
    }))
  }

  return (
    <section
      className="grower-feature-section bg-transparent"
      id="future-you-mentor"
      style={{ scrollMarginTop: "130px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="grower-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#1f5b50] uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1f5b50] inline-block" />
            05 · Learn from three years ahead
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Future-You Mentor
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            A targeted 20-minute discussion with someone 3–5 years ahead on your exact transition path.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4]">
          <UserGroupIcon className="w-3 h-3 text-[#1f5b50]" />
          Verified Practitioner Profiles
        </span>
      </div>

      {/* ======================================================== */}
      {/* 2. Interactive Workspace (Clean 2-Column Split)          */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* ====================================================== */}
        {/* Left Column: Selectable Mentor List (4 cols)           */}
        {/* ====================================================== */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Select Verified Mentor
            </span>
            <span className="text-[10px] text-gray-400 font-mono">
              3 Active Matches
            </span>
          </div>

          {MENTORS.map((m) => {
            const isSelected = selectedMentorId === m.id
            const hasRequested = !!requestedConnects[m.id]

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMentorId(m.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? "bg-[#1f5b50] border-[#17463e] text-white shadow-xs"
                    : "bg-white border-gray-200 text-gray-800 hover:border-gray-300 hover:bg-[#faf9f6]"
                }`}
              >
                {/* Avatar Initial Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-base font-bold shrink-0 ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#e2f0ec] text-[#1f5b50]"
                  }`}
                >
                  {m.avatarInitial}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <strong
                      className={`text-xs font-bold truncate ${
                        isSelected ? "text-white" : "text-gray-950"
                      }`}
                    >
                      {m.role}
                    </strong>
                    {hasRequested && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    )}
                  </div>
                  <div
                    className={`text-[11px] truncate ${
                      isSelected ? "text-[#d0e5df]" : "text-gray-600"
                    }`}
                  >
                    {m.name} · {m.company.split("·")[0]}
                  </div>
                  <span
                    className={`text-[10px] font-mono mt-0.5 block ${
                      isSelected ? "text-[#a9cec4]" : "text-gray-400"
                    }`}
                  >
                    {m.experience.split("·")[1]}
                  </span>
                </div>
              </button>
            )
          })}

          {/* Supportive Note */}
          <div className="p-3 rounded-xl bg-[#f7f5f0] border border-[#e8e4dc] text-[11px] text-gray-600 mt-auto">
            <strong className="text-gray-950 block mb-0.5">
              100% Peer Discussion
            </strong>
            No sales pitches. Mentors share verified transition regrets and high-leverage skill moves.
          </div>
        </div>

        {/* ====================================================== */}
        {/* Right Column: Detailed Mentor Profile Card (8 cols)    */}
        {/* ====================================================== */}
        <div className="lg:col-span-8 bg-[#fcfbf9] border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col justify-between gap-5">
          <div>
            {/* Header: Mentor Info & Match Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1f5b50] text-white flex items-center justify-center font-serif text-lg font-bold">
                  {currentMentor.avatarInitial}
                </div>
                <div>
                  <h3 className="text-xl font-serif text-gray-950 font-bold tracking-tight">
                    {currentMentor.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    <strong className="text-gray-950">{currentMentor.role}</strong> at {currentMentor.company}
                  </p>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {currentMentor.experience}
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4] px-2.5 py-1 rounded-full">
                <CheckIcon className="w-3 h-3 text-[#1f5b50]" />
                Transition Match
              </span>
            </div>

            {/* Career Pathway Steps (Timeline) */}
            <div className="mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Career Progression Pathway
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentMentor.timeline.map((step, idx) => (
                  <div
                    key={step}
                    className="p-2.5 rounded-xl bg-white border border-gray-200 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-gray-400 block">
                        Step 0{idx + 1}
                      </span>
                      <strong className="text-xs text-gray-950 block mt-0.5">
                        {step}
                      </strong>
                    </div>
                    {idx < currentMentor.timeline.length - 1 && (
                      <ArrowRightIcon className="w-3.5 h-3.5 text-gray-400 hidden sm:block shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Starting Point & Match Rationale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
              <div className="p-3 rounded-xl bg-white border border-gray-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Similar Starting Point:
                </span>
                <p className="text-gray-700 m-0">
                  {currentMentor.startingPoint}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white border border-gray-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Why This Match:
                </span>
                <p className="text-gray-700 m-0">
                  {currentMentor.matchReason}
                </p>
              </div>
            </div>

            {/* Key Advice Quote */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#f4f7f4] border border-[#cbdcd3] flex items-start gap-2.5">
              <div className="text-base text-[#1f5b50] font-serif font-bold shrink-0 mt-0.5">
                ❝
              </div>
              <p className="text-xs text-gray-800 italic leading-relaxed m-0 font-serif">
                "{currentMentor.adviceQuote}"
              </p>
            </div>

            {/* Skills Mastered */}
            <div className="mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                Core Stack Mastered on This Path:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentMentor.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-medium bg-white text-gray-800 border border-gray-200 px-2 py-0.5 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Suggested 20-min Conversation Prompts */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-2 flex items-center gap-1.5">
                <MessageSquareIcon className="w-3.5 h-3.5 text-[#1f5b50]" />
                Suggested 20-Minute Discussion Questions:
              </span>
              <div className="space-y-1.5">
                {currentMentor.coffeeChatQuestions.map((q, idx) => (
                  <div
                    key={q}
                    className="flex items-start gap-2 text-[11px] text-gray-700 leading-snug"
                  >
                    <span className="text-[#1f5b50] font-mono font-bold shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button: Request a Short Connect */}
          <div className="pt-3 border-t border-gray-200">
            {isConnected ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <CheckIcon className="w-4 h-4 text-emerald-600" />
                  Connect request sent! {currentMentor.name} will receive your verified skill telemetry.
                </span>
                <button
                  type="button"
                  onClick={handleToggleConnect}
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer underline"
                >
                  Cancel Request
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleToggleConnect}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1f5b50] hover:bg-[#17463e] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Request a short connect with {currentMentor.name}</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
