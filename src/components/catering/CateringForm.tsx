import { type FormEvent, useState } from 'react';
import { cateringPricing } from '../../config/cateringPricing';
import { cateringSections } from '../../config/cateringContent';
import { validateCateringInquiry } from '../../lib/cateringFormValidation';
import {
  clampEventDuration,
  eventDurationInputValue,
  parseEventDurationValue,
} from '../../lib/eventDurationInput';
import {
  clampGuestCount,
  guestCountInputValue,
  parseGuestCountValue,
} from '../../lib/guestCountInput';
import { submitCateringInquiry } from '../../services/cateringInquiry';
import type { EventTypeId } from '../../config/cateringPricing';
import type { CateringInquiryPayload } from '../../types/catering';

type FormState = Omit<CateringInquiryPayload, 'submittedAt' | 'source' | 'serviceType'>;

const ONSITE_SERVICE = cateringPricing.serviceTypes.onsite;

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  eventTime: '',
  guestCount: cateringPricing.minGuestCount,
  eventDurationHours: cateringPricing.eventDuration.defaultHours,
  eventLocation: '',
  eventType: 'corporate',
  notes: '',
};

export function CateringForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const normalizedForm = {
      ...form,
      guestCount: clampGuestCount(form.guestCount),
      eventDurationHours: clampEventDuration(form.eventDurationHours),
    };

    const validationErrors = validateCateringInquiry({
      ...normalizedForm,
      serviceType: 'onsite',
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (
        normalizedForm.guestCount !== form.guestCount ||
        normalizedForm.eventDurationHours !== form.eventDurationHours
      ) {
        setForm((prev) => ({
          ...prev,
          guestCount: normalizedForm.guestCount,
          eventDurationHours: normalizedForm.eventDurationHours,
        }));
      }
      return;
    }

    setIsSubmitting(true);

    const payload: CateringInquiryPayload = {
      ...normalizedForm,
      serviceType: 'onsite',
      submittedAt: new Date().toISOString(),
      source: 'ftw-catering-page',
    };

    const result = await submitCateringInquiry(payload);
    setIsSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }

    setIsSuccess(true);
    setForm(initialFormState);
  };

  if (isSuccess) {
    return (
      <section
        id={cateringSections.inquiry.id}
        className="catering-section catering-section--alt"
        aria-labelledby="inquiry-heading"
      >
        <div className="catering-container">
          <div className="ftw-card form-success">
            <div className="form-success__icon" aria-hidden="true">
              ✓
            </div>
            <h2 className="catering-section__title">Thank you!</h2>
            <p className="catering-section__subtitle" style={{ margin: '0 auto' }}>
              We received your catering inquiry. Our team will reach out shortly to
              confirm details and availability.
            </p>
            <button
              type="button"
              className="ftw-btn ftw-btn--primary"
              style={{ marginTop: '1.5rem' }}
              onClick={() => setIsSuccess(false)}
            >
              Submit another inquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={cateringSections.inquiry.id}
      className="catering-section catering-section--alt"
      aria-labelledby="inquiry-heading"
    >
      <div className="catering-container">
        <header className="catering-section__header">
          <h2 id="inquiry-heading" className="catering-section__title">
            {cateringSections.inquiry.title}
          </h2>
          <p className="catering-section__subtitle">
            {cateringSections.inquiry.subtitle}
          </p>
        </header>

        <form className="ftw-card" onSubmit={handleSubmit} noValidate>
          <div className="form-grid form-grid--2">
            <div className="ftw-field">
              <label htmlFor="inquiry-name">Name *</label>
              <input
                id="inquiry-name"
                type="text"
                autoComplete="name"
                value={form.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
                onChange={(e) => updateField('name', e.target.value)}
              />
              {errors.name ? (
                <p id="inquiry-name-error" className="ftw-field__error" role="alert">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="ftw-field">
              <label htmlFor="inquiry-email">Email *</label>
              <input
                id="inquiry-email"
                type="email"
                autoComplete="email"
                value={form.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
                onChange={(e) => updateField('email', e.target.value)}
              />
              {errors.email ? (
                <p id="inquiry-email-error" className="ftw-field__error" role="alert">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="ftw-field">
              <label htmlFor="inquiry-phone">Phone *</label>
              <input
                id="inquiry-phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'inquiry-phone-error' : undefined}
                onChange={(e) => updateField('phone', e.target.value)}
              />
              {errors.phone ? (
                <p id="inquiry-phone-error" className="ftw-field__error" role="alert">
                  {errors.phone}
                </p>
              ) : null}
            </div>

            <div className="ftw-field">
              <label htmlFor="inquiry-guests">Guest count *</label>
              <input
                id="inquiry-guests"
                type="number"
                inputMode="numeric"
                min={cateringPricing.minGuestCount}
                step={1}
                value={guestCountInputValue(form.guestCount)}
                aria-invalid={Boolean(errors.guestCount)}
                aria-describedby={errors.guestCount ? 'inquiry-guests-error' : undefined}
                onChange={(e) =>
                  updateField('guestCount', parseGuestCountValue(e.target.value))
                }
                onBlur={() =>
                  updateField('guestCount', clampGuestCount(form.guestCount))
                }
              />
              {errors.guestCount ? (
                <p id="inquiry-guests-error" className="ftw-field__error" role="alert">
                  {errors.guestCount}
                </p>
              ) : null}
            </div>

            <div className="ftw-field">
              <label htmlFor="inquiry-duration">
                {cateringPricing.eventDuration.label} *
              </label>
              <input
                id="inquiry-duration"
                type="number"
                inputMode="numeric"
                min={cateringPricing.eventDuration.minHours}
                max={cateringPricing.eventDuration.maxHours}
                step={1}
                value={eventDurationInputValue(form.eventDurationHours)}
                aria-invalid={Boolean(errors.eventDurationHours)}
                aria-describedby={
                  errors.eventDurationHours ? 'inquiry-duration-error' : undefined
                }
                onChange={(e) =>
                  updateField(
                    'eventDurationHours',
                    parseEventDurationValue(e.target.value),
                  )
                }
                onBlur={() =>
                  updateField(
                    'eventDurationHours',
                    clampEventDuration(form.eventDurationHours),
                  )
                }
              />
              {errors.eventDurationHours ? (
                <p id="inquiry-duration-error" className="ftw-field__error" role="alert">
                  {errors.eventDurationHours}
                </p>
              ) : null}
            </div>

            <div className="ftw-field">
              <label htmlFor="inquiry-date">Event date *</label>
              <input
                id="inquiry-date"
                type="date"
                value={form.eventDate}
                aria-invalid={Boolean(errors.eventDate)}
                aria-describedby={errors.eventDate ? 'inquiry-date-error' : undefined}
                onChange={(e) => updateField('eventDate', e.target.value)}
              />
              {errors.eventDate ? (
                <p id="inquiry-date-error" className="ftw-field__error" role="alert">
                  {errors.eventDate}
                </p>
              ) : null}
            </div>

            <div className="ftw-field">
              <label htmlFor="inquiry-time">Event time *</label>
              <input
                id="inquiry-time"
                type="time"
                value={form.eventTime}
                aria-invalid={Boolean(errors.eventTime)}
                aria-describedby={errors.eventTime ? 'inquiry-time-error' : undefined}
                onChange={(e) => updateField('eventTime', e.target.value)}
              />
              {errors.eventTime ? (
                <p id="inquiry-time-error" className="ftw-field__error" role="alert">
                  {errors.eventTime}
                </p>
              ) : null}
            </div>
          </div>

          <div className="form-grid" style={{ marginTop: '1.25rem' }}>
            <div className="ftw-field">
              <label htmlFor="inquiry-location">Event location / address *</label>
              <input
                id="inquiry-location"
                type="text"
                autoComplete="street-address"
                value={form.eventLocation}
                aria-invalid={Boolean(errors.eventLocation)}
                aria-describedby={
                  errors.eventLocation ? 'inquiry-location-error' : undefined
                }
                onChange={(e) => updateField('eventLocation', e.target.value)}
              />
              {errors.eventLocation ? (
                <p id="inquiry-location-error" className="ftw-field__error" role="alert">
                  {errors.eventLocation}
                </p>
              ) : null}
            </div>
          </div>

          <div className="form-grid form-grid--2" style={{ marginTop: '1.25rem' }}>
            <div className="ftw-field">
              <span className="ftw-field__static-label">Service type</span>
              <p className="ftw-field__static-value">{ONSITE_SERVICE.label}</p>
            </div>

            <div className="ftw-field">
              <label htmlFor="inquiry-event-type">Event type</label>
              <select
                id="inquiry-event-type"
                value={form.eventType}
                onChange={(e) =>
                  updateField('eventType', e.target.value as EventTypeId)
                }
              >
                {cateringPricing.eventTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="ftw-field" style={{ marginTop: '1.25rem' }}>
            <label htmlFor="inquiry-notes">Notes / special requests</label>
            <textarea
              id="inquiry-notes"
              value={form.notes}
              placeholder="Dietary needs, venue restrictions, timing, etc."
              onChange={(e) => updateField('notes', e.target.value)}
            />
          </div>

          {submitError ? (
            <p className="ftw-field__error" role="alert" style={{ marginTop: '1rem' }}>
              {submitError}
            </p>
          ) : null}

          <button
            type="submit"
            className="ftw-btn ftw-btn--primary ftw-btn--block"
            style={{ marginTop: '1.5rem' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending…' : 'Submit inquiry'}
          </button>
        </form>
      </div>
    </section>
  );
}
