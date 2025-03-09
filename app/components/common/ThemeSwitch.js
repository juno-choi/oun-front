import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();

  const handleThemeChange = () => {
    if (theme === 'dark') {
      setTheme('system');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const getThemeText = () => {
    if (theme === 'system') {
      return '💻';
    } else if (theme === 'dark') {
      return '🔆';
    } else {
      return '🌙';
    }
  };

  return (
    <button 
      onClick={handleThemeChange}
      className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg bg-white dark:bg-black hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors duration-200"
    >
      {getThemeText()}
    </button>
  );
}