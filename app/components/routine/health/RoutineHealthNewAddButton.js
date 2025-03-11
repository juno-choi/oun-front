import { useState } from "react";

export default function RoutineHealthNewAddButton({ routineId, healthList, setHealthList }) {
    
    // 새 운동 추가 함수
    const handleAddExercise = () => {
        // 고유한 임시 ID 생성 (타임스탬프 + 랜덤 문자열 조합)
        const uniqueId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        
        // 새 운동 객체 생성 (고유 ID 사용)
        const newExercise = {
            id: uniqueId,
            name: "",
            description: "",
            routine_id: routineId,
            sort: healthList.length + 1,
            status: "ACTIVE"
        };
        
        // 기존 리스트에 새 운동 추가 (불변성 유지)
        setHealthList(prevList => [...prevList, newExercise]);
    };

    return (
        <button
            onClick={handleAddExercise}
            className="mt-4 w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
        >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="mr-2">
                <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            운동 추가
        </button>
    );
}


