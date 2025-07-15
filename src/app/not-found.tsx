'use client'

import styles from './not-found.module.css';

import Image from "next/image";
import { useRouter } from "next/navigation";

import { OutlineButton } from "@/components/common/OutlineButton";
import { MdOutlineHome, MdOutlineHistory } from 'react-icons/md';

export default function NotFound() {

    const router = useRouter();

    return (
        <div className={styles['notfound__wrapper']}>

            <section className={styles['notfound__title-section']}>
                <h1 className={styles['notfound__title']}>404</h1>
                <div className={styles['notfound__image-wrapper']}>
                    <Image
                        src='/images/not_found.webp'
                        alt="에러 이미지"
                        width={300}
                        height={300}
                        className={styles['notfound__image']}
                    />
                </div>
            </section>

            <p className={styles['notfound__description']}>페이지를 찾을 수 없습니다</p>

            <nav className={styles['notfound__actions']}>
                <OutlineButton type="button" icon={<MdOutlineHome size={24} />} label="메인 페이지" onClick={() => router.push('/')}></OutlineButton>
                <OutlineButton type="button" icon={<MdOutlineHistory size={24} />} label="이전 페이지" onClick={() => router.back()}></OutlineButton>
            </nav>

        </div>
    );
}