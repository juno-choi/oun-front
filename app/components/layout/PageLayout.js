"use client";
import { usePathname } from 'next/navigation';
import BackHistoryButton from '@/app/components/util/BackHistoryButton';
import { ThemeProvider } from 'next-themes';
import ThemeSwitch from '@/app/components/common/ThemeSwitch';

export default function PageLayout({ children }) {
  const pathname = usePathname();
  
  // 홈페이지('/')에서는 뒤로가기 버튼을 보여주지 않음
  const showBackButton = pathname !== '/';

  return (
    <div className="p-8 bg-white dark:bg-neutral-900 shadow-lg dark:shadow-gray-900/30  min-h-screen w-full relative">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ThemeSwitch />
        {showBackButton && <BackHistoryButton />}
        {children}
      </ThemeProvider>
    </div>
  );
} 