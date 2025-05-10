

export type ThemeMode = 'light' | 'dark';

export const getInitialTheme = (): ThemeMode => {
    const saved = localStorage.getItem('theme') as ThemeMode | null;
    if (saved) return saved;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}