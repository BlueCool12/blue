import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { PrivateRoute } from "../components/admin/PrivateRoute";
import { MainLayout } from "../layouts/admin/MainLayout";

const Login = lazy(() => import('../pages/admin/Login/Login'));
const Home = lazy(() => import('../pages/admin/Home'));
const Write = lazy(() => import('../pages/admin/Write/Write'));



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
            { path: 'write', element: <Write /> },
        ],
    },
];