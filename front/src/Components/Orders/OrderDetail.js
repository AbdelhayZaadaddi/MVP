import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get(`orders/${id}/`)
            .then(response => {
                setOrder(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching order details: ', error);
                setError('Error fetching order details');
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Order Details</h1>
            <Paper className="p-5 mb-5">
                <h2 className="text-xl font-bold">Order ID: {order.id}</h2>
                <p><strong>User:</strong> {order.user}</p>
                <p><strong>City:</strong> {order.city}</p>
                <p><strong>Street:</strong> {order.street}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Total:</strong> ${order.total}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Payment Status:</strong> {order.payment_status}</p>
                <p><strong>Payment Method:</strong> {order.payment_method}</p>
                <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
            </Paper>
            <TableContainer component={Paper} className="shadow-lg">
                <Table sx={{ minWidth: 650 }} aria-label="order items table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.orderitems.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.product}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${item.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default OrderDetail;
