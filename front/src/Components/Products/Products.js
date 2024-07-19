import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CircularProgress,
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Modal,
  Fade,
  Backdrop,
  IconButton,
  Snackbar,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import DefauIm from '../../assets/def.jpg';
import ProductModal from './ProductModal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [category, city, company, date, sortBy]);

  const fetchProducts = () => {
    setIsLoading(true);
    const params = {};
    if (category) params.category = category;
    if (city) params.city_name = city;
    if (company) params.company_name = company;
    if (date) params.date = date;
    params.sort_by = sortBy;

    axiosInstance.get('products/', { params })
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products: ', error);
        setError(error.toString());
        setIsLoading(false);
      });
  };

  const handleOpenModal = (productId) => {
    setSelectedProductId(productId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProductId(null);
  };

  const handleOpenFilterModal = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalOpen(false);
  };

  const resetFilters = () => {
    setCategory('');
    setCity('');
    setCompany('');
    setDate('');
    setSortBy('created_at');
  };

  const getCities = () => {
    const cities = new Set(products.map(product => product.city_name));
    return Array.from(cities);
  };

  const getCompanies = () => {
    const companies = new Set(products.map(product => product.company_name));
    return Array.from(companies);
  };
  
  const addToCart = (productId) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const productToAdd = products.find(product => product.id === productId);
      cartItems.push({ ...productToAdd, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
    }, 4000); // Snackbar will be hidden after 4 seconds
  };

  return (
    <div className='MA'>
      
      <div className='filter-bar'>
        <Button
          startIcon={<FilterListIcon />}
          onClick={handleOpenFilterModal}
          sx={{
            marginLeft: '16px',
            fontSize: '1rem',
            height: '40px',
            width: '100px',
            backgroundColor: 'white',
            color: 'black'
          }}
        >
          Filter
        </Button>
      </div>

      <Modal
        aria-labelledby="filter-modal-title"
        aria-describedby="filter-modal-description"
        open={filterModalOpen}
        onClose={handleCloseFilterModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={filterModalOpen}>
          <Box className='filter-modal-box' sx={{ border: 'none' }}>
            <div className='filter-modal-header'>
              <Typography variant="h6">Filter by profile type</Typography>
              <IconButton onClick={handleCloseFilterModal}>
                <CloseIcon />
              </IconButton>
            </div>
            <div className='filter-modal-body'>
              <FormControl variant="outlined" fullWidth style={{ marginBottom: 8 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="">All</MenuItem>
                  {['Education', 'Medical', 'Restaurants & Cafes', 'Health & Fitness', 'Home Services', 'Financial Services', 'Pet Services', 'Automotive', 'Travel & Hospitality', 'Entertainment', 'Technology', 'Fashion', 'Other'].map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" fullWidth style={{ marginBottom: 8 }}>
                <InputLabel id="city-label">City</InputLabel>
                <Select
                  labelId="city-label"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  label="City"
                >
                  <MenuItem value="">All</MenuItem>
                  {getCities().map((cityItem, index) => (
                    <MenuItem key={index} value={cityItem}>{cityItem}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="outlined" fullWidth style={{ marginBottom: 8 }}>
                <InputLabel id="company-label">Company</InputLabel>
                <Select
                  labelId="company-label"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  label="Company"
                >
                  <MenuItem value="">All</MenuItem>
                  {getCompanies().map((companyItem, index) => (
                    <MenuItem key={index} value={companyItem}>{companyItem}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className='filter-modal-footer'>
              <Button onClick={resetFilters} sx={{ backgroundColor: '#154c79', color: 'white' }}>
                Reset all filters
              </Button>
              <Button onClick={handleCloseFilterModal} sx={{ backgroundColor: '#154c79', color: 'white' }}>
                Apply Filters
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>

      {isLoading && <Box className='flex justify-center'><CircularProgress /></Box>}
      <div className='grid grid-cols-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-3'>
        {products.map(product => (
          <div key={product.id} onClick={() => handleOpenModal(product.id)} className='cursor-pointer'>
            <Card sx={{ maxWidth: 450 }}>
              <div className='h-[180px]'>
                <img
                  className='w-full h-full object-cover object-center'
                  src={product.image || DefauIm}
                  alt="product image"
                />
              </div>
              <CardActionArea className='h-[600px] max-h-[100px] bg-[#d6d1ca]'>
                <CardContent className='h-[100px]'>
                  <Typography gutterBottom component="div" style={{ fontSize: '15px' }}>
                    {product.name.substring(0, 45)}
                  </Typography>

                  <Typography style={{ fontSize: '14px' }} color="text.secondary">
                    Company: {product.company_name}
                  </Typography>

                  <Typography style={{ fontSize: '14px' }} color="text.secondary">
                    City: {product.city_name}
                  </Typography>

                  <Typography style={{ fontSize: '14px' }} color="text.secondary">
                    Price: {product.price} $
                  </Typography>
                </CardContent>
              </CardActionArea>

              <Button onClick={() => addToCart(product.id)} variant="contained" size="small" className='mx-3 my-3 mt-5' sx={{
                backgroundColor: '#154c79',
                color: 'white'
              }}>Add to Cart</Button>
            </Card>
          </div>
        ))}
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={
          <Typography variant="body2" sx={{ color: 'white' }}>
            Product added to cart
          </Typography>
        }
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          backgroundColor: '#154c79',
        }}
      />

      <ProductModal open={modalOpen} handleClose={handleCloseModal} productId={selectedProductId} />
    </div>
  );
}

export default Products;
