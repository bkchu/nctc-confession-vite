import { useEffect, useState } from 'react';
import Moon from '~icons/heroicons-outline/moon';
import Sun from '~icons/heroicons-outline/sun';

/**
 * Feel free to place this switcher anywhere in your application.
 * Or - remove it entirely if you don't need a dark mode.
 */
export const DarkModeSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <button
      className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 ring-expand"
      onClick={() => {
        if (document.documentElement.classList.contains('dark')) {
          localStorage.theme = 'light';
          setIsDarkMode(false);

          // for markdown editor
          document.documentElement.setAttribute('data-color-mode', 'light');
        } else {
          localStorage.theme = 'dark';
          setIsDarkMode(true);

          // for markdown editor
          document.documentElement.setAttribute('data-color-mode', 'dark');
        }
        document.documentElement.classList.toggle('dark');
      }}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-slate-200" />
      ) : (
        <Moon className="w-5 h-5 text-slate-800" />
      )}
    </button>
  ) : null;
};
