// lib/userPreferencesStore.ts
import { create } from 'zustand';
import { produce } from 'immer';
import { UserPreferences } from '../schema';

export const useUserPreferences = create<{
  preferences: UserPreferences;
  updatePreference: (path: string, value: any) => void;
}>((set) => ({
  preferences: {
    takeOffDate: null,
    duration: null,
    travelers: null,
    travelPace: null,
    budget: null,
    budgetBreakdown: {
      accommodation: 0,
      food: 0,
      transport: 0,
      activities: 0,
      other: 0,
    },
    activityTypes: [],
    specialRequests: '',
    preferredAirlines: [],
    seatPreference: 'no preference',
    accommodationType: null,
    hotelStarRating: null,
    roomType: null,
    dietaryRestrictions: [],
    favoriteCuisines: [],
    preferredTransport: null,
    carRental: null,
    preferredLanguage: '',
    culturalExperiences: null,
    mobilityAssistance: null,
    childFriendly: null,
    petFriendly: null,
    tripVibe: null,
    mustVisitPlaces: [],
  },
  updatePreference: (path: string, value: any) =>
    set(
      produce((draft) => {
        const keys = path.split('.');
        let current = draft.preferences;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      })
    ),
}));