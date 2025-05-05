import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface Props {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {
    const token = useAppSelector((state) => state.auth.isAuthenticated);
    return token ? children : <Navigate to="/admin/login" replace />;
};