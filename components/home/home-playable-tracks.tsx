"use client";

import { usePlayerStore } from "@/store/player-store";
import { DeezerTrack } from "@/lib/api-service";
import { DailyMixCard } from "@/components/shared/daily-mix-card";
import { AnimatedSection } from "@/components/shared/animated-section";

interface HomePlayableTracksProps {
    tracks: DeezerTrack[];
}

export function HomePlayableTracks({ tracks }: HomePlayableTracksProps) {
    const { setTrack, currentTrack, isPlaying, togglePlay } = usePlayerStore();

    const handlePlay = (track: DeezerTrack) => {
        const isCurrent = currentTrack?.id === String(track.id);

        if (isCurrent) {
            togglePlay();
            return;
        }

        setTrack({
            id: String(track.id),
            title: track.title,
            artist: track.artist.name,
            album: track.album.title,
            coverUrl: track.album.cover_medium,
            duration: track.duration,
            audioUrl: track.preview
        });
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tracks.map((track) => (
                <AnimatedSection key={track.id} delay={0.1}>
                    <div onClick={() => handlePlay(track)} className="cursor-pointer">
                        <DailyMixCard
                            title={track.title}
                            coverUrl={track.album.cover_medium}
                            accentColor="bg-zinc-800"
                        />
                    </div>
                </AnimatedSection>
            ))}
        </div>
    );
}
