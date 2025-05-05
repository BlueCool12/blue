import { RouteObject } from 'react-router-dom';
import { MainLayout } from '../layouts/blog/MainLayout';

import { About } from '../pages/blog/About';

import { NotFound } from '../pages/blog/NotFound';

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