import '@/app/globals.css';
import styles from "./layout.module.css";

import { Suspense } from "react";

import { Header } from "@/components/user/Header";
import { Footer } from "@/components/user/Footer";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function UserMainLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <Header />
            <main className={styles.content}>
                <Suspense fallback={<LoadingSpinner />}>
                    {children}
                </Suspense>
            </main>
            <Footer />
        </>
    );
};