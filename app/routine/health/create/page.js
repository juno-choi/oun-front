"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import withAuth from '@/app/components/auth/withAuth';

function HealthCreatePage() {
  const searchParams = useSearchParams();
  const routineId = searchParams.get('routine_id');
  const [healthData, setHealthData] = useState({
    routineId: routineId,
    // 여기에 필요한 health 데이터 필드 추가
  });

  useEffect(() => {
    if (!routineId) {
      // routine_id가 없는 경우 처리 (예: 이전 페이지로 리다이렉트)
      console.error('Routine ID is missing');
      // router.push('/routine/create');
      return;
    }

    // routineId를 이용한 초기 데이터 로드나 다른 작업 수행
    console.log('Routine ID:', routineId);
  }, [routineId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">💪 운동 추가하기</h1>
        
        {/* 여기에 운동 추가 폼 구현 */}
        <div>
          <p>Routine ID: {routineId}</p>
          {/* 운동 추가 폼 컴포넌트들 */}
        </div>
      </div>
    </div>
  );
}

export default withAuth(HealthCreatePage);

