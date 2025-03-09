"use client";
import withAuth from "@/app/components/auth/withAuth";
import RoutineUpdateDiv from "@/app/components/routine/RoutineUpdateDiv";
import { useSearchParams } from "next/navigation";
import PulseLine from "@/app/components/common/PulseLine";
import RoutineHealthUpdateDiv from "@/app/components/routine/RoutineHealthUpdateDiv";
import { useState} from "react";

function RoutineUpdatePage() {
    const searchParams = useSearchParams();
    const routineId = searchParams.get('routine_id');
    const [routine, setRoutine] = useState({
        name: '',
        description: ''
    });
    const [healthList, setHealthList] = useState([]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <RoutineUpdateDiv routineId={routineId} routine={routine} setRoutine={setRoutine} />
            <PulseLine />
            <RoutineHealthUpdateDiv routineId={routineId} healthList={healthList} setHealthList={setHealthList} />
        </div>
    );
}

export default withAuth(RoutineUpdatePage);
