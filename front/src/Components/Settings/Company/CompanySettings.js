import React from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import AddEmployee from "../../Employees/AddEmployee";
import RemoveEmployee from '../../Employees/RemoveEmployee';



const CompanySettings = () => {
    return (
        <>
            <Grid item xs={12} sm={6}>
              <AddEmployee />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RemoveEmployee />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
                Show All Products
              </Button>
              <Button variant="contained" color="secondary">
                Show All Employees
              </Button>
            </Grid>
        </>
    );
}

export default CompanySettings;

