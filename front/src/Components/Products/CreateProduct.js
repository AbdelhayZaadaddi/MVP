import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import { Alert, Stack, Box, TextField, Button, Typography, MenuItem } from '@mui/material';

const CreateProduct = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        city: '',
        company: '',
        image: null,
    });

    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, citiesResponse, companiesResponse] = await Promise.all([
                    axiosInstance.get('/available_categories/'),
                    axiosInstance.get('/available_cities/'),
                    axiosInstance.get('/available_companies/')
                ]);
                setCategories(categoriesResponse.data);
                setCities(citiesResponse.data);
                setCompanies(companiesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load categories, cities, or companies');
            }
        };

        fetchData();
    }, []);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('city', formData.city);  // Use city_name
        data.append('company', formData.company);  // Use company_name
        if (formData.image) {
            data.append('image', formData.image);
        }

        axiosInstance.post('/products/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log('Product created:', response.data);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/');
            }, 5000);
        })
        .catch((error) => {
            console.error('Error creating the product:', error);
            setError('Failed to create product: ' + error.message);
            console.log('Error response data:', error.response.data);
        });
    };

    return (
        <Box className='flex flex-col items-center' sx={{ gap: 2, p: 2 }}>
            {error && (
                <Stack sx={{ width: '100%', position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', display:'block'}} spacing={2} className='mt-5'>
                    <Alert severity="error">{error}</Alert>
                </Stack>
            )}

            {showSuccess && (
                <Stack sx={{ width: '100%', position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', display:'block'}} spacing={2} className='mt-5'>
                    <Alert severity="success">Product created successfully!</Alert>
                </Stack>
            )}

            <Box component="form" sx={{ width: 400, p: 2, boxShadow: 3, backgroundColor: 'white', borderRadius: 1 }} onSubmit={handleSubmit}>
                <Typography variant="h5" gutterBottom>
                    Create Product
                </Typography>

                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                    multiline
                    rows={4}
                />

                <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    select
                    label="Category"
                    name="category"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>Select Category</em>
                    </MenuItem>
                    {categories.map((category, index) => (
                        <MenuItem key={index} value={category}>{category}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    fullWidth
                    label="City"
                    name="city"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    type="file"
                    name="image"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                />

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Create Product
                </Button>
            </Box>
        </Box>
    );
};

export default CreateProduct;
