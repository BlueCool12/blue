'use client';

import { useState } from "react";
import { Provider } from "react-redux";
import { ThemeProvider, useTheme } from "next-themes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
    const [queryClient] = useState(() => new QueryClient());
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem={true}>
                    {children}
                    <Toaster />
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    );
}