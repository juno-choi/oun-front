"use client";

import MainImage from "@/app/components/main/MainImage";
import LoginButton from "@/app/components/auth/LoginButton";
import LogoutButton from "@/app/components/auth/LogoutButton";
import { useAuth } from '@/app/context/AuthContext';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <main className="prose dark:prose-invert flex min-h-screen flex-col items-center justify-center p-5">
      <div className="w-full max-w-2xl p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/30 transition-all duration-300">
        <MainImage />
        <div className="mt-8 text-center text-gray-800 dark:text-gray-200">
          {isLoggedIn ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>
    </main>
  );
}