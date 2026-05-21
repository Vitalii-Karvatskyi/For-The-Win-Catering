import type {
  EventTypeId,
  MenuItemId,
  OptionId,
  ServiceTypeId,
} from '../config/cateringPricing';

export type MenuQuantities = Record<MenuItemId, number>;

export type OptionQuantities = Record<OptionId, number>;

export type CalculatorInput = {
  guestCount: number;
  eventDurationHours: number;
  eventType: EventTypeId;
  serviceType: ServiceTypeId;
  quantities: MenuQuantities;
  optionQuantities: OptionQuantities;
};

export type PriceLineItem = {
  id: string;
  label: string;
  amount: number;
  detail?: string;
};

export type CalculatorResult = {
  guestCount: number;
  foodSubtotal: number;
  optionsSubtotal: number;
  foodAfterServiceMultiplier: number;
  laborSubtotal: number;
  serviceMultiplierLabel: string;
  subtotalBeforeTax: number;
  taxAmount: number;
  estimatedTotal: number;
  pricePerGuest: number;
  lineItems: PriceLineItem[];
};

export type CateringInquiryPayload = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  eventDurationHours: number;
  eventLocation: string;
  serviceType: ServiceTypeId;
  eventType: EventTypeId;
  notes: string;
  submittedAt: string;
  source: 'ftw-catering-page';
};
