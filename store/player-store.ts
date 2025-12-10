import { create } from 'zustand';
import { Track } from '@/types';

interface PlayerState {
    isPlaying: boolean;
    currentTrack: Track | null;
    volume: number;
    isMuted: boolean;
    queue: Track[]; // Simplificado para esta fase

    // Actions
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    setTrack: (track: Track) => void;
    setVolume: (volume: number) => void;
    toggleMute: () => void;
    nextTrack: () => void; // Mock logic
    previousTrack: () => void; // Mock logic
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    isPlaying: false,
    currentTrack: null,
    volume: 1, // 100%
    isMuted: false,
    queue: [],

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

    setTrack: (track: Track) => set({
        currentTrack: track,
        isPlaying: true // Auto-play when track is set
    }),

    setVolume: (volume: number) => set({ volume }),

    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

    // Mock navigation logic - en una app real usaría el índice de la cola
    nextTrack: () => {
        console.log("Next track triggered");
    },

    previousTrack: () => {
        console.log("Previous track triggered");
    }
}));
