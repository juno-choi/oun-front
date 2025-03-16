import axios from "@/app/util/axios";
import { useRouter } from "next/navigation";

export default function ExerciseUpdateButton({routine_id, exercise, setExercise}) {
    const router = useRouter();
    const updateExercise = async () => {
        setExercise({...exercise});
        try {
            const response = await axios.put(`/api/routine/exercise`, exercise);
            router.push(`/routine/detail?routine_id=${routine_id}`);
        } catch (error) {
            alert(error.response.data.errors[0].detail);
            console.error(error);
        }
    }

    return (
        <button onClick={updateExercise} className="px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center" >
            수정
        </button>
    );
}