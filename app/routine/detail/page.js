"use client";
import { useSearchParams } from "next/navigation";
import RoutineDetailSubject from "@/app/components/routine/RoutineDetailSubject";
import RoutineHealthList from "@/app/components/routine/RoutineHealthList";
import PulseLine from "@/app/components/common/PulseLine";
import RoutineUpdateMoveButton from "@/app/components/routine/RoutineUpdateMoveButton";
import { useState } from "react";
import withAuth from "@/app/components/auth/withAuth";


function RoutineDetailPage() {
    const searchParams = useSearchParams();
    const routineId = searchParams.get('routine_id'); // URL 쿼리 파라미터에서 routine_id 값을 가져옴
    const [routine, setRoutine] = useState(null);
    const [healthList, setHealthList] = useState([]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6">
            <RoutineDetailSubject routineId={routineId} routine={routine} setRoutine={setRoutine}/>
            <div className="flex flex-row gap-2">
                <RoutineUpdateMoveButton routineId={routineId}/>
            </div>
            <PulseLine />
            <RoutineHealthList routineId={routineId} healthList={healthList} setHealthList={setHealthList}/>
            
        </div>
    );
}

export default withAuth(RoutineDetailPage);