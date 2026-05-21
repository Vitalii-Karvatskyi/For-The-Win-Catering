import { cateringPricing } from '../config/cateringPricing';

/** Hourly labor rate from guest-count tier (see cateringPricing.labor). */
export function getLaborRatePerHour(guestCount: number): number {
  const { tiers, belowTierRatePerHour } = cateringPricing.labor;

  for (const tier of tiers) {
    if (guestCount < tier.minGuests) continue;
    if (tier.maxGuests !== null && guestCount > tier.maxGuests) continue;
    return tier.ratePerHour;
  }

  return belowTierRatePerHour;
}

export function calculateLaborCost(
  guestCount: number,
  eventDurationHours: number,
): number {
  const hours = Math.max(0, eventDurationHours);
  if (hours <= 0) return 0;
  return getLaborRatePerHour(guestCount) * hours;
}
