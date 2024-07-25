import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import DefImg from '../../assets/def.jpg';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`products/${id}/`)
      .then(response => {
        setProduct(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleExit = () => {
    navigate('/');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-10 py-8">
      {showSuccess && (
        <Stack sx={{ width: '100%', position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'end', alignItems: 'start' }} spacing={2} className='ml-5'>
          <Alert severity="success" style={{ textAlign: 'right' }}>Product added to cart successfully!</Alert>
        </Stack>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <button onClick={handleExit} className="absolute top-0 right-0 mt-1 mr-4">
          <CloseIcon fontSize="small" />
        </button>
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
              <img
                className="w-full h-full object-center object-cover rounded-lg"
                src={product.image || DefImg}
                alt="Product image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button onClick={addToCart} className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">Add to Wishlist</button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product.name}
            </p>
            <br />

            <div>
              <span className="font-bold text-gray-700">Description:</span>
              <p className="text-gray-600 mt-2">
                {product.description}
              </p>
            </div>

            <div className="flex mb-3">
              <div className="mr-3">
                <span className="font-bold text-gray-700">Price:</span>
                <span className="text-gray-600"> {product.price} $</span>
              </div>
            </div>

            <div className="flex mb-3">
              <div className="mr-3">
                <span className="font-bold text-gray-700">City:</span>
                <span className="text-gray-600"> {product.city_name}</span>
              </div>
            </div>

            <div className="flex mb-3">
              <div className="mr-3">
                <span className="font-bold text-gray-700">Company:</span>
                <span className="text-gray-600"> {product.company_name}</span>
              </div>
            </div>

            <div className="flex mb-3">
              <div className="mr-3">
                <span className="font-bold text-gray-700">Date:</span>
                <span className="text-gray-600"> {product.created_at}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
