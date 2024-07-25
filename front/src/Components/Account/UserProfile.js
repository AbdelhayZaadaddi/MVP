import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import q from '../../assets/q.png';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosInstance.get('profile/')
            .then(response => {
                setUser(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error getting user: ', error);
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);

    return (
        <div className='block user-profile'>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {user && (
                <div className='profile-box'>
                    <div className='profile-info'>
                        <div className='welcome-message'>Welcome, {user.user_name}</div>
                        <div className='profile-details'>
                            <span> User:  {user.role}</span>
                            <span className='info-separator'></span>
                            <span> Company: {user.email}</span>
                            <span className='info-separator'></span>
                            <span> Location: {user.role}</span>
                        </div>
                    </div>
                    <img src={q} alt="Logo" className='profile-img-right' />
                </div>
            )}
            <br />
        </div>
    );
};

export default UserProfile;
