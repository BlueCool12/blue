import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.wrapper}>
            <Image
                className={styles.image}
                src='/images/working.png'
                alt='작업중 이미지'
                width={480}
                height={480}
                priority
            />
            <h1 className={styles.title}>🚧 메인페이지는 현재 작업중에 있습니다 🚧</h1>
        </main>
    )
}