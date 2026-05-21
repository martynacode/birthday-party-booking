// Import React.
// No useState here — this component only displays data, it doesn't collect any.
import React from "react";

// ===== BookingConfirmation — Step 6 of the booking flow (SKELETON) =====
//
// PLACEHOLDER — not yet implemented.
//
// PURPOSE:
// The final screen of the booking journey. Confirms to the parent
// that their booking has been received, shows a full summary of
// everything they've selected, and gives them next steps.
//
// PLANNED DISPLAY:
//   - Big "booking confirmed" hero with mascot (Bjorn celebrating)
//   - Booking reference number (auto-generated)
//   - Full summary of selections:
//       - Birthday child's name and age
//       - Party date and session time
//       - Group size and adults
//       - Package picked (Gold or Platinum) + price breakdown
//       - Room chosen
//       - Food and dessert chosen
//       - Allergens flagged
//   - Total cost (calculated: package.price × numberOfChildren)
//   - Next steps (e.g. "We'll email you within 24 hours with payment details")
//   - Option to save/print confirmation
//
// PLANNED PROPS:
//   - bookingData: the full bookingData object from App.js with everything collected
//   - onStartOver: returns the user to the LandingPage to start fresh
//                  (no Back button here — the booking is "done")
//
// NOTES:
//   - This screen has no Back button by design. Once confirmed, the
//     user shouldn't accidentally undo their booking. The only way out
//     is to start a new booking via onStartOver.
//   - In a real system this would also trigger a backend call to save
//     the booking and send a confirmation email — out of scope for MVP.
//
function BookingConfirmation({ bookingData, onStartOver }) {
  return (
    <div className="form-page">
      <div className="form-container">
        <h2>🎉 Booking Confirmed — coming soon</h2>
        <p className="form-subtitle">
          This is Step 6 of the booking flow. The full screen will show a
          summary of everything selected, a booking reference, and next steps.
        </p>

        <p>
          See the file header comment in <code>BookingConfirmation.js</code> for
          the full planned implementation.
        </p>

        {/* Placeholder data display — shows everything the user has selected.
            Useful for testing the flow end-to-end before the real
            confirmation screen is built. */}
        <div className="food-summary">
          <h3>Data collected so far</h3>
          <pre>{JSON.stringify(bookingData, null, 2)}</pre>
        </div>

        {/* Start over button — only way out of the confirmation screen.
            Resets the flow back to LandingPage. */}
        <div className="form-buttons">
          <button
            type="button"
            className="button-primary"
            onClick={onStartOver}
          >
            Start a new booking
          </button>
        </div>
      </div>
    </div>
  );
}

// Export so App.js can import this component
export default BookingConfirmation;
