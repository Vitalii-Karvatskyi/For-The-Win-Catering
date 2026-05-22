import { cateringPricing } from '../config/cateringPricing';
import { calculateLaborCost, getLaborRatePerHour } from './cateringLabor';
import type {
  CalculatorInput,
  CalculatorResult,
  MenuQuantities,
  OptionQuantities,
  PriceLineItem,
} from '../types/catering';

export function createEmptyQuantities(): MenuQuantities {
  return {
    allYouCanEat: 0,
    cheeseburger: 0,
    doubleCheeseburger: 0,
    veggieBurger: 0,
    fries: 0,
  };
}

export function isAllYouCanEatActive(quantities: MenuQuantities): boolean {
  return (quantities.allYouCanEat ?? 0) > 0;
}

export function sumBurgerUnits(quantities: MenuQuantities): number {
  return (
    quantities.cheeseburger +
    quantities.doubleCheeseburger +
    quantities.veggieBurger
  );
}

export function hasMenuItems(quantities: MenuQuantities): boolean {
  return Object.values(quantities).some((qty) => qty > 0);
}

export function hasOptionSelections(optionQuantities: OptionQuantities): boolean {
  return Object.values(optionQuantities).some((qty) => qty > 0);
}

export function hasTaxableItems(
  quantities: MenuQuantities,
  optionQuantities: OptionQuantities,
): boolean {
  return hasMenuItems(quantities) || hasOptionSelections(optionQuantities);
}

export function calculateCateringEstimate(
  input: CalculatorInput,
): CalculatorResult {
  const { guestCount, eventDurationHours, serviceType, quantities, optionQuantities } =
    input;
  const lineItems: PriceLineItem[] = [];

  const ayceActive = isAllYouCanEatActive(quantities);
  let foodSubtotal = 0;
  for (const key of Object.keys(cateringPricing.menu) as Array<
    keyof typeof cateringPricing.menu
  >) {
    const item = cateringPricing.menu[key];
    const qty = quantities[key] ?? 0;
    if (qty <= 0) continue;

    let amount: number;
    let detail: string;

    if ('pricePerGuest' in item) {
      amount = guestCount * item.pricePerGuest;
      detail = `${guestCount} × ${formatMoney(item.pricePerGuest)}/guest`;
    } else {
      const unitPrice = ayceActive ? 0 : item.pricePerUnit;
      amount = qty * unitPrice;
      detail = ayceActive
        ? `${qty} (included)`
        : `${qty} × ${formatMoney(item.pricePerUnit)}`;
    }

    foodSubtotal += amount;
    lineItems.push({
      id: item.id,
      label: item.label,
      amount,
      detail,
    });
  }

  let optionsSubtotal = 0;
  for (const key of Object.keys(cateringPricing.options) as Array<
    keyof typeof cateringPricing.options
  >) {
    const qty = Math.max(0, optionQuantities[key] ?? 0);
    if (qty <= 0) continue;
    const opt = cateringPricing.options[key];
    const amount = qty * opt.pricePerUnit;
    optionsSubtotal += amount;
    lineItems.push({
      id: opt.id,
      label: opt.label,
      amount,
      detail: `${qty} × ${formatMoney(opt.pricePerUnit)}`,
    });
  }

  const rawFoodTotal = foodSubtotal + optionsSubtotal;
  const service = cateringPricing.serviceTypes[serviceType];
  const foodAfterServiceMultiplier = rawFoodTotal * service.foodMultiplier;

  const menuItemsAdded = hasMenuItems(quantities);
  const taxableItemsAdded = hasTaxableItems(quantities, optionQuantities);

  let laborSubtotal = 0;
  let tripChargeAmount = 0;
  if (menuItemsAdded) {
    laborSubtotal = calculateLaborCost(guestCount, eventDurationHours);
    if (laborSubtotal > 0) {
      const ratePerHour = getLaborRatePerHour(guestCount);
      lineItems.push({
        id: 'labor',
        label: cateringPricing.labor.label,
        amount: laborSubtotal,
        detail: `${eventDurationHours} hr × ${formatMoney(ratePerHour)}/hr`,
      });
    }

    tripChargeAmount = cateringPricing.tripCharge.amount;
    lineItems.push({
      id: cateringPricing.tripCharge.id,
      label: cateringPricing.tripCharge.label,
      amount: tripChargeAmount,
    });
  }

  const foodTaxableSubtotal = taxableItemsAdded ? foodAfterServiceMultiplier : 0;
  const feesSubtotal = menuItemsAdded ? laborSubtotal + tripChargeAmount : 0;
  const taxAmount = foodTaxableSubtotal * cateringPricing.tax.rate;
  const subtotalBeforeTax = foodTaxableSubtotal + feesSubtotal;
  const estimatedTotal = subtotalBeforeTax + taxAmount;
  const safeGuests = Math.max(guestCount, 1);
  const pricePerGuest = estimatedTotal / safeGuests;

  return {
    guestCount,
    foodSubtotal,
    optionsSubtotal,
    foodAfterServiceMultiplier,
    laborSubtotal,
    serviceMultiplierLabel: service.label,
    subtotalBeforeTax,
    taxAmount,
    estimatedTotal,
    pricePerGuest,
    lineItems,
  };
}

export function formatMoney(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: cateringPricing.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
