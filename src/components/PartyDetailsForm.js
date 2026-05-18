import React, { useState } from "react";

function PartyDetailsForm({ onContinue }) {
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [partyDate, setPartyDate] = useState("");
  const [sessionTime, setSessionTime] = useState("10:00");
  const [numberOfChildren, setNumberOfChildren] = useState(8);
  const [additionalAdults, setAdditionalAdults] = useState(0);

  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  // === Clear one field's error (used onChange) ===
  function clearError(field) {
    setErrors({ ...errors, [field]: undefined });
  }

  // === Validate a single field on blur ===
  // Returns nothing — directly sets the error for that field.
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
        else if (value < today) error = "Party date must be in the future";
        break;

      case "numberOfChildren":
        if (Number(value) < 8)
          error = "Sorry, our parties are for groups of 8 or more!";
        else if (Number(value) > 24)
          error =
            "Sorry, our biggest room only fits 24 children — try a smaller group?";
        break;

      case "additionalAdults":
        if (Number(value) < 0) error = "Can't have negative adults!";
        break;

      default:
        break;
    }

    setErrors({ ...errors, [field]: error });
  }

  // === Validate everything on submit (safety net) ===
  function validateForm() {
    const newErrors = {};

    if (!childName.trim())
      newErrors.childName = "Please tell us the birthday child's name";

    if (!childAge) newErrors.childAge = "Please enter the birthday child's age";
    else if (Number(childAge) < 4)
      newErrors.childAge = "Sorry, our parties are for children aged 4 and up";

    if (!partyDate) newErrors.partyDate = "Please pick a party date";
    else if (partyDate < today)
      newErrors.partyDate = "Party date must be in the future";

    if (Number(numberOfChildren) < 8)
      newErrors.numberOfChildren =
        "Sorry, our parties are for groups of 8 or more!";
    else if (Number(numberOfChildren) > 24)
      newErrors.numberOfChildren =
        "Sorry, our biggest room only fits 24 children — try a smaller group?";

    if (Number(additionalAdults) < 0)
      newErrors.additionalAdults = "Can't have negative adults!";

    return newErrors;
  }

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

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Tell us about the party!</h2>
        <p className="form-subtitle">Just a few details to get started</p>

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

          {Number(childAge) >= 14 && (
            <p className="info-message">
              Our parties are designed for ages 4-13, but you're welcome to book
              for older children too!
            </p>
          )}
        </div>

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

        <button className="continue-button" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default PartyDetailsForm;
