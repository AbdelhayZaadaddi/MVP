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
    <div className="flex h-screen">
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <form onSubmit={handleSubmit} className="w-3/4 p-6 shadow-lg bg-white rounded-md">
          <h1 className="text-center text-2xl mb-4">Create an Account</h1>

          {message && <div className="text-center text-red-500 mb-4">{message}</div>}

          <label className="block text-base mb-2">Full Name</label>
          <input
            type="text"
            name="first_name"
            placeholder="Enter your full name"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          />

          <label className="block text-base mb-2">Company Name</label>
          <input
            type="text"
            name="company_name"
            placeholder="Enter your company name"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          />

          <label className="block text-base mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          />

          <label className="block text-base mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          />

          <label className="block text-base mb-2">Username</label>
          <input
            type="text"
            name="user_name"
            placeholder="Enter your username"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          />

          <label className="block text-base mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          />

          <label className="block text-base mb-2">Confirm Password</label>
          <input
            type="password"
            name="password_confirm"
            placeholder="Confirm your password"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          />

          <label className="block text-base mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          >
            <option value="company">Company</option>
            <option value="trader">Trader</option>
          </select>

          <div className="my-4">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms">
              By creating an account, you agree to the{' '}
              <a href="/terms" className="text-blue-600">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <div className="mb-4">
            <div className="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY"></div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="outline p-1 outline-cyan-600 w-40 rounded hover:bg-cyan-600 duration-100"
            >
              Sign up
            </button>
          </div>

          <div className="m-auto text-center mt-3">
            <span>Already have an account? </span>
            <Link to="/login" className="text-nowrap text-blue-600">
              Log in
            </Link>
          </div>
        </form>
      </div>
      <div className="w-1/2">
        <img src="path_to_your_image.jpg" alt="City view" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Register;
