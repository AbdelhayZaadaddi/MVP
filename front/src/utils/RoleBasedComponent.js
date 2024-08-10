import React from 'react';
import { Box, Typography } from '@mui/material';

const RoleBasedComponent = ({ roles, children }) => {
    const userRole = localStorage.getItem('user_role');
  
    if (roles.includes(userRole)) {
      return children;
    }
  
    return (
    <Box
		sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '5%',
                padding: '250px',
                marginTop: '2px', 
            }}
	>
      <Typography variant="h6" color="error">
        User Don't Have Access....
      </Typography>
    </Box>
	);
};
  
export default RoleBasedComponent;


// Example usage
// import { Routes, Route } from 'react-router-dom';
// import ProtectedRoute from './ProtectedRoute';
// import RoleBasedComponent from './RoleBasedComponent';
// import AdminPage from './AdminPage';
// import UserPage from './UserPage';

// function App() {
//   return (
//     <Routes>
//       <Route path="/admin" element={
//         <ProtectedRoute requiredRole="admin">
//           <AdminPage />
//         </ProtectedRoute>
//       } />
//       <Route path="/user" element={
//         <ProtectedRoute requiredRole="user">
//           <UserPage />
//         </ProtectedRoute>
//       } />
//       {/* Other routes */}
//     </Routes>
//   );
// }


// import RoleBasedComponent from './RoleBasedComponent';

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Home Page</h1>
//       <RoleBasedComponent roles={['admin']}>
//         <AdminHomeContent />
//       </RoleBasedComponent>
//       <RoleBasedComponent roles={['user']}>
//         <UserHomeContent />
//       </RoleBasedComponent>
//       <RoleBasedComponent roles={['company']}>
//         <CompanyHomeContent />
//       </RoleBasedComponent>
//       {/* Other role-specific content */}
//     </div>
//   );
// };
