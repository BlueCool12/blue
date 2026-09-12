import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { localizedAlternates } from '@/i18n/metadata';

import styles from './page.module.css';

import { MdOutlineMail, MdLaunch } from 'react-icons/md';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';

const experiences = [
  {
    date: '2026.04 ~ Now',
    title: '웰메이드 컴퓨터',
    position: '소프트웨어 엔지니어',
    subtitle: 'AI 인프라 클라우드 플랫폼',
    link: 'https://wmcom.ai',
    descriptions: [
      '클라우드 솔루션 개발',
      '웹 기반 NVIDIA Omniverse 플랫폼 개발',
      'Digital Twin 실시간 데이터 처리'
    ]
  },
  {
    date: '2025.03 ~ 2025.11',
    title: '바로연',
    position: '웹 개발자',
    subtitle: '결혼 정보 서비스',
    link: 'https://www.baroyeon.net',
    descriptions: [
      '공식 웹사이트 리뉴얼 및 SEO',
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
    link: 'https://pyomin.com/pdfs/tourstory.pdf',
    descriptions: [
      'Spring Boot 기반 풀스택 역량',
      '프로젝트 아키텍처 설계 주도 경험',
    ]
  },
];

const skills = [
  {
    category: 'Backend',
    items: ['TypeScript', 'NestJS', 'Python', 'FastAPI', 'Java', 'Spring Boot']
  },
  {
    category: 'Database',
    items: ['PostgreSQL', 'Qdrant']
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js']
  },
  {
    category: 'Infrastructure',
    items: ['Docker', 'Kubernetes', 'AWS', 'Nginx', 'NVIDIA Omniverse']
  },
  {
    category: 'Monitoring',
    items: ['Prometheus', 'Grafana']
  }
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AboutPage' });
  const alternates = localizedAlternates(locale, '/about');
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates,
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `https://pyomin.com${alternates.canonical}`,
    },
    twitter: {
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

const About = async () => {
  const t = await getTranslations('AboutPage');

  return (
    <div className={styles['wrapper']}>

      {/* Hero Section */}
      <section className={styles['hero-section']}>
        <div className={styles['hero-section__card']}>
          <div className={styles['hero-section__mascot-wrapper']}>
            <Image
              src='/images/profile.png'
              alt={t('profileAlt')}
              width={160}
              height={160}
              className={styles['hero-section__mascot']}
              priority
            />
          </div>

          <div className={styles['hero-section__text-content']}>
            <p className={styles['hero-section__intro']}>
              <Image src='/images/emoji/wave.png' alt='' width={24} height={24} className={styles['title-emoji']} />
              {t('heroIntro')}
            </p>
            <h1 className={styles['hero-section__title']}>{t('heroTitle')}</h1>

            <div className={styles['hero-section__email']}>
              <a href="mailto:pmini1203@gmail.com" aria-label="Email">
                <MdOutlineMail size={20} />
              </a>

              <a href='https://github.com/BlueCool12' target='_blank' rel='noopener noreferrer' aria-label="GitHub">
                <FaGithub size={20} />
              </a>

              <a href='https://www.linkedin.com/in/bluecool/' target='_blank' rel='noopener noreferrer' aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>

              <a href='https://www.notion.so/Backend-Developer-2e9381b7d1078089959de45d0f34014d?source=copy_link' target='_blank' rel='noopener noreferrer' aria-label="Notion">
                <SiNotion size={20} />
              </a>
            </div>
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
                <h4 lang="ko" className={styles['career-section__title']}>{item.title}</h4>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles['career-section__link']} aria-label={t('serviceVisitAria', { title: item.title })}>
                    <MdLaunch size={18} />
                  </a>
                )}
              </div>
              <p lang="ko" className={styles['career-section__position']}>{item.position}</p>
            </div>
            <div className={styles['career-section__content']}>
              {item.subtitle && <p lang="ko" className={styles['career-section__subtitle']}>{item.subtitle}</p>}
              <ul lang="ko" className={styles['career-section__descriptions']}>
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
              <h4 lang="ko" className={styles['career-section__title']}>{item.title}</h4>
              {item.link && (
                <div className={styles['career-section__portfolio-link-wrapper']}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className={styles['career-section__portfolio-link']}>
                    <MdLaunch size={14} style={{ marginRight: '4px' }} />
                    {t('teamProjectLabel')}
                  </a>
                </div>
              )}
            </div>
            <div className={styles['career-section__content']}>
              {item.subtitle && <p lang="ko" className={styles['career-section__subtitle']}>{item.subtitle}</p>}
              <ul lang="ko" className={styles['career-section__descriptions']}>
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