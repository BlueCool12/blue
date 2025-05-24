'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

import styles from './Header.module.css';
import { MdOutlineDarkMode, MdOutlineLightMode, MdOutlineMenu, MdOutlineClose } from 'react-icons/md';

export const Header: React.FC = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <>
            <header className={styles.header}>
                <div className={styles['header__inner']}>
                    <div className={styles['header__logo']}>
                        <Link href='/'>
                            <Image
                                src={
                                    theme === 'light'
                                        ? '/images/logo/big.png'
                                        : '/images/logo/big_dark.png'
                                }
                                alt="Logo"
                                width={52}
                                height={39}
                                priority
                            />
                        </Link>
                    </div>

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
                            {theme === 'light' ? (
                                <MdOutlineDarkMode size={24} />
                            ) : (
                                <MdOutlineLightMode size={24} />
                            )}
                        </div>
                        <div
                            className={styles['header__menu-toggle']}
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <MdOutlineMenu size={24} />
                        </div>
                    </div>
                </div>
            </header>

            {isMobileMenuOpen && (
                <div className={clsx(styles['mobile-menu'])}>
                    <div className={styles['mobile-menu__header']}>
                        <span style={{ cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(false)}>
                            <MdOutlineClose size={24} />
                        </span>
                    </div>

                    <div className={styles['mobile-menu__logo']}>
                        <Image
                            src={
                                theme === 'light'
                                    ? '/images/logo/small.png'
                                    : '/images/logo/small_dark.png'
                            }
                            alt='Logo'
                            width={31}
                            height={36}
                            priority
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