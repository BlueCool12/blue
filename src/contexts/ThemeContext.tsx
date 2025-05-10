import { createContext, useContext, useEffect, useState } from "react";
import { getInitialTheme } from "../utils/themeUtils";

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    themeMode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProviderWithState: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    const toggleTheme = () => {
        const nextMode = themeMode === 'light' ? 'dark' : 'light';
        setThemeMode(nextMode);
        localStorage.setItem('theme', nextMode);
        document.documentElement.setAttribute('data-theme', nextMode);
    }

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