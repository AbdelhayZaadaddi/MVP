import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }} className="common-background">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left section for logo */}
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Typography variant="h6" component="div" sx={{ color: 'white', fontWeight: 'bold', marginRight: '8px' }}>
            COMPASS
          </Typography>
        </IconButton>

        {/* Center section for navigation links */}
        <div>
          <Link to="/#home" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ color: 'white', fontWeight: 'bold', marginRight: '10px' }}>
              Home
            </Button>
          </Link>
          <Link to="/#about" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ color: 'white', fontWeight: 'bold', marginRight: '10px' }}>
              About
            </Button>
          </Link>
          <Link to="/#why-us" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ color: 'white', fontWeight: 'bold', marginRight: '10px' }}>
              Why Us
            </Button>
          </Link>
          <Link to="/#contact" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ color: 'white', fontWeight: 'bold' }}>
              Contact
            </Button>
          </Link>
        </div>

        {/* Right section for sign-in/sign-up */}
        <div>
          <Link to="/sign-in" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ color: 'white', fontWeight: 'bold', marginRight: '10px' }}>
              Sign In
            </Button>
          </Link>
          <Link to="/sign-up" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ color: 'white', fontWeight: 'bold' }}>
              Sign Up
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
