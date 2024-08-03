import React from 'react';
import { Grid, Button, Box, Typography } from '@mui/material';
import { useAuth } from '../../utils/AuthContext';
import ProductSettings from './Products/ProductSettings';
import CompanySettings from './Company/CompanySettings';
import RoleBasedComponent from '../../utils/RoleBasedComponent';
import CompenentTEST from './test';
import Statistcs from '../Statistics/Statistics';


const Setting = () => {
  const { role } = useAuth();

  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Grid container spacing={3}>
          <>
            <RoleBasedComponent roles={['admin']}>
              <ProductSettings />
            </RoleBasedComponent>

            <RoleBasedComponent roles={['company', 'admin']}>
              <CompanySettings />
            </RoleBasedComponent>

            <RoleBasedComponent roles={['trader']}>
              <Statistcs />
            </RoleBasedComponent>

            
          </>
      </Grid>


      
      
    </Box>
  );
};

export default Setting;
