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
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-card/95 border-t border-border backdrop-blur-xl z-50 px-4 flex items-center justify-between transition-colors duration-300">
            {/* Track Info */}
            <div className="flex items-center gap-4 w-[30%]">
                <div className="relative h-14 w-14 rounded overflow-hidden bg-muted">
                    <Image src={currentTrack.coverUrl} fill alt={currentTrack.title} className="object-cover" />
                </div>
                <div className="flex flex-col overflow-hidden min-w-0">
                    <span className="font-bold text-sm text-foreground truncate">{currentTrack.title}</span>
                    <span className="text-xs text-muted-foreground truncate">{currentTrack.artist}</span>
                </div>
                {/* Heart Button */}
                <Button
                    size="icon"
                    variant="ghost"
                    className={cn("text-muted-foreground hover:text-primary shrink-0 ml-2", isLiked && "text-primary hover:text-primary/80")}
                    onClick={() => toggleLike(currentTrack as any)}
                >
                    <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
                </Button>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-2 w-[40%]">
                <div className="flex items-center gap-6">
                    <Button
                        size="icon"
                        variant="ghost"
                        className={cn("text-muted-foreground hover:text-primary", (!hasPrevious && "opacity-50 cursor-not-allowed hover:text-muted-foreground"))}
                        onClick={playPrevious}
                        disabled={!hasPrevious}
                    >
                        <SkipBack className="h-5 w-5 fill-current" />
                    </Button>
                    <Button
                        size="icon"
                        className="h-10 w-10 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-lg shadow-primary/20"
                        onClick={togglePlay}
                    >
                        {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
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

                <div className="flex items-center gap-2 w-full max-w-md">
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

            {/* Volume & Extras */}
            <div className="flex items-center justify-end gap-4 w-[30%]">
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
        </div>
    );
}
