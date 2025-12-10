"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { Play, Clock, Heart, MoreHorizontal, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-service";
import { usePlayerStore } from "@/store/player-store"; // Import store

function formatDuration(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // Store actions
    const { setTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();

    useEffect(() => {
        api.getPlaylist(resolvedParams.id).then((res) => {
            setData(res);
            setLoading(false);
        });
    }, [resolvedParams.id]);

    const handlePlayTrack = (track: any) => {
        // Check if same track is clicked
        if (currentTrack?.id === String(track.id)) {
            togglePlay();
            return;
        }

        // Build Track object
        setTrack({
            id: String(track.id),
            title: track.title,
            artist: track.artist.name,
            album: track.album?.title || data.title,
            coverUrl: track.album?.cover_medium || data.picture_medium,
            duration: track.duration,
            audioUrl: track.preview // URL 30s MP3 from Deezer
        });
    };

    if (loading) return <div className="p-10 text-white">Loading...</div>;
    if (!data || data.error) return <div className="p-10 text-white">Playlist not found.</div>;

    return (
        <div className="flex flex-col h-full">
            {/* Header Section */}
            <div className="relative flex flex-col md:flex-row items-end gap-6 p-8 pb-6 bg-gradient-to-b from-zinc-900/80 to-background/0">
                <div className="relative h-52 w-52 shrink-0 shadow-2xl rounded-md overflow-hidden bg-zinc-800">
                    <Image
                        src={data.picture_xl}
                        alt={data.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                        Playlist
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight mb-2">
                        {data.title}
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium mb-2 line-clamp-2">
                        {data.description || "No description provided."}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-white/90">
                        <span className="font-bold">{data.creator?.name}</span>
                        <span className="text-white/60">•</span>
                        <span className="text-white/60">{data.nb_tracks} tracks</span>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-4 px-8 py-4 bg-black/20">
                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-lg text-primary-foreground"
                    onClick={() => data.tracks?.data[0] && handlePlayTrack(data.tracks.data[0])}
                >
                    <Play className="h-7 w-7 ml-1 fill-current" />
                </Button>
            </div>

            {/* Track List */}
            <div className="px-8 pb-8">
                <div className="grid grid-cols-[16px_4fr_3fr_minmax(60px,1fr)] gap-4 border-b border-white/5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">
                    <div>#</div>
                    <div>Title</div>
                    <div>Album</div>
                    <div className="flex justify-end"><Clock className="h-4 w-4" /></div>
                </div>

                <div className="flex flex-col">
                    {data.tracks?.data.map((track: any, i: number) => {
                        const isCurrent = currentTrack?.id === String(track.id);
                        return (
                            <div
                                key={track.id}
                                onClick={() => handlePlayTrack(track)}
                                className={cn(
                                    "group grid grid-cols-[16px_4fr_3fr_minmax(60px,1fr)] gap-4 items-center rounded-md px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer",
                                    isCurrent && "bg-white/10"
                                )}
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
                                        <Image src={track.album?.cover_small || data.picture_small} alt={track.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col truncate">
                                        <span className={cn("font-medium truncate", isCurrent ? "text-primary" : "text-white")}>{track.title}</span>
                                        <span className="text-xs text-muted-foreground group-hover:text-white/80">{track.artist?.name}</span>
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground truncate group-hover:text-white/80 hidden md:block">
                                    {track.album?.title}
                                </div>
                                <div className="flex justify-end text-sm text-muted-foreground font-mono group-hover:text-white/80">
                                    {formatDuration(track.duration)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Helper needed for `cn` call
import { cn } from "@/lib/utils";
