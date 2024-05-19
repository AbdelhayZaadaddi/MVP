import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import BonusDetailsCart from './BonusDetailsCart';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

const Bonus = () => {
    const [bonuss, setBonuss] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedBonusId, setSelectedBonusId] = useState(null);

    useEffect(() => {
        axiosInstance.get('/bonus/')
        .then(response => {
            setBonuss(response.data);
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
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleOpen = (id) => {
        setSelectedBonusId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedBonusId(null);
    };

    return (
        <div>
            <h1 className='m-5 text-2xl'>Bonus</h1>
            {isLoading && <Box className='flex justify-center'><CircularProgress /></Box>}
            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-5'>
                <div className='no-underline hover:bg-slate-300'>
                    {bonuss.map(bonus => (
                        <div key={bonus.id}>
                            <Link to={`bonus/${bonus.id}`}>
                                <h2>{bonus.name}</h2>
                                <p>{bonus.value}</p>
                            </Link>
                            <Button onClick={() => handleOpen(bonus.id)}>Show backdrop</Button>
                        </div>
                    ))}
                </div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                >
                    {selectedBonusId && <BonusDetailsCart id={selectedBonusId} />}
                </Backdrop>
                </div>
        </div>
    );
}

export default Bonus;

