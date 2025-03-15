
export default function StartProcessComponent({ healthList, completedSets }) {

    // 운동 진행률 계산
    const calculateProgress = () => {
        if (healthList.length === 0) return 0;
        
        let totalSets = 0;
        let completedSetsCount = 0;
        
        healthList.forEach((health, healthIndex) => {
            const sets = health.health_set_list.length;
            totalSets += sets;
            
            for (let i = 0; i < sets; i++) {
                if (completedSets[healthIndex]?.[i]) {
                    completedSetsCount++;
                }
            }
        });
        
        return totalSets > 0 ? (completedSetsCount / totalSets) * 100 : 0;
    };


    return (
        <div className="mt-6 mb-8">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">진행률</span>
                <span className="text-sm font-medium text-white">{Math.round(calculateProgress())}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                    className="bg-gray-300 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${calculateProgress()}%` }}
                ></div>
            </div>
        </div>
    );
}
