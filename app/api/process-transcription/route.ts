import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

// Define the schema for incident data
const incidentSchema = z.object({
  incidentCategory: z.enum([
    'Hate Incident',
    'Crime Incident',
    'Domestic Extremism',
    'Election Related',
    'Other'
  ]).optional(),
  incidentType: z.enum([
    'Physical Assault',
    'Verbal Harassment',
    'Property Vandalism',
    'Threats and Intimidation',
    'Online Harassment',
    'Distribution of Hate Material',
    'Discrimination',
    'Graffiti or Symbolic Vandalism',
    'Social Media Hate Speech',
    'Arson',
    'Trespassing',
    'Other'
  ]).optional(),
  specificIncidentType: z.array(z.enum([
    'Assault with Weapon',
    'Assault without Weapon',
    'Verbal Abuse',
    'Slurs',
    'Intimidation',
    'Harassment',
    'Vandalism',
    'Graffiti',
    'Property Damage',
    'Online Harassment',
    'Doxxing',
    'Stalking',
    'Discrimination in Services',
    'Workplace Discrimination',
    'Housing Discrimination'
  ])).optional(),
  natureOfIncident: z.array(z.enum([
    'Racially Motivated',
    'Religious Bias',
    'Gender-Based',
    'Sexual Orientation',
    'Disability-Related',
    'Ethnicity/National Origin',
    'Political Affiliation',
    'Immigration Status',
    'Age-Related',
    'Socioeconomic Status'
  ])).optional(),
  victimCount: z.enum([
    '1',
    '2-5',
    '6-10',
    '11-20',
    '21-50',
    '50+',
    'Unknown'
  ]).optional(),
  correctedTranscription: z.string().optional(),
});

const requestSchema = z.object({
  transcription: z.string(),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { transcription } = requestSchema.parse(body);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Extract structured information about this hate incident from the following description. Also provide a corrected version of the transcription that fixes any speech-to-text errors while maintaining the original meaning. Return the following JSON schema:
          {
            "incidentCategory": "Hate Incident" | "Crime Incident" | "Domestic Extremism" | "Election Related" | "Other",
            "incidentType": "Physical Assault" | "Verbal Harassment" | "Property Vandalism" | "Threats and Intimidation" | "Online Harassment" | "Distribution of Hate Material" | "Discrimination" | "Graffiti or Symbolic Vandalism" | "Social Media Hate Speech" | "Arson" | "Trespassing" | "Other",
            "specificIncidentType": ["Assault with Weapon" | "Assault without Weapon" | "Verbal Abuse" | "Slurs" | "Intimidation" | "Harassment" | "Vandalism" | "Graffiti" | "Property Damage" | "Online Harassment" | "Doxxing" | "Stalking" | "Discrimination in Services" | "Workplace Discrimination" | "Housing Discrimination"],
            "natureOfIncident": ["Racially Motivated" | "Religious Bias" | "Gender-Based" | "Sexual Orientation" | "Disability-Related" | "Ethnicity/National Origin" | "Political Affiliation" | "Immigration Status" | "Age-Related" | "Socioeconomic Status"],
            "victimCount": "1" | "2-5" | "6-10" | "11-20" | "21-50" | "50+" | "Unknown",
            "correctedTranscription": "The corrected and properly formatted version of the transcription"
          }
          
          Only include fields you can confidently determine - DO NOT assume anything unless you can confidently determine it with at least 0.9 confidence level. For the correctedTranscription, fix any obvious speech-to-text errors and improve clarity while maintaining the original meaning.`
        },
        {
          role: 'user',
          content: transcription
        }
      ],
      temperature: 0.1,
      response_format: { type: "json_object" }
    });

    const result = completion.choices[0]?.message?.content;
    if (!result) {
      throw new Error('No content in response');
    }

    const parsedResult = JSON.parse(result);
    const validatedResult = incidentSchema.parse(parsedResult);

    console.log(validatedResult);

    return NextResponse.json({
      ...validatedResult,
      description: validatedResult.correctedTranscription || transcription,
    });
  } catch (error) {
    console.error('Error processing transcription:', error);
    let errorMessage = 'Failed to process transcription';
    let errorDescription = '';
    
    // If we have the transcription from the request body, include it
    try {
      const body = await request.clone().json();
      const { transcription } = requestSchema.parse(body);
      errorDescription = transcription;
    } catch {
      // If we can't get the transcription, just return the error
    }

    return NextResponse.json(
      { error: errorMessage, description: errorDescription },
      { status: 500 }
    );
  }
} 