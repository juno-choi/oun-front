"use client";
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RoutinePage() {
  const { isLoggedIn, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 컴포넌트 마운트 시 인증 상태 재확인
    checkAuth();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">루틴 페이지</h1>
      {/* 페이지 컨텐츠 */}
    </div>
  );
} 