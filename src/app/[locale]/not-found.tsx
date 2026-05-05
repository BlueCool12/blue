'use client'

import styles from './not-found.module.css';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

import { OutlineButton } from "@/components/common/OutlineButton";
import { MdOutlineHome, MdOutlineHistory } from 'react-icons/md';

export default function NotFound() {

    const t = useTranslations('NotFoundPage');
    const router = useRouter();

    return (
        <div className={styles['notfound__wrapper']}>

            <section className={styles['notfound__title-section']}>
                <h1 className={styles['notfound__title']}>404</h1>
                <div className={styles['notfound__image-wrapper']}>
                    <Image
                        src='/images/not_found.webp'
                        alt={t('imageAlt')}
                        width={300}
                        height={300}
                        className={styles['notfound__image']}
                    />
                </div>
            </section>

            <p className={styles['notfound__description']}>{t('description')}</p>

            <nav className={styles['notfound__actions']}>
                <OutlineButton type="button" icon={<MdOutlineHome size={24} />} label={t('homeButton')} onClick={() => router.push('/')}></OutlineButton>
                <OutlineButton type="button" icon={<MdOutlineHistory size={24} />} label={t('backButton')} onClick={() => router.back()}></OutlineButton>
            </nav>

        </div>
    );
}