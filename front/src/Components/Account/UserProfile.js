import React from 'react'
import { useEffect, useState } from 'react'

import axiosInstance from '../../axios'
import profile from '../../assets/profile.jpg'

const UserProfile = () => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        axiosInstance.get('profile/')
        .then(response => {
            setUser(response.data)
            setIsLoading(false)
        })
        .catch(error => {
            console.error('Error geting user:   ', error);
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


  return (
    <div className='shadow-md w-3/5 flex flex-col m-auto justify-center mt-4'>
        <div className='m-auto text-center'>
            <h1 className='m-5 text-2xl'>User Profile</h1>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {user && (
                <div className='m-5'>
                    <div>
                        <img src={profile} alt='profile' className='rounded-full h-20 w-20 m-auto' />
                    </div>
                    <div className='mb-4 mt-3'>
                        <span className='font-bold'>Username:</span> {user.user_name}
                    </div>
                    <div className='mb-4'>
                        <span className='font-bold'>Email:</span> {user.email}
                    </div>
                    <div className='mb-4'>
                        <span className='font-bold'>Role:</span> {user.role}
                    </div>
                </div>
            )}
        </div>
    </div>
    
  )
}

export default UserProfile