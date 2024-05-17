import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


// material ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


import axiosInstance from '../axios';
import defaultImage from '../assets/default.png';
import DefauIm from '../assets/def.jpg';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get('products')
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
    
        // Cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, []); 

    return (
        <div>
            <h1 className='m-5 text-2xl'>Product List</h1>
            {
                isLoading &&  
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            }
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5'>
                {products.map(product => (
                    <Card key={product.id} sx={{ maxWidth: 450,}}>
                        <CardActionArea className='h-[600px] max-h-[500px]'>
                            <CardMedia
                            component="img"
                            height="140"
                            image={DefauIm}
                            alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Description: {product.description.substring(0, 50)}...
                                </Typography>
                            </CardContent>
                            
                        </CardActionArea>
                        <Button variant="contained"  size="small" className='mx-2 my-3 transition duration-700 ease-in-out'>Add to Card</Button>
                        
                    </Card>
                ))}
            </div>
        </div>

        


    );
}

export default Products;
