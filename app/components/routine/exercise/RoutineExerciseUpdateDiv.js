import axios from "@/app/util/axios";
import { useEffect, useState } from "react";
import InputField from "@/app/components/common/InputField";
import TextAreaField from "@/app/components/common/TextAreaField";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import RoutineSelect from "../RoutineSelect";

export default function RoutineExerciseUpdateDiv({routineId, exerciseList, setExerciseList}) {

    useEffect(() => {
        const fetchExerciseList = async () => {
            try {
                const response = await axios.get(`/api/routine/exercise?routine_id=${routineId}`);
                const updatedExerciseList = response.data.data.exercise_list.map(exercise => ({
                    ...exercise,
                    id: exercise.id || `exercise-${exercise.sort}`
                }));
                setExerciseList(updatedExerciseList);
            } catch (error) {
                console.error("운동 목록 조회 실패:", error);
            }
        };
        fetchExerciseList();
    }, [routineId]);

    // 드래그 앤 드롭 종료 후 실행되는 함수
    const onDragEnd = (result) => {
        // 드롭 위치가 없거나 시작 위치와 같으면 아무 작업도 하지 않음
        if (!result.destination || result.destination.index === result.source.index) {
            return;
        }

        // 항목 순서 재정렬
        const items = Array.from(exerciseList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // 각 항목의 sort 값을 인덱스 + 1로 업데이트
        const updatedItems = items.map((item, index) => ({
            ...item,
            sort: index + 1
        }));

        // 상태 업데이트
        setExerciseList(updatedItems);
    };

    // 입력 필드 변경 핸들러
    const handleInputChange = (id, field, value) => {
        setExerciseList(prev => 
            prev.map(item => 
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const exerciseTypeOptions = [
        { value: 'WEIGHT', label: '웨이트(맨몸)' },
        { value: 'CARDIO', label: '유산소' },
    ];

    // 운동 삭제 핸들러
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const handleDeleteExercise = (id) => {
        setExerciseList(prev => prev.filter(item => item.id !== id));
        setDeleteConfirm(null);
    };

    const showDeleteConfirm = (id) => {
        setDeleteConfirm(id);
    };

    const cancelDelete = () => {
        setDeleteConfirm(null);
    };

    return (
        <div className="w-full">
            {exerciseList.length === 0 ? (
                <div className="flex justify-center items-center h-24 text-gray-500">
                    운동을 추가해주세요
                </div>
            ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="exercise-list">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`space-y-4 ${snapshot.isDraggingOver ? "bg-gray-100 dark:bg-gray-700 rounded-lg p-2" : ""}`}
                            >
                                {exerciseList.map((exercise, index) => (
                                    <Draggable 
                                        key={exercise.id || `exercise-${index}`} 
                                        draggableId={String(exercise.id || `exercise-${index}`)} 
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-all duration-300 ${snapshot.isDragging ? "opacity-70 shadow-md" : ""}`}
                                            >
                                                <div className="relative p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                                                    {/* 드래그 핸들 */}
                                                    <div 
                                                        {...provided.dragHandleProps}
                                                        className="absolute left-3 top-6 text-gray-500 dark:text-gray-400 cursor-move flex items-center justify-center h-full"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                                            <polyline points="19 12 12 19 5 12"></polyline>
                                                        </svg>
                                                    </div>

                                                    {/* 운동 내용 */}
                                                    <div className="pl-10">
                                                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                                                            <h3 className="text-lg font-semibold text-black dark:text-white">
                                                                {exercise.name || `운동 ${index + 1}`}
                                                            </h3>
                                                            
                                                            {/* 삭제 버튼 */}
                                                            <button 
                                                                onClick={() => showDeleteConfirm(exercise.id)}
                                                                className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                                                                aria-label="운동 삭제"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M3 6h18"></path>
                                                                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                                                                    <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                                                                </svg>
                                                            </button>
                                                            
                                                            {/* 삭제 확인 모달 */}
                                                            {deleteConfirm === exercise.id && (
                                                                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={cancelDelete}>
                                                                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
                                                                        <p className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                                                                            운동 삭제 확인
                                                                        </p>
                                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                                                            정말 이 운동을 삭제하시겠습니까?
                                                                        </p>
                                                                        <div className="flex justify-end space-x-3">
                                                                            <button 
                                                                                onClick={cancelDelete}
                                                                                className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                                                            >
                                                                                취소
                                                                            </button>
                                                                            <button 
                                                                                onClick={() => handleDeleteExercise(exercise.id)}
                                                                                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                                                            >
                                                                                삭제
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <InputField
                                                                label="운동 이름"
                                                                name="name"
                                                                value={exercise.name || ""}
                                                                onChange={(e) => handleInputChange(exercise.id, 'name', e.target.value)}
                                                                placeholder="ex) 스쿼트"
                                                                required
                                                            />  
                                                            <RoutineSelect 
                                                                label="운동 타입"
                                                                name="type"
                                                                value={exercise.type || ""}
                                                                onChange={(e) => handleInputChange(exercise.id, 'type', e.target.value)}
                                                                options={exerciseTypeOptions}
                                                                required
                                                                disabled={exercise.exercise_id > 0}
                                                            />
                                                        </div>
                                                        <div className="mt-4">
                                                            <TextAreaField
                                                                label="운동 설명"
                                                                name="description"
                                                                value={exercise.description || ""}
                                                                onChange={(e) => handleInputChange(exercise.id, 'description', e.target.value)}
                                                                placeholder="ex) 하체 운동"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    );
}
