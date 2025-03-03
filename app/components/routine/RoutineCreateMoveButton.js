"use client";
import { useRouter } from 'next/navigation';

export default function RoutineCreateMoveButton() {
    const router = useRouter();

    const handleCreateRoutine = () => {
        router.push('/routine/create');
    }
    return (
        <button 
            className="px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out w-64"
            onClick={handleCreateRoutine}
        >
        루틴 만들기
        </button>
    )
}
