import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const initialFormData = {
    full_name: '',
    company_name: '',
    company_email: '',
    company_phone: '',
    account_type: 'customer',
    company_size: '',
    password: '',
    password_confirm: '',
  };

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirm) {
      alert('Passwords do not match');
      return;
    }
    axiosInstance
      .post('register/', {  // Update to match your backend path if necessary
        full_name: formData.full_name,
        company_name: formData.company_name,
        company_email: formData.company_email,
        company_phone: formData.company_phone,
        account_type: formData.account_type,
        company_size: formData.company_size,
        password: formData.password,
        password_confirm: formData.password_confirm,
      })
      .then((res) => {
        console.log('Registration successful:', res.data);
        // Optionally show a success message or log the user in
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <form onSubmit={handleSubmit} className="w-3/4 p-6 shadow-lg bg-white rounded-md">
          <h1 className="text-center text-2xl mb-4">Create an Account</h1>

          <label className="block text-base mb-2">Full name</label>
          <input
            type="text"
            name="full_name"
            placeholder="Enter your full name"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          />

          <label className="block text-base mb-2">Company name</label>
          <input
            type="text"
            name="company_name"
            placeholder="Enter your company name"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          />

          <label className="block text-base mb-2">Company email</label>
          <input
            type="email"
            name="company_email"
            placeholder="Enter your company email address"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          />

          <label className="block text-base mb-2">Company phone</label>
          <input
            type="tel"
            name="company_phone"
            placeholder="Enter your company phone number"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          />

          <label className="block text-base mb-2">Create Account</label>
          <select
            name="account_type"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          >
            <option value="customer">Customer</option>
            <option value="partner">Partner</option>
          </select>

          <label className="block text-base mb-2">Company size</label>
          <select
            name="company_size"
            onChange={handleChange}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

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
