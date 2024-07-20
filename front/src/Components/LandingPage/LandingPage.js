import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import WhyUs from './WhyUs';
import Contact from './Contact';
import Footer from './Footer';
import Services from './Services';

import { Link as ScrollLink } from 'react-scroll';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div id="home"><Home /></div>
      <div id="about"><About /></div>
	  <div id="services"><Services /></div>
      <div id="why-us"><WhyUs /></div>
      <div id="contact"><Contact /></div>
	  <div id="footer"><Footer /></div>
    </div>
  );
}

export default LandingPage;