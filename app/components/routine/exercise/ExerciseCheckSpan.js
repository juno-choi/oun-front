export default function ExerciseCheckSpan({exercise_set_list}) {
    return (
        <div className="w-full mt-4">
            <div className="flex flex-row justify-between items-center">
                {console.log(exercise_set_list)}
                {exercise_set_list.length === 0 && (
                    <span className="text-sm text-red-500">세트를 추가해 주세요 👆</span>
                )}
            </div>
        </div>
    );
}
