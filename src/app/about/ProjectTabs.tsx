'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './page.module.css';
import clsx from 'clsx';
import baroyeonImage from '@/assets/images/projects/baroyeon.webp';
import bluecoolImage from '@/assets/images/projects/bluecool_1280_720.webp';
import tourstoryImage from '@/assets/images/projects/tourstory_1280_720.webp';

import { MdOutlineDescription, MdOutlineTravelExplore, MdOutlineRocketLaunch, MdPictureAsPdf, MdOutlineGroup, MdOutlineCalendarMonth } from 'react-icons/md';

const projects = [
    {
        title: 'Baroyeon',
        subtitle: '바로연 웹사이트 리뉴얼',
        description: (
            <>
                기존 ASP기반의 프로젝트를 <strong>React</strong>와 <strong>Express</strong>로 리뉴얼 하였습니다.<br /><br />
                프론트엔드 전반을 담당하며 <strong>RTK Query</strong>를 활용해 백엔드와의 데이터 통신을 구현하였습니다.<br /><br />
                <strong>react-signature</strong> 기반 전자서명과 관련 API를 구현하였습니다.<br /><br />
                팝업을 등록, 수정, 삭제하고 위치 및 노출 여부를 제어할 수 있는 <strong>팝업 관리 기능</strong>을 구현하였습니다.<br /><br />
                <strong>SunEditor</strong> 기반 콘텐츠 관리 기능을 구축해 <strong>SEO 최적화</strong> 글 작성/운영을 지원하였습니다.<br />
            </>
        ),
        image: baroyeonImage,
        members: '2명',
        period: '2025.04 ~ 2025.06 (3개월)',
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
        description: (
            <>
                관리자(React + Nest.js)와 블로그(Next.js + Spring Boot)서버를 구축하였습니다.<br /><br />
                <strong>[Admin]</strong><br />
                <strong>JWT</strong> 기반의 토큰 인증을 통해 관리자 로그인 기능을 개발하였습니다.<br /><br />
                <strong>CKEditor</strong>를 활용해 글 작성 및 파일 업로드 기능을 구현하였고 사용자 행동 분석을 위해 <strong>페이지 조회 로그 기록 시스템</strong>을 구축하였습니다.<br /><br />
                <strong>Prisma</strong>를 이용해 데이터베이스 스키마 정의 및 마이그레이션을 체계적으로 관리하였습니다.<br /><br />
                <strong>[User]</strong><br />
                기존 React 기반 프로젝트를 SEO 최적화를 위해 <strong>Next.js</strong>로 마이그레이션하고 <strong>다크 모드와 반응형 UI</strong>를 구현하였습니다.<br /><br />
                Next.js의 <strong>MetadataRoute</strong> 기능을 통해 검색 엔진 최적화를 위한 <strong>Sitemap</strong> 과 <strong>RSS</strong>, PWA 지원을 위한 <strong>Manifest</strong>를 구성하였습니다.<br /><br />
                <strong>useQuery</strong>를 활용하여 캐시 전략을 구성하고 <strong>Google Adsense</strong>로 페이지 단위 수익화를 구현하였습니다.<br /><br />
            </>
        ),
        image: bluecoolImage,
        members: '1명',
        period: '2025.06 ~ 2025.08 (3개월)',
        link: 'https://www.pyomin.com',
        pdf: 'https://pyomin.com/pdfs/bluecool.pdf',
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
            (
                <>
                    여행 일정을 계획하고 숙소 예약, 원데이 클래스 예약, 여행 패키지 상품 예약 및 여행 게시판과 미니게임이 가능한 <strong>종합 여행 플랫폼</strong>을 기획하였습니다.<br /><br />
                    숙소 예약 기능은 에어비앤비를 참고하였으며 라이브러리가 아닌 바닐라 <strong>자바스크립트</strong>로 달력을 구현하였고 <strong>Polling</strong> 방식을 이용한 알림기능도 구현하였습니다.<br /><br />
                    외부 API로는 <strong>다음 지도</strong>, <strong>카카오 로그인</strong>, <strong>카카오 결제</strong>와 <strong>Chart.js</strong>를 사용하였습니다.<br /><br />
                    <strong>라즈베리 파이</strong>를 활용해 홈 서버를 구축하였으며 <strong>AWS</strong> Route 53 기반 DDNS를 적용하고 <strong>Nginx</strong> 리버스 프록시 및 <strong>Docker Compose</strong>로 서비스를 배포하였습니다.
                </>
            ),
        image: tourstoryImage,
        members: '6명',
        period: '2024.07 ~ 2024.08 (2개월)',
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
    const [imgLoading, setImgLoading] = useState(true);

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
                                onClick={() => {
                                    setSelectedProject(index);
                                    setImgLoading(true);
                                }}
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
                            key={project.image.src}
                            src={project.image}
                            alt={`${project.title} 미리보기`}
                            className={styles['project-section__image']}
                            width={1280}
                            height={720}
                            placeholder='blur'
                            onLoad={() => {
                                setTimeout(() => setImgLoading(false), 150);
                            }}
                        />
                        {imgLoading && (
                            <div aria-label='이미지 로딩중' className={styles['project-section__image-overlay']}>
                                <div className={styles['project-section__image-spinner']} />
                            </div>
                        )}
                    </figure>

                    {project.period && project.members && (
                        <section className={styles['project-meta']}>
                            <div aria-label='개발 기간' className={styles['project-meta__item']}>
                                <h4 className='project-meta__header'>
                                    <MdOutlineCalendarMonth size={24} />
                                    Period
                                </h4>
                                <span>{project.period}</span>
                            </div>

                            <div aria-label='프로젝트 인원' className={styles['project-meta__item']}>
                                <h4 className='project-meta__header'>
                                    <MdOutlineGroup size={24} />
                                    Members
                                </h4>
                                <span className={styles['project-meta__text']}>{project.members}</span>
                            </div>
                        </section>
                    )}

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

            </section >
            {/* Project Area */}
        </>
    );
};