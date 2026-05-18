// Import React and the useState hook.
// We will need useState three times - for chosen food, dessert,
// and the array of ticked allergens.
import React, { useState } from 'react';


// ====Food andAllergyForm - STEP 4
//
// Captures food and dietary information for the party:
// - What main the whole crew is having (single choice)
// - Optional dessert choice (only shown to Platinum packages)
// - Any allergens or dietary needs (multi-select with inline messages)

// Sends an object up to App.js {food, dessert, allergens}
//
// Props:
// - Chips and veg sticks are always served - mentioned in copy, not selectable
// - Each allergen shows an inline message explaining what we can accommodate
//
function FoodAndAllergyForm({ onContinue, packageChoice }) {

    // === STATE ===
    // Three pieces of state, one per section of the form
    // Food and dessert are single-choice (start as null, hold a string id when picked).
    // Allergens are multi-choice (start as empty array, get added/removed as ticked).
    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedDessert, setSelectedDessert] = useState(null);
    const [selectedAllergens, setSelectedAllergens] = useState([]);


    // === DATA: the four main food options ===
    // Each option has the data needed to render one card:
    // id: used internally to track what's selected
    // label: the display name on the card
    // emoji: visual icon top-left of the card
    // description: array of pill bages shown at the bottom of the card
    //
    // Storing this as an array means the JSX can loop with .map()
    // and draw one card per option automatically.
    const foodOptions = [
        {
            id: 'pizza',
            label: 'Cheese Pizza',
            emoji: '🍕',
            description: 'Classic Margherita pizza',
            allergens: ['🌾 Gluten / Wheat', '🥛 Dairy / Milk']
        },
        {
            id: 'chicken-goujons',
            label: 'Chicken Goujons',
            emoji: '🍗',
            description: 'Crispy chicken goujons',
            allergens: ['🌾 Gluten / Wheat']
        },
        {
            id: 'hot-dogs',
            label: 'Hot Dogs',
            emoji: '🌭',
            description: "Classic kids' hot dogs",
            allergens: ['🌾 Gluten / Wheat']
        },
        {
            id: 'tomato-pasta',
            label: 'Creamy Tomato Pasta',
            emoji: '🍝',
            description: 'Creamy tomato pasta',
            allergens: ['🌾 Gluten / Wheat', '🥛 Dairy / Milk']
        }
    ];


    // === DATA: dessert options (Platinum only) ===
    // Same shape as foodOptions.
    // This section will only be RENDERED if packageChoice is Platinum -
    // the data exists either way, we just conditionally show it in the JSX.
    const dessertOptions = [
        {
            id: 'ice-cream',
            label: 'Ice Cream',
            emoji: '🍦',
            description: 'Individual sealed pots — 4 flavours',
            allergens: ['🥛 Dairy / Milk']
        },
        {
            id: 'fruit-skewers',
            label: 'Fruit Skewer',
            emoji: '🍓',
            description: 'Fresh fruit skewer',
            allergens: ['✅ No major allergens']
        }
    ];


    // === DATA: allergen options with inline messages ===
    // Each allergen has:
    // id: used internally to track what's ticked
    // lebel: emoji-prefixed display test
    // message: shown beside the checkbox when ticked, explainding
    // what our venue can/can't do for this allergen
    //
    // Messages use legally careful language ("can't guarantee 100%"),
    // "please call us to discuss") which protects the venue while
    // staying warm and informative.

    const allergenOptions = [
        {
            id: 'nuts',
            label: '🥜 Nuts',
            message: "We don't use nuts in our food, but as some items are packaged we can't guarantee 100% nut-free. For severe nut allergies, please call us to discuss."
        },
        {
            id: 'gluten',
            label: '🌾 Gluten / Wheat',
            message: "Our pizza, hot dogs, goujons and pasta all contain gluten. Note: our chips are cooked alongside gluten products, so they're not suitable for coeliac guests. We can offer alternatives — just let us know."
        },
        {
            id: 'dairy',
            label: '🥛 Dairy',
            message: "Pizza, pasta and ice cream contain dairy. We can offer dairy-free alternatives — goujons or hot dogs as a main, and vegan vanilla ice cream as a dessert."
        },
        {
            id: 'eggs',
            label: '🥚 Eggs',
            message: "Some items may contain eggs. Let us know on the day and we can advise — usually goujons or pasta are safe."
        },
        {
            id: 'vegetarian',
            label: '🌱 Vegetarian',
            message: "Cheese pizza and tomato pasta are both vegetarian-friendly. Fruit skewers are vegetarian for dessert."
        },
        {
            id: 'vegan',
            label: '🌿 Vegan',
            message: "We can offer vegan pasta (without cheese) and fruit skewers for dessert. Please mention specific guests to the host on the day."
        },
        {
            id: 'other',
            label: '❓ Other',
            message: "Please give us a call so we can discuss your specific needs in advance."
        }
    ];


    // === RETURN (JSX) ===
    // To be built in the next session. 
    // Will render: heading, food cards (loop), dessert section (conditional),
    // allergen checklist with inline messages, summary card, Back/Continue buttons.
    return null;

}

// Export so App.js can import this component
export default FoodAndAllergenForm;