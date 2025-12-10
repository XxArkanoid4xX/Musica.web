import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TrackData } from './player-store'; // Reuse Track interface

export interface Playlist {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    tracks: TrackData[];
    createdAt: number;
}

interface PlaylistState {
    playlists: Playlist[];
    createPlaylist: () => string; // Returns new ID
    deletePlaylist: (id: string) => void;
    addTrackToPlaylist: (playlistId: string, track: TrackData) => void;
    removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
    updatePlaylist: (id: string, data: Partial<Playlist>) => void;
}

export const usePlaylistStore = create<PlaylistState>()(
    persist(
        (set, get) => ({
            playlists: [],
            createPlaylist: () => {
                const id = crypto.randomUUID();
                const newPlaylist: Playlist = {
                    id,
                    title: `My Playlist #${get().playlists.length + 1}`,
                    description: '',
                    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80', // Default abstract gradient
                    tracks: [],
                    createdAt: Date.now(),
                };
                set((state) => ({ playlists: [newPlaylist, ...state.playlists] }));
                return id;
            },
            deletePlaylist: (id) => set((state) => ({
                playlists: state.playlists.filter(p => p.id !== id)
            })),
            addTrackToPlaylist: (playlistId, track) => set((state) => ({
                playlists: state.playlists.map(p => {
                    if (p.id !== playlistId) return p;
                    // Avoid duplicates? Let's allow duplicates for now like Spotify, or check.
                    // Checking for duplicate IDs is better for UX usually unless intended.
                    if (p.tracks.some(t => t.id === track.id)) return p;
                    return { ...p, tracks: [...p.tracks, track] };
                })
            })),
            removeTrackFromPlaylist: (playlistId, trackId) => set((state) => ({
                playlists: state.playlists.map(p => {
                    if (p.id !== playlistId) return p;
                    return { ...p, tracks: p.tracks.filter(t => t.id !== trackId) };
                })
            })),
            updatePlaylist: (id, data) => set((state) => ({
                playlists: state.playlists.map(p => {
                    if (p.id !== id) return p;
                    return { ...p, ...data };
                })
            }))
        }),
        {
            name: 'user-playlists',
        }
    )
);
