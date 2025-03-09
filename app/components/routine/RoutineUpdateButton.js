import { useRouter } from "next/navigation";
import axios from "@/app/util/axios";
export default function RoutineUpdateButton({routine, healthList}) {
    const router = useRouter();
    const handleClick = async () => {
        console.log(routine);
        console.log(healthList);
        const requestData = {
            routine_id: routine.routine_id,
            name: routine.name,
            description: routine.description,
            health_list: healthList,
            status: "ACTIVE"
        }
        console.log(requestData);
        const response = await axios.put(`/api/routine`, requestData);
        console.log(response);
        if (response.data.code === '0000') {
            router.push(`/routine/detail?routine_id=${routine.routine_id}`);
        } else {
            alert("루틴 수정에 실패했습니다.");
        }

    }
    return (
        <button className="mt-4 w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center" onClick={handleClick}>루틴 수정</button>
    );
}


