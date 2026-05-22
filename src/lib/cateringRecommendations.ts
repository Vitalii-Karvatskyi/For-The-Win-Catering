import type { RecommendationRange } from '../config/cateringRecommendations';

function roundRange(min: number, max: number): RecommendationRange {
  return {
    min: Math.max(0, Math.round(min)),
    max: Math.max(0, Math.round(max)),
  };
}

export type QuantityRecommendations = {
  guestCount: number;
  burgers: RecommendationRange;
  fries: RecommendationRange;
  /** Suggested menu quantities keyed for calculator apply */
  suggestedQuantities: {
    allYouCanEat: number;
    cheeseburger: number;
    doubleCheeseburger: number;
    veggieBurger: number;
    fries: number;
  };
};

export function getRecommendationsForGuests(
  guestCount: number,
): QuantityRecommendations {
  const safeGuests = Math.max(0, guestCount);
  const cheeseburgers = safeGuests * 2;
  const friesPortions = safeGuests;

  return {
    guestCount: safeGuests,
    burgers: roundRange(cheeseburgers, cheeseburgers),
    fries: roundRange(friesPortions, friesPortions),
    suggestedQuantities: {
      allYouCanEat: 0,
      cheeseburger: cheeseburgers,
      doubleCheeseburger: 0,
      veggieBurger: 0,
      fries: friesPortions,
    },
  };
}
