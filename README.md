# Children's Party Booking Platform

A React-based booking system for children's party venues, built as my final-year project for the Open University's BSc (Honours) Computing and IT.

The project explores how warm, trust-led UX design can simplify a genuinely complicated booking journey — drawing on my industry experience as a party host at a snow-sports venue.

---

## About this project

This is **TM470: The Computing and IT Project** — my final-year capstone for the Open University. It's a working React MVP that walks parents through booking a children's birthday party, with the architecture in place to support a separate staff-facing dashboard.

The project is deliberately **generic and venue-agnostic**. It's inspired by industry experience, but room names, package details, mascot branding, and pricing are all fictional — not tied to any real venue.

---

## Status

🚧 **Active development** — TMA03 due July 2026, EMA due September 2026.

**What's working:**

- Landing page
- Party details form (with validation, error handling, and accessibility considerations)
- Package selector (Gold vs Platinum tiers with tier-aware downstream behaviour)
- Room selector (capacity-aware filtering with disabled states for too-small rooms)
- Food & allergy form (tier-aware allergen messaging, back-navigation with state persistence)

**What's planned (skeleton stubs in place):**

- Booking details (parent contact info collection)
- Booking confirmation (summary + reference number)
- Host view (staff-facing dashboard, separate from parent flow)
- Brand identity through Bjorn, a hand-illustrated mascot

See the header comments in `BookingDetails.js`, `BookingConfirmation.js`, and `HostView.js` for the planned architecture of each.

---

## Tech stack

- **React** (functional components, hooks)
- **JavaScript** (ES6+)
- **HTML5 + CSS3** (responsive design, CSS variables)
- **Create React App** (Webpack + Babel via CRA defaults)
- **Prettier** for code formatting
- **Git + GitHub** for version control

---

## Architectural choices

A few decisions worth flagging:

**Single source of truth.** All booking data lives in `App.js` as `bookingData`. Each form is a presentational component that collects its own data and passes it up via `onContinue`. This keeps the data flow predictable and makes back-navigation trivial.

**Tier-aware behaviour.** The package tier picked in `PackageSelector` cascades through the rest of the flow. Platinum unlocks the dessert section in `FoodAndAllergyForm` and adds dessert-related messaging to allergen warnings. This was modelled at the data level (with `platinumExtra` fields) rather than scattered through the JSX with if-statements.

**Back-navigation with state persistence.** Implemented in `FoodAndAllergyForm` as the iteration pattern: forms initialise their state from a `previousData` prop, so navigating back and forth preserves the user's choices. Extending this pattern across the other forms is the next planned iteration.

**Separation of parent and host flows.** The codebase models two distinct user journeys: parents booking parties, and staff viewing bookings. They share the same underlying data shape but never navigate between each other.

---

## Running locally

Clone the repository:

\`\`\`bash
git clone https://github.com/martynacode/birthday-party-booking.git
cd birthday-party-booking
\`\`\`

Or open it directly in **GitHub Desktop** via _File → Clone Repository_.

Then install and run:

\`\`\`bash
npm install
npm start
\`\`\`

The app will open at `http://localhost:3000`.

---

## About me

I'm Martyna — a final-year Computing & IT student at the Open University, moving from hospitality into frontend and UX. This project draws on my work as a party host, where I've watched parents wrestle with overcomplicated booking systems and wondered if it could be done with more care.

- 🔗 [LinkedIn](https://www.linkedin.com/in/martynamanikowska)

---

## A note on the project name

This is an academic project. Any resemblance to specific commercial booking platforms or party venues is intentional only in spirit — drawing on industry patterns I've observed — not in fact. All venue names, prices, room layouts, and branding are fictional.
