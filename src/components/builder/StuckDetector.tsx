import { useState, useEffect } from "react"
import { behaviourSignals, BehaviourSignalDetail } from "../../data/builderData"
import Heading from "../common/Heading"
import Icon from "../common/Icon"
import SkillChip from "../common/SkillChip"

interface StuckDetectorProps {
  activeMicroProjectPhase?: number
  remediatedPhases?: Record<number, boolean>
  onRemediate?: (phaseIndex: number) => void
}

type TabType = "verdict" | "kernel" | "code" | "sandbox"

export default function StuckDetector({
  activeMicroProjectPhase = 0,
  remediatedPhases = {},
  onRemediate,
}: StuckDetectorProps = {}) {
  const [selectedSignalIndex, setSelectedSignalIndex] = useState(2) // Default to Data Leakage (Phase 2)
  const [activeTab, setActiveTab] = useState<TabType>("verdict")
  const [isScanning, setIsScanning] = useState(false)
  const [scanStep, setScanStep] = useState<string | null>(null)
  const [scanNotification, setScanNotification] = useState<string | null>(null)
  const [kernelExecuting, setKernelExecuting] = useState(false)
  const [assertionRunning, setAssertionRunning] = useState(false)
  const [localVerifiedMap, setLocalVerifiedMap] = useState<Record<string, boolean>>({})
  const [copiedCode, setCopiedCode] = useState(false)

  const currentSignal: BehaviourSignalDetail =
    behaviourSignals[selectedSignalIndex] || behaviourSignals[0]
  const targetPhaseIndex = (currentSignal.microProjectPhase || 1) - 1
  const isRemediated =
    Boolean(remediatedPhases[targetPhaseIndex]) || Boolean(localVerifiedMap[currentSignal.id])
  const isCurrentlyRemediating =
    activeMicroProjectPhase === targetPhaseIndex && !isRemediated

  // When external phase changes to this signal's target phase and it becomes remediated
  useEffect(() => {
    if (remediatedPhases[targetPhaseIndex]) {
      setLocalVerifiedMap((prev) => ({ ...prev, [currentSignal.id]: true }))
    }
  }, [remediatedPhases, targetPhaseIndex, currentSignal.id])

  const handleRunDiagnosticScan = () => {
    setIsScanning(true)
    setScanStep("Traversing notebook AST nodes across 14 execution cells...")

    setTimeout(() => {
      setScanStep("Inspecting kernel exit codes & cross-validation metrics...")
    }, 600)

    setTimeout(() => {
      setScanStep("Synthesizing anomaly signatures against 1,200 peer benchmarks...")
    }, 1200)

    setTimeout(() => {
      setIsScanning(false)
      setScanStep(null)
      setScanNotification(
        `Diagnostic scan complete: Flagged "${currentSignal.bottleneckHeading}" with 98.4% telemetry certainty.`
      )
      setTimeout(() => setScanNotification(null), 6000)
    }, 1800)
  }

  const handleSelectSignal = (index: number) => {
    setSelectedSignalIndex(index)
    setActiveTab("verdict")
  }

  const handleSimulateTrace = (index: number) => {
    setSelectedSignalIndex(index)
    setIsScanning(true)
    const sig = behaviourSignals[index]
    setScanStep(`Replaying learner telemetry trace for "${sig.skill}"...`)

    setTimeout(() => {
      setIsScanning(false)
      setScanStep(null)
      setScanNotification(`Diagnostic telemetry locked: ${sig.bottleneckHeading} (${sig.urgency} Urgency).`)
      setTimeout(() => setScanNotification(null), 5000)
    }, 800)
  }

  const handleSimulateKernel = () => {
    setKernelExecuting(true)
    setTimeout(() => {
      setKernelExecuting(false)
    }, 900)
  }

  const handleRunAssertionCheck = () => {
    setAssertionRunning(true)
    setTimeout(() => {
      setAssertionRunning(false)
      setLocalVerifiedMap((prev) => ({ ...prev, [currentSignal.id]: true }))
      setScanNotification(
        `✓ All 3 assertions passed for ${currentSignal.bottleneckHeading}! Bottleneck resolved.`
      )
      setTimeout(() => setScanNotification(null), 5000)
    }, 1200)
  }

  const handleJumpToMicroProject = () => {
    onRemediate?.(targetPhaseIndex)
    const el = document.getElementById("micro-project")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleCopyCode = (text: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <section
      className="builder-feature-section stuck-detector-section"
      id="stuck-detector"
    >
      {/* Section Header */}
      <div className="builder-section-heading">
        <div>
          <div className="card-label">02 · Diagnose behaviour</div>
          <Heading level={2}>Stuck Detector</Heading>
          <p>
            Reads learner telemetry, code attempts, and error signatures — not a self-report — to diagnose where you&apos;re stuck.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--white)] border border-[var(--line)] text-[11px] font-mono text-[var(--sage-600)] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry Active · AST Engine v2.4</span>
          </div>

          <button
            type="button"
            onClick={handleRunDiagnosticScan}
            disabled={isScanning}
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--forest-900)] hover:bg-[var(--forest-800)] text-[var(--lime-300)] border border-[var(--forest-700)] transition-all cursor-pointer flex items-center gap-2 shadow-xs disabled:opacity-50"
          >
            <span
              className={`w-2 h-2 rounded-full bg-[var(--lime-400)] ${
                isScanning ? "animate-ping" : "animate-pulse"
              }`}
            />
            <span>{isScanning ? "Scanning Notebook AST..." : "Run Live Diagnostic Scan"}</span>
          </button>
        </div>
      </div>

      {/* Scanning Toast / Notification Banner */}
      {isScanning && scanStep && (
        <div className="mb-4 p-3.5 rounded-xl bg-[var(--forest-950)] border border-[var(--forest-700)] text-xs text-[var(--lime-300)] flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 border-2 border-[var(--lime-400)] border-t-transparent rounded-full animate-spin flex-shrink-0" />
            <span className="font-mono text-[11px] tracking-wide">{scanStep}</span>
          </div>
          <span className="text-[10px] font-mono text-[var(--sage-400)]">Telemetry audit in progress</span>
        </div>
      )}

      {scanNotification && !isScanning && (
        <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-600/60 text-xs text-emerald-200 flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Icon name="check" size={16} className="text-emerald-400 flex-shrink-0" />
            <span className="font-mono text-[11px]">{scanNotification}</span>
          </div>
          <button
            type="button"
            onClick={() => setScanNotification(null)}
            className="text-[10px] text-emerald-400 hover:text-white cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Simulated Traces Quick Strip */}
      <div className="mb-5 p-3 rounded-xl bg-[var(--white)] border border-[var(--line)] flex flex-wrap items-center justify-between gap-2.5 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono text-[var(--sage-500)] font-semibold tracking-wider">
            Simulate Learner Traces:
          </span>
          <span className="text-[11px] text-[var(--muted)] hidden md:inline">
            Inject real learner telemetry anomalies to test the diagnostic engine
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {behaviourSignals.map((sig, idx) => {
            const isSigRemediated =
              Boolean(remediatedPhases[(sig.microProjectPhase || 1) - 1]) ||
              Boolean(localVerifiedMap[sig.id])
            const isSelected = selectedSignalIndex === idx

            return (
              <button
                key={sig.id}
                type="button"
                onClick={() => handleSimulateTrace(idx)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[var(--warm)] text-[var(--forest-950)] border-[var(--warm)] font-semibold shadow-xs"
                    : "bg-[var(--ivory)] hover:bg-[var(--warm-light)] text-[var(--forest-950)] border-[var(--line)]"
                }`}
              >
                <span>0{idx + 1} {sig.skill}</span>
                {isSigRemediated && (
                  <span className="ml-1 text-emerald-600 font-bold">✓</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main 2-Column Responsive Diagnostic Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (5 cols): Observed Telemetry Signals List */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-[11px] uppercase font-mono font-semibold text-[var(--sage-500)] tracking-wider">
              Observed Telemetry Patterns (5)
            </span>
            <span className="text-[11px] font-mono text-[var(--sage-500)]">
              AST & Kernel Signatures
            </span>
          </div>

          {behaviourSignals.map((item, index) => {
            const isSelected = selectedSignalIndex === index
            const itemPhaseIdx = (item.microProjectPhase || 1) - 1
            const isItemRemediated =
              Boolean(remediatedPhases[itemPhaseIdx]) || Boolean(localVerifiedMap[item.id])
            const isItemActive =
              activeMicroProjectPhase === itemPhaseIdx && !isItemRemediated

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => handleSelectSignal(index)}
                className={`w-full p-4 rounded-xl text-left transition-all cursor-pointer border relative flex items-start gap-3.5 shadow-2xs ${
                  isSelected
                    ? "bg-[var(--white)] border-[var(--warm)] ring-2 ring-[var(--warm)]/20 shadow-sm"
                    : "bg-[var(--white)] hover:bg-[#faf8f3] border-[var(--line)]"
                }`}
              >
                {/* Index Pill */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-semibold flex-shrink-0 transition-colors ${
                    isItemRemediated
                      ? "bg-emerald-100 text-emerald-800"
                      : isSelected
                      ? "bg-[var(--warm)] text-[var(--forest-950)]"
                      : "bg-[var(--ivory)] text-[var(--sage-600)] border border-[var(--line)]"
                  }`}
                >
                  {isItemRemediated ? "✓" : `0${index + 1}`}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <strong className="text-xs font-semibold text-[var(--forest-950)]">
                      {item.signal}
                    </strong>
                    {isItemRemediated ? (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono">
                        ✓ Verified
                      </span>
                    ) : isItemActive ? (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-amber-100 border border-amber-300 text-amber-800 font-mono">
                        In Remediation
                      </span>
                    ) : item.urgency === "Critical" ? (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-rose-100 border border-rose-300 text-rose-800 font-mono">
                        Critical
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-amber-50 border border-amber-200 text-amber-800 font-mono">
                        Priority
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[var(--muted)] leading-snug line-clamp-2 mb-2">
                    {item.evidence}
                  </p>

                  <div className="flex items-center justify-between gap-2 mt-1">
                    <SkillChip tone={isSelected ? "warm" : isItemRemediated ? "sage" : "sage"}>
                      {item.skill}
                    </SkillChip>
                    <span className="text-[10px] font-mono text-[var(--sage-500)]">
                      Phase 0{itemPhaseIdx + 1}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Column (7 cols): Comprehensive Diagnostic Dossier */}
        <div className="lg:col-span-7">
          <div className="bg-[var(--white)] border border-[var(--line)] rounded-2xl p-6 sm:p-7 shadow-xs">
            {/* Dossier Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--line)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--sage-500)] font-semibold">
                    Diagnostic Telemetry Dossier
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    98.4% Confidence
                  </span>
                </div>
                <Heading level={2} className="!text-xl !leading-tight text-[var(--forest-950)] mt-1">
                  {currentSignal.bottleneckHeading}
                </Heading>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-mono font-semibold border ${
                    isRemediated
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : isCurrentlyRemediating
                      ? "bg-amber-50 text-amber-800 border-amber-300"
                      : currentSignal.urgency === "Critical"
                      ? "bg-rose-50 text-rose-800 border-rose-300"
                      : "bg-amber-50 text-amber-800 border-amber-200"
                  }`}
                >
                  {isRemediated
                    ? "✓ Remediated & Verified"
                    : isCurrentlyRemediating
                    ? "⚡ In Active Remediation"
                    : `${currentSignal.urgency} Bottleneck`}
                </span>
              </div>
            </div>

            {/* Diagnostic Interactive Tabs */}
            <div className="flex items-center gap-1 my-4 border-b border-[var(--line)] pb-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("verdict")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "verdict"
                    ? "bg-[var(--forest-900)] text-[var(--lime-300)] font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--forest-950)] hover:bg-[var(--ivory)]"
                }`}
              >
                <Icon name="spark" size={13} />
                <span>Diagnostic Verdict</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("kernel")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "kernel"
                    ? "bg-[var(--forest-900)] text-[var(--lime-300)] font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--forest-950)] hover:bg-[var(--ivory)]"
                }`}
              >
                <Icon name="grid" size={13} />
                <span>Kernel Log & Trace</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "code"
                    ? "bg-[var(--forest-900)] text-[var(--lime-300)] font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--forest-950)] hover:bg-[var(--ivory)]"
                }`}
              >
                <Icon name="branch" size={13} />
                <span>AST Code Anomaly</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("sandbox")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === "sandbox"
                    ? "bg-[var(--forest-900)] text-[var(--lime-300)] font-semibold"
                    : "text-[var(--muted)] hover:text-[var(--forest-950)] hover:bg-[var(--ivory)]"
                }`}
              >
                <Icon name="target" size={13} />
                <span>Live Assertion Check</span>
              </button>
            </div>

            {/* TAB 1: Diagnostic Verdict */}
            {activeTab === "verdict" && (
              <div className="space-y-4 animate-fadeIn">
                {/* Telemetry Stats Grid */}
                <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-[var(--ivory)] border border-[var(--line)]">
                  {currentSignal.telemetryStats.map((statItem, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span
                        className={`font-mono text-base font-bold ${
                          isRemediated
                            ? "text-emerald-700"
                            : statItem.tone === "crimson"
                            ? "text-rose-700"
                            : statItem.tone === "amber"
                            ? "text-amber-700"
                            : "text-[var(--forest-900)]"
                        }`}
                      >
                        {isRemediated && idx === 0 ? "Resolved" : statItem.stat}
                      </span>
                      <span className="text-[10px] text-[var(--sage-600)] leading-tight mt-0.5">
                        {statItem.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Root Cause Analysis */}
                <div className="p-3.5 rounded-xl bg-[var(--white)] border border-[var(--line)]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--sage-500)] font-semibold block mb-1">
                    Telemetry Root-Cause Analysis
                  </span>
                  <p className="text-xs text-[var(--forest-900)] leading-relaxed">
                    {currentSignal.rootCause}
                  </p>
                </div>

                {/* Flagged Telemetry Triggers */}
                <div>
                  <strong className="text-[10px] uppercase font-mono tracking-wider text-[var(--sage-600)] block mb-2">
                    Observed AST & Kernel Triggers:
                  </strong>
                  <div className="space-y-1.5">
                    {currentSignal.flaggedTelemetry.map((reason, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-2 text-xs py-1.5 px-3 rounded-lg border font-mono ${
                          isRemediated
                            ? "bg-emerald-50/80 border-emerald-200 text-emerald-800"
                            : "bg-[var(--ivory)] border-[var(--line)] text-[var(--forest-900)]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            isRemediated ? "bg-emerald-600" : "bg-rose-500"
                          }`}
                        />
                        <span className="text-[11px] leading-snug">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prescribed Action */}
                <div
                  className={`p-3.5 rounded-xl border ${
                    isRemediated
                      ? "bg-emerald-50/70 border-emerald-200"
                      : isCurrentlyRemediating
                      ? "bg-amber-50/80 border-amber-200"
                      : "bg-[var(--warm-light)] border-[var(--warm)]/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`text-[10px] uppercase tracking-wider font-mono font-bold ${
                        isRemediated
                          ? "text-emerald-800"
                          : isCurrentlyRemediating
                          ? "text-amber-800"
                          : "text-[#81552e]"
                      }`}
                    >
                      {isRemediated
                        ? "✓ Verified in Project Pipeline"
                        : isCurrentlyRemediating
                        ? "⚡ Active Remediation Task"
                        : "Prescribed Fix"}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--sage-600)]">
                      {currentSignal.phaseName}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--forest-950)] leading-relaxed">
                    {isRemediated
                      ? "Telemetry traces confirm this issue is resolved. Tests and cross-validation assertions passed successfully in the Micro-Project studio."
                      : currentSignal.recommendedAction}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: Kernel Log & Trace */}
            {activeTab === "kernel" && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--sage-500)] font-semibold">
                      Live Telemetry Kernel Log
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--ivory)] border border-[var(--line)] text-[var(--forest-900)]">
                      {currentSignal.kernelLog.cell}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulateKernel}
                    disabled={kernelExecuting}
                    className="px-2.5 py-1 rounded text-[11px] font-mono bg-[var(--ivory)] hover:bg-[var(--warm-light)] border border-[var(--line)] text-[var(--forest-900)] cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${kernelExecuting ? "animate-ping" : ""}`} />
                    <span>{kernelExecuting ? "Executing..." : "Re-run Trace Test"}</span>
                  </button>
                </div>

                <div className="bg-[#0c1310] border border-[#204030] rounded-xl overflow-hidden font-mono shadow-inner">
                  <div className="px-3.5 py-2 bg-[#121c17] border-b border-[#204030] flex items-center justify-between text-[11px] text-[#9fc7b0]">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <span className="ml-2 font-bold text-white">$ {currentSignal.kernelLog.command}</span>
                    </div>
                    <span className="text-[10px] text-rose-400">Exit: {currentSignal.kernelLog.exitCode}</span>
                  </div>

                  <div className="p-3.5 text-xs text-[#d1e8db] leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                    {kernelExecuting ? (
                      <div className="text-[var(--lime-300)] animate-pulse">
                        [EXEC] Re-running kernel trace against notebook sandbox...
                        [STREAM] Evaluating AST nodes and exception interceptors...
                      </div>
                    ) : (
                      currentSignal.kernelLog.output
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[var(--ivory)] border border-[var(--line)] text-xs text-[var(--muted)]">
                  <strong className="text-[10px] font-mono uppercase text-[var(--forest-900)] block mb-1">
                    Exception Signature:
                  </strong>
                  <span className="font-mono text-rose-700 font-semibold text-[11px]">
                    {currentSignal.kernelLog.errorType}
                  </span>
                </div>
              </div>
            )}

            {/* TAB 3: AST Code Anomaly */}
            {activeTab === "code" && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--sage-500)] font-semibold">
                    AST Code Comparison · Flaw vs Solution
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(currentSignal.codeComparison.remedyCode)}
                    className="text-[11px] font-mono text-[var(--forest-900)] hover:text-emerald-700 cursor-pointer flex items-center gap-1"
                  >
                    <span>{copiedCode ? "✓ Copied" : "Copy Solution"}</span>
                  </button>
                </div>

                {/* Flawed Code */}
                <div className="rounded-xl border border-rose-200 overflow-hidden bg-rose-50/30">
                  <div className="px-3 py-1.5 bg-rose-100/70 border-b border-rose-200 flex items-center justify-between text-xs">
                    <span className="font-mono text-rose-900 font-semibold text-[11px]">
                      ✗ {currentSignal.codeComparison.flawedTitle}
                    </span>
                    <span className="text-[10px] font-mono text-rose-700">Flagged by AST</span>
                  </div>
                  <pre className="p-3 text-[11px] font-mono text-rose-950 overflow-x-auto bg-white/70">
                    <code>{currentSignal.codeComparison.flawedCode}</code>
                  </pre>
                  <div className="p-2.5 text-[11px] text-rose-800 border-t border-rose-200 bg-rose-50/50">
                    {currentSignal.codeComparison.flawExplanation}
                  </div>
                </div>

                {/* Remediated Code */}
                <div className="rounded-xl border border-emerald-300 overflow-hidden bg-emerald-50/30">
                  <div className="px-3 py-1.5 bg-emerald-100/70 border-b border-emerald-300 flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-900 font-semibold text-[11px]">
                      ✓ {currentSignal.codeComparison.remedyTitle}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700">Production Resilient</span>
                  </div>
                  <pre className="p-3 text-[11px] font-mono text-emerald-950 overflow-x-auto bg-white/70">
                    <code>{currentSignal.codeComparison.remedyCode}</code>
                  </pre>
                  <div className="p-2.5 text-[11px] text-emerald-800 border-t border-emerald-300 bg-emerald-50/50">
                    {currentSignal.codeComparison.remedyExplanation}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Live Assertion Sandbox */}
            {activeTab === "sandbox" && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--sage-500)] font-semibold">
                      Automated Pipeline Assertions
                    </span>
                    <p className="text-xs text-[var(--muted)]">
                      Verifies whether the learner code satisfies strict production requirements.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRunAssertionCheck}
                    disabled={assertionRunning}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[var(--forest-900)] hover:bg-[var(--forest-800)] text-[var(--lime-300)] cursor-pointer flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-[var(--lime-400)] ${assertionRunning ? "animate-ping" : ""}`} />
                    <span>{assertionRunning ? "Running Checks..." : "Run Assertion Suite"}</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {currentSignal.diagnosticAssertions.map((assertion, idx) => {
                    const isPassed = isRemediated || assertionRunning
                    return (
                      <div
                        key={assertion.id}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                          isPassed
                            ? "bg-emerald-50/80 border-emerald-300 text-emerald-900"
                            : "bg-[var(--ivory)] border-[var(--line)] text-[var(--forest-950)]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-semibold ${
                              isPassed
                                ? "bg-emerald-200 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {isPassed ? "✓" : `!`}
                          </span>
                          <div>
                            <strong className="text-xs font-semibold block">{assertion.name}</strong>
                            <span className="text-[10px] font-mono text-[var(--muted)]">{assertion.check}</span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                            isPassed
                              ? "bg-emerald-200 text-emerald-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {isPassed ? "PASS ✓" : "FAIL"}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {isRemediated && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2">
                    <Icon name="check" size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Telemetry verifies that all diagnostic assertions pass without regressions.</span>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Remediation CTA Bridge to Micro-Project */}
            <div className="mt-5 pt-4 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[var(--muted)]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--sage-500)] font-semibold block">
                  Studio Integration:
                </span>
                <span>
                  {isRemediated
                    ? "Remediation verified in pipeline telemetry."
                    : `Resolves in Phase 0${targetPhaseIndex + 1} of your active Micro-Project.`}
                </span>
              </div>

              <button
                type="button"
                onClick={handleJumpToMicroProject}
                className={`w-full sm:w-auto py-2.5 px-5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                  isRemediated
                    ? "bg-emerald-700 hover:bg-emerald-800 text-white"
                    : "bg-[var(--warm)] hover:bg-[#d99b58] text-[var(--forest-950)]"
                }`}
              >
                <span>
                  {isRemediated
                    ? `✓ Phase 0${targetPhaseIndex + 1} Remediated (Review in Studio)`
                    : isCurrentlyRemediating
                    ? `Continue in Phase 0${targetPhaseIndex + 1}: ${currentSignal.phaseName}`
                    : `Remediate in ${currentSignal.phaseName}`}
                </span>
                <Icon name="arrow" size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
