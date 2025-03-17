"use client";
import { useEffect, useState } from "react";
import axios from "@/app/util/axios";
import { useRouter } from 'next/navigation';

export default function GoogleAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const parsedHash = new URLSearchParams(window.location.hash.substring(1));
      const googleToken = parsedHash.get("access_token");

      if (!googleToken) {
        console.error("Google OAuth 인가 Token 없음");
        return;
      }

      const response = await axios.get("/user/auth/google?access_token=" + googleToken);
      const responseData = response.data.data;
      // 쿠키에 토큰 저장
  
      const accessToken = responseData.accessToken;
      const refreshToken = responseData.refreshToken;
      const accessTokenExpiry = responseData.accessTokenExpiredAt;
      const refreshTokenExpiry = responseData.refreshTokenExpiredAt;

      const currentTime = Date.now();
      // 밀리초를 초로 변환하고 현재 시간과의 차이를 계산
      const accessTokenMaxAge = Math.floor(Math.max((accessTokenExpiry - currentTime) / 1000, 0));
      const refreshTokenMaxAge = Math.floor(Math.max((refreshTokenExpiry - currentTime) / 1000, 0));

      // 쿠키에 토큰 저장
      document.cookie = `access_token=${accessToken}; max-age=${accessTokenMaxAge}; path=/; Secure; SameSite=Lax;`;
      document.cookie = `refresh_token=${refreshToken}; max-age=${refreshTokenMaxAge}; path=/; Secure; SameSite=Lax;`;
  
      window.location.href = "/";
    };

    fetchToken();
  }, []);

  return <div>Google 로그인 처리 중...</div>;
}