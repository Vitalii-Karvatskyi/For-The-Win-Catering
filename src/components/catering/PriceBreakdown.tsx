import { cateringPricing } from '../../config/cateringPricing';
import { formatMoney } from '../../lib/cateringCalculator';
import type { CalculatorResult } from '../../types/catering';

type PriceBreakdownProps = {
  result: CalculatorResult;
};

export function PriceBreakdown({ result }: PriceBreakdownProps) {
  const hasLineItems = result.lineItems.length > 0;

  return (
    <div className="price-breakdown" aria-live="polite" aria-atomic="true">
      {hasLineItems ? (
        <>
          {result.lineItems.map((item) => (
            <div key={item.id}>
              <div className="price-breakdown__row">
                <span>{item.label}</span>
                <span>{formatMoney(item.amount)}</span>
              </div>
              {item.detail ? (
                <div className="price-breakdown__row price-breakdown__row--detail">
                  <span>{item.detail}</span>
                </div>
              ) : null}
            </div>
          ))}

          <hr className="price-breakdown__divider" />

          <div className="price-breakdown__row">
            <span>Food subtotal</span>
            <span>{formatMoney(result.foodAfterServiceMultiplier)}</span>
          </div>

          <div className="price-breakdown__row">
            <span>{cateringPricing.tax.label}</span>
            <span>{formatMoney(result.taxAmount)}</span>
          </div>

          <hr className="price-breakdown__divider" />

          <div className="price-breakdown__total">
            <span>Estimated total</span>
            <span>{formatMoney(result.estimatedTotal)}</span>
          </div>

          <p className="price-breakdown__per-guest">
            ≈ {formatMoney(result.pricePerGuest)} per guest (
            {result.guestCount || '—'} guests)
          </p>

          <p className="price-breakdown__disclaimer">
            {cateringPricing.estimateDisclaimer}
          </p>
        </>
      ) : (
        <p className="ftw-field__hint">Add menu items to see your estimate.</p>
      )}
    </div>
  );
}
