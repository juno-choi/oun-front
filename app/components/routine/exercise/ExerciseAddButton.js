export default function ExerciseAddButton({exercise, setExercise}) {
    const newExerciseSet = {
        number: exercise.exercise_set_list.length + 1,
        count: 0,
        weight: 0,
        time: 0,
        speed: 0,
        distance: 0,
        description: "",
        exercise_type: exercise.type,
    }

    const addExerciseSet = () => {
        setExercise({...exercise, exercise_set_list: [...exercise.exercise_set_list, newExerciseSet]});
    }

    return (
        <div className="flex flex-col items-center mt-6 mb-10">
            <button 
                onClick={addExerciseSet} 
                className="group relative px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 ease-in-out w-64 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
            >
                <span className="inline-block mr-2 text-xl">+</span>
                <span>세트 추가</span>
                <span className="absolute -bottom-6 left-0 right-0 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                    클릭하여 새 세트 추가
                </span>
            </button>
            
            {exercise.exercise_set_list.length === 0 && (
                <div className="mt-8 p-4 rounded-lg text-center max-w-md">
                    <div className="mt-2 text-2xl animate-bounce">👆</div>
                    <p className="text-gray-600 dark:text-gray-300">
                        위 버튼을 클릭하여 첫 번째 세트를 추가해보세요!
                    </p>
                </div>
            )}
        </div>
    );
}