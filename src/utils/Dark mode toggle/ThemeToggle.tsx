// components/ThemeToggle.tsx
import { RootState } from '@/Redux/api/store';
import { toggleTheme } from '@/Redux/features/Darkmode/themeSlice';
import { useDispatch, useSelector } from 'react-redux';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme()); // Dispatch the toggleTheme action
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-white"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
