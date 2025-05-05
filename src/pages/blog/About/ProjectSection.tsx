import { useState } from "react";

import { Article, Aside, ImageWrapper, ProjectArea, ProjectItem } from "./ProjectSection.styles";

import tourstoryImage from '../../../assets/images/projects/tourstory_1280_720.webp';
import bluecoolImage from '../../../assets/images/projects/bluecool_1280_720.webp';

const projects = [
    {
        title: 'BlueCool',
        description: '개인 블로그 프로젝트',
        image: bluecoolImage,
        link: 'https://www.pyomin.com',
        stack: [
            { name: 'Java', color: '#f89820' },
            { name: 'Spring', color: '#6db33f' },
            { name: 'Postgresql', color: '#336791' },
            { name: 'React', color: '#61dafb' },
            { name: 'TypeScript', color: '#3178c6' },
            { name: 'Styled', color: '#db7093' },
        ]
    },
    {
        title: 'Tourstory',
        description: '종합 여행 플랫폼 프로젝트',
        image: tourstoryImage,
        link: 'https://tourstory.pyomin.com',
        stack: [
            { name: 'Java', color: '#f89820' },
            { name: 'Spring', color: '#6db33f' },
            { name: 'MariaDB', color: '#003545' },
            { name: 'JavaScript', color: '#f7df1e' },
            { name: 'BootStrap', color: '#7952B3' },
        ]
    }
];

export const ProjectSection = () => {
    const [selectedProject, setSelectedProject] = useState(0);
    const project = projects[selectedProject];

    return (
        <ProjectArea>
            <Aside>
                <nav aria-label="프로젝트 목록">
                    {projects.map((project, index) => (
                        <ProjectItem
                            key={index}
                            isActive={index === selectedProject}
                            onClick={() => setSelectedProject(index)}
                        >
                            <span>{project.title}</span>
                        </ProjectItem>
                    ))}
                </nav>
            </Aside>

            <Article>
                <h2>{project.title}</h2>
                <p>
                    <span className="material-symbols-rounded">
                        description
                    </span>
                    {project.description}
                </p>

                <ImageWrapper>
                    <img src={project.image} alt={`${project.title} 미리보기`}></img>
                </ImageWrapper>

                {project.link && (
                    <section aria-label="프로젝트 웹 링크" style={{ margin: "12px 0" }}>
                        <h4><span className="material-symbols-rounded">travel_explore</span>Web</h4>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            {project.link}
                        </a>
                    </section>
                )}

                <section aria-label="사용한 기술 스택" style={{ margin: "12px 0" }}>
                    <h4><span className="material-symbols-rounded">rocket_launch</span>Stack</h4>
                    <ul>
                        {project.stack.map((stack) => (
                            <li
                                key={stack.name}
                                style={{ backgroundColor: stack.color }}
                            >
                                {stack.name}
                            </li>
                        ))}
                    </ul>
                </section>

            </Article>
        </ProjectArea>
    );
};