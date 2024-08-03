import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import DefImg from '../../assets/def.jpg';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Reviews from '../Reviews/Reviews.js';
import { useParams } from 'react-router-dom';
import CreateReview from '../Reviews/CreateReview.js';

const ProductDetail = () => {

  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [addReviews, setAddReviews] = useState(false)

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex ">
      {showSuccess && (
        <Stack className="success-alert">
          <Alert severity="success">Product added to cart successfully!</Alert>
        </Stack>
      )}

      <div className="flex justify-between m-5">
        <div className='mr-10 w-9/12 max-w-xl' style={{ minWidth: '600px' }}>
          <img src={product.image || DefImg} alt={product.name} className="w-full h-full rounded-md " />
        </div>
        <div className="">
          <h2 className="text-4xl font-bold text-gray-900">{product.name}</h2>
          <p className="">{product.description}</p>
          <p className="text-3xl font-bold">$ {product.price}</p>
          <button className="inline-flex w-full mt-1 items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800" onClick={addToCart}>Add to Cart</button>

          <div className='flex-col justify-center'>
            <button className="inline-flex w-1 mt-1 items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800" onClick={() => setAddReviews(!addReviews)}>Add Reviews</button>
            {addReviews && <CreateReview productId={product.id} />}
            <Reviews productId={product.id} />

          </div>

        </div>
        </div>
    </div>
  );
};

export default ProductDetail;
