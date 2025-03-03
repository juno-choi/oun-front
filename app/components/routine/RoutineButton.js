"use client";  // 👈 클라이언트 컴포넌트 설정
import axios from "@/app/util/axios";

export default function TestButton() {
  const handleRoutine = async () => {
    console.log("RoutineButton 클릭");

    const data = {
        name: "월요일 루틴",
        description: "하체 부시는 날"
    }

    // header에 access_token 포함
    // access_token 쿠키에서 가져오기
    const accessToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token'))
      ?.split('=')[1];

    console.log(accessToken);
    const response = await axios.post("/api/routine", data, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
  };

  return (
    <button
      style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      onClick={handleRoutine}
    >
      routine 생성 버튼
    </button>
  );
}