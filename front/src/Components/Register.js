import React from 'react'
import { useState } from 'react'
import axiosInstance from '../axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const navigate = useNavigate();

    const initialFormData = Object.freeze({
        email: '',
        username: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance
            .post(`create/`, {
                email: formData.email,
                user_name: formData.username,
                password: formData.password,
            })
            .then((res) => {
                navigate('/login');
                console.log(res);
                console.log(res.data);
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    };


return (
    <div className='flex justify-center items-center h-screen'>

            <form 
            onSubmit={handleSubmit} 
            className='w-96 p-6 shadow-lg bg-white rounded-md '
            >
                    <h1 className='text-center text-2xl mb-4'>Register</h1>


                    <label className='block text-base mb-2'>Email</label>
                    <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4'
                    />

                    <label className='block text-base mb-2'>Username</label>
                    <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4'
                    />

                    <label className='block text-base mb-2'>Password</label>
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4'
                    />


                    <div className="flex justify-center"> 
                        <button type="submit" className='outline p-1 outline-cyan-600 w-40 rounded hover:bg-cyan-600 duration-100'>Submit</button>
                    </div>
                    
            </form>
            
    </div>
)
}

export default Register