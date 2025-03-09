"use client";
import { useRouter } from 'next/navigation';

export default function LoginUserDiv() {
  const router = useRouter();
  const handleStartPage = () => {
    router.push("/start");
  };

  return (
      <button className="px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out w-64"
        onClick={handleStartPage}
      >
        시작화면 이동 
      </button>
  );
}
