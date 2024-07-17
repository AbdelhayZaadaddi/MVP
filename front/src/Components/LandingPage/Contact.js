import React from 'react';

const Contact = () => {
    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea className="form-control" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ border: '1px solid #fff', backgroundColor: '#000', color: '#fff' }}>Submit</button>
            </form>
        </div>
    );
}

export default Contact;
