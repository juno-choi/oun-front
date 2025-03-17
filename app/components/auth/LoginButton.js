"use client";  // 👈 클라이언트 컴포넌트 설정
import axios from "@/app/util/axios";

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      // 백엔드에서 Google 로그인 URL 받아오기
      const response = await axios.get(`/user/auth/google/url?redirect_uri=${process.env.NEXT_PUBLIC_API_URL}:3000/login/oauth2/google`);
      const data = response.data;

      // 받아온 Google 로그인 URL로 이동
      window.location.href = data.data.url;
    } catch (error) {
      console.error("Google 로그인 URL 요청 실패:", error);
      alert("로그인에 실패했습니다. 관리자에게 문의해주세요.");
    }
  };

  return (
    <button
      className="px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out"
      onClick={handleLogin}
    >
      O.UN Google로 시작하기
    </button>
  );
}