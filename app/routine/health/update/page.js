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
    const [health, setHealth] = useState({
        name: '',
        description: '',
        health_type: '',
        health_set_list: []
    });
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
                <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
                    <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white flex items-center justify-center">
                        <span className="mr-2">🏃</span>
                        <span>운동 수정</span>
                    </h1>
                    <PulseLine />
                    
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-black dark:text-white">기본 정보</h2>
                            <div className="text-sm text-gray-500">
                                {health.health_type === 'WEIGHT' ? '웨이트(맨몸) 운동' : '유산소 운동'}
                            </div>
                        </div>
                        <HealthUpdateSubject health={health} setHealth={setHealth} />
                    </div>
                    
                    <div className="mt-10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-black dark:text-white">세트 정보</h2>
                            <div className="text-sm text-gray-500">
                                {health.health_set_list.length > 0 ? 
                                    `총 ${health.health_set_list.length}개의 세트` : 
                                    '세트를 추가해주세요'}
                            </div>
                        </div>
                        <HealthSetListDiv health={health} setHealth={setHealth} />
                        <HealthAddButton health={health} setHealth={setHealth} />
                    </div>
                    
                    <div className="mt-10 flex justify-center">
                        <HealthUpdateButton routine_id={routineId} health={health} setHealth={setHealth} />
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold mb-2">헬스 데이터를 찾을 수 없습니다</h2>
                    <p className="text-gray-600 dark:text-gray-400">관리자에게 문의해주세요.</p>
                </div>
            )}
        </div>
    );
}

export default withAuth(HealthUpdatePage);