import { useEffect, useState } from "react";
import axios from "@/app/util/axios";
import LoadingDiv from "@/app/components/common/LoadingDiv";
import ErrorDiv from "@/app/components/common/ErrorDiv";


export default function RoutineDetailSubject({routineId, routine, setRoutine}) {
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoutine = async () => {
            try {
                const response = await axios.get(`/api/oun/routine/${routineId}`);
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
        <div>
            {isLoading && <LoadingDiv />}
            {error && <ErrorDiv error={error} />}
            {routine && (
                <div>
                    <h1 className="text-black dark:text-white text-2xl font-bold">{routine.name}</h1>
                    <p className="text-black dark:text-white">{routine.description}</p>
                </div>
            )}
        </div>
        
    );
}
