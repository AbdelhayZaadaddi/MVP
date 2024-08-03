import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';

const Statistics = () => {
    const [statistics, setStatistics] = useState({
        this_month: { total_income: null, total_items: null, total_orders: 0 },
        this_week: { total_income: null, total_items: null, total_orders: 0 },
        today: { total_income: null, total_items: null, total_orders: 0 },
        total_income: null,
        total_items: null,
        total_orders: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get('orders/statistics/')
            .then(res => {
                setStatistics(res.data);
                setIsLoading(false);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Statistics</h1>
            <h2>Today</h2>
            <p>Total Income: {statistics.today.total_income}</p>
            <p>Total Items: {statistics.today.total_items}</p>
            <p>Total Orders: {statistics.today.total_orders}</p>

            <h2>This Week</h2>
            <p>Total Income: {statistics.this_week.total_income}</p>
            <p>Total Items: {statistics.this_week.total_items}</p>
            <p>Total Orders: {statistics.this_week.total_orders}</p>

            <h2>This Month</h2>
            <p>Total Income: {statistics.this_month.total_income}</p>
            <p>Total Items: {statistics.this_month.total_items}</p>
            <p>Total Orders: {statistics.this_month.total_orders}</p>

            <h2>Overall</h2>
            <p>Total Income: {statistics.total_income}</p>
            <p>Total Items: {statistics.total_items}</p>
            <p>Total Orders: {statistics.total_orders}</p>
        </div>
    );
};

export default Statistics;
