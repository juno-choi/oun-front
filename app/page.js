"use client";
import { useState, useEffect } from 'react';
import LoginButton from "./components/LoginButton";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getCookieValue = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const accessToken = getCookieValue('access_token');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>OAuth 로그인 테스트</h1>
      {isLoggedIn ? <p>로그인되었습니다.</p> : <LoginButton />}
    </div>
  );
}