import Navbar from './Navbar'
import { FiArrowRight } from "react-icons/fi";


export const Home = () => {
  return (
    <div className= "home-container">
        <Navbar />
        <div className='home-banner-container'>
          <div className='home-bannerImage-container'>
            <img src={'/home-banner-image'} />
          </div>
          <div className="home-text-section">
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
          <div className="home-bannerImage-container">
          <img src="./src/assets/img/homei.jpg" alt="" />
          </div>
        </div>
    </div>
  );
};

export default Home;
