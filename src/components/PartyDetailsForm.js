// Import React and the useState hook from the react library.
// We use useState twice — one object for all form fields,
// plus a single object that tracks any validation errors.
import React, { useState } from "react";
import NumberStepper from "./NumberStepper";

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
//   - The typed fields (name, age, date) are validated on blur for
//     inline feedback, and re-checked on submit as a safety net.
//   - The number fields (children, adults) use NumberStepper, which
//     enforces its own min/max — so they need no validation at all.
//
function PartyDetailsForm({ onContinue }) {
  // === STATE: all form fields grouped into one object ===
  // Grouping makes it easy to add a new field — change it in one place.
  // childName, childAge, partyDate and sessionTime are strings.
  // numberOfChildren and additionalAdults are real numbers, because
  // the NumberStepper does +/- maths on them directly.
  const [details, setDetails] = useState({
    childName: "",
    childAge: "",
    partyDate: "",
    sessionTime: "12:00",
    numberOfChildren: 8,
    additionalAdults: 0,
  });

  // === STATE: validation errors keyed by field name ===
  // e.g. { childName: "Please enter a name", childAge: undefined }
  // A field with undefined or no key = no error.
  const [errors, setErrors] = useState({});

  // === Today's date in YYYY-MM-DD format ===
  // Used to set the min date on the date picker and to compare
  // against in validation.
  const today = new Date().toISOString().split("T")[0];

  // === Furthest bookable date: 12 months from today ===
  // We don't take bookings more than a year ahead — too many unknowns
  // (pricing, staffing) that far out.
  const maxDateObj = new Date();
  maxDateObj.setMonth(maxDateObj.getMonth() + 12);
  const maxDate = maxDateObj.toISOString().split("T")[0];

  // === HELPER: update one field and clear its error ===
  // One handler used by the typed inputs. Pulls the field name from the
  // input's name attribute, updates that field in the details object,
  // and clears any existing error on it.
  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  // === HELPER: validate a single field (called on blur) ===
  // Sets an error message for the given field if invalid.
  // Only the typed fields are validated here — the stepper fields
  // can't produce invalid values, so they're not included.
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
        else if (value > maxDate)
          error =
            "We only take bookings up to a year ahead — more dates open soon!";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  }

  // === HELPER: validate everything on submit (safety net) ===
  // Re-checks the typed fields and returns the full errors object.
  // The stepper fields are omitted — they're always valid by design.
  function validateForm() {
    const newErrors = {};
    const { childName, childAge, partyDate } = details;

    if (!childName.trim())
      newErrors.childName = "Please tell us the birthday child's name";

    if (!childAge) newErrors.childAge = "Please enter the birthday child's age";
    else if (Number(childAge) < 4)
      newErrors.childAge = "Sorry, our parties are for children aged 4 and up";

    if (!partyDate) newErrors.partyDate = "Please pick a party date";
    else if (partyDate <= today)
      newErrors.partyDate = "Party date must be in the future";
    else if (partyDate > maxDate)
      newErrors.partyDate =
        "We only take bookings up to a year ahead — more dates open soon!";
    return newErrors;
  }

  // === HANDLE SUBMIT ===
  // Runs the safety-net validator. If anything's invalid, show all
  // errors and bail. Otherwise, send the data up to App.js.
  // numberOfChildren and additionalAdults are already numbers, so
  // they're passed straight through; childAge is converted from its
  // string input here.
  function handleSubmit() {
    const foundErrors = validateForm();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    onContinue({
      childName: details.childName,
      childAge: Number(details.childAge),
      partyDate: details.partyDate,
      sessionTime: details.sessionTime,
      numberOfChildren: details.numberOfChildren,
      additionalAdults: details.additionalAdults || 0,
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
            name="childName"
            value={details.childName}
            onChange={handleChange}
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
            name="childAge"
            value={details.childAge}
            onChange={handleChange}
            onBlur={(e) => validateField("childAge", e.target.value)}
            placeholder="e.g. 8"
          />
          {errors.childAge && (
            <p className="error-message">{errors.childAge}</p>
          )}

          {/* Info message for older children — not an error, just guidance */}
          {Number(details.childAge) >= 14 && (
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
            name="partyDate"
            value={details.partyDate}
            onChange={handleChange}
            onBlur={(e) => validateField("partyDate", e.target.value)}
            min={today}
            max={maxDate}
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
            name="sessionTime"
            value={details.sessionTime}
            onChange={handleChange}
          >
            <option value="12:00">12:00 PM</option>
            <option value="17:00">5:00 PM</option>
          </select>
        </div>

        {/* Number of children — stepper enforces the 8 to 24 range */}
        <div className="form-group">
          <NumberStepper
            label="Number of children"
            value={details.numberOfChildren}
            onChange={(newValue) =>
              setDetails((prev) => ({ ...prev, numberOfChildren: newValue }))
            }
            min={8}
            max={24}
          />
        </div>

        {/* Extra adults — the section separates three distinct ideas:
            the rule (2 included, must be present), the invitation
            (more are welcome), and the recommendation (more for young
            kids). The stepper itself caps the extra adults at 10. */}
        <div className="form-group">
          <label>Extra adults</label>

          {/* The rule — stated plainly first */}
          <p className="helper-text">
            Two adults are included with every booking and must stay with the
            party on the slope at all times — the children are your
            responsibility, not ours!
          </p>

          {/* The invitation */}
          <p className="helper-text">
            You're very welcome to bring more. How many extra would you like to
            add?
          </p>

          {/* The recommendation — softer, separate */}
          <p className="helper-text">
            For younger crews (ages 4–6) we'd recommend roughly 1 adult per 4
            children — small humans move fast! For older groups, the included
            two are usually plenty.
          </p>

          <p className="bjorn-aside">
            <em>
              "I can wrangle them on the slope, but I can't be everywhere —
              extra hands are always welcome!" 🐻
            </em>
          </p>

          <NumberStepper
            label="Extra adults"
            value={details.additionalAdults}
            onChange={(newValue) =>
              setDetails((prev) => ({ ...prev, additionalAdults: newValue }))
            }
            min={0}
            max={10}
          />
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
