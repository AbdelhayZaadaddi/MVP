import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from './auth'; // Adjust the path as necessary

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = isAuthenticated();
            console.log('ProtectedRoute: isAuthenticated =', authStatus); // Debug log
            setAuth(authStatus);
            if (!authStatus) {
                navigate('/register');
            }
        };
        checkAuth();
    }, [navigate]);

    if (auth === null) {
        console.log('Checking authentication...');
        return null; // Or a loading indicator
    }

    return auth ? children : null;
};

export default ProtectedRoute;



