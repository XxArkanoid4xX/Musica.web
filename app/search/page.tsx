"use client";

import { useState, useEffect } from "react";
import { Search, X, Play, Clock, Trash2, AlertCircle, Check, XCircle } from "lucide-react";
import Image from "next/image"; // Add missing import
import { searchTracks } from "@/app/actions/search"; // Import Server Action
import { useSearchStore } from "@/store/search-store";
import { DeezerTrack } from "@/lib/api-service";
import { usePlayerStore } from "@/store/player-store"; // For playing tracks
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
    const [deleteId, setDeleteId] = useState<number | null>(null); // Track ID pending deletion

    const { history, addToHistory, removeFromHistory, clearHistory } = useSearchStore();
    const { setTrack, togglePlay, currentTrack, isPlaying } = usePlayerStore();

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

    const confirmDelete = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        setDeleteId(id);
    };

    const executeDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (deleteId) {
            removeFromHistory(deleteId);
            setDeleteId(null);
        }
    };

    const cancelDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteId(null);
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
                                    <div className="text-sm text-muted-foreground font-mono">
                                        {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
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
                        {history.map((track) => (
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

                                {/* Delete Action Area */}
                                <div className="absolute right-2 flex items-center">
                                    {deleteId === track.id ? (
                                        <div className="flex items-center bg-zinc-900 rounded-md shadow-xl border border-white/10 overflow-hidden animate-in fade-in zoom-in duration-200">
                                            <button
                                                onClick={executeDelete}
                                                className="p-2 hover:bg-red-500/20 text-red-500 transition-colors"
                                                title="Confirm Delete"
                                            >
                                                <Check className="h-4 w-4" />
                                            </button>
                                            <div className="w-[1px] h-4 bg-white/10" />
                                            <button
                                                onClick={cancelDelete}
                                                className="p-2 hover:bg-white/10 text-muted-foreground transition-colors"
                                                title="Cancel"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={(e) => confirmDelete(e, track.id)}
                                            className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-white transition-all"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
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
