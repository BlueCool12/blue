'use client';

import styles from './Header.module.css';
import clsx from 'clsx';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';


import { MdOutlineDarkMode, MdOutlineLightMode, MdOutlineMenu, MdOutlineClose } from 'react-icons/md';

export const Header: React.FC = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) return null;

    return (
        <>
            <header className={styles.header}>
                <div className={styles['header__inner']}>


                    <Link href='/'>
                        <Image
                            src={
                                resolvedTheme === 'light'
                                    ? '/images/logo/logo.webp'
                                    : '/images/logo/logo_dark.webp'
                            }
                            alt="헤더 로고"
                            width={resolvedTheme === 'light' ? 50 : 74}
                            height={40}
                            priority
                        />
                    </Link>


                    {/* PC 네비바 */}
                    <nav className={styles['desktop-nav']}>
                        <ul className={styles['desktop-nav__list']}>
                            <li className={styles['desktop-nav__item']}>
                                <Link href='/about'>ABOUT</Link>
                            </li>
                            <li className={styles['desktop-nav__item']}>
                                <Link href='/posts'>POSTS</Link>
                            </li>
                            <li className={styles['desktop-nav__item']}>
                                <Link href='/guestbooks'>GUESTBOOK</Link>
                            </li>
                        </ul>
                    </nav>
                    {/* PC 네비바 */}

                    <div className={styles['header__icons']}>
                        <div onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                            {resolvedTheme === 'light' ? (
                                <MdOutlineDarkMode size={24} />
                            ) : (
                                <MdOutlineLightMode size={24} />
                            )}
                        </div>

                        <MdOutlineMenu
                            size={24}
                            className={styles['header__menu-toggle']}
                            onClick={() => setIsMobileMenuOpen(true)}
                        />

                    </div>

                </div>
            </header>

            {isMobileMenuOpen && (
                <div className={clsx(styles['mobile-menu'])}>

                    <div className={styles['mobile-menu__header']}>

                        <div className={styles['mobile-menu__logo']}>
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
                        </div>

                        <MdOutlineClose
                            size={24}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                    </div>

                    <ul className={styles['mobile-menu__nav']}>
                        <li><Link href='/about' onClick={() => setIsMobileMenuOpen(false)}>ABOUT</Link></li>
                        <li><Link href='/posts' onClick={() => setIsMobileMenuOpen(false)}>POSTS</Link></li>
                        <li><Link href='/guestbooks' onClick={() => setIsMobileMenuOpen(false)}>GUESTBOOK</Link></li>
                    </ul>
                </div >
            )}
        </>
    );
};