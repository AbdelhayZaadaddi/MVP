import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.png';

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
        <div className='block user-profile animate-fadeIn'>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {user && (
                <div className='profile-box'>
                    <div className='profile-info'>
                        <h2>Profile</h2>
                        <div className='profile-image-container'>
                            <img src={profile} alt="Profile" className='user-profile-img' />
                        </div>
                        <div className='profile-details'>
                            <div className='profile-field'>
                                <label>User Name:</label>
                                <input type='text' value={user.user_name} readOnly />
                            </div>
                            <div className='profile-field'>
                                <label>Role:</label>
                                <input type='text' value={user.role} readOnly />
                            </div>
                            <div className='profile-field'>
                                <label>Email:</label>
                                <input type='email' value={user.email} readOnly />
                            </div>
                            <div className='profile-field'>
                                <label>Start Date:</label>
                                <input type='text' value={new Date(user.start_date).toLocaleDateString()} readOnly />
                            </div>
                        </div>
                        <Link to="/">
                            <button className='done-button'>Done</button>
                        </Link>
                    </div>
                </div>
            )}
            <br />
        </div>
    );
};

export default UserProfile;
