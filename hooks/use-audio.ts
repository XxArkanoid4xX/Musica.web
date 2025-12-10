// hooks/use-audio.ts
"use client";

import { useState, useRef, useEffect } from "react";
import { usePlayerStore } from "@/store/player-store";

export function useAudio() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { currentTrack, isPlaying, volume, play, pause, nextTrack, currentTime, duration, setCurrentTime, setDuration: setStoreDuration } = usePlayerStore();

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }
    }, []);

    // Update Source when track changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentTrack?.audioUrl) return;

        if (audio.src !== currentTrack.audioUrl) {
            audio.src = currentTrack.audioUrl;
            audio.load();
            if (isPlaying) {
                audio.play().catch(e => console.error("Play error", e));
            }
        }
    }, [currentTrack]);

    // Handle Play/Pause
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying && audio.paused) {
            audio.play().catch(e => console.error("Play error", e));
        } else if (!isPlaying && !audio.paused) {
            audio.pause();
        }
    }, [isPlaying]);

    // Handle Volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Handle Events
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setStoreDuration(audio.duration);
        };

        const handleEnded = () => {
            // Auto next track logic would go here
            pause();
            setCurrentTime(0);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [setCurrentTime, setStoreDuration, pause]);

    return audioRef.current;
}
