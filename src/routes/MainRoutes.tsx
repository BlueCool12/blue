import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { MainLayout } from '../layouts/user/MainLayout';

const Home = lazy(() => import('../pages/user/Home'));

const About = lazy(() => import('../pages/user/about/About'));

const PostList = lazy(() => import('../pages/user/posts/PostList'));
const PostDetail = lazy(() => import('../pages/user/posts/PostDetail'));

const NotFound = lazy(() => import('../pages/user/NotFound'));

export const MainRoutes = (): RouteObject[] => [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '', element: <Home />, },
            { path: 'about', element: <About /> },
            { path: 'posts', element: <PostList /> },
            { path: 'posts/:slug', element: <PostDetail /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];