'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import styles from './Header.module.css';

import { ThemeAwareLogo } from './ThemeAwareLogo';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MobileMenu } from './MobileMenu';
import { MusicPlayer } from './MusicPlayer';


export const Header: React.FC = () => {
    const pathname = usePathname();

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
                                <Link href='/about' prefetch={false}>ABOUT</Link>
                            </li>
                            <li className={getNavItemClass('/portfolio')}>
                                <Link href='/portfolio' prefetch={false}>PORTFOLIO</Link>
                            </li>
                            <li className={getNavItemClass('/posts')}>
                                <Link href='/posts' prefetch={false}>POSTS</Link>
                            </li>
                            <li className={getNavItemClass('/guestbooks')}>
                                <Link href='/guestbooks' prefetch={false}>GUESTBOOK</Link>
                            </li>
                        </ul>
                    </nav>
                    {/* PC 네비바 */}

                    <div className={styles['header__icons']}>
                        <MusicPlayer />
                        <ThemeSwitcher />
                        <MobileMenu />
                    </div>

                </div>
            </header>
        </>
    );
};