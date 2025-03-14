import InputField from "@/app/components/common/InputField";
import HealthSetWeightDiv from "@/app/components/routine/health/healthset/HealthSetWeightDiv";
import HealthSetCardio from "@/app/components/routine/health/healthset/HealthSetCardio";

export default function HealthSetListDiv({health, setHealth}) {
    return (
        <div className="w-full mt-10 mb-10">
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
                    {health.health_type === 'WEIGHT' && (
                        <HealthSetWeightDiv health={health} healthSet={healthSet} setHealth={setHealth} index={index} />
                    )}

                    {health.health_type === 'CARDIO' && (
                        <HealthSetCardio health={health} healthSet={healthSet} setHealth={setHealth} index={index} />
                    )}
                    
                    <InputField 
                        label="설명"
                        value={healthSet.description}
                        onChange={(e) => setHealth({...health, health_set_list: health.health_set_list.map((set, i) => i === index ? {...set, description: e.target.value} : set)})}
                        placeholder="설명"
                    />
                </div>
            ))}
        </div>
    );
}