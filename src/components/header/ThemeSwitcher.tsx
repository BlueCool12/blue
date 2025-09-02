'use client';

import { useTheme } from "next-themes";

import styles from './Header.module.css';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";


export function ThemeSwitcher() {

    const { theme, resolvedTheme, setTheme } = useTheme();

    const toggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <button onClick={toggle} aria-label='테마 전환'>
            {resolvedTheme === 'light' ?
                <MdOutlineDarkMode size={24} className={styles['header__icon']} />
                :
                <MdOutlineLightMode size={24} className={styles['header__icon']} />
            }
        </button>
    );
}