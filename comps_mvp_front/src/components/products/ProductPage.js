// ProductPage.js
import React, { useState, useEffect } from 'react';

const ProductPage = ({ match }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (match && match.params && match.params.id) { // Check if match and params exist before accessing id
            const productId = match.params.id;
            fetch(`http://127.0.0.1:8000/api/products/${productId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => setProduct(data))
                .catch(error => console.error('Error fetching product: ', error));
        }
    }, [match]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
}

export default ProductPage;

