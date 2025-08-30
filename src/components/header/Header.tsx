'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import styles from './Header.module.css';
import clsx from 'clsx';

import { MdOutlineDarkMode, MdOutlineLightMode, MdOutlineMenu, MdOutlineClose } from 'react-icons/md';
import { useIsMobile } from '@/hooks/useIsMobile';

export const Header: React.FC = () => {

    const { isMobile, ready } = useIsMobile();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    useEffect(() => {
        if (ready && !isMobile && isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    }, [ready, isMobile, isMobileMenuOpen]);

    if (!mounted) return null;

    return (
        <>
            <header className={styles.header}>
                <div className={styles['header__inner']}>


                    <Link href='/' prefetch={false}>
                        <Image
                            src={
                                resolvedTheme === 'light'
                                    ? '/images/logo/logo.webp'
                                    : '/images/logo/logo_dark.webp'
                            }
                            alt="헤더 로고"
                            width={resolvedTheme === 'light' ? 50 : 74}
                            height={resolvedTheme === 'light' ? 39 : 40}
                            priority
                        />
                    </Link>


                    {/* PC 네비바 */}
                    <nav className={styles['desktop-nav']}>
                        <ul className={styles['desktop-nav__list']}>
                            <li className={styles['desktop-nav__item']}>
                                <Link href='/about' prefetch={false}>ABOUT</Link>
                            </li>
                            <li className={styles['desktop-nav__item']}>
                                <Link href='/posts' prefetch={false}>POSTS</Link>
                            </li>
                            <li className={styles['desktop-nav__item']}>
                                <Link href='/guestbooks' prefetch={false}>GUESTBOOK</Link>
                            </li>
                        </ul>
                    </nav>
                    {/* PC 네비바 */}

                    <div className={styles['header__icons']}>
                        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label='테마 전환'>
                            {resolvedTheme === 'light' ? (
                                <MdOutlineDarkMode size={24} className={styles['header__icon']} />
                            ) : (
                                <MdOutlineLightMode size={24} className={styles['header__icon']} />
                            )}
                        </button>

                        {ready && isMobile && (
                            <MdOutlineMenu
                                size={24}
                                className={styles['header__menu-toggle']}
                                onClick={() => setIsMobileMenuOpen(true)}
                                aria-label='모바일 메뉴 열기'
                            />
                        )}
                    </div>

                </div>
            </header>

            {ready && isMobile && isMobileMenuOpen && (
                <div className={clsx(styles['mobile-menu'])}>

                    <div className={styles['mobile-menu__header']}>

                        <Link href='/' prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className={styles['mobile-menu__logo']}>
                            <Image
                                src={
                                    resolvedTheme === 'light'
                                        ? '/images/logo/mobile_logo.webp'
                                        : '/images/logo/mobile_logo_dark.webp'
                                }
                                alt='모바일 메뉴 로고'
                                width={31}
                                height={36}
                                priority
                            />
                        </Link>

                        <MdOutlineClose
                            size={24}
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label='모바일 메뉴 닫기'
                        />
                    </div>

                    <ul className={styles['mobile-menu__nav']}>
                        <li><Link href='/about' prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link></li>
                        <li><Link href='/posts' prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>POSTS</Link></li>
                        <li><Link href='/guestbooks' prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>GUESTBOOK</Link></li>
                    </ul>
                </div >
            )}
        </>
    );
};