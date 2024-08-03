import React, { useState } from 'react';
import { Box, TextField, Alert } from '@mui/material';
import Rating from '@mui/material/Rating';
import axiosInstance from '../../axios';

const CreateReview = ({ productId }) => {
    const [formData, setFormData] = useState({ rating: 0, review: '' });
    const [alertVisible, setAlertVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRatingChange = (event, newValue) => {
        setFormData({
            ...formData,
            rating: newValue,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = { ...formData, product: productId };
        axiosInstance.post(`products/${productId}/reviews/create/`, dataToSend)
            .then(response => {
                console.log('Review created successfully:', response.data);
                setAlertVisible(true);
                setTimeout(() => {
                    setAlertVisible(false);
                }, 5000);
            })
            .catch(error => {
                console.error('There was an error creating the review!', error);
                // Handle error response
            });
    };

    return (
        <div className='mt-5'>
            <h4 className='text-center'>Create Review</h4>
            {alertVisible && <Alert severity="success">Review created successfully!.</Alert>}
            <form onSubmit={handleSubmit}>
                <Rating
                    name="rating"
                    value={formData.rating}
                    onChange={handleRatingChange}
                />
                <TextField
                    label="Review"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <button type="submit" className='inline-flex w-full mt-1 items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800'>Submit</button>
            </form>
        </div>
    );
};

export default CreateReview;