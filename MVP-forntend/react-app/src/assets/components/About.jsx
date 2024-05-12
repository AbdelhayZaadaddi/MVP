import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from 'react';


export const About = () => {

    useEffect(()=>{
        Aos.init()
      },[])
    return (
        <>
        <div className="partner-section-container">
            <h1>^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</h1>
        </div>
        <div data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" className="about-section-container">
            <div className="about-section-image-container">
                <img src="./src/assets/img/abouti.jpg" alt="" />
            </div>
            <div className="about-section-text-container">
                <h1 className="primary-heading-about">About us:</h1>
                <p className="primary-text">
                    Compass is a leading provider of everyday discount and perks tailored to resonate with employees.
                    With a track record of serving numerous global giants and discount corporations ,We are refined our approach to perfiction.
                </p>
            </div>
        </div>
        </>
    );
};

export default About;
