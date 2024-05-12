
import { GrMail } from "react-icons/gr";
import { GrPhone } from "react-icons/gr";
import { IoLocation } from "react-icons/io5";


export const Contact = () => {
    return (
        <>
        <div className="contact-page-wrapper">
            <div className="img-cont">
                <h1 data-aos="fade-zoom-in" data-aos-easing="linear" className="primary-heading3">How we could help you ?</h1>
                <h6 data-aos="fade-zoom-in" data-aos-easing="linear" className="primary-text-contact1">To learn more about compass services, Please fill out the contact form and a member of the team will be in touch soon.</h6>
                <div data-aos="fade-zoom-in" data-aos-easing="linear" className="contact-icons">
                    <GrMail />
                    <GrPhone />
                    <IoLocation />
                </div>
            </div>
            <div className="img-cont1">
                <h3 data-aos="fade-zoom-in" data-aos-easing="linear" data-aos-duration="1500" className="primary-text-contact6"> compasshelp@gamil.com </h3>
                <h3 data-aos="fade-zoom-in" data-aos-easing="linear" data-aos-duration="1500" className="primary-text-contact6"> 0000-0000-0000 </h3>
                <h3 data-aos="fade-zoom-in" data-aos-easing="linear" data-aos-duration="1500" className="primary-text-contact6"> Address: 198 West 21th Streat, New York </h3>
            </div>
            
            <div className="contact-form-container-ex">
                <h1 data-aos="fade-zoom-in" data-aos-easing="linear" data-aos-duration="1500" className="primary-text-contact">Contact Us:</h1>
                <input data-aos="fade-zoom-in" data-aos-easing="linear" data-aos-duration="1500" className="contact-form-container" type="text" placeholder="Full Name" />
                <input data-aos="fade-zoom-in" data-aos-easing="linear" data-aos-duration="1500" className="contact-form-container" type="text" placeholder="How Can we Help You?" />
                <input data-aos="fade-zoom-in" data-aos-easing="linear" data-aos-duration="1500" className="contact-form-container"type="text" placeholder="yourmail@gmail.com" />
                <button data-aos="fade-zoom-in" data-aos-easing="linear" data-aos-duration="1500" className="secondary-button">Submit</button>
            </div>
        </div>
        </>
    );
};
export default Contact;