import InputField from "@/app/components/common/InputField";
import TextAreaField from "@/app/components/common/TextAreaField";

export default function ExerciseUpdateSubject({exercise, setExercise}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExercise(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const exerciseTypeConvert = {
        "WEIGHT": "웨이트(맨몸)",
        "CARDIO": "유산소",
    }

    return (
        <div className="w-full">
            {exercise && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="운동 이름"
                            name="name"
                            value={exercise.name || ""}
                            onChange={handleChange}
                            placeholder="ex) 스쿼트"
                            required
                        />
                        <InputField
                            label="운동 타입"
                            name="type"
                            value={exerciseTypeConvert[exercise.type] || ""}
                            onChange={handleChange}
                            placeholder="ex) 하체 운동"
                            disabled={true}
                        />
                    </div>
                    <div className="mt-6">
                        <TextAreaField
                            label="운동 설명"
                            name="description"
                            value={exercise.description || ""}
                            onChange={handleChange}
                            placeholder="ex) 하체 운동"
                            required
                        />
                    </div>
                </div>
            )}
        </div>
    );
}