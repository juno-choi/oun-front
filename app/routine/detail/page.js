"use client";
import axios from "@/app/util/axios";
import { useEffect, useState } from "react";
import DateDisplay from "@/app/components/util/DateDisplay";
import { useSearchParams } from "next/navigation";

export default function RoutineDetailPage() {
    const searchParams = useSearchParams();
    const routineId = searchParams.get('routine_id'); // URL 쿼리 파라미터에서 routine_id 값을 가져옴
    const [routine, setRoutine] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoutine = async () => {
            try {
                const response = await axios.get(`/api/routine/${routineId}`);
                console.log(response.data.data);
                setRoutine(response.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoutine();
    }, []);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {routine && (
                <div>
                    <h1 className="text-2xl font-bold">루틴 상세</h1>
                    <h2>{routine.name}</h2>
                    <p>{routine.description}</p>
                    <DateDisplay dateTimeString={routine.created_at} />
                </div>
            )}
        </div>
    );
}