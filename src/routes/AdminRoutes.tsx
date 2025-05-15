import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { PrivateRoute } from "../components/admin/PrivateRoute";
import { MainLayout } from "../layouts/admin/MainLayout";

const Login = lazy(() => import('../pages/admin/Login'));
const Home = lazy(() => import('../pages/admin/Home'));
const PostList = lazy(() => import('../pages/admin/posts/PostList'))
const Write = lazy(() => import('../pages/admin/posts/Write'));
const Edit = lazy(() => import('../pages/admin/posts/Edit'));



export const AdminRoutes = (): RouteObject[] => [
    {
        path: '/admin/login',
        element: <Login />,
    },
    {
        path: '/admin',
        element: (
            <PrivateRoute>
                <MainLayout />
            </PrivateRoute>
        ),
        children: [
            { path: '', element: <Home /> },
            { path: 'posts', element: <PostList /> },
            { path: 'posts/write', element: <Write /> },
            { path: 'posts/:id/edit', element: <Edit /> },
        ],
    },
];