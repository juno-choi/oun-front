export default function RoutineHealthNewAddButton({ routineId, healthList, setHealthList }) {
    
    // 새 운동 추가 함수
    const handleAddExercise = () => {
        // 새 운동 객체 생성 (임시 ID 사용)
        const newExercise = {
            id: '',
            name: "",
            description: "",
            routine_id: routineId
        };
        
        // 기존 리스트에 새 운동 추가
        setHealthList([...healthList, newExercise]);
    };

    return (
        <button
            onClick={handleAddExercise}
            className="mt-4 w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-400 transition-colors duration-200 flex items-center justify-center"
        >
            + 운동 추가
        </button>
    );
}


