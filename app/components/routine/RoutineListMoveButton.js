"use client";
import { useRouter } from 'next/navigation';

export default function RoutineGetButton({ className }) {
    const router = useRouter();

    const handleLoadRoutine = () => {
        router.push('/routine'); // 루틴 불러오기 페이지로 이동
    };

    return (
        <button 
            className={className}
            onClick={handleLoadRoutine}
        >
            루틴 목록
        </button>
    )
}
