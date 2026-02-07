import React, { createContext, useContext, useCallback } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    // Sound URL definitions (High quality magical UI sounds)
    const sounds = {
        click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', // Simple clean click
        magic: 'https://assets.mixkit.co/active_storage/sfx/2014/2014-preview.mp3', // Magical sparkle
        hover: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Soft pop/whoosh
        transition: 'https://assets.mixkit.co/active_storage/sfx/2015/2015-preview.mp3', // Deep magic whoosh
        paper: 'https://assets.mixkit.co/active_storage/sfx/1103/1103-preview.mp3', // Paper rustle
        seal: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3', // Wax seal break
        assemble: 'https://www.myinstants.com/media/sounds/avengers-assemble-mudith.mp3' // Avengers Assemble voice
    };

    const playSound = useCallback((type) => {
        const url = sounds[type];
        if (url) {
            const audio = new Audio(url);
            audio.volume = type === 'transition' ? 0.6 : 0.4;
            audio.play().catch(e => console.log('Sound blocked by browser until interaction'));
        }
    }, []);

    return (
        <SoundContext.Provider value={{ playSound }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useMagicSound = () => {
    const context = useContext(SoundContext);
    if (!context) throw new Error("useMagicSound must be used within SoundProvider");
    return context.playSound;
};
