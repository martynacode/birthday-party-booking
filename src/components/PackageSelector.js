// Import React and useState
import React, { useState } from "react";

// PackageSelector receives onContinue from App.js
// onContinue is a function — we call it with the chosen package when ready
function PackageSelector({ onContinue }) {
  // === STATE: which package has the user picked? ===
  // Starts as null = nothing selected yet
  const [selectedPackage, setSelectedPackage] = useState(null);

  // === DATA: package details ===
  // Defined as an array of objects so we can loop over it cleanly
  const packages = [
    {
      id: "gold",
      name: "Gold",
      price: 19.99,
      colourClass: "package-gold",
      features: [
        "⛷️Sledging session (30 minutes)",
        "🏠Private party room (3 hours)",
        "🍕Hot food included",
        "☕Unlimited tea, coffee and squash",
        "👑 Birthday throne — a special sledge for the birthday star",
        "📸 Group photo at the end",
        "🎁 Gift for the birthday child",
        "🎫Voucher: sledging for a family of 4",
        "🎵Music in the party room",
      ],
    },

    {
      id: "platinum",
      name: "Platinum",
      price: 29.99,
      colourClass: "package-platinum",
      features: [
        "Everything in Gold, plus:",
        "👤 Extra host on the slope to keep the party flowing",
        "🎮 Host-led party games with rewards for the winners",
        "🛍️  Party bag for every guest to take home",
        "🍦 Ice cream and fruit skewers for the crew",
        "🎫 Premium voucher: a private sledging lesson",
      ],
    },
  ];

  // === HANDLE CONTINUE ===
  // Find the full package object from the selected id, pass it up to App.js
  function handleContinue() {
    const chosen = packages.find((p) => p.id === selectedPackage);
    onContinue({ package: chosen });
  }

  // === What to display ===
  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Decide what the crew gets</h2>
        <p className="form-subtitle">Pick the package that suits the party</p>

        <div className="package-grid">
          {/* Loop over each package and render a card */}
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`package-card ${pkg.colourClass} ${
                selectedPackage === pkg.id ? "package-card-selected" : ""
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <h3>{pkg.name}</h3>
              <p className="package-price">£{pkg.price.toFixed(2)} per child</p>
              <ul className="package-features">
                {pkg.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <p className="package-select-hint">
                {selectedPackage === pkg.id ? "✓ Selected" : "Tap to select"}
              </p>
            </div>
          ))}
        </div>

        <button
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

export default PackageSelector;
