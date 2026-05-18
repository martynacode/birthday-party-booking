// Import React and the useState hook.
// We will need useState three times — for chosen food, dessert,
// and the array of ticked allergens.
import React, { useState } from "react";

// ===== FoodAndAllergyForm — Step 4 of the booking flow =====
//
// Captures food and dietary information for the party:
//   - What main the whole crew is having (single choice)
//   - Optional dessert choice (only shown to Platinum packages)
//   - Any allergens or dietary needs (multi-select with inline messages)
//
// Sends an object up to App.js: { food, dessert, allergens }
//
// Props:
//   - onContinue: called with the data when the user clicks Continue
//   - packageChoice: the package picked earlier (used to show/hide dessert section
//                    and to tailor allergen messages by tier)
//
// Notes:
//   - Chips and veg sticks are always served — mentioned in copy, not selectable
//   - Each allergen shows an inline message explaining what we can accommodate
//   - Allergens with dessert implications carry an optional platinumExtra field
//     that only renders for Platinum customers
//
function FoodAndAllergyForm({ onContinue, packageChoice }) {
  // === STATE ===
  // Three pieces of state, one per section of the form.
  // Food and dessert are single-choice (start as null, hold a string id when picked).
  // Allergens are multi-choice (start as empty array, get added/removed as ticked).
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [selectedAllergens, setSelectedAllergens] = useState([]);

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

  // === DATA: dessert options (Platinum only) ===
  const dessertOptions = [
    {
      id: "ice-cream",
      label: "Ice Cream",
      emoji: "🍦",
      description:
        "Individual sealed pots, multiple flavours on the day. Vegan alternatives available — please flag any vegan guests under allergies.",
      allergens: ["🥛 Dairy / Milk", "⚠️ May contain traces of nuts or gluten"],
    },
    {
      id: "fruit-skewers",
      label: "Fruit Skewer",
      emoji: "🍓",
      description:
        "Strawberry, melon and pineapple. Occasionally swapped for whatever's freshest on the day. A great choice for most diets — please still flag any allergies below so we can prep safely.",
      allergens: ["✅ No major allergens"],
    },
  ];

  // === DATA: allergen options with inline messages ===
  // Each allergen has:
  //   - id: used internally to track what's ticked
  //   - label: emoji-prefixed display text
  //   - message: always shown when ticked — describes what is true about the food
  //   - platinumExtra (optional): only shown for Platinum customers — describes
  //     additional dessert-related info that doesn't apply to Gold
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
        "Ice cream also contains dairy — we can offer vegan vanilla ice cream as an alternative, or swap to fruit skewers.",
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
        "Both ice cream and fruit skewers are vegetarian-friendly for dessert.",
    },
    {
      id: "vegan",
      label: "🌿 Vegan",
      message:
        "We can offer vegan pasta (without cheese) as a main. Please mention specific guests to your host on the day.",
      platinumExtra:
        "For dessert, fruit skewers are naturally vegan, and we can offer vegan vanilla ice cream as an alternative.",
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

        {/* === Section: Pick a dessert (Platinum only) === */}
        {packageChoice.id === "platinum" && (
          <>
            <h3>🍰 Pick a dessert for the crew</h3>
            <p className="form-subtitle">
              Platinum includes a sweet treat — pick one for the group.
            </p>

            <div className="food-grid">
              {dessertOptions.map((dessert) => (
                <div
                  key={dessert.id}
                  className={`food-card ${selectedDessert === dessert.id ? "food-card-selected" : ""}`}
                  onClick={() => setSelectedDessert(dessert.id)}
                >
                  <div className="food-card-emoji">{dessert.emoji}</div>
                  <h4 className="food-card-label">{dessert.label}</h4>
                  <p className="food-card-description">{dessert.description}</p>

                  <div className="food-card-allergens">
                    {dessert.allergens.map((allergen, index) => (
                      <span key={index} className="allergen-pill">
                        {allergen}
                      </span>
                    ))}
                  </div>

                  {selectedDessert === dessert.id && (
                    <span className="food-card-selected-badge">✓ Selected</span>
                  )}
                </div>
              ))}
            </div>
          </>
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

                  {packageChoice.id === "platinum" &&
                    allergen.platinumExtra && (
                      <p className="allergen-message">
                        🍰 {allergen.platinumExtra}
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

          {/* Main food*/}
          <p>
            <strong>Crew food:</strong>
            {selectedFood
              ? `${foodOptions.find((f) => f.id === selectedFood).emoji} ${
                  foodOptions.find((f) => f.id === selectedFood).label
                }`
              : "Not chosen yet"}
          </p>

          {/* Dessert (only for Platinum) */}
          {packageChoice.id === "platinum" && (
            <p>
              <strong>Dessert: </strong>
              {selectedDessert
                ? `${dessertOptions.find((d) => d.id === selectedDessert).emoji} ${
                    dessertOptions.find((d) => d.id === selectedDessert).label
                  }`
                : "Not chosen yet"}
            </p>
          )}

          {/* Allergens */}
          <p>
            <strong>Allergies: </strong>
            {selectedAllergens.length === 0
              ? "None delcared ✅"
              : selectedAllergens
                  .map((id) => allergenOptions.find((a) => a.id === id).label)
                  .join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

// Export so App.js can import this component
export default FoodAndAllergyForm;
