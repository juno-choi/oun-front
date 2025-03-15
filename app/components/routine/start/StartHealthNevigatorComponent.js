export default function StartHealthNevigatorComponent({ completeSet, goToPreviousSet, goToNextSet, completedSets, currentExerciseIndex, currentSetIndex }) {


    return (
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
    );
}
