import InputField from "@/app/components/common/InputField";
import TextAreaField from "@/app/components/common/TextAreaField";

export default function RoutineUpdateDiv({routine, setRoutine}) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoutine(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="w-full">
            <div className="gap-6">
                <InputField
                    label="루틴 이름"
                    name="name"
                    value={routine.name || ""}
                    onChange={handleChange}
                    placeholder="ex) 월요일 루틴"
                    required
                />
            </div>
            
            <div className="mt-6">
                <TextAreaField
                    label="루틴 설명"
                    name="description"
                    value={routine.description || ""}
                    onChange={handleChange}
                    placeholder="ex) 하체 운동 루틴"
                    required
                />
            </div>
        </div>
    );
}
