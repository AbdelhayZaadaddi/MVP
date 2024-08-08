import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Stack, Alert } from '@mui/material';
import axiosInstance from '../../axios';

const AddEmployees = () => {
    const [formData, setFormData] = useState({
        email: '',
        user_name: '',
        first_name: '',
        password: '',
        password_confirm: '',
        last_name: '',
        address: '',
        phone: '',
        role: 'employee',
    });

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirm) {
            setError('Passwords do not match');
            return;
        }
        setLoading(true);

        axiosInstance
            .post('add-employee/', {
                email: formData.email,
                user_name: formData.user_name,
                first_name: formData.first_name,
                last_name: formData.last_name,
                address: formData.address,
                phone: formData.phone,
                role: formData.role,
                password: formData.password,
                password_confirm: formData.password_confirm,
            })
            .then((res) => {
                setMessage('Employee added successfully');
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 5000);
            })
            .catch((er) => {
                if (er.response) {
                    setError(`Error: ${er.response.data}`);
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box sx={{ p: 2 }}>
            {showMessage && (
                <Stack sx={{ width: '100%', position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', display: 'block' }} spacing={2} className='mt-5'>
                    <Alert severity="success">{message}</Alert>
                </Stack>
            )}

            {error && (
                <Stack sx={{ width: '100%', position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', display: 'block' }} spacing={2} className='mt-5'>
                    <Alert severity="error">{error}</Alert>
                </Stack>
            )}

            <Box component="form" sx={{ maxWidth: 800, ml: 4 }} onSubmit={handleSubmit}>
                <Typography variant="h5" gutterBottom>
                    Add Employee
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            margin="normal"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="user_name"
                            margin="normal"
                            variant="outlined"
                            value={formData.user_name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="first_name"
                            margin="normal"
                            variant="outlined"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="last_name"
                            margin="normal"
                            variant="outlined"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            margin="normal"
                            variant="outlined"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            margin="normal"
                            variant="outlined"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Role"
                            name="role"
                            value="employee"
                            readOnly
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            margin="normal"
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="password_confirm"
                            type="password"
                            margin="normal"
                            variant="outlined"
                            value={formData.password_confirm}
                            onChange={handleChange}
                            required
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
                    {loading ? 'Adding...' : 'Add Employee'}
                </Button>
            </Box>
        </Box>
    );
};

export default AddEmployees;
