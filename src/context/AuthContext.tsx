import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginApi, register as registerApi } from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  handleOAuthLogin: (provider: 'google' | 'apple') => Promise<void>;
  refreshToken: () => Promise<void>;
}

// Додайте цей інтерфейс для параметрів redirect URI
interface RedirectUriOptions {
    native?: string;
    useProxy?: boolean;
    path?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Завантаження даних при старті
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        setLoading(true);
        const [storedToken, storedUser] = await Promise.all([
          AsyncStorage.getItem('authToken'),
          AsyncStorage.getItem('authUser'),
        ]);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to load authentication data:', e);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // Оновлення токена
  const refreshToken = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Token refresh failed');

      const { token: newToken } = await response.json();
      await AsyncStorage.setItem('authToken', newToken);
      setToken(newToken);
    } catch (e) {
      console.error('Token refresh error:', e);
      await logout();
    }
  };

  // Обробник OAuth
  const handleOAuthLogin = async (provider: 'google' | 'apple') => {
    try {
        setLoading(true);
        setError(null);
        
        // Виправлений рядок - використовуємо правильний тип для параметрів
        const redirectUri = AuthSession.makeRedirectUri({
            useProxy: true,
        } as RedirectUriOptions);
        
        const authUrl = `${process.env.API_URL}/auth/${provider}?redirect_uri=${encodeURIComponent(redirectUri)}`;
        
        const result = await WebBrowser.openAuthSessionAsync(
            authUrl,
            redirectUri
        );

        if (result.type === 'success') {
            const { token: authToken, user: authUser } = JSON.parse(result.url.split('#')[1]);
            await Promise.all([
                AsyncStorage.setItem('authToken', authToken),
                AsyncStorage.setItem('authUser', JSON.stringify(authUser)),
            ]);
            setToken(authToken);
            setUser(authUser);
        }
    } catch (e: any) {
        setError(e.message || 'OAuth login failed');
    } finally {
        setLoading(false);
    }
};

  // Логін
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { token: authToken, user: authUser } = await loginApi(email, password);
      
      await Promise.all([
        AsyncStorage.setItem('authToken', authToken),
        AsyncStorage.setItem('authUser', JSON.stringify(authUser)),
      ]);

      setToken(authToken);
      setUser(authUser);
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Реєстрація
  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { token: authToken, user: authUser } = await registerApi(email, password);
      
      await Promise.all([
        AsyncStorage.setItem('authToken', authToken),
        AsyncStorage.setItem('authUser', JSON.stringify(authUser)),
      ]);

      setToken(authToken);
      setUser(authUser);
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Логаут
  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('authToken'),
        AsyncStorage.removeItem('authUser'),
      ]);
      
      setToken(null);
      setUser(null);
    } catch (e) {
      console.error('Failed to logout:', e);
      throw e;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    handleOAuthLogin,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};