import { useEffect, useState } from "react";
import axios from "@/app/util/axios";
import DateDisplay from "@/app/components/util/DateDisplay";
import LoadingDiv from "@/app/components/common/LoadingDiv";
import ErrorDiv from "@/app/components/common/ErrorDiv";
import RoutineHealthDeleteButton from "@/app/components/routine/health/RoutineHealthDeleteButton";
import HealthCheckSpan from "@/app/components/routine/health/HealthCheckSpan";

export default function RoutineHealthList({routineId, healthList, setHealthList}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchHealthList = async () => {
        try {
            const response = await axios.get(`/api/routine/health?routine_id=${routineId}`);
            setHealthList(response.data.data.health_list);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHealthList();
    }, []);

    return (
        <div>
            {isLoading && <LoadingDiv />}
            {error && <ErrorDiv error={error} />}
            {healthList.map((health) => (
                <div className="relative px-10 py-6 text-white bg-black rounded-lg hover:bg-gray-900 cursor-pointer transition-colors duration-200 ease-in-out w-80 mb-4" key={health.health_id}>
                    <h1 className="text-2xl font-bold">{health.name}</h1>
                    <p className="text-sm text-gray-500">{health.description}</p>
                    <DateDisplay dateTimeString={health.created_at} className="text-xs text-gray-500" />
                    <HealthCheckSpan health_set_list={health.health_set_list} />
                    {/* 삭제 버튼 */}
                    <RoutineHealthDeleteButton routineHealthId={health.health_id} fetchHealthList={fetchHealthList} />
                    
                </div>
            ))}
        </div>
    );
}
