export default function HealthAddButton({health, setHealth}) {
    const newHealthSet = {
        set_number: health.health_set_list.length + 1,
        set_count: 0,
        set_weight: 0,
        set_time: 0,
        set_speed: 0,
        set_distance: 0,
        description: "",
        health_type: health.health_type,
    }

    const addHealthSet = () => {
        setHealth({...health, health_set_list: [...health.health_set_list, newHealthSet]});
    }

    return (
        <button onClick={addHealthSet} className="px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out w-64">
            + 세트 추가
        </button>
        
    );
}