import InputField from "@/app/components/common/InputField";
import TextAreaField from "@/app/components/common/TextAreaField";
import axios from "@/app/util/axios";
import { useEffect } from "react";
import RoutineSelect from "@/app/components/routine/RoutineSelect";
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

    const daysOptions = [
        { value: 'MONDAY', label: '월' },
        { value: 'TUESDAY', label: '화' },
        { value: 'WEDNESDAY', label: '수' },
        { value: 'THURSDAY', label: '목' },
        { value: 'FRIDAY', label: '금' },
        { value: 'SATURDAY', label: '토' },
        { value: 'SUNDAY', label: '일' }
    ];
    
    return (
        <div className="w-full max-w-md">
            
            <InputField
                label="루틴 이름"
                name="name"
                value={routine.name}
                onChange={handleChange}
                placeholder="ex) 월요일 루틴"
                required
            />
            <RoutineSelect
                label="루틴 요일"
                name="days"
                value={routine.days}
                onChange={handleChange}
                options={daysOptions}
                required
                disabled={true}
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
