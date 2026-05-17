// Import React and the useState hook from the react library.
// useState lets us "remember" things that can change (like which room is picked).
import React, { useState } from 'react';


// RoomSelector is a component that lets the user pick a party room.
// It receives three props from App.js:
//   - onContinue: a function we call when the user clicks Continue
//   - numberOfChildren: the group size (used to filter which rooms fit)
//   - childName: the birthday child's name (used in the heading)
function RoomSelector({ onContinue, numberOfChildren, childName }) {

    // === STATE: which room has the user picked? ===
    // Starts as null because nothing is selected yet.
    // setSelectedRoom updates this when the user clicks a card.
    const [selectedRoom, setSelectedRoom] = useState(null);


    // === DATA: the three rooms available ===
    // Each room is an object with an id, name, capacity, tagline, and features.
    // Storing them as an array means we can loop over them later
    // and let React draw one card per room automatically.
    const rooms = [
        {
            id: 'frost',
            name: 'Frost',
            capacity: 12,
            tagline: 'Cosy and warm',
            features: [
                'Holds up to 12 little legends',
                'Viewing area for parents',
                'Our smallest room - feels cosy and warm'
            ]
        },
        {
            id: 'glacier',
            name: 'Glacier',
            capacity: 16,
            tagline: 'Our most popular',
            features: [
                'Holds up to 16 little legends',
                'Viewing area for parents',
                'A great all-rounder for medium-sized crews'
            ]
        },
        {
            id: 'blizzard',
            name: 'Blizzard',
            capacity: 24,
            tagline: 'Big crew, Big room',
            features: [
                'Holds up to 24 little legends',
                'Air conditioning and heating',
                'Our biggest room - no viewing area, but plenty of space'
            ]
        }
    ];


    // === HELPER: does this room fit the group size? ===
    // Returns true if the group can fit, false if the room is too small.
    // Number() makes sure we're comparing numbers, not strings.
    function canFit(room) {
        return Number(numberOfChildren) <= room.capacity;
    }


    // === HANDLE CONTINUE ===
    // Runs when the user clicks the Continue button.
    // 1. Find the full room object using the selected id
    // 2. Pass it up to App.js through the onContinue prop
    function handleContinue() {
        const chosen = rooms.find(r => r.id === selectedRoom);
        onContinue({ room: chosen });
    }


    // === WHAT TO DISPLAY ON THE SCREEN ===
    return (
        <div className="form-page">
            <div className="form-container">

                {/* Personalised heading using the birthday child's name */}
                <h2>Where's {childName}'s crew partying?</h2>

                {/* Subheading showing the crew size */}
                <p className="form-subtitle">
                    Showing rooms that fit your crew of {numberOfChildren}
                </p>

                {/* The grid wrapper holds the three room cards.
                    CSS will lay them out in three columns on desktop,
                    or stack them on mobile. */}
                <div className="room-grid">

                    {/* Loop through each room and render a card for it */}
                    {rooms.map((room) => {

                        // Work out once, whether this room fits the crew size.
                        // Use 'fits' to control the className, the onClick, and the messaging below.
                        const fits = canFit(room);
                        return (
                    

                        // Each card needs a unique key — we use room.id (frost, glacier, blizzard).
                        // The className is built using a template literal: it always has "room-card",
                        // and ADDS "room-card-selected" only if this is the currently selected one.
                        // onClick updates the sticky note (state) with the room's id when clicked.
                        <div
                            key={room.id}
                            className={`room-card ${selectedRoom === room.id ? 'room-card-selected' : ''} ${!fits ? 'room-card-disabled' : ''}`}
                            onClick={() => fits && setSelectedRoom(room.id)}
                        >
                            {/* Room name as the heading */}
                            <h3>{room.name}</h3>

                            {/* Short tagline below the name */}
                            <p className="room-tagline">{room.tagline}</p>

                            {/* Nested map: for each feature in this room's features array,
                                render one <li> bullet point. We use index as the key because
                                features are plain strings with no id. */}
                            <ul className="room-features">
                                {room.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>

                            {/* "Too small" message - only shows for rooms that don't fit the crew.
                            Uses && : if !fits is false, nothing renders at all. */}
                            {!fits && (
                                <p className="room-too-small">
                                    {room.name} fits up to {room.capacity} - your crew is a bit bigger than that
                                </p>
                            )}

                            {/* Selection hint - tells the user this card is tappable, and changes to selected
                            once they have picked it*/}
                            <p className="room-select-hint">
                                {selectedRoom === room.id ? 'Selected' : 'Tap to select'}
                            </p>
                        </div>

                        );
                    
                    })}

                </div>

                {/* Continue button - disabled until a room is selected*/}
                <button
                className="continue-button"
                onClick={handleContinue}
                disabled={!selectedRoom}
                >
                    Continue
                </button>


                
            </div>

        </div>
            
    );
}

export default RoomSelector;