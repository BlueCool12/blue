import { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';
import { About } from '../pages/About';
import { MainLayout } from '../layouts/MainLayout';

export const MainRoutes = (): RouteObject[] => [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <Home />, },
            { path: 'about', element: <About /> },
        ],
    },
];