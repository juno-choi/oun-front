import axios from "@/app/util/axios";
import { useEffect } from "react";
import InputField from "@/app/components/common/InputField";
import TextAreaField from "@/app/components/common/TextAreaField";

export default function RoutineHealthUpdateDiv({routineId, healthList, setHealthList}) {

    useEffect(() => {
        const fetchHealthList = async () => {
            const response = await axios.get(`/api/routine/health?routine_id=${routineId}`);
            setHealthList(response.data.data.health_list);
        };
        fetchHealthList();
    }, [routineId]);

    return (
        <div>
            {healthList.map((health, index) => (
                <div key={health.id}>
                    <div className="border-2 border-black rounded-md p-4 bg-black mb-2">
                        <InputField
                            label="순서"
                            name="sort"
                            value={index + 1}
                            disabled={true}
                        />
                        <InputField
                            label="이름"
                            name="name"
                            value={health.name}
                            onChange={(e) => setHealthList(prev => prev.map(h => h.id === health.id ? {...h, name: e.target.value} : h))}
                        />
                        <TextAreaField
                            label="설명"
                            name="description"
                            value={health.description}
                            onChange={(e) => setHealthList(prev => prev.map(h => h.id === health.id ? {...h, description: e.target.value} : h))}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
