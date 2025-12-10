"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Play, Clock, Heart, MoreHorizontal, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockPlaylists, mockMixes, mockTracks } from "@/data/mock-data";
import { cn } from "@/lib/utils";
import type { Playlist, Track } from "@/types";

// Combine mock data to find playlist or mix
const allPlaylists = [...mockPlaylists, ...mockMixes.map(m => ({ ...m, creator: "Musica", trackCount: 20 } as unknown as Playlist))];

function formatDuration(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [playlist, setPlaylist] = useState<Playlist | null>(null);

    useEffect(() => {
        // Simulate finding data
        const found = allPlaylists.find(p => p.id === resolvedParams.id);
        if (found) {
            setPlaylist(found);
        }
    }, [resolvedParams.id]);

    if (!playlist) {
        // In a real app we might show loading or trigger notFound() sooner
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header Section */}
            <div className="relative flex flex-col md:flex-row items-end gap-6 p-8 pb-6 bg-gradient-to-b from-blue-900/40 to-background/0">
                <div className="relative h-52 w-52 shrink-0 shadow-2xl rounded-md overflow-hidden">
                    <Image
                        src={playlist.coverUrl}
                        alt={playlist.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                        {resolvedParams.id.startsWith('mix') ? 'Daily Mix' : 'Playlist'}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black font-heading tracking-tight mb-2">
                        {playlist.title}
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium mb-2">
                        {playlist.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-white/90">
                        {playlist.creator && (
                            <>
                                <span className="font-bold hover:underline cursor-pointer">{playlist.creator}</span>
                                <span className="text-white/60">•</span>
                            </>
                        )}
                        <span className="text-white/60">5,234 likes</span>
                        <span className="text-white/60">•</span>
                        <span className="text-white/60">{playlist.trackCount} songs, about 2 hr</span>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-4 px-8 py-4 bg-black/20">
                <Button size="icon" className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-lg text-primary-foreground">
                    <Play className="h-7 w-7 ml-1 fill-current" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-white">
                    <Heart className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-white">
                    <MoreHorizontal className="h-6 w-6" />
                </Button>
            </div>

            {/* Track List */}
            <div className="px-8 pb-8">
                {/* Header Row */}
                <div className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 border-b border-white/5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">
                    <div>#</div>
                    <div>Title</div>
                    <div>Album</div>
                    <div className="flex justify-end"><Clock className="h-4 w-4" /></div>
                </div>

                {/* List */}
                <div className="flex flex-col">
                    {/* Repeating mock tracks for demo effect */}
                    {mockTracks.map((track, i) => (
                        <div
                            key={`${track.id}-${i}`}
                            className="group grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 items-center rounded-md px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <div className="text-sm text-muted-foreground group-hover:text-white w-4 justify-center flex">
                                <span className="group-hover:hidden">{i + 1}</span>
                                <Play className="hidden group-hover:block h-3 w-3 fill-white" />
                            </div>
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="relative h-10 w-10 shrink-0 rounded overflow-hidden">
                                    <Image src={track.coverUrl} alt={track.title} fill className="object-cover" />
                                </div>
                                <div className="flex flex-col truncate">
                                    <span className="font-medium text-white truncate">{track.title}</span>
                                    <span className="text-xs text-muted-foreground group-hover:text-white/80">{track.artist}</span>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground truncate group-hover:text-white/80">
                                {track.album}
                            </div>
                            <div className="flex justify-end text-sm text-muted-foreground font-mono group-hover:text-white/80">
                                {formatDuration(track.duration)}
                            </div>
                        </div>
                    ))}

                    {/* Repeating to fill list */}
                    {mockTracks.map((track, i) => (
                        <div
                            key={`${track.id}-repeat-${i}`}
                            className="group grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 items-center rounded-md px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <div className="text-sm text-muted-foreground group-hover:text-white w-4 justify-center flex">
                                <span className="group-hover:hidden">{i + 6}</span>
                                <Play className="hidden group-hover:block h-3 w-3 fill-white" />
                            </div>
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="relative h-10 w-10 shrink-0 rounded overflow-hidden">
                                    <Image src={track.coverUrl} alt={track.title} fill className="object-cover" />
                                </div>
                                <div className="flex flex-col truncate">
                                    <span className="font-medium text-white truncate">{track.title}</span>
                                    <span className="text-xs text-muted-foreground group-hover:text-white/80">{track.artist}</span>
                                </div>
                            </div>
                            <div className="text-sm text-muted-foreground truncate group-hover:text-white/80">
                                {track.album}
                            </div>
                            <div className="flex justify-end text-sm text-muted-foreground font-mono group-hover:text-white/80">
                                {formatDuration(track.duration)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
