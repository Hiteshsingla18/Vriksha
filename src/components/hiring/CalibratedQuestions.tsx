import { useState, useMemo } from "react"

// ==========================================
// Types
// ==========================================
interface InterviewQuestion {
  id: string
  number: string
  category: "Technical" | "Behavioral" | "Business"
  capability: string
  separatorStrength: string // e.g. "High Separator · r = 0.544"
  question: string
  whyThisQuestion: string
  whatToListenFor: string[]
  followUpProbes: {
    probeId: string
    title: string
    prompt: string
  }[]
}

interface RoleQuestionSet {
  roleId: string
  roleTitle: string
  domain: string
  candidatePersona: string
  datasetSource: string
  questions: InterviewQuestion[]
}

// ==========================================
// Hardcoded Calibrated Questions Database
// Derived from hackathon datasets:
// DataScience_Jobs.csv, Analytics_Jobs.csv, JDS & SDS Traits
// ==========================================
const ROLE_INTERVIEW_DATA: RoleQuestionSet[] = [
  {
    roleId: "senior-data-scientist",
    roleTitle: "Senior Data Scientist",
    domain: "Supervised Modeling & Retention Analytics",
    candidatePersona: "Specialist in predictive customer modeling, decision thresholding, and causal business impact",
    datasetSource: "DataScience_Jobs.csv & JDS_Skill_Traits.csv (Storytelling r = 0.544)",
    questions: [
      {
        id: "sds-q1",
        number: "01",
        category: "Technical",
        capability: "Production Judgement & Cost-Sensitive Calibration",
        separatorStrength: "High Separator · r = 0.518",
        question:
          "When deploying a customer churn classifier to production, business stakeholders complained about false negatives. How did you recalibrate your decision threshold rather than simply relying on the default 0.50 probability cutoff?",
        whyThisQuestion:
          "Separates candidates who merely run .predict() from seasoned practitioners who understand asymmetric financial cost trade-offs in real revenue-critical systems.",
        whatToListenFor: [
          "Computed an expected financial loss matrix: Cost(FN) = $2,400 churn loss vs Cost(FP) = $80 retention voucher.",
          "Calibrated the decision threshold to 0.38 using precision-recall curves to optimize business save rate.",
          "Tracked Platt scaling and Brier scores to verify predicted probabilities were genuinely well-calibrated.",
        ],
        followUpProbes: [
          {
            probeId: "p1",
            title: "Capacity Constraint Probe",
            prompt:
              "If the customer success team has a hard weekly capacity limit of 500 interventions, how do you modify your thresholding into a ranked queue strategy?",
          },
          {
            probeId: "p2",
            title: "Covariate Shift Audit",
            prompt:
              "How did you mathematically detect covariate shift between your training subscriber tenure distribution and live incoming production accounts?",
          },
        ],
      },
      {
        id: "sds-q2",
        number: "02",
        category: "Business",
        capability: "Metric Storytelling & Stakeholder Influence",
        separatorStrength: "Peak Separator · r = 0.544 (JDS Metric)",
        question:
          "Describe a scenario where your machine learning model demonstrated superior statistical accuracy (high ROC-AUC), but business leadership hesitated to deploy it. How did you translate model telemetry into executive buy-in?",
        whyThisQuestion:
          "Psychometric telemetry proves Metric Storytelling is the single strongest statistical driver separating data scientists stuck at ₹20 LPA from high-impact leads commanding ₹45+ LPA.",
        whatToListenFor: [
          "Replaced abstract data metrics (F1 score, log-loss) with executive P&L units (EBITDA lift, annualized churn reduction).",
          "Used SHAP tree-explainer waterfall plots to walk department directors through specific customer risk drivers.",
          "Constructed a 4-week shadow champion-challenger trial with clear non-inferiority safety guards to prove zero downside risk.",
        ],
        followUpProbes: [
          {
            probeId: "p3",
            title: "Heuristic Simplicity Challenge",
            prompt:
              "When the VP of Sales insisted an Excel rule-based heuristic was 'good enough', what empirical counter-evidence did you present?",
          },
          {
            probeId: "p4",
            title: "A/B Safety Protocol",
            prompt:
              "What automated kill-switch criteria did you establish to abort the champion-challenger pipeline if early retention dipped?",
          },
        ],
      },
      {
        id: "sds-q3",
        number: "03",
        category: "Technical",
        capability: "Problem Solving & Data Hygiene Rigor",
        separatorStrength: "Methodological Rigor · r = 0.442",
        question:
          "In high-dimensional tabular datasets with missing numerical values, what statistical criteria determine whether you apply median imputation, KNN imputation, or model-based iterative techniques?",
        whyThisQuestion:
          "Detects whether the candidate blindly calls fillna() or understands Missing Completely at Random (MCAR) versus informative Missing at Random (MAR) assumptions.",
        whatToListenFor: [
          "Audited whether missingness was informative by evaluating correlation with target outcomes before dropping or filling.",
          "Appended explicit missingness indicator binary columns (_is_missing) to preserve signal from unrecorded fields.",
          "Prevented data leakage by strictly fitting imputation transformers inside cross-validation training folds only.",
        ],
        followUpProbes: [
          {
            probeId: "p5",
            title: "Collinearity Inspection",
            prompt:
              "How do you ensure iterative multi-variable imputation does not artificially inflate multicollinearity among correlated predictors?",
          },
          {
            probeId: "p6",
            title: "Tree Native Routing",
            prompt:
              "Under what data characteristics do you purposely retain nulls natively to leverage LightGBM / XGBoost default directional splits?",
          },
        ],
      },
    ],
  },
  {
    roleId: "ml-platform-engineer",
    roleTitle: "ML Platform Engineer",
    domain: "Low-Latency Inference & Distributed Systems",
    candidatePersona: "Specialist in high-throughput inference microservices, P99 SLA defense, and Kubernetes telemetry",
    datasetSource: "DataScience_Jobs.csv (Engineering Scale: 12 to 46 LPA)",
    questions: [
      {
        id: "mle-q1",
        number: "01",
        category: "Technical",
        capability: "P99 Latency SLA Defense & Kernel Acceleration",
        separatorStrength: "High Separator · r = 0.495",
        question:
          "Our live prediction API has a strict P99 latency SLA of 15ms under 25,000 requests/second. Walk through how you isolate bottlenecks and accelerate the inference pipeline from request ingress to model response.",
        whyThisQuestion:
          "Separates offline notebook modelers from true platform engineers who command CUDA concurrency, dynamic batching, and memory-bandwidth constraints.",
        whatToListenFor: [
          "Profiled exact latency components: Network ingress (2ms) -> Preprocessing (3ms) -> TensorRT engine (8ms) -> Serialization (1ms).",
          "Deployed NVIDIA Triton Inference Server with dynamic batching and concurrent model execution instances.",
          "Quantized model weights from FP32 to INT8 using calibration sets, yielding 3.6x throughput with < 0.2% accuracy degradation.",
        ],
        followUpProbes: [
          {
            probeId: "m1",
            title: "Dynamic Batch Tuning",
            prompt:
              "How did you calibrate maximum queue delay in Triton to balance GPU hardware saturation against tail latency spikes?",
          },
          {
            probeId: "m2",
            title: "Cache Synchronization",
            prompt:
              "How do you handle feature store cache invalidation when user vector attributes update asynchronously via Kafka streams?",
          },
        ],
      },
      {
        id: "mle-q2",
        number: "02",
        category: "Technical",
        capability: "Production MLOps & Training-Serving Skew",
        separatorStrength: "High Separator · r = 0.468",
        question:
          "How do you structure an automated model retraining pipeline to prevent catastrophic degradation, silent concept drift, or training-serving skew?",
        whyThisQuestion:
          "Evaluates architectural maturity in CI/CD, canary traffic routing, and automated dataset versioning in live environments.",
        whatToListenFor: [
          "Structured Kubeflow automated DAGs triggered by EvidentlyAI covariate drift signals exceeding Wasserstein distance limits.",
          "Executed progressive canary rollouts routing 5% live traffic with automated instant rollback on error threshold triggers.",
          "Enforced strict Feast feature store schema assertions to guarantee identical feature generation between training and inference.",
        ],
        followUpProbes: [
          {
            probeId: "m3",
            title: "Parity Verification",
            prompt:
              "How do you mathematically verify that Python feature extraction code during training matches optimized C++ streaming code in production?",
          },
          {
            probeId: "m4",
            title: "Online Conversion Rollback",
            prompt:
              "If a retrained model passes all offline holdout test metrics but online conversion metrics dip by 3%, what is your investigation and rollback protocol?",
          },
        ],
      },
      {
        id: "mle-q3",
        number: "03",
        category: "Business",
        capability: "Cloud FinOps & Distributed Compute Economics",
        separatorStrength: "Architecture Separator · r = 0.420",
        question:
          "Deep learning cluster training costs doubled last quarter. How did you audit hardware utilization and reduce cloud infrastructure spend without throttling team velocity?",
        whyThisQuestion:
          "Tests practical stewardship of six-figure enterprise cloud budgets and efficiency in multi-GPU resource orchestration.",
        whatToListenFor: [
          "Profiled DCGM GPU metrics, discovering compute engines were idle 55% of the time due to un-optimized CPU DataLoader I/O bottlenecks.",
          "Adopted spot instance node pools with automated checkpointing and fault-tolerant Kubernetes pod eviction handlers.",
          "Enabled FP16 mixed precision and FlashAttention-2, cutting training hours in half and slashing monthly compute spend by 42%.",
        ],
        followUpProbes: [
          {
            probeId: "m5",
            title: "Spot Preemption Math",
            prompt:
              "What checkpoint frequency interval did you calculate to mathematically minimize the expected loss from spot preemption events?",
          },
          {
            probeId: "m6",
            title: "Compute Quota Policy",
            prompt:
              "How did you design automated namespace resource quotas between interactive exploratory notebooks and production scheduled jobs?",
          },
        ],
      },
    ],
  },
  {
    roleId: "retail-analytics-lead",
    roleTitle: "Retail Analytics Lead",
    domain: "Time-Series Forecasting & Inventory Optimization",
    candidatePersona: "Specialist in multi-store demand forecasting, seasonal lag decomposition, and working capital optimization",
    datasetSource: "Analytics_Jobs.csv (Demand Forecasting Scale: 15 to 56 LPA)",
    questions: [
      {
        id: "ral-q1",
        number: "01",
        category: "Technical",
        capability: "Time-Series Seasonality & Non-Leaking Lags",
        separatorStrength: "High Separator · r = 0.476",
        question:
          "In multi-store retail demand planning, holiday sales spikes frequently break standard moving averages. How do you construct lag features and decompose seasonality without causing future lookahead bias?",
        whyThisQuestion:
          "Tests the candidate's methodological rigor in temporal forecasting, ensuring predictions reflect genuine historical signals without data leakage.",
        whatToListenFor: [
          "Utilized expanding-window TimeSeriesSplit partitions; strictly ensured lag features only leveraged historical information up to t-1.",
          "Engineered cyclical calendar harmonics (sine/cosine of week-of-year) alongside promotional event lead and lag indicators.",
          "Evaluated models using Weighted Mean Absolute Percentage Error (WMAPE) to prevent low-value high-volume items from skewing performance.",
        ],
        followUpProbes: [
          {
            probeId: "r1",
            title: "Hierarchy Reconciliation",
            prompt:
              "How did you reconcile bottom-up SKU forecasts with top-down corporate sales projections to maintain coherence?",
          },
          {
            probeId: "r2",
            title: "Uncertainty Quantiles",
            prompt:
              "When supplier delivery lead times are variable, how do you incorporate 10th and 90th percentile prediction bands into safety stock purchasing?",
          },
        ],
      },
      {
        id: "ral-q2",
        number: "02",
        category: "Business",
        capability: "Working Capital Optimization & Supply Chain Value",
        separatorStrength: "High Separator · r = 0.512",
        question:
          "How do you translate a 5% reduction in forecasting error (MAPE) into tangible working capital reduction and stockout prevention for the Chief Supply Chain Officer?",
        whyThisQuestion:
          "Separates technical analysts from strategic leaders who can articulate inventory holding cost economics directly to C-suite peers.",
        whatToListenFor: [
          "Mapped forecast variance reduction directly into safety stock buffer equations: SS = Z × σ_L × √LeadTime.",
          "Demonstrated that reducing MAPE from 11% to 6% released $2.4M in tied-up holding capital while decreasing stockouts by 26%.",
          "Applied ABC/XYZ product segmentation to concentrate predictive power on high-turnover volatile revenue drivers.",
        ],
        followUpProbes: [
          {
            probeId: "r3",
            title: "Lead Time Volatility",
            prompt:
              "If overseas port congestion doubles vendor lead time, how does your dynamic safety stock replenishment algorithm adapt?",
          },
          {
            probeId: "r4",
            title: "Intermittent Demand",
            prompt:
              "How do you handle zero-inflated intermittent demand for slow-moving spare parts without generating bloated inventory?",
          },
        ],
      },
      {
        id: "ral-q3",
        number: "03",
        category: "Behavioral",
        capability: "Algorithmic Governance & Field Change Management",
        separatorStrength: "Leadership Separator · r = 0.435",
        question:
          "Store managers frequently override central automated replenishment orders based on subjective gut feel. How did you diagnose whether their manual overrides helped or hurt inventory performance?",
        whyThisQuestion:
          "Assesses collaborative governance, change management, and empirical auditing of human-in-the-loop operational decisions.",
        whatToListenFor: [
          "Built an audit dashboard tracking Forecast Value Add (FVA) comparing central algorithmic orders against manual overrides.",
          "Proved overrides improved accuracy during hyper-local community events (+14%) but created systemic overstocking on markdown sales (-24%).",
          "Established collaborative governance: automated acceptance within ±10% tolerances, requiring structured reason tagging for wider overrides.",
        ],
        followUpProbes: [
          {
            probeId: "r5",
            title: "Feature Feedback Loop",
            prompt:
              "How did you convert qualitative store manager override feedback into quantifiable engineered features for future model iterations?",
          },
          {
            probeId: "r6",
            title: "Field Relationship Defense",
            prompt:
              "How did you present negative override findings to veteran store operators without generating cultural resistance to data-driven systems?",
          },
        ],
      },
    ],
  },
  {
    roleId: "nlp-researcher",
    roleTitle: "NLP Researcher",
    domain: "Subword Tokenization, Fine-Tuning & Generative AI",
    candidatePersona: "Specialist in parameter-efficient fine-tuning (LoRA), RAG architectures, and evaluation guardrails",
    datasetSource: "cleaned_JDS_Skill_Traits.csv (Transformer & NLP Scale: 16 to 62 LPA)",
    questions: [
      {
        id: "nlp-q1",
        number: "01",
        category: "Technical",
        capability: "Subword Tokenization Mechanics & Code-Mixed Text",
        separatorStrength: "High Separator · r = 0.485",
        question:
          "When adapting an English pre-trained transformer to domain-specific customer feedback with heavy code-mixed slang, what subword tokenization and vocabulary adaptation strategies do you employ?",
        whyThisQuestion:
          "Checks deep mechanical understanding of subword algorithms (Byte-Pair Encoding, WordPiece) rather than superficial API prompting.",
        whatToListenFor: [
          "Audited subword fragmentation rates, discovering out-of-domain words were fragmenting into 4-6 meaningless byte characters.",
          "Expanded tokenizer vocabulary with 3,500 domain-specific terms, initializing new embedding vectors using mean contextual token averages.",
          "Executed continual pre-training with Masked Language Modeling (MLM) before running downstream supervised classification.",
        ],
        followUpProbes: [
          {
            probeId: "n1",
            title: "Embedding Stabilization",
            prompt:
              "How did you prevent newly initialized token embeddings from destabilizing pre-trained attention weights during initial optimizer warmups?",
          },
          {
            probeId: "n2",
            title: "Learning Rate Differential",
            prompt:
              "What learning rate differential schedule did you apply between the frozen transformer backbone and newly initialized classification heads?",
          },
        ],
      },
      {
        id: "nlp-q2",
        number: "02",
        category: "Technical",
        capability: "Parameter-Efficient Fine-Tuning (LoRA / QLoRA)",
        separatorStrength: "High Separator · r = 0.518",
        question:
          "Full fine-tuning of 7B+ parameter models for multi-category triage is compute-prohibitive. Walk through how you configure and benchmark Parameter-Efficient Fine-Tuning (LoRA / QLoRA) on limited GPU budgets.",
        whyThisQuestion:
          "Evaluates modern generative AI engineering: rank decomposition, memory quantization footprints, and throughput optimization.",
        whatToListenFor: [
          "Injected low-rank decomposition matrices (A and B) into query/value attention projections with rank r=16 and scaling alpha α=32.",
          "Applied 4-bit NormalFloat (NF4) quantization via bitsandbytes with double quantization, compressing VRAM memory from 28GB to 6.2GB.",
          "Benchmarked catastrophic forgetting on upstream general knowledge suites, verifying zero degradation while hitting 93% domain task accuracy.",
        ],
        followUpProbes: [
          {
            probeId: "n3",
            title: "Target Layer Selection",
            prompt:
              "Under what task conditions do you extend LoRA adapters to MLP feed-forward layers versus restricting strictly to attention projections?",
          },
          {
            probeId: "n4",
            title: "Zero-Latency Serving",
            prompt:
              "How do you fold LoRA adapter weights back into base model tensors for zero-overhead production ONNX runtime export?",
          },
        ],
      },
      {
        id: "nlp-q3",
        number: "03",
        category: "Business",
        capability: "RAG Evaluation Triangulation & Hallucination Mitigation",
        separatorStrength: "Production Separator · r = 0.490",
        question:
          "In enterprise Retrieval-Augmented Generation (RAG) systems, traditional metrics like BLEU or cosine distance fail to detect factual hallucinations. How do you construct an automated evaluation pipeline for answer groundedness?",
        whyThisQuestion:
          "Separates naive toy RAG tutorial builders from researchers who build audit-ready generative AI systems for regulated enterprise clients.",
        whatToListenFor: [
          "Implemented RAG triangulation metrics: Context Relevance, Groundedness (Faithfulness), and Answer Relevance.",
          "Constructed synthetic question-answer pairs and benchmarked LLM-as-a-judge scoring with strict G-Eval criteria calibration.",
          "Integrated deterministic validation guardrails (NeMo Guardrails / Guidance) for all numerical facts and regulatory policy citations.",
        ],
        followUpProbes: [
          {
            probeId: "n5",
            title: "Judge Agreement Calibration",
            prompt:
              "How did you calibrate the automated LLM-as-a-judge score against human domain expert agreement using Cohen's Kappa?",
          },
          {
            probeId: "n6",
            title: "Cross-Encoder Reranking",
            prompt:
              "What cross-encoder reranking strategy (e.g. BGE / Cohere Rerank) did you deploy to maximize context density in the top-k window?",
          },
        ],
      },
    ],
  },
]

