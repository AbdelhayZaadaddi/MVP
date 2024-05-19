import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};


