import { useEffect, useState } from "react";
import axios from "@/app/util/axios";
import DateDisplay from "@/app/components/util/DateDisplay";
import LoadingDiv from "@/app/components/common/LoadingDiv";
import ErrorDiv from "@/app/components/common/ErrorDiv";
import ExerciseCheckSpan from "@/app/components/routine/exercise/ExerciseCheckSpan";
import RoutineExerciseDeleteButton from "@/app/components/routine/exercise/RoutineExerciseDeleteButton";
import { useRouter } from "next/navigation";

export default function RoutineExerciseList({routineId, exerciseList, setExerciseList}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const fetchExerciseList = async () => {
        try {
            const response = await axios.get(`/api/oun/routine/exercise?routine_id=${routineId}`);
            setExerciseList(response.data.data.exercise_list);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchExerciseList();
    }, []);

    const handleClick = (exerciseId) => {
        router.push(`/routine/exercise/update?routine_id=${routineId}&exercise_id=${exerciseId}`);
    }

    return (
        <div>
            {isLoading && <LoadingDiv />}
            {error && <ErrorDiv error={error} />}
            {exerciseList.map((exercise) => (
                <div onClick={() => handleClick(exercise.exercise_id)} className="relative px-10 py-6 text-white bg-black rounded-lg hover:bg-gray-900 cursor-pointer transition-colors duration-200 ease-in-out w-80 mb-4" key={exercise.exercise_id}>
                    <h1 className="text-2xl font-bold">{exercise.name}</h1>
                    <p className="text-sm text-gray-500">{exercise.description}</p>
                    <DateDisplay dateTimeString={exercise.created_at} className="text-xs text-gray-500" />
                    <ExerciseCheckSpan exercise_set_list={exercise.exercise_set_list} />
                    {/* 삭제 버튼 */}
                    <RoutineExerciseDeleteButton routineExerciseId={exercise.exercise_id} fetchExerciseList={fetchExerciseList} />
                    
                </div>
            ))}
        </div>
    );
}
