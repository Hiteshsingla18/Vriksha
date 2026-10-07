interface LogoProps {
  onClick: () => void
  className?: string
}

export default function Logo({ onClick, className = "" }: LogoProps) {
  return (
    <button
      className={`logo ${className}`}
      onClick={onClick}
      aria-label="Vriksha home"
    >
      <span className="logo-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>VRIKSHA</span>
    </button>
  )
}
