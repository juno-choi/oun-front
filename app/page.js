"use client";
import { useState, useEffect } from 'react';
import MainImage from "./components/main/MainImage";
import LoginButton from "./components/auth/LoginButton";
import LogoutButton from "./components/auth/LogoutButton";
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <MainImage />
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
    </main>
  );
}