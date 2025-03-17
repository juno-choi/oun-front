"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    try {
      const getCookieValue = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };

      const accessToken = getCookieValue('access_token');
      const refreshToken = getCookieValue('refresh_token');
      setIsLoggedIn(!!accessToken || !!refreshToken);
      return !!accessToken || !!refreshToken;
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsLoggedIn(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    document.cookie = "access_token=; max-age=0; path=/;";
    document.cookie = "refresh_token=; max-age=0; path=/;";
    setIsLoggedIn(false);
    router.push('/');
  };

  if (isLoading) {
    return null; // 또는 로딩 컴포넌트
  }

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      login, 
      logout,
      checkAuth,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 