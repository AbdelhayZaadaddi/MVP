import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


import axiosInstance from '../axios'



const Login = () => {

  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    email:'',
    password:'',
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
    console.log(formData);

    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        axiosInstance.defaults.headers['Authorization'] =
          'JWT ' + localStorage.getItem('access_token');
        navigate('/');
        console.log(res);
        console.log(res.data);
      });
  };


  return (
    <div className='flex justify-center items-center h-screen'>
      <form 
      onSubmit={handleSubmit}
      className='w-96 p-6 shadow-lg bg-white rounded-md '
      >

      <h1 className='text-center text-2xl mb-4'>Welcom Back!</h1>

        <label className='block text-base mb-2'>
          Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            required

            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4'
          />
        
        <label>
          Password</label>
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
      </form>
    </div>
  )
}

export default Login