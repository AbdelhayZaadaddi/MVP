import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
    };

  return (
    <div>
        <h1>CreateProduct</h1>

        <form>
            <div className='m-5'>
                <label htmlFor='name'>Name:</label>
                <input type='text' name='name' id='name' onChange={handleChange} />
            </div>
            <div className='m-5'>
                <label htmlFor='description'>Description:</label>
                <input type='text' name='description' id='description' onChange={handleChange} />
            </div>
            <div className='m-5'>
                <label htmlFor='price'>Price:</label>
                <input type='text' name='price' id='price' onChange={handleChange} />
            </div>
            <button onClick={handleSubmit} className='m-5'>Create Product</button>
        </form>

    </div>
  )
}

export default CreateProduct