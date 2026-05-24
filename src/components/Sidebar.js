// Import React.
// Sidebar is presentational only — it just renders the navigation
// buttons and tells App.js which view the user wants to see.
import React from "react";

// ===== Sidebar — Top-level navigation =====
//
// Persistent left-hand sidebar visible on every screen. Lets users
// switch between the parent booking flow and the staff host view.
//
// In production, host view would be hidden behind authentication —
// here it's openly accessible for demonstration purposes.
//
// Props:
//   - currentView: which view is active ("booking" or "host")
//   - onViewChange: called with the new view name when a button is clicked
//
function Sidebar({ currentView, onViewChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">🐻</h2>
        <p className="sidebar-brand">Party Booking</p>
      </div>

      <nav className="sidebar-nav">
        <button
          type="button"
          className={`sidebar-button ${currentView === "booking" ? "sidebar-button-active" : ""}`}
          onClick={() => onViewChange("booking")}
        >
          🎉 Book a Party
        </button>

        <button
          type="button"
          className={`sidebar-button ${currentView === "host" ? "sidebar-button-active" : ""}`}
          onClick={() => onViewChange("host")}
        >
          👤 Host View
        </button>
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-note">Staff access</p>
      </div>
    </aside>
  );
}

export default Sidebar;
