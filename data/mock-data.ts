import { Track, Album, Artist, Playlist } from "@/types";

export const mockArtists: Artist[] = [
    {
        id: "art_1",
        name: "Lunar Oscillations",
        imageUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&q=80",
        followers: 1250000,
        genres: ["Electronic", "Ambient", "Synthwave"],
    },
    {
        id: "art_2",
        name: "The Velvet Knights",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
        followers: 890000,
        genres: ["Neo-Soul", "Jazz Fusion"],
    },
    {
        id: "art_3",
        name: "Cyber Punk Collective",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
        followers: 2100000,
        genres: ["Industrial", "Techno"],
    }
];

// Using reliable Unsplash IDs for Albums
export const mockAlbums: Album[] = [
    {
        id: "alb_1",
        title: "Neon Horizons",
        artist: "Lunar Oscillations",
        coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
        year: 2024,
        trackCount: 12,
    },
    {
        id: "alb_2",
        title: "Midnight in Tokyo",
        artist: "The Velvet Knights",
        coverUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80",
        year: 2023,
        trackCount: 8,
    },
    {
        id: "alb_3",
        title: "Analog Dreams",
        artist: "Synthwave Boy",
        coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
        year: 2022,
        trackCount: 10,
    },
    {
        id: "alb_4",
        title: "Urban Jungle",
        artist: "Metropolis",
        coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
        year: 2025,
        trackCount: 14,
    }
];

export const mockTracks: Track[] = [
    {
        id: "trk_1",
        title: "Starlight Echoes",
        artist: "Lunar Oscillations",
        album: "Neon Horizons",
        coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
        duration: 245,
    },
    {
        id: "trk_2",
        title: "Digital Rain",
        artist: "Lunar Oscillations",
        album: "Neon Horizons",
        coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
        duration: 198,
    },
    {
        id: "trk_3",
        title: "Sax and Shadows",
        artist: "The Velvet Knights",
        album: "Midnight in Tokyo",
        coverUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80",
        duration: 310,
    },
    {
        id: "trk_4",
        title: "Neon Highway",
        artist: "Cyber Punk Collective",
        album: "Future States",
        coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
        duration: 225,
    },
    {
        id: "trk_5",
        title: "Deep Focus",
        artist: "Unknown Signal",
        album: "Mindset",
        coverUrl: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=80",
        duration: 480,
    }
];

export const mockPlaylists: Playlist[] = [
    {
        id: "pl_1",
        title: "Futuristic Lo-Fi",
        description: "Beats to code and dream to.",
        creator: "Musica Editorial",
        coverUrl: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80",
        trackCount: 45,
    },
    {
        id: "pl_2",
        title: "Late Night Drive",
        description: "Deep house and melodic techno for the road.",
        creator: "Musica Editorial",
        coverUrl: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=800&q=80",
        trackCount: 32,
    },
    {
        id: "pl_3",
        title: "Architectural Acoustics",
        description: "Soundscapes for modern living spaces.",
        creator: "Design Weekly",
        coverUrl: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=80",
        trackCount: 18,
    },
    {
        id: "pl_4",
        title: "Neon City Nights",
        description: "Cyberpunk vibes for the digital drifter.",
        creator: "Night City Radio",
        coverUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80",
        trackCount: 50,
    },
    {
        id: "pl_5",
        title: "Deep Focus Alpha",
        description: "Binaural beats for intense concentration.",
        creator: "Brain.fm",
        coverUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        trackCount: 12,
    },
    {
        id: "pl_6",
        title: "Abstract Hip Hop",
        description: "Experimental beats and rhythms.",
        creator: "Underground",
        coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
        trackCount: 24,
    }
];

export const mockMixes = [
    {
        id: "mix_1",
        title: "Daily Mix 1",
        description: "Made for Antigravity",
        coverUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80",
        accent: "from-pink-500"
    },
    {
        id: "mix_2",
        title: "Daily Mix 2",
        description: "Based on recent listening",
        coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
        accent: "from-blue-500"
    },
    {
        id: "mix_3",
        title: "Discovery Weekly",
        description: "New music updated every Monday",
        coverUrl: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=80",
        accent: "from-purple-500"
    },
    {
        id: "mix_4",
        title: "On Repeat",
        description: "Songs you love right now",
        coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
        accent: "from-green-500"
    },
    {
        id: "mix_5",
        title: "Release Radar",
        description: "Catch up on the latest releases",
        coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
        accent: "from-gray-500"
    },
    {
        id: "mix_6",
        title: "Summer Rewind",
        description: "Your past summer jams",
        coverUrl: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=800&q=80",
        accent: "from-orange-500"
    }
];
