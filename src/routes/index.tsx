import { useRoutes } from 'react-router-dom';
import { MainRoutes } from './MainRoutes';
import { AdminRoutes } from './AdminRoutes';

export default function ThemeRoutes() {
  return useRoutes([
    ...MainRoutes(),
    ...AdminRoutes(),
  ]);
}