import { useState } from "react";

import imgae from '../../../assets/images/BlueCool1.png';
import { Article, Aside, ProjectArea, ProjectItem } from "./ProjectSection.styles";

const projects = [
    {
        title: 'Tourstory',
        description: '종합 여행 플랫폼 프로젝트',
        stack: [
            { name: 'Java', color: '#f89820' },
            { name: 'Spring', color: '#6db33f' },
            { name: 'MariaDB', color: '#003545' },
            { name: 'JavaScript', color: '#f7df1e' },
            { name: 'BootStrap', color: '#7952B3' },
        ]
    },
    {
        title: 'BlueCool',
        description: '개인 블로그 프로젝트',
        stack: [
            { name: 'Java', color: '#f89820' },
            { name: 'Spring', color: '#6db33f' },
            { name: 'Postgresql', color: '#336791' },
            { name: 'React', color: '#61dafb' },
            { name: 'TypeScript', color: '#3178c6' },
            { name: 'Styled', color: '#db7093' },
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

                <img src={imgae}></img>

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
            </Article>
        </ProjectArea>
    );
};