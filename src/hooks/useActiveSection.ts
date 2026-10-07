import { useEffect } from "react"
import { PortalSection } from "../types"

export function useActiveSection(
  sections: PortalSection[],
  onViewChange: (view: number) => void,
  scrollTargetRef: { current: string | null }
) {
  useEffect(() => {
    const elementList = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el))

    let frame = 0
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        if (scrollTargetRef.current) return
        const viewingLine = Math.max(150, window.innerHeight * 0.3)
        const sectionInView =
          elementList.find((el) => {
            const bounds = el.getBoundingClientRect()
            return bounds.top <= viewingLine && bounds.bottom >= viewingLine
          }) ||
          elementList
            .filter((el) => {
              const bounds = el.getBoundingClientRect()
              return bounds.bottom > 0 && bounds.top < window.innerHeight
            })
            .sort(
              (a, b) =>
                Math.abs(a.getBoundingClientRect().top - viewingLine) -
                Math.abs(b.getBoundingClientRect().top - viewingLine)
            )[0]

        if (!sectionInView) return
        const matched = sections.find((item) => item.id === sectionInView.id)
        if (matched) {
          onViewChange(matched.view)
        }
      })
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("resize", updateActiveSection)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("resize", updateActiveSection)
    }
  }, [sections, onViewChange, scrollTargetRef])
}

export function scrollToSection(
  sectionId: string,
  viewIndex: number,
  scrollTargetRef: { current: string | null },
  onViewChange: (view: number) => void
) {
  scrollTargetRef.current = sectionId
  onViewChange(viewIndex)
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
  window.setTimeout(() => {
    if (scrollTargetRef.current === sectionId) {
      scrollTargetRef.current = null
    }
  }, 900)
}
