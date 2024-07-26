import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { Box, TextField, Button, Typography, MenuItem, Alert, Stack } from '@mui/material';

const RemoveProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('products/')
      .then(response => {
        console.log('Products response:', response); // Log response for debugging
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      });
  }, []);

  const handleRemoveProduct = () => {
    if (!selectedProductId) {
      setError('Please select a product to remove.');
      return;
    }

    axiosInstance.delete(`products/${selectedProductId}/`)
      .then(() => {
        setProducts(products.filter(product => product.id !== selectedProductId));
        setSelectedProductId('');
      })
      .catch(error => {
        console.error('Error removing product:', error);
        setError('Failed to remove product');
      });
  };

  return (
    <Box className='flex flex-col items-center' sx={{ gap: 2, p: 2 }}>
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}

      <Box component="form" sx={{ width: 400, p: 2, boxShadow: 3, backgroundColor: 'white', borderRadius: 1 }}>
        <Typography variant="h5" gutterBottom>
          Remove Product
        </Typography>
        <TextField
          select
          fullWidth
          label="Select Product"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          margin="normal"
          variant="outlined"
        >
          <MenuItem value=''>Select Product</MenuItem>
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" fullWidth onClick={handleRemoveProduct}>
          Remove Product
        </Button>
      </Box>
    </Box>
  );
};

export default RemoveProduct;
