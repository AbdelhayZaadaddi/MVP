import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom'; // Correct import
import UserProfile from '../Account/UserProfile';

const Header = () => {
  const navigate = useNavigate(); // Use navigate instead of history

  const handleProfileClick = () => {
    navigate('/user-profile'); // Use navigate instead of history.push
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="inherit">
          Compass
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleProfileClick}>
            <Avatar src="/path-to-your-avatar.jpg" alt="Profile Image" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
