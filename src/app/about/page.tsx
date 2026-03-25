import { Metadata } from 'next';
import Image from 'next/image';

import styles from './page.module.css';
import clsx from 'clsx';

import { MdOutlineMail } from 'react-icons/md';
import ProjectTabs from './ProjectTabs';
import { FaGithub } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';

const careers = [
  { date: '2026.04 ~ Now', title: '웰메이드컴퓨터' },
  { date: '2025.03 ~ 2025.11', title: '바로연' },
  { date: '2024.03 ~ 2024.08', title: '중앙정보처리학원' },
];

export const metadata: Metadata = {
  title: 'About',
  description: 'BlueCool12의 이력과 프로젝트를 소개합니다.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About',
    description: 'BlueCool12의 이력과 프로젝트를 소개합니다.',
    url: 'https://pyomin.com/about',
  },
  twitter: {
    title: 'About',
    description: 'BlueCool12의 이력과 프로젝트를 소개합니다.',
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
              백엔드 개발자 <strong>BLUECOOL</strong> 입니다 <br />
              지속적인 개선과 성장을 즐깁니다
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

      {/* Career Section */}
      <section className={styles['career-section']}>
        <div className={styles['career-section__line']} />
        {careers.map((career, index) => (
          <div key={index} className={styles['career-section__item']}>
            <div className={clsx(styles['career-section__dot'], {
              [styles['career-section__dot--last']]: index !== 0,
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

      <ProjectTabs />

    </div>
  );
};

export default About;