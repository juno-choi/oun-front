import InputField from "@/app/components/common/InputField";

export default function ExerciseSetWeightDiv({exercise, exerciseSet, setExercise, index}) {
    return (
        <>
            <InputField 
                label="횟수"
                value={exerciseSet.count}
                onChange={(e) => setExercise({...exercise, exercise_set_list: exercise.exercise_set_list.map((set, i) => i === index ? {...set, count: e.target.value} : set)})}
                placeholder="10"
                type="number"
            />
            <InputField 
                label="무게 (kg)"
                value={exerciseSet.weight}
                onChange={(e) => setExercise({...exercise, exercise_set_list: exercise.exercise_set_list.map((set, i) => i === index ? {...set, weight: e.target.value} : set)})}
                placeholder="10"
                type="number"
            />
        </>
    );
}