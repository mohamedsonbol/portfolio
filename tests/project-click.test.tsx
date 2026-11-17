// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { ProjectsSection } from "@/components/projects-section"
import { ProjectsGrid } from "@/app/projects/projects-grid"
import { HeroSection } from "@/components/hero-section"

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string
    children?: React.ReactNode
  } & Record<string, unknown>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}))

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...rest
  }: {
    src: string
    alt?: string
  } & Record<string, unknown>) => <img src={src} alt={alt} {...rest} />,
}))

class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver =
  IntersectionObserverStub as unknown as typeof IntersectionObserver

function projectClicks(): Record<string, unknown>[] {
  return (window.dataLayer ?? [])
    .filter(
      (entry): entry is Record<string, unknown> =>
        typeof entry === "object" && entry !== null && !Array.isArray(entry),
    )
    .filter((entry) => entry.event === "project_click")
}

function outboundClicks(): Record<string, unknown>[] {
  return (window.dataLayer ?? [])
    .filter(
      (entry): entry is Record<string, unknown> =>
        typeof entry === "object" && entry !== null && !Array.isArray(entry),
    )
    .filter((entry) => entry.event === "outbound_click")
}

describe("/projects grid project_click tracking", () => {
  beforeEach(() => {
    window.dataLayer = []
    window.__gtmInitialized = true
  })

  afterEach(cleanup)

  it("fires exactly one project_click when a card is clicked", () => {
    render(<ProjectsGrid />)
    fireEvent.click(screen.getByText("routing-app"))
    expect(projectClicks().length).toBe(1)
  })

  it("sends correct name, slug and category for a GitHub project", () => {
    render(<ProjectsGrid />)
    fireEvent.click(screen.getByText("routing-app"))
    expect(projectClicks()[0]).toMatchObject({
      event: "project_click",
      project_name: "routing-app",
      project_slug: "routing-app",
      project_category: "Web Development",
    })
  })

  it("sends correct values when clicking different projects", () => {
    render(<ProjectsGrid />)
    fireEvent.click(screen.getByText("moBlog"))
    expect(projectClicks()[0]).toMatchObject({
      project_name: "moBlog",
      project_slug: "moblog",
      project_category: "Full-Stack",
    })
    fireEvent.click(screen.getByText("CSS Selectors Game"))
    expect(projectClicks()[1]).toMatchObject({
      project_name: "CSS Selectors Game",
      project_slug: "css-selectors-game",
      project_category: "Experiment",
    })
  })

  it("uses lowercase hyphen-separated slugs for every project title", () => {
    render(<ProjectsGrid />)
    fireEvent.click(screen.getByText("websitePractice"))
    expect(projectClicks()[0]?.project_slug).toBe("websitepractice")
    fireEvent.click(screen.getByText("The-Gym"))
    expect(projectClicks()[1]?.project_slug).toBe("the-gym")
  })

  it("fires exactly one project_click when an inner link inside the card is clicked", () => {
    render(<ProjectsGrid />)
    const card = screen.getByText("routing-app").closest(".cursor-pointer") as HTMLElement
    fireEvent.click(within(card).getByText("Source"))
    expect(projectClicks().length).toBe(1)
    expect(projectClicks()[0]).toMatchObject({ project_name: "routing-app" })
  })

  it("fires exactly one project_click for the card header arrow link", () => {
    render(<ProjectsGrid />)
    const card = screen.getByText("routing-app").closest(".cursor-pointer") as HTMLElement
    const arrow = card.querySelector("a") as HTMLElement
    fireEvent.click(arrow)
    expect(projectClicks().length).toBe(1)
    expect(projectClicks()[0]).toMatchObject({ project_name: "routing-app" })
  })

  it("never fires outbound_click on project card or link clicks", () => {
    render(<ProjectsGrid />)
    fireEvent.click(screen.getByText("routing-app"))
    const card = screen.getByText("routing-app").closest(".cursor-pointer") as HTMLElement
    fireEvent.click(within(card).getByText("Source"))
    fireEvent.click(arrowFor(card))
    expect(outboundClicks().length).toBe(0)
    expect(projectClicks().length).toBe(3)
  })

  function arrowFor(card: HTMLElement): HTMLElement {
    return card.querySelector("a") as HTMLElement
  }

  it("does not fire on hover or focus", () => {
    render(<ProjectsGrid />)
    const card = screen.getByText("routing-app").closest(".cursor-pointer") as HTMLElement
    fireEvent.mouseEnter(card)
    fireEvent.mouseLeave(card)
    fireEvent.focus(screen.getByText("routing-app"))
    expect(projectClicks().length).toBe(0)
  })

  it("does not fire before analytics consent is granted", () => {
    window.__gtmInitialized = undefined
    render(<ProjectsGrid />)
    fireEvent.click(screen.getByText("routing-app"))
    expect(projectClicks().length).toBe(0)
  })
})

