export default function StartExerciseInfoComponent({ currentExercise, currentSetIndex, completedSets, currentExerciseIndex }) {
    const currentSet = currentExercise?.exercise_set_list[currentSetIndex];
    
    return (
        <div className="bg-gray-700 rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
                {currentExercise.name || "운동 이름 없음"}
            </h2>
            
            <p className="text-gray-300 mb-4">
                {currentExercise.description || "운동 설명 없음"}
            </p>
            
            {/* 현재 세트 정보 */}
            <div className="mt-6 bg-gray-800 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">
                        세트 {currentSetIndex + 1}/{currentExercise.exercise_set_list.length}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                        completedSets[currentExerciseIndex]?.[currentSetIndex] 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                    }`}>
                        {completedSets[currentExerciseIndex]?.[currentSetIndex] ? "완료" : "진행 중"}
                    </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {currentExercise.type === 'WEIGHT' && (
                        <>
                            <div className="bg-gray-700 p-3 rounded-lg">
                                <div className="text-sm text-gray-400">무게</div>
                                <div className="text-xl font-bold text-white">{currentSet.weight || 0} kg</div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-lg">
                                <div className="text-sm text-gray-400">횟수</div>
                                <div className="text-xl font-bold text-white">{currentSet.count || 0} 회</div>
                            </div>
                        </>
                    )}
                    
                    {currentExercise.type === 'CARDIO' && (
                        <>
                            <div className="bg-gray-700 p-3 rounded-lg">
                                <div className="text-sm text-gray-400">시간</div>
                                <div className="text-xl font-bold text-white">{currentSet.time || 0} 초</div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-lg">
                                <div className="text-sm text-gray-400">거리</div>
                                <div className="text-xl font-bold text-white">{currentSet.distance || 0} m</div>
                            </div>
                            <div className="bg-gray-700 p-3 rounded-lg">
                                <div className="text-sm text-gray-400">속도</div>
                                <div className="text-xl font-bold text-white">{currentSet.speed || 0} km/h</div>
                            </div>
                        </>
                    )}
                </div>
                
                {currentSet.description && (
                    <div className="bg-gray-700 p-3 rounded-lg mb-4">
                        <div className="text-sm text-gray-400">메모</div>
                        <div className="text-base">{currentSet.description}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
