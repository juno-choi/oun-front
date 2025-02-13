"use client";  // 👈 클라이언트 컴포넌트 설정

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      // 백엔드에서 Google 로그인 URL 받아오기
      const response = await fetch("http://localhost:8080/api/user/auth/google/url?redirect_uri=http://localhost:3000/login/oauth2/google");
      const data = await response.json();

      // 받아온 Google 로그인 URL로 이동
      window.location.href = data.data.url;
    } catch (error) {
      console.error("Google 로그인 URL 요청 실패:", error);
    }
  };

  return (
    <button
      style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      onClick={handleLogin}
    >
      Google 로그인
    </button>
  );
}