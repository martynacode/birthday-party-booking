// Import React and the useState hook from the react library.
// useState lets us "remember" which package the user has picked.
import React, { useState } from "react";

// ===== PackageSelector — Step 2 of the booking flow =====
//
// Lets the user pick between two tiers: Gold (essentials) or
// Platinum (everything in Gold plus extended room time, a hot
// chocolate station, extra host, party bags, host-led games,
// and a premium voucher).
//
// The tier picked here drives downstream behaviour — Platinum
// unlocks the hot chocolate experience, which is mentioned in
// FoodAndAllergyForm's allergen messages for dairy-sensitive guests.
//
// Sends an object up to App.js: { package: <full package object> }
//
// Props:
//   - onContinue: called with the package data when Continue is clicked
//
function PackageSelector({ onContinue }) {
  // === STATE: which package has the user picked? ===
  // Starts as null because nothing is selected yet.
  const [selectedPackage, setSelectedPackage] = useState(null);

  // === DATA: the two packages on offer ===
  // Stored as an array of objects so we can loop over them and
  // let React render one card per package automatically.
  const packages = [
    {
      id: "gold",
      name: "Gold",
      price: 25,
      colourClass: "package-gold",
      features: [
        "⛷️ Sledging session (45 minutes)",
        "🏠 Private party room (3 hours)",
        "🍕 Hot food included",
        "🧃 Unlimited juice and water for the crew",
        "☕ Unlimited tea and coffee for parents",
        "👑 Birthday throne — a special sledge for the birthday star",
        "📸 Group photo at the end",
        "🎁 Gift for the birthday child",
        "🎫 Voucher: sledging for a family of 4",
        "🎵 Music in the party room",
      ],
    },
    {
      id: "platinum",
      name: "Platinum",
      price: 40,
      colourClass: "package-platinum",
      features: [
        "Everything in Gold, plus:",
        "🏠 Extended party room (4 hours instead of 3)",
        "👤 Extra host on the slope to keep the party flowing",
        "🎮 Host-led party games with rewards for the winners",
        "🛍️ Party bag for every guest to take home",
        "🍫 Hot chocolate station with whipped cream and marshmallows",
        "🎫 Premium voucher: a private sledging lesson",
      ],
    },
  ];

  // === HANDLE CONTINUE ===
  // Runs when the user clicks the Continue button.
  // 1. Find the full package object using the selected id
  // 2. Pass it up to App.js through the onContinue prop
  function handleContinue() {
    const chosen = packages.find((p) => p.id === selectedPackage);
    onContinue({ package: chosen });
  }

  // === WHAT TO DISPLAY ON THE SCREEN ===
  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Decide what the crew gets</h2>
        <p className="form-subtitle">Pick the package that suits the party</p>

        <div className="package-grid">
          {/* Loop over each package and render a card.
              The card uses package.colourClass for tier-specific styling
              (gold vs platinum colour treatment in CSS). */}
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`package-card ${pkg.colourClass} ${
                selectedPackage === pkg.id ? "package-card-selected" : ""
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {/* Package name as the heading */}
              <h3>{pkg.name}</h3>

              {/* Price — toFixed(2) ensures consistent 2-decimal display
                  even for whole-pound values (£25 → £25.00). */}
              <p className="package-price">£{pkg.price.toFixed(2)} per child</p>

              {/* Feature list — one <li> per feature in the array */}
              <ul className="package-features">
                {pkg.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              {/* Selection hint — tells the user this card is tappable,
                  and changes to "Selected" once they have picked it. */}
              <p className="package-select-hint">
                {selectedPackage === pkg.id ? "✓ Selected" : "Tap to select"}
              </p>
            </div>
          ))}
        </div>

        {/* Continue button — disabled until a package is selected.
            type="button" prevents accidental form submission if this
            component is ever placed inside a <form>. */}
        <button
          type="button"
          className="continue-button"
          onClick={handleContinue}
          disabled={!selectedPackage}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Export so App.js can import this component
export default PackageSelector;
