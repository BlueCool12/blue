import { Metadata } from 'next';
import Image from 'next/image';

import styles from './page.module.css';

import { MdOutlineMail, MdLaunch } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';

const experiences = [
  {
    date: '2026.04 ~ Now',
    title: '웰메이드 컴퓨터',
    position: '소프트웨어 엔지니어',
    subtitle: 'AI 인프라 클라우드 플랫폼',
    link: 'https://wmcom.ai',
    descriptions: [
      '클라우드 솔루션 개발'
    ]
  },
  {
    date: '2025.03 ~ 2025.11',
    title: '바로연',
    position: '웹 개발자',
    subtitle: '결혼 정보 서비스',
    link: 'https://www.baroyeon.net',
    descriptions: [
      '공식 웹사이트 리뉴얼 및 SEO 설정',
      '전자 계약 시스템 개발',
      '관리자 페이지 CMS 개발'
    ]
  },
];

const activities = [
  {
    date: '2024.03 ~ 2024.08',
    title: '중앙정보처리학원',
    subtitle: '자바(JAVA) 풀스택 개발자 취업캠프',
    link: 'https://tourstory.pyomin.com',
    descriptions: [
      'Spring Boot 기반 풀스택 역량 습득',
      '프로젝트 아키텍처 설계 주도 경험',
    ]
  },
];

const skills = [
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'Prisma', 'tRPC']
  },
  {
    category: 'DevOps',
    items: ['MySQL', 'MS SQL', 'Linux', 'Kubernetes', 'Nginx', 'IIS']
  },
  {
    category: 'Frontend',
    items: ['JavaScript', 'TypeScript', 'React', 'Next.js']
  },
  {
    category: 'Tools',
    items: ['Visual Studio Code', 'Git']
  }
];

export const metadata: Metadata = {
  title: 'About',
  description: 'BlueCool12의 이력을 소개합니다.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About',
    description: 'BlueCool12의 이력을 소개합니다.',
    url: 'https://pyomin.com/about',
  },
  twitter: {
    title: 'About',
    description: 'BlueCool12의 이력을 소개합니다.',
  },
}

const About = () => {

  return (
    <div className={styles['wrapper']}>

      {/* Hero Section */}
      <section className={styles['hero-section']}>
        <div className={styles['hero-section__card']}>
          <div className={styles['hero-section__text-content']}>
            <p className={styles['hero-section__intro']}>안녕하세요 👋</p>
            <h1 className={styles['hero-section__title']}>
              백엔드 개발자 <br className={styles['mobile-break']} /> <strong>BLUECOOL</strong> 입니다 <br />
              지속적인 개선과 성장을 <br className={styles['mobile-break']} />목표로 합니다
            </h1>

            <div className={styles['hero-section__email']}>
              <div>
                <MdOutlineMail size={24} />
                <a href="mailto:pmini1203@gmail.com">pmini1203@gmail.com</a>
              </div>

              <div>
                <FaGithub size={24} />
                <a href='https://github.com/BlueCool12' target='_blank' rel='noopener noreferrer'>
                  github.com/BlueCool12
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SiNotion size={24} />
                <a href='https://www.notion.so/Backend-Developer-2e9381b7d1078089959de45d0f34014d?source=copy_link' target='_blank' rel='noopener noreferrer'>
                  portfolio
                </a>
              </div>
            </div>

          </div>

          <div className={styles['hero-section__mascot-wrapper']}>
            <Image
              src='/images/about.webp'
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

      {/* Experience Section */}
      <section className={styles['career-section']}>
        <h2 className={styles['section-title']}>Experience</h2>
        {experiences.map((item, index) => (
          <div key={index} className={styles['career-section__item']}>
            <div className={styles['career-section__info']}>
              <div className={styles['career-section__date']}>{item.date}</div>
              <div className={styles['career-section__header']}>
                <h4 className={styles['career-section__title']}>{item.title}</h4>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles['career-section__link']} aria-label={`${item.title} 서비스 방문`}>
                    <MdLaunch size={18} />
                  </a>
                )}
              </div>
              <p className={styles['career-section__position']}>{item.position}</p>
            </div>
            <div className={styles['career-section__content']}>
              {item.subtitle && <p className={styles['career-section__subtitle']}>{item.subtitle}</p>}
              <ul className={styles['career-section__descriptions']}>
                {item.descriptions.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Activity Section */}
      <section className={styles['career-section']}>
        <h2 className={styles['section-title']}>Activity</h2>
        {activities.map((item, index) => (
          <div key={index} className={styles['career-section__item']}>
            <div className={styles['career-section__info']}>
              <div className={styles['career-section__date']}>{item.date}</div>
              <h4 className={styles['career-section__title']}>{item.title}</h4>
              {item.link && (
                <div className={styles['career-section__portfolio-link-wrapper']}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles['career-section__portfolio-link']}>
                    <MdLaunch size={14} style={{ marginRight: '4px' }} />
                    팀 프로젝트
                  </a>
                </div>
              )}
            </div>
            <div className={styles['career-section__content']}>
              {item.subtitle && <p className={styles['career-section__subtitle']}>{item.subtitle}</p>}
              <ul className={styles['career-section__descriptions']}>
                {item.descriptions.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className={styles['skills-section']}>
        <h2 className={styles['section-title']}>Skills</h2>
        <div className={styles['skills-grid']}>
          {skills.map((group, index) => (
            <div key={index} className={styles['skills-group']}>
              <h3 className={styles['skills-group__title']}>{group.category}</h3>
              <div className={styles['skills-container']}>
                {group.items.map((skill, i) => (
                  <span key={i} className={styles['skill-tag']}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;