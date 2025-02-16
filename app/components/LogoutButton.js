"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      // 쿠키에서 토큰 삭제
      document.cookie = "access_token=; max-age=0; path=/";
      document.cookie = "refresh_token=; max-age=0; path=/";

      // 홈페이지로 리다이렉트 또는 페이지 새로고침
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <button
      style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      onClick={handleLogout}
    >
      로그아웃
    </button>
  );
}
