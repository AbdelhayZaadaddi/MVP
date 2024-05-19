import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const BonusDetailsCart = ({ id }) => {
    const [bonus, setBonus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get(`bonus/${id}/`)
        .then(response => {
            setBonus(response.data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching product: ', error);
            setError(error.toString());
            setIsLoading(false);
        });
    }, [id]);

    if (isLoading) {
        return <Box className='flex justify-center'><CircularProgress /></Box>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!bonus) {
        return <div>No bonus details available.</div>;
    }

    return (
        <div>
            <h1>BonusDetailsCart</h1>
            <div>
                <h2>{bonus.name}</h2>
                <p>{bonus.value}</p>
            </div>
        </div>
    );
}

export default BonusDetailsCart;

