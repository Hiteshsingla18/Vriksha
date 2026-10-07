import React from "react"

interface SkillChipProps {
  children: React.ReactNode
  tone?: "default" | "lime" | "sage" | "warm"
  className?: string
  onClick?: () => void
}

export default function SkillChip({
  children,
  tone = "default",
  className = "",
  onClick,
}: SkillChipProps) {
  if (onClick) {
    return (
      <button
        type="button"
        className={`skill-chip chip-${tone} cursor-pointer hover:opacity-90 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  return (
    <span className={`skill-chip chip-${tone} ${className}`}>
      {children}
    </span>
  )
}
