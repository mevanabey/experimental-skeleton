// schema.ts
import * as z from 'zod'

export const GENDER_IDENTITY_OPTIONS = z.enum(['Male', 'Female', 'Non-binary/Third gender', 'Prefer not to say', 'Other']);
export const RACE_ETHNICITY_OPTIONS = z.enum(['White', 'Black or African American', 'Hispanic/Latino', 'Asian or Pacific Islander', 'Native American', 'Mixed Race', 'Other']);
export const AGE_OPTIONS = z.enum(['Under 18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+', 'Unknown']);
export const RELIGION_OPTIONS = z.enum(['None', 'Christian', 'Muslim', 'Jewish', 'Hindu', 'Other', 'Unknown']);
export const INCOME_LEVEL_OPTIONS = z.enum(['Low', 'Middle', 'High', 'Unknown']);
export const HATECRIME_INCIDENT_TYPE_OPTIONS = z.enum([
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
]);
export const DOMESTIC_EXTREMISM_INCIDENT_TYPE_OPTIONS = z.enum([
  'Physical Violence',
  'Property Damage',
  'Cyber Attack',
  'Threats and Intimidation',
  'Disruptive Actions',
  'Harassment or Stalking',
  'Propaganda or Recruitment',
  'Sabotage',
]);
export const ELECTION_VIOLENCE_INCIDENT_TYPE_OPTIONS = z.enum([
  'Voter Intimidation',
  'Voting Interference',
  'Polling Station Violence',
  'Election Fraud',
  'Misinformation/Disinformation',
  'Cyber Attack on Election Infrastructure',
  'Vandalism of Election Facilities',
  'Unauthorized Campaigning'
]);
export const SPECIFIC_INCIDENT_HATECRIME_TYPE_OPTIONS = z.enum([
  'Race/Ethnicity-Based Hate',
  'Religion-Based Hate',
  'Gender Identity/Expression-Based Hate',
  'Sexual Orientation-Based Hate',
  'Nationality/Immigrant Status-Based Hate',
  'Disability-Based Hate',
  'Political Affiliation-Based Hate',
  'Cultural/Social Affiliation Hate',
  'Mixed Motive Hate Incident',
]);
export const SPECIFIC_INCIDENT_DOMESTIC_EXTREMISM_TYPE_OPTIONS = z.enum([
  'Hate Crime',
  'Terrorist Act',
  'Assassination or Targeted Attack',
  'Vandalism with Symbolic Meaning', 
  'Public Disorder',
  'Intimidation via Symbolic Acts',
  'Cyber Harassment or Doxxing',
  'Bomb Threat',
  'Kidnapping or Hostage Situations',
  'Incitement to Violence',
  'Sabotage of Infrastructure',
]);
export const SPECIFIC_INCIDENT_ELECTION_VIOLENCE_TYPE_OPTIONS = z.enum([
  'Physical Assault on Voters or Poll Workers',
  'Threats or Intimidation of Voters',
  'Ballot Tampering',
  'Destruction of Voting Equipment',
  'Blocking Access to Polling Stations',
  'Voter Harassment',
  'Online Misinformation Campaigns',
  'Hacking of Voting Systems',
  'Bribery or Vote Buying',
  'Illegal Ballot Counting',
  'Unauthorized Entry into Polling Stations',
]);
export const INCIDENT_NATURE_HATECRIME_OPTIONS = z.enum(['Isolated Event', 'Coordinated Attack']);
export const INCIDENT_NATURE_DOMESTIC_EXTREMISM_OPTIONS = z.enum(['Targeted', 'Random', 'Pre-meditated', 'Spontaneous', 'Organized Group Involvement', 'Lone Actor']);
export const INCIDENT_NATURE_ELECTION_VIOLENCE_OPTIONS = z.enum(['Targeted', 'Random', 'Pre-meditated', 'Spontaneous', 'Group Involvement', 'Lone Actor', 'Coordinated by Political Group', 'Uncoordinated Local Action']);
export const INCIDENT_CATEGORY_OPTIONS = z.enum(['Hate Incident', 'Crime Incident', 'Domestic Extremism', 'Election Related', 'Other']);
export const INCIDENT_SEVERITY_OPTIONS = z.enum(['Minor', 'Moderate', 'Severe']).describe('Incident severity is required');
export const IMEDIATE_CONSEQUENCES_OPTIONS = z.enum(['Property Damage', 'Physical Injury', 'Emotional Distress', 'Other']).describe('Immediate consequences is required');


