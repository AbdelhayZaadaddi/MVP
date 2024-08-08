import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const initialFormData = {
    email: '',
    user_name: '',
    first_name: '',
    company_name: '',
    phone: '',
    password: '',
    password_confirm: '',
	role: 'company', // Default role can be 'company'
  };

  const [formData, updateFormData] = useState(initialFormData);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirm) {
      setMessage('Passwords do not match');
      return;
    }
    axiosInstance
      .post('create/', {
        email: formData.email,
        user_name: formData.user_name,
        first_name: formData.first_name,
        company_name: formData.company_name,
        phone: formData.phone,
        password: formData.password,
        password_confirm: formData.password_confirm,
        role: formData.role, // Use the selected role
      })
      .then((res) => {
        setMessage('Registration successful. Redirecting to login page...');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after a short delay
        }, 2000); // 2 seconds delay
      })
      .catch((error) => {
        if (error.response) {
          setMessage(`Error: ${error.response.data}`);
        } else if (error.request) {
          setMessage('Error: No response received from server');
        } else {
          setMessage(`Error: ${error.message}`);
        }
      });
  };

  return (
    <div className="re-container">
      <div className="re-form-container">
        <form onSubmit={handleSubmit}>
          <h1 className="re-text">Create an Account</h1>

          {message && <div>{message}</div>}

          <label className="re-label">Full Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="Enter your full name"
            onChange={handleChange}
          />

          <label className="re-label">Company Name</label>
          <input
            type="text"
            name="company_name"
            placeholder="Enter your company name"
            onChange={handleChange}
          />

          <label className="re-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            onChange={handleChange}
          />

          <label className="re-label">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            onChange={handleChange}
          />

          <label className="re-label">Username</label>
          <input
            type="text"
            name="user_name"
            placeholder="Enter your username"
            onChange={handleChange}
          />

          <label className="re-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />

          <label className="re-label">Confirm Password</label>
          <input
            type="password"
            name="password_confirm"
            placeholder="Confirm your password"
            onChange={handleChange}
          />
		  
		  <label className="re-label">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="company">Company</option>
            <option value="trader">Trader</option>
          </select>

          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              By creating an account, you agree to the{' '}
              <a href="/terms">Terms of Use</a> and{' '}
              <a href="/privacy">Privacy Policy</a>.
            </label>
          </div>

          <div className="error-message">
            <div data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
          </div>

          <div className="register-button">
            <button type="submit">Sign up</button>
          </div>

          <div className="login-link">
            <span>Already have an account? </span>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
      <div className="image-container-re"></div>
    </div>
  );
};

export default Register;
