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

    queue: TrackData[];
    currentIndex: number;

    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    setTrack: (track: TrackData) => void;
    setQueue: (tracks: TrackData[], startIndex?: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    setVolume: (vol: number) => void;
    setCurrentTime: (time: number) => void;
    setDuration: (duration: number) => void;
    seekTo: (time: number) => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    isPlaying: false,
    currentTrack: null,
    queue: [],
    currentIndex: -1,
    volume: 1,
    currentTime: 0,
    duration: 0,

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

    setTrack: (track) => set({
        currentTrack: track,
        queue: [track], // Clear queue and set single track
        currentIndex: 0,
        isPlaying: true,
        currentTime: 0,
        duration: track.duration || 30
    }),

    setQueue: (tracks, startIndex = 0) => set({
        queue: tracks,
        currentIndex: startIndex,
        currentTrack: tracks[startIndex] || null,
        isPlaying: true,
        currentTime: 0,
        duration: tracks[startIndex]?.duration || 30
    }),

    playNext: () => {
        const { queue, currentIndex } = get();
        if (currentIndex < queue.length - 1) {
            const nextIndex = currentIndex + 1;
            const nextTrack = queue[nextIndex];
            set({
                currentIndex: nextIndex,
                currentTrack: nextTrack,
                isPlaying: true,
                currentTime: 0,
                duration: nextTrack.duration || 30
            });
        }
    },

    playPrevious: () => {
        const { queue, currentIndex, currentTime } = get();
        // If playing more than 3 seconds, restart track
        if (currentTime > 3) {
            set({ currentTime: 0 });
            // Logic to restart audio element is handled by useAudio hook watching currentTime usually, 
            // but we might need ensure the hook reacts. 
            // For now, updating state is enough for UI. useAudio needs to see this.
            return;
        }

        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            const prevTrack = queue[prevIndex];
            set({
                currentIndex: prevIndex,
                currentTrack: prevTrack,
                isPlaying: true,
                currentTime: 0,
                duration: prevTrack.duration || 30
            });
        }
    },

    setVolume: (vol) => set({ volume: vol }),
    setCurrentTime: (time) => set({ currentTime: time }),
    setDuration: (duration) => set({ duration }),
    seekTo: (time) => set({ currentTime: time }),
}));
