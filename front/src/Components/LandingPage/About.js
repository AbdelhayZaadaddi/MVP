import React from 'react';
import B from '../../assets/B.png';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="ab-text-container">
        <h1>About Us</h1>
        <p>At Compass, our mission is to enhance employee satisfaction by connecting companies with exclusive offers and discounts tailored to their workforce. Built on a foundation of trust and dedication, we understand the unique needs of both large corporations and small businesses.</p>
        <p>We provide personalized and consistent benefit solutions designed specifically for your employees. Our team of professionals is committed to securing the best deals and offers, ensuring a positive impact on your workplace environment. With Compass, you can trust that your employees are receiving optimal benefits through a seamless and efficient process.</p>
        <button className="ab-learn-more-button">Learn More</button>
      </div>
      <div className="ab-image-container">
		<img src={B} />
      </div>
    </div>
  );
};

export default AboutUs;
