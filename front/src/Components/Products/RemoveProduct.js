import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { Box, TextField, Button, Typography, MenuItem, Alert, Stack, Grid } from '@mui/material';

const RemoveProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('user/products/')
      .then(response => {
        console.log('User products response:', response);
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching user products:', error);
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
    <Box sx={{ p: 2 }}>
      {error && (
        <Stack sx={{ width: '100%', position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', display:'block'}} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}

      <Box component="form" sx={{ maxWidth: 400, ml: 4 }}>
        <Typography variant="h5" gutterBottom>
          Remove Offers
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
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
          </Grid>
        </Grid>

        <Button 
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
          onClick={handleRemoveProduct}
        >
          Remove Product
        </Button>
      </Box>
    </Box>
  );
};

export default RemoveProduct;
