"use client";
import { useState, useEffect } from 'react';
import MainImage from "@/app/components/main/MainImage";
import LoginButton from "@/app/components/auth/LoginButton";
import LogoutButton from "@/app/components/auth/LogoutButton";
import { useAuth } from '@/app/context/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <main className="prose dark:prose-invert flex min-h-screen flex-col items-center justify-center p-5">
      <MainImage />
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
    </main>
  );
}