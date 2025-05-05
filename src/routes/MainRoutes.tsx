import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { MainLayout } from '../layouts/blog/MainLayout';

const About = lazy(() => import('../pages/blog/About/About'));

const NotFound = lazy(() => import('../pages/blog/NotFound'));

export const MainRoutes = (): RouteObject[] => [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <About />, },
            { path: 'about', element: <About /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];