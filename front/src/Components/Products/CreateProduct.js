import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import { Alert, Stack, Box, TextField, Button, Typography, MenuItem, Grid, CircularProgress } from '@mui/material';

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
    const [loading, setLoading] = useState(false);

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

        // Simple client-side validation
        if (!formData.name || !formData.price || !formData.category || !formData.city || !formData.company) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('city', formData.city);
        data.append('company', formData.company);
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
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <Box sx={{ p: 2 }}>
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

            <Box component="form" sx={{ maxWidth: 800, ml: 4 }} onSubmit={handleSubmit}>
                <Typography variant="h5" gutterBottom>
                    Create Product
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            aria-required="true"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            aria-required="true"
                        />
                    </Grid>
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            label="Category"
                            name="category"
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            aria-required="true"
                        >
                            <MenuItem value="">
                                <em>Select Category</em>
                            </MenuItem>
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>{category}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            aria-required="true"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Company"
                            name="company"
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                            aria-required="true"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="file"
                            name="image"
                            margin="normal"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Button 
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'gray',
                        },
                        width: '100%',
                        mt: 2,
                    }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Product'}
                </Button>
            </Box>
        </Box>
    );
};

export default CreateProduct;
