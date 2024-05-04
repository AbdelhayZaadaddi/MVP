import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [product, setProduct] = useState({});
    const {product_slug, product_id } = useParams();

    useEffect(() => {
        fetchData(product_id);
    },[product_id]);

    function fetchData(productId){
        fetch(`${baseUrl}/product/${productId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setProduct(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }
    console.log(product)

    return (
        <div>
            <h1>name:{product.name}</h1>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
}

export default ProductPage;
