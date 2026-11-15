import { beforeEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

const createTransport = vi.hoisted(() => vi.fn())
vi.mock("nodemailer", () => ({ default: { createTransport }, createTransport }))

import { POST } from "../app/api/contact/route"

let requestNumber = 0

function makeRequest(payload: unknown, ip = `198.51.100.${++requestNumber}`) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-real-ip": ip },
    body: typeof payload === "string" ? payload : JSON.stringify(payload),
  })
}

function configureSmtp() {
  process.env.SMTP_HOST = "smtp.example.test"
  process.env.SMTP_USER = "owner@example.test"
  process.env.SMTP_PASS = "secret"
  process.env.SMTP_PORT = "465"
  createTransport.mockReturnValue({ sendMail: vi.fn().mockResolvedValue({ messageId: "test" }) })
}

beforeEach(() => {
  vi.clearAllMocks()
  for (const key of ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "SMTP_PORT", "TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"]) {
    delete process.env[key]
  }
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }))
})

describe("contact API", () => {
  it("sends a valid submission through SMTP and Telegram", async () => {
    configureSmtp()
    process.env.TELEGRAM_BOT_TOKEN = "bot-token"
    process.env.TELEGRAM_CHAT_ID = "chat-id"

    const response = await POST(makeRequest({ name: "Mohamed", email: "candidate@example.com", message: "Hello" }))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
    expect(createTransport).toHaveBeenCalledWith(expect.objectContaining({ host: "smtp.example.test", port: 465, secure: true }))
    expect(vi.mocked(fetch)).toHaveBeenCalledWith(
      "https://api.telegram.org/botbot-token/sendMessage",
      expect.objectContaining({ method: "POST" }),
    )
  })

  it.each([
    { payload: { email: "a@example.com", message: "message" }, label: "required fields" },
    { payload: { name: "Name", email: "bad-email", message: "message" }, label: "invalid email" },
    { payload: { name: "Name", email: "a@example.com", message: "" }, label: "empty message" },
  ])("rejects $label", async ({ payload }) => {
    const response = await POST(makeRequest(payload))
    expect(response.status).toBe(400)
    expect(createTransport).not.toHaveBeenCalled()
  })

  it("rejects malformed JSON and oversized fields", async () => {
    const malformed = await POST(makeRequest("{"))
    expect(malformed.status).toBe(400)

    const oversized = await POST(makeRequest({ name: "N", email: "a@example.com", message: "x".repeat(5_001) }))
    expect(oversized.status).toBe(400)
  })

  it("rejects header injection and escapes HTML output", async () => {
    configureSmtp()
    const injected = await POST(makeRequest({ name: "Name\r\nBcc: attacker@example.com", email: "a@example.com", message: "x" }))
    expect(injected.status).toBe(400)

    const response = await POST(makeRequest({ name: "<img src=x onerror=alert(1)>", email: "a@example.com", message: "<script>alert(1)</script>" }))
    expect(response.status).toBe(200)
    const sendMail = createTransport.mock.results.at(-1)?.value.sendMail
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      html: expect.stringContaining("&lt;img src=x onerror=alert(1)&gt;"),
    }))
    expect(sendMail.mock.calls[0][0].html).not.toContain("<script>alert(1)</script>")
  })

  it("returns a safe response when SMTP is not configured or fails", async () => {
    const missing = await POST(makeRequest({ name: "Name", email: "a@example.com", message: "x" }))
    expect(missing.status).toBe(503)
    expect(await missing.json()).toEqual({ error: "Email service is not configured." })

    configureSmtp()
    createTransport.mockReturnValue({ sendMail: vi.fn().mockRejectedValue(new Error("smtp failed")) })
    const failed = await POST(makeRequest({ name: "Name", email: "a@example.com", message: "x" }))
    expect(failed.status).toBe(500)
    expect(await failed.json()).toEqual({ error: "Failed to send email." })
  })

  it("does not fail the contact request when Telegram fails", async () => {
    configureSmtp()
    process.env.TELEGRAM_BOT_TOKEN = "bot-token"
    process.env.TELEGRAM_CHAT_ID = "chat-id"
    vi.mocked(fetch).mockRejectedValueOnce(new Error("telegram unavailable"))

    const response = await POST(makeRequest({ name: "Name", email: "a@example.com", message: "x" }))
    expect(response.status).toBe(200)
  })

  it("rate-limits repeated requests from one address", async () => {
    configureSmtp()
    const ip = "203.0.113.77"
    for (let index = 0; index < 5; index += 1) {
      expect((await POST(makeRequest({ name: "Name", email: "a@example.com", message: "x" }, ip))).status).toBe(200)
    }
    const limited = await POST(makeRequest({ name: "Name", email: "a@example.com", message: "x" }, ip))
    expect(limited.status).toBe(429)
    expect(limited.headers.get("retry-after")).toBeTruthy()
  })
})
