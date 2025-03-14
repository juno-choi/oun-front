import InputField from "@/app/components/common/InputField";

export default function HealthSetCardio({health, healthSet, setHealth, index}) {
    return (
        <>
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
                label="거리 (m)"
                value={healthSet.set_distance}
                onChange={(e) => setHealth({...health, health_set_list: health.health_set_list.map((set, i) => i === index ? {...set, set_distance: e.target.value} : set)})}
                placeholder="10"
                type="number"
            />
        </>
    );
}