"use client";
import { useRouter } from 'next/navigation';

export default function RoutineGetButton() {
    const router = useRouter();

    const handleLoadRoutine = () => {
        router.push('/routine'); // 루틴 불러오기 페이지로 이동
    };

    return (
        <button 
            className="px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out w-64"
            onClick={handleLoadRoutine}
        >
            루틴 시작하기
        </button>
    )
}
