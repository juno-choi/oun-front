"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkAuth = () => {
    const getCookieValue = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const accessToken = getCookieValue('access_token');
    setIsLoggedIn(!!accessToken);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    checkAuth();
  };

  const logout = () => {
    // 쿠키에서 토큰 삭제
    document.cookie = "access_token=; max-age=0; path=/";
    document.cookie = "refresh_token=; max-age=0; path=/";
    setIsLoggedIn(false);
    router.push('/');
  };

  // 로딩 중일 때는 아무것도 보여주지 않음
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      login, 
      logout,
      checkAuth // 상태 체크 함수 노출
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