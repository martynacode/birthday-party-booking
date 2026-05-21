// Import React and the useState hook.
// We will need useState twice — for chosen food
// and the array of ticked allergens.
import React, { useState } from "react";

// ===== FoodAndAllergyForm — Step 4 of the booking flow =====
//
// Captures food and dietary information for the party:
//   - What main the whole crew is having (single choice)
//   - Any allergens or dietary needs (multi-select with inline messages)
//
// Platinum customers also see a dedicated hot chocolate station
// section describing what's offered and the alternatives available.
//
// Sends an object up to App.js: { food, allergens }
//
// Props:
//   - onContinue: called with the data when the user clicks Continue
//   - onBack: returns the user to the previous step (Room)
//   - packageChoice: the package picked earlier (used to show/hide
//                    the hot chocolate section and to tailor allergen
//                    messages by tier)
//   - previousData: any data already entered (for back-navigation)
//
// Notes:
//   - Chips and veg sticks are always served — mentioned in copy, not selectable
//   - All toppings are dairy-free and meat-free by default; vegan and
//     allergy-aware alternatives are flagged through the allergen section
//
function FoodAndAllergyForm({
  onContinue,
  onBack,
  packageChoice,
  previousData,
}) {
  // === STATE ===
  // State is initialised from previousData if the user is returning
  // to this step (e.g. after clicking Back from Step 5). Otherwise
  // it starts empty.
  const [selectedFood, setSelectedFood] = useState(previousData?.food || null);
  const [selectedAllergens, setSelectedAllergens] = useState(
    previousData?.allergens || [],
  );

  // === HANDLERS ===
  // toggleAllergen: toggles a single allergen id in/out of selectedAllergens
  //   - if it's already in the array → remove it (untick)
  //   - if it's NOT in the array → add it (tick)
  // Used by each checkbox in the allergens section.
  function toggleAllergen(allergenId) {
    if (selectedAllergens.includes(allergenId)) {
      // Already ticked — remove it
      setSelectedAllergens(selectedAllergens.filter((id) => id !== allergenId));
    } else {
      // Not ticked yet — add it
      setSelectedAllergens([...selectedAllergens, allergenId]);
    }
  }

  // === DATA: the four main food options ===
  const foodOptions = [
    {
      id: "pizza",
      label: "Cheese Pizza",
      emoji: "🍕",
      description: "Classic Margherita pizza",
      allergens: ["🌾 Gluten / Wheat", "🥛 Dairy / Milk"],
    },
    {
      id: "chicken-goujons",
      label: "Chicken Goujons",
      emoji: "🍗",
      description: "Crispy chicken goujons",
      allergens: ["🌾 Gluten / Wheat", "🍗 Contains chicken"],
    },
    {
      id: "hot-dogs",
      label: "Hot Dogs",
      emoji: "🌭",
      description: "Classic kids' hot dogs",
      allergens: ["🌾 Gluten / Wheat", "🐖 Contains pork"],
    },
    {
      id: "tomato-pasta",
      label: "Creamy Tomato Pasta",
      emoji: "🍝",
      description: "Creamy tomato pasta",
      allergens: ["🌾 Gluten / Wheat", "🥛 Dairy / Milk"],
    },
  ];

  // === DATA: allergen options with inline messages ===
  // Each allergen has:
  //   - id: used internally to track what's ticked
  //   - label: emoji-prefixed display text
  //   - message: always shown when ticked — describes what is true about the food
  //   - platinumExtra (optional): only shown for Platinum customers —
  //     describes additional info relevant to the hot chocolate station
  const allergenOptions = [
    {
      id: "nuts",
      label: "🥜 Nuts",
      message:
        "We don't use nuts in our food, but as some items are packaged we can't guarantee 100% nut-free. For severe nut allergies, please call us to discuss.",
    },
    {
      id: "gluten",
      label: "🌾 Gluten / Wheat",
      message:
        "Our pizza, hot dogs, goujons and pasta all contain gluten. Note: our chips are cooked alongside gluten products, so they're not suitable for coeliac guests. We can offer alternatives — just let us know.",
    },
    {
      id: "dairy",
      label: "🥛 Dairy",
      message:
        "Pizza and pasta contain dairy. We can offer dairy-free alternatives such as goujons or hot dogs as a main.",
      platinumExtra:
        "Our hot chocolate is made with milk by default, but we can swap to dairy-free milk on request. Toppings are already dairy-free.",
    },
    {
      id: "eggs",
      label: "🥚 Eggs",
      message:
        "Some items may contain eggs. Let us know on the day and we can advise — usually goujons or pasta are safe.",
    },
    {
      id: "vegetarian",
      label: "🌱 Vegetarian",
      message:
        "Cheese pizza and tomato pasta are both vegetarian-friendly mains.",
      platinumExtra:
        "The hot chocolate station and all toppings are vegetarian-friendly.",
    },
    {
      id: "vegan",
      label: "🌿 Vegan",
      message:
        "We can offer vegan pasta (without cheese) as a main. Please mention specific guests to your host on the day.",
      platinumExtra:
        "The hot chocolate can be made vegan with dairy-free milk, and we can swap in vegan marshmallows. All other toppings are already vegan-friendly.",
    },
    {
      id: "other",
      label: "❓ Other",
      message:
        "Please give us a call so we can discuss your specific needs in advance.",
    },
  ];

  // === WHAT TO DISPLAY ON THE SCREEN ===
  return (
    <div className="form-page">
      <div className="form-container">
        {/* Heading and intro */}
        <h2>🍕 Food &amp; Allergies</h2>
        <p className="form-subtitle">
          Help us make sure every child has a great meal!
        </p>

        {/* Section: pick the main food */}
        <h3>🍽️ Pick a main for the crew</h3>
        <p className="form-subtitle">
          One food choice for the whole group. Children with allergies will get
          a suitable alternative automatically.
        </p>

        <div className="food-grid">
          {foodOptions.map((food) => (
            <div
              key={food.id}
              className={`food-card ${selectedFood === food.id ? "food-card-selected" : ""}`}
              onClick={() => setSelectedFood(food.id)}
            >
              <div className="food-card-emoji">{food.emoji}</div>
              <h4 className="food-card-label">{food.label}</h4>
              <p className="food-card-description">{food.description}</p>

              <div className="food-card-allergens">
                {food.allergens.map((allergen, index) => (
                  <span key={index} className="allergen-pill">
                    {allergen}
                  </span>
                ))}
              </div>

              {selectedFood === food.id && (
                <span className="food-card-selected-badge">✓ Selected</span>
              )}
            </div>
          ))}
        </div>

        {/* === Section: Hot Chocolate Station (Platinum only) === */}
        {packageChoice?.id === "platinum" && (
          <div className="hot-chocolate-section">
            <h3>🍫 Hot chocolate station</h3>
            <p>
              Your party comes with a build-your-own hot chocolate station! Each
              child gets to make their own with our selection of toppings:
            </p>
            <ul className="hot-chocolate-toppings">
              <li>🍫 Hot chocolate (made with milk by default)</li>
              <li>☁️ Whipped cream</li>
              <li>🌈 Sprinkles</li>
              <li>🍫 Chocolate sauce</li>
              <li>🍓 Strawberry sauce</li>
              <li>🍡 Marshmallows</li>
            </ul>
            <p className="hot-chocolate-note">
              All our toppings are dairy-free and meat-free. We can also offer
              dairy-free milk alternatives and vegan toppings (including vegan
              marshmallows) — just flag any dietary needs in the allergies
              section below.
            </p>
          </div>
        )}

        {/* === Section: Allergens === */}
        <h3>🚨 Tell us about any allergies</h3>
        <p className="form-subtitle">
          We'll make sure everyone's looked after — please tick anything that
          applies.
        </p>

        <div className="allergen-list">
          {allergenOptions.map((allergen) => (
            <div key={allergen.id} className="allergen-item">
              {/* Clickable row: tickbox + label wrapped in a <label>
                  so clicking the text also toggles the box (accessibility win) */}
              <label className="allergen-row">
                <input
                  type="checkbox"
                  checked={selectedAllergens.includes(allergen.id)}
                  onChange={() => toggleAllergen(allergen.id)}
                />
                <span>{allergen.label}</span>
              </label>

              {/* Inline messages — only render when the allergen is ticked.
                  Main message always shows; Platinum extra only shows if the
                  user is on Platinum AND this allergen has a platinumExtra. */}
              {selectedAllergens.includes(allergen.id) && (
                <>
                  <p className="allergen-message">📝 {allergen.message}</p>

                  {packageChoice?.id === "platinum" &&
                    allergen.platinumExtra && (
                      <p className="allergen-message">
                        🍫 {allergen.platinumExtra}
                      </p>
                    )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* === Section: Food summary === */}
        <div className="food-summary">
          <h3>Your food summary</h3>

          {/* Main food */}
          <p>
            <strong>Crew food:</strong>{" "}
            {selectedFood
              ? `${foodOptions.find((f) => f.id === selectedFood).emoji} ${
                  foodOptions.find((f) => f.id === selectedFood).label
                }`
              : "Not chosen yet"}
          </p>

          {/* Allergens */}
          <p>
            <strong>Allergies: </strong>
            {selectedAllergens.length === 0
              ? "None declared ✅"
              : selectedAllergens
                  .map((id) => allergenOptions.find((a) => a.id === id).label)
                  .join(", ")}
          </p>
        </div>

        {/* === Navigation buttons === */}
        <div className="form-buttons">
          {/* Back button: returns to previous step without saving.
              We deliberately do not autosave in-progress data here —
              clicking Back implies the user wants to revisit earlier
              choices, not commit current ones. */}
          <button type="button" className="button-secondary" onClick={onBack}>
            ← Back
          </button>

          {/* Continue button: sends the food/allergens data
              up to App.js and moves to the next step.
              Disabled until the user has picked a main food.
              Allergens are optional. */}
          <button
            type="button"
            className="button-primary"
            disabled={!selectedFood}
            onClick={() =>
              onContinue({
                food: selectedFood,
                allergens: selectedAllergens,
              })
            }
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

// Export so App.js can import this component
export default FoodAndAllergyForm;
