import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';

// material ui
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const CreateProduct = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: null,  // Add image field
    });

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        if (formData.image) {
            data.append('image', formData.image);
        }

        axiosInstance.post('/products/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
          .then((response) => {
            console.log(response.data);
            setShowSuccess(true); // Show the success alert
            setTimeout(() => {
              setShowSuccess(false); // Hide the success alert after 10 seconds
              navigate('/'); // Redirect to the products list page or wherever appropriate
            }, 5000);
          })
          .catch((error) => {
            console.error('There was an error creating the product!', error);
          });
    };

  return (
    <div className='flex justify-center items-center'>
        
        {showSuccess && (
            <Stack sx={{ width: '100%', position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', display:'block'}} spacing={2} className='mt-5'>
                <Alert severity="success">Product created successfully!</Alert>
            </Stack>
        )}

        <form className='w-96 p-6 shadow-lg bg-white rounded-md ' onSubmit={handleSubmit}>
            <h1>Create Product</h1>

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

            <label htmlFor='image' className='block text-base mb-2'>Image:</label>
            <input type='file' name='image' id='image' onChange={handleChange} 
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-500 rounded-md mb-4'
            />

            <button type='submit' className='outline p-1 outline-cyan-600 w-40 rounded hover:bg-cyan-600 duration-100'>Create Product</button>
        </form>
    </div>
  );
};

export default CreateProduct;
