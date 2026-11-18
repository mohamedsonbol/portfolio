import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { checkRateLimit, escapeHtml, getClientAddress, readJsonBody, RequestBodyTooLargeError } from "@/lib/api-security"

const MAX_BODY_BYTES = 16 * 1024
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 5_000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(`contact:${getClientAddress(req)}`, 5, 10 * 60 * 1000)
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    )
  }

  try {
    if (!req.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 })
    }

    const payload = await readJsonBody<unknown>(req, MAX_BODY_BYTES)
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
    }

    const { name, email, message } = payload as Record<string, unknown>
    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 })
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanMessage = message.trim()

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    if (cleanName.length > MAX_NAME_LENGTH || cleanEmail.length > MAX_EMAIL_LENGTH || cleanMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 })
    }

    if (!EMAIL_PATTERN.test(cleanEmail) || /[\r\n]/.test(cleanEmail) || /[\r\n]/.test(cleanName)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 })
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json({ error: "Email service is not configured." }, { status: 503 })
    }

    const smtpPort = Number(process.env.SMTP_PORT ?? 465)
    if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65_535) {
      return NextResponse.json({ error: "Email service is not configured correctly." }, { status: 503 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,     // your email password
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,         // send to yourself
      replyTo: cleanEmail,
      subject: `New message from ${cleanName.replace(/[\r\n]/g, " ")}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#7c3aed;">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;width:80px;">Name</td><td style="padding:8px;">${escapeHtml(cleanName)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${escapeHtml(cleanEmail)}">${escapeHtml(cleanEmail)}</a></td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
          <p style="white-space:pre-wrap;color:#374151;">${escapeHtml(cleanMessage)}</p>
        </div>
      `,
    })

    // Send Telegram Notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
      const telegramText = `New Portfolio Message\n\nName: ${cleanName}\nEmail: ${cleanEmail}\nMessage:\n${cleanMessage}`;
      
      await fetch(telegramUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramText.slice(0, 4_000),
        }),
      }).catch(err => console.error("[contact] telegram error:", err));
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof RequestBodyTooLargeError) {
      return NextResponse.json({ error: "Request body is too large." }, { status: 413 })
    }
    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
    }
    console.error("[contact] email delivery failed:", err instanceof Error ? err.message : "unknown error")
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
  }
}
