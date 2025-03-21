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
import StartExerciseInfoComponent from "@/app/components/routine/start/StartExerciseInfoComponent";
import StartExerciseNevigatorComponent from "@/app/components/routine/start/StartExerciseNevigatorComponent";
import StartExerciseListComponent from "@/app/components/routine/start/StartExerciseListComponent";

function RoutineStartPage() {
    const router = useRouter();
    const [routine, setRoutine] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [completedSets, setCompletedSets] = useState({});
    const [exerciseList, setExerciseList] = useState([]);
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
                const routineResponse = await axios.get(`/api/oun/routine/${routineId}`);
                setRoutine(routineResponse.data.data);
                
                // 루틴에 포함된 운동 목록 가져오기
                const exerciseResponse = await axios.get(`/api/oun/routine/exercise?routine_id=${routineId}`);
                
                // 각 운동에 기본 세트 정보 추가
                const exerciseListWithSets = exerciseResponse.data.data.exercise_list.map(exercise => {
                    // 세트 정보가 없는 경우 기본 세트 추가
                    if (!exercise.exercise_set_list || exercise.exercise_set_list.length === 0) {
                        return {
                            ...exercise,
                            exercise_set_list: [
                                { set_number: 1, set_weight: 0, set_count: 0, set_time: 0, set_distance: 0, description: "" }
                            ]
                        };
                    }
                    return exercise;
                });
                
                setExerciseList(exerciseListWithSets);
                
                // 완료된 세트 초기화
                const initialCompletedSets = {};
                exerciseListWithSets.forEach((exercise, exerciseIndex) => {
                    initialCompletedSets[exerciseIndex] = {};
                    exercise.exercise_set_list.forEach((set, setIndex) => {
                        initialCompletedSets[exerciseIndex][setIndex] = false;
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
        if (currentSetIndex < currentExercise.exercise_set_list.length - 1) {
            // 다음 세트로 이동
            setCurrentSetIndex(currentSetIndex + 1);
            return ;
        } else if (currentExerciseIndex < exerciseList.length - 1) {
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

    // 현재 운동 및 세트 정보
    const currentExercise = exerciseList[currentExerciseIndex];

    // 이전 세트로 이동
    const goToPreviousSet = () => {
        if (currentSetIndex > 0) {
            setCurrentSetIndex(currentSetIndex - 1);
        } else if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
            const prevExercise = exerciseList[currentExerciseIndex - 1];
            setCurrentSetIndex(prevExercise.exercise_set_list.length - 1);
        }
    };

    // 다음 세트로 이동
    const goToNextSet = () => {
        if (currentSetIndex < currentExercise.exercise_set_list.length - 1) {
            setCurrentSetIndex(currentSetIndex + 1);
        } else if (currentExerciseIndex < exerciseList.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setCurrentSetIndex(0);
        }
    };

    if (isLoading) {
        return <LoadingDiv />;
    }

    if (error) {
        return <ErrorDiv error={error} />;
    }

    if (!routine || exerciseList.length === 0) {
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
                <StartProcessComponent exerciseList={exerciseList} completedSets={completedSets} />
                
                {/* 현재 운동 정보 */}
                <StartExerciseInfoComponent currentExercise={currentExercise} currentSetIndex={currentSetIndex} completedSets={completedSets} currentExerciseIndex={currentExerciseIndex} />
               
                {/* 네비게이션 버튼 */}
                <StartExerciseNevigatorComponent completeSet={completeSet} goToPreviousSet={goToPreviousSet} goToNextSet={goToNextSet} completedSets={completedSets} currentExerciseIndex={currentExerciseIndex} currentSetIndex={currentSetIndex} />
                
                {/* 운동 목록 */}
                <StartExerciseListComponent exerciseList={exerciseList} completedSets={completedSets} currentExerciseIndex={currentExerciseIndex} setCurrentExerciseIndex={setCurrentExerciseIndex} setCurrentSetIndex={setCurrentSetIndex} />
            </div>
        </div>
    );
}

export default withAuth(RoutineStartPage);
