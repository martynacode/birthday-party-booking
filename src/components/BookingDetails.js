// Import React and the useState hook.
// useState will track contact-detail inputs once this form is built out.
import React, { useState } from "react";

// ===== BookingDetails — Step 5 of the booking flow (SKELETON) =====
//
// PLACEHOLDER — not yet implemented.
//
// PURPOSE:
// Collects the parent/guardian contact details needed to confirm
// the booking. Sits between FoodAndAllergyForm (Step 4) and
// BookingConfirmation (Step 6).
//
// PLANNED FIELDS:
//   - Parent/guardian full name
//   - Email address (for confirmation + reminders)
//   - Phone number (for day-of contact)
//   - Optional notes / accessibility requests
//   - Marketing consent checkbox (opt-in)
//
// PLANNED VALIDATION:
//   - Name required, no validation on format
//   - Email required + must match email pattern
//   - Phone required + UK-format validation (07... or +44)
//   - Notes optional, max 500 characters
//
// PLANNED PROPS:
//   - onContinue: called with the contact data when confirmed
//   - onBack: returns to FoodAndAllergyForm
//   - previousData: any contact data already entered (for back-navigation)
//
// Sends an object up to App.js:
//   { parentName, parentEmail, parentPhone, notes, marketingOptIn }
//
function BookingDetails({ onContinue, onBack, previousData }) {
  // State will live here once the form is built.
  // For now this is a placeholder render so the routing works

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Booking Details — coming soon!</h2>
        <p className="form-subtitle">
          This is Step 5 of the booking flow. The full form will collect parent
          contact details before the booking is confirmed.
        </p>

        <p>
          See the file header comment in <code>BookingDetails.js</code> for the
          full planned implementation.
        </p>

        {/* Navigation buttons — wired up so the flow can be tested
            end-to-end even before this step is built. */}
        <div className="form-buttons">
          <button type="button" className="button-secondary" onClick={onBack}>
            ← Back
          </button>

          <button
            type="button"
            className="button-primary"
            onClick={() => onContinue({})}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

// Export so App.js can import this component
export default BookingDetails;
