import { RouteObject } from "react-router-dom";

import { PrivateRoute } from "../components/admin/PrivateRoute";
import { MainLayout } from "../layouts/admin/MainLayout";

import { Login } from "../pages/admin/Login";
import { Home } from "../pages/admin/Home";
import { Write } from "../pages/admin/Write";



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