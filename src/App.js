// Import React and the useState hook
import React, { useState } from 'react';

// Import our components
import LandingPage from './components/LandingPage';
import PartyDetailsForm from './components/PartyDetailsForm';
import PackageSelector from './components/PackageSelector';
import RoomSelector from './components/RoomSelector';

import './App.css';


function App() {
    // STATE: which step are we currently showing
    const [step, setStep] = useState('landing');

    // STATE: the booking data we collect as the user fills in forms
    const [bookingData, setBookingData] = useState({});

    // Called when PartyDetailsForm finishes
    function handleDetailsContinue(partyDetails) {
        setBookingData({ ...bookingData, ...partyDetails });
        setStep('package');
    }

    // Called when PackageSelector finishes
    function handlePackageContinue(packageChoice) {
        setBookingData({ ...bookingData, ...packageChoice });
        setStep('room');
    }

    // Called when RoomSelector finishes
    function handleRoomContinue(roomChoice) {
        setBookingData({ ...bookingData, ...roomChoice });
        setStep('food');
    }

    return (
        <div className="App">
            {step === 'landing' && (
                <LandingPage onBook={() => setStep('details')} />
            )}

            {step === 'details' && (
                <PartyDetailsForm onContinue={handleDetailsContinue} />
            )}

            {step === 'package' && (
                <PackageSelector onContinue={handlePackageContinue} />
            )}

            {step === 'room' && (
                <RoomSelector 
                    onContinue={handleRoomContinue}
                    numberOfChildren={bookingData.numberOfChildren}
                    childName={bookingData.childName}
                />
            )}

            {step === 'food' && (
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <h2>Food & allergy form coming next!</h2>
                    <p>Booking data so far:</p>
                    <pre>{JSON.stringify(bookingData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;