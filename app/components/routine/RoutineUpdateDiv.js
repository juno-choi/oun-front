import InputField from "@/app/components/common/InputField";
import TextAreaField from "@/app/components/common/TextAreaField";
import axios from "@/app/util/axios";
import { useEffect } from "react";
export default function RoutineUpdateDiv({routineId, routine, setRoutine}) {

    useEffect(() => {
        const fetchRoutine = async () => {
            const response = await axios.get(`/api/routine/${routineId}`);
            setRoutine(response.data.data);
        };
        fetchRoutine();
    }, [routineId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoutine(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">🏃 루틴 수정</h1>
            <InputField
                label="루틴 이름"
                name="name"
                value={routine.name}
                onChange={handleChange}
                placeholder="ex) 월요일 루틴"
                required
            />
            <TextAreaField
                label="루틴 설명"
                name="description"
                value={routine.description}
                onChange={handleChange}
                placeholder="ex) 하체 운동 루틴"
                required
            />
        </div>
    );
}
