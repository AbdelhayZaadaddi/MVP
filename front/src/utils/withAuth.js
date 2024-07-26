import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from './auth';
import { publicPaths } from './publicPaths';

const withAuth = (WrappedComponent) => {
   
    return (props) => {
        const location = useLocation();
        const currentPath = location.pathname;

        if (!isAuthenticated()) {
            if (publicPaths.includes(currentPath)) {
                return null; // Don't show anything if on a public path
            } else {
                return <Navigate to="/login" />;
            }
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;

// example usage

// import React from 'react';
// import withAuth from './withAuth';

// const ProtectedComponent = () => {
   // return (
        // something here
    //);


//export default withAuth(ProtectedComponent);