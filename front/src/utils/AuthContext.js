import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem('user_role')); // Initialize with a default role for testing i change Users

  const login = (userRole) => {
    setRole(userRole);
	localStorage.setItem('user_role', userRole); // Store role in local storage
  };

  const logout = () => {
    setRole(null);
	localStorage.removeItem('user_role'); // Remove role from local storage
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
