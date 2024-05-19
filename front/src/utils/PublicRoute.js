import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth'; // Adjust the path as necessary

const PublicRoute = ({ children }) => {
    const auth = isAuthenticated();
    console.log('PublicRoute: isAuthenticated =', auth); // Debug log

    if (auth) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PublicRoute;


