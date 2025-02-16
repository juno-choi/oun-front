"use client";
import { useState, useEffect } from 'react';
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

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
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}