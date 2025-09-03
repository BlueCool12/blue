'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import styles from './Header.module.css';
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";

export function MobileMenu() {

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
                aria-label="모바일 메뉴 열기"
            >
                <MdOutlineMenu
                    size={24}
                />
            </button>

            {open && (
                <div className={styles['mobile-menu']} role="dialog" aria-modal="true" aria-label="모바일 메뉴">
                    <div className={styles['mobile-menu__header']}>
                        <Link href='/' prefetch={false} onClick={() => setOpen(false)} className={styles['mobile-menu__logo']}>
                            <Image
                                src={src}
                                alt='모바일 메뉴 로고'
                                width={31}
                                height={36}
                                priority
                            />
                        </Link>

                        <button onClick={() => setOpen(false)} aria-label='모바일 메뉴 닫기'>
                            <MdOutlineClose
                                size={24}
                            />
                        </button>
                    </div>

                    <ul className={styles['mobile-menu__nav']}>
                        <li><Link href='/about' prefetch={false} onClick={() => setOpen(false)}>ABOUT</Link></li>
                        <li><Link href='/posts' prefetch={false} onClick={() => setOpen(false)}>POSTS</Link></li>
                        <li><Link href='/guestbooks' prefetch={false} onClick={() => setOpen(false)}>GUESTBOOK</Link></li>
                    </ul>
                </div >
            )}
        </>
    );
}