import { cateringRecommendations } from '../../config/cateringRecommendations';
import type { QuantityRecommendations } from '../../lib/cateringRecommendations';

type SmartRecommendationsProps = {
  recommendations: QuantityRecommendations;
  onApply: () => void;
};

function formatRange(range: { min: number; max: number }): string {
  if (range.min === range.max) return String(range.min);
  return `${range.min}–${range.max}`;
}

export function SmartRecommendations({
  recommendations,
  onApply,
}: SmartRecommendationsProps) {
  if (recommendations.guestCount <= 0) return null;

  const { labels } = cateringRecommendations;

  return (
    <aside className="recommendations" aria-label="Suggested quantities">
      <h3 className="calculator-group__title" style={{ marginBottom: '0.25rem' }}>
        {labels.heading}
      </h3>
      <p className="ftw-field__hint">{labels.subheading}</p>

      <div className="recommendations__grid">
        <div className="recommendation-stat">
          <div className="recommendation-stat__value">
            {formatRange(recommendations.burgers)}
          </div>
          <div className="recommendation-stat__label">{labels.burgers}</div>
        </div>
        <div className="recommendation-stat">
          <div className="recommendation-stat__value">
            {formatRange(recommendations.fries)}
          </div>
          <div className="recommendation-stat__label">{labels.fries}</div>
        </div>
      </div>

      <button type="button" className="ftw-btn ftw-btn--outline-dark ftw-btn--block" onClick={onApply}>
        Apply suggestions to calculator
      </button>
    </aside>
  );
}
