'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import styles from './page.module.css';

interface Props {
    images: StaticImageData[];
    title: string;
}

export default function ProjectCarousel({ images, title }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (images.length === 0) return null;

    return (
        <section className={styles['carousel-wrapper']}>
            <div className={styles['carousel-container']}>
                <div 
                    className={styles['carousel-track']} 
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div key={index} className={styles['carousel-item']}>
                            <Image
                                src={image}
                                alt={`${title} screenshot ${index + 1}`}
                                fill
                                className={styles['project-image']}
                                placeholder="blur"
                                priority={index === 0}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            />
                        </div>
                    ))}
                </div>

                {images.length > 1 && (
                    <>
                        <button 
                            className={`${styles['carousel-control']} ${styles['carousel-control--prev']}`}
                            onClick={prevSlide}
                            aria-label="Previous slide"
                        >
                            <MdChevronLeft />
                        </button>
                        <button 
                            className={`${styles['carousel-control']} ${styles['carousel-control--next']}`}
                            onClick={nextSlide}
                            aria-label="Next slide"
                        >
                            <MdChevronRight />
                        </button>

                        <div className={styles['carousel-dots']}>
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`${styles['dot']} ${index === currentIndex ? styles['dot--active'] : ''}`}
                                    onClick={() => setCurrentIndex(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
