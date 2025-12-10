"use client";

import { useState, useEffect } from "react";
import { Search, X, Play, Clock, Trash2, AlertCircle, Check, XCircle, MoreHorizontal, Heart, Plus, ListMusic } from "lucide-react";
import Image from "next/image";
import { searchTracks } from "@/app/actions/search";
import { useSearchStore } from "@/store/search-store";
import { usePlaylistStore } from "@/store/playlist-store";
import { useLibraryStore } from "@/store/library-store";
import { DeezerTrack } from "@/lib/api-service";
import { usePlayerStore } from "@/store/player-store";
import { AddToPlaylistMenu } from "@/components/shared/add-to-playlist";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

// Utility for debounce could be added, but simple timeout works for MVP
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 500);
    const [results, setResults] = useState<DeezerTrack[]>([]);
    const [loading, setLoading] = useState(false);

    const { history, addToHistory, removeFromHistory, clearHistory } = useSearchStore();
    const { setTrack, togglePlay, currentTrack, isPlaying } = usePlayerStore();
    const { playlists, addTrackToPlaylist, createPlaylist } = usePlaylistStore();
    const { toggleLike, checkIsLiked } = useLibraryStore();

    // Search Effect
    useEffect(() => {
        if (debouncedQuery.trim().length > 0) {
            setLoading(true);
            // Call Server Action
            searchTracks(debouncedQuery).then(res => {
                setResults(res.data || []);
                setLoading(false);
            });
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    const handlePlay = (track: DeezerTrack, fromHistory = false) => {
        // Add to history if playing from results
        if (!fromHistory) {
            addToHistory(track);
        }

        setTrack({
            id: String(track.id),
            title: track.title,
            artist: track.artist.name,
            album: track.album.title,
            coverUrl: track.album.cover_medium,
            duration: track.duration,
            audioUrl: track.preview
        });
    };

    const handleCreateAndAdd = (track: DeezerTrack) => {
        const id = createPlaylist();
        addTrackToPlaylist(id, {
            id: String(track.id),
            title: track.title,
            artist: track.artist.name,
            album: track.album.title,
            coverUrl: track.album.cover_medium,
            duration: track.duration,
            audioUrl: track.preview
        });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Search Input Header */}
            <div className="sticky top-0 z-30 bg-background/95 backdrop-blur py-4 border-b border-white/5">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="What do you want to listen to?"
                        className="w-full h-12 rounded-full bg-white/10 pl-12 pr-4 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-medium text-lg"
                    />
                    {query && (
                        <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                            <X className="h-5 w-5 text-muted-foreground hover:text-white" />
                        </button>
                    )}
                </div>
            </div>

            {/* Content Area */}
            {query ? (
                /* Results View */
                <section>
                    <h2 className="text-xl font-bold font-heading mb-4 pl-1">Top Results</h2>
                    {loading ? (
                        <div className="text-muted-foreground pl-1">Searching...</div>
                    ) : (
                        <div className="flex flex-col">
                            {results.map((track) => (
                                <div
                                    key={track.id}
                                    onClick={() => handlePlay(track)}
                                    className="group flex items-center gap-4 p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                    <div className="relative h-12 w-12 rounded overflow-hidden bg-zinc-800 shrink-0">
                                        <Image src={track.album.cover_medium} alt={track.title} fill className="object-cover" />
                                        <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
                                            <Play className="h-5 w-5 fill-white text-white" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className={cn("font-medium truncate", currentTrack?.id === String(track.id) ? "text-primary" : "text-white")}>
                                            {track.title}
                                        </span>
                                        <span className="text-sm text-muted-foreground truncate">
                                            Song • {track.artist.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                                        {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}

                                        {/* Context Menu Trigger */}
                                        <AddToPlaylistMenu track={{
                                            id: String(track.id),
                                            title: track.title,
                                            artist: track.artist.name,
                                            album: track.album.title,
                                            coverUrl: track.album.cover_medium,
                                            duration: track.duration,
                                            audioUrl: track.preview
                                        }}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </AddToPlaylistMenu>
                                    </div>
                                </div>
                            ))}
                            {results.length === 0 && !loading && (
                                <div className="text-muted-foreground pl-1">No songs found for "{query}"</div>
                            )}
                        </div>
                    )}
                </section>
            ) : (
                /* History View */
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold font-heading pl-1">Recent Searches</h2>
                        {history.length > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearHistory} className="text-muted-foreground hover:text-red-400">
                                Clear All
                            </Button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {history.map((track) => {
                            const isLiked = checkIsLiked(String(track.id));
                            return (
                                <div
                                    key={track.id}
                                    onClick={() => handlePlay(track, true)}
                                    className="relative flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                                >
                                    <div className="relative h-12 w-12 rounded overflow-hidden shrink-0">
                                        <Image src={track.album.cover_medium} alt={track.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className={cn("font-medium truncate text-sm", currentTrack?.id === String(track.id) ? "text-primary" : "text-white")}>
                                            {track.title}
                                        </span>
                                        <span className="text-xs text-muted-foreground truncate">
                                            {track.artist.name}
                                        </span>
                                    </div>

                                    {/* Actions Menu */}
                                    <div className="absolute right-2 flex items-center" onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-white/10 text-white z-50">

                                                {/* Like Toggle */}
                                                <DropdownMenuItem onClick={() => toggleLike({
                                                    id: String(track.id),
                                                    title: track.title,
                                                    artist: track.artist.name,
                                                    album: track.album.title,
                                                    coverUrl: track.album.cover_medium,
                                                    duration: track.duration,
                                                    audioUrl: track.preview
                                                })} className="cursor-pointer">
                                                    <Heart className={cn("mr-2 h-4 w-4", isLiked ? "fill-green-500 text-green-500" : "")} />
                                                    {isLiked ? "Liked" : "Like"}
                                                </DropdownMenuItem>

                                                {/* Add to Playlist Submenu */}
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger className="cursor-pointer">
                                                        <ListMusic className="mr-2 h-4 w-4" /> Add to Playlist
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuSubContent className="bg-zinc-900 border-white/10 text-white">
                                                        <DropdownMenuItem onClick={() => handleCreateAndAdd(track)} className="cursor-pointer">
                                                            <Plus className="mr-2 h-4 w-4" /> New Playlist
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-white/10" />
                                                        {playlists.map(p => (
                                                            <DropdownMenuItem
                                                                key={p.id}
                                                                onClick={() => addTrackToPlaylist(p.id, {
                                                                    id: String(track.id),
                                                                    title: track.title,
                                                                    artist: track.artist.name,
                                                                    album: track.album.title,
                                                                    coverUrl: track.album.cover_medium,
                                                                    duration: track.duration,
                                                                    audioUrl: track.preview
                                                                })}
                                                                className="cursor-pointer"
                                                            >
                                                                {p.title}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuSub>

                                                <DropdownMenuSeparator className="bg-white/10" />

                                                {/* Delete Action */}
                                                <DropdownMenuItem
                                                    onClick={() => removeFromHistory(track.id)}
                                                    className="text-red-500 hover:text-red-400 focus:text-red-400 cursor-pointer"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Remove from History
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            );
                        })}
                        {history.length === 0 && (
                            <div className="col-span-full py-10 text-center text-muted-foreground">
                                <Search className="h-10 w-10 mx-auto mb-3 opacity-20" />
                                <p>Search for songs, artists, or podcasts.</p>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
}
