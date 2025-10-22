'use client';

import { createContext, useState, useContext, ReactNode } from 'react';

interface AudioPlayerContextType {
  playingSrc: string | null;
  setPlayingSrc: (src: string | null) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [playingSrc, setPlayingSrc] = useState<string | null>(null);

  return (
    <AudioPlayerContext.Provider value={{ playingSrc, setPlayingSrc }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  }
  return context;
}
