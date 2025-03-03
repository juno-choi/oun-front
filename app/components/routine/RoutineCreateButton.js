"use client";  // 👈 클라이언트 컴포넌트 설정
import axios from "@/app/util/axios";
import { useRouter } from 'next/navigation';

export default function RoutineCreateButton({ routineData }) {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token'))
        ?.split('=')[1];

        // response로 받은 routine id값 넘겨야함.
        const response = await axios.post("/api/routine", routineData, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const routineId = response.data.data.routineId;

      // 성공 시 health 페이지로 이동
      router.push(`/routine/health/create?routine_id=${routineId}`);
    } catch (error) {
      console.error("루틴 생성 실패:", error);
      alert("루틴 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <button
      type="submit"
      className="w-full px-8 py-4 text-lg font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out"
      onClick={handleSubmit}
    >
      루틴 만들기
    </button>
  );
}