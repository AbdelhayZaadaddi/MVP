//This is for Navbar


import React from 'react';
import { Box, Typography } from '@mui/material';

const RoleBasedComponent2 = ({ roles, children }) => {
    const userRole = localStorage.getItem('user_role');
  
    if (roles.includes(userRole)) {
      return children;
    }
  
    return null;
};
  
export default RoleBasedComponent2;