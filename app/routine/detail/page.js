"use client";
import { useSearchParams } from "next/navigation";
import RoutineDetailSubject from "@/app/components/routine/RoutineDetailSubject";
import RoutineHealthList from "@/app/components/routine/RoutineHealthList";
import PulseLine from "@/app/components/common/PulseLine";
import HealthCreateButton from "@/app/components/routine/health/HealthCreateMoveButton";
import { useState } from "react";

export default function RoutineDetailPage() {
    const searchParams = useSearchParams();
    const routineId = searchParams.get('routine_id'); // URL 쿼리 파라미터에서 routine_id 값을 가져옴
    const [healthList, setHealthList] = useState([]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <RoutineDetailSubject routineId={routineId} />
            <div className="flex flex-row gap-2">
                <button className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-5 rounded-md">루틴 수정</button>
                <HealthCreateButton routineId={routineId} healthListSize={healthList.length}/>
            </div>
            <PulseLine />
            <RoutineHealthList routineId={routineId} healthList={healthList} setHealthList={setHealthList}/>
        </div>
    );
}