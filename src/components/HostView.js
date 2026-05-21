// Import React and the useState hook.
// useState will track the selected date and filter state once this view is built.
import React, { useState } from "react";

// ===== HostView — staff-facing booking dashboard (SKELETON) =====
//
// PLACEHOLDER — not yet implemented.
//
// PURPOSE:
// The host-facing view of the system. While parents use the booking
// flow (LandingPage → ... → BookingConfirmation), hosts at the venue
// need a completely separate screen to see what bookings are coming
// up so they can prep food, set up rooms, and brief the team.
//
// This is the start of a host portal — for the MVP it shows today's
// bookings as a simple list, but the longer-term plan supports more.
//
// PLANNED DISPLAY (MVP):
//   - Heading: "Today's parties" (or date picker for other days)
//   - A card per booking, sorted by session time, each showing:
//       - Birthday child's name and age
//       - Session time (10:00 AM or 4:00 PM)
//       - Group size
//       - Package (Gold or Platinum) — colour-coded
//       - Room name (Frost / Glacier / Blizzard)
//       - Food choice (with emoji for quick visual scan)
//       - Dessert choice (Platinum only)
//       - Allergens — highlighted in red if any are present
//       - Parent contact info (for day-of contact)
//   - Visual quick-glance: cards stay simple, scannable at a distance
//
// PLANNED FEATURES (post-MVP):
//   - Date filter to view past or future bookings
//   - Search by child's name or parent's name
//   - "Mark as completed" toggle for done parties
//   - Export today's list as PDF for printing
//   - Allergen alerts at the top of the page
//
// PLANNED PROPS:
//   - bookings: array of all confirmed bookings
//                (in a real system this would come from a backend;
//                for MVP this could be hardcoded sample data)
//   - onExit: returns to wherever the host came from (likely a
//             separate /host route or hidden navigation)
//
// NOTES:
//   - This view is NOT part of the parent's booking flow. It's
//     accessed separately (e.g. by adding ?host=true to the URL
//     in the MVP, or via proper auth in a real system).
//   - For the MVP demo, sample bookings can be hardcoded to show
//     what a populated dashboard would look like.
//
function HostView({ bookings, onExit }) {
  // State will live here once the view is built.
  // Likely state to add:
  //   - selectedDate: which day's bookings to show
  //   - filter: by package, by allergens flagged, etc.
  //   - completedBookings: which ones the host has marked done
  //
  // For now this is a placeholder render.
  const [selectedDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Host Dashboard — coming soon</h2>
        <p className="form-subtitle">
          This is the host-facing view of the system. The full dashboard will
          show today's bookings as scannable cards so staff can prep food,
          rooms, and equipment in advance.
        </p>

        <p>
          See the file header comment in <code>HostView.js</code> for the full
          planned implementation.
        </p>

        {/* Placeholder showing today's date — proves the component
            mounts and useState works. Real version will use this
            to filter the bookings array. */}
        <p>
          <strong>Today's date:</strong> {selectedDate}
        </p>

        {/* Exit button — host returns to wherever they came from.
            In the MVP, this might just go back to the LandingPage. */}
        <div className="form-buttons">
          <button type="button" className="button-primary" onClick={onExit}>
            Back to main site
          </button>
        </div>
      </div>
    </div>
  );
}

// Export so App.js can import this component
export default HostView;
