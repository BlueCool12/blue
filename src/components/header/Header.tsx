import Link from 'next/link';

import styles from './Header.module.css';

import { ThemeAwareLogo } from './ThemeAwareLogo';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {

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
                        <ThemeSwitcher />
                        <MobileMenu />
                    </div>

                </div>
            </header>
        </>
    );
};