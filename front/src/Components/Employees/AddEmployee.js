import React from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';

const AddEmployee = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Box component="form" sx={{ maxWidth: 800, ml: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add Employee
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="User Name"
              name="username"
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Role"
              name="role"
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Company"
              name="company"
              margin="normal"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Button 
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: 'gray',
            },
            width: '100%',
            mt: 2,
          }}
        >
          Add Employee
        </Button>
      </Box>
    </Box>
  );
};

export default AddEmployee;
