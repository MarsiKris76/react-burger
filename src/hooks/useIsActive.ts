import { useLocation } from 'react-router-dom';

export const useIsActive = (path: string): boolean => {
  const location = useLocation();
  return location.pathname === path;
};
