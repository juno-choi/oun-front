import { useRouter } from "next/navigation";

export default function RoutineStartButton({routineId, exerciseList}) {
    const router = useRouter();

    const checkRoutineValidation = () => {
        if (exerciseList.length === 0) {
            return false;
        }
        return true;
    }

    const checkHealthValidation = () => {
        // 하나라도 exercise_set_list의 길이가 0인지 확인
        const hasEmpty = exerciseList.some(exercise => exercise.exercise_set_list.length === 0);
        
        if (hasEmpty) {
            return false;
        }
        return true;
    }

    const routineStart = () => {
        router.push(`/routine/start?routine_id=${routineId}`);
    }

    const handleClick = () => {
        // 루틴 내 운동 내역 확인
        if (! checkRoutineValidation()) {
            alert('루틴 수정을 클릭하여 운동을 추가해주세요.');
            return;
        }
        // 루틴 내 운동 세트 내역 확인
        if (! checkHealthValidation()) {
            alert('운동을 클릭하여 세트를 추가해 주세요.');
            return;
        }
        // 루틴 시작
        routineStart();
    }

    return (
        <button className="bg-red-600 text-white hover:bg-red-700 px-4 py-5 rounded-md" onClick={handleClick}>루틴 시작</button>
    );
}