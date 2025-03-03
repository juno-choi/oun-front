"use client";
import { usePathname } from 'next/navigation';
import BackHistoryButton from '../util/BackHistoryButton';

export default function PageLayout({ children }) {
  const pathname = usePathname();
  
  // 홈페이지('/')에서는 뒤로가기 버튼을 보여주지 않음
  const showBackButton = pathname !== '/';

  return (
    <div className="min-h-screen w-full relative">
      {showBackButton && <BackHistoryButton />}
      {children}
    </div>
  );
} 