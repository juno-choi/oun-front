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
            className="px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out w-64"
        >
            + 운동 추가
        </button>
    );
}


