import InputField from "@/app/components/common/InputField";

export default function HealthSetWeightDiv({health, healthSet, setHealth, index}) {
    return (
        <>
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
        </>
    );
}