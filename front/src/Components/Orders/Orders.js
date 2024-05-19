import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('orders/')
        .then(response => {
            setOrders(response.data);
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching orders: ', error);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 5000); // 5000ms = 5s
    
        return () => clearTimeout(timer);
      }, []);

      return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Orders</h1>
            <TableContainer component={Paper} className="shadow-lg">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Street</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.user}</TableCell>
                                <TableCell>{order.city}</TableCell>
                                <TableCell>{order.street}</TableCell>
                                <TableCell>{order.address}</TableCell>
                                <TableCell>{order.phone}</TableCell>
                                <TableCell>${order.total}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.payment_status}</TableCell>
                                <TableCell>{order.payment_method}</TableCell>
                                <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Link to={`/order/${order.id}`} className="text-inherit no-underline hover:text-blue-500"  >
                                        View Details
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
      );
}

export default Orders;
