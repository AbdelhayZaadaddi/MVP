import React from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import CreateProduct from '../Products/CreateProduct';
import RemoveProduct from '../Products/RemoveProduct';
import AddEmployee from '../Employees/AddEmployee';
import RemoveEmployee from '../Employees/RemoveEmployee';
import { useAuth } from '../../utils/AuthContext';

const Setting = () => {
  const { role } = useAuth();

  const handleShowAllProducts = () => {
    // Logic to show all products based on role
    if (role === 'Trader') {
      // Fetch and display products created by the trader
    } else if (role === 'Company' || role === 'Users') {
      // Fetch and display all products
    }
  };

  const handleShowAllEmployees = () => {
    // Logic to show all employees (only for Company and Users)
  };

  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Grid container spacing={3}>
        {role === 'Trader' && (
          <>
            <Grid item xs={12} sm={6}>
              <CreateProduct />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RemoveProduct />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleShowAllProducts}>
                Show All Products
              </Button>
            </Grid>
          </>
        )}
        {role === 'Company' && (
          <>
            <Grid item xs={12} sm={6}>
              <RemoveProduct />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AddEmployee />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RemoveEmployee />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={handleShowAllProducts}>
                Show All Products
              </Button>
              <Button variant="contained" color="secondary" onClick={handleShowAllEmployees}>
                Show All Employees
              </Button>
            </Grid>
          </>
        )}
        {role === 'Users' && (
          <>
            <Grid item xs={12} sm={4}>
              <CreateProduct />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RemoveProduct />
            </Grid>
            <Grid item xs={12} sm={4}>
              <AddEmployee />
            </Grid>
            <Grid item xs={12} sm={4}>
              <RemoveEmployee />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={handleShowAllProducts}>
                Show All Products
              </Button>
              <Button variant="contained" color="secondary" onClick={handleShowAllEmployees}>
                Show All Employees
              </Button>
            </Grid>
          </>
        )}
        {!role && <Typography>No access rights available.</Typography>}
      </Grid>
    </Box>
  );
};

export default Setting;
