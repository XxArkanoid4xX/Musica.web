import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DeezerTrack } from '@/lib/api-service';

interface SearchState {
    history: DeezerTrack[];
    addToHistory: (track: DeezerTrack) => void;
    removeFromHistory: (trackId: number) => void;
    clearHistory: () => void;
}

export const useSearchStore = create<SearchState>()(
    persist(
        (set) => ({
            history: [],
            addToHistory: (track) => set((state) => {
                // Avoid duplicates, move to top
                const filtered = state.history.filter(t => t.id !== track.id);
                return { history: [track, ...filtered].slice(0, 20) };
            }),
            removeFromHistory: (trackId) => set((state) => ({
                history: state.history.filter((t) => t.id !== trackId)
            })),
            clearHistory: () => set({ history: [] })
        }),
        {
            name: 'search-history',
        }
    )
);
