import { cateringPricing } from '../config/cateringPricing';

export function parseEventDurationValue(raw: string): number {
  const digitsOnly = raw.replace(/\D/g, '');
  if (!digitsOnly) return 0;
  const parsed = parseInt(digitsOnly, 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function clampEventDuration(value: number): number {
  const { minHours, maxHours, defaultHours } = cateringPricing.eventDuration;
  if (!Number.isFinite(value) || value <= 0) {
    return defaultHours;
  }
  return Math.min(maxHours, Math.max(minHours, value));
}

export function eventDurationInputValue(hours: number): string {
  return hours > 0 ? String(hours) : '';
}
