import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import DefImg from '../../assets/def.jpg';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Reviews from '../Reviews/Reviews.js';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import CreateReview from '../Reviews/CreateReview.js';
import CloseIcon from '@mui/icons-material/Close'; // Imported CloseIcon

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialized navigate
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [addReviews, setAddReviews] = useState(false);

  useEffect(() => {
    axiosInstance.get(`products/${id}/`)
      .then(response => {
        setProduct(response.data);
        setIsLoading(false);
        console.log(response.data);
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

  const handleNavigateHome = () => {
    navigate('/');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative flex justify-center animate-fadeIn">
      <div className="absolute top-0 right-0 m-5 cursor-pointer" onClick={handleNavigateHome}>
        <CloseIcon style={{ fontSize: '2rem', color: 'black' }} />
      </div>

      <div className="w-4.5/5 mt-10 mb-4 mr-20 ml-5">
        {showSuccess && (
          <Stack className="success-alert">
            <Alert severity="success">Product added to cart successfully!</Alert>
          </Stack>
        )}
        <div className="flex justify-between">
          <div className='mr-14 w-9/12 max-w-xl' style={{ minWidth: '600px' }}>
            <img src={product.image || DefImg} alt={product.name} className="w-full h-full rounded-md" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>
			<h3 className="text-2xl font-semibold mt-1">Description : </h3>
            <p className="">{product.description}</p>
			<h3 className="text-2xl font-semibold mt-1">Price :</h3>
            <p className="text-3xl font-bold">$ {product.price}</p>
            
            <div className="mt-2">
              <Reviews productId={product.id} />
              <button className="inline-flex w-full mt-5 items-center justify-center rounded-md border-2 border-transparent bg-black px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800" onClick={() => setAddReviews(!addReviews)}>
                Add Review
              </button>
              {addReviews && <CreateReview productId={product.id} />}
            </div>
            
            <button className="inline-flex w-full mt-5 items-center justify-center rounded-md border-2 border-transparent bg-black px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
