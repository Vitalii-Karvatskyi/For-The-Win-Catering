/**
 * Editable marketing copy, FAQ, and event requirements.
 * Update text here without touching component logic.
 */

export const cateringHero = {
  title: 'For The Win Catering',
  subtitle:
    'Onsite burger catering for corporate events, weddings, productions, private parties, and more — cooked fresh, served FTW style.',
  primaryCta: 'Calculate Your Event',
};

export const cateringSections = {
  calculator: {
    id: 'calculator',
    title: 'Event calculator',
    subtitle: 'Build a quick estimate for your menu, service style, and add-ons.',
  },
  inquiry: {
    id: 'inquiry',
    title: 'Request Catering',
    subtitle: 'Share your event details and our team will follow up with availability and next steps.',
  },
  occasions: {
    title: 'Catering for Every Occasion',
    subtitle:
      "Whether it's 10 people or 200, we've got you covered. Our smash burgers, loaded fries, and sides are crowd-pleasers every time.",
  },
  testimonials: {
    title: 'What Our Guests Say',
  },
  faq: {
    id: 'faq',
    title: 'Frequently Asked Questions',
  },
  requirements: {
    id: 'requirements',
    title: 'Event requirements',
    subtitle: 'Practical details to help your venue and our crew plan a smooth service.',
  },
};

export const cateringFaq = [
  {
    id: 'onsite',
    question: 'Do you offer onsite catering?',
    answer:
      'Yes. Our onsite cooking service brings the FTW grill experience to your venue with fresh burgers cooked to order.',
  },
  {
    id: 'dropoff',
    question: 'Do you offer drop-off catering?',
    answer:
      'Yes. Drop-off catering is available for events that prefer pre-packed, ready-to-serve burgers and fries delivered at your scheduled time.',
  },
  {
    id: 'areas',
    question: 'What areas do you serve?',
    answer:
      'Service areas vary by FTW location and event date. Submit an inquiry with your address and we will confirm travel, setup, and availability.',
  },
  {
    id: 'large-events',
    question: 'Can you handle 50+ guests?',
    answer:
      'Absolutely. We regularly support mid-size and large events. Guest count, menu mix, and service type help us staff and plan accordingly.',
  },
  {
    id: 'dietary',
    question: 'Do you offer veggie or gluten-free options?',
    answer:
      'Yes. Veggie burgers and gluten-free buns are available. Note any dietary needs in your inquiry so we can plan quantities.',
  },
  {
    id: 'calculator',
    question: 'Is the calculator final pricing?',
    answer:
      'No. The calculator provides an estimate only. Final pricing depends on event details, location, menu selections, service type, and date availability.',
  },
  {
    id: 'booking',
    question: 'How far in advance should I book?',
    answer:
      'We recommend reaching out at least 2–4 weeks ahead for most events. Peak dates and large guest counts may require more lead time.',
  },
] as const;

export const cateringOccasions = [
  {
    id: 'corporate',
    title: 'Corporate',
    description: 'Office lunches, team meetings, company events',
  },
  {
    id: 'parties',
    title: 'Parties',
    description: 'Birthdays, graduations, game days, celebrations',
  },
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Rehearsal dinners, receptions, cocktail hours',
  },
  {
    id: 'holidays',
    title: 'Holidays',
    description: 'Thanksgiving, holiday parties, family gatherings',
  },
] as const;

export const cateringTestimonials = [
  {
    id: 'anjeline',
    quote:
      'This place has become our go to burger spot almost immediately! As soon as I saw the prices, it had me hooked. Then I tasted the food. It was amazing! Such a fantastic burger for a decent price!',
    author: 'Anjeline R.',
  },
  {
    id: 'gy',
    quote:
      'Great smash burger. Had the double cheese, with lettuce and tomato. Lots of flavor. We tried the Brussels Sprouts, Sweet potato fries, regular fries, and a chocolate shake. We enjoyed everything!',
    author: 'G Y.',
  },
  {
    id: 'lees',
    quote:
      'Simply amazing. Friendly atmosphere, great customer service, groovy music and most importantly incredibly delicious burgers. This place is hands down one of the best burger spots out there!',
    author: "Lee's T.",
  },
] as const;

export const eventRequirements = [
  {
    id: 'space',
    title: 'Required space',
    body: 'A flat, accessible service area with room for our setup, guest flow, and any queue lines. Onsite cooking typically needs roughly 12×12 ft minimum; larger events may need more.',
  },
  {
    id: 'parking',
    title: 'Parking & loading access',
    body: 'Clear vehicle access for load-in and load-out. Please confirm parking, dock, or curbside rules with your venue in advance.',
  },
  {
    id: 'setup',
    title: 'Setup time',
    body: 'Plan 60–90 minutes before your first guest is served for onsite cooking. Drop-off timing will be coordinated based on your service window.',
  },
  {
    id: 'duration',
    title: 'Service duration',
    body: 'Standard service windows are 2–3 hours depending on guest count and menu. Extended service may be available — include timing in your inquiry.',
  },
  {
    id: 'power',
    title: 'Power & logistics',
    body: 'Onsite cooking may require electrical access or propane logistics depending on location. We will confirm needs after reviewing your venue.',
  },
  {
    id: 'permits',
    title: 'Permits & venue approval',
    body: 'Some venues require catering approval, insurance certificates, or permits. Share any venue requirements in your inquiry so we can prepare documentation.',
  },
] as const;

export const ftwLocations = [
  { id: 'tbd', label: 'Not sure yet' },
  { id: 'location-a', label: 'FTW Location A' },
  { id: 'location-b', label: 'FTW Location B' },
  { id: 'location-c', label: 'FTW Location C' },
] as const;
