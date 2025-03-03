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
    'Trespassing'
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
});

export type ExtractedIncidentData = z.infer<typeof incidentSchema> & {
  description?: string;
  correctedTranscription?: string;
};

export const processTranscription = async (
  transcription: string,
  _openaiApiKey: string // Keep parameter for backward compatibility
): Promise<ExtractedIncidentData> => {
  try {
    const response = await fetch('/api/process-transcription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcription }),
    });

    if (!response.ok) {
      throw new Error('Failed to process transcription');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error processing transcription:', error);
    return {
      description: transcription,
    };
  }
};

export default processTranscription; 