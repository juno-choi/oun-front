export default function HealthAddButton({health, setHealth}) {
    const newHealthSet = {
        set_number: health.health_set_list.length + 1,
        set_count: 0,
        set_weight: 0,
        set_time: 0,
        set_speed: 0,
        set_distance: 0,
        description: "",
        set_updated_at: '',
    }

    const addHealthSet = () => {
        setHealth({...health, health_set_list: [...health.health_set_list, newHealthSet]});
    }

    return (
        <button onClick={addHealthSet}>
            세트 추가
        </button>
    );
}