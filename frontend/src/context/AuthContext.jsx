import { createContext, useContext, useEffect, useState } from 'react';

import {
  fetchCurrentUser,
  loginUser as loginRequest,
  logoutUser as logoutRequest,
  registerUser as registerRequest,
} from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hydrateUser = async () => {
      try {
        const response = await fetchCurrentUser();
        setUser(response.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    hydrateUser();
  }, []);

  const login = async (payload) => {
    const response = await loginRequest(payload);
    setUser(response.user);
    return response;
  };

  const register = async (payload) => {
    const response = await registerRequest(payload);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  const refreshUser = async () => {
    const response = await fetchCurrentUser();
    setUser(response.user);
    return response.user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

