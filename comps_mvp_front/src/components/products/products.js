import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setProducts(data);
            console.log("working!")
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching products: ', error);
            setError(error.toString());
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div>
            <h1 className='m-5 text-2xl'>Product List</h1>
            <div className='grid grid-cols-4 gap-4 m-5'>
                {products.map(product => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                        <div className='rounded-md shadow-md text-center p-5 bg-slate-50 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-white duration-300'>
                            <h2 className='text-left'>{product.name}</h2>
                            <p className='text-left italic '>Description: {product.description.substring(0, 100)}...</p>
                            <p className='text-left mt-2'>Price: ${product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Products;