import Navbar from './Navbar'
import { FiArrowRight } from "react-icons/fi";
import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from 'react';

export const Home = () => {
  useEffect(()=>{
    Aos.init()
  },[])
  return (
    <div className= "home-container">
        <Navbar />
        <div className='home-banner-container'>
          <div data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" className="home-text-section">
            <h1 className="primary-heading">
              Effortlessly provide ...
            </h1>
            <h1 className="primary-heading1">
            Tailored Employee,
            </h1>
            <h1 className="primary-heading2">
            Benefits & exclusive Discounts.
            </h1>
            <p className="primary-text">
            Ensure YOUR EMPLOYEES stay happy with a plethora of individualized, 
            confidential and exclusive corporate discounts -While utilizing your program to entice and retain top talents.
            </p>
            <button className="secondary-button">
            Discover Now <FiArrowRight />{" "}
            </button>
          </div>
          <div data-aos="fade-left" data-aos-duration="1500" className="home-bannerImage-container">
          <img src="./src/assets/img/homei.jpg" alt="" />
          </div>
        </div>
        <div data-aos="fade-up" data-aos-easing="linear" data-aos-duration="1500" className="Companies-Logos">
          <p className='Companies-Logos-text1'> Unlock Countless Discounts and Offers Today! </p>
          <p className='Companies-Logos-text2'> Become part of the companies empowering their employees with substantial savings on essential purchases.</p>

          <div className="logos">
            <div className='logos-slide'>
              <img src="./src/assets/img/adidas.png" alt="" />
              <img src="./src/assets/img/baskin-robins.png" alt="" />
              <img src="./src/assets/img/kappa.png" alt="" />
              <img src="./src/assets/img/samsung.png" alt="" />
              <img src="./src/assets/img/car-toyota.png" alt="" />
              <img src="./src/assets/img/mastercard.png" alt="" />
              <img src="./src/assets/img/qatar-airways.png" alt="" />
            </div>

            <div className='logos-slide'>
              <img src="./src/assets/img/adidas.png" alt="" />
              <img src="./src/assets/img/baskin-robins.png" alt="" />
              <img src="./src/assets/img/kappa.png" alt="" />
              <img src="./src/assets/img/samsung.png" alt="" />
              <img src="./src/assets/img/car-toyota.png" alt="" />
              <img src="./src/assets/img/mastercard.png" alt="" />
              <img src="./src/assets/img/qatar-airways.png" alt="" />
            </div>

          </div>
        </div>
    </div>
  );
};

export default Home;
