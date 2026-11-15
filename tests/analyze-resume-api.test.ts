import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

const generateObject = vi.hoisted(() => vi.fn())
const openai = vi.hoisted(() => vi.fn(() => "mock-model"))
vi.mock("ai", () => ({ generateObject }))
vi.mock("@ai-sdk/openai", () => ({ openai }))

import { POST } from "../app/api/analyze-resume/route"

let requestNumber = 0
const validResult = {
  overallScore: 80,
  keywordMatch: 75,
  keywordDetails: "Good match",
  foundKeywords: ["JavaScript"],
  missingKeywords: ["Testing"],
  actionVerbs: 80,
  actionVerbsDetails: "Strong verbs",
  foundActionVerbs: ["Debugged"],
  formatting: 85,
  formattingDetails: "Readable",
  feedback: ["Keep the summary concise"],
  parsedData: {
    name: "Mohamed Ezzat (Sonbol)",
    title: "Technical Support Engineer",
    summary: "Technical support specialist",
    contact: { email: "mhmdezzat.eng@gmail.com", phone: "+48 732 785 743", location: "Warsaw, Poland", linkedin: "linkedin.com/in/mohamedsonbol" },
    experience: [],
    education: [],
    skills: ["JavaScript"],
    languages: [{ language: "English", proficiency: "Native" }],
  },
}

function makeRequest(payload: unknown, ip = `203.0.113.${++requestNumber}`) {
  return new NextRequest("http://localhost/api/analyze-resume", {
    method: "POST",
    headers: { "content-type": "application/json", "x-real-ip": ip },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  delete process.env.OPENAI_API_KEY
})

describe("resume analysis API", () => {
  it("rejects missing or invalid resume input before calling the provider", async () => {
    const missing = await POST(makeRequest({}))
    expect(missing.status).toBe(400)
    expect(generateObject).not.toHaveBeenCalled()

    const malformed = await POST(makeRequest("{"))
    expect(malformed.status).toBe(400)

    const oversized = await POST(makeRequest({ text: "x".repeat(50_001) }))
    expect(oversized.status).toBe(400)
  })

  it("returns a safe response when the API key is missing", async () => {
    const response = await POST(makeRequest({ text: "resume text" }))
    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: "OpenAI API key not configured." })
  })

  it("returns validated provider output without exposing the API key", async () => {
    process.env.OPENAI_API_KEY = "test-key"
    generateObject.mockResolvedValue({ object: validResult })
    const response = await POST(makeRequest({ text: "resume text", targetCompany: "Example", region: "EU" }))
    const body = await response.json()
    expect(response.status).toBe(200)
    expect(body).toEqual(validResult)
    expect(JSON.stringify(body)).not.toContain("test-key")
    expect(openai).toHaveBeenCalledWith("gpt-4o-mini")
  })

  it("handles provider failures and invalid provider output safely", async () => {
    process.env.OPENAI_API_KEY = "test-key"
    generateObject.mockRejectedValueOnce(new Error("provider unavailable"))
    const failed = await POST(makeRequest({ text: "resume text" }))
    expect(failed.status).toBe(502)
    expect((await failed.json()).error).toBe("Resume analysis is temporarily unavailable.")

    generateObject.mockResolvedValueOnce({ object: { ...validResult, overallScore: 999 } })
    const invalid = await POST(makeRequest({ text: "resume text" }))
    expect(invalid.status).toBe(502)
    expect((await invalid.json()).error).toBe("Resume analysis is temporarily unavailable.")
  })
})
