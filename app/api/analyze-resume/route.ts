import { z } from 'zod';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { checkRateLimit, getClientAddress, readJsonBody, RequestBodyTooLargeError } from '@/lib/api-security';

export const maxDuration = 30;

const MAX_BODY_BYTES = 64 * 1024;
const requestSchema = z.object({
  text: z.string().trim().min(1, 'No resume text provided.').max(50_000, 'Resume text is too long.'),
  targetCompany: z.string().trim().max(120).optional().default('Not specified'),
  region: z.string().trim().max(80).optional().default('Not specified'),
}).strict();

const analysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  keywordMatch: z.number().min(0).max(100),
  keywordDetails: z.string().max(2_000),
  foundKeywords: z.array(z.string().max(120)).max(10),
  missingKeywords: z.array(z.string().max(120)).max(10),
  actionVerbs: z.number().min(0).max(100),
  actionVerbsDetails: z.string().max(2_000),
  foundActionVerbs: z.array(z.string().max(120)).max(10),
  formatting: z.number().min(0).max(100),
  formattingDetails: z.string().max(2_000),
  feedback: z.array(z.string().max(1_000)).max(6),
  parsedData: z.object({
    name: z.string().max(200),
    title: z.string().max(200),
    summary: z.string().max(2_000),
    contact: z.object({
      email: z.string().max(254),
      phone: z.string().max(40),
      location: z.string().max(200),
      linkedin: z.string().max(300),
    }),
    experience: z.array(z.object({
      company: z.string().max(200),
      role: z.string().max(200),
      date: z.string().max(100),
      location: z.string().max(200),
      bullets: z.array(z.string().max(1_000)).max(20),
    })).max(30),
    education: z.array(z.object({
      degree: z.string().max(200),
      institution: z.string().max(250),
      date: z.string().max(100),
    })).max(20),
    skills: z.array(z.string().max(120)).max(50),
    languages: z.array(z.object({
      language: z.string().max(100),
      proficiency: z.string().max(100),
    })).max(20),
  }),
});

export async function POST(req: Request) {
  const rateLimit = checkRateLimit(`analyze-resume:${getClientAddress(req)}`, 5, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    return Response.json(
      { error: 'Too many analysis requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } },
    );
  }

  try {
    if (!req.headers.get('content-type')?.toLowerCase().includes('application/json')) {
      return Response.json({ error: 'Content-Type must be application/json.' }, { status: 415 });
    }

    const payload = await readJsonBody<unknown>(req, MAX_BODY_BYTES);
    const { text, targetCompany, region } = requestSchema.parse(payload);

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: 'OpenAI API key not configured.' }, { status: 500 });
    }

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: analysisSchema,
      prompt: `Analyze the following resume text for ATS (Applicant Tracking System) compatibility and carefully extract the structured data.
      Target Company: ${targetCompany}
      Target Region: ${region}
      
      Instructions for ATS Analysis:
      - Check for standard headers ("Experience", "Education", "Skills").
      - Look for quantifiable impact (e.g., percentages %, dollar signs $).
      - For EU region, note if there are missing/extra details that are customary.
      - For Google/US, emphasize the X-Y-Z formula and strict no-photo policy.
      - Extract exactly 3-5 'foundKeywords', 3-5 'missingKeywords', and 3-5 'foundActionVerbs' for the UI badges based on the target company.
      - Return a realistic overall score and breakdown metrics.
      - Provide 3-4 highly specific, actionable feedback points.

      Instructions for Data Extraction (parsedData):
      - Extract the candidate's name, title, and summary.
      - Extract contact information. If any is missing, leave it blank.
      - Extract all work experience entries with their respective bullets.
      - Extract education history.
      - Extract skills into an array of strings.
      - Extract languages and proficiency levels. Make sure to guess proficiency if not explicitly stated (e.g. 'English' -> 'Native' or 'Fluent').
      
      Resume Text:
      ${text.substring(0, 12_000)}
      `,
    });

    const validatedResult = analysisSchema.safeParse(object);
    if (!validatedResult.success) {
      console.error("Resume analysis provider returned invalid output")
      return Response.json({ error: 'Resume analysis is temporarily unavailable.' }, { status: 502 });
    }

    return Response.json(validatedResult.data);
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return Response.json({ error: 'Request body is too large.' }, { status: 413 });
    }
    if (error instanceof SyntaxError) {
      return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.issues[0]?.message ?? 'Invalid request.' }, { status: 400 });
    }
    console.error("Error analyzing resume:", error instanceof Error ? error.message : "unknown error");
    return Response.json({ error: 'Resume analysis is temporarily unavailable.' }, { status: 502 });
  }
}
