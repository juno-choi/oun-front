"use client";
import { useState } from 'react';
import withAuth from '@/app/components/auth/withAuth';
import RoutineCreateButton from '@/app/components/routine/RoutineCreateButton';
import InputField from '@/app/components/common/InputField';
import TextAreaField from '@/app/components/common/TextAreaField';
import { useSearchParams } from 'next/navigation';

function RoutineCreatePage() {
  const searchParams = useSearchParams();
  const day = searchParams.get('day') || '';

  const [routineData, setRoutineData] = useState({
    name: '',
    description: '',
    days: day
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoutineData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const daysMap = {
    MONDAY: '월',
    TUESDAY: '화',
    WEDNESDAY: '수',
    THURSDAY: '목',
    FRIDAY: '금',
    SATURDAY: '토',
    SUNDAY: '일'
};


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">🏃 새로운 루틴 만들기</h1>
        
        <form className="space-y-6">
          <InputField
            label="루틴 이름"
            name="name"
            value={routineData.name}
            onChange={handleChange}
            placeholder="ex) 월요일 루틴"
            required
          />

          <InputField  
            label="루틴 요일"
            name="days"
            value={routineData.days ? daysMap[routineData.days] : daysMap[day]}
            onChange={handleChange}
            required
            disabled={true}
          />
          <TextAreaField
            label="루틴 설명"
            name="description"
            value={routineData.description}
            onChange={handleChange}
            placeholder="ex) 하체 운동 루틴"
            required
          />

          <RoutineCreateButton routineData={routineData} />
        </form>
      </div>
    </div>
  );
}

export default withAuth(RoutineCreatePage); 