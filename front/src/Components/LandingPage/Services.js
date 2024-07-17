import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Apartment, Business, People, AttachMoney } from '@mui/icons-material'; // Changed icons

const Services = () => {
  return (
    <Box className="services-container" sx={{ padding: '100px 100px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
      <Box className="services-header" sx={{ marginBottom: '60px' }}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: '20px' }}>
          Empower Your Employees With Compass Benefits.
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: '15px', color: '#555' }}>
          Built on a foundation of trust and dedication, Compass connects you to exclusive offers and discounts for your employees.
        </Typography>
      </Box>

      <Grid container spacing={4} className="services-grid" sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} md={3} className="service-card" sx={{ margin: '12px', width: '150px', height: '300px' }}>
          <Apartment fontSize="large" sx={{ fontSize: '50px' }} />
          <Typography variant="h6" sx={{ fontSize: '15px', marginTop: '10px' }}>
            <p>Companies</p>
            <p>We specialize in securing exclusive offers and discounts for your employees, designed to boost happiness and productivity in the workplace environment.</p>
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} className="service-card" sx={{ margin: '12px', width: '150px', height: '300px' }}>
          <People fontSize="large" sx={{ fontSize: '50px' }} /> {/* Changed icon to People for Employees */}
          <Typography variant="h6" sx={{ fontSize: '15px', marginTop: '10px' }}>
            <p>Employees</p>
            <p>Gain access to exclusive discounts that are not available to the general public, ensuring you save more on your everyday purchases.</p>
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} className="service-card" sx={{ margin: '12px', width: '150px', height: '300px' }}>
          <Business fontSize="large" sx={{ fontSize: '50px' }} /> {/* Changed icon to Business for Traders */}
          <Typography variant="h6" sx={{ fontSize: '15px', marginTop: '10px' }}>
            <p>Traders</p>
            <p>Our platform helps traders convert employees into loyal customers, driving increased sales and enhancing your marketing strategy.</p>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Services;
