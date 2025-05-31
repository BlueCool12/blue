'use client';

import styles from './page.module.css';
import clsx from 'clsx';

import { useState } from 'react';
import Image from 'next/image';

import { MdOutlineMail, MdOutlineDescription, MdOutlineTravelExplore, MdOutlineRocketLaunch } from 'react-icons/md';

const careers = [
    { date: '2025.03 ~ Now', title: '바로연' },
    { date: '2024.03 ~ 2024.08', title: '중앙정보처리학원' },
];

const projects = [
    {
        title: 'BlueCool',
        subtitle: '개인 블로그 프로젝트',
        description:
            '관리자 페이지가 있는 개인 블로그를 기획하였습니다.\n\n' +
            '다크모드 구현 및 기존 리액트 프로젝트를 SEO 최적화를 위해 Next.js로 마이그레이션 하였습니다.\n\n' +
            'JWT 토큰을 이용한 Spring Security 구성 및 CKEditor를 사용한 글 작성 및 파일 업로드 기능을 구현하였습니다.',
        image: '/images/projects/bluecool_1280_720.webp',
        link: 'https://www.pyomin.com',
        stack: [
            { name: 'Java', color: '#f89820' },
            { name: 'Spring', color: '#6db33f' },
            { name: 'Postgresql', color: '#336791' },
            { name: 'TypeScript', color: '#3178c6' },
            { name: 'React', color: '#61dafb' },
            { name: 'Next.js', color: '#000000' },
            { name: 'Styled', color: '#db7093' },
        ]
    },
    {
        title: 'Tourstory',
        subtitle: '종합 여행 플랫폼 프로젝트',
        description:
            '여행 일정을 계획하고 숙소 예약, 원데이 클래스 예약, 여행 패키지 상품 예약 및 여행 게시판과 미니게임이 가능한 종합 여행 플랫폼을 기획하였습니다.\n\n' +
            '숙소 예약 기능은 에어비앤비를 참고하였으며 라이브러리를 사용하지 않고 자바스크립트로 달력을 구현하였고 Polling 방식을 이용한 알림기능도 구현하였습니다.\n\n' +
            '외부 API로는 카카오 지도, 로그인, 결제와 Chart.js를 사용하였습니다.',
        image: '/images/projects/tourstory_1280_720.webp',
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

const About = () => {

    const [selectedProject, setSelectedProject] = useState(0);
    const project = projects[selectedProject];

    return (
        <main className={styles['main-wrapper']}>
            {/* Hero Section */}
            <section className={styles['hero-section']}>
                <div className={styles['hero-section__card']}>
                    <div className={styles['hero-section__text-content']}>
                        <p className={styles['hero-section__intro']}>안녕하세요 👋</p>
                        <h1 className={styles['hero-section__title']}>
                            저는 풀스택 개발자 <br />
                            <strong>BlueCool12</strong>입니다.
                        </h1>
                        <p className={styles['hero-section__email']}>
                            <MdOutlineMail size={24} />
                            <a href="mailto:pmini1203@gmail.com">pmini1203@gmail.com</a>
                        </p>

                    </div>

                    <div className={styles['hero-section__mascot-wrapper']}>
                        <Image
                            src='/images/BlueCool1.png'
                            alt="BlueCool12 마스코트 이미지"
                            width={160}
                            height={160}
                            className={styles['hero-section__mascot']}
                            priority
                        />
                    </div>
                </div>
            </section>
            {/* Hero Section */}

            {/* Career Section */}
            <section className={styles['career-section']}>
                <div className={styles['career-section__line']} />
                {careers.map((career, index) => (
                    <div key={index} className={styles['career-section__item']}>
                        <div className={clsx(styles['career-section__dot'], {
                            [styles['career-section__dot--last']]: index === careers.length - 1,
                        })} />
                        <div className={clsx(styles['career-section__content'], {
                            [styles['career-section__content--left']]: index % 2 === 0,
                        })}>
                            <div className={styles['career-section__date']}>{career.date}</div>
                            <h4 className={styles['career-section__title']}>{career.title}</h4>
                        </div>
                    </div>
                ))}
            </section>
            {/* Career Section */}

            {/* Project Area */}
            <section className={styles['project-section']}>
                <aside className={styles['project-section__aside']}>
                    <nav className={styles['project-section__nav']} aria-label="프로젝트 목록">
                        {projects.map((project, index) => (
                            <button
                                key={index}
                                className={clsx(styles['project-section__item'], {
                                    [styles['project-section__item--active']]: index === selectedProject,
                                })}
                                onClick={() => setSelectedProject(index)}
                            >
                                <span>{project.title}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <article className={styles['project-section__article']}>
                    <h2>{project.title}</h2>

                    <div className={styles['project-section__subtitle-wrapper']}>
                        <MdOutlineDescription size={24} />
                        <h3>
                            {project.subtitle}
                        </h3>
                    </div>

                    <p className={styles['project-section__description']}>
                        {project.description}
                    </p>

                    <figure className={styles['project-section__image-wrapper']}>
                        <Image
                            src={project.image}
                            alt={`${project.title} 미리보기`}
                            width={1280}
                            height={720}
                            priority={selectedProject === 0}
                        />
                    </figure>

                    {project.link && (
                        <section aria-label="프로젝트 웹 링크" className={styles['project-section__link']}>
                            <h4><MdOutlineTravelExplore size={24} />Web</h4>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {project.link}
                            </a>
                        </section>
                    )}

                    <section aria-label="사용한 기술 스택" style={{ margin: "12px 0" }}>
                        <h4><MdOutlineRocketLaunch size={24} />Stack</h4>
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

                </article>

            </section>
            {/* Project Area */}
        </main>
    );
};

export default About;