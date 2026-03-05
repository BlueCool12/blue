'use client';

import { useCallback, useEffect, useState } from "react";
import { useTheme } from 'next-themes';

import styles from './Header.module.css';
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export function ThemeSwitcher() {

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const toggle = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
  }, [resolvedTheme, setTheme]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button onClick={toggle} aria-label='테마 전환'>
      {resolvedTheme === 'light'
        ? <MdOutlineDarkMode size={24} className={styles['header__icon']} />
        : <MdOutlineLightMode size={24} className={styles['header__icon']} />
      }
    </button>
  );
}