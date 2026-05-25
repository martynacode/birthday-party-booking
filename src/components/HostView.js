// Import React and the hooks we need.
// useState holds the bookings list and the currently selected booking.
// useEffect runs once when the component mounts to load saved bookings.
import React, { useState, useEffect } from "react";
import { loadAllBookings } from "./bookingStorage";

// ===== HostView — staff-facing booking dashboard =====
//
// PURPOSE:
// The host-facing view of the system. While parents use the booking
// flow (LandingPage → ... → BookingConfirmation), hosts at the venue
// need a completely separate screen to see what bookings are coming
// up so they can prep food, set up rooms, and brief the team.
//
// Reads booking data from localStorage via the bookingStorage helper.
// Decoupled from the parent flow — HostView doesn't know about the
// booking forms, only the saved data.
//
function HostView() {
  // State to hold all bookings loaded from localStorage
  const [bookings, setBookings] = useState([]);

  // State to track which booking the user has clicked (for detail view)
  // Null means no booking is currently selected
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Load bookings from localStorage once when this view first mounts
  useEffect(() => {
    const data = loadAllBookings();
    setBookings(data);
  }, []);

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Host Dashboard</h2>
        <p className="form-subtitle">
          All upcoming bookings — click a card to see full details.
        </p>

        {/* Show the list ONLY when no booking is selected */}
        {!selectedBooking && (
          <div>
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="booking-card"
                onClick={() => setSelectedBooking(booking)}
              >
                <h3>Child's name: {booking.formData.childName}</h3>
                <p>Child's age: {booking.formData.childAge}</p>
                <p>Party date: {booking.formData.partyDate}</p>
                <p>Session Time: {booking.formData.sessionTime}</p>
                <p>Package: {booking.formData.package.name}</p>
                <p>Room: {booking.formData.room.name}</p>
              </div>
            ))}
          </div>
        )}

        {/* Show the details ONLY when a booking IS selected */}
        {selectedBooking && (
          <div>
            <button
              type="button"
              className="button-secondary"
              onClick={() => setSelectedBooking(null)}
            >
              ← Back to list
            </button>

            <h3>Booking details for {selectedBooking.formData.childName}</h3>

            <p>
              Child: {selectedBooking.formData.childName}, age{" "}
              {selectedBooking.formData.childAge}
            </p>
            <p>
              Party date: {selectedBooking.formData.partyDate} at{" "}
              {selectedBooking.formData.sessionTime}
            </p>
            <p>
              Group size: {selectedBooking.formData.numberOfChildren} children +{" "}
              {selectedBooking.formData.additionalAdults} adults
            </p>
            <p>Package: {selectedBooking.formData.package.name}</p>
            <p>Room: {selectedBooking.formData.room.name}</p>
            <p>Food: {selectedBooking.formData.food.label}</p>

            <p>
              Allergens:{" "}
              {selectedBooking.formData.allergens.length > 0
                ? selectedBooking.formData.allergens.join(", ")
                : "None specified"}
            </p>

            <h4>Contact details</h4>
            <p>Parent: {selectedBooking.contactDetails.parentName}</p>
            <p>Email: {selectedBooking.contactDetails.email}</p>
            <p>Phone: {selectedBooking.contactDetails.phone}</p>

            <p>
              Special requests:{" "}
              {selectedBooking.contactDetails.specialRequests
                ? selectedBooking.contactDetails.specialRequests
                : "None"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Export so App.js can import this component
export default HostView;
