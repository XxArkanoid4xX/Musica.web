"use client";

import { usePlayerStore } from "@/store/player-store";
import { useAudio } from "@/hooks/use-audio";
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

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
        currentTime,
        duration,
    } = usePlayerStore();

    // Initialize audio hook logic (side effects)
    useAudio();

    if (!currentTrack) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-black/90 border-t border-white/10 backdrop-blur-lg z-50 px-4 flex items-center justify-between">
            {/* Track Info */}
            <div className="flex items-center gap-4 w-[30%]">
                <div className="relative h-14 w-14 rounded overflow-hidden bg-zinc-800">
                    <Image src={currentTrack.coverUrl} fill alt={currentTrack.title} className="object-cover" />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="font-bold text-sm text-white truncate">{currentTrack.title}</span>
                    <span className="text-xs text-muted-foreground truncate">{currentTrack.artist}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-2 w-[40%]">
                <div className="flex items-center gap-6">
                    <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-white" onClick={() => { }}>
                        <SkipBack className="h-5 w-5 fill-current" />
                    </Button>
                    <Button
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white text-black hover:scale-105 transition-transform"
                        onClick={togglePlay}
                    >
                        {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                    </Button>
                    <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-white" onClick={() => { }}>
                        <SkipForward className="h-5 w-5 fill-current" />
                    </Button>
                </div>

                <div className="flex items-center gap-2 w-full max-w-md">
                    <span className="text-xs text-muted-foreground font-mono w-10 text-right">{formatTime(currentTime)}</span>
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative group cursor-pointer">
                        {/* Progress Bar */}
                        <div
                            className="absolute top-0 left-0 bottom-0 bg-white rounded-full group-hover:bg-green-500 transition-colors"
                            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                        />
                    </div>
                    <span className="text-xs text-muted-foreground font-mono w-10">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume & Extras */}
            <div className="flex items-center justify-end gap-4 w-[30%]">
                <Volume2 className="h-5 w-5 text-muted-foreground" />
                <div className="w-24 h-1 bg-white/30 rounded-full relative">
                    <div className="absolute top-0 left-0 bottom-0 bg-white rounded-full" style={{ width: `${volume * 100}%` }} />
                </div>
                <Maximize2 className="h-4 w-4 text-muted-foreground" />
            </div>
        </div>
    );
}
