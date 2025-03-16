import InputField from "@/app/components/common/InputField";
import HealthSetWeightDiv from "@/app/components/routine/exercise/ExerciseSetWeightDiv";
import HealthSetCardio from "@/app/components/routine/exercise/ExerciseSetCardio";
import { useState } from "react";

export default function ExerciseSetListDiv({exercise, setExercise}) {
    if (!exercise || !exercise.exercise_set_list) {
        return <div className="w-full max-w-3xl mx-auto mt-10 mb-10 text-center">데이터를 불러오는 중...</div>;
    }

    const [deleteConfirm, setDeleteConfirm] = useState(null);

    // 세트 삭제 함수
    const handleDeleteSet = (index) => {
        const newExerciseSetList = [...exercise.exercise_set_list];
        newExerciseSetList.splice(index, 1);
        
        // 세트 번호 재정렬
        const updatedExerciseSetList = newExerciseSetList.map((set, idx) => ({
            ...set,
            number: idx + 1
        }));
        
        setExercise({...exercise, exercise_set_list: updatedExerciseSetList});
        setDeleteConfirm(null); // 삭제 확인 모달 닫기
    };

    // 삭제 확인 모달 표시
    const showDeleteConfirm = (index) => {
        setDeleteConfirm(index);
    };

    // 삭제 확인 모달 닫기
    const cancelDelete = () => {
        setDeleteConfirm(null);
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            {exercise.exercise_set_list.length === 0 && (
                <div className="flex justify-center items-center h-24 text-gray-500 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    세트를 추가해주세요
                </div>
            )}
            
            {exercise.exercise_set_list.map((exerciseSet, index) => (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm mb-4 transition-all duration-300" key={index}>
                    {/* 세트 헤더 */}
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-black dark:text-white flex items-center">
                            <span className="bg-black dark:bg-gray-600 text-white rounded-full w-7 h-7 flex items-center justify-center mr-2 text-sm">
                                {index + 1}
                            </span>
                            세트 {index + 1}
                        </h3>
                        
                        {/* 삭제 버튼 */}
                        <button 
                            onClick={() => showDeleteConfirm(index)}
                            className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                            aria-label="세트 삭제"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                                <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                            </svg>
                        </button>
                        
                        {/* 삭제 확인 모달 */}
                        {deleteConfirm === index && (
                            <div className="right-0 top-12 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700 w-64">
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                                    정말 이 세트를 삭제하시겠습니까?
                                </p>
                                <div className="flex justify-end space-x-2">
                                    <button 
                                        onClick={cancelDelete}
                                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        취소
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteSet(index)}
                                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* 세트 내용 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {exercise.type === 'WEIGHT' && (
                            <HealthSetWeightDiv exercise={exercise} exerciseSet={exerciseSet} setExercise={setExercise} index={index} />
                        )}

                        {exercise.type === 'CARDIO' && (
                            <HealthSetCardio exercise={exercise} exerciseSet={exerciseSet} setExercise={setExercise} index={index} />
                        )}
                        
                        <InputField 
                            label="설명"
                            value={exerciseSet.description || ""}
                            onChange={(e) => setExercise({...exercise, exercise_set_list: exercise.exercise_set_list.map((set, i) => i === index ? {...set, description: e.target.value} : set)})}
                            placeholder="세트에 대한 설명을 입력하세요"
                            className="w-full"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}