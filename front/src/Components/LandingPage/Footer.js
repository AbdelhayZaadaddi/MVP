import React from 'react';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo">
          <h5>COMPASS</h5>
          <ul className="social-media">
            <li><a href="#facebook"><Facebook /></a></li>
            <li><a href="#twitter"><Twitter /></a></li>
            <li><a href="#instagram"><Instagram /></a></li>
          </ul>
        </div>
        <div className="footer-section">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about-us">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#why us">Why Us</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <p>Subscribe to our newsletter</p>
          <form>
            <input type="email" placeholder="Enter Your Email address" />
            <button type="submit">→</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy;2024 Compass. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
