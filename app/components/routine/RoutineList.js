"use client";
import { useState, useEffect, useRef } from 'react';
import axios from '@/app/util/axios';
import { useRouter } from 'next/navigation';
import DateDisplay from '@/app/components/util/DateDisplay';
import RoutineDeleteButton from '@/app/components/routine/RoutineDeleteButton';
// 요일 매핑 객체
const DAY_MAPPING = {
  MONDAY: { name: "🏃월", order: 1, shortName: "월" },
  TUESDAY: { name: "🏋️화", order: 2, shortName: "화" },
  WEDNESDAY: { name: "🧘‍♀️수", order: 3, shortName: "수" },
  THURSDAY: { name: "🏌️목", order: 4, shortName: "목" },
  FRIDAY: { name: "🏊금", order: 5, shortName: "금" },
  SATURDAY: { name: "🚵토", order: 6, shortName: "토" },
  SUNDAY: { name: "⛹️일", order: 7, shortName: "일" },
  NONE: { name: "미지정", order: 8, shortName: "미지정" }
};

// 요일 순서대로 정렬된 배열
const ORDERED_DAYS = [
  "MONDAY", 
  "TUESDAY", 
  "WEDNESDAY", 
  "THURSDAY", 
  "FRIDAY", 
  "SATURDAY", 
  "SUNDAY", 
];

// 오늘의 요일 가져오기
const getTodayDay = () => {
  const dayIndex = new Date().getDay(); // 0: 일요일, 1: 월요일, ...
  const dayMap = {
    0: "SUNDAY",
    1: "MONDAY",
    2: "TUESDAY",
    3: "WEDNESDAY",
    4: "THURSDAY",
    5: "FRIDAY",
    6: "SATURDAY"
  };
  return dayMap[dayIndex] || "NONE";
};

export default function RoutineList() {
  const [routinesByDay, setRoutinesByDay] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [availableDays, setAvailableDays] = useState([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const sliderRef = useRef(null);
  const router = useRouter();

  // 루틴 목록 가져오기
  const fetchRoutineList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/routine");
      const routineList = response.data.data.routine_list;
      
      // 요일별로 루틴 분류
      const groupedRoutines = {};
      
      // 먼저 모든 요일에 대한 빈 배열 초기화
      ORDERED_DAYS.forEach(day => {
        groupedRoutines[day] = [];
      });
      
      // 루틴을 요일별로 분류
      routineList.forEach(routine => {
        const day = routine.days || "NONE"; // days가 없으면 "NONE"으로 처리
        if (groupedRoutines[day]) {
          groupedRoutines[day].push(routine);
        } else {
          groupedRoutines["NONE"].push(routine);
        }
      });
      
      // 각 요일별 루틴을 생성일 기준으로 정렬 (최신순)
      Object.keys(groupedRoutines).forEach(day => {
        groupedRoutines[day].sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
      });
      
      setRoutinesByDay(groupedRoutines);
      setAvailableDays(ORDERED_DAYS);
      
      // 오늘 요일이 있으면 해당 인덱스로 설정
      const today = getTodayDay();
      const todayIndex = ORDERED_DAYS.indexOf(today);
      if (todayIndex !== -1) {
        setCurrentDayIndex(todayIndex);
      }
    } catch (error) {
      console.error("루틴 목록 조회 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const routineMoveDetail = (routineId) => {
    router.push(`/routine/detail?routine_id=${routineId}`);
  }

  // 이전 요일로 이동
  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  // 다음 요일로 이동
  const goToNextDay = () => {
    if (currentDayIndex < availableDays.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  useEffect(() => {
    fetchRoutineList();
  }, []);

  // 터치 이벤트 처리
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let startX;
    let isDragging = false;

    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;
      
      // 스와이프 방향 감지 (50px 이상 움직였을 때)
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // 왼쪽으로 스와이프 (다음 요일)
          goToNextDay();
        } else {
          // 오른쪽으로 스와이프 (이전 요일)
          goToPreviousDay();
        }
        isDragging = false;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchmove', handleTouchMove);
    slider.addEventListener('touchend', handleTouchEnd);

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart);
      slider.removeEventListener('touchmove', handleTouchMove);
      slider.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentDayIndex, availableDays.length]);

  if (isLoading) {
    return <div className="text-center">로딩 중...</div>;
  }

  // 모든 요일에 루틴이 없는지 확인
  const hasNoRoutines = ORDERED_DAYS.every(day => 
    !routinesByDay[day] || routinesByDay[day].length === 0
  );

  if (hasNoRoutines) {
    return <div className="text-center">루틴이 없습니다.</div>;
  }

  // 현재 선택된 요일
  const selectedDay = availableDays[currentDayIndex];
  
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

  // 루틴 카드 렌더링 함수
  const renderNoRoutineCard = (day) => (
    <div 
      onClick={() => router.push(`/routine/create?day=${day}`)}
      className="relative px-6 py-4 text-white bg-black hover:bg-gray-900 rounded-lg transition-colors duration-200 ease-in-out mb-4 cursor-pointer"
    >
      <h2 className="text-lg font-bold mb-3 pr-10">
        루틴을 만들어 보세요 👆
      </h2>
    </div>
  );
  
  return (
    <div className="w-full max-w-2xl mx-auto" ref={sliderRef}>
      {/* 요일 선택 슬라이더 */}
      <div className="relative mb-8">
        <div className="flex justify-between items-center">
          {/* 이전 버튼 */}
          <button 
            className={`p-3 text-2xl rounded-full ${currentDayIndex > 0 ? 'text-black hover:bg-gray-200' : 'text-gray-300 cursor-not-allowed'}`}
            onClick={goToPreviousDay}
            disabled={currentDayIndex === 0}
          >
            👈
          </button>
          
          {/* 현재 요일 표시 */}
          <div className="text-center flex-1">
            <h2 className="text-2xl font-bold">
              {DAY_MAPPING[selectedDay].name}
            </h2>
            <div className="text-sm text-gray-500 mt-2">
              {currentDayIndex + 1} / {availableDays.length}
            </div>
          </div>
          
          {/* 다음 버튼 */}
          <button 
            className={`p-3 text-2xl rounded-full ${currentDayIndex < availableDays.length - 1 ? 'text-black hover:bg-gray-200' : 'text-gray-300 cursor-not-allowed'}`}
            onClick={goToNextDay}
            disabled={currentDayIndex === availableDays.length - 1}
          >
            👉
          </button>
        </div>
        
        {/* 요일 인디케이터 */}
        <div className="flex justify-center mt-5 space-x-2">
          {availableDays.map((day, index) => (
            <div 
              key={day} 
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentDayIndex ? 'w-6 bg-black' : 'w-3 bg-gray-300'
              }`}
              onClick={() => setCurrentDayIndex(index)}
            ></div>
          ))}
        </div>
      </div>
      
      {/* 선택된 요일의 루틴 목록 */}
      <div className="mt-6 transition-opacity duration-300 px-2">
        <div className="space-y-6">
          {routinesByDay[selectedDay] && routinesByDay[selectedDay].length > 0 ? (
            routinesByDay[selectedDay].map(routine => renderRoutineCard(routine))
          ) : (
            renderNoRoutineCard(selectedDay)
          )}
        </div>
      </div>
    </div>
  );
}

