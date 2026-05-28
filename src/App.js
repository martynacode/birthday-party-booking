// Import React and the useState hook
import React, { useState, useEffect } from "react";

// Import our components
import LandingPage from "./components/LandingPage";
import PartyDetailsForm from "./components/PartyDetailsForm";
import PackageSelector from "./components/PackageSelector";
import RoomSelector from "./components/RoomSelector";
import FoodAndAllergyForm from "./components/FoodAndAllergyForm";
import BookingDetails from "./components/BookingDetails";
import BookingConfirmation from "./components/BookingConfirmation";
import Sidebar from "./components/Sidebar";
import HostView from "./components/HostView";

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
//   landing → details → package → room → food → booking → confirmation
//
function App() {
  // === STATE ===
  // Which step are we currently showing
  const [step, setStep] = useState("landing");

  // The booking data we collect as the user fills in forms
  const [bookingData, setBookingData] = useState({});

  const [contactDetails, setContactDetails] = useState(null);

  // Which top-level view is active: "booking" (parent flow) or "host view" (staff dashboard)
  const [view, setView] = useState("booking");

  // Scroll to top whenever the step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // === HELPER: merge new fields into bookingData ===
  // Uses the functional form of setBookingData so we always merge into
  // the *latest* state, not a stale snapshot from when the handler was
  // created. This is the safe pattern any time new state depends on old.
  function mergeBookingData(newFields) {
    setBookingData((prev) => ({ ...prev, ...newFields }));
  }

  // === HANDLERS ===
  // Each form has its own continue handler that merges new data into
  // bookingData and advances to the next step. handleBack is shared —
  // any form can request a return to a specific earlier step.

  // Called when PartyDetailsForm finishes
  function handleDetailsContinue(partyDetails) {
    mergeBookingData(partyDetails);
    setStep("package");
  }

  // Called when PackageSelector finishes
  function handlePackageContinue(packageChoice) {
    mergeBookingData(packageChoice);
    setStep("room");
  }

  // Called when RoomSelector finishes
  function handleRoomContinue(roomChoice) {
    mergeBookingData(roomChoice);
    setStep("food");
  }

  // Called when FoodAndAllergyForm finishes
  function handleFoodContinue(foodData) {
    mergeBookingData(foodData);
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
      <Sidebar currentView={view} onViewChange={setView} />

      <main className="App-main">
        {view === "booking" && (
          <>
            {step === "landing" && (
              <LandingPage onBook={() => setStep("details")} />
            )}

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

            {step === "booking" && (
              <BookingDetails
                formData={bookingData}
                onBack={() => handleBack("food")}
                onSubmit={(details) => {
                  setContactDetails(details);
                  setStep("confirmation");
                }}
              />
            )}

            {step === "confirmation" && (
              <BookingConfirmation
                formData={bookingData}
                contactDetails={contactDetails}
                onNewBooking={() => {
                  setBookingData({});
                  setContactDetails(null);
                  setStep("landing");
                }}
              />
            )}
          </>
        )}

        {view === "host" && <HostView />}
      </main>
    </div>
  );
}

export default App;
