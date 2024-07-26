import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from './auth'; // Adjust the path as necessary

const ProtectedRoute = ({ children, requiredRole }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = isAuthenticated();
      const storedRole = localStorage.getItem('user_role');
      console.log('ProtectedRoute: isAuthenticated =', authStatus); // Debug log
      setAuth(authStatus);
      setUserRole(storedRole);

      if (!authStatus || (requiredRole && storedRole !== requiredRole)) {
        navigate('/register');
      }
    };
    checkAuth();
  }, [navigate, requiredRole]);

  if (auth === null || userRole === null) {
    console.log('Checking authentication...');
    return null; // Or a loading indicator
  }

  return auth && (!requiredRole || userRole === requiredRole) ? children : null;
};

export default ProtectedRoute;




