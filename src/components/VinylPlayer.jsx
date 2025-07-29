'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useAudio } from '../context/AudioContext';

const VinylPlayer = () => {
    const albumRef = useRef(null);
    const vinylRef = useRef(null);
    const { audioRef } = useAudio();

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            albumRef.current,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }
        );

        tl.fromTo(
            vinylRef.current,
            { opacity: 0, x: -60 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: 'power2.out',
                onComplete: () => {
                    audioRef?.current?.play();
                    setIsPlaying(true);
                }
            },
            '-=0.4'
        );

        const handleUserGesture = () => {
            audioRef?.current?.play();
            setIsPlaying(true);
            document.removeEventListener('click', handleUserGesture);
        };

        document.addEventListener('click', handleUserGesture);

        return () => {
            document.removeEventListener('click', handleUserGesture);
        };
    }, [audioRef]);

    useEffect(() => {
        const audio = audioRef?.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const setMeta = () => setDuration(audio.duration || 0);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', setMeta);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', setMeta);
        };
    }, [audioRef]);

    const togglePlay = () => {
        const audio = audioRef?.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            setIsPlaying(true);
        } else {
            audio.pause();
            setIsPlaying(false);
        }
    };

    const rewind = () => {
        const audio = audioRef?.current;
        if (audio) audio.currentTime = Math.max(audio.currentTime - 5, 0);
    };

    const forward = () => {
        const audio = audioRef?.current;
        if (audio) audio.currentTime = Math.min(audio.currentTime + 5, duration);
    };

    const formatTime = (sec) => {
        const m = Math.floor(sec / 60)
            .toString()
            .padStart(2, '0');
        const s = Math.floor(sec % 60)
            .toString()
            .padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="relative flex flex-col items-center mt-10 mx-auto w-fit h-auto px-4">
            {/* Album + Vinyl */}
            <div className="flex flex-row items-center gap-4">
                {/* Album */}
                <div
                    ref={albumRef}
                    className="relative z-10 w-[200px] h-[200px] shine-effect shrink-0"
                >
                    <Image
                        src="/assets/images/album.png"
                        alt="Album"
                        width={200}
                        height={200}
                        className="shadow-xl object-cover"
                    />
                </div>

                {/* Vinyl */}
                <div className="relative z-0 w-[180px] h-[180px] -ml-[120px] flex items-center justify-center">
                    <div
                        ref={vinylRef}
                        className="w-[180px] h-[180px] animate-spin-slow vinyl-glow rounded-full flex items-center justify-center"
                        style={{ transform: 'translateX(-50%)' }}
                    >
                        <Image
                            src="/assets/images/vinyl.png"
                            alt="Vinyl"
                            width={200}
                            height={200}
                            className="rounded-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Audio Controls */}
            {/* Audio Controls */}
            <div className="flex flex-col justify-center items-center md:items-start text-white w-48 space-y-2 mt-6 md:mt-0 md:ml-8">
                <div className="text-sm">
                    <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
                </div>
                <div className="w-full h-4 bg-gray-800 rounded-md overflow-hidden">
                    <div
                        className="h-full bg-pink-500"
                        style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                    ></div>
                </div>
                <div className="flex items-center justify-center gap-3 mt-2 w-full">
                    <button onClick={rewind} className="text-sm bg-gray-700 px-2 py-1 rounded">
                        ⏪
                    </button>
                    <button onClick={togglePlay} className="text-sm bg-pink-600 px-3 py-1 rounded">
                        {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    <button onClick={forward} className="text-sm bg-gray-700 px-2 py-1 rounded">
                        ⏩
                    </button>
                </div>
            </div>

        </div>
    );
};

export default VinylPlayer;
