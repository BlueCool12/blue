'use client';

import styles from './page.module.css';
import ProjectCard from './ProjectCard';
import { projects } from './data/projects';

export default function ProjectGallery() {
    return (
        <section className={styles['gallery-section']}>
            <header className={styles['page-header']}>
                <h1 className={styles['page-title']}>PROJECTS</h1>
            </header>

            <div className={styles['gallery-grid']}>
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        slug={project.slug}
                        title={project.title}
                        subtitle={project.subtitle}
                        image={project.images[0]}
                        stack={project.stack}
                    />
                ))}
            </div>
        </section>
    );
}
