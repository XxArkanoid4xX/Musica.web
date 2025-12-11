"use client";

import Image from "next/image";
import Link from "next/link";
import { PlusCircle, ListMusic, Music, Mic2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlaylistStore } from "@/store/playlist-store";
import { useUserStore } from "@/store/user-store";
import { useLibraryStore } from "@/store/library-store";
import { cn } from "@/lib/utils";

export default function LibraryPage() {
    const { playlists, createPlaylist } = usePlaylistStore();
    const { profile } = useUserStore();
    const { likedTracks } = useLibraryStore();

    const handleCreate = () => {
        // Logic handled in sidebar usually but good to have here
        // For now just empty or could link to logic
    };

    const preferences = (profile as any).preferences;

    return (
        <div className="flex flex-col gap-8 pb-8">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-4xl font-black font-heading tracking-tight mb-2">Your Library</h1>
                    <p className="text-muted-foreground text-lg">Your collection of music and playlists.</p>
                </div>
            </div>

            {/* Musical Taste Section (New) */}
            {(preferences?.genres?.length > 0 || preferences?.artists?.length > 0) && (
                <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500 fill-red-500" /> Your Taste
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Genres */}
                        {preferences.genres.length > 0 && (
                            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-300 mb-4 flex items-center gap-2">
                                    <Music className="h-4 w-4" /> Favorite Genres
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {preferences.genres.map((genre: string) => (
                                        <span key={genre} className="px-3 py-1 rounded-full bg-white/10 text-sm font-medium border border-white/5">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Artists */}
                        {preferences.artists.length > 0 && (
                            <div className="bg-gradient-to-br from-pink-900/40 to-rose-900/40 border border-white/10 rounded-xl p-6">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-pink-300 mb-4 flex items-center gap-2">
                                    <Mic2 className="h-4 w-4" /> Favorite Artists
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {preferences.artists.map((artist: string) => (
                                        <span key={artist} className="px-3 py-1 rounded-full bg-white/10 text-sm font-medium border border-white/5">
                                            {artist}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Playlists Grid */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                    <ListMusic className="h-5 w-5 text-primary" /> Playlists
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {/* Create New Card */}
                    <div
                        className="aspect-square rounded-md bg-white/5 hover:bg-white/10 border border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer transition-all group"
                        onClick={createPlaylist} // This needs router push logic wrapper really, but for display
                    >
                        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <PlusCircle className="h-6 w-6 text-muted-foreground group-hover:text-white" />
                        </div>
                        <span className="font-medium text-sm text-muted-foreground group-hover:text-white">Create New</span>
                    </div>

                    {/* Liked Songs Card */}
                    <Link href="/collection/tracks">
                        <div className="aspect-square rounded-md bg-gradient-to-br from-indigo-500 to-purple-700 p-4 flex flex-col justify-end cursor-pointer shadow-lg hover:scale-[1.02] transition-transform relative group">
                            <div className="absolute top-4 left-4">
                                <Heart className="h-6 w-6 text-white fill-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">Liked Songs</h3>
                                <p className="text-white/80 text-xs mt-1">{likedTracks.length} liked songs</p>
                            </div>
                        </div>
                    </Link>

                    {/* User Playlists */}
                    {playlists.map(playlist => (
                        <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
                            <div className="group space-y-3 cursor-pointer p-3 rounded-md hover:bg-white/5 transition-colors">
                                <div className="aspect-square relative rounded-md overflow-hidden bg-zinc-800 shadow-lg">
                                    <Image
                                        src={playlist.coverUrl}
                                        alt={playlist.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm truncate text-white">{playlist.title}</h3>
                                    <p className="text-xs text-muted-foreground truncate">By {profile.name}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
