'use client';

import { Suspense } from 'react';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

import styles from './Header.module.css';

import { ThemeAwareLogo } from './ThemeAwareLogo';
import { MobileMenu } from './MobileMenu';
import { MusicPlayer } from './MusicPlayer';
import { SearchBar } from './SearchBar';
import { SettingsMenu } from './SettingsMenu';


export const Header: React.FC = () => {
    const pathname = usePathname();
    const t = useTranslations('Header');

    const getNavItemClass = (targetPath: string) => {
        const isActive = pathname.startsWith(targetPath);
        return `${styles['desktop-nav__item']} ${isActive ? styles['desktop-nav__item--active'] : ''}`;
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles['header__inner']}>

                    <Link href='/' aria-label='Home' prefetch={false}>
                        <ThemeAwareLogo />
                    </Link>


                    {/* PC 네비바 */}
                    <nav className={styles['desktop-nav']}>
                        <ul className={styles['desktop-nav__list']}>
                            <li className={getNavItemClass('/about')}>
                                <Link href='/about' prefetch={false}>{t('about')}</Link>
                            </li>
                            <li className={getNavItemClass('/portfolio')}>
                                <Link href='/portfolio' prefetch={false}>{t('portfolio')}</Link>
                            </li>
                            <li className={getNavItemClass('/posts')}>
                                <Link href='/posts' prefetch={false}>{t('posts')}</Link>
                            </li>
                            <li className={getNavItemClass('/guestbooks')}>
                                <Link href='/guestbooks' prefetch={false}>{t('guestbook')}</Link>
                            </li>
                        </ul>
                    </nav>
                    {/* PC 네비바 */}

                    <div className={styles['header__icons']}>
                        <SearchBar />
                        <MusicPlayer />
                        <Suspense fallback={null}>
                            <SettingsMenu />
                        </Suspense>
                        <MobileMenu />
                    </div>

                </div>
            </header>
        </>
    );
};