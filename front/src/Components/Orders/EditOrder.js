import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const EditOrder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        city: '',
        street: '',
        address: '',
        phone: '',
        status: '',
        payment_status: '',
        payment_method: ''
    });

    useEffect(() => {
        axiosInstance.get(`orders/${id}/`)
            .then(response => {
                setOrder(response.data);
                setFormData({
                    city: response.data.city,
                    street: response.data.street,
                    address: response.data.address,
                    phone: response.data.phone,
                    total: response.data.total,
                    status: response.data.status,
                    payment_status: response.data.payment_status,
                    payment_method: response.data.payment_method
                });
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching order details: ', error);
                setError('Error fetching order details');
                setIsLoading(false);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.put(`orders/${id}/update`, formData)
            .then(response => {
                navigate(`/order/${id}`);
            })
            .catch(error => {
                console.error('Error updating order: ', error);
                setError('Error updating order');
            });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Edit Order</h1>
            <Paper className="p-5 mb-5">
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="total"
                        name="total"
                        value={formData.total}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Payment Status"
                        name="payment_status"
                        value={formData.payment_status}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Payment Method"
                        name="payment_method"
                        value={formData.payment_method}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button
					  type="submit"
					  variant="contained"
					  sx={{
					  backgroundColor: 'black', // Set background color to black
					  color: 'white', // Set text color to white
					  '&:hover': {
						backgroundColor: 'black', // Keep background color the same on hover
						color: 'white', // Keep text color the same on hover
						},
					}}
					className="mt-4"
					>
					  Save Changes
					</Button>
					</form>
            </Paper>
        </div>
    );
};

export default EditOrder;
