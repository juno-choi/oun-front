"use client";
import { useRouter } from 'next/navigation';

export default function LeftFixButton() {
  const router = useRouter();

  return (
    // 버튼이 항상 위에 있도록 설정
    <div className="fixed">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 px-4 py-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg transition-colors duration-200"
        aria-label="뒤로 가기"
      >
        🔙
      </button>
      {/* 홈버튼 추가해 */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-16 px-4 py-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg transition-colors duration-200"
        aria-label="홈으로 가기"
      >
        🏠
      </button>

    </div>
  );
}
