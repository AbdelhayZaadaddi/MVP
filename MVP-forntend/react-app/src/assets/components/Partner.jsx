import { BiSolidDiscount } from "react-icons/bi";
import { TfiMoney } from "react-icons/tfi";
import { BsBuildingFillGear } from "react-icons/bs";


import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from 'react';

export const Partner = () => {

    useEffect(()=>{
        Aos.init()
    },
    [])
    return (
        <>
        <div className="partner-section-container">
            <h1>^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</h1>
        </div>
        <div data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" className="partner-text">
            <h1> Why Partner wih us? </h1>
        </div>

        <div className="partner-text1">
            <div data-aos="zoom-in-up" data-aos-easing="linear" data-aos-duration="1500" className="partner-s"> <BiSolidDiscount /> </div>
            <h2 data-aos="zoom-in-up" data-aos-easing="linear" data-aos-duration="1500" className="partner-text-1-2" > Access personalized discounts for travel, electronics, home essentials, and more. Save big on every aspect of lifes comforts</h2>
        </div>

        <div className="partner-text3">
            <div data-aos="zoom-in-up" data-aos-easing="linear" data-aos-duration="1500" className="partner-s"> <TfiMoney /> </div>
            <h2  data-aos="zoom-in-up" data-aos-easing="linear" data-aos-duration="1500" className="partner-text-1-2">Empower your employees to save up to $5000 annually with impactful discounts.</h2>
        </div>

        <div className="partner-text4">
            <div data-aos="zoom-in-up" data-aos-easing="linear" data-aos-duration="1500" className="partner-s"> <BsBuildingFillGear /> </div>
            <h2 data-aos="zoom-in-up" data-aos-easing="linear" data-aos-duration="1500" className="partner-text-1-2">At Compass, we are committed to fostering an exceptional workplace environment</h2>
        </div>
        <div className="partner-imag">
            <h1 data-aos="fade-right" data-aos-easing="linear" data-aos-duration="2000" className="n"> Experience Genuine Benefits,</h1> 
            <h1 data-aos="fade-right" data-aos-easing="linear" data-aos-duration="2000" className="n"> Make a Real Difference for your Employees. </h1>
            <h1 data-aos="fade-right" data-aos-easing="linear" data-aos-duration="2000" className="n">Join Today!</h1>
        </div>
        </>
    );
};

export default Partner;
