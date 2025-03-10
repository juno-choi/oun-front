import axios from '@/app/util/axios';

export default function RoutineDeleteButton({ routineId, fetchRoutineList }) {

  // 루틴 삭제 함수
  const handleDeleteRoutine = async (e, routineId) => {
    e.stopPropagation(); // 클릭 이벤트가 부모 요소로 전파되는 것을 방지
    
    if (!confirm("정말로 이 루틴을 삭제하시겠습니까?")) {
      return;
    }
    
    try {
      await axios.delete(`/api/routine/${routineId}`);
      // 삭제 후 목록 다시 불러오기
      fetchRoutineList();
    } catch (error) {
      console.error("루틴 삭제 실패:", error);
      alert("루틴 삭제에 실패했습니다.");
    }
  };

    return (
        <button
          onClick={(e) => handleDeleteRoutine(e, routineId)}
          aria-label="루틴 삭제"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
    )
}
