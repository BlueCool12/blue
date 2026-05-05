import styles from './EmptyState.module.css';

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export const EmptyState = async ({ message }: { message?: string }) => {
  const t = await getTranslations('Posts');

  return (

    <section className={styles['empty-state']}>
      <Image
        src='/images/empty.webp'
        alt={t('emptyStateAlt')}
        className={styles['empty-state__illustration']}
        width={320}
        height={320}
      />
      <p className={styles['empty-state__message']}>
        {message?.split("").map((char, idx) => char === " "
          ? <span key={idx}>&nbsp;</span>
          : (
            <span key={idx}
              className={styles['empty-state__char']}
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              {char}
            </span>
          ))}
      </p>
    </section>
  );
}