"use client";

import { useState, useEffect } from "react";
import axios from "@/app/util/axios";
import LoadingDiv from "@/app/components/common/LoadingDiv";
import ErrorDiv from "@/app/components/common/ErrorDiv";
import { useSearchParams, useRouter } from "next/navigation";
import PulseLine from "@/app/components/common/PulseLine";
import withAuth from "@/app/components/auth/withAuth";
import StartTimerDiv from "@/app/components/routine/start/StartTimerComponent";
import StartProcessComponent from "@/app/components/routine/start/StartProcessComponent";
import StartHealthInfoComponent from "@/app/components/routine/start/StartHealthInfoComponent";

function RoutineStartPage() {
    const router = useRouter();
    const [routine, setRoutine] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [completedSets, setCompletedSets] = useState({});
    const [healthList, setHealthList] = useState([]);
    const searchParams = useSearchParams();
    const routineId = searchParams.get('routine_id');
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // 루틴 데이터 로드
    useEffect(() => {
        const fetchRoutineData = async () => {
            setIsLoading(true);
            try {
                // 루틴 기본 정보 가져오기
                const routineResponse = await axios.get(`/api/routine/${routineId}`);
                setRoutine(routineResponse.data.data);
                
                // 루틴에 포함된 운동 목록 가져오기
                const healthResponse = await axios.get(`/api/routine/health?routine_id=${routineId}`);
                
                // 각 운동에 기본 세트 정보 추가
                const healthListWithSets = healthResponse.data.data.health_list.map(health => {
                    // 세트 정보가 없는 경우 기본 세트 추가
                    if (!health.health_set_list || health.health_set_list.length === 0) {
                        return {
                            ...health,
                            health_set_list: [
                                { set_number: 1, set_weight: 0, set_count: 0, set_time: 0, set_distance: 0, description: "" }
                            ]
                        };
                    }
                    return health;
                });
                
                setHealthList(healthListWithSets);
                
                // 완료된 세트 초기화
                const initialCompletedSets = {};
                healthListWithSets.forEach((health, healthIndex) => {
                    initialCompletedSets[healthIndex] = {};
                    health.health_set_list.forEach((set, setIndex) => {
                        initialCompletedSets[healthIndex][setIndex] = false;
                    });
                });
                setCompletedSets(initialCompletedSets);
                
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

    // 현재 운동 및 세트 정보
    const currentExercise = healthList[currentExerciseIndex];

    // 세트 완료 처리
    const completeSet = () => {
        // 현재 세트를 완료로 표시
        setCompletedSets(prev => ({
            ...prev,
            [currentExerciseIndex]: {
                ...prev[currentExerciseIndex],
                [currentSetIndex]: true
            }
        }));

        // 다음 세트로 이동 또는 다음 운동으로 이동
        if (currentSetIndex < currentExercise.health_set_list.length - 1) {
            // 다음 세트로 이동
            setCurrentSetIndex(currentSetIndex + 1);
            return ;
        } else if (currentExerciseIndex < healthList.length - 1) {
            // 다음 운동으로 이동
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setCurrentSetIndex(0);
            return ;
        } else {
            // 모든 운동 완료
            if(confirm("오늘 루틴을 완료했어요! 고생하셨어요😍\n루틴 목록으로 이동하시겠어요?")) {
                router.push(`/routine`);
            }
            setIsTimerRunning(false);
        }
    };

    // 이전 세트로 이동
    const goToPreviousSet = () => {
        if (currentSetIndex > 0) {
            setCurrentSetIndex(currentSetIndex - 1);
        } else if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
            const prevExercise = healthList[currentExerciseIndex - 1];
            setCurrentSetIndex(prevExercise.health_set_list.length - 1);
        }
    };

    // 다음 세트로 이동
    const goToNextSet = () => {
        if (currentSetIndex < currentExercise.health_set_list.length - 1) {
            setCurrentSetIndex(currentSetIndex + 1);
        } else if (currentExerciseIndex < healthList.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setCurrentSetIndex(0);
        }
    };

    // 특정 운동으로 이동
    const goToExercise = (index) => {
        setCurrentExerciseIndex(index);
        setCurrentSetIndex(0);
    };


    if (isLoading) {
        return <LoadingDiv />;
    }

    if (error) {
        return <ErrorDiv error={error} />;
    }

    if (!routine || healthList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="bg-gray-800 p-8 rounded-xl shadow-md text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold mb-2">루틴 데이터를 찾을 수 없습니다</h2>
                    <p className="text-gray-400 mb-6">루틴 정보가 없거나 운동이 추가되지 않았습니다.</p>
                    <button 
                        onClick={() => router.push('/routine')}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        루틴 목록으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
                {/* 헤더 */}
                <div className="flex justify-between items-center mb-6">
                    <div className="w-6"></div>
                    <h1 className="text-2xl font-bold text-center text-white">
                        {routine.name}
                    </h1>
                    <div className="w-6"></div> {/* 균형을 위한 빈 공간 */}
                </div>
                
                <PulseLine />
                
                
                {/* 타이머 */}
                <StartTimerDiv timer={timer} setTimer={setTimer} isTimerRunning={isTimerRunning} setIsTimerRunning={setIsTimerRunning} />

                {/* 진행 상태 */}
                <StartProcessComponent healthList={healthList} completedSets={completedSets} />
                
                {/* 현재 운동 정보 */}
                <StartHealthInfoComponent currentExercise={currentExercise} currentSetIndex={currentSetIndex} completedSets={completedSets} currentExerciseIndex={currentExerciseIndex} />
               
                
                {/* 네비게이션 버튼 */}
                <div className="flex justify-between items-center mb-8">
                    <button 
                        onClick={goToPreviousSet}
                        className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center"
                    >
                        👈 이전
                    </button>
                    
                    <button 
                        onClick={completeSet}
                        className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                    >
                        {completedSets[currentExerciseIndex]?.[currentSetIndex] ? "완료됨" : "세트 완료"}
                    </button>
                    
                    <button 
                        onClick={goToNextSet}
                        className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center"
                    >
                        다음 👉
                    </button>
                </div>
                
                {/* 운동 목록 */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-white mb-4">운동 목록</h3>
                    <div className="space-y-3">
                        {healthList.map((health, index) => {
                            // 이 운동의 모든 세트가 완료되었는지 확인
                            const isCompleted = health.health_set_list.every((_, setIndex) => 
                                completedSets[index]?.[setIndex]
                            );
                            
                            // 이 운동의 완료된 세트 수
                            const completedSetsCount = health.health_set_list.filter((_, setIndex) => 
                                completedSets[index]?.[setIndex]
                            ).length;
                            
                            return (
                                <div 
                                    key={health.health_id || index}
                                    onClick={() => goToExercise(index)}
                                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                                        currentExerciseIndex === index 
                                            ? "bg-black text-white" 
                                            : isCompleted 
                                                ? "bg-gray-700 text-gray-500" 
                                                : "bg-gray-700 hover:bg-gray-600"
                                    }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="font-medium text-white">
                                                {index + 1}. {health.name || "운동 이름 없음"}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {completedSetsCount}/{health.health_set_list.length} 세트 완료
                                            </div>
                                        </div>
                                        <div className={`w-3 h-3 rounded-full ${
                                            isCompleted 
                                                ? "bg-green-500" 
                                                : completedSetsCount > 0 
                                                    ? "bg-yellow-500" 
                                                    : "bg-gray-500"
                                        }`}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(RoutineStartPage);
