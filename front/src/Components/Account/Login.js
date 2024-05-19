import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../axios';


const Login = () => {
  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axiosInstance
      .post('token/', {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log('Login response:', res.data);
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.data.access; // Update default headers
        navigate('/');
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <form onSubmit={handleSubmit} className='w-96 p-6 shadow-lg bg-white rounded-md '>
        <h1 className='text-center text-2xl mb-4'>Welcome Back!</h1>
        <label className='block text-base mb-2'>Email</label>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
          required
          className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4'
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
          required
          className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4'
        />
        <div className="flex justify-center"> 
          <button type="submit" className='btn btn-outline-primary w-40'>Submit</button>
        </div>
        <div className='m-auto text-center mt-2'>
          <span>You don't Have an account ?</span>
          <Link to={'/register'} className='text-nowrap'>Create One</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
