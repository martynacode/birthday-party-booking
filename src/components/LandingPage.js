// Need to import React
import React from 'react';
import mainImage from '../images/mainphoto.jpg';

//LandingPage content
function LandingPage({ onBook }) {
    return (
        <div className="landing-page">

            <div className="hero">
                <img src={mainImage} alt="Children sledging in the snow" className="hero-image" />
                <h1>The Ultimate Birthday Party Experience!</h1>
                <p>Real snow. Real sledging. Real fun.</p>
                <button className="book-button" onClick={onBook}>Book a Party</button>
            </div>

            
            <div className="features">
                <h2>What is included?</h2>
                <ul>
                    <li>30 minute sledging session</li>
                    <li>Decorated party room for 3 hours</li>
                    <li>Hot food and unlimited squash</li>
                    <li>Unlimited tea and coffee for parents</li>
                    <li>Gift for the birthday child</li>
                </ul>
            </div>
            
        </div>
    );
}

export default LandingPage;