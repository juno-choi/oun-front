import axios from "@/app/util/axios";
import { useEffect } from "react";
import InputField from "@/app/components/common/InputField";
import TextAreaField from "@/app/components/common/TextAreaField";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function RoutineHealthUpdateDiv({routineId, healthList, setHealthList}) {

    useEffect(() => {
        const fetchHealthList = async () => {
            const response = await axios.get(`/api/routine/health?routine_id=${routineId}`);
            setHealthList(response.data.data.health_list);
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

        // 상태 업데이트
        setHealthList(items);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="health-list">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`${snapshot.isDraggingOver ? "rounded-lg p-2" : ""}`}
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
                                        <div className="border-2 border-black rounded-md p-4 bg-black mb-2 relative">
                                            {/* 드래그 핸들 */}
                                            <div 
                                                {...provided.dragHandleProps}
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white cursor-move"
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                                                </svg>
                                            </div>
                                            
                                            <div className="pl-8">
                                                <InputField
                                                    label="순서"
                                                    name="sort"
                                                    value={index + 1}
                                                    disabled={true}
                                                />
                                                <InputField
                                                    label="이름"
                                                    name="name"
                                                    value={health.name}
                                                    onChange={(e) => setHealthList(prev => prev.map(h => h.id === health.id ? {...h, name: e.target.value} : h))}
                                                />
                                                <TextAreaField
                                                    label="설명"
                                                    name="description"
                                                    value={health.description}
                                                    onChange={(e) => setHealthList(prev => prev.map(h => h.id === health.id ? {...h, description: e.target.value} : h))}
                                                />
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
    );
}
