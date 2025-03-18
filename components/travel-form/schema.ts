// lib/schemas.ts
import { z } from 'zod';

export const ActivityTypeEnum = z.enum([
  'hiking', 'sightseeing', 'food', 'shopping', 'nightlife', 'museums', 
  'beach', 'sports', 'art', 'history', 'nature', 'adventure'
]);

export const userPreferencesSchema = z.object({
  takeOffDate: z.coerce.date().nullable(),
  duration: z.coerce.number().min(1),
  travelers: z.coerce.number().min(1),
  travelPace: z.enum(['relaxed', 'balanced', 'fast-paced']),
  budget: z.coerce.number().min(0),
  budgetBreakdown: z.object({
    accommodation: z.coerce.number().min(0),
    food: z.coerce.number().min(0),
    transport: z.coerce.number().min(0),
    activities: z.coerce.number().min(0),
    other: z.coerce.number().min(0),
  }),
  activityTypes: z.array(ActivityTypeEnum),
  specialRequests: z.string().optional(),
  preferredAirlines: z.array(z.string()).optional(),
  seatPreference: z.enum(['window', 'aisle', 'no preference']).optional(),
  accommodationType: z.enum(['hotel', 'hostel', 'resort', 'apartment', 'guesthouse']).optional(),
  hotelStarRating: z.coerce.number().min(1).max(5).optional(),
  roomType: z.enum(['single', 'double', 'suite']).optional(),
  dietaryRestrictions: z.array(z.string()).optional(),
  favoriteCuisines: z.array(z.string()).optional(),
  preferredTransport: z.enum(['public', 'private', 'rental', 'luxury']).optional(),
  carRental: z.boolean().optional(),
  preferredLanguage: z.string().optional(),
  culturalExperiences: z.boolean().optional(),
  mobilityAssistance: z.boolean().optional(),
  childFriendly: z.boolean().optional(),
  petFriendly: z.boolean().optional(),
  tripVibe: z.enum(['adventure', 'relaxation', 'luxury', 'romantic', 'family', 'budget-friendly']).optional(),
  mustVisitPlaces: z.array(z.string()).optional(),
});

export type UserPreferences = z.infer<typeof userPreferencesSchema>;