describe("Homepage featured project_click tracking", () => {
  beforeEach(() => {
    window.dataLayer = []
    window.__gtmInitialized = true
  })

  afterEach(cleanup)

  it("fires project_click with the correct parameters on the primary card", () => {
    render(<ProjectsSection />)
    fireEvent.click(screen.getByText("DR. CHOICE"))
    expect(projectClicks().length).toBe(1)
    expect(projectClicks()[0]).toMatchObject({
      event: "project_click",
      project_name: "DR. CHOICE",
      project_slug: "dr-choice",
      project_category: "E-Commerce",
    })
  })

  it("fires exactly one project_click when the project link inside the card is clicked", () => {
    render(<ProjectsSection />)
    fireEvent.click(screen.getByText("Visit project"))
    expect(projectClicks().length).toBe(1)
    expect(projectClicks()[0]).toMatchObject({ project_name: "DR. CHOICE" })
    expect(outboundClicks().length).toBe(0)
  })

  it("does not fire for the Explore projects navigation link", () => {
    render(<ProjectsSection />)
    fireEvent.click(screen.getByText("Explore projects"))
    expect(projectClicks().length).toBe(0)
  })

  it("sends correct values for the other featured projects", () => {
    render(<ProjectsSection />)
    fireEvent.click(screen.getByText("Pioneera"))
    expect(projectClicks()[0]).toMatchObject({
      project_name: "Pioneera",
      project_slug: "pioneera",
      project_category: "Full-Stack",
    })
    fireEvent.click(screen.getByText("Sonbol Labs"))
    expect(projectClicks()[1]).toMatchObject({
      project_name: "Sonbol Labs",
      project_slug: "sonbol-labs",
      project_category: "Experiments",
    })
  })

  it("does not fire on hover or focus", () => {
    render(<ProjectsSection />)
    fireEvent.mouseEnter(screen.getByText("Pioneera"))
    fireEvent.focus(screen.getByText("Sonbol Labs"))
    expect(projectClicks().length).toBe(0)
  })

  it("does not fire before analytics consent is granted", () => {
    window.__gtmInitialized = undefined
    render(<ProjectsSection />)
    fireEvent.click(screen.getByText("DR. CHOICE"))
    expect(projectClicks().length).toBe(0)
  })
})

describe("Resume download link", () => {
  beforeEach(() => {
    window.dataLayer = []
    window.__gtmInitialized = true
  })

  afterEach(cleanup)

  it("keeps the resume link and its download behavior", () => {
    render(<HeroSection />)
    const link = screen.getByRole("link", { name: /Download Resume/ })
    expect(link.getAttribute("href")).toBe("/Resume.pdf")
    expect(link.hasAttribute("download")).toBe(true)
  })

  it("does not generate any analytics events when clicked", () => {
    render(<HeroSection />)
    fireEvent.click(screen.getByRole("link", { name: /Download Resume/ }))
    expect((window.dataLayer ?? []).length).toBe(0)
  })
})
