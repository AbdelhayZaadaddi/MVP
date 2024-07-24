import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import DefImg from '../../assets/def.jpg';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';

const ProductDetail = ({ id, onClose }) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-detail-container">
      {showSuccess && (
        <Stack className="success-alert">
          <Alert severity="success">Product added to cart successfully!</Alert>
        </Stack>
      )}

      <div className="product-detail-content">
        
        <div className="product-detail-flex">
          <div className="product-image-container">
            <img
              className="product-image"
              src={product.image || DefImg}
              alt="Product"
            />
            <div className="button-group">
              <button onClick={addToCart} className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
          <div className="product-detail-info">
            <p className="product-name">{product.name}</p>
            <div>
              <span className="label">Description:</span>
              <p className="description">
                {product.description.length > 900 ? product.description.substring(0, 900) + '...' : product.description}
              </p>
            </div>
            <div className="info-item">
              <span className="label">Price:</span>
              <span className="value">{product.price} $</span>
            </div>
            <div className="info-item">
              <span className="label">City:</span>
              <span className="value">{product.city_name}</span>
            </div>
            <div className="info-item">
              <span className="label">Company:</span>
              <span className="value">{product.company_name}</span>
            </div>
            <div className="info-item">
              <span className="label">Date:</span>
              <span className="value">{product.created_at}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