export const incidentFormSchema = z.object({
  // Incident Details
  incidentCategory: INCIDENT_CATEGORY_OPTIONS,
  incidentType: z.union([
    HATECRIME_INCIDENT_TYPE_OPTIONS,
    DOMESTIC_EXTREMISM_INCIDENT_TYPE_OPTIONS,
    ELECTION_VIOLENCE_INCIDENT_TYPE_OPTIONS,
  ]).describe("Incident type error"),
  specificIncidentType: z.array(z.union([
    SPECIFIC_INCIDENT_HATECRIME_TYPE_OPTIONS,
    SPECIFIC_INCIDENT_DOMESTIC_EXTREMISM_TYPE_OPTIONS,
    SPECIFIC_INCIDENT_ELECTION_VIOLENCE_TYPE_OPTIONS,
  ])).min(1, "At least one specific incident type is required").describe("Specific incident type error"),
  incidentNature: z.array(z.union([
    INCIDENT_NATURE_HATECRIME_OPTIONS,
    INCIDENT_NATURE_DOMESTIC_EXTREMISM_OPTIONS,
    INCIDENT_NATURE_ELECTION_VIOLENCE_OPTIONS,
  ])).min(1, "At least one incident nature is required").describe("Incident nature error"),
  dateTime: z.date(),
  locationCoordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  locationAddress: z.string().min(9, "Location is required"),
  description: z.string().min(10, 'Description must be at least 10 characters long'),

  // Victim(s) Information
  numberOfVictims: z.number().min(1, 'Number of victims must be at least 1'),
  // victimAge: z.enum(['Child', 'Teen', 'Adult', 'Senior']),
  victimAge: AGE_OPTIONS.optional(),
  victimGender: GENDER_IDENTITY_OPTIONS.optional(),
  victimRaceEthnicity: RACE_ETHNICITY_OPTIONS.optional(),
  victimRaceReligion: RELIGION_OPTIONS.optional(),
  victimEmploymentStatus: z.enum(['Employed', 'Unemployed', 'Student', 'Retired', 'Other', 'Unknown']).optional(),
  victimEducationLevel: z.enum(['No Schooling', 'Primary', 'Secondary', 'Higher Education', 'Not Known']).optional(),
  victimIncomeLevel: INCOME_LEVEL_OPTIONS.optional(),

  // Perpetrator Information
  numberOfPerpetrators: z.number().min(1, 'Number of perpetrators must be at least 1'),
  perpetratorAge: AGE_OPTIONS.optional(),
  perpetratorGender: GENDER_IDENTITY_OPTIONS.optional(),
  perpetratorRaceEthnicity: RACE_ETHNICITY_OPTIONS.optional(),
  perpetratorDescription: z.string().min(10, 'Description must be at least 10 characters long').optional(),
  perpetratorGroupAffiliation: z.enum(['None', 'Group', 'Other', 'Unknown']).optional(),
  perpetratorWeapon: z.enum(['None', 'Firearm', 'Knife/Cutting Instrument', 'Spray Paint', 'Chemical', 'Other']).optional(),

  // Evidence Collection
  evidence: z.union([z.string(), z.instanceof(FileList)]).optional(),

  incidentSeverity: INCIDENT_SEVERITY_OPTIONS.optional(),
  immediateConsequences: IMEDIATE_CONSEQUENCES_OPTIONS.optional(),

  // Context & Background
  priorIncidentsInArea: z.enum(['Yes', 'No', 'N/A']).optional(),
  communityTensionKnown: z.enum(['Yes', 'No', 'N/A']).optional(),
  relevantPoliticalSocialEvents: z.enum(['Election', 'Protest', 'Other', 'N/A']).optional(),
  underlyingCauses: z.enum(['Racial Bias', 'Religious Intolerance', 'Political Tensions', 'Other', 'N/A']).optional(),

  // Community Sentiment
  communityReactionsEmotions: z.enum(['Outrage', 'Fear', 'Indifference', 'N/A']).optional(),
  sentimentAnalysis: z.enum(['Positive', 'Negative', 'Neutral', 'N/A']).optional(),

  // Response and Actions Taken
  actionsTaken: z.enum(['Called Police', 'Secured Area', 'Other']).optional(),
  lawEnforcementResponseTime: z.string().optional(),
  lawEnforcementActions: z.enum(['Report Filed', 'Officers on Scene', 'N/A']).optional(),
  medicalAssistance: z.enum(['Yes', 'No', 'N/A']).optional(),

  // Reporting and Feedback
  reportStatus: z.enum(['Open', 'In Progress', 'Closed']).optional(),
  feedbackAndFollowUp: z.enum(['Pending', 'Action Taken', 'N/A']).optional(),

  // Reporter Information
  reporterName: z.string().min(2, 'Name must be at least 2 characters long').optional(),
  reporterContact: z.string().optional(),
  reporterRelationship: z.enum(['Witness', 'Victim', 'Concerned Citizen', 'Law Enforcement', 'Journalist', 'Monitor', 'Other']).optional(),
  reporterOrganization: z.string().optional(),
})

export type IncidentFormValues = z.infer<typeof incidentFormSchema>