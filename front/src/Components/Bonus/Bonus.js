import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import BonusDetailsCart from './BonusDetailsCart';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import '../../App.css';


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
            <h1 className='m-5-text-2xl'>Bonus</h1>
            {isLoading && <Box className='flex-center'><CircularProgress /></Box>}
            <div className='div'>
                <div className='card-container'>
                    {bonuss.map(bonus => (
                        <div key={bonus.id} className='card'>
                            <Link className='div2' to={`bonus/${bonus.id}`}>
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
                    <div className='backdrop-content'>
                        {selectedBonusId && <BonusDetailsCart id={selectedBonusId} />}
                    </div>
                </Backdrop>
                </div>
        </div>
    );
}

export default Bonus;

