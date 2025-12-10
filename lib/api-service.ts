// lib/api-service.ts

// Tipos básicos para la respuesta de Deezer
export interface DeezerTrack {
    id: number;
    title: string;
    duration: number;
    preview: string;
    artist: { name: string; picture_medium: string; picture_xl: string };
    album: { title: string; cover_medium: string; cover_xl: string };
}

export interface DeezerPlaylist {
    id: number;
    title: string;
    nb_tracks: number;
    picture_medium: string;
    picture_xl: string;
    user: { name: string };
    description?: string;
}

export interface DeezerAlbum {
    id: number;
    title: string;
    cover_medium: string;
    cover_xl: string;
    artist: { name: string };
    release_date: string;
}

const API_URL = "https://api.deezer.com";

// Service Adapter
export const api = {
    getChart: async () => {
        try {
            // Fetch Top Tracks, Albums, Playlists
            const res = await fetch(`${API_URL}/chart`, { next: { revalidate: 3600 } });
            if (!res.ok) throw new Error("Failed to fetch chart");
            return await res.json();
        } catch (error) {
            console.error(error);
            return { tracks: { data: [] }, albums: { data: [] }, playlists: { data: [] } };
        }
    },

    getPlaylist: async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/playlist/${id}`, { next: { revalidate: 3600 } });
            return await res.json();
        } catch (error) {
            return null;
        }
    },

    getAlbum: async (id: string) => {
        try {
            const res = await fetch(`${API_URL}/album/${id}`, { next: { revalidate: 3600 } });
            return await res.json();
        } catch (error) {
            return null;
        }
    },

    // Search feature for future use
    search: async (query: string) => {
        const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        return await res.json();
    }
};
