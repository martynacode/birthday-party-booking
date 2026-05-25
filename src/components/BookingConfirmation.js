// Import React and the useEffect hook.
// useEffect lets us trigger the confetti when the page loads.
import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { saveBooking } from "./bookingStorage";

// ===== BookingConfirmation — Step 6 of the booking flow =====
//
// The final screen after a successful booking. Shows a celebratory
// confirmation message with confetti, a booking reference, a summary
// of everything booked, contact details, and a gloves warning.
//
// Sections shown:
//   - Hero confirmation message with booking reference
//   - What you've booked summary
//   - Contact details for follow-up
//   - Bjorn's gloves warning (no exceptions!)
//   - What happens next (preparation info)
//   - Option to make another booking
//
// Props:
//   - formData: object containing all booking selections
//   - contactDetails: object with parent contact info
//   - onNewBooking: returns to landing page to start fresh
//
// Notes:
//   - Confetti fires from both sides when page loads
//   - Booking reference uses date + random number
//   - Gloves warning includes a Bjorn quip about only having paws
//
function BookingConfirmation({ formData, contactDetails, onNewBooking }) {
  // State to hold the saved booking (so we can show its ID)
  const [savedBooking, setSavedBooking] = useState(null);

  // Save the booking to localStorage when confirmation page loads
  useEffect(() => {
    const saved = saveBooking(formData, contactDetails);
    setSavedBooking(saved);
  }, []);

  // Trigger falling snow when the confirmation page loads ❄️
  useEffect(() => {
    // Snow effect - heavier continuous snowfall for 8 seconds
    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;

    const snowInterval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(snowInterval);
        return;
      }

      // Multiple snow particles per interval for heavier snowfall
      confetti({
        particleCount: 8,
        startVelocity: 0,
        ticks: 400,
        origin: {
          x: Math.random(),
          y: 0,
        },
        colors: ["#b8d4f0", "#d4e5f7", "#e8f0ff", "#ffffff"],
        shapes: ["circle"],
        gravity: 0.4,
        scalar: 1.2,
        drift: (Math.random() - 0.5) * 2,
      });
    }, 80);

    return () => clearInterval(snowInterval);
  }, []);

  const bookingRef = savedBooking?.id || "Generating...";

  return (
    <div className="form-page">
      <div className="form-container">
        {/* Hero confirmation message */}
        <div className="confirmation-hero">
          <h2>🎉 Booking Confirmed!</h2>
          <p className="confirmation-message">
            Thank you, {contactDetails.parentName}! Your party is all set.
          </p>
          <div className="booking-ref">
            <span className="booking-ref-label">Booking Reference:</span>
            <span className="booking-ref-number">{bookingRef}</span>
          </div>
        </div>

        {/* What you've booked */}
        <section className="summary-section">
          <h3>What you've booked</h3>
          <div className="summary-card">
            <div className="summary-row">
              <span className="summary-label">For:</span>
              <span className="summary-value">
                {formData.childName} (age {formData.childAge})
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">When:</span>
              <span className="summary-value">
                {formData.partyDate} at {formData.sessionTime}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Children:</span>
              <span className="summary-value">{formData.numberOfChildren}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Package:</span>
              <span className="summary-value">
                {formData.package?.name || formData.package}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Room:</span>
              <span className="summary-value">
                {formData.room?.name || formData.room}
              </span>
            </div>
          </div>
        </section>

        {/* Contact details */}
        <section className="summary-section">
          <h3>We'll be in touch</h3>
          <div className="summary-card">
            <div className="summary-row">
              <span className="summary-label">Name:</span>
              <span className="summary-value">{contactDetails.parentName}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Email:</span>
              <span className="summary-value">{contactDetails.email}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Phone:</span>
              <span className="summary-value">{contactDetails.phone}</span>
            </div>
          </div>
        </section>

        {/* Bjorn's gloves warning */}
        <section className="gloves-warning">
          <div className="gloves-warning-icon">🐻</div>
          <div className="gloves-warning-content">
            <h3>🧤 Bjorn says: don't forget your gloves!</h3>
            <p>
              <strong>Gloves are required</strong> for everyone sledging — no
              exceptions! Please make sure each child (and adult!) brings a pair
              on the day.
            </p>
            <p className="bjorn-aside">
              <em>
                "I'd lend you mine, but I only have one size... and they're
                paws!" 🐾
              </em>
            </p>
            <p>
              We have a few spare pairs available to borrow, but bringing your
              own is best.
            </p>
          </div>
        </section>

        {/* What happens next */}
        <section className="next-steps">
          <h3>What happens next?</h3>
          <ol>
            <li>
              You'll receive a confirmation email at{" "}
              <strong>{contactDetails.email}</strong> within the next few
              minutes.
            </li>
            <li>
              Our team will call you on <strong>{contactDetails.phone}</strong>{" "}
              within 24 hours to confirm any final details.
            </li>
            <li>
              On the day, arrive 15 minutes early so we can get the crew kitted
              up and ready to sledge!
            </li>
          </ol>
        </section>

        {/* New booking button */}
        <div className="form-buttons" style={{ justifyContent: "center" }}>
          <button
            type="button"
            className="button-primary"
            onClick={onNewBooking}
          >
            Make Another Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmation;
