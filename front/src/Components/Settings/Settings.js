import React, { useState } from 'react';
import { Grid, Button, Box, Divider } from '@mui/material';
import { useAuth } from '../../utils/AuthContext';
import ProductSettings from './Products/ProductSettings';
import CompanySettings from './Company/CompanySettings';
import Statistcs from '../Statistics/Statistics';
import AddEmployees from '../Account/AddEmploye';
import ViewEmployees from '../Employees/ViewEmployees';
import ViewYourPro from '../Products/viewYourpro';
import RoleBasedComponent from '../../utils/RoleBasedComponent';

const Setting = () => {
  const { role } = useAuth();
  const [selectedPage, setSelectedPage] = useState('AddEmployees'); // Set default page to AddEmployees

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'AddEmployees': // Ensure AddEmployees is first
        return (
          <RoleBasedComponent roles={['company', 'trader', 'admin']}>
            <AddEmployees />
          </RoleBasedComponent>
        );
      case 'ViewEmployees': // Ensure ViewEmployees is next
        return (
          <RoleBasedComponent roles={['company', 'trader', 'admin']}>
            <ViewEmployees />
          </RoleBasedComponent>
        );
      case 'CompanySettings': // Remove Employee
        return (
          <RoleBasedComponent roles={['company', 'admin']}>
            <CompanySettings />
          </RoleBasedComponent>
        );
      case 'ProductSettings': // Add Offers
        return (
          <RoleBasedComponent roles={['admin', 'trader']}>
            <ProductSettings />
          </RoleBasedComponent>
        );
      case 'ViewYourPro': // View Products
        return (
          <RoleBasedComponent roles={['admin', 'trader']}>
            <ViewYourPro />
          </RoleBasedComponent>
        );
      case 'Statistcs': // Statistics
        return (
          <RoleBasedComponent roles={['admin', 'trader']}>
            <Statistcs />
          </RoleBasedComponent>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="setting-container">
      <Box className="setting-buttons">
        {role === 'admin' && (
          <>
            <Button 
              fullWidth 
              className={selectedPage === 'AddEmployees' ? 'active-button' : ''}
              onClick={() => setSelectedPage('AddEmployees')}
            >
              Add Employees
            </Button>
            <Button 
              fullWidth 
              className={selectedPage === 'ViewEmployees' ? 'active-button' : ''}
              onClick={() => setSelectedPage('ViewEmployees')}
            >
              View Employees
            </Button>
            <Button 
              fullWidth 
              className={selectedPage === 'CompanySettings' ? 'active-button' : ''}
              onClick={() => setSelectedPage('CompanySettings')}
            >
              Remove Employee
            </Button>
          </>
        )}
        {(role === 'admin' || role === 'trader') && (
          <>
            <Button 
              fullWidth 
              className={selectedPage === 'ProductSettings' ? 'active-button' : ''}
              onClick={() => setSelectedPage('ProductSettings')}
            >
              Add Offers
            </Button>
            <Button 
              fullWidth 
              className={selectedPage === 'ViewYourPro' ? 'active-button' : ''}
              onClick={() => setSelectedPage('ViewYourPro')}
            >
              View Offers
            </Button>
            <Button 
              fullWidth 
              className={selectedPage === 'Statistcs' ? 'active-button' : ''}
              onClick={() => setSelectedPage('Statistcs')}
            >
              Statistics
            </Button>
          </>
        )}
      </Box>

      <Divider orientation="vertical" flexItem className="setting-divider" />

      <Grid container spacing={3} className="setting-content">
        {renderPageContent()}
      </Grid>
    </Box>
  );
};

export default Setting;
