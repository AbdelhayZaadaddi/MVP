import React from 'react'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../../../axios'


const Ahome = () => {

  const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get('products')
            .then(response => {
              console.log('Status:', response.status);
                setProducts(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products: ', error);
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);

    console.log("Woorrk or")

  
  return (
    <div>
            <h1 className='m-5 text-2xl'>Product List</h1>
            <div className='grid grid-cols-4 gap-4 m-5'>
                {products.map(product => (
                    <div key={product.id}  className=''>
                        <div className='rounded-md shadow-md text-center p-5 bg-slate-50 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-white duration-300 '>
                            
                            <h2 className='text-left'>{product.name}</h2>
                            <p className='text-left italic '>Description: {product.description.substring(0, 100)}...</p>
                            <p className='text-left mt-2'>Price: ${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}
}

export default Ahome;