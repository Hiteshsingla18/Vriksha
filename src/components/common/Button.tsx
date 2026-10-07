import React from "react"
import { IconName } from "../../types"
import Icon from "./Icon"

interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "text"
  onClick?: () => void
  icon?: IconName
  type?: "button" | "submit"
  className?: string
  disabled?: boolean
  title?: string
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  icon,
  type = "button",
  className = "",
  disabled = false,
  title,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      title={title}
    >
      <span>{children}</span>
      {icon && <Icon name={icon} />}
    </button>
  )
}
