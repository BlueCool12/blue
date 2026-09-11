'use client';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl";
import Image from "next/image";

import styles from './Header.module.css';

export function ThemeAwareLogo() {

    const t = useTranslations('Header');
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const isLight = mounted ? resolvedTheme === 'light' : true;

    const src = isLight ? '/images/logo/logo.webp' : '/images/logo/logo_dark.webp';

    return (
        <span className={styles['header__logo']}>
            <Image src={src} alt={t('logoAlt')} width={44} height={44} priority />
            <span className={styles['header__logo-text']}>
                <span className={styles['header__logo-text-line']}>BLUE</span>
                <span className={styles['header__logo-text-line']}>COOL</span>
            </span>
        </span>
    );
}