// Import React and the useState hook
import React, { useState } from "react";

// Import our components
import LandingPage from "./components/LandingPage";
import PartyDetailsForm from "./components/PartyDetailsForm";
import PackageSelector from "./components/PackageSelector";
import RoomSelector from "./components/RoomSelector";
import FoodAndAllergyForm from "./components/FoodAndAllergyForm";

import "./App.css";

// ===== App — the booking flow controller =====
//
// Top-level component that owns:
//   - The "step" state: which form is currently showing
//   - The "bookingData" state: all the data collected so far
//   - Navigation handlers: how to move between steps
//
// Each form component only knows how to collect its
// own data and pass it up via onContinue. App stores the data and
// decides what to render next.
//
// Step order:
//   landing → details → package → room → food → booking
//
function App() {
  // === STATE ===
  // Which step are we currently showing
  const [step, setStep] = useState("landing");

  // The booking data we collect as the user fills in forms
  const [bookingData, setBookingData] = useState({});

  // === HANDLERS ===
  // Each form has its own continue handler that merges new data into
  // bookingData and advances to the next step. handleBack is shared —
  // any form can request a return to a specific earlier step.

  // Called when PartyDetailsForm finishes
  function handleDetailsContinue(partyDetails) {
    setBookingData({ ...bookingData, ...partyDetails });
    setStep("package");
  }

  // Called when PackageSelector finishes
  function handlePackageContinue(packageChoice) {
    setBookingData({ ...bookingData, ...packageChoice });
    setStep("room");
  }

  // Called when RoomSelector finishes
  function handleRoomContinue(roomChoice) {
    setBookingData({ ...bookingData, ...roomChoice });
    setStep("food");
  }

  // Called when FoodAndAllergyForm finishes
  function handleFoodContinue(foodData) {
    setBookingData({ ...bookingData, ...foodData });
    setStep("booking");
  }

  // Called when any form's Back button is clicked.
  // We use one shared handler that takes a target step name.
  // This keeps things simple — each form just calls handleBack
  // with the step they want to go back to.
  function handleBack(targetStep) {
    setStep(targetStep);
  }

  // === WHAT TO DISPLAY ON THE SCREEN ===
  return (
    <div className="App">
      {step === "landing" && <LandingPage onBook={() => setStep("details")} />}

      {step === "details" && (
        <PartyDetailsForm onContinue={handleDetailsContinue} />
      )}

      {step === "package" && (
        <PackageSelector onContinue={handlePackageContinue} />
      )}

      {step === "room" && (
        <RoomSelector
          onContinue={handleRoomContinue}
          numberOfChildren={bookingData.numberOfChildren}
          childName={bookingData.childName}
        />
      )}

      {step === "food" && (
        <FoodAndAllergyForm
          onContinue={handleFoodContinue}
          onBack={() => handleBack("room")}
          packageChoice={bookingData.package}
          previousData={{
            food: bookingData.food,
            dessert: bookingData.dessert,
            allergens: bookingData.allergens,
          }}
        />
      )}

      {/* === Step 6: Booking Details (TODO) ===
          Placeholder for now. Final step will collect parent contact
          details, confirm the booking, and show a summary. */}
      {step === "booking" && (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Booking details — coming soon</h2>
          <p>Data collected so far:</p>
          <pre>{JSON.stringify(bookingData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
