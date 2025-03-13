import { useRouter } from "next/navigation";
import axios from "@/app/util/axios";
export default function RoutineUpdateButton({routine, healthList}) {
    const router = useRouter();
    const handleClick = async () => {
        const requestData = {
            routine_id: routine.routine_id,
            name: routine.name,
            description: routine.description,
            days: routine.days,
            routine_health_list: healthList,
            status: "ACTIVE"
        }
        const response = await axios.put(`/api/routine`, requestData);
        if (response.data.code === '0000') {
            router.push(`/routine/detail?routine_id=${routine.routine_id}`);
        } else {
            alert("루틴 수정에 실패했습니다.");
        }

    }
    return (
        <button 
            className="px-8 py-4 text-lg font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition-colors duration-200 ease-in-out w-64 mt-2" 
            onClick={handleClick}
        >
            수정
        </button>
    );
}


