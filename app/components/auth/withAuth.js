 "use client";
import { useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function withAuth(WrappedComponent) {
  return function ProtectedRoute(props) {
    const { isLoggedIn, checkAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
      checkAuth();
      if (!isLoggedIn) {
        router.push('/');
      }
    }, [isLoggedIn]);

    // 로딩 상태나 비인증 상태일 때 보여줄 컴포넌트나 null 반환
    if (!isLoggedIn) {
      return null;
    }

    // 인증된 상태면 원래 컴포넌트 렌더링
    return <WrappedComponent {...props} />;
  };
}