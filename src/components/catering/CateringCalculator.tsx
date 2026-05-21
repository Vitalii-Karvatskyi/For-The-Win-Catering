import { useEffect, useMemo, useState } from 'react';
import { cateringPricing } from '../../config/cateringPricing';
import { cateringSections } from '../../config/cateringContent';
import { menuImages } from '../../config/menuImages';
import {
  calculateCateringEstimate,
  createEmptyQuantities,
  formatMoney,
  isAllYouCanEatActive,
  sumBurgerUnits,
} from '../../lib/cateringCalculator';
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
import { getRecommendationsForGuests } from '../../lib/cateringRecommendations';
import type { MenuItemId, OptionId } from '../../config/cateringPricing';
import type { CalculatorInput, MenuQuantities } from '../../types/catering';
import { PriceBreakdown } from './PriceBreakdown';
import { SmartRecommendations } from './SmartRecommendations';

function createDefaultOptionQuantities(): Record<OptionId, number> {
  return {
    glutenFreeBun: 0,
  };
}

type QuantityStepperProps = {
  id: string;
  label: string;
  priceLabel: string;
  value: number;
  max?: number;
  imageSrc?: string;
  onChange: (value: number) => void;
};

function QuantityStepper({
  id,
  label,
  priceLabel,
  value,
  max,
  imageSrc,
  onChange,
}: QuantityStepperProps) {
  return (
    <div className={imageSrc ? 'qty-row qty-row--with-image' : 'qty-row'}>
      {imageSrc ? (
        <img
          className="qty-row__image"
          src={imageSrc}
          alt={label}
          width={72}
          height={72}
          loading="lazy"
        />
      ) : null}
      <div className="qty-row__info">
        <div className="qty-row__label" id={`${id}-label`}>
          {label}
        </div>
        <div className="qty-row__price">{priceLabel}</div>
      </div>
      <div className="qty-stepper" role="group" aria-labelledby={`${id}-label`}>
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= 0}
          onClick={() => onChange(Math.max(0, value - 1))}
        >
          −
        </button>
        <input
          id={id}
          type="number"
          min={0}
          max={max ?? 9999}
          value={value}
          aria-label={label}
          onChange={(e) => {
            const next = Math.max(0, Number(e.target.value) || 0);
            onChange(max !== undefined ? Math.min(max, next) : next);
          }}
        />
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={max !== undefined && value >= max}
          onClick={() => onChange(max !== undefined ? Math.min(max, value + 1) : value + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function CateringCalculator() {
  const [guestCount, setGuestCount] = useState(
    cateringPricing.minGuestCount < 50 ? 50 : cateringPricing.minGuestCount,
  );
  const [quantities, setQuantities] = useState<MenuQuantities>(createEmptyQuantities);
  const [optionQuantities, setOptionQuantities] = useState(createDefaultOptionQuantities);
  const [eventDurationHours, setEventDurationHours] = useState<number>(
    cateringPricing.eventDuration.defaultHours,
  );

  const recommendations = useMemo(
    () => getRecommendationsForGuests(guestCount),
    [guestCount],
  );

  const calculatorInput: CalculatorInput = useMemo(
    () => ({
      guestCount,
      eventDurationHours,
      eventType: 'corporate',
      serviceType: 'onsite',
      quantities,
      optionQuantities,
    }),
    [guestCount, eventDurationHours, quantities, optionQuantities],
  );

  const burgerCount = useMemo(() => sumBurgerUnits(quantities), [quantities]);
  const ayceActive = useMemo(() => isAllYouCanEatActive(quantities), [quantities]);

  useEffect(() => {
    setOptionQuantities((prev) => {
      const capped = Math.min(prev.glutenFreeBun, burgerCount);
      if (capped === prev.glutenFreeBun) return prev;
      return { ...prev, glutenFreeBun: capped };
    });
  }, [burgerCount]);

  const result = useMemo(
    () => calculateCateringEstimate(calculatorInput),
    [calculatorInput],
  );

  const updateQuantity = (key: MenuItemId, value: number) => {
    setQuantities((prev) => ({ ...prev, [key]: value }));
  };

  const applyRecommendations = () => {
    setQuantities((prev) => ({
      ...prev,
      ...recommendations.suggestedQuantities,
    }));
  };

  return (
    <section
      id={cateringSections.calculator.id}
      className="catering-section"
      aria-labelledby="calculator-heading"
    >
      <div className="catering-container">
        <header className="catering-section__header">
          <h2 id="calculator-heading" className="catering-section__title">
            {cateringSections.calculator.title}
          </h2>
          <p className="catering-section__subtitle">
            {cateringSections.calculator.subtitle}
          </p>
        </header>

        <div className="calculator-grid">
          <div className="calculator-panel">
            <div className="ftw-card">
              <h3 className="calculator-group__title">Event details</h3>
              <div className="ftw-field">
                <label htmlFor="calc-guests">Guest count</label>
                <input
                  id="calc-guests"
                  type="number"
                  inputMode="numeric"
                  min={cateringPricing.minGuestCount}
                  max={cateringPricing.maxGuestCount}
                  step={1}
                  value={guestCountInputValue(guestCount)}
                  onChange={(e) =>
                    setGuestCount(parseGuestCountValue(e.target.value))
                  }
                  onBlur={() => setGuestCount((count) => clampGuestCount(count))}
                />
              </div>

              <div className="ftw-field" style={{ marginTop: '1.25rem' }}>
                <label htmlFor="calc-duration">
                  {cateringPricing.eventDuration.label}
                </label>
                <input
                  id="calc-duration"
                  type="number"
                  inputMode="numeric"
                  min={cateringPricing.eventDuration.minHours}
                  max={cateringPricing.eventDuration.maxHours}
                  step={1}
                  value={eventDurationInputValue(eventDurationHours)}
                  onChange={(e) =>
                    setEventDurationHours(parseEventDurationValue(e.target.value))
                  }
                  onBlur={() =>
                    setEventDurationHours((hours) => clampEventDuration(hours))
                  }
                />
              </div>

              <div className="ftw-field" style={{ marginTop: '1.25rem' }}>
                <span className="ftw-field__static-label">Service type</span>
                <p className="ftw-field__static-value">
                  {cateringPricing.serviceTypes.onsite.label}
                </p>
              </div>
            </div>

            <SmartRecommendations
              recommendations={recommendations}
              onApply={applyRecommendations}
            />

            <div className="ftw-card">
              <h3 className="calculator-group__title">Menu</h3>
              {Object.entries(cateringPricing.menu).map(([key, item]) => {
                const menuKey = key as MenuItemId;
                const priceLabel =
                  'pricePerGuest' in item
                    ? `${formatMoney(item.pricePerGuest)} per guest`
                    : ayceActive
                      ? 'Included'
                      : `${formatMoney(item.pricePerUnit)} each`;

                return (
                  <QuantityStepper
                    key={key}
                    id={`menu-${key}`}
                    label={item.label}
                    priceLabel={priceLabel}
                    imageSrc={menuImages[menuKey]}
                    value={quantities[menuKey]}
                    max={'pricePerGuest' in item ? 1 : undefined}
                    onChange={(v) => updateQuantity(menuKey, v)}
                  />
                );
              })}
            </div>

            <div className="ftw-card">
              <h3 className="calculator-group__title">Options</h3>
              <p className="ftw-field__hint">
                Choose how many burgers need a gluten-free bun (not applied to every
                burger).
              </p>
              {Object.entries(cateringPricing.options).map(([key, opt]) => (
                <QuantityStepper
                  key={key}
                  id={`option-${key}`}
                  label={opt.label}
                  priceLabel={`${formatMoney(opt.pricePerUnit)} each`}
                  value={optionQuantities[key as OptionId]}
                  max={burgerCount}
                  onChange={(v) =>
                    setOptionQuantities((prev) => ({
                      ...prev,
                      [key]: v,
                    }))
                  }
                />
              ))}
            </div>
          </div>

          <aside className="ftw-card ftw-card--sticky-summary">
            <h3 className="calculator-group__title">Your estimate</h3>
            <PriceBreakdown result={result} />
            <a
              href={`#${cateringSections.inquiry.id}`}
              className="ftw-btn ftw-btn--primary ftw-btn--block calculator-summary__cta"
            >
              {cateringSections.inquiry.title}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
