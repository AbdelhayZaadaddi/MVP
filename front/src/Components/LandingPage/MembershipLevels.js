import React from 'react';


const MembershipLevels = () => {
  return (
    <div className="me-container">
      <div className="pricing-table">
        <h1>Membership Levels</h1>
        <p className="subheading">Choose a plan that is right for your company</p>
        <div className="pricing-cards">
          <div className="me-card">
            <h2>BASE</h2>
            <p className="duration">Yearly</p>
            <ul>
              <li>Access to up to 120 offers and discounts per month.</li>
              <li>Up to 50 employees.</li>
              <li>Basic customer support (email only).</li>
              <li>Standard reporting.</li>
            </ul>
            <button>STARTED</button>
          </div>
          <div className="me-card highlighted">
            <h2>PRO</h2>
            <div className="toggle-duration">
              <p className="duration">Yearly</p>
            </div>
            <ul>
              <li>Access to up to 240 offers and discounts per month.</li>
              <li>Up to 120 employees</li>
              <li>Priority customer support (email and phone).</li>
              <li>Detailed reporting</li>
            </ul>
            <button>STARTED</button>
          </div>
          <div className="me-card">
            <h2>ELITE</h2>
            <p className="duration">Yearly</p>
            <ul>
              <li>Access to all offers and discounts.</li>
              <li>Unlimited employees.</li>
              <li>Premium support (email, phone, video call).</li>
              <li>Advanced reporting</li>
            </ul>
            <button>STARTED</button>
          </div>
        </div>
      </div>
      {/*<div className="project-section">
        <h2>Have any project on mind?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua nostrud.</p>
        <div className="project-buttons">
          <button className="download-btn">Download CV</button>
          <button className="hire-btn">Hire Me</button>
        </div>
      </div>*/}
    </div>
  );
};

export default MembershipLevels;
