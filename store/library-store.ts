import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TrackData {
    id: string;
    title: string;
    artist: string;
    album: string;
    coverUrl: string;
    duration: number;
    audioUrl?: string;
    likedAt?: number;
}

interface LibraryState {
    likedTracks: TrackData[];
    toggleLike: (track: TrackData) => void;
    checkIsLiked: (trackId: string) => boolean;
}

export const useLibraryStore = create<LibraryState>()(
    persist(
        (set, get) => ({
            likedTracks: [],
            toggleLike: (track) => set((state) => {
                const exists = state.likedTracks.some(t => t.id === track.id);
                if (exists) {
                    return { likedTracks: state.likedTracks.filter(t => t.id !== track.id) };
                } else {
                    return { likedTracks: [{ ...track, likedAt: Date.now() }, ...state.likedTracks] };
                }
            }),
            checkIsLiked: (trackId) => {
                return get().likedTracks.some(t => t.id === trackId);
            }
        }),
        {
            name: 'library-storage',
        }
    )
);
