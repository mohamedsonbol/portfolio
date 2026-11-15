import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import { checkRateLimit, getClientAddress } from "@/lib/api-security";

export const runtime = "nodejs";

const MAX_PDF_BYTES = 10 * 1024 * 1024;
const MAX_MULTIPART_BYTES = MAX_PDF_BYTES + 128 * 1024;
const MAX_EXTRACTED_TEXT_LENGTH = 100_000;

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(`parse-pdf:${getClientAddress(req)}`, 10, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many PDF parsing requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } },
    );
  }

  try {
    if (!req.headers.get("content-type")?.toLowerCase().includes("multipart/form-data")) {
      return NextResponse.json({ error: "Content-Type must be multipart/form-data." }, { status: 415 });
    }

    const contentLength = Number(req.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_MULTIPART_BYTES) {
      return NextResponse.json({ error: "The uploaded request is too large." }, { status: 413 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size <= 0 || file.size > MAX_PDF_BYTES) {
      return NextResponse.json({ error: "PDF must be between 1 byte and 10 MB." }, { status: 413 });
    }

    if (!file.name.toLowerCase().endsWith(".pdf") || file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are accepted." }, { status: 415 });
    }

    const header = new Uint8Array(await file.slice(0, 5).arrayBuffer());
    if (new TextDecoder().decode(header) !== "%PDF-") {
      return NextResponse.json({ error: "The uploaded file is not a valid PDF." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const parser = new PDFParse({ data: buffer });
    try {
      const data = await parser.getText();
      return NextResponse.json({ text: String(data.text ?? "").slice(0, MAX_EXTRACTED_TEXT_LENGTH) });
    } finally {
      await parser.destroy();
    }
  } catch (error) {
    console.error("Error parsing PDF:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "The PDF could not be parsed." }, { status: 400 });
  }
}
