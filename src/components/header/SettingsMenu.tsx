'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';
import {
    MdOutlineSettings,
    MdOutlineDarkMode,
    MdOutlineLightMode,
} from 'react-icons/md';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

import styles from './SettingsMenu.module.css';

const LOCALE_LABELS: Record<string, string> = {
    ko: '한국어',
    en: 'English',
    ja: '日本語',
};

export const SettingsMenu: React.FC = () => {
    const t = useTranslations('Settings');
    const locale = useLocale();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { resolvedTheme, setTheme } = useTheme();

    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!open) return;

        const handleOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };

        document.addEventListener('mousedown', handleOutside);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [open]);

    const selectLocale = (next: string) => {
        if (next !== locale) {
            const query = searchParams.toString();
            const href = query ? `${pathname}?${query}` : pathname;
            router.replace(href, { locale: next });
        }
        setOpen(false);
    };

    const selectTheme = (next: 'light' | 'dark') => {
        setTheme(next);
    };

    if (!mounted) return null;

    return (
        <div ref={wrapperRef} className={styles.wrapper}>
            <button
                type="button"
                aria-label={t('openAria')}
                aria-haspopup="menu"
                aria-expanded={open}
                className={styles.trigger}
                onClick={() => setOpen((prev) => !prev)}
            >
                <MdOutlineSettings size={22} />
            </button>

            {open && (
                <div role="menu" className={styles.menu}>
                    <section className={styles.section}>
                        <div className={styles.sectionLabel}>{t('themeLabel')}</div>
                        <ul className={styles.list}>
                            <li role="none">
                                <button
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={resolvedTheme === 'light'}
                                    onClick={() => selectTheme('light')}
                                    className={`${styles.item} ${resolvedTheme === 'light' ? styles['item--active'] : ''}`}
                                >
                                    <MdOutlineLightMode size={18} />
                                    {t('themeLight')}
                                </button>
                            </li>
                            <li role="none">
                                <button
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={resolvedTheme === 'dark'}
                                    onClick={() => selectTheme('dark')}
                                    className={`${styles.item} ${resolvedTheme === 'dark' ? styles['item--active'] : ''}`}
                                >
                                    <MdOutlineDarkMode size={18} />
                                    {t('themeDark')}
                                </button>
                            </li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionLabel}>{t('languageLabel')}</div>
                        <ul className={styles.list}>
                            {routing.locales.map((loc) => (
                                <li key={loc} role="none">
                                    <button
                                        type="button"
                                        role="menuitemradio"
                                        aria-checked={loc === locale}
                                        onClick={() => selectLocale(loc)}
                                        className={`${styles.item} ${loc === locale ? styles['item--active'] : ''}`}
                                    >
                                        {LOCALE_LABELS[loc] ?? loc}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            )}
        </div>
    );
};