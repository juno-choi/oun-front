"use client";
import { useRouter } from 'next/navigation';

export default function BackHistoryButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-8 left-8 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
      aria-label="뒤로 가기"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
  );
}
