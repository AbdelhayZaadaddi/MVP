
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

export const Footer = () => {
	return (
        <div className="footer-wrapper">
            <div className="footer-section-one">
                <div className="footer-logo-container">
                    <p> © COMPASS </p>
                </div>
                <div className="footer-icons">
                    <BsTwitter />
                    <SiLinkedin />
                    <BsYoutube />
                    <FaFacebookF />
                </div>
            </div>
            
            <div className="footer-section-two">
                <div className="footer-section-columns">
                    <span>Home</span>
                    <span>About us</span>
                    <span>Partner with us </span>
                    <span>Contact</span>
                    <span>Help</span>
                </div>
                <div className="footer-section-columns">
                    <span>000-0000-0000</span>
                    <span>hello@gmail.com</span>
                </div>
                <div className="footer-section-columns">
                    <span>Terms & Conditions</span>
                    <span>Privacy Policy</span>
                </div>
            </div>
        </div>
    );
};

export default Footer;