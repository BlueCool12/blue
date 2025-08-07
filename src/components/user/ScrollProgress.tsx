'use client';

import { useEffect, useState } from "react";
import styled from "styled-components";

export const ScrollProgress = () => {
    const [scrollWidth, setScrollWidth] = useState(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrollPercent = docHeight > 0 ? Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100) : 0;
                    setScrollWidth(scrollPercent);
                    ticking = false;
                });
                ticking = true;
            }
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return <ProgressBar width={scrollWidth} />;
};

const ProgressBar = styled.div<{ width: number }>`
    position: fixed;
    top: 79px;
    left: 0;
    width: ${({ width }) => width}%;
    height: 4px;
    background-color: var(--theme-color-9);
    z-index: 9999;
    transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    @media (max-width:768px) {
        top: 63px;
    }
`;