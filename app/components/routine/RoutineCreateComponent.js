import { useRouter } from 'next/navigation';

export default function RoutineCreateComponent() {
    const router = useRouter();

  return (
    <div 
        onClick={() => router.push(`/routine/create`)}
        className="relative px-6 py-4 text-white bg-black hover:bg-gray-900 rounded-lg transition-colors duration-200 ease-in-out mb-4 cursor-pointer mb-2"
    >
        <h2 className="text-lg text-center font-bold mb-3 pr-10">
        루틴을 만들어 보세요 👆
        </h2>
    </div>
  );
}