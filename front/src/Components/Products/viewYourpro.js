import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios'; // Adjust the import path according to your project structure
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';

const ViewYourPro = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('user/products/')  // Adjust the endpoint to match your backend route
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user products:', error);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 6 }}>
      {error && (
        <Alert severity="error">{error}</Alert>
      )}
      <Typography variant="h5" gutterBottom>
        Your Offers
      </Typography>
      <List>
        {products.length > 0 ? (
          products.map(product => (
            <ListItem key={product.id}>
              <ListItemText
                primary={product.name}
                secondary={`Price: $${product.price}`}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">No products found.</Typography>
        )}
      </List>
    </Box>
  );
};

export default ViewYourPro;
