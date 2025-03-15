"use client";
import withAuth from "@/app/components/auth/withAuth";
import RoutineUpdateDiv from "@/app/components/routine/RoutineUpdateDiv";
import { useSearchParams } from "next/navigation";
import PulseLine from "@/app/components/common/PulseLine";
import RoutineHealthUpdateDiv from "@/app/components/routine/health/RoutineHealthUpdateDiv";
import { useState, useEffect } from "react";
import RoutineUpdateButton from "@/app/components/routine/RoutineUpdateButton";
import RoutineHealthNewAddButton from "@/app/components/routine/health/RoutineHealthNewAddButton";
import LoadingDiv from "@/app/components/common/LoadingDiv";
import ErrorDiv from "@/app/components/common/ErrorDiv";
import axios from "@/app/util/axios";

function RoutineUpdatePage() {
    const searchParams = useSearchParams();
    const routineId = searchParams.get('routine_id');
    const [routine, setRoutine] = useState({
        name: '',
        description: '',
        days: ''
    });
    const [healthList, setHealthList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 루틴 데이터 로드
    useEffect(() => {
        const fetchRoutineData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/routine/${routineId}`);
                setRoutine(response.data.data);
                setError(null);
            } catch (err) {
                console.error("루틴 데이터 로드 실패:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (routineId) {
            fetchRoutineData();
        }
    }, [routineId]);

    // 요일 변환 함수
    const getDayName = (day) => {
        const daysMap = {
            MONDAY: '월요일',
            TUESDAY: '화요일',
            WEDNESDAY: '수요일',
            THURSDAY: '목요일',
            FRIDAY: '금요일',
            SATURDAY: '토요일',
            SUNDAY: '일요일'
        };
        return daysMap[day] || '';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {isLoading ? (
                <LoadingDiv />
            ) : error ? (
                <ErrorDiv error={error} />
            ) : (
                <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
                    <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white flex items-center justify-center">
                        <span className="mr-2">🏃</span>
                        <span>루틴 수정</span>
                    </h1>
                    <PulseLine />
                    
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-black dark:text-white">기본 정보</h2>
                            <div className="text-sm text-gray-500">
                                {routine.days ? getDayName(routine.days) : '요일 미지정'}
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                            <RoutineUpdateDiv routineId={routineId} routine={routine} setRoutine={setRoutine} />
                        </div>
                    </div>
                    
                    <div className="mt-10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-black dark:text-white">운동 목록</h2>
                            <div className="text-sm text-gray-500">
                                {healthList.length > 0 ? 
                                    `총 ${healthList.length}개의 운동` : 
                                    '운동을 추가해주세요'}
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm mb-6">
                            <RoutineHealthUpdateDiv routineId={routineId} healthList={healthList} setHealthList={setHealthList} />
                            
                            <div className="flex justify-center mt-6">
                                <RoutineHealthNewAddButton routineId={routineId} healthList={healthList} setHealthList={setHealthList} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-10 flex justify-center">
                        <RoutineUpdateButton routine={routine} healthList={healthList}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withAuth(RoutineUpdatePage);
