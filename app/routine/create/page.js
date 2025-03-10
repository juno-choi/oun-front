"use client";
import { useState } from 'react';
import withAuth from '@/app/components/auth/withAuth';
import RoutineCreateButton from '@/app/components/routine/RoutineCreateButton';
import InputField from '@/app/components/common/InputField';
import TextAreaField from '@/app/components/common/TextAreaField';
import RoutineSelect from '@/app/components/routine/RoutineSelect';
function RoutineCreatePage() {
  const [routineData, setRoutineData] = useState({
    name: '',
    description: '',
    days: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoutineData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const daysOptions = [
    { value: 'MONDAY', label: '월' },
    { value: 'TUESDAY', label: '화' },
    { value: 'WEDNESDAY', label: '수' },
    { value: 'THURSDAY', label: '목' },
    { value: 'FRIDAY', label: '금' },
    { value: 'SATURDAY', label: '토' },
    { value: 'SUNDAY', label: '일' }
  ];


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

          <RoutineSelect  
            label="루틴 요일"
            name="days"
            value={routineData.days}
            onChange={handleChange}
            options={daysOptions}
            required
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