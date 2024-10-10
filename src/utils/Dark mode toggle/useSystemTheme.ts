// hooks/useSystemTheme.ts
import { RootState } from '@/Redux/api/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSystemTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    // Function to apply the theme based on system preference
    const applySystemTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    };

    if (theme === 'system') {
      // Apply the system preference on load
      applySystemTheme();

      // Listen for changes in system theme preference
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applySystemTheme();

      mediaQuery.addEventListener('change', handleChange);

      // Cleanup listener on unmount
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Apply light or dark mode based on the user's manual selection
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, dispatch]);
};
