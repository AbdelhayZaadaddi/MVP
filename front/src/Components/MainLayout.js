import React from 'react';
import Navbar from './Navbar';  
import UserProfile from './Account/UserProfile';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <UserProfile /> {/* UserProfile visible on all pages with MainLayout */}
      <div className="main-content">
        <Outlet /> {/* Renders the child route components */}
      </div>
    </div>
  );
}

export default MainLayout;
