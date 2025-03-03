"use client";
import { useState, useEffect } from 'react';
import LoginButton from "./components/auth/LoginButton";
import LogoutButton from "./components/auth/LogoutButton";
import TestButton from "./components/test/TestButton";
import RoutineButton from "./components/routine/RoutineButton";

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
      <TestButton />
      <RoutineButton />
    </div>
  );
}