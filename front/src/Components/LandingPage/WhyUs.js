import React from 'react';
import Bk3 from '../../assets/Bk3.jpg';

const WhyUs = () => {
    return (
        <div className="why-us">
            <h2>Why Us</h2>
            <div className="content">
                <div className="image">
                    <img src={Bk3} alt="Why Us" />
                </div>
                <div className="text">
                    <h3>Compass: Enhancing Workplace Joy</h3>
                    <p>we specialize in securing exclusive offers and discounts for your employees, designed to boost happiness in the workplace environment. We consistently deliver solutions that work best for your team and are always available to assist with any questions or concerns. </p>
                    <button>Learn More</button>
                </div>
            </div>
        </div>
    );
}

export default WhyUs;
