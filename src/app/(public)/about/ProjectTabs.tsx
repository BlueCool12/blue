'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './page.module.css';
import clsx from 'clsx';
import baroyeonImage from '@/assets/images/projects/baroyeon.webp';
import bluecoolImage from '@/assets/images/projects/bluecool_1280_720.webp';
import tourstoryImage from '@/assets/images/projects/tourstory_1280_720.webp';

import { MdOutlineDescription, MdOutlineTravelExplore, MdOutlineRocketLaunch, MdPictureAsPdf } from 'react-icons/md';

const projects = [
    {
        title: 'Baroyeon',
        subtitle: '바로연 웹사이트 리뉴얼',
        description:
            '기존 ASP기반의 프로젝트를 React와 Express로 리뉴얼 하였습니다.\n\n' +
            '프론트엔드 전반을 담당하며 RTK Query를 활용해 백엔드와의 데이터 통신을 구현하였습니다.\n\n' +
            'react-signature를 활용한 온라인 계약 기능과 관련 API를 구현하였습니다.\n\n' +
            '관리자가 팝업을 등록, 수정, 삭제하며 위치 및 노출 여부를 제어할 수 있는 팝업 관리 기능을 구현하였습니다.',
        image: baroyeonImage,
        link: 'https://www.baroyeon.net/',
        pdf: undefined,
        stack: [
            { name: 'JavaScript', color: '#f7df1e' },
            { name: 'Node.js', color: '#339933' },
            { name: 'Express.js', color: '#000000' },
            { name: 'MSSQL', color: '#CC2927' },
            { name: 'React', color: '#61DAFB' },
            { name: 'CSS', color: '#663399' },
        ]
    },
    {
        title: 'BlueCool',
        subtitle: '개인 블로그 프로젝트',
        description:
            '관리자 페이지가 있는 개인 블로그를 기획하였습니다.\n\n' +
            '기존 React 기반 프로젝트를 SEO 최적화를 위해 Next.js로 마이그레이션하고 다크 모드와 반응형 UI를 구현하였습니다.\n\n' +
            '백엔드는 Spring Boot와 PostgreSQL로 구성하였으며 JWT 기반 인증과 Spring Security를 통해 관리자 로그인 기능을 개발하였습니다.\n\n' +
            'CKEditor를 활용해 글 작성 및 파일 업로드 기능을 구현하였고 사용자 행동 분석을 위해 페이지 조회 로그 기록 시스템을 구축하였습니다.',
        image: bluecoolImage,
        link: 'https://www.pyomin.com',
        pdf: undefined,
        stack: [
            { name: 'Java', color: '#f89820' },
            { name: 'Spring', color: '#6db33f' },
            { name: 'Postgresql', color: '#4169E1' },
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
        image: tourstoryImage,
        link: 'https://tourstory.pyomin.com',
        pdf: 'https://pyomin.com/pdfs/tourstory.pdf',
        stack: [
            { name: 'Java', color: '#f89820' },
            { name: 'Spring', color: '#6db33f' },
            { name: 'MariaDB', color: '#003545' },
            { name: 'JavaScript', color: '#f7df1e' },
            { name: 'Thymeleaf', color: '#005F0F' },
            { name: 'BootStrap', color: '#7952B3' },
        ]
    }
];

export default function ProjectTabs() {

    const [selectedProject, setSelectedProject] = useState(0);

    const project = projects[selectedProject];

    return (
        <>
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
                            className={styles['project-section__image']}
                            width={1280}
                            height={720}
                            placeholder='blur'
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

                    {project.pdf && (
                        <section aria-label="PDF 포트폴리오 링크" className={styles['project-section__link']}>
                            <h4><MdPictureAsPdf size={24} />PDF</h4>
                            <a
                                href={project.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {project.title} 포트폴리오
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
        </>
    );
};