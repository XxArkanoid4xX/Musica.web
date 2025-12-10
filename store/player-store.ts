import { create } from 'zustand';

export interface TrackData {
    id: string;
    title: string;
    artist: string;
    album: string;
    coverUrl: string;
    duration: number;
    audioUrl?: string;
}

interface PlayerState {
    isPlaying: boolean;
    currentTrack: TrackData | null;
    volume: number;
    currentTime: number;
    duration: number; // Duration of the playing audio (preview is 30s)

    // Actions
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    setTrack: (track: TrackData) => void;
    setVolume: (vol: number) => void;
    setCurrentTime: (time: number) => void;
    setDuration: (duration: number) => void;
    seekTo: (time: number) => void; // Placeholder for now
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    isPlaying: false,
    currentTrack: null,
    volume: 1, // 100%
    currentTime: 0,
    duration: 0,

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

    setTrack: (track) => set({
        currentTrack: track,
        isPlaying: true, // Auto play on set
        currentTime: 0,
        duration: track.duration || 30 // Default to preview duration if not set
    }),

    setVolume: (vol) => set({ volume: vol }),

    setCurrentTime: (time) => set({ currentTime: time }),

    setDuration: (duration) => set({ duration }),

    seekTo: (time) => set({ currentTime: time }),
}));
