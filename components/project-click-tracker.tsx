"use client"

import type { MouseEvent, ReactNode } from "react"

import { trackProjectClick } from "@/lib/analytics"

export function ProjectClickTracker({ children }: { children: ReactNode }) {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const card = (event.target as Element).closest<HTMLElement>("[data-project-name]")
    if (!card?.dataset.projectName || !card.dataset.projectCategory) return

    trackProjectClick({
      project_name: card.dataset.projectName,
      project_category: card.dataset.projectCategory,
    })
  }

  return <div onClick={handleClick}>{children}</div>
}
