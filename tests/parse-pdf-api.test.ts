import { beforeEach, describe, expect, it, vi } from "vitest"
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

function makeTextPdf(text: string) {
  const escapedText = text.replace(/[\\()]/g, "\\$&")
  const stream = `BT /F1 18 Tf 72 720 Td (${escapedText}) Tj ET`
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
    `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ]

  let pdf = "%PDF-1.4\n"
  const offsets: number[] = []
  for (let index = 0; index < objects.length; index += 1) {
    offsets.push(Buffer.byteLength(pdf, "latin1"))
    pdf += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`
  }

  const xrefOffset = Buffer.byteLength(pdf, "latin1")
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (const offset of offsets) {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

  return Buffer.from(pdf, "latin1")
}

beforeEach(() => vi.clearAllMocks())

describe("PDF parsing API", () => {
  it("parses a valid PDF and returns extracted text", async () => {
    const pdf = makeTextPdf("Test Resume")
    const response = await POST(makeRequest(new File([pdf], "resume.pdf", { type: "application/pdf" })))
    const body = await response.json()
    expect(response.status).toBe(200)
    expect(body.text).toContain("Test Resume")
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
