export default function StartHealthListComponent({ healthList, completedSets, currentExerciseIndex, setCurrentExerciseIndex, setCurrentSetIndex }) {

    // 특정 운동으로 이동
    const goToExercise = (index) => {
        setCurrentExerciseIndex(index);
        setCurrentSetIndex(0);
    };

    return (
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
    );
}
