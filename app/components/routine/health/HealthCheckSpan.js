export default function HealthCheckSpan({health_set_list}) {
    return (
        <div className="w-full mt-4">
            <div className="flex flex-row justify-between items-center">
                {console.log(health_set_list)}
                {health_set_list.length === 0 && (
                    <span className="text-sm">세트를 추가해 주세요 👆</span>
                )}
            </div>
        </div>
    );
}
