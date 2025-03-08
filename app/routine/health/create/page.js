"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import withAuth from '@/app/components/auth/withAuth';
import InputField from '@/app/components/common/InputField';
import TextAreaField from '@/app/components/common/TextAreaField';
import HealthCreateButton from '@/app/components/routine/health/HealthCreateButton';

function HealthCreatePage() {
  const searchParams = useSearchParams();
  const routineId = searchParams.get('routine_id');
  const sort = searchParams.get('sort');
  const [healthData, setHealthData] = useState({
    routine_id: routineId,
    sort: sort,
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHealthData({ ...healthData, [name]: value });
  };

  useEffect(() => {
    if (!routineId) {
      // routine_id가 없는 경우 처리 (예: 이전 페이지로 리다이렉트)
      console.error('Routine ID is missing');
      // router.push('/routine/create');
      return;
    }

  }, [routineId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">💪 운동 추가하기</h1>
        <div>
          <form className="space-y-6">
            <InputField
              label="운동 이름"
              name="name"
              value={healthData.name}
              onChange={handleChange}
              placeholder="ex) 스쿼트"
              required
            />

            <InputField
              label="운동 순서"
              name="sort"
              value={healthData.sort}
              onChange={handleChange}
              placeholder="ex) 1"
              required
              disabled={true}
            />

            <TextAreaField
              label="운동 설명"
              name="description"
              value={healthData.description}
              onChange={handleChange}
              placeholder="ex) 엉덩이를 뒤로 내보내면서 천천히 올라오며 땅끝을 밀어내듯이 올라오자!"
              required
            />

            <HealthCreateButton healthData={healthData} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default withAuth(HealthCreatePage);

