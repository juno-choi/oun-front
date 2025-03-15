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
            status: "ACTIVE",
            health_type: "WEIGHT", // 기본값 설정
        };
        
        // 기존 리스트에 새 운동 추가 (불변성 유지)
        setHealthList(prevList => [...prevList, newExercise]);
    };

    return (
        <button
            onClick={handleAddExercise}
            className="group relative px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
        >
            <span className="inline-block mr-2 text-xl">+</span>
            <span>운동 추가</span>
            <span className="absolute -bottom-6 left-0 right-0 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                클릭하여 새 운동 추가
            </span>
        </button>
    );
}


