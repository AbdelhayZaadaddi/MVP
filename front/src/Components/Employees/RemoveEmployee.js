import React, { useState } from 'react';
import { TextField, Button, Typography, Stack, Alert, Box } from '@mui/material';
import axiosInstance from '../../axios'; // Assuming you use axiosInstance for API requests

const RemoveEmployee = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axiosInstance.post('/remove-employee/', { email, username })
            .then((response) => {
                console.log('Employee removed:', response.data);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
            })
            .catch((error) => {
                console.error('Error removing employee:', error);
                setError('Failed to remove employee: ' + error.message);
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box sx={{ p: 2 }}>
            {error && (
                <Stack sx={{ width: '100%', position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', display: 'block' }} spacing={2} className='mt-5'>
                    <Alert severity="error">{error}</Alert>
                </Stack>
            )}

            {showSuccess && (
                <Stack sx={{ width: '100%', position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', display: 'block' }} spacing={2} className='mt-5'>
                    <Alert severity="success">Employee removed successfully!</Alert>
                </Stack>
            )}

            <Typography variant="h5" gutterBottom>
                Remove Employee
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-required="true"
                />
                <TextField
                    fullWidth
                    label="User Name"
                    name="username"
                    margin="normal"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-required="true"
                />
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
                    {loading ? 'Removing...' : 'Remove Employee'}
                </Button>
            </form>
        </Box>
    );
};

export default RemoveEmployee;
