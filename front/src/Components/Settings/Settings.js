import React from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../../utils/AuthContext';
import ProductSettings from './Products/ProductSettings';
import CompanySettings from './Company/CompanySettings';
import RoleBasedComponent from '../../utils/RoleBasedComponent';
import CompenentTEST from './test';
import Statistcs from '../Statistics/Statistics';
import AddEmployees from '../Account/AddEmploye';


const Setting = () => {
  const { role } = useAuth();

  return (
    <Box>
      <Grid container spacing={3}>
          <>
            <RoleBasedComponent roles={['admin', 'trader']}>
              <ProductSettings />
            </RoleBasedComponent>

            <RoleBasedComponent roles={['company', 'admin']}>
              <CompanySettings />
            </RoleBasedComponent>

            

            
          </>
      </Grid>

      <RoleBasedComponent roles={['admin', 'trader']}>
              <Statistcs />
      </RoleBasedComponent>
      <RoleBasedComponent roles={['company', 'trader']}>
        <AddEmployees />
      </RoleBasedComponent>
      
    </Box>
  );
};

export default Setting;
