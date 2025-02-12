"use client";
import { useEffect, useState } from "react";

export default function GoogleAuthCallback() {
  const [code, setCode] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
    
      if (!code) {
        console.error("Google OAuth 인가 코드 없음");
        return;
      }
      setCode(code);
    };

    fetchToken();
  }, []);

  return <div>Google 로그인 처리 중... 인가 코드 = {code}</div>;
}