"use client";
import { useSearchParams } from "next/navigation";
import RoutineDetailSubject from "@/app/components/routine/RoutineDetailSubject";
import RoutineHealthList from "@/app/components/routine/RoutineHealthList";

export default function RoutineDetailPage() {
    const searchParams = useSearchParams();
    const routineId = searchParams.get('routine_id'); // URL 쿼리 파라미터에서 routine_id 값을 가져옴

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <RoutineDetailSubject routineId={routineId} />
            <RoutineHealthList routineId={routineId} />
        </div>
    );
}