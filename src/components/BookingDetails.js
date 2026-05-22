// Import React and the useState hook.
// We need useState to track contact details (name, email, phone, special requests)
// and any validation errors.
import React, { useState } from "react";

// ===== BookingDetails — Step 5 of the booking flow =====
//
// The final step before confirmation. Collects parent/guardian contact
// information and displays a complete summary of everything selected
// throughout the booking flow.
//
// Contact fields collected:
//   - Parent/guardian name (required)
//   - Email address (required, validated)
//   - Phone number (required)
//   - Special requests (optional text area)
//
// Summary shown:
//   - Party details (child's name, age, date, time, guest count)
//   - Package choice (Gold or Platinum)
//   - Room selection
//   - Food choices
//   - Allergen information
//
// Sends contact details object up to App.js:
//   { parentName, email, phone, specialRequests }
//
// Props:
//   - formData: object containing all previous selections from earlier steps
//   - onBack: returns the user to the previous step (Food & Allergens)
//   - onSubmit: called with contact details when user clicks Confirm Booking
//
// Notes:
//   - Email validation checks for basic format (contains @ and .)
//   - Phone validation ensures UK format or international format accepted
//   - Summary is read-only; users must go back to change selections
//
function BookingDetails({ formData, onBack, onSubmit }) {
  const [contactDetails, setContactDetails] = useState({
    parentName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};

    // Name validation
    if (!contactDetails.parentName.trim()) {
      newErrors.parentName = "Please enter your name";
    }

    // Email validation
    if (!contactDetails.email.trim()) {
      newErrors.email = "Please enter your email address";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactDetails.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!contactDetails.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    } else if (!/^[\d\s+()-]{10,}$/.test(contactDetails.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // If there are errors, show them and don't submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(contactDetails);
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Booking Details</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Contact Information Section */}
          <section className="contact-section">
            <h3>Contact Information</h3>
            <p className="section-description">
              We'll use these details to confirm your booking and send you all
              the party information.
            </p>

            <div className="form-group">
              <label htmlFor="parentName">Parent/Guardian Name *</label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={contactDetails.parentName}
                onChange={handleChange}
                className={errors.parentName ? "error" : ""}
                placeholder="Your full name"
                required
              />
              {errors.parentName && (
                <span className="error-message">{errors.parentName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactDetails.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="your.email@example.com"
                required
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contactDetails.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
                placeholder="07XXX XXXXXX"
                required
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={contactDetails.specialRequests}
                onChange={handleChange}
                placeholder="Any special requirements or requests for the party?"
                rows="4"
              />
              <span className="helper-text">
                Let us know about any special arrangements, accessibility needs,
                or anything else we should know.
              </span>
            </div>
          </section>

          {/* Booking Summary Section */}
          <section className="summary-section">
            <h3>Booking Summary</h3>
            <p className="section-description">
              Please review your party details below before confirming.
            </p>

            <div className="summary-grid">
              {/* Party Details */}
              <div className="summary-card">
                <h4>Party Details</h4>
                <div className="summary-row">
                  <span className="summary-label">Child's Name:</span>
                  <span className="summary-value">{formData.childName}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Age:</span>
                  <span className="summary-value">{formData.childAge}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Date:</span>
                  <span className="summary-value">{formData.partyDate}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Time:</span>
                  <span className="summary-value">{formData.sessionTime}</span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Number of Children:</span>
                  <span className="summary-value">
                    {formData.numberOfChildren}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-label">Additional Adults:</span>
                  <span className="summary-value">
                    {formData.additionalAdults}
                  </span>
                </div>
              </div>

              {/* Package & Room */}
              <div className="summary-card">
                <h4>Package & Room</h4>
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

              {/* Food & Allergens */}
              <div className="summary-card">
                <h4>Food & Allergens</h4>
                <div className="summary-row">
                  <span className="summary-label">Main Food:</span>
                  <span className="summary-value">
                    {formData.food?.label || formData.food}
                  </span>
                </div>
                {formData.allergens && formData.allergens.length > 0 && (
                  <div className="summary-row">
                    <span className="summary-label">
                      Allergens/Dietary Needs:
                    </span>
                    <span className="summary-value">
                      {formData.allergens.join(", ")}
                    </span>
                  </div>
                )}
                {(!formData.allergens || formData.allergens.length === 0) && (
                  <div className="summary-row">
                    <span className="summary-label">
                      Allergens/Dietary Needs:
                    </span>
                    <span className="summary-value">None specified</span>
                  </div>
                )}
              </div>
            </div>

            <p className="summary-note">
              Need to change something? Use the back button to return to
              previous steps.
            </p>
          </section>

          {/* Buttons - reusing existing button styles */}
          <div className="form-buttons">
            <button type="button" onClick={onBack} className="button-secondary">
              ← Back
            </button>
            <button type="submit" className="button-primary">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingDetails;
