import React, { useState } from 'react';
import { Grid, Button, Box, Divider } from '@mui/material';
import { useAuth } from '../../utils/AuthContext';
import ProductSettings from './Products/ProductSettings';
import CompanySettings from './Company/CompanySettings';
import Statistcs from '../Statistics/Statistics';
import AddEmployees from '../Account/AddEmploye';
import RoleBasedComponent from '../../utils/RoleBasedComponent';

const Setting = () => {
  const { role } = useAuth();
  const [selectedPage, setSelectedPage] = useState('ProductSettings');

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'ProductSettings':
        return (
          <RoleBasedComponent roles={['admin', 'trader']}>
            <ProductSettings />
          </RoleBasedComponent>
        );
      case 'CompanySettings':
        return (
          <RoleBasedComponent roles={['company', 'admin']}>
            <CompanySettings />
          </RoleBasedComponent>
        );
      case 'Statistcs':
        return (
          <RoleBasedComponent roles={['admin', 'trader']}>
            <Statistcs />
          </RoleBasedComponent>
        );
      case 'AddEmployees':
        return (
          <RoleBasedComponent roles={['company', 'trader', 'admin']}>
            <AddEmployees />
          </RoleBasedComponent>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="setting-container">
      <Box className="setting-buttons">
		<Button 
          fullWidth 
          className={selectedPage === 'AddEmployees' ? 'active-button' : ''}
          onClick={() => setSelectedPage('AddEmployees')}
        >
          Add Employees
        </Button>
		
		<Button 
          fullWidth 
          className={selectedPage === 'CompanySettings' ? 'active-button' : ''}
          onClick={() => setSelectedPage('CompanySettings')}
        >
          Remove Emploee
        </Button>
		
        <Button 
          fullWidth 
          className={selectedPage === 'ProductSettings' ? 'active-button' : ''}
          onClick={() => setSelectedPage('ProductSettings')}
        >
          Product Settings
        </Button>
        
		<Button 
          fullWidth 
          className={selectedPage === 'Statistcs' ? 'active-button' : ''}
          onClick={() => setSelectedPage('Statistcs')}
        >
          Statistics
        </Button>
      </Box>

      <Divider orientation="vertical" flexItem className="setting-divider" />

      <Grid container spacing={3} className="setting-content">
        {renderPageContent()}
      </Grid>
    </Box>
  );
};

export default Setting;
