import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import DefImg from '../../assets/def.jpg';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardType, setCardType] = useState('');
  const [formData, setFormData] = useState({
    city: '',
    street: '',
    address: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

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

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      ...formData,
      orderitems: cartItems.map(item => ({
        product: item.id,
        quantity: item.quantity
      })),
      total: calculateSubtotal(),
      paymentMethod,
      cardDetails: paymentMethod === 'creditCard' ? {
        cardType,
        cardNumber: document.querySelector('input[name="cardNumber"]').value,
        expiryDate: document.querySelector('input[name="expiryDate"]').value,
        cvv: document.querySelector('input[name="cvv"]').value,
      } : {}
    };

    try {
      const response = await axiosInstance.post('orders/new/', orderData);
      if (response.status === 201) { // Assuming 201 means successfully created
        setOrderSuccess(true);
        setOrderError(false);
        setCartItems([]);
        localStorage.removeItem('cartItems');
        navigate('/orders'); // Redirect to /orders after successful order placement
      }
    } catch (error) {
      setOrderError(true);
      setOrderSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cart-container animate-fadeIn">
      <div className="cart">
        <h2 className="cart-title">Your Shopping Cart</h2>

        {showSuccess && (
          <Stack sx={{ width: '100%', position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'end', alignItems: 'start' }} spacing={2} className='ml-5'>
            <Alert severity="success" style={{ textAlign: 'right' }}>Product removed successfully!</Alert>
          </Stack>
        )}

        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                  <p className="cart-item-price">Price: {item.price} $</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="cart-item-remove"
                >
                  &times;
                </button>
              </div>
            ))}
            <div className="cart-subtotal">
              <span>Subtotal:</span>
              <span>{calculateSubtotal().toFixed(2)} $</span>
            </div>
            <Link to="/" className="cart-back-to-shop" style={{ display: 'block', textAlign: 'center' }}>Back to Shop</Link>
          </div>
        )}
      </div>
      <div className="payment-info">
        <h2 className="payment-info-title">Payment Info</h2>
        <div className="payment-method" style={{ margin: '10px 0'}}>
          <label style={{ marginRight: '40px' }}>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              onChange={() => setPaymentMethod('creditCard')}
            /> Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="payOnDelivery"
              onChange={() => setPaymentMethod('payOnDelivery')}
            /> Pay on Delivery
          </label>
        </div>
        {paymentMethod === 'creditCard' && (
          <div className="card-details">
            <h2 className="billing-address-title">Credit Card</h2>
            <div className="card-details-select" style={{ textAlign: 'center' }}>
              <label style={{ marginRight: '40px' }}>
                <input
                  type="radio"
                  name="cardType"
                  value="mastercard"
                  onChange={() => setCardType('mastercard')}
                /> Mastercard
              </label>
              <label>
                <input
                  type="radio"
                  name="cardType"
                  value="visa"
                  onChange={() => setCardType('visa')}
                /> Visa
              </label>
            </div>
            <div className="card-details-input">
              <label>Card Number</label>
              <input 
                type="text" 
                name="cardNumber" 
                maxLength="17" 
                pattern="\d{17}" 
                title="Card number must be 17 digits long" 
                className="black-text"
              />
            </div>
            <div className="card-details-input">
              <label>Expiry Date</label>
              <input 
                type="text" 
                name="expiryDate" 
                pattern="\d{2}/\d{2}" 
                title="Expiry date must be in MM/YY format" 
                placeholder="MM/YY" 
                className="black-text"
              />
            </div>
            <div className="card-details-input">
              <label>CVV</label>
              <input 
                type="text" 
                name="cvv" 
                maxLength="3" 
                pattern="\d{3}" 
                title="CVV must be 3 digits long" 
                className="black-text"
              />
            </div>
          </div>
        )}
        <div className="billing-address">
          <h2 className="billing-address-title">Billing Address</h2>
          <div className="billing-address-input">
            <label>City</label>
            <input 
              type="text" 
              name="city" 
              title="City is required" 
              className="black-text"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="billing-address-input">
            <label>Street</label>
            <input 
              type="text" 
              name="street" 
              title="Street is required" 
              className="black-text"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>
          <div className="billing-address-input">
            <label>Address</label>
            <input 
              type="text" 
              name="address" 
              title="Address is required" 
              className="black-text"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="billing-address-input">
            <label>Phone</label>
            <input 
              type="text" 
              name="phone" 
              pattern="\d{10}" 
              title="Phone number must be 10 digits long" 
              className="black-text"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button onClick={handleCheckout} className="card-details-checkout" style={{ display: 'block', margin: '20px auto' }} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Checkout'}
        </button>
        {orderSuccess && <p style={{ color: 'green', textAlign: 'center' }}>Order placed successfully!</p>}
        {orderError && <p style={{ color: 'red', textAlign: 'center' }}>Error placing order. Please try again.</p>}
      </div>
    </div>
  );
};

export default Cart;
