import { Box, Button, TextField } from "@mui/material";
import axiosInstance from "../../axios";
import { useState } from "react";

const CreateReview = ({ productId }) => {
    const [formData, setFormData] = useState({
        rating: '',
        review: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = { ...formData, product: productId };
        axiosInstance.post(`products/${productId}/reviews/create/`, dataToSend)
            .then(response => {
                console.log('Review created successfully:', response.data);
                // Handle successful response
            })
            .catch(error => {
                console.error('There was an error creating the review!', error);
                // Handle error response
            });
    };

    return (
        <Box>
            <h1>Create Review</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Review"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default CreateReview;
