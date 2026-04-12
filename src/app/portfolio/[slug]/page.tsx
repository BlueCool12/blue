import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    MdArrowBack,
    MdArrowForward,
    MdOutlineTravelExplore,
    MdPictureAsPdf
} from 'react-icons/md';
import { projects } from '../data/projects';
import styles from './page.module.css';
import ProjectCarousel from './ProjectCarousel';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title} | Portfolio`,
        description: project.subtitle,
        openGraph: {
            title: project.title,
            description: project.subtitle,
            images: [project.images[0].src],
        },
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const projectIndex = projects.findIndex((p) => p.slug === slug);
    const project = projects[projectIndex];

    if (!project) {
        notFound();
    }

    const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
    const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

    return (
        <div className={styles['wrapper']}>
            <div className={styles['detail-container']}>
                {/* Inline Header Row - Fixed to Title/Subtitle only */}
                <div className={styles['header-row']}>
                    <div className={styles['header-left']}>
                        <h1 className={styles['detail-title']}>{project.title}</h1>
                        <p className={styles['detail-subtitle']}>{project.subtitle}</p>
                    </div>
                </div>

                {/* Metadata Strip - Now above Image */}
                <div className={styles['metadata-strip']}>
                    <div className={styles['strip-item']}>
                        <span className={styles['strip-label']}>Period</span>
                        <span className={styles['strip-value']}>{project.period}</span>
                    </div>
                    <div className={styles['strip-item']}>
                        <span className={styles['strip-label']}>Team</span>
                        <span className={styles['strip-value']}>{project.members}</span>
                    </div>
                </div>

                {/* Hero Carousel Section */}
                <ProjectCarousel images={project.images} title={project.title} />

                <div className={styles['project-content-body']}>
                    {/* Description Section */}
                    <section className={styles['description-section']}>
                        <span className={styles['section-label']}>Overview</span>
                        <div className={styles['description-text']}>
                            {project.description}
                        </div>
                    </section>

                    {/* Tech Stack Section */}
                    <section className={styles['stack-section']}>
                        <span className={styles['section-label']}>Stack</span>
                        <div className={styles['stack-tags']}>
                            {project.stack.map((item) => (
                                <span
                                    key={item.name}
                                    className={styles['premium-tag']}
                                    style={{ backgroundColor: item.color, color: 'white' }}
                                >
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Action Links Section */}
                    <div className={styles['action-section']}>
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${styles['link-button']} ${styles['link-button--primary']}`}>
                                <MdOutlineTravelExplore size={24} />
                                웹사이트 방문
                            </a>
                        )}
                        {project.pdf && (
                            <a href={project.pdf} target="_blank" rel="noopener noreferrer" className={`${styles['link-button']} ${styles['link-button--secondary']}`}>
                                <MdPictureAsPdf size={24} />
                                프로젝트 소개
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}
