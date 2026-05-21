import { cateringPricing } from '../config/cateringPricing';
import type { CateringInquiryPayload } from '../types/catering';

export type FormFieldErrors = Partial<Record<keyof CateringInquiryPayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCateringInquiry(
  data: Omit<CateringInquiryPayload, 'submittedAt' | 'source'>,
): FormFieldErrors {
  const errors: FormFieldErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailPattern.test(data.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone is required';
  }

  if (!data.eventDate) {
    errors.eventDate = 'Event date is required';
  }

  if (!data.eventTime.trim()) {
    errors.eventTime = 'Event time is required';
  }

  if (
    !Number.isFinite(data.guestCount) ||
    data.guestCount < cateringPricing.minGuestCount
  ) {
    errors.guestCount = `Guest count must be at least ${cateringPricing.minGuestCount}`;
  } else if (data.guestCount > cateringPricing.maxGuestCount) {
    errors.guestCount = `Guest count must be at most ${cateringPricing.maxGuestCount}`;
  }

  if (!data.eventLocation.trim()) {
    errors.eventLocation = 'Event location is required';
  }

  const { minHours, maxHours } = cateringPricing.eventDuration;
  if (
    !Number.isFinite(data.eventDurationHours) ||
    data.eventDurationHours < minHours
  ) {
    errors.eventDurationHours = `Event duration must be at least ${minHours} hour`;
  } else if (data.eventDurationHours > maxHours) {
    errors.eventDurationHours = `Event duration must be at most ${maxHours} hours`;
  }

  return errors;
}
