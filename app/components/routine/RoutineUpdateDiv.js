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

    const daysMap = {
        MONDAY: '월',
        TUESDAY: '화',
        WEDNESDAY: '수',
        THURSDAY: '목',
        FRIDAY: '금',
        SATURDAY: '토',
        SUNDAY: '일'
    };
    
    return (
        <div className="w-full max-w-md">
            <InputField
                label="루틴 요일"
                name="days"
                value={daysMap[routine.days]}
                onChange={handleChange}
                required
                disabled={true}
            />
            
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
