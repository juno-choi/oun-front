"use client";  // 👈 클라이언트 컴포넌트 설정
import axios from "@/app/util/axios";

export default function TestButton() {
  const handleTest = async () => {
    console.log("TestButton 클릭");
    const response = await axios.get("/user/auth/unauthorized");
  };

  return (
    <button
      style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      onClick={handleTest}
    >
      Test 버튼
    </button>
  );
}