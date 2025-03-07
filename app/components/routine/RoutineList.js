"use client";
import { useState, useEffect } from 'react';
import axios from '@/app/util/axios';
import { useRouter } from 'next/navigation';
import DateDisplay from '@/app/components/util/DateDisplay';

export default function RoutineList() {
  const [routineList, setRoutineList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchRoutineList = async () => {
      try {
        setIsLoading(true);
        const descriptionLengthMaxLimit = 20;
        const response = await axios.get('/api/routine');
        // 반환 데이터에서 routine의 description이 100자 이상인 경우 ... 처리
        const updatedRoutineList = response.data.data.routine_list.map(routine => ({
          ...routine,
          description: routine.description.length > descriptionLengthMaxLimit ? routine.description.slice(0, descriptionLengthMaxLimit) + '...' : routine.description
        }));
        setRoutineList(updatedRoutineList);
      } catch (error) {
        console.error('루틴 목록 가져오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoutineList();
  }, []);
  
  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  if (!routineList || routineList.length === 0) {
    return <div className="text-center">루틴이 없습니다.</div>;
  }
  
  return (
    <div>
      {routineList.map((routine) => (
      <div 
        key={routine.routine_id} 
        className="relative px-10 py-6 text-white bg-black hover:bg-gray-900 rounded-lg transition-colors duration-200 ease-in-out w-80 mb-4 cursor-pointer"
        onClick={() => router.push(`/routine/detail?routine_id=${routine.routine_id}`)}
      >
          <h2 className="text-2xl font-bold mb-2">
            {routine.name}
          </h2>
          <p className="text-sm mb-8">{routine.description}</p>
          <DateDisplay dateTimeString={routine.created_at} className="text-xs text-gray-500" />
        </div>
      ))}
    </div>
  );
}

