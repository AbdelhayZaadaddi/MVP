import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const PublicComponent = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicComponent;

// Example usage
/*
import React from 'react';
import PublicComponent from './PublicComponent';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <PublicComponent>
        <div>
          <h2>Please Log In</h2>
          <p>If you don't have an account, please register.</p>
        </div>
      </PublicComponent>
      { Other content that should be shown regardless of authentication status }
      <div>
        <h2>Public Content</h2>
        <p>This content is visible to everyone.</p>
      </div>
    </div>
  );
};

export default HomePage;
*/
