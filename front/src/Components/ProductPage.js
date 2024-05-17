import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar';


const ProductPage = () => {

    const { id } = useParams();

    const [product, setProduct] = useState({posts: []});

    useEffect(() => {
        axiosInstance.get(`product/1`)
            .then((res) => {
                setProduct(res.data);
                console.log(res.data);
            });
    }, [setProduct]);
  return (
    <div>
        <h1>{product.name}</h1>
        <p>{product.price}</p>
        <p>{product.description}</p>
    </div>
  )
}

export default ProductPage