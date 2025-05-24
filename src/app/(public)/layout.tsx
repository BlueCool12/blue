import '@/app/globals.css';

import styles from "./layout.module.css";
import { Header } from "@/components/user/Header";
import { Footer } from "@/components/user/Footer";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Suspense } from "react";

export default function UserMainLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className={styles.layoutWrapper}>
            <Header />
            <main className={styles.content}>
                <Suspense fallback={<LoadingSpinner />}>
                    {children}
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};