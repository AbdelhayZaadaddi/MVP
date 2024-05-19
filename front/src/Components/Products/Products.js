import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DefauIm from '../../assets/def.jpg';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get('products/')
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products: ', error);
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5000ms = 5s

    return () => clearTimeout(timer);
  }, []);


  return (
    <div>
      <h1 className='m-5 text-2xl'>Product List</h1>
      {isLoading && <Box className='flex justify-center'><CircularProgress /></Box>}
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5'>
        {products.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className='no-underline hover:bg-slate-300'>
            <Card sx={{ maxWidth: 450 }}>
              <div className='h-[400px]'>
                  <img
                    className='w-full h-full object-cover object-center'
                    src={product.image || DefauIm}
                    alt="product image"
                  />
                </div>
              <CardActionArea className='h-[600px] max-h-[100px]'>
                  
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name.substring(0, 20)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className='h-[20px]'>
                    Description: {product.description.substring(0, 20)}...
                  </Typography>
                  <Typography variant="h5" color="text.secondary" className='mt-1'>
                    Price: {product.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Button variant="contained" size="small" className='mx-3 my-3 mt-4 transition duration-700 ease-in-out'>Add to Cart</Button>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;


