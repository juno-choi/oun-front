import { useRouter } from "next/navigation";
import axios from "@/app/util/axios";
import { useEffect } from "react";

export default function HealthCreateButton({ healthData }) {
    const router = useRouter();

    useEffect(() => {
        console.log(healthData);
    }, [healthData]);

    const handleClick = async (e) => {
        e.preventDefault();
        
        const routineId = healthData.routine_id;
        try {
            const response = await axios.post("/api/routine/health", 
                healthData
            );

            const code = response.data.code;
            if (code === '0001') {
                alert('운동 추가에 성공했습니다 😀');
            } else {
                alert('운동 추가에 실패했습니다. 다시 시도해주세요.');
            }

            router.push(`/routine/detail?routine_id=${routineId}`);
        } catch (error) {
            console.error('운동 추가 실패:', error);
            alert('운동 추가에 실패했습니다. 다시 시도해주세요.');
        }
    }
    return (
        <button className="w-full px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out" onClick={handleClick}>
            운동 추가
        </button>
    );
}
