// Import React. NumberStepper has no state of its own —
// the parent owns the value and passes it in. This component
// just displays it and reports button clicks back up.
import React from "react";

// ===== NumberStepper — reusable +/− number control =====
//
// A small, presentational control: a − button, the current value,
// and a + button. Used for "number of children" and "extra adults".
//
// It does NOT hold its own state. The parent (PartyDetailsForm)
// owns the value and decides what to do when it changes — this is
// the "props down, events up" pattern.
//
// Props:
//   - label: text shown above the control (e.g. "Extra adults")
//   - value: the current number to display (a real number)
//   - onChange: called with the NEW number when + or − is clicked
//   - min: smallest allowed value (button disables at this point)
//   - max: largest allowed value (button disables at this point)
//
function NumberStepper({ label, value, onChange, min, max }) {
  // Clicking − asks the parent to go one lower,
  // but never below min.
  function decrease() {
    if (value > min) {
      onChange(value - 1);
    }
  }

  // Clicking + asks the parent to go one higher,
  // but never above max.
  function increase() {
    if (value < max) {
      onChange(value + 1);
    }
  }

  return (
    <div className="stepper">
      <label className="stepper-label">{label}</label>

      <div className="stepper-controls">
        {/* − button: disabled when we're already at the minimum */}
        <button
          type="button"
          className="stepper-button"
          onClick={decrease}
          disabled={value <= min}
        >
          −
        </button>

        {/* The current value, shown between the buttons */}
        <span className="stepper-value">{value}</span>

        {/* + button: disabled when we're already at the maximum */}
        <button
          type="button"
          className="stepper-button"
          onClick={increase}
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default NumberStepper;
