"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { Play, Clock, MoreHorizontal, Pen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-service";
import { usePlayerStore } from "@/store/player-store";
import { usePlaylistStore } from "@/store/playlist-store";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function formatDuration(seconds: number) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function PlaylistPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();

    // State for Deezer data
    const [remoteData, setRemoteData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // Stores
    const { playlists, deletePlaylist, updatePlaylist, removeTrackFromPlaylist } = usePlaylistStore();
    const { setTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();

    // Check if it's a local user playlist
    const localPlaylist = playlists.find(p => p.id === resolvedParams.id);
    const isLocal = !!localPlaylist;

    // Edit Mode state for Local Playlists
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");

    useEffect(() => {
        if (isLocal) {
            setLoading(false);
            setEditTitle(localPlaylist!.title);
            return;
        }

        // Connect to Deezer if not local
        // Assuming Deezer IDs are numeric (as string), UUIDs are longer and alphanumeric with hyphens usually
        // Simple check: if ID is short and numeric, it's deezer. If not found in local, try deezer.
        api.getPlaylist(resolvedParams.id).then((res) => {
            if (!res.error) {
                setRemoteData(res);
            }
            setLoading(false);
        });
    }, [resolvedParams.id, isLocal, localPlaylist]);

    const handlePlayTrack = (track: any) => {
        // Normalize based on source
        const trackId = String(track.id);

        if (currentTrack?.id === trackId) {
            togglePlay();
            return;
        }

        const targetTrack = {
            id: trackId,
            title: track.title,
            artist: isLocal ? track.artist : track.artist.name, // Local stores artist as string usually? No wait, store reuses TrackData which has artist string. Deezer has object.
            album: isLocal ? track.album : (track.album?.title || remoteData?.title),
            coverUrl: isLocal ? track.coverUrl : (track.album?.cover_medium || remoteData?.picture_medium),
            duration: track.duration,
            audioUrl: track.audioUrl || track.preview
        };

        setTrack(targetTrack);
    };

    const handleSaveTitle = () => {
        if (localPlaylist && editTitle.trim()) {
            updatePlaylist(localPlaylist.id, { title: editTitle });
            setIsEditing(false);
        }
    };

    const handleDeletePlaylist = () => {
        if (localPlaylist) {
            deletePlaylist(localPlaylist.id);
            router.push("/");
        }
    };

    const handleDeleteTrack = (trackId: string) => {
        if (localPlaylist) {
            removeTrackFromPlaylist(localPlaylist.id, trackId);
        }
    };

    if (loading) return <div className="p-10 text-white">Loading...</div>;

    // Decide which data to show
    const displayData = isLocal ? {
        title: localPlaylist.title,
        description: localPlaylist.description || "User Playlist",
        cover: localPlaylist.coverUrl,
        creator: "You",
        tracks: localPlaylist.tracks,
        isOwner: true
    } : {
        title: remoteData?.title,
        description: remoteData?.description,
        cover: remoteData?.picture_xl,
        creator: remoteData?.creator?.name,
        tracks: remoteData?.tracks?.data || [],
        isOwner: false
    };

    if (!displayData.title && !loading) return <div className="p-10 text-white">Playlist not found.</div>;

    return (
        <div className="flex flex-col h-full">
            {/* Header Section */}
            <div className="relative flex flex-col md:flex-row items-end gap-6 p-8 pb-6 bg-gradient-to-b from-zinc-800/80 to-background/0 group/header">
                <div className="relative h-52 w-52 shrink-0 shadow-2xl rounded-md overflow-hidden bg-zinc-800 group cursor-pointer">
                    <Image
                        src={displayData.cover || ""}
                        alt={displayData.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    {displayData.isOwner && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold text-white">Change Image</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                        Playlist
                    </span>

                    {isEditing ? (
                        <div className="flex gap-2 items-center mb-2">
                            <input
                                className="text-3xl md:text-5xl font-black font-heading tracking-tight bg-transparent border-b border-white outline-none w-full"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                autoFocus
                                onBlur={handleSaveTitle}
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                            />
                        </div>
                    ) : (
                        <h1
                            className={cn("text-3xl md:text-5xl font-black font-heading tracking-tight mb-2", displayData.isOwner && "cursor-pointer hover:underline")}
                            onClick={() => displayData.isOwner && setIsEditing(true)}
                        >
                            {displayData.title}
                        </h1>
                    )}

                    <p className="text-muted-foreground text-sm font-medium mb-2 line-clamp-2">
                        {displayData.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-white/90">
                        <span className="font-bold">{displayData.creator}</span>
                        <span className="text-white/60">•</span>
                        <span className="text-white/60">{displayData.tracks?.length || 0} tracks</span>
                    </div>
                </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-4 px-8 py-4 bg-black/20">
                {(displayData.tracks?.length > 0) && (
                    <Button
                        size="icon"
                        className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 hover:scale-105 transition-all shadow-lg text-primary-foreground"
                        onClick={() => displayData.tracks[0] && handlePlayTrack(displayData.tracks[0])}
                    >
                        <Play className="h-7 w-7 ml-1 fill-current" />
                    </Button>
                )}

                {displayData.isOwner && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                                <MoreHorizontal className="h-8 w-8" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48 bg-black/90 border-white/10 text-white">
                            <DropdownMenuItem onClick={() => setIsEditing(true)}>
                                <Pen className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={handleDeletePlaylist}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Playlist
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* Track List */}
            <div className="px-8 pb-8">
                {(displayData.tracks?.length === 0 && displayData.isOwner) ? (
                    <div className="py-20 text-center text-muted-foreground">
                        <p className="mb-4">This playlist is empty.</p>
                        <Button onClick={() => router.push('/search')} variant="outline">Find Songs to Add</Button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-[16px_4fr_3fr_minmax(60px,1fr)] gap-4 border-b border-white/5 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">
                            <div>#</div>
                            <div>Title</div>
                            <div>Album</div>
                            <div className="flex justify-end"><Clock className="h-4 w-4" /></div>
                        </div>

                        <div className="flex flex-col">
                            {displayData.tracks.map((track: any, i: number) => {
                                // Normalize structure for rendering if needed (local vs deezer)
                                const trackId = String(track.id);
                                const artistName = isLocal ? track.artist : track.artist?.name;
                                const albumTitle = isLocal ? track.album : track.album?.title;
                                const cover = isLocal ? track.coverUrl : (track.album?.cover_small || remoteData?.picture_small);

                                const isCurrent = currentTrack?.id === trackId;

                                return (
                                    <div
                                        key={`${trackId}-${i}`}
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
                                                <Image src={cover || ""} alt={track.title} fill className="object-cover" />
                                            </div>
                                            <div className="flex flex-col truncate">
                                                <span className={cn("font-medium truncate", isCurrent ? "text-primary" : "text-white")}>{track.title}</span>
                                                <span className="text-xs text-muted-foreground group-hover:text-white/80">{artistName}</span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-muted-foreground truncate group-hover:text-white/80 hidden md:block">
                                            {albumTitle}
                                        </div>
                                        <div className="flex justify-end items-center text-sm text-muted-foreground font-mono group-hover:text-white/80 gap-4">
                                            <span>{formatDuration(track.duration)}</span>
                                            {displayData.isOwner && (
                                                <Button
                                                    variant="ghost" size="icon"
                                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-all"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteTrack(trackId);
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
