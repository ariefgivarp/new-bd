'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useAudio } from '../context/AudioContext';

const VinylPlayer = () => {
    const albumRef = useRef(null);
    const vinylRef = useRef(null);
    const controlRef = useRef(null);
    const { audioRef } = useAudio();

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [prevVolume, setPrevVolume] = useState(1);

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

        tl.fromTo(
            controlRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
            '-=0.5'
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
        const setMeta = () => {
            if (!isNaN(audio.duration)) {
                setDuration(audio.duration);
            } else {
                fetch(audio.src)
                    .then((response) => response.blob())
                    .then((blob) => {
                        const blobUrl = URL.createObjectURL(blob);
                        const tempAudio = new Audio(blobUrl);
                        tempAudio.addEventListener('loadedmetadata', () => {
                            setDuration(tempAudio.duration);
                        });
                    });
            }
        };

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', setMeta);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', setMeta);
        };
    }, [audioRef]);

    useEffect(() => {
        const handleUserGesture = () => {
            if (audioRef?.current?.paused) {
                audioRef.current.play().catch(() => { });
            }
            document.removeEventListener('click', handleUserGesture);
        };

        document.addEventListener('click', handleUserGesture);

        return () => {
            document.removeEventListener('click', handleUserGesture);
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
        if (!isFinite(sec) || sec < 0) return '00:00';
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    useEffect(() => {
        if (audioRef?.current) {
            audioRef.current.volume = volume;
        }
    }, [volume, audioRef]);

    const toggleMute = () => {
        if (volume > 0) {
            setPrevVolume(volume);
            setVolume(0);
        } else {
            setVolume(prevVolume);
        }
    };

    return (
        <div className="relative mt-10 mx-auto w-full max-w-6xl px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-16">
                {/* Album + Vinyl */}
                <div className="flex flex-row items-center relative">
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

                    <div className="relative z-0 w-[180px] h-[180px] -ml-[100px] flex items-center justify-center">
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
                <div
                    ref={controlRef}
                    className="flex flex-col items-center md:items-start w-full md:w-[400px] text-white space-y-4 mt-4 md:mt-8"
                >
                    {/* Duration */}
                    <div className="w-full text-sm text-right transition-all duration-300 ease-in-out">
                        <div>
                            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
                        </div>
                        <div className="w-full h-4 bg-gray-800 rounded-md overflow-hidden mt-1">
                            <div
                                className="h-full bg-pink-500 transition-all duration-300 ease-in-out"
                                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Volume */}
                    <div className="w-full flex items-center gap-2">
                        <button
                            onClick={toggleMute}
                            className="text-xs text-gray-300 hover:scale-110 transition-transform"
                        >
                            {volume > 0 ? '🔊' : '🔇'}
                        </button>
                        <input
                            id="volume"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full accent-pink-500 transition-all duration-300"
                        />
                    </div>

                    {/* Control Buttons */}
                    <div className="flex justify-center md:justify-start gap-3 w-full">
                        <button
                            onClick={rewind}
                            className="text-sm bg-gray-700 px-2 py-1 rounded transition-all hover:bg-gray-600 hover:scale-105 shadow hover:shadow-md"
                        >
                            ⏪
                        </button>
                        <button
                            onClick={togglePlay}
                            className={`text-sm px-3 py-1 rounded transition-all hover:scale-105 shadow ${isPlaying
                                    ? 'bg-pink-700 hover:bg-pink-600'
                                    : 'bg-pink-600 hover:bg-pink-500'
                                }`}
                        >
                            {isPlaying ? '⏸️' : '▶️'}
                        </button>
                        <button
                            onClick={forward}
                            className="text-sm bg-gray-700 px-2 py-1 rounded transition-all hover:bg-gray-600 hover:scale-105 shadow hover:shadow-md"
                        >
                            ⏩
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VinylPlayer;
