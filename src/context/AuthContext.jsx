import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

// Session duration in milliseconds (24 hours)
const SESSION_DURATION = 24 * 60 * 60 * 1000;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validate if stored session is still valid
  const isSessionValid = () => {
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    if (!tokenTimestamp) return false;
    
    const elapsedTime = Date.now() - parseInt(tokenTimestamp);
    return elapsedTime < SESSION_DURATION;
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser && isSessionValid()) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['auth-token'] = storedToken;
    } else if (storedToken || storedUser) {
      // Clear expired session
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokenTimestamp');
      delete api.defaults.headers.common['auth-token'];
    }
    setLoading(false);
  }, []);

  const login = (userData, userToken) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('tokenTimestamp', Date.now().toString());
    api.defaults.headers.common['auth-token'] = userToken;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenTimestamp');
    delete api.defaults.headers.common['auth-token'];
  };

  const isLoggedIn = !!token;

  const value = {
    user,
    token,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};