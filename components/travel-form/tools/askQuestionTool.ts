// @ts-nocheck
import { userPreferencesSchema } from '../schema';

export const askQuestionTool = {
  type: 'function',
  function: {
    name: 'askQuestion',
    description: 'Ask the user a question to gather information for a specific preference field.',
    parameters: {
      type: 'object',
      properties: {
        field: {
          type: 'string',
          description: 'The preference field to ask about (e.g., "takeOffDate", "duration"). Use dot notation for nested fields (e.g., "budgetBreakdown.accommodation").',
        },
        question: {
          type: 'string',
          description: 'The question to ask the user.',
        },
      },
      required: ['field', 'question'],
    },
  },
};

export function parseResponse(field: string, response: string): any {
  const schemaParts = field.split('.');
  let schema = userPreferencesSchema;
  for (const part of schemaParts) {
    schema = schema.shape[part];
    if (!schema) throw new Error(`Unknown field: ${field}`);
  }

  try {
    if (schema._def.typeName === 'ZodArray') {
      return response.split(',').map((item) => item.trim());
    }
    if (schema._def.typeName === 'ZodBoolean') {
      return response.toLowerCase() === 'yes' || response.toLowerCase() === 'true';
    }
    return schema.parse(response);
  } catch (error) {
    console.error(`Failed to parse ${field}:`, error);
    return null; // Simplified error handling
  }
}