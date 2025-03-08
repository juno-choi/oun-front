import { useRouter } from "next/navigation";

export default function HealthCreateButton({ routineId, healthListSize }) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/routine/health/create?routine_id=${routineId}&sort=${healthListSize + 1}`);
    }
    return (
        <button className="bg-black text-white hover:bg-gray-600 px-4 py-5 rounded-md" onClick={handleClick}>운동 추가</button>
    );
}
