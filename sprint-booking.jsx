// Shared content for CityPost delivery — landing page assets used across all 4 directions.

window.CityPostBrand = {
  name: "CityPost",
  tagline: "We collect today. We deliver tomorrow.",
  taglineAlt: "Same-day collection across Dublin. Next-day delivery, tracked.",
  blurb: "No post office queue. No next-day collection wait. Book before 2pm and we'll be at your door this afternoon — and you pick the collection and delivery slot that suits you.",

  nav: ["Send a parcel", "Business", "Pricing", "Track", "Help"],

  bookingFields: {
    from: { label: "From", placeholder: "Pickup address or Eircode", value: "D02 — Dame Street" },
    to:   { label: "To",   placeholder: "Drop-off address or Eircode", value: "D15 — Castleknock" },
    size: { label: "Parcel size", options: ["Letter", "Package", "Box"], value: "Package" },
    when: { label: "When", options: ["Tomorrow", "Pick a date"], value: "Tomorrow" },
    price: "€8.99",
    eta: "Collected today, delivered next working day",
  },

  tiers: [
    { name: "Letter",   blurb: "Max 500g · A4 size",           price: "€7.99",  note: "" },
    { name: "Package",  blurb: "Max 2kg · 45×35×20cm",          price: "€8.99",  note: "Most popular" },
    { name: "Box",      blurb: "Max 10kg · 60×40×40cm",          price: "€9.99",  note: "" },
    { name: "Business", blurb: "10+ a week. Same per-parcel.", price: "Account", note: "" },
  ],

  stats: [
    { value: "98.4%",   label: "On-time, last 90 days" },
    { value: "12,400",  label: "Parcels every week" },
    { value: "4.8 / 5", label: "Customer rating" },
  ],

  trustLogos: ["Boojum", "Avoca", "Carraig", "Bewley's", "Sostrene", "Storyful", "Stable", "Industry"],

  coverage: [
    "D1 · North City", "D2 · South City", "D3 · Clontarf", "D4 · Ballsbridge",
    "D5 · Raheny", "D6 · Rathmines", "D7 · Phibsboro", "D8 · Liberties",
    "D9 · Drumcondra", "D10 · Ballyfermot", "D11 · Finglas", "D12 · Crumlin",
    "D13 · Howth", "D14 · Dundrum", "D15 · Castleknock", "D16 · Ballinteer",
    "D17 · Coolock", "D18 · Sandyford", "D22 · Clondalkin", "D24 · Tallaght",
  ],

  steps: [
    { n: "01", title: "Book",       blurb: "Add pickup + drop-off, pay. Done in under a minute, on any device." },
    { n: "02", title: "We collect today", blurb: "Book before 2pm and we're at your door this afternoon. No post office. No queue." },
    { n: "03", title: "Delivered tomorrow", blurb: "Tracked end-to-end. Photo on delivery. Receiver gets an SMS when we're 5 min away." },
  ],

  testimonial: {
    quote: "We send forty parcels a week from the shop. CityPost is the only courier that never makes me chase anything.",
    name: "Aoife Brennan",
    role: "Owner, Brennan & Co · Rathmines",
  },

  // Mobile tracking screen content
  track: {
    parcelId: "CP-94821-D",
    status: "Out for delivery",
    driver: "Eamon",
    vehicle: "Cargo bike · 142-D-EV",
    eta: "12 min",
    progress: 0.72,
    stops: [
      { time: "8:14",  label: "Picked up · Dame St",         done: true },
      { time: "8:42",  label: "At Crumlin sorting hub",      done: true },
      { time: "9:33",  label: "Out for delivery with Eamon", done: true },
      { time: "~9:55", label: "Castleknock · drop-off",      done: false },
    ],
  },

  footer: {
    cols: [
      { title: "Send", links: ["Parcels", "Documents", "Same-day", "Bulk & API"] },
      { title: "Business", links: ["Account pricing", "API & integrations", "Case studies", "Contact sales"] },
      { title: "Company", links: ["About", "Jobs", "Sustainability", "Press"] },
      { title: "Help", links: ["Track a parcel", "Pricing", "Contact", "FAQ"] },
    ],
    legal: "© 2026 CityPost Logistics Ltd. · 23 Sir John Rogerson's Quay, Dublin 2 · CRO 612 884",
  },
};
