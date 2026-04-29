import { z } from 'zod';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { text, targetCompany, region } = await req.json();

    if (!text || text.trim() === '') {
      return Response.json({ error: 'No resume text provided.' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: 'OpenAI API key not configured.' }, { status: 500 });
    }

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: z.object({
        overallScore: z.number().describe("The overall ATS score out of 100."),
        keywordMatch: z.number().describe("Score for keyword matching out of 100."),
        keywordDetails: z.string().describe("Specific missing keywords or what needs to be added (e.g. 'Add React, Node.js')."),
        actionVerbs: z.number().describe("Score for action verbs out of 100."),
        actionVerbsDetails: z.string().describe("Specific action verbs that are missing or what should be added."),
        formatting: z.number().describe("Score for formatting out of 100 based on region/company."),
        formattingDetails: z.string().describe("Explanation of formatting issues or what to change for the target region."),
        feedback: z.array(z.string()).describe("List of 3 to 4 specific feedback points based on the target company and region."),
        parsedData: z.object({
          name: z.string().describe("The candidate's full name."),
          title: z.string().describe("The candidate's current or target job title."),
          summary: z.string().describe("A professional summary or objective statement."),
          contact: z.object({
            email: z.string(),
            phone: z.string(),
            location: z.string(),
            linkedin: z.string()
          }),
          experience: z.array(z.object({
            company: z.string(),
            role: z.string(),
            date: z.string().describe("e.g. 'Jan 2021 - Present'"),
            location: z.string().describe("City, Country if available"),
            bullets: z.array(z.string()).describe("Bullet points describing achievements and responsibilities")
          })),
          education: z.array(z.object({
            degree: z.string(),
            institution: z.string(),
            date: z.string().describe("e.g. '2010 - 2013' or 'Present'")
          })),
          skills: z.array(z.string()),
          languages: z.array(z.object({
            language: z.string(),
            proficiency: z.string().describe("e.g. 'Native', 'Intermediate'")
          }))
        }).describe("Structured data extracted from the resume text.")
      }),
      prompt: `Analyze the following resume text for ATS (Applicant Tracking System) compatibility and carefully extract the structured data.
      Target Company: ${targetCompany}
      Target Region: ${region}
      
      Instructions for ATS Analysis:
      - Check for standard headers ("Experience", "Education", "Skills").
      - Look for quantifiable impact (e.g., percentages %, dollar signs $).
      - For EU region, note if there are missing/extra details that are customary.
      - For Google/US, emphasize the X-Y-Z formula and strict no-photo policy.
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
      ${text.substring(0, 5000)}
      `,
    });

    return Response.json(object);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return Response.json({ error: 'Failed to analyze resume.' }, { status: 500 });
  }
}
