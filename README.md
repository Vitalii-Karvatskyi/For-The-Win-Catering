# For The Win Catering Calculator

Premium, mobile-first catering estimate and inquiry page for FTW Burgers.

## Quick start

```bash
npm install
npm run dev
```

## Update pricing

Edit **`src/config/cateringPricing.ts`** only. All menu prices, options, add-ons, tax rate, and service multipliers live there.

## Update recommendations

Edit **`src/config/cateringRecommendations.ts`** for guest-count tiers and quantity ratios.

## Editable copy (FAQ, hero, requirements)

- **`src/config/cateringContent.ts`** — hero text, FAQ, event requirements, FTW location labels

## Business logic

| Area | Location |
|------|----------|
| Price calculation | `src/lib/cateringCalculator.ts` |
| Quantity recommendations | `src/lib/cateringRecommendations.ts` |
| Form validation | `src/lib/cateringFormValidation.ts` |
| Inquiry submission | `src/services/cateringInquiry.ts` |

## Connect API / email / CRM

Replace the body of `submitCateringInquiry()` in `src/services/cateringInquiry.ts`:

```ts
export async function submitCateringInquiry(payload: CateringInquiryPayload) {
  const res = await fetch('/api/catering-inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) return { ok: false, error: 'Something went wrong. Please try again.' };
  return { ok: true };
}
```

Payload type: `CateringInquiryPayload` in `src/types/catering.ts`.

## Build

```bash
npm run build
npm run preview
```
