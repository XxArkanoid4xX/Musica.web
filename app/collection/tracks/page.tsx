"use client";

import Image from "next/image";
import { Play, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLibraryStore } from "@/store/library-store";
import { usePlayerStore } from "@/store/player-store";
import { cn } from "@/lib/utils";

function formatDuration(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function LikedSongsPage() {
    const { likedTracks, toggleLike } = useLibraryStore();
    const { setTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();

    const handlePlayTrack = (track: any) => {
        if (currentTrack?.id === String(track.id)) {
            togglePlay();
            return;
        }

        setTrack({
            id: String(track.id),
            title: track.title,
            artist: track.artist,
            album: track.album,
            coverUrl: track.coverUrl,
            duration: track.duration,
            audioUrl: track.audioUrl
        });
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="relative flex flex-col md:flex-row items-end gap-6 p-8 pb-6 bg-gradient-to-b from-purple-800/60 to-background/0">
                <div className="relative h-52 w-52 shrink-0 shadow-2xl rounded-md overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center">
                    <Heart className="h-24 w-24 text-white fill-white" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                        Playlist
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight mb-2">
                        Liked Songs
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="font-bold hover:underline cursor-pointer">Antigravity User</span>
                        <span className="text-white/60">•</span>
                        <span className="text-white/60">{likedTracks.length} songs</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 px-8 py-4 bg-black/20">
                {likedTracks.length > 0 && (
                    <Button
                        size="icon"
                        className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all shadow-lg text-black"
                        onClick={() => handlePlayTrack(likedTracks[0])}
                    >
                        <Play className="h-7 w-7 ml-1 fill-current" />
                    </Button>
                )}
            </div>

            {/* Tracks */}
            <div className="px-8 pb-8">
                <div className="grid grid-cols-[16px_4fr_3fr_minmax(60px,1fr)] gap-4 border-b border-white/5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">
                    <div>#</div>
                    <div>Title</div>
                    <div>Album</div>
                    <div className="flex justify-start"><Clock className="h-4 w-4" /></div>
                </div>

                <div className="flex flex-col">
                    {likedTracks.map((track, i) => {
                        const isCurrent = currentTrack?.id === String(track.id);
                        return (
                            <div
                                key={track.id}
                                className={cn(
                                    "group grid grid-cols-[16px_4fr_3fr_minmax(60px,1fr)] gap-4 items-center rounded-md px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer",
                                    isCurrent && "bg-white/10"
                                )}
                                onClick={() => handlePlayTrack(track)}
                            >
                                <div className="text-sm text-muted-foreground group-hover:text-white w-4 justify-center flex">
                                    {isCurrent && isPlaying ? (
                                        <Image src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" width={14} height={14} alt="playing" />
                                    ) : (
                                        <>
                                            <span className="group-hover:hidden text-white/60">{i + 1}</span>
                                            <Play className="hidden group-hover:block h-3 w-3 fill-white" />
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="relative h-10 w-10 shrink-0 rounded overflow-hidden bg-zinc-800">
                                        <Image src={track.coverUrl} alt={track.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col truncate">
                                        <span className={cn("font-medium truncate", isCurrent ? "text-green-500" : "text-white")}>{track.title}</span>
                                        <span className="text-xs text-muted-foreground group-hover:text-white/80">{track.artist}</span>
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground truncate group-hover:text-white/80 hidden md:block">
                                    {track.album}
                                </div>
                                <div className="flex justify-between items-center text-sm text-muted-foreground font-mono group-hover:text-white/80">
                                    <span>{formatDuration(track.duration)}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-green-400"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(track);
                                        }}
                                    >
                                        <Heart className="h-4 w-4 fill-current" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                    {likedTracks.length === 0 && (
                        <div className="text-center py-20 text-muted-foreground">
                            <Heart className="h-16 w-16 mx-auto mb-4 opacity-20" />
                            <h3 className="text-lg font-medium mb-2">Songs you like will appear here</h3>
                            <p>Save songs by tapping the heart icon.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
