import { Metadata } from 'next';
import ProjectGallery from './ProjectGallery';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Portfolio',
    description: 'BlueCool12의 프로젝트 포트폴리오를 소개합니다.',
    alternates: {
        canonical: '/portfolio',
    },
    openGraph: {
        title: 'Portfolio',
        description: 'BlueCool12의 프로젝트 포트폴리오를 소개합니다.',
        url: 'https://pyomin.com/portfolio',
    },
    twitter: {
        title: 'Portfolio',
        description: 'BlueCool12의 프로젝트 포트폴리오를 소개합니다.',
    },
}

const Portfolio = () => {
    return (
        <div className={styles['wrapper']}>
            <ProjectGallery />
        </div>
    );
};

export default Portfolio;
