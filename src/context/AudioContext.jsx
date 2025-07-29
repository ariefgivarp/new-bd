'use client';

import { createContext, useContext, useRef } from 'react';

// Buat konteks audio global
const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const audioRef = useRef(null);

    return (
        <AudioContext.Provider value={{ audioRef }}>
            {children}

            {/* Audio player global, tidak terlihat di UI */}
            <audio
                ref={audioRef}
                src="/assets/audio/birthday-song.mp3"
                preload="auto"
                autoPlay
                loop
                style={{ display: 'none' }}
            />
        </AudioContext.Provider>
    );
};

export const useAudio = () => useContext(AudioContext);
