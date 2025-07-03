import styles from './page.module.css';

import Image from 'next/image';

export default function Home() {

    return (
        <main className={styles.wrapper}>

            <Image
                src='/images/working.webp'
                alt='작업중 이미지'
                width={300}
                height={300}
                className={styles.image}
                priority
            />

            <h1 className={styles.title}>🚧 메인페이지는 현재 작업중에 있습니다 🚧</h1>
        </main>
    )
}