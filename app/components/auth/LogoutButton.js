"use client";
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      // 쿠키에서 토큰 삭제
      document.cookie = "access_token=; max-age=0; path=/";
      document.cookie = "refresh_token=; max-age=0; path=/";
      
      // Context 상태 업데이트
      logout();

      // 홈페이지로 리다이렉트 또는 페이지 새로고침
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <button
      className="px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out w-64"
      onClick={handleLogout}
    >
      로그아웃
    </button>
  );
}
