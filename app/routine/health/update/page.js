"use client";
import withAuth from "@/app/components/auth/withAuth";
import { useSearchParams } from "next/navigation";
import HealthUpdateSubject from "@/app/components/routine/health/HealthUpdateSubject";
import PulseLine from "@/app/components/common/PulseLine";
import HealthSetListDiv from "@/app/components/routine/health/healthset/HealthSetListDiv";
import { useState, useEffect } from "react";
import axios from "@/app/util/axios";
import LoadingDiv from "@/app/components/common/LoadingDiv";
import ErrorDiv from "@/app/components/common/ErrorDiv";
import HealthAddButton from "@/app/components/routine/health/healthset/HealthAddButton";
import HealthUpdateButton from "@/app/components/routine/health/HealthUpdateButton";

function HealthUpdatePage() {
    const searchParams = useSearchParams();
    const healthId = searchParams.get('health_id');
    const routineId = searchParams.get('routine_id');
    const [health, setHealth] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getHealth = async () => {
        try {
            const response = await axios.get(`/api/routine/health/${healthId}`);
            setHealth(response.data.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getHealth();
    }, [healthId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {isLoading ? (
                <LoadingDiv />
            ) : error ? (
                <ErrorDiv error={error} />
            ) : health ? (
                <>
                    <h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">🏃 운동 수정</h1>
                    <PulseLine />
                    <HealthUpdateSubject health={health} setHealth={setHealth} />
                    <HealthSetListDiv health={health} setHealth={setHealth} />
                    <HealthAddButton health={health} setHealth={setHealth} />
                    <HealthUpdateButton routine_id={routineId} health={health} setHealth={setHealth} />
                </>
            ) : (
                <div>헬스 데이터를 찾을 수 없습니다.</div>
            )}
        </div>

    );
}

export default withAuth(HealthUpdatePage);