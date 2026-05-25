// ===== BookingStorage.js — Booking persistence helpers =====
//
// Manages saving and loading bookings from browser localStorage.
// In a real production system, this would be replaced with API
// calls to a backend database.
//
// All bookings are stored as a single JSON array under the key
// "partyBookings". Each booking gets a unique ID generated at save time.
//

const STORAGE_KEY = "partyBookings";

// === Generate a unique booking ID ===
// Format: SNW-YYYYMMDD-XXXX
function generateBookingId() {
  const date = new Date();
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.floor(1000 + Math.random() * 9000);
  return `SNW-${dateStr}-${random}`;
}

// === Save a new booking ===
// Prevents duplicate saves in development (React Strict Mode runs
// effects twice in dev mode, which would otherwise save twice).
export function saveBooking(formData, contactDetails) {
  const existing = loadAllBookings();

  // Check the most recent booking — if it's from the same parent
  // and was saved within the last 5 seconds, treat this as a duplicate
  if (existing.length > 0) {
    const lastBooking = existing[existing.length - 1];
    const lastSavedTime = new Date(lastBooking.createdAt).getTime();
    const now = Date.now();
    const isSameParent =
      lastBooking.contactDetails.email === contactDetails.email;
    const isRecent = now - lastSavedTime < 5000; // within 5 seconds

    if (isSameParent && isRecent) {
      console.log("Duplicate save prevented");
      return lastBooking;
    }
  }

  const newBooking = {
    id: generateBookingId(),
    createdAt: new Date().toISOString(),
    formData: formData,
    contactDetails: contactDetails,
    status: "confirmed",
  };

  const updated = [...existing, newBooking];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return newBooking;
}

// === Load all bookings ===
export function loadAllBookings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading bookings:", error);
    return [];
  }
}
