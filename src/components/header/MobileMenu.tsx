'use client';

import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from "next/image";
import { useTheme } from "next-themes";

import styles from './Header.module.css';
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";

export function MobileMenu() {

    const t = useTranslations('Header');
    const [open, setOpen] = useState(false);
    const { resolvedTheme } = useTheme();

    const src = resolvedTheme === 'light'
        ? '/images/logo/mobile_logo.webp'
        : '/images/logo/mobile_logo_dark.webp';

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');

        const onChange = () => mq.matches && setOpen(false);

        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    return (
        <>
            <button
                className={styles['header__menu-toggle']}
                onClick={() => setOpen(true)}
                aria-label={t('mobileMenuOpen')}
            >
                <MdOutlineMenu
                    size={24}
                />
            </button>

            {open && (
                <div className={styles['mobile-menu']} role="dialog" aria-modal="true" aria-label={t('mobileMenuAria')}>
                    <div className={styles['mobile-menu__header']}>
                        <Link href='/' prefetch={false} onClick={() => setOpen(false)} className={styles['mobile-menu__logo']}>
                            <Image
                                src={src}
                                alt={t('mobileLogoAlt')}
                                width={31}
                                height={36}
                                priority
                            />
                        </Link>

                        <button onClick={() => setOpen(false)} aria-label={t('mobileMenuClose')}>
                            <MdOutlineClose
                                size={24}
                            />
                        </button>
                    </div>

                    <ul className={styles['mobile-menu__nav']}>
                        <li><Link href='/about' prefetch={false} onClick={() => setOpen(false)}>{t('about')}</Link></li>
                        <li><Link href='/portfolio' prefetch={false} onClick={() => setOpen(false)}>{t('portfolio')}</Link></li>
                        <li><Link href='/posts' prefetch={false} onClick={() => setOpen(false)}>{t('posts')}</Link></li>
                        <li><Link href='/guestbooks' prefetch={false} onClick={() => setOpen(false)}>{t('guestbook')}</Link></li>
                    </ul>
                </div >
            )}
        </>
    );
}