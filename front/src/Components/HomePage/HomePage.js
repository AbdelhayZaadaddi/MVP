import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import NotificationsIcon from '@mui/icons-material/Notifications';
import UserProfile from '../Account/UserProfile';
import Ads from '../Ads/ads'; 
import Products from '../Products/Products';
import TrendingProducts from '../Products/TrendingProducts';
import profile from '../../assets/profile.png';


const HomePage = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); // Adjust the path according to your route setup
  };

  return (
    <div className='flex flex-col animate-fadeIn'>
      <div className='hea-container'>
        <h1 className='hea-title'>Compass</h1>
        <div className='hea-icons'>
          <NotificationsIcon className='notification-icon' />
          <img
            src={profile} // Replace with the actual URL of the profile picture
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
