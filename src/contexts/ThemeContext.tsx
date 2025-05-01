import { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    themeMode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderWithState: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const getPreferredTheme = (): ThemeMode => {
        const saved = localStorage.getItem('theme') as ThemeMode | null;
        if (saved) return saved;

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    };

    const [themeMode, setThemeMode] = useState<ThemeMode>(getPreferredTheme);

    useEffect(() => {
        localStorage.setItem('theme', themeMode);

        const themeColor = themeMode === 'dark' ? '#121212' : '#ffffff';

        const metaTag = document.querySelector('meta[name="theme-color"]');
        if (metaTag) {
            metaTag.setAttribute('content', themeColor);
        } else {
            const newMeta = document.createElement('meta');
            newMeta.name = 'theme-color';
            newMeta.content = themeColor;
            document.head.appendChild(newMeta);
        }
    }, [themeMode]);

    const toggleTheme = () => {
        setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeMode = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within ThemeProviderWithState');
    }
    return context;
};