// ==========================================
// Embedded Clean SVG Icons
// ==========================================
function SearchIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}

function ChevronDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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

function CopyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  )
}

function SparklesIcon({ className = "w-4 h-4" }: { className?: string }) {
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

function MessageSquareIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  )
}

// ==========================================
// Props Interface
// ==========================================
interface CalibratedQuestionsProps {
  selectedCandidate?: number
}

// ==========================================
// Main CalibratedQuestions Component
// ==========================================
export default function CalibratedQuestions({
  selectedCandidate = 0,
}: CalibratedQuestionsProps) {
  // 1. Interactive Local State
  const [selectedRoleId, setSelectedRoleId] = useState<string>("senior-data-scientist")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [expandedQuestionId, setExpandedQuestionId] = useState<string>("sds-q1")
  const [copiedQuestionId, setCopiedQuestionId] = useState<string | null>(null)

  // Interactive Interviewer Rating Rubric State (Key: questionId -> score 1-5)
  const [questionScores, setQuestionScores] = useState<Record<string, number>>({
    "sds-q1": 4,
    "sds-q2": 5,
  })

  // Selected Role Data Set
  const currentRoleData = useMemo(() => {
    return (
      ROLE_INTERVIEW_DATA.find((r) => r.roleId === selectedRoleId) ||
      ROLE_INTERVIEW_DATA[0]
    )
  }, [selectedRoleId])

  // Filtered Questions by Category
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === "All") return currentRoleData.questions
    return currentRoleData.questions.filter((q) => q.category === selectedCategory)
  }, [currentRoleData, selectedCategory])

  // Real-time Interview Session Score Calculation
  const evaluatedCount = Object.keys(questionScores).length
  const averageRubricScore = useMemo(() => {
    const scores = Object.values(questionScores)
    if (!scores.length) return "N/A"
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
  }, [questionScores])

  // Handle Copy Question
  const handleCopyQuestion = (id: string, text: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
      setCopiedQuestionId(id)
      setTimeout(() => setCopiedQuestionId(null), 2000)
    }
  }

  // Handle Rubric Score
  const handleRateQuestion = (questionId: string, rating: number) => {
    setQuestionScores((prev) => ({
      ...prev,
      [questionId]: rating,
    }))
  }

  return (
    <section
      id="calibrated-questions"
      className="hiring-feature-section border-b border-[#e8e4dc] py-12"
      style={{ scrollMarginTop: "135px" }}
    >
      {/* ======================================================== */}
      {/* 1. Header & Section Context                              */}
      {/* ======================================================== */}
      <div className="hiring-section-heading mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="card-label text-[10px] font-bold tracking-widest text-[#1f5b50] uppercase mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1f5b50] inline-block" />
            05 · Interview for Proven Evidence
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 tracking-tight">
            Calibrated Questions Hub
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
            Generated from statistical separating factors of top historical hires. Dissect genuine technical depth, edge-case judgement, and metric storytelling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-[#f4f2ee] rounded-xl border border-gray-200 text-left">
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
              Interview Evaluation Score
            </span>
            <span className="text-sm font-bold font-mono text-[#1f5b50]">
              {averageRubricScore} <span className="text-xs text-gray-400 font-normal">/ 5.0</span>
              <span className="text-[10px] font-normal text-gray-500 ml-1.5">
                ({evaluatedCount} scored)
              </span>
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-[#1f5b50] border border-[#a9cec4] bg-[#e2f0ec]">
            <SparklesIcon className="w-3 h-3 text-[#1f5b50]" />
            Evidence-Based Rubric
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. Interactive Role & Category Filters                   */}
      {/* ======================================================== */}
      <div className="p-4 rounded-xl bg-[#fcfbf9] border border-[#e8e4dc] mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        {/* Role Selector Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-gray-700 whitespace-nowrap flex items-center gap-1.5">
            <SearchIcon className="w-3.5 h-3.5 text-[#1f5b50]" />
            Target Role:
          </label>
          <select
            value={selectedRoleId}
            onChange={(e) => {
              setSelectedRoleId(e.target.value)
              const firstQ = ROLE_INTERVIEW_DATA.find((r) => r.roleId === e.target.value)?.questions[0]
              if (firstQ) setExpandedQuestionId(firstQ.id)
            }}
            className="h-9 px-3 rounded-lg border border-[#dcded5] bg-white text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1f5b50]/40 cursor-pointer shadow-xs min-w-[220px]"
          >
            {ROLE_INTERVIEW_DATA.map((role) => (
              <option key={role.roleId} value={role.roleId}>
                {role.roleTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mr-1">
            Filter:
          </span>
          {["All", "Technical", "Business"].map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#1f5b50] text-white font-semibold shadow-xs"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. Role Context Summary Banner                           */}
      {/* ======================================================== */}
      <div className="px-4 py-3 bg-[#e2f0ec]/70 border border-[#a9cec4] rounded-xl mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1f5b50] block">
            Role Profile Context • {currentRoleData.roleTitle}
          </span>
          <p className="text-gray-800 text-[11px] mt-0.5 font-medium">
            {currentRoleData.candidatePersona}
          </p>
        </div>
        <span className="text-[10px] font-mono text-[#1f5b50] bg-white/80 px-2 py-0.5 rounded border border-[#a9cec4] shrink-0">
          Source: {currentRoleData.datasetSource.split("&")[0].trim()}
        </span>
      </div>

      {/* ======================================================== */}
      {/* 4. Interactive Calibrated Questions List                 */}
      {/* ======================================================== */}
      <div className="space-y-3.5">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedQuestionId === q.id
          const currentRating = questionScores[q.id] || 0

          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition-all duration-200 bg-white shadow-xs overflow-hidden ${
                isExpanded
                  ? "border-[#1f5b50] ring-1 ring-[#1f5b50]/30 shadow-sm"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Question Header Accordion Trigger */}
              <button
                type="button"
                onClick={() => setExpandedQuestionId(isExpanded ? "" : q.id)}
                className="w-full text-left p-4 sm:p-5 flex items-start gap-4 transition-colors cursor-pointer"
              >
                {/* Number Badge */}
                <span className="w-8 h-8 rounded-xl bg-[#f4f2ee] text-gray-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-gray-200">
                  {q.number}
                </span>

                {/* Question Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        q.category === "Technical"
                          ? "bg-blue-50 text-blue-800 border border-blue-200"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {q.category}
                    </span>

                    <span className="text-xs font-semibold text-[#1f5b50]">
                      {q.capability}
                    </span>

                    <span className="text-[10px] font-mono text-gray-400">
                      • {q.separatorStrength}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-serif font-semibold text-gray-950 leading-snug">
                    {q.question}
                  </p>
                </div>

                {/* Right Action Chevron & Rating Indicator */}
                <div className="flex items-center gap-2 shrink-0 pt-1">
                  {currentRating > 0 && (
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-[#e2f0ec] text-[#1f5b50] border border-[#a9cec4]">
                      ★ {currentRating}/5
                    </span>
                  )}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-gray-500 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-[#1f5b50]" : ""
                    }`}
                  >
                    <ChevronDownIcon className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* ======================================================== */}
              {/* Expanded Inspection Drawer                               */}
              {/* ======================================================== */}
              {isExpanded && (
                <div className="p-4 sm:p-6 pt-2 border-t border-gray-100 bg-[#fcfbf9] space-y-4 animate-fade-in text-xs">
                  {/* Top: Why This Question Separates Performance */}
                  <div className="p-3.5 rounded-xl bg-white border border-gray-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                      Target Capability & Evaluator Rationale
                    </span>
                    <p className="text-gray-800 leading-relaxed font-medium">
                      {q.whyThisQuestion}
                    </p>
                  </div>

                  {/* Middle Grid: What to Listen For vs. AI Follow-Up Probes */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Left (6 cols): What to Listen For */}
                    <div className="lg:col-span-6 p-4 rounded-xl bg-white border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-2.5 text-[#1f5b50]">
                          <CheckCircleIcon className="w-4 h-4" />
                          <span className="text-[11px] font-bold uppercase tracking-wider">
                            What to Listen For (Top Hire Signals)
                          </span>
                        </div>

                        <div className="space-y-2">
                          {q.whatToListenFor.map((phrase, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-lg bg-[#fcfbf9] border border-gray-200 text-gray-800 leading-relaxed text-[11px] flex items-start gap-2"
                            >
                              <span className="text-[#1f5b50] font-bold font-mono">✓</span>
                              <span>&ldquo;{phrase}&rdquo;</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-500">
                        Derived from top-decile historical onboarding and retention telemetry.
                      </div>
                    </div>

                    {/* Right (6 cols): AI-Generated Follow-Up Probes */}
                    <div className="lg:col-span-6 p-4 rounded-xl bg-white border border-gray-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2.5 text-[#1f5b50]">
                          <div className="flex items-center gap-1.5">
                            <MessageSquareIcon className="w-4 h-4" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">
                              AI-Generated Follow-Up Probes
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono">
                            Deep-dive prompts
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {q.followUpProbes.map((probe) => (
                            <div
                              key={probe.probeId}
                              className="p-2.5 rounded-lg bg-[#f9f7fc] border border-[#d8d0e3] text-[11px]"
                            >
                              <strong className="block text-gray-900 font-semibold mb-0.5">
                                {probe.title}
                              </strong>
                              <p className="text-gray-700 leading-relaxed">
                                {probe.prompt}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Copy and Scoring Bar */}
                      <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                        {/* 1-to-5 Rubric Rating */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-gray-600">Rate Answer:</span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => handleRateQuestion(q.id, star)}
                              className={`w-6 h-6 rounded text-[11px] font-bold transition-all cursor-pointer ${
                                currentRating >= star
                                  ? "bg-[#1f5b50] text-white shadow-2xs"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                              title={`Rate ${star} of 5`}
                            >
                              {star}
                            </button>
                          ))}
                        </div>

                        {/* Copy Question Button */}
                        <button
                          type="button"
                          onClick={() => handleCopyQuestion(q.id, q.question)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1f5b50] hover:text-[#17463e] cursor-pointer"
                        >
                          {copiedQuestionId === q.id ? (
                            <>
                              <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <CopyIcon className="w-3.5 h-3.5" />
                              <span>Copy Question</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
