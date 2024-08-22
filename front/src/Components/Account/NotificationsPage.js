import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useAuth } from '../../utils/AuthContext';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  }).replace(',', ' -');
};

const NotificationsPage = ({ setNotificationsViewed }) => {
  const { role } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notifications/');
        setNotifications(response.data);
        setNotificationsViewed(); // Mark notifications as viewed when loaded
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [role, setNotificationsViewed]);

  return (
    <Box 
      sx={{ 
        width: '500px', 
        backgroundColor: '#fff', 
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
        borderRadius: '10px', 
        overflowY: 'auto',
        maxHeight: '400px',
        position: 'absolute',
        top: '50px',  // Adjust based on your layout
        right: '20px',  // Adjust based on your layout
        zIndex: 1000 
      }}
      padding={2}
    >
      <Typography variant="h6" gutterBottom>Notifications</Typography>
      {notifications.length === 0 ? (
        <Typography>No notifications available</Typography>
      ) : (
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id} sx={{ borderBottom: '1px solid #eee' }}>
              <ListItemText 
                primary={notification.message} 
                secondary={formatDate(notification.created_at)} 
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default NotificationsPage;
