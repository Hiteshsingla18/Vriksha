interface ProgressBarProps {
  value: number
  tone?: "green" | "lime" | "gold"
  className?: string
}

export default function ProgressBar({
  value,
  tone = "green",
  className = "",
}: ProgressBarProps) {
  const boundedValue = Math.min(100, Math.max(0, value))
  return (
    <div className={`progress-track ${className}`}>
      <div
        className={`progress-fill fill-${tone}`}
        style={{ width: `${boundedValue}%` }}
        role="progressbar"
        aria-valuenow={boundedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  )
}
