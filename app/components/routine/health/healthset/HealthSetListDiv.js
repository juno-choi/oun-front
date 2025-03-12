import InputField from "@/app/components/common/InputField";

export default function HealthSetListDiv({health, setHealth}) {
    return (
        <div className="w-full">
            {health.health_set_list.map((healthSet, index) => (
                <div className="flex gap-2 p-4 border-2 border-black rounded-md mb-2" key={index}>
                    <InputField 
                        label="세트 번호"
                        value={healthSet.set_number}
                        onChange={(e) => setHealth({...health, health_set_list: health.health_set_list.map((set, i) => i === index ? {...set, set_number: e.target.value} : set)})}
                        type="number"
                        placeholder="세트 번호"
                        disabled={true}
                    />
                    <InputField 
                        label="횟수"
                        value={healthSet.set_count}
                        onChange={(e) => setHealth({...health, health_set_list: health.health_set_list.map((set, i) => i === index ? {...set, set_count: e.target.value} : set)})}
                        placeholder="10"
                        type="number"
                    />
                    <InputField 
                        label="무게 (kg)"
                        value={healthSet.set_weight}
                        onChange={(e) => setHealth({...health, health_set_list: health.health_set_list.map((set, i) => i === index ? {...set, set_weight: e.target.value} : set)})}
                        placeholder="10"
                        type="number"
                    />
                    <InputField 
                        label="시간 (s)"
                        value={healthSet.set_time}
                        onChange={(e) => setHealth({...health, health_set_list: health.health_set_list.map((set, i) => i === index ? {...set, set_time: e.target.value} : set)})}
                        placeholder="10"
                        type="number"
                    />
                    <InputField 
                        label="속도 (km/h)"
                        value={healthSet.set_speed}
                        onChange={(e) => setHealth({...health, health_set_list: health.health_set_list.map((set, i) => i === index ? {...set, set_speed: e.target.value} : set)})}
                        placeholder="10"
                        type="number"
                    />
                    <InputField 
                        label="거리 (km/h)"
                        value={healthSet.set_distance}
                        onChange={(e) => setHealth({...health, health_set_list: health.health_set_list.map((set, i) => i === index ? {...set, set_distance: e.target.value} : set)})}
                        placeholder="10"
                        type="number"
                    />
                    <InputField 
                        label="설명"
                        value={healthSet.description}
                        onChange={(e) => setHealth({...health, health_set_list: health.health_set_list.map((set, i) => i === index ? {...set, description: e.target.value} : set)})}
                        placeholder="설명"
                    />
                    <InputField 
                        label="업데이트 시간"
                        value={healthSet.updated_at}
                        onChange={(e) => setHealth({...health, health_set_list: health.health_set_list.map((set, i) => i === index ? {...set, set_updated_at: e.target.value} : set)})}
                        disabled={true}
                    />
                </div>
            ))}
        </div>
    );
}