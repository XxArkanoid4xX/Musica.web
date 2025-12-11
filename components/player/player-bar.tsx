"use client";

import { usePlayerStore } from "@/store/player-store";
import { useLibraryStore } from "@/store/library-store"; // Import
import { useAudio } from "@/hooks/use-audio";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlayerBar() {
    const {
        currentTrack,
        isPlaying,
        togglePlay,
        volume,
        setVolume,
        currentTime,
        duration,
        playNext,
        playPrevious,
        queue,
        currentIndex,
        toggleFullScreen
    } = usePlayerStore();

    const { toggleLike, checkIsLiked } = useLibraryStore();

    // Initialize audio hook logic (side effects)
    useAudio();

    const isLiked = currentTrack ? checkIsLiked(currentTrack.id) : false;
    const hasNext = queue.length > 0 && currentIndex < queue.length - 1;
    const hasPrevious = queue.length > 0 && (currentIndex > 0 || currentTime > 3);

    if (!currentTrack) return null;

    return (
        <div className={cn(
            "fixed z-50 transition-all duration-300 flex items-center justify-between px-3 md:px-4",
            "bottom-[4.5rem] left-2 right-2 h-16 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-xl", // Mobile styles
            "md:bottom-0 md:left-0 md:right-0 md:h-24 md:rounded-none md:border-t md:border-x-0 md:border-b-0 md:shadow-none" // Desktop styles
        )}>
            {/* Track Info */}
            <div className="flex items-center gap-3 w-full md:w-[30%] overflow-hidden">
                <div
                    className="relative h-10 w-10 md:h-14 md:w-14 rounded overflow-hidden bg-muted cursor-pointer"
                    onClick={toggleFullScreen}
                >
                    <Image src={currentTrack.coverUrl} fill alt={currentTrack.title} className="object-cover" />
                </div>
                <div
                    className="flex flex-col overflow-hidden min-w-0 flex-1 cursor-pointer"
                    onClick={toggleFullScreen}
                >
                    <span className="font-bold text-sm text-foreground truncate">{currentTrack.title}</span>
                    <span className="text-xs text-muted-foreground truncate">{currentTrack.artist}</span>
                </div>
                {/* Heart Button - Hidden on very small screens if needed, but kept for now */}
                <Button
                    size="icon"
                    variant="ghost"
                    className={cn("hidden sm:flex text-muted-foreground hover:text-primary shrink-0 ml-2", isLiked && "text-primary hover:text-primary/80")}
                    onClick={(e) => { e.stopPropagation(); toggleLike(currentTrack as any); }}
                >
                    <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
                </Button>
            </div>

            {/* Controls - Centered on Desktop, Right aligned simplified on Mobile */}
            <div className="flex items-center gap-2 md:w-[40%] md:flex-col md:justify-center">
                {/* Mobile: Play Button Only or Play+Next */}
                <div className="flex items-center gap-2 md:gap-6">
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn("hidden md:flex text-muted-foreground hover:text-primary", (!hasPrevious && "opacity-50 cursor-not-allowed hover:text-muted-foreground"))}
                        onClick={playPrevious}
                        disabled={!hasPrevious}
                    >
                        <SkipBack className="h-5 w-5 fill-current" />
                    </Button>
                    <Button
                        size="icon"
                        className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    >
                        {isPlaying ? <Pause className="h-4 w-4 md:h-5 md:w-5 fill-current" /> : <Play className="h-4 w-4 md:h-5 md:w-5 fill-current ml-0.5" />}
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn("text-muted-foreground hover:text-primary", (!hasNext && "opacity-50 cursor-not-allowed hover:text-muted-foreground"))}
                        onClick={playNext}
                        disabled={!hasNext}
                    >
                        <SkipForward className="h-5 w-5 fill-current" />
                    </Button>
                </div>

                {/* Progress Bar - Hidden on Mobile, Visible Desktop */}
                <div className="hidden md:flex items-center gap-2 w-full max-w-md">
                    <span className="text-xs text-muted-foreground font-mono w-10 text-right">{formatTime(currentTime)}</span>
                    <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden relative group cursor-pointer">
                        {/* Progress Bar */}
                        <div
                            className="absolute top-0 left-0 bottom-0 bg-primary rounded-full group-hover:bg-primary/80 transition-colors"
                            style={{ width: `${(currentTime / (duration || 30)) * 100}%` }}
                        />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono w-10">{formatTime(duration || 30)}</span>
                </div>
            </div>

            {/* Volume & Extras - Hidden on Mobile */}
            <div className="hidden md:flex items-center justify-end gap-4 w-[30%]">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <div className="group w-24 h-1 bg-secondary rounded-full relative cursor-pointer flex items-center">
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                        className="absolute top-0 left-0 bottom-0 bg-primary rounded-full transition-all group-hover:bg-primary/80"
                        style={{ width: `${volume * 100}%` }}
                    />
                </div>
                <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary"
                    onClick={toggleFullScreen}
                >
                    <Maximize2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Mobile Progress Bar at bottom of card */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary md:hidden overflow-hidden rounded-b-xl">
                <div
                    className="h-full bg-primary"
                    style={{ width: `${(currentTime / (duration || 30)) * 100}%` }}
                />
            </div>
        </div>
    );
}
