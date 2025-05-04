import { RouteObject } from "react-router-dom";
import { MainLayout } from "../layouts/admin/MainLayout";
import { Home } from "../pages/admin/Home";
import { Write } from "../pages/admin/Write";



export const AdminRoutes = (): RouteObject[] => [
    {
        path: '/admin',
        element: <MainLayout />,
        children: [
            { path: '', element: <Home /> },
            { path: 'write', element: <Write /> },
        ],
    },
];