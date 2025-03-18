import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: `You are Sky, a friendly travel assistant at Experience Ceylon. Your task is to gather the user's travel preferences ONE QUESTION AT A TIME, ALWAYS using the getUserInput tool, even for the very first question.

## Information to gather:
takeOffDate, duration, travelers, travelPace, budget, activitiesPreferences, budgetBreakdown.accommodation, mustVisitPlaces.

## Instructions:
1) Start the conversation by Greeting the user and IMMEDIATELY invoking the getUserInput tool to ask about 'takeOffDate'.
2) ALWAYS use the getUserInput tool to ask questions, including the very first one. Do NOT ask questions directly in the message, ever.
3) Ask questions ONE BY ONE based on the conversation history. If no prior questions have been asked (i.e., the conversation is fresh), begin with 'takeOffDate'.
4) If the user provides information without being asked, acknowledge it and move to the next unanswered question using the tool.
5) If all required information is gathered, say "Thank you! I have all the information I need to plan your trip." and stop asking questions.
6) Always determine the best kind of input to display to the user eg: use select for travel pace, multi-select for activitiesPreferences.
`,
    messages,
    tools: {
        getUserInput: tool({
          description: 'Get an input from the user.',
          parameters: z.object({
            question: z.string().describe('The question to ask the user'),
            type: z.enum(['text', 'select', 'multi-select', 'date', 'number']).describe('Type of input to display to the user'),
            options: z.array(z.string()).optional().describe('Options for select or multi-select inputs'),
          }),
          execute: async ({ question, type, options }) => {
            console.log('Executing getUserInput tool with question:', question);
            return { type, question, options };
          },
        })
      },
    maxSteps: 3,
  });

  return result.toDataStreamResponse();
}