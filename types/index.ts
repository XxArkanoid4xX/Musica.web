export interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    coverUrl: string;
    duration: number; // seconds
    audioUrl?: string; // Optional for mocks
}

export interface Album {
    id: string;
    title: string;
    artist: string;
    coverUrl: string;
    year: number;
    trackCount: number;
}

export interface Artist {
    id: string;
    name: string;
    imageUrl: string;
    followers: number;
    genres: string[];
}

export interface Playlist {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    creator: string;
    trackCount: number;
}
