"use client";
import { useState } from 'react';
import withAuth from '@/app/components/auth/withAuth';
import axios from "@/app/util/axios";
import { useRouter } from 'next/navigation';
import RoutineCreateButton from '@/app/components/routine/RoutineCreateButton';

function RoutineCreatePage() {
  const [routineData, setRoutineData] = useState({
    name: '',
    description: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoutineData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">🏃 새로운 루틴 만들기</h1>
        
        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              ✅ 루틴 이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={routineData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="ex) 월요일 루틴"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              ✅ 루틴 설명
            </label>
            <textarea
              id="description"
              name="description"
              value={routineData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="ex) 하체 운동 루틴"
            />
          </div>

          <RoutineCreateButton routineData={routineData} />

        </form>
      </div>
    </div>
  );
}

export default withAuth(RoutineCreatePage); 