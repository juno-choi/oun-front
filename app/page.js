"use client";

import MainImage from "@/app/components/main/MainImage";
import LoginButton from "@/app/components/auth/LoginButton";
import LogoutButton from "@/app/components/auth/LogoutButton";
import { useAuth } from '@/app/context/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex justify-center items-center">
        <MainImage />
      </div>
      <div className="mt-8 text-center text-gray-800 dark:text-gray-200">
        {isLoggedIn ? <LogoutButton /> : <LoginButton />}
      </div>
    </main>
  );
}