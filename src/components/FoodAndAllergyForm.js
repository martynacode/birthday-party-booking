// Update the function declaration to receive packageChoice
function FoodAndAllergyForm({ onContinue, packageChoice }) {

    // === STATE ===
    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedDessert, setSelectedDessert] = useState(null);
    const [selectedAllergens, setSelectedAllergens] = useState([]);


    // === DATA: the four main food options ===
    // Each option has the data needed to render one card:
    // id (for state), label (display), emoji (visual), description (subtitle),
    // and allergens (the pill badges shown on the card).
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
    // Each allergen has an id, label (with emoji), and the message shown
    // inline when the user ticks it. Messages explain what our venue can and
    // can't accommodate, in legally careful language.
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

}