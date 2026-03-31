'use server';
/**
 * @fileOverview An AI agent that generates or improves bullet points for a resume's work experience section.
 *
 * - generateAIBulletPoints - A function that handles the AI bullet point generation process.
 * - AIBulletPointGeneratorInput - The input type for the generateAIBulletPoints function.
 * - AIBulletPointGeneratorOutput - The return type for the generateAIBulletPoints function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIBulletPointGeneratorInputSchema = z.object({
  jobTitle: z.string().describe('The job title for which to generate bullet points.'),
  companyName: z.string().describe('The company name where the job was held.'),
  jobResponsibilities: z
    .string()
    .describe('A description of job responsibilities or existing bullet points to improve.'),
  keywords: z
    .string()
    .optional()
    .describe('Optional keywords to incorporate into the bullet points, e.g., "leadership, project management, sales growth".'),
});
export type AIBulletPointGeneratorInput = z.infer<typeof AIBulletPointGeneratorInputSchema>;

const AIBulletPointGeneratorOutputSchema = z.object({
  bulletPoints: z.array(z.string()).describe('An array of impactful resume bullet points.'),
});
export type AIBulletPointGeneratorOutput = z.infer<typeof AIBulletPointGeneratorOutputSchema>;

export async function generateAIBulletPoints(
  input: AIBulletPointGeneratorInput
): Promise<AIBulletPointGeneratorOutput> {
  return aiBulletPointGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiBulletPointGeneratorPrompt',
  input: { schema: AIBulletPointGeneratorInputSchema },
  output: { schema: AIBulletPointGeneratorOutputSchema },
  prompt: `You are an expert resume writer specializing in creating concise, impactful, and achievement-oriented bullet points for work experience sections. Your goal is to help a job seeker craft highly effective bullet points that showcase their skills and accomplishments.

Based on the following details, generate or improve bullet points for a resume. Each bullet point should begin with a strong action verb, quantify results whenever possible, and clearly articulate value. Aim for 3-5 high-quality bullet points.

Job Title: {{{jobTitle}}}
Company: {{{companyName}}}
Responsibilities/Existing Points: {{{jobResponsibilities}}}
{{#if keywords}}Keywords to emphasize: {{{keywords}}}{{/if}}

Please provide the output as a JSON object with a single key 'bulletPoints' which contains an array of strings.
Example:
{
  "bulletPoints": [
    "Managed a team of 5 developers, delivering 3 major projects ahead of schedule.",
    "Increased sales by 15% in Q3 by implementing a new customer engagement strategy."
  ]
}`,
});

const aiBulletPointGeneratorFlow = ai.defineFlow(
  {
    name: 'aiBulletPointGeneratorFlow',
    inputSchema: AIBulletPointGeneratorInputSchema,
    outputSchema: AIBulletPointGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
