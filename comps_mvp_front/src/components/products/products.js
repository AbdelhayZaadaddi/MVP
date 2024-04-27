import React from 'react'
import { useState, useEffect } from 'react'

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products: ', error));
    }, []);
  return (
    <div>
        <h1>Product List</h1>
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    <h2>{product.name}</h2>
                    <p>Desciption: {product.description}</p>
                    <p>Price: ${product.price}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Products