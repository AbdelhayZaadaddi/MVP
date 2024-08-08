import React from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import AddEmployee from "../../Employees/AddEmployee";
import RemoveEmployee from '../../Employees/RemoveEmployee';



const CompanySettings = () => {
    return (
        <>
            <Grid item xs={12}>
              <RemoveEmployee />
            </Grid>
        </>
    );
}

export default CompanySettings;

