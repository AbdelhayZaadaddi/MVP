import React, { useState, useEffect } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
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
      <div className='bg-gray-100 p-8 m-2'>
      <h1 className='text-3xl font-bold mb-8 text-center text-gray-500'>Statistics</h1>
    
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='flex justify-between'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-500'>Today</h2>
            <CalendarTodayIcon className='text-gray-500' />
          </div>
          
          <p className='mb-2 text-gray-500'>Total Income: <span className='text-blue-800 text-lg mx-3'>{statistics.today.total_income}</span></p>
          <p className='mb-2 text-gray-500'>Total Income: <span className='text-blue-800 text-lg mx-3'>{statistics.today.total_income}</span></p>
          <p className='mb-2 text-gray-500'>Total Items:  <span className='text-blue-800 text-lg mx-3'> {statistics.today.total_items}</span></p>
          <p className='mb-2 text-gray-500'>Total Orders: <span className='text-blue-800 text-lg mx-3'>{statistics.today.total_orders}</span></p>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex justify-between'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-500'>This Week</h2>
            <CalendarTodayIcon className='text-gray-500' />
          </div>
          <p className='mb- text-gray-500'>Total Income: <span className='text-blue-800 text-lg mx-3'>{statistics.this_week.total_income}</span></p>
          <p className='mb-2 text-gray-500'>Total Items: <span className='text-blue-800 text-lg mx-3'>{statistics.this_week.total_items}</span></p>
          <p className='text-gray-500'>Total Orders: <span className='text-blue-800 text-lg mx-3'>{statistics.this_week.total_orders}</span></p>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex justify-between'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-500'>This Month</h2>
            <CalendarTodayIcon className='text-gray-500' />
          </div>
          <p className='mb-2 text-gray-500'>Total Income: <span className='text-blue-800 text-lg mx-3'>{statistics.this_month.total_income}</span></p>
          <p className='mb-2 text-gray-500'>Total Items: <span className='text-blue-800 text-lg mx-3'>{statistics.this_month.total_items}</span></p>
          <p className='text-gray-500'>Total Orders: <span className='text-blue-800 text-lg mx-3'>{statistics.this_month.total_orders}</span></p>
        </div>
        <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex justify-between'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-500'>Overall</h2>
            <CalendarTodayIcon className='text-gray-500' />
          </div>
          <p className='mb-2 text-gray-500'>Total Income: <span className='text-blue-800 text-lg mx-3'>{statistics.total_income}</span></p>
          <p className='mb-2 text-gray-500'>Total Items: <span className='text-blue-800 text-lg mx-3'>{statistics.total_items}</span></p>
          <p className='text-gray-500'>Total Orders: <span className='text-blue-800 text-lg mx-3'>{statistics.total_orders}</span></p>
        </div>
      </div>
    </div>
    
    );
};

export default Statistics;
