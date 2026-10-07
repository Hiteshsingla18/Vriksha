import React from "react"

interface HeadingProps {
  children: React.ReactNode
  level?: 1 | 2 | 3
  className?: string
}

export default function Heading({
  children,
  level = 2,
  className = "",
}: HeadingProps) {
  return (
    <div className={`heading heading-${level} ${className}`}>
      {children}
    </div>
  )
}
