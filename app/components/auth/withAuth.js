"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function withAuth(WrappedComponent) {
  return function ProtectedRoute(props) {
    const { isLoggedIn, checkAuth } = useAuth();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const check = async () => {
        await checkAuth();
        setIsChecking(false);
      };
      check();
    }, []);

    useEffect(() => {
      if (!isChecking && !isLoggedIn) {
        router.push('/');
      }
    }, [isLoggedIn, isChecking]);

    // 인증 체크 중일 때는 아무것도 보여주지 않음
    if (isChecking) {
      return null;
    }

    // 로그인되지 않았다면 null 반환
    if (!isLoggedIn) {
      return null;
    }

    // 인증된 상태면 원래 컴포넌트 렌더링
    return <WrappedComponent {...props} />;
  };
}