import InputField from "@/app/components/common/InputField";

export default function ExerciseSetCardio({exercise, exerciseSet, setExercise, index}) {
    return (
        <>
            <InputField 
                label="시간 (s)"
                value={exerciseSet.time}
                onChange={(e) => setExercise({...exercise, exercise_set_list: exercise.exercise_set_list.map((set, i) => i === index ? {...set, time: e.target.value} : set)})}
                placeholder="10"
                type="number"
            />
            <InputField 
                label="속도 (km/h)"
                value={exerciseSet.speed}
                onChange={(e) => setExercise({...exercise, exercise_set_list: exercise.exercise_set_list.map((set, i) => i === index ? {...set, speed: e.target.value} : set)})}
                placeholder="10"
                type="number"
            />
            <InputField 
                label="거리 (m)"
                value={exerciseSet.distance}
                onChange={(e) => setExercise({...exercise, exercise_set_list: exercise.exercise_set_list.map((set, i) => i === index ? {...set, distance: e.target.value} : set)})}
                placeholder="10"
                type="number"
            />
        </>
    );
}