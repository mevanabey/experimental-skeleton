import z from "zod";

export const ActivityTypeEnum = z.enum([
  "beach",
  "hiking",
  "wildlife",
  "culture",
  "history",
  "food",
  "adventure",
  "relaxation",
  "shopping",
  "nightlife",
  "waterSports",
  "wellness",
  "photography",
  "festivals",
  "spiritual",
  "roadTrip",
  "scubaDiving",
  "safari",
  "cycling",
  "luxuryExperiences",
]);

export const AccomodationTypeEnum = z.enum([
  "hotel",
  "hostel",
  "resort",
  "apartment",
  "guesthouse",
]);

export const DietaryRestrictionsEnum = z.enum([
  "vegetarian",
  "vegan",
  "glutenFree",
  "dairyFree",
  "nutFree",
  "kosher",
  "halal",
  "lowCalorie",
  "lowCarb",
  "lowFat",
  "lowSugar",
  "pescatarian",
  "rawFood",
  "soyFree",
  "sugarFree",
  "wheatFree",
]);
