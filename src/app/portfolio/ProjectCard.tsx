'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

interface ProjectCardProps {
    slug: string;
    title: string;
    subtitle: string;
    image: StaticImageData;
    stack: { name: string; color: string }[];
}

export default function ProjectCard({ slug, title, subtitle, image, stack }: ProjectCardProps) {
    return (
        <Link href={`/portfolio/${slug}`} className={styles['project-card-link']}>
            <article className={styles['project-card']}>
                <div className={styles['image-container']}>
                    <Image
                        src={image}
                        alt={`${title} Thumbnail`}
                        className={styles['project-image']}
                        placeholder="blur"
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                    />
                </div>
                <div className={styles['card-content']}>
                    <h3 className={styles['card-title']}>{title}</h3>
                    <p className={styles['card-subtitle']}>{subtitle}</p>
                    <div className={styles['tag-container']}>
                        {stack.slice(0, 3).map((item) => (
                            <span
                                key={item.name}
                                className={styles['tag']}
                            >
                                {item.name}
                            </span>
                        ))}
                        {stack.length > 3 && (
                            <span className={styles['tag']}>+{stack.length - 3}</span>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}
