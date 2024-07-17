import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const AddEmployee = () => {
  return (
    <Box className='flex flex-col items-center' sx={{ gap: 2, p: 2 }}>
      <Box component="form" sx={{ width: 400, p: 2, boxShadow: 3, backgroundColor: 'white', borderRadius: 1 }}>
        <Typography variant="h5" gutterBottom>
          Add Employee
        </Typography>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="User Name"
          name="username"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Role"
          name="role"
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Company"
          name="company"
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Employee
        </Button>
      </Box>
    </Box>
  );
};

export default AddEmployee;
