import React from "react";
import mainImage from "../images/mainphoto.jpg";

// ===== LandingPage — Step 0 of the booking flow =====
//
// The first screen the user sees. Sells the experience with a
// hero image, headline, and short "what's included" preview,
// then lets them start the booking flow with a single button.
//
// Props:
//   - onBook: called when the user clicks "Book a Party".
//             App.js uses this to advance to the PartyDetailsForm.
//
function LandingPage({ onBook }) {
  return (
    <div className="landing-page">
      {/* === Hero section: image, headline, sub-headline, CTA === */}
      <div className="hero">
        <img
          src={mainImage}
          alt="Children sledging in the snow"
          className="hero-image"
        />
        <h1>The Ultimate Birthday Party Experience!</h1>
        <p>Real snow. Real sledging. Real fun.</p>

        {/* Book button — the main CTA for parents.
            type="button" prevents accidental form submission if this
            component is ever placed inside a <form>. */}
        <button type="button" className="book-button" onClick={onBook}>
          Book a Party
        </button>
      </div>

      {/* === Features section: short "what's included" preview ===
          Deliberately brief — the full package details live in
          PackageSelector. This is just the headline highlights. */}
      <div className="features">
        <h2>What's included?</h2>
        <ul>
          <li>45-minute sledging session</li>
          <li>Decorated party room for 3+ hours</li>
          <li>Hot food and unlimited juice and water</li>
          <li>Unlimited tea and coffee for parents</li>
          <li>Gift for the birthday child</li>
        </ul>
      </div>
    </div>
  );
}

export default LandingPage;
