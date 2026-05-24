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

  const [contactDetails, setContactDetails] = useState(null);

  // Which top-level view is active: "booking" (parent flow) or "host view" (staff dashboard)
  const [view, setView] = useState("booking");

  // Scroll to top whenever the step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

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

        {view === "host" && (
          <div className="form-page">
            <div className="form-container">
              <h2>👤 Host View</h2>
              <p>Coming soon — this is where staff will see all bookings.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
