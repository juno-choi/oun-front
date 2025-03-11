import axios from "@/app/util/axios";
import { useEffect } from "react";
import InputField from "@/app/components/common/InputField";
import TextAreaField from "@/app/components/common/TextAreaField";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import SideEmptyLine from "@/app/components/common/SideEmptyLine";
import RoutineHealthNewAddButton from "@/app/components/routine/health/RoutineHealthNewAddButton";
import RoutineSelect from "../RoutineSelect";

export default function RoutineHealthUpdateDiv({routineId, healthList, setHealthList}) {

    useEffect(() => {
        const fetchHealthList = async () => {
            const response = await axios.get(`/api/routine/health?routine_id=${routineId}`);
            const updatedHealthList = response.data.data.health_list.map(health => ({
                ...health,
                id: health.id || `health-${health.sort}`
            }));
            setHealthList(updatedHealthList);
        };
        fetchHealthList();
    }, [routineId]);

    // 드래그 앤 드롭 종료 후 실행되는 함수
    const onDragEnd = (result) => {
        // 드롭 위치가 없거나 시작 위치와 같으면 아무 작업도 하지 않음
        if (!result.destination || result.destination.index === result.source.index) {
            return;
        }

        // 항목 순서 재정렬
        const items = Array.from(healthList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // 각 항목의 sort 값을 인덱스 + 1로 업데이트
        const updatedItems = items.map((item, index) => ({
            ...item,
            sort: index + 1
        }));

        // 상태 업데이트
        setHealthList(updatedItems);
    };

    // 입력 필드 변경 핸들러
    const handleInputChange = (id, field, value) => {
        setHealthList(prev => 
            prev.map(item => 
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const healthTypeOptions = [
        { value: 'WEIGHT', label: '웨이트(맨몸)' },
        { value: 'CARDIO', label: '유산소' },
    ];

    return (
        <div className="w-full">
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="health-list">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`${snapshot.isDraggingOver ? "flex flex-col items-center justify-center" : "flex flex-col items-center justify-center"}`}
                        >
                            {healthList.map((health, index) => (
                                <Draggable 
                                    key={health.id || `health-${index}`} 
                                    draggableId={String(health.id || `health-${index}`)} 
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={`mb-4 ${snapshot.isDragging ? "opacity-70" : ""}`}
                                        >
                                            
                                            <div className="p-4 mb-2 relative">
                                                {/* 드래그 핸들 */}
                                                <div 
                                                    {...provided.dragHandleProps}
                                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white cursor-move"
                                                >
                                                    <span role="img" aria-label="drag handle">📍</span>
                                                </div>
                                                {/* 드래그 핸들 */}
                                                <div className="pl-8">
                                                    <InputField
                                                        label="운동 순서"
                                                        name="sort"
                                                        value={health.sort || index + 1}
                                                        disabled={true}
                                                    />
                                                    <InputField
                                                        label="운동 이름"
                                                        name="name"
                                                        value={health.name}
                                                        onChange={(e) => handleInputChange(health.id, 'name', e.target.value)}
                                                    />  
                                                    <RoutineSelect 
                                                        label="운동 타입"
                                                        name="health_type"
                                                        value={health.health_type}
                                                        onChange={(e) => handleInputChange(health.id, 'health_type', e.target.value)}
                                                        options={healthTypeOptions}
                                                        required
                                                    />
                                                    <TextAreaField
                                                        label="운동 설명"
                                                        name="description"
                                                        value={health.description}
                                                        onChange={(e) => handleInputChange(health.id, 'description', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <SideEmptyLine />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            
            {/* 운동 추가 버튼 */}
            <RoutineHealthNewAddButton routineId={routineId} healthList={healthList} setHealthList={setHealthList} />
        </div>
    );
}
