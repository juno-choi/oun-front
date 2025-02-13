"use client";
import { useEffect, useState } from "react";

export default function GoogleAuthCallback() {
  const [code, setCode] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const parsedHash = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = parsedHash.get("access_token");

      if (!accessToken) {
        console.error("Google OAuth 인가 Token 없음");
        return;
      }

      const response = await fetch("http://localhost:8080/api/user/auth/google?access_token=" + accessToken);

      console.log(response);

      setCode(accessToken);
    };

    fetchToken();
  }, []);

  return <div>Google 로그인 처리 중...</div>;
}