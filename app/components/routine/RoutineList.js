"use client";
import { useState, useEffect, useRef } from 'react';
import axios from '@/app/util/axios';
import { useRouter } from 'next/navigation';
import DateDisplay from '@/app/components/util/DateDisplay';
import RoutineDeleteButton from '@/app/components/routine/RoutineDeleteButton';
import RoutineCreateComponent from '@/app/components/routine/RoutineCreateComponent';

// 요일 매핑 객체

export default function RoutineList() {
  const [isLoading, setIsLoading] = useState(true);
  const [routineList, setRoutineList] = useState([]);
  const sliderRef = useRef(null);
  const router = useRouter();

  // 루틴 목록 가져오기
  const fetchRoutineList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/routine");
      const routineList = response.data.data.routine_list;
      setRoutineList(routineList);

    } catch (error) {
      console.error("루틴 목록 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const routineMoveDetail = (routineId) => {
    router.push(`/routine/detail?routine_id=${routineId}`);
  }

  useEffect(() => {
    fetchRoutineList();
  }, []);


  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }
  
  // 루틴 카드 렌더링 함수
  const renderRoutineCard = (routine) => (
    <div 
      key={routine.routine_id} 
      className="relative px-6 py-4 text-white bg-black hover:bg-gray-900 rounded-lg transition-colors duration-200 ease-in-out mb-4 cursor-pointer"
      onClick={() => routineMoveDetail(routine.routine_id)}
    >
      <h2 className="text-lg font-bold mb-3 pr-10">
        {routine.name}
      </h2>
      <p className="text-base mb-5 text-gray-300">{routine.description}</p>
      <DateDisplay dateTimeString={routine.created_at} className="text-xs text-gray-400" />
      
        {/* 삭제 버튼 */}
        <RoutineDeleteButton routineId={routine.routine_id} fetchRoutineList={fetchRoutineList} />
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto" ref={sliderRef}>
      
      {/* 선택된 요일의 루틴 목록 */}
      <div className="mt-6 transition-opacity duration-300 px-2">
        <div className="space-y-6">
          <RoutineCreateComponent />
          {routineList.length > 0 ? (
            routineList.map(routine => renderRoutineCard(routine))
          ) : (
            <div className="text-center text-gray-400">루틴이 비었어요 👆 버튼을 눌러 루틴을 만들어 보세요!</div>
          )}
        </div>
      </div>
    </div>
  );
}

