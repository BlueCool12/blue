import styles from './EmptyState.module.css';
import Image from 'next/image';

export const EmptyState = ({ message }: { message?: string }) => {

  return (

    <section className={styles['empty-state']}>
      <Image
        src='/images/empty_org.png'
        alt="글이 없을때의 일러스트"
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