/**
 * Single source of truth for all catering prices and fee rates.
 * Update values here only — UI and calculator logic read from this config.
 */

export const cateringPricing = {
  currency: 'USD' as const,
  currencySymbol: '$',

  menu: {
    allYouCanEat: {
      id: 'allYouCanEat',
      label: 'All you can eat',
      pricePerGuest: 32,
    },
    cheeseburger: {
      id: 'cheeseburger',
      label: 'Cheeseburger/Hamburger',
      pricePerUnit: 10,
    },
    doubleCheeseburger: {
      id: 'doubleCheeseburger',
      label: 'Double Cheeseburger/Hamburger',
      pricePerUnit: 15,
    },
    veggieBurger: {
      id: 'veggieBurger',
      label: 'Veggie Burger',
      pricePerUnit: 15,
    },
    fries: {
      id: 'fries',
      label: 'Fries',
      pricePerUnit: 6,
    },
  },

  options: {
    glutenFreeBun: {
      id: 'glutenFreeBun',
      label: 'Gluten-free bun',
      pricePerUnit: 3,
    },
    freshCondiments: {
      id: 'freshCondiments',
      label: 'Fresh condiments',
      subtitle: 'lettuce, tomato, pickled jalapeño',
      pricePerUnit: 20,
      maxQuantity: 1,
    },
  },

  serviceTypes: {
    dropOff: {
      id: 'dropOff',
      label: 'Drop-off catering',
      /** Multiplier applied to food subtotal (menu + options) */
      foodMultiplier: 1,
    },
    onsite: {
      id: 'onsite',
      label: 'Onsite cooking',
      foodMultiplier: 1,
    },
  },

  eventTypes: [
    { id: 'corporate', label: 'Corporate' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'privateParty', label: 'Private Party' },
    { id: 'production', label: 'Production' },
    { id: 'schoolCommunity', label: 'School / Community' },
    { id: 'other', label: 'Other' },
  ] as const,

  labor: {
    label: 'Time charge',
    tiers: [
      { minGuests: 200, maxGuests: null, ratePerHour: 150 },
      { minGuests: 125, maxGuests: 199, ratePerHour: 125 },
      { minGuests: 75, maxGuests: 124, ratePerHour: 100 },
      { minGuests: 51, maxGuests: 74, ratePerHour: 75 },
      { minGuests: 20, maxGuests: 50, ratePerHour: 50 },
    ],
    belowTierRatePerHour: 50,
  },

  eventDuration: {
    label: 'Event duration (hours)',
    minHours: 1,
    maxHours: 24,
    defaultHours: 2,
  },

  tripCharge: {
    id: 'tripCharge',
    label: 'Trip charge',
    amount: 250,
  },

  tax: {
    rate: 0.1075,
    label: 'Estimated tax',
  },

  estimateDisclaimer:
    'This is only an estimate. Final pricing depends on event details, location, menu, service type, and availability.',

  minGuestCount: 10,
  maxGuestCount: 500,
} as const;

export type MenuItemId = keyof typeof cateringPricing.menu;
export type OptionId = keyof typeof cateringPricing.options;
export type ServiceTypeId = keyof typeof cateringPricing.serviceTypes;
export type EventTypeId = (typeof cateringPricing.eventTypes)[number]['id'];
