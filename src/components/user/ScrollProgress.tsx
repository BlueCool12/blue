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
                    const contentElement = document.getElementById('main-content');
                    if (!contentElement) return;

                    const contentTop = contentElement.offsetTop;
                    const contentHeight = contentElement.offsetHeight;

                    const scrollTop = window.scrollY;
                    const scrollMax = contentTop + contentHeight - window.innerHeight;

                    const scrollPercent = scrollMax > 0
                        ? Math.min(Math.max((scrollTop / scrollMax) * 100, 0), 100)
                        : 0;

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

const ProgressBar = styled.div.attrs<{ width: number }>(props => ({
    style: {
        width: `${props.width}%`
    },
}))`
    position: fixed;
    top: 79px;
    left: 0;    
    height: 4px;
    background-color: var(--theme-color-9);
    z-index: 1000;
    transition: width 0.2s linear;

    @media (max-width:768px) {
        top: 63px;
    }
`;