'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { MdSkipNext, MdSkipPrevious, MdPauseCircle, MdPlayCircle, MdOutlineMusicNote, MdOutlineGraphicEq } from 'react-icons/md';
import styles from './Header.module.css';

const PLAYLIST = [
  {
    title: 'Sunset Bossa',
    src: '/audio/sunset_bossa.mp3',
  },
  {
    title: 'Wind Song',
    src: '/audio/wind_song.mp3',
  },
  {
    title: "Isn't She Lovely",
    src: '/audio/isnt_she_lovely.mp3',
  },
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = PLAYLIST[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleMenu = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    if (nextOpen && !isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
  };

  const goToNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const goToPrevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToNextSong();
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToPrevSong();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles['music-player-container']} ref={menuRef}>
      <audio
        ref={audioRef}
        src={currentSong.src}
        onEnded={goToNextSong}
      />
      <button
        onClick={toggleMenu}
        aria-label="음악 플레이어 열기"
      >
        {isPlaying ? (
          <MdOutlineGraphicEq size={24} className={`${styles['header__icon']} ${styles['header__icon--playing']}`} />
        ) : (
          <MdOutlineMusicNote size={24} className={styles['header__icon']} />
        )}
      </button>

      {isOpen && (
        <div className={styles['music-player__popover']}>
          <div className={styles['music-player__popover-content']}>
            <Image
              src="/images/music.webp"
              alt="Now Playing"
              width={140}
              height={140}
              className={styles['music-player__popover-image']}
            />

            <div className={styles['music-player__title']}>{currentSong.title}</div>

            <div className={styles['music-player__separator']} />

            <div className={styles['music-player__controls']}>
              <button
                className={styles['music-player__control-btn']}
                aria-label="이전 곡"
                onClick={handlePrev}
              >
                <MdSkipPrevious size={28} />
              </button>
              <button
                onClick={togglePlay}
                className={`${styles['music-player__control-btn']} ${styles['music-player__control-btn--main']}`}
                aria-label={isPlaying ? '일시정지' : '재생'}
              >
                {isPlaying ? <MdPauseCircle size={32} /> : <MdPlayCircle size={32} />}
              </button>
              <button
                className={styles['music-player__control-btn']}
                aria-label="다음 곡"
                onClick={handleNext}
              >
                <MdSkipNext size={28} />
              </button>
            </div>

            <div className={styles['music-player__volume-wrapper']}>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className={styles['music-player__volume-slider']}
                aria-label="음량 조절"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
