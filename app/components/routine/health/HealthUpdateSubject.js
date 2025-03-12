import InputField from "@/app/components/common/InputField";
import TextAreaField from "@/app/components/common/TextAreaField";

export default function HealthUpdateSubject({health, setHealth}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHealth(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="w-full max-w-md">
            {health && (
                <div>
                    
                    <InputField
                        label="운동 이름"
                        name="name"
                        value={health.name}
                        onChange={handleChange}
                        placeholder="ex) 스쿼트"
                        required
                    />
                    <TextAreaField
                        label="운동 설명"
                        name="description"
                        value={health.description}
                        onChange={handleChange}
                        placeholder="ex) 하체 운동"
                        required
                    />
                </div>
            )}
        </div>
    );
}