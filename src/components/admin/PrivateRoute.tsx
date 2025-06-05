'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyAuth } from "@/lib/auth/authSlice";

import { LoadingSpinner } from "../common/LoadingSpinner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { authChecked, isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {

        if (!authChecked) {
            dispatch(verifyAuth());
        }

    }, [authChecked, dispatch]);

    useEffect(() => {
        if (authChecked && !isAuthenticated) {
            router.replace('/admin/login');
        }
    }, [authChecked, isAuthenticated, router]);

    if (!authChecked || !isAuthenticated) {
        return <LoadingSpinner />;
    }

    return <>{children}</>;
};