import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {showSuccess && (
        <Stack sx={{ width: '100%', position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'end', alignItems: 'start' }} spacing={2} className='ml-5'>
          <Alert severity="success" style={{ textAlign: 'right' }}>Product Remove successfully!</Alert>
        </Stack>
      )}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <Link to="/checkout">
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
