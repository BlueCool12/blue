import React, { ReactNode } from 'react';
import { StaticImageData } from 'next/image';

// Images
import baroyeonImage from '@/assets/images/projects/baroyeon.webp';
import baroyeonImage2 from '@/assets/images/projects/baroyeon2.webp';
import baroyeonImage3 from '@/assets/images/projects/baroyeon3.webp';
import bluecoolImage1 from '@/assets/images/projects/bluecool1.webp';
import bluecoolImage2 from '@/assets/images/projects/bluecool2.webp';
import bluecoolImage3 from '@/assets/images/projects/bluecool3.webp';
import bluecoolImage4 from '@/assets/images/projects/bluecool4.webp';
import bluecoolImage5 from '@/assets/images/projects/bluecool5.webp';
import bluecoolImage6 from '@/assets/images/projects/bluecool6.webp';
import tourstoryImage from '@/assets/images/projects/tourstory_1280_720.webp';

export interface Project {
    slug: string;
    title: string;
    subtitle: string;
    description: ReactNode;
    images: StaticImageData[];
    members: string;
    period: string;
    link?: string;
    pdf?: string;
    stack: { name: string; color: string }[];
}

export const projects: Project[] = [
    {
        slug: 'baroyeon',
        title: 'Baroyeon',
        subtitle: '바로연 웹사이트 리뉴얼',
        description: (
            <ul>
                <li>기존 ASP기반의 프로젝트를 <strong>React</strong>와 <strong>Express</strong>로 리뉴얼 하였습니다.</li>
                <li>프론트엔드 전반을 담당하며 <strong>RTK Query</strong>를 활용해 백엔드와의 데이터 통신을 구현하였습니다.</li>
                <li><strong>react-signature</strong> 기반 전자서명과 관련 API를 구현하였습니다.</li>
                <li>팝업을 등록, 수정, 삭제하고 위치 및 노출 여부를 제어할 수 있는 <strong>팝업 관리 기능</strong>을 구현하였습니다.</li>
                <li><strong>SunEditor</strong> 기반 콘텐츠 관리 기능을 구축해 <strong>SEO</strong>를 위한 글 작성/운영을 지원하였습니다.</li>
            </ul>
        ),
        images: [baroyeonImage, baroyeonImage2, baroyeonImage3],
        members: '2명',
        period: '2025.04 ~ 2025.06 (3개월)',
        link: 'https://www.baroyeon.net/',
        stack: [
            { name: 'JavaScript', color: '#f7df1e' },
            { name: 'Node.js', color: '#339933' },
            { name: 'Express.js', color: '#000000' },
            { name: 'MS SQL', color: '#CC2927' },
            { name: 'React', color: '#61DAFB' },
            { name: 'CSS', color: '#663399' },
        ]
    },
    {
        slug: 'bluecool',
        title: 'BlueCool',
        subtitle: '개인 블로그 및 CMS 프로젝트',
        description: (
            <ul>
                <li>관리자(React + Nest.js), 유저(Next.js + Spring Boot), AI(Python + FastAPI) 서버를 분리한 <strong>블로그 및 CMS</strong> 아키텍처를 설계하였습니다.</li>
                <li><strong>OOP 아키텍처</strong>를 도입해 복잡한 관리자 로직의 유지보수성과 확장성을 개선하였습니다.</li>
                <li><strong>JWT</strong> 기반 토큰 인증을 적용하여 관리자 로그인 및 권한 검증 시스템을 구현하였습니다.</li>
                <li><strong>Lexical</strong> 기반의 커스텀 리치 텍스트 에디터를 개발하여 콘텐츠 작성 및 관리 효율성을 높였습니다.</li>
                <li><strong>FastAPI</strong> 기반 AI 마이크로서비스 서버를 별도로 구축하였습니다.</li>
                <li><strong>LangChain</strong>을 활용하여 블로그 콘텐츠 자동화 기능을 구현하였습니다.</li>
                <li>블로그 글 본문을 임베딩 처리 후 <strong>Vector DB(Qdrant)</strong>에 저장하여 의미 기반 검색 및 RAG 구조를 설계하였습니다.</li>
                <li><strong>RabbitMQ</strong>와 <strong>Redis</strong>를 활용해 비동기 작업 큐 및 상태 관리 시스템을 구축하였습니다.</li>
                <li>기존 React 기반 구조를 검색 엔진 최적화를 위해 <strong>Next.js</strong>로 마이그레이션하고 <strong>다크 모드와 반응형 UI</strong>를 구현하였습니다.</li>
                <li><strong>useQuery</strong>를 활용하여 캐시 전략을 구성하고 <strong>Google Adsense</strong>로 페이지 단위 수익화를 구현하였습니다.</li>
                <li><strong>사용자 행동 분석</strong>을 위해 페이지 조회 이벤트에 대한 로그 데이터를 수집하는 시스템을 구축하였습니다.</li>
            </ul>
        ),
        images: [bluecoolImage1, bluecoolImage2, bluecoolImage3, bluecoolImage4, bluecoolImage5, bluecoolImage6],
        members: '1명',
        period: '2025.06 ~ 2025.08 (3개월)',
        link: 'https://pyomin.com',
        pdf: 'https://pyomin.com/pdfs/bluecool.pdf',
        stack: [
            { name: 'Java', color: '#f89820' },
            { name: 'TypeScript', color: '#3178c6' },
            { name: 'Python', color: '#3776ab' },
            { name: 'Spring Boot', color: '#6db33f' },
            { name: 'NestJS', color: '#ea2845' },
            { name: 'FastAPI', color: '#05998b' },
            { name: 'JPA', color: '#59666c' },
            { name: 'TypeORM', color: '#e535ab' },
            { name: 'SQLAlchemy', color: '#d71f00' },
            { name: 'LangChain', color: '#1c3c3c' },
            { name: 'Postgresql', color: '#4169E1' },
            { name: 'Redis', color: '#D82C20' },
            { name: 'RabbitMQ', color: '#FF6600' },
            { name: 'Qdrant', color: '#ff4d4d' },
            { name: 'Next.js', color: '#000000' },
            { name: 'React', color: '#61dafb' },
            { name: 'MUI', color: '#007fff' },
        ]
    },
    {
        slug: 'tourstory',
        title: 'Tourstory',
        subtitle: '종합 여행 플랫폼 프로젝트',
        description: (
            <ul>
                <li>여행 일정을 계획하고 숙소 예약, 원데이 클래스 예약, 여행 패키지 상품 예약 및 여행 게시판과 미니게임이 가능한 <strong>종합 여행 플랫폼</strong>을 기획하였습니다.</li>
                <li>숙소 예약 기능은 에어비앤비를 참고하였으며 라이브러리가 아닌 바닐라 <strong>자바스크립트</strong>로 달력을 구현하였고 <strong>Polling</strong> 방식을 이용한 알림기능도 구현하였습니다.</li>
                <li>외부 API로는 <strong>다음 지도</strong>, <strong>카카오 로그인</strong>, <strong>카카오 결제</strong>와 <strong>Chart.js</strong>를 사용하였습니다.</li>
                <li><strong>라즈베리 파이</strong>를 활용해 홈 서버를 구축하였으며 <strong>AWS</strong> Route 53 기반 DDNS를 적용하고 <strong>Nginx</strong> 리버스 프록시 및 <strong>Docker Compose</strong>로 서비스를 배포하였습니다.</li>
            </ul>
        ),
        images: [tourstoryImage],
        members: '6명',
        period: '2024.07 ~ 2024.08 (2개월)',
        link: 'https://tourstory.pyomin.com',
        pdf: 'https://pyomin.com/pdfs/tourstory.pdf',
        stack: [
            { name: 'Java', color: '#f89820' },
            { name: 'Spring Boot', color: '#6db33f' },
            { name: 'MyBatis', color: '#c70d2c' },
            { name: 'MariaDB', color: '#003545' },
            { name: 'JavaScript', color: '#f7df1e' },
            { name: 'Thymeleaf', color: '#005F0F' },
            { name: 'BootStrap', color: '#7952B3' },
        ]
    }
];

