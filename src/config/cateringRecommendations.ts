/**
 * Smart quantity recommendations by guest count.
 * Adjust ratios or add tiers here — calculator UI reads this config only.
 */

export type RecommendationRange = {
  min: number;
  max: number;
};

export type GuestTier = {
  /** Inclusive upper bound; use Infinity for the largest tier */
  maxGuests: number;
  burgersPerGuest: { min: number; max: number };
  /** Share of guests who get a fries portion (e.g. 0.5 = half the guests) */
  friesPortionsPerGuest: { min: number; max: number };
};

export const cateringRecommendations = {
  /** Applied when guest count is below the first tier minimum */
  defaultGuestCount: 50,

  tiers: [
    {
      maxGuests: 30,
      burgersPerGuest: { min: 1, max: 1.15 },
      friesPortionsPerGuest: { min: 0.45, max: 0.55 },
    },
    {
      maxGuests: 75,
      burgersPerGuest: { min: 1, max: 1.2 },
      friesPortionsPerGuest: { min: 0.5, max: 0.6 },
    },
    {
      maxGuests: 150,
      burgersPerGuest: { min: 0.95, max: 1.15 },
      friesPortionsPerGuest: { min: 0.45, max: 0.55 },
    },
    {
      maxGuests: Infinity,
      burgersPerGuest: { min: 0.9, max: 1.1 },
      friesPortionsPerGuest: { min: 0.4, max: 0.5 },
    },
  ] satisfies GuestTier[],

  labels: {
    heading: 'Suggested quantities',
    subheading: 'Based on your guest count — adjust anytime in the calculator.',
    burgers: 'Burgers (total)',
    fries: 'Fries portions',
  },
} as const;
