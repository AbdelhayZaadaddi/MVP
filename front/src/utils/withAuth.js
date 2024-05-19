import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth'; // Adjust the path as necessary

const withAuth = (WrappedComponent) => {
    return (props) => {
        if (!isAuthenticated()) {
            return <Navigate to="/login" />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
