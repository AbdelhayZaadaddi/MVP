import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios'; // Adjust the path as needed
import { Box, Button, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';

const ViewEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('user-employees/'); // Ensure this endpoint is correct
                setEmployees(response.data);
            } catch (err) {
                setError('Failed to load employees');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <Box sx={{ p: 6 }}>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {!loading && !error && (
                <>
                    <Typography variant="h5" gutterBottom>
                        Your Employees
                    </Typography>
                    <List>
                        {employees.map((employee) => (
                            <ListItem key={employee.id}>
                                <ListItemText
                                    primary={`${employee.first_name} ${employee.last_name}`}
                                    secondary={`Email: ${employee.email}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </Box>
    );
};

export default ViewEmployees;