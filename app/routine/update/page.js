"use client";
import withAuth from "@/app/components/auth/withAuth";
import RoutineUpdateDiv from "@/app/components/routine/RoutineUpdateDiv";
import { useSearchParams } from "next/navigation";
import PulseLine from "@/app/components/common/PulseLine";
import RoutineHealthUpdateDiv from "@/app/components/routine/health/RoutineHealthUpdateDiv";
import { useState} from "react";
import RoutineUpdateButton from "@/app/components/routine/RoutineUpdateButton";
import RoutineHealthNewAddButton from "@/app/components/routine/health/RoutineHealthNewAddButton";

function RoutineUpdatePage() {
    const searchParams = useSearchParams();
    const routineId = searchParams.get('routine_id');
    const [routine, setRoutine] = useState({
        name: '',
        description: '',
        days: ''
    });
    const [healthList, setHealthList] = useState([]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">🏃 루틴 수정</h1>
            <PulseLine />
            <RoutineUpdateDiv routineId={routineId} routine={routine} setRoutine={setRoutine} />
            <RoutineHealthUpdateDiv routineId={routineId} healthList={healthList} setHealthList={setHealthList} />
            {/* 운동 추가 버튼 */}
            <RoutineHealthNewAddButton routineId={routineId} healthList={healthList} setHealthList={setHealthList} />
            <RoutineUpdateButton routine={routine} healthList={healthList}/>
        </div>
    );
}

export default withAuth(RoutineUpdatePage);
