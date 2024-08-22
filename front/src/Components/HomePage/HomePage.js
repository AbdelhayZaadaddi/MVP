import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import UserProfile from '../Account/UserProfile';
import Ads from '../Ads/ads'; 
import Products from '../Products/Products';
import TrendingProducts from '../Products/TrendingProducts';
import profile from '../../assets/profile.png';
import NotificationsPage from '../Account/NotificationsPage';
import axiosInstance from '../../axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const response = await axiosInstance.get('/notifications/');
        const notifications = response.data;

        const unseenCount = notifications.filter(notification => !notification.is_read).length;
        setUnreadCount(unseenCount);
      } catch (error) {
        console.error('Error fetching unread notifications count:', error);
      }
    };

    fetchUnreadCount();
  }, []);

  const handleNotificationsClick = () => {
    setShowNotifications(prev => !prev);
    if (!showNotifications) {
      setUnreadCount(0); // Clear unread count when viewed
    }
  };

  const setNotificationsViewed = () => {
    setUnreadCount(0);
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Adjust the path according to your route setup
  };

  return (
    <div className='flex flex-col animate-fadeIn'>
      <div className='hea-container'>
        <h1 className='hea-title'>Compass</h1>
        <div className='hea-icons'>
          <div style={{ position: 'relative' }}>
            <Badge 
              badgeContent={unreadCount} 
              color="error"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left', // Position the badge to the left
              }}
            >
              <NotificationsIcon 
                className='notification-icon' 
                onClick={handleNotificationsClick}
              />
            </Badge>
            {showNotifications && <NotificationsPage setNotificationsViewed={setNotificationsViewed} />}
          </div>
          <img
            src={profile} 
            alt='Profile'
            className='hea-profile-picture'
            onClick={handleProfileClick}
          />
        </div>
      </div>
      <Ads />
      <TrendingProducts />
      <Products />
    </div>
  );
};

export default HomePage;
