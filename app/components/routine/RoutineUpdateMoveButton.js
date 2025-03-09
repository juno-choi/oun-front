import { useRouter } from "next/navigation";

export default function RoutineUpdateMoveButton({routineId}) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/routine/update?routine_id=${routineId}`);
    }
    return (
        <button className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-5 rounded-md" onClick={handleClick}>루틴 수정</button>
    );
}
