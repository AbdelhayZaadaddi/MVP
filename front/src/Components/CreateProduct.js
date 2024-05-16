import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axiosInstance from '../axios';

const CreateProduct = () => {


    const navigate = useNavigate();

    const initialFormData = Object.freeze({
        name: '',
        description: '',
        price: '',
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
            .post(`product/create`, {
                name: formData.name,
                description: formData.description,
                price: formData.price,
            })
            .then((res) => {
                console.log('product created');
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
    <div className='flex justify-center items-center'>

        <form className='w-96 p-6 shadow-lg bg-white rounded-md '>
            <h1>CreateProduct</h1>

                <label htmlFor='name' className='block text-base mb-2'>Name:</label>
                <input type='text' name='name' id='name' onChange={handleChange} 
                className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4'
                />

                <label htmlFor='description' className='block text-base mb-2'>Description:</label>
            
                <textarea name='description' id='description' onChange={handleChange} 
                className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4'/>


                <label htmlFor='price' className='block text-base mb-2'>Price:</label>
                <input type='text' name='price' id='price' onChange={handleChange} 
                className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4'
                />

                
            <button onClick={handleSubmit} className='outline p-1 outline-cyan-600 w-40 rounded hover:bg-cyan-600 duration-100'>Create Product</button>
        </form>

    </div>
  )
}

export default CreateProduct