"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { Play, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-service";
import { usePlayerStore } from "@/store/player-store";
import { cn } from "@/lib/utils";

function formatDuration(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const { setTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();

    useEffect(() => {
        api.getAlbum(resolvedParams.id).then((res) => {
            setData(res);
            setLoading(false);
        });
    }, [resolvedParams.id]);

    const handlePlayTrack = (track: any) => {
        if (currentTrack?.id === String(track.id)) {
            togglePlay();
            return;
        }

        setTrack({
            id: String(track.id),
            title: track.title,
            artist: track.artist.name,
            album: data.title,
            coverUrl: data.cover_medium,
            duration: track.duration,
            audioUrl: track.preview
        });
    };

    if (loading) return <div className="p-10 text-white">Loading album...</div>;
    if (!data || data.error) return <div className="p-10 text-white">Album not found.</div>;

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="relative flex flex-col md:flex-row items-end gap-6 p-8 pb-6 bg-gradient-to-b from-purple-900/40 to-background/0">
                <div className="relative h-52 w-52 shrink-0 shadow-2xl rounded-md overflow-hidden bg-zinc-800">
                    <Image
                        src={data.cover_xl}
                        alt={data.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                        Album
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight mb-2">
                        {data.title}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="relative h-6 w-6 rounded-full overflow-hidden">
                            <Image src={data.artist.picture_small} alt={data.artist.name} fill />
                        </div>
                        <span className="font-bold hover:underline cursor-pointer">{data.artist.name}</span>
                        <span className="text-white/60">•</span>
                        <span className="text-white/60">{data.release_date}</span>
                        <span className="text-white/60">•</span>
                        <span className="text-white/60">{data.nb_tracks} tracks</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 px-8 py-4 bg-black/20">
                <Button
                    size="icon"
                    className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-lg text-primary-foreground"
                    onClick={() => data.tracks?.data[0] && handlePlayTrack(data.tracks.data[0])}
                >
                    <Play className="h-7 w-7 ml-1 fill-current" />
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-white">
                    <Heart className="h-6 w-6" />
                </Button>
            </div>

            {/* Tracks */}
            <div className="px-8 pb-8">
                <div className="grid grid-cols-[16px_4fr_minmax(60px,1fr)] gap-4 border-b border-white/5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">
                    <div>#</div>
                    <div>Title</div>
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
                                    "group grid grid-cols-[16px_4fr_minmax(60px,1fr)] gap-4 items-center rounded-md px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer",
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
                                <div className="flex flex-col truncate">
                                    <span className={cn("font-medium truncate", isCurrent ? "text-primary" : "text-white")}>{track.title}</span>
                                    <span className="text-xs text-muted-foreground group-hover:text-white/80">{track.artist?.name}</span>
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
