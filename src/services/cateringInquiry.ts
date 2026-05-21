import type { CateringInquiryPayload } from '../types/catering';

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Submission adapter — swap implementation when connecting API, email, CRM, etc.
 *
 * Example integrations:
 * - fetch('/api/catering-inquiry', { method: 'POST', body: JSON.stringify(payload) })
 * - Email service (SendGrid, Resend)
 * - CRM webhook (HubSpot, Owner.com)
 * - Google Apps Script / Sheets endpoint
 */
export async function submitCateringInquiry(
  payload: CateringInquiryPayload,
): Promise<SubmitResult> {
  // TODO: replace with API — single log point until backend is connected
  console.log('[FTW Catering Inquiry]', payload);

  // Simulate network latency for realistic UX testing
  await new Promise((resolve) => setTimeout(resolve, 400));

  return { ok: true };
}
