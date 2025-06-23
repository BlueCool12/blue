'use client';

import { Provider } from "react-redux";
import { ThemeProvider, useTheme } from "next-themes";

import { ToastContainer } from "react-toastify";

import { store } from "@/store/store";

function Toaster() {
    const { theme } = useTheme();

    return (
        <ToastContainer
            theme={theme === 'dark' ? 'dark' : 'light'}
            position='bottom-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
            draggable
        />
    );
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
                {children}
                <Toaster />
            </ThemeProvider>
        </Provider>
    );
}