// Import React and the useState hook from the react library.
// We use useState several times — one piece of state per form field,
// plus a single object that tracks any validation errors.
import React, { useState } from "react";

// ===== PartyDetailsForm — Step 1 of the booking flow =====
//
// The first form the user fills in. Collects everything we need
// to filter rooms and packages downstream.
//
// Sends an object up to App.js with:
//   { childName, childAge, partyDate, sessionTime,
//     numberOfChildren, additionalAdults }
//
// Props:
//   - onContinue: called with the form data when Continue is clicked
//
// Validation strategy:
//   - clearError: wipes a single field's error on change
//   - validateField: runs on blur for inline feedback
//   - validateForm: safety net that re-checks everything on submit
//
function PartyDetailsForm({ onContinue }) {
  // === STATE: one piece per field ===
  // Empty strings/zero defaults so inputs start clean.
  // numberOfChildren defaults to 8 (our minimum group size).
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [partyDate, setPartyDate] = useState("");
  const [sessionTime, setSessionTime] = useState("10:00");
  const [numberOfChildren, setNumberOfChildren] = useState(8);
  const [additionalAdults, setAdditionalAdults] = useState(0);

  // === STATE: validation errors keyed by field name ===
  // e.g. { childName: "Please enter a name", childAge: undefined }
  // A field with undefined or no key = no error.
  const [errors, setErrors] = useState({});

  // === Today's date in YYYY-MM-DD format ===
  // Used to set the min date on the date picker and to compare
  // against in validation.
  const today = new Date().toISOString().split("T")[0];

  // === HELPER: clear one field's error on change ===
  // Called when the user starts typing again — wipes the error
  // for that field so they're not nagged while still editing.
  function clearError(field) {
    setErrors({ ...errors, [field]: undefined });
  }

  // === HELPER: validate a single field (called on blur) ===
  // Sets an error message for the given field if invalid.
  // Returns nothing — directly updates the errors state.
  function validateField(field, value) {
    let error;

    switch (field) {
      case "childName":
        if (!value.trim()) error = "Please tell us the birthday child's name";
        break;

      case "childAge":
        if (!value) error = "Please enter the birthday child's age";
        else if (Number(value) < 4)
          error = "Sorry, our parties are for children aged 4 and up";
        break;

      case "partyDate":
        if (!value) error = "Please pick a party date";
        // Same-day bookings are not allowed — date must be strictly in the future.
        else if (value <= today) error = "Party date must be in the future";
        break;

      case "numberOfChildren":
        if (Number(value) < 8)
          error = "Sorry, our parties are for groups of 8 or more!";
        else if (Number(value) > 24)
          error =
            "Sorry, our biggest room only fits 24 children — try a smaller group?";
        break;

      case "additionalAdults":
        if (Number(value) < 0) error = "Please use a positive number";
        break;

      default:
        break;
    }

    setErrors({ ...errors, [field]: error });
  }

  // === HELPER: validate everything on submit (safety net) ===
  // Runs all field validations and returns the full errors object.
  // Used by handleSubmit to block submission if anything is invalid.
  function validateForm() {
    const newErrors = {};

    if (!childName.trim())
      newErrors.childName = "Please tell us the birthday child's name";

    if (!childAge) newErrors.childAge = "Please enter the birthday child's age";
    else if (Number(childAge) < 4)
      newErrors.childAge = "Sorry, our parties are for children aged 4 and up";

    if (!partyDate) newErrors.partyDate = "Please pick a party date";
    else if (partyDate <= today)
      newErrors.partyDate = "Party date must be in the future";

    if (Number(numberOfChildren) < 8)
      newErrors.numberOfChildren =
        "Sorry, our parties are for groups of 8 or more!";
    else if (Number(numberOfChildren) > 24)
      newErrors.numberOfChildren =
        "Sorry, our biggest room only fits 24 children — try a smaller group?";

    if (Number(additionalAdults) < 0)
      newErrors.additionalAdults = "Please use a positive number";

    return newErrors;
  }

  // === HANDLE SUBMIT ===
  // Runs the safety-net validator. If anything's invalid, show all
  // errors and bail. Otherwise, send the data up to App.js.
  function handleSubmit() {
    const foundErrors = validateForm();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    onContinue({
      childName,
      childAge,
      partyDate,
      sessionTime,
      numberOfChildren,
      additionalAdults,
    });
  }

  // === WHAT TO DISPLAY ON THE SCREEN ===
  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Tell us about the party!</h2>
        <p className="form-subtitle">Just a few details to get started</p>

        {/* Birthday child's name */}
        <div className="form-group">
          <label htmlFor="childName">Birthday child's name</label>
          <input
            type="text"
            id="childName"
            value={childName}
            onChange={(e) => {
              setChildName(e.target.value);
              clearError("childName");
            }}
            onBlur={(e) => validateField("childName", e.target.value)}
            placeholder="e.g. Emily"
          />
          {errors.childName && (
            <p className="error-message">{errors.childName}</p>
          )}
        </div>

        {/* Birthday child's age */}
        <div className="form-group">
          <label htmlFor="childAge">Birthday child's age</label>
          <input
            type="number"
            id="childAge"
            value={childAge}
            onChange={(e) => {
              setChildAge(e.target.value);
              clearError("childAge");
            }}
            onBlur={(e) => validateField("childAge", e.target.value)}
            placeholder="e.g. 8"
          />
          {errors.childAge && (
            <p className="error-message">{errors.childAge}</p>
          )}

          {/* Info message for older children — not an error, just guidance */}
          {Number(childAge) >= 14 && (
            <p className="info-message">
              Our parties are designed for ages 4-13, but you're welcome to book
              for older children too!
            </p>
          )}
        </div>

        {/* Party date — uses native date picker, restricted to today onwards */}
        <div className="form-group">
          <label htmlFor="partyDate">Party date</label>
          <input
            type="date"
            id="partyDate"
            value={partyDate}
            onChange={(e) => {
              setPartyDate(e.target.value);
              clearError("partyDate");
            }}
            onBlur={(e) => validateField("partyDate", e.target.value)}
            min={today}
          />
          {errors.partyDate && (
            <p className="error-message">{errors.partyDate}</p>
          )}
        </div>

        {/* Session time — fixed slots only */}
        <div className="form-group">
          <label htmlFor="sessionTime">Session time</label>
          <select
            id="sessionTime"
            value={sessionTime}
            onChange={(e) => setSessionTime(e.target.value)}
          >
            <option value="10:00">10:00 AM</option>
            <option value="16:00">4:00 PM</option>
          </select>
        </div>

        {/* Number of children — 8 to 24 range enforced in validation */}
        <div className="form-group">
          <label htmlFor="numberOfChildren">Number of children</label>
          <input
            type="number"
            id="numberOfChildren"
            value={numberOfChildren}
            onChange={(e) => {
              setNumberOfChildren(parseInt(e.target.value));
              clearError("numberOfChildren");
            }}
            onBlur={(e) => validateField("numberOfChildren", e.target.value)}
          />
          {errors.numberOfChildren && (
            <p className="error-message">{errors.numberOfChildren}</p>
          )}
        </div>

        {/* Additional adults — 2 included by default, extras are optional */}
        <div className="form-group">
          <label htmlFor="additionalAdults">
            Additional adults (2 included in package)
          </label>
          <input
            type="number"
            id="additionalAdults"
            value={additionalAdults}
            onChange={(e) => {
              setAdditionalAdults(parseInt(e.target.value));
              clearError("additionalAdults");
            }}
            onBlur={(e) => validateField("additionalAdults", e.target.value)}
            placeholder="0"
          />
          {errors.additionalAdults && (
            <p className="error-message">{errors.additionalAdults}</p>
          )}
        </div>

        {/* Continue button — runs the safety-net validator on click.
            type="button" prevents accidental form submission if this
            component is ever placed inside a <form>. */}
        <button
          type="button"
          className="continue-button"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// Export so App.js can import this component
export default PartyDetailsForm;
