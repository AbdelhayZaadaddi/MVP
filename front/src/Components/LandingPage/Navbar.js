import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
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
          <ScrollLink to="home" smooth={true} duration={500} style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ color: 'white', fontWeight: 'bold', marginRight: '10px' }}>
              Home
            </Button>
          </ScrollLink>
          <ScrollLink to="about" smooth={true} duration={500} style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ color: 'white', fontWeight: 'bold', marginRight: '10px' }}>
              About
            </Button>
          </ScrollLink>
          <ScrollLink to="why-us" smooth={true} duration={500} style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ color: 'white', fontWeight: 'bold', marginRight: '10px' }}>
              Why Us
            </Button>
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500} style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ color: 'white', fontWeight: 'bold' }}>
              Contact
            </Button>
          </ScrollLink>
        </div>

        {/* Right section for sign-in/sign-up */}
        <div>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button color="inherit" sx={{ color: 'white', fontWeight: 'bold', marginRight: '10px' }}>
              Sign In
            </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
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
