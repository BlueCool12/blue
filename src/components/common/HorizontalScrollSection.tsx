'use client';

import React, { useRef, useState, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import styles from './HorizontalScrollSection.module.css';

interface HorizontalScrollSectionProps {
  children: React.ReactNode;
  containerClassName?: string;
}

const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ children, containerClassName }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const firstChild = el.firstElementChild as HTMLElement;
    if (!firstChild) return;

    const cardWidth = firstChild.offsetWidth;
    const style = window.getComputedStyle(el);
    const gap = parseInt(style.gap) || 0;

    const scrollAmount = cardWidth + gap;

    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.wrapper}>
      {showLeft && (
        <button
          className={`${styles.navButton} ${styles.leftButton}`}
          onClick={() => scroll('left')}
          aria-label="Previous"
        >
          <MdChevronLeft />
        </button>
      )}

      <div ref={scrollRef} className={`${styles.container} ${containerClassName || ''}`}>
        {children}
      </div>

      {showRight && (
        <button
          className={`${styles.navButton} ${styles.rightButton}`}
          onClick={() => scroll('right')}
          aria-label="Next"
        >
          <MdChevronRight />
        </button>
      )}
    </div>
  );
};

export default HorizontalScrollSection;
