import { JSX, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { verifyAuth } from "../../store/authSlice";

interface Props {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: Props) => {
    const dispatch = useAppDispatch();
    const { authChecked, isAuthenticated } = useAppSelector((state) => state.auth);


    useEffect(() => {
        dispatch(verifyAuth());
    }, [dispatch]);

    if (!authChecked) return <LoadingSpinner />;

    return isAuthenticated ? children : <Navigate to="/admin/login" />;
};