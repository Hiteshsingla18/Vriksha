interface MetricProps {
  value: string
  label: string
  change?: string
  className?: string
}

export default function Metric({
  value,
  label,
  change,
  className = "",
}: MetricProps) {
  return (
    <div className={`metric-card ${className}`}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {change && <div className="metric-change">{change}</div>}
    </div>
  )
}
