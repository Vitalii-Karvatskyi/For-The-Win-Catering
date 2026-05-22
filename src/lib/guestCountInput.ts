import { cateringPricing } from '../config/cateringPricing';

export function parseGuestCountValue(raw: string): number {
  const digitsOnly = raw.replace(/\D/g, '');
  if (!digitsOnly) return 0;
  const parsed = parseInt(digitsOnly, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function clampGuestCount(value: number): number {
  if (!Number.isFinite(value) || value <= 0) {
    return cateringPricing.minGuestCount;
  }
  return Math.max(cateringPricing.minGuestCount, value);
}

export function guestCountInputValue(count: number): string {
  return count > 0 ? String(count) : '';
}
