import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,       // e.g. smtp.hostinger.com
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,                      // true for port 465 (SSL)
      auth: {
        user: process.env.SMTP_USER,     // ezzat@exceptionalgrp.com
        pass: process.env.SMTP_PASS,     // your email password
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,         // send to yourself
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#7c3aed;">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;width:80px;">Name</td><td style="padding:8px;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
          <p style="white-space:pre-wrap;color:#374151;">${message}</p>
        </div>
      `,
    })

    // Send Telegram Notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
      const telegramText = `*New Portfolio Message*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:*\n${message}`;
      
      await fetch(telegramUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramText,
          parse_mode: "Markdown",
        }),
      }).catch(err => console.error("[contact] telegram error:", err));
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[contact] email error:", err)
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 })
  }
}
