import { create } from 'zustand';

export interface TrackData {
    id: string;
    title: string;
    artist: string;
    album?: string;
    coverUrl: string;
    duration: number;
    audioUrl: string;
}

interface PlayerState {
    isPlaying: boolean;
    currentTrack: TrackData | null;
    queue: TrackData[];
    currentIndex: number;
    volume: number;
    currentTime: number;
    duration: number;
    isFullScreen: boolean;

    setTrack: (track: TrackData) => void;
    setQueue: (tracks: TrackData[], startIndex?: number) => void;

    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;

    setVolume: (volume: number) => void;
    setCurrentTime: (time: number) => void;
    setDuration: (duration: number) => void;
    seekTo: (time: number) => void;
    toggleFullScreen: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    isPlaying: false,
    currentTrack: null,
    queue: [],
    currentIndex: -1,
    volume: 1,
    currentTime: 0,
    duration: 0,
    isFullScreen: false,

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

    setTrack: (track) => set({
        currentTrack: track,
        isPlaying: true,
        queue: [track],
        currentIndex: 0
    }),

    setQueue: (tracks, startIndex = 0) => set({
        queue: tracks,
        currentTrack: tracks[startIndex],
        currentIndex: startIndex,
        isPlaying: true
    }),

    playNext: () => {
        const { queue, currentIndex } = get();
        if (queue.length > 0 && currentIndex < queue.length - 1) {
            const nextIndex = currentIndex + 1;
            set({ currentTrack: queue[nextIndex], currentIndex: nextIndex, isPlaying: true });
        }
    },

    playPrevious: () => {
        const { queue, currentIndex, currentTime } = get();
        // If track has been playing for more than 3 sec, restart it
        if (currentTime > 3) {
            const audio = document.querySelector('audio');
            if (audio) audio.currentTime = 0;
            set({ currentTime: 0 });
            return;
        }
        if (queue.length > 0 && currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            set({ currentTrack: queue[prevIndex], currentIndex: prevIndex, isPlaying: true });
        }
    },

    setVolume: (volume) => set({ volume }),
    setCurrentTime: (currentTime) => set({ currentTime }),
    setDuration: (duration) => set({ duration }),
    seekTo: (time) => {
        const audio = document.querySelector('audio');
        if (audio) {
            audio.currentTime = time;
        }
        set({ currentTime: time });
    },
    toggleFullScreen: () => set((state) => ({ isFullScreen: !state.isFullScreen })),
}));
