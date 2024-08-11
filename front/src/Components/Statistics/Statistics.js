import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
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
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const data = [
        { name: 'Mon', income: 2000 },
        { name: 'Tue', income: 4000 },
        { name: 'Wed', income: 3000 },
        { name: 'Thu', income: 5000 },
        { name: 'Fri', income: 7000 },
        { name: 'Sat', income: 2000 },
        { name: 'Sun', income: 1000 },
    ];

    const COLORS = ['#000000', '#8B0000', '#00008B'];

    return (
        <div className='bg-black-100 p-9 ml-9'>
            <h1 className='text-3xl font-bold mb-8 text-center text-black-500'>Statistics</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
                <div className='rounded-lg shadow-lg p-6'>
                    <div className='flex justify-between'>
                        <h2 className='text-2xl font-semibold mb-4 text-black-500'>Today</h2>
                        <CalendarTodayIcon className='text-black-500' />
                    </div>

                    <PieChart width={150} height={150}>
                        <Pie
                            dataKey="value"
                            data={[
                                { name: 'Income', value: statistics.today.total_income },
                                { name: 'Expenses', value: 1000 },
                                { name: 'Bonus', value: 1500 }
                            ]}
                            outerRadius={50}
                            fill="#8884d8"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>

                    <p className='mb-2 text-black-500'>Total Income: <span className='text-blue-800 text-lg mx-3'>{statistics.today.total_income}</span></p>
                    <p className='mb-2 text-black-500'>Total Items: <span className='text-blue-800 text-lg mx-3'>{statistics.today.total_items}</span></p>
                    <p className='mb-2 text-black-500'>Total Orders: <span className='text-blue-800 text-lg mx-3'>{statistics.today.total_orders}</span></p>
                </div>

                <div className='rounded-lg shadow-lg p-6'>
                    <div className='flex justify-between'>
                        <h2 className='text-2xl font-semibold mb-4 text-black-500'>This Week</h2>
                        <CalendarTodayIcon className='text-black-500' />
                    </div>

                    <PieChart width={150} height={150}>
                        <Pie
                            dataKey="value"
                            data={[
                                { name: 'Income', value: statistics.this_week.total_income },
                                { name: 'Expenses', value: 2000 },
                                { name: 'Bonus', value: 3000 }
                            ]}
                            outerRadius={50}
                            fill="#8884d8"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>

                    <p className='mb-2 text-black-500'>Total Income: <span className='text-blue-800 text-lg mx-3'>{statistics.this_week.total_income}</span></p>
                    <p className='mb-2 text-black-500'>Total Items: <span className='text-blue-800 text-lg mx-3'>{statistics.this_week.total_items}</span></p>
                    <p className='mb-2 text-black-500'>Total Orders: <span className='text-blue-800 text-lg mx-3'>{statistics.this_week.total_orders}</span></p>
                </div>

                <div className='rounded-lg shadow-lg p-6'>
                    <div className='flex justify-between'>
                        <h2 className='text-2xl font-semibold mb-4 text-black-500'>This Month</h2>
                        <CalendarTodayIcon className='text-black-500' />
                    </div>

                    <PieChart width={150} height={150}>
                        <Pie
                            dataKey="value"
                            data={[
                                { name: 'Income', value: statistics.this_month.total_income },
                                { name: 'Expenses', value: 3000 },
                                { name: 'Bonus', value: 4000 }
                            ]}
                            outerRadius={50}
                            fill="#8884d8"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>

                    <p className='mb-2 text-black-500'>Total Income: <span className='text-blue-800 text-lg mx-3'>{statistics.this_month.total_income}</span></p>
                    <p className='mb-2 text-black-500'>Total Items: <span className='text-blue-800 text-lg mx-3'>{statistics.this_month.total_items}</span></p>
                    <p className='mb-2 text-black-500'>Total Orders: <span className='text-blue-800 text-lg mx-3'>{statistics.this_month.total_orders}</span></p>
                </div>

                <div className='rounded-lg shadow-lg p-6'>
                    <div className='flex justify-between'>
                        <h2 className='text-2xl font-semibold mb-4 text-black-500'>Overall</h2>
                    </div>

                    <PieChart width={150} height={150}>
                        <Pie
                            dataKey="value"
                            data={[
                                { name: 'Income', value: statistics.total_income },
                                { name: 'Expenses', value: 5000 },
                                { name: 'Bonus', value: 6000 }
                            ]}
                            outerRadius={50}
                            fill="#8884d8"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>

                    <p className='mb-2 text-black-500'>Total Income: <span className='text-blue-800 text-lg mx-3'>{statistics.total_income}</span></p>
                    <p className='mb-2 text-black-500'>Total Items: <span className='text-blue-800 text-lg mx-3'>{statistics.total_items}</span></p>
                    <p className='mb-2 text-black-500'>Total Orders: <span className='text-blue-800 text-lg mx-3'>{statistics.total_orders}</span></p>
                </div>
            </div>

            <div className='mt-8'>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="income" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Statistics;
