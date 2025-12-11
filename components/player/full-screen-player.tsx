"use client";

import { usePlayerStore } from "@/store/player-store";
import { ChevronDown, SkipBack, Play, Pause, SkipForward, Volume2, Heart, Shuffle, Repeat } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLibraryStore } from "@/store/library-store";

function formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export function FullScreenPlayer() {
    const {
        isFullScreen,
        toggleFullScreen,
        currentTrack,
        isPlaying,
        togglePlay,
        playNext,
        playPrevious,
        currentTime,
        duration,
        seekTo
    } = usePlayerStore();

    const { toggleLike, checkIsLiked } = useLibraryStore();

    if (!isFullScreen || !currentTrack) return null;

    const isLiked = checkIsLiked(currentTrack.id);

    return (
        <div className="fixed inset-0 z-[100] bg-background flex flex-col animate-in slide-in-from-bottom duration-500">
            {/* Dynamic Backdrop */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-background/80 z-10" />
                <Image src={currentTrack.coverUrl} fill alt="" className="object-cover blur-3xl opacity-50 scale-110" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full p-6 md:p-12 overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 md:mb-12">
                    <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="h-12 w-12 rounded-full hover:bg-white/10 text-foreground">
                        <ChevronDown className="h-8 w-8" />
                    </Button>
                    <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Now Playing</span>
                    <div className="w-12" /> {/* Spacer */}
                </div>

                {/* Main Body */}
                <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
                    {/* Artwork */}
                    <div className="w-full max-w-sm md:max-w-md aspect-square relative shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10">
                        <Image src={currentTrack.coverUrl} fill alt={currentTrack.title} className="object-cover" priority />
                    </div>

                    {/* Controls Section */}
                    <div className="w-full max-w-sm flex flex-col justify-center">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black font-heading text-foreground mb-2 leading-tight">
                                    {currentTrack.title}
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                                    {currentTrack.artist}
                                </p>
                            </div>
                            <Button
                                size="icon"
                                variant="ghost"
                                className={cn("h-12 w-12 text-muted-foreground hover:text-primary hover:bg-transparent -mb-2", isLiked && "text-primary")}
                                onClick={() => toggleLike(currentTrack as any)}
                            >
                                <Heart className={cn("h-8 w-8", isLiked && "fill-current")} />
                            </Button>
                        </div>

                        {/* Progress */}
                        <div className="mb-10 group">
                            <div
                                className="h-2 bg-secondary rounded-full relative cursor-pointer mb-2"
                                onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const percent = (e.clientX - rect.left) / rect.width;
                                    seekTo(percent * duration);
                                }}
                            >
                                <div
                                    className="absolute top-0 left-0 bottom-0 bg-primary rounded-full group-hover:bg-primary/80 transition-all"
                                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md transform scale-0 group-hover:scale-100 transition-all" />
                                </div>
                            </div>
                            <div className="flex justify-between text-xs font-medium text-muted-foreground font-mono">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Player Buttons */}
                        <div className="flex items-center justify-between mb-10">
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-primary hidden md:flex">
                                <Shuffle className="h-6 w-6" />
                            </Button>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-16 w-16 text-foreground hover:text-primary transition-colors"
                                onClick={playPrevious}
                            >
                                <SkipBack className="h-10 w-10 fill-current" />
                            </Button>

                            <Button
                                size="icon"
                                className="h-20 w-20 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-xl shadow-primary/30 flex items-center justify-center"
                                onClick={togglePlay}
                            >
                                {isPlaying ? <Pause className="h-10 w-10 fill-current" /> : <Play className="h-10 w-10 fill-current ml-1" />}
                            </Button>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="h-16 w-16 text-foreground hover:text-primary transition-colors"
                                onClick={playNext}
                            >
                                <SkipForward className="h-10 w-10 fill-current" />
                            </Button>

                            <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-primary hidden md:flex">
                                <Repeat className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
