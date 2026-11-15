import { beforeEach, describe, expect, it, vi } from "vitest"
import { readFile } from "node:fs/promises"
import { NextRequest } from "next/server"

import { POST } from "../app/api/parse-pdf/route"

let requestNumber = 0
function makeRequest(file: File, ip = `192.0.2.${++requestNumber}`) {
  const form = new FormData()
  form.append("file", file)
  return new NextRequest("http://localhost/api/parse-pdf", {
    method: "POST",
    headers: { "x-real-ip": ip },
    body: form,
  })
}

beforeEach(() => vi.clearAllMocks())

describe("PDF parsing API", () => {
  it("parses a valid PDF and returns extracted text", async () => {
    const pdf = await readFile("public/Resume.pdf")
    const response = await POST(makeRequest(new File([pdf], "Resume.pdf", { type: "application/pdf" })))
    const body = await response.json()
    expect(response.status).toBe(200)
    expect(body.text).toContain("Mohamed Ezzat (Sonbol)")
    expect(body.text.length).toBeLessThanOrEqual(100_000)
  })

  it.each([
    [new File(["%PDF-1.7"], "resume.txt", { type: "text/plain" }), 415],
    [new File(["not a pdf"], "resume.pdf", { type: "application/pdf" }), 400],
    [new File(["%PDF-1.7 malformed"], "resume.pdf", { type: "application/pdf" }), 400],
  ])("rejects invalid upload with status %s", async (file, expectedStatus) => {
    const response = await POST(makeRequest(file))
    expect(response.status).toBe(expectedStatus)
    expect((await response.json()).error).toBeTruthy()
  })

  it("rejects an oversized upload before parsing", async () => {
    const oversized = new File([new Uint8Array(10 * 1024 * 1024 + 1)], "resume.pdf", { type: "application/pdf" })
    const response = await POST(makeRequest(oversized))
    expect(response.status).toBe(413)
  })

  it("rejects non-multipart requests safely", async () => {
    const response = await POST(new NextRequest("http://localhost/api/parse-pdf", {
      method: "POST",
      headers: { "content-type": "application/json", "x-real-ip": "198.51.100.200" },
      body: "{}",
    }))
    expect(response.status).toBe(415)
  })
})

describe("PDF parsing limits", () => {
  it("caps extracted text and destroys the parser", async () => {
    vi.resetModules()
    vi.doMock("pdf-parse", () => {
      const parser = {
        getText: vi.fn().mockResolvedValue({ text: "x".repeat(120_000) }),
        destroy: vi.fn().mockResolvedValue(undefined),
      }
      return { PDFParse: vi.fn(function PDFParse() { return parser }) }
    })
    const { POST: mockedPost } = await import("../app/api/parse-pdf/route")
    const response = await mockedPost(makeRequest(new File(["%PDF-1.7"], "resume.pdf", { type: "application/pdf" })))
    expect(response.status).toBe(200)
    expect((await response.json()).text).toHaveLength(100_000)
  })
})
