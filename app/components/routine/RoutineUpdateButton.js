import { useRouter } from "next/navigation";
import axios from "@/app/util/axios";

export default function RoutineUpdateButton({routine, healthList}) {
    const router = useRouter();
    
    const handleClick = async () => {
        // 유효성 검사
        if (!routine.name || !routine.days) {
            alert("루틴 이름과 요일은 필수 입력 항목입니다.");
            return;
        }
        
        try {
            const requestData = {
                routine_id: routine.routine_id,
                name: routine.name,
                description: routine.description || "",
                days: routine.days,
                routine_health_list: healthList,
                status: "ACTIVE"
            };
            
            const response = await axios.put(`/api/routine`, requestData);
            if (response.data.code === '0000') {
                alert("루틴이 성공적으로 수정되었습니다.");
                router.push(`/routine/detail?routine_id=${routine.routine_id}`);
            } else {
                alert(`루틴 수정에 실패했습니다: ${response.data.message || "알 수 없는 오류"}`);
            }
        } catch (error) {
            console.error("루틴 수정 오류:", error);
            alert("루틴 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };
    
    return (
        <button 
            className="px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center" 
            onClick={handleClick}
        >
            수정
        </button>
    );
}


