import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axios';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchOrders(currentPage);
    }, [currentPage]);

    const fetchOrders = (page) => {
        setIsLoading(true);
        axiosInstance.get(`orders/?page=${page}`)
            .then(response => {
                setOrders(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 10));  // Adjust based on your page size
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching orders: ', error);
                setIsLoading(false);
            });
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <div className="mainContent">
            <div className="header">
                <h1>Orders</h1>
                <Link to="/">
                    <button className="addButton">Add New Orders</button>
                </Link>
            </div>
            {isLoading ? (
                <div className="loadingContainer">
                    <CircularProgress />
                </div>
            ) : (
                <Paper className="tableContainer">
                    <div className="tableHeader">
                        <div>ID</div>
                        <div>User</div>
                        <div>City</div>
                        <div>Street</div>
                        <div>Address</div>
                        <div>Phone</div>
                        <div>Total</div>
                        <div>Status</div>
                        <div>Payment Status</div>
                        <div>Payment Method</div>
                        <div>Created At</div>
                        <div>Details</div>
                    </div>
                    <div className="tableBody">
                        {orders.map((order) => (
                            <div className="tableRow" key={order.id}>
                                <div>{order.id}</div>
                                <div>{order.user}</div>
                                <div>{order.city}</div>
                                <div>{order.street}</div>
                                <div>{order.address}</div>
                                <div>{order.phone}</div>
                                <div>${order.total}</div>
                                <div>{order.status}</div>
                                <div>{order.payment_status}</div>
                                <div>{order.payment_method}</div>
                                <div>{new Date(order.created_at).toLocaleDateString()}</div>
                                <div>
                                    <Link to={`/order/${order.id}`} className="text-inherit no-underline hover:text-blue-500">
                                        ...
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </Paper>
            )}
            <div className="">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
        </div>
    );
};

export default Orders;
