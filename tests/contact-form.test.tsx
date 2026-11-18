// @vitest-environment happy-dom
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { ContactSection } from "@/components/contact-section"

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

const fetchMock = vi.fn()

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "Alex" } })
  fireEvent.change(screen.getByLabelText(/Email/), {
    target: { value: "alex@example.com" },
  })
  fireEvent.change(screen.getByLabelText(/Service/), {
    target: { value: "Web Development" },
  })
  fireEvent.change(screen.getByLabelText(/Project brief/), {
    target: { value: "A new marketing site with a small CMS." },
  })
}

function submitButton() {
  return screen.getByRole("button", { name: /Send project enquiry/i })
}

beforeEach(() => {
  window.__gtmInitialized = true
  window.dataLayer = []
  fetchMock.mockReset()
  vi.stubGlobal("fetch", fetchMock)
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe("ContactSection", () => {
  it("renders labelled required fields and the approved service options", () => {
    render(<ContactSection />)

    const name = screen.getByLabelText(/Name/) as HTMLInputElement
    const email = screen.getByLabelText(/Email/) as HTMLInputElement
    const service = screen.getByLabelText(/Service/) as HTMLSelectElement
    const message = screen.getByLabelText(/Project brief/) as HTMLTextAreaElement

    expect(name.required).toBe(true)
    expect(email.required).toBe(true)
    expect(service.required).toBe(true)
    expect(message.required).toBe(true)
    expect(name.getAttribute("aria-required")).toBe("true")

    expect(Array.from(service.options).map((option) => option.value)).toEqual([
      "",
      "Web Development",
      "E-commerce Solutions",
      "Analytics & Tracking",
      "Business Systems & Integrations",
      "AI & Automation",
      "Other / Not Sure Yet",
    ])
  })

  it("shows associated errors and moves focus to the first invalid field", () => {
    render(<ContactSection />)

    fireEvent.submit(screen.getByRole("form", { name: /Tell me what you're working on/i }))

    expect(fetchMock).not.toHaveBeenCalled()

    const name = screen.getByLabelText(/Name/) as HTMLInputElement
    expect(name.getAttribute("aria-invalid")).toBe("true")
    expect(name.getAttribute("aria-describedby")).toBe("contact-name-error")
    expect(screen.queryByText("Please enter your name.")).not.toBeNull()
    expect(document.activeElement).toBe(name)
  })

  it("rejects an invalid email before calling the API", () => {
    render(<ContactSection />)

    fireEvent.change(screen.getByLabelText(/Name/), { target: { value: "Alex" } })
    fireEvent.change(screen.getByLabelText(/Email/), { target: { value: "not-an-email" } })
    fireEvent.change(screen.getByLabelText(/Service/), {
      target: { value: "Web Development" },
    })
    fireEvent.change(screen.getByLabelText(/Project brief/), {
      target: { value: "A new site." },
    })

    fireEvent.click(submitButton())

    expect(fetchMock).not.toHaveBeenCalled()
    const email = screen.getByLabelText(/Email/) as HTMLInputElement
    expect(email.getAttribute("aria-invalid")).toBe("true")
    expect(screen.queryByText("Please enter a valid email address.")).not.toBeNull()
  })

  it("submits the preserved API contract and shows the loading then success state", async () => {
    let resolveFetch: (value: { ok: boolean; json: () => Promise<{ ok: boolean }> }) => void =
      () => {}

    fetchMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFetch = resolve
        }),
    )

    render(<ContactSection />)
    fillValidForm()
    fireEvent.click(submitButton())

    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe("/api/contact")
    expect(init.method).toBe("POST")
    expect(init.headers).toEqual({ "Content-Type": "application/json" })

    const body = JSON.parse(String(init.body))
    expect(body).toEqual({
      name: "Alex",
      email: "alex@example.com",
      message: "Service interest: Web Development\n\nA new marketing site with a small CMS.",
    })

    const sending = screen.getByRole("button", {
      name: /Sending enquiry/i,
    }) as HTMLButtonElement
    expect(sending.disabled).toBe(true)
    expect(screen.getByRole("form").getAttribute("aria-busy")).toBe("true")

    await act(async () => {
      resolveFetch({ ok: true, json: async () => ({ ok: true }) })
    })

    await waitFor(() => {
      expect(screen.queryByText("Enquiry sent")).not.toBeNull()
    })
    expect(screen.queryByRole("form")).toBeNull()
    expect(window.dataLayer).toContainEqual({
      event: "contact_form_submit",
      form_id: "contact-form",
    })
  })

  it("shows the API error response without clearing the form", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Too many messages. Please try again later." }),
    })

    render(<ContactSection />)
    fillValidForm()
    fireEvent.click(submitButton())

    await waitFor(() => {
      expect(screen.queryByRole("alert")?.textContent).toContain(
        "Too many messages. Please try again later.",
      )
    })
    expect(screen.queryByRole("form")).not.toBeNull()
  })

  it("shows a network error without clearing the form", async () => {
    fetchMock.mockRejectedValue(new Error("network unavailable"))

    render(<ContactSection />)
    fillValidForm()
    fireEvent.click(submitButton())

    await waitFor(() => {
      expect(screen.queryByRole("alert")?.textContent).toContain("Network error")
    })
    expect(screen.queryByRole("form")).not.toBeNull()
  })

  it("keeps every form control keyboard focusable", () => {
    render(<ContactSection />)

    const controls = [
      screen.getByLabelText(/Name/),
      screen.getByLabelText(/Email/),
      screen.getByLabelText(/Service/),
      screen.getByLabelText(/Project brief/),
      submitButton(),
    ]

    for (const control of controls) {
      control.focus()
      expect(document.activeElement).toBe(control)
    }
  })
})
