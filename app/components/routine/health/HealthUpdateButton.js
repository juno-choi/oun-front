import axios from "@/app/util/axios";
import { useRouter } from "next/navigation";

export default function HealthUpdateButton({routine_id, health, setHealth}) {
    const router = useRouter();
    const updateHealth = async () => {
        setHealth({...health});
        try {
            const response = await axios.put(`/api/routine/health`, health);
            router.push(`/routine/detail?routine_id=${routine_id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button onClick={updateHealth} className="mt-4 w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center">
            운동 수정
        </button>
    );
}