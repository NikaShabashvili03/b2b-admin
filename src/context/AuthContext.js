// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProfile, loginAdmin, logoutAdmin } from '../redux/slices/authSlice';


const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.auth.admin);
  const status = useSelector((state) => state.auth.status);
  const isAuthenticated = !!admin;

  useEffect(() => {
    if (!admin) {
      dispatch(fetchAdminProfile());
    }
  }, [dispatch, admin]);
  
  const login = async ({ email, password }) => {
    const data = await dispatch(loginAdmin({ email, password }));
    return data
  };

  const logout = async () => {
    await dispatch(logoutAdmin());
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated, status }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
