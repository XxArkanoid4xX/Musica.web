"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user-store";
import { useSearchStore } from "@/store/search-store";
import { DeezerTrack } from "@/lib/api-service";
import { searchTracks } from "@/app/actions/search";
import { HomePlayableTracks } from "./home-playable-tracks";
import { Clock, Sparkles } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";

interface HomeFeedProps {
    initialChartTracks: DeezerTrack[];
}

export function HomeFeed({ initialChartTracks }: HomeFeedProps) {
    const { profile } = useUserStore();
    const { history } = useSearchStore();
    const [recommendedTracks, setRecommendedTracks] = useState<DeezerTrack[]>([]);
    const [loadingRecs, setLoadingRecs] = useState(false);

    // Load recommendations based on user preferences
    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!profile.preferences?.artists?.length && !profile.preferences?.genres?.length) return;

            setLoadingRecs(true);
            try {
                // Pick a random artist or genre from preferences to keep it fresh
                const artists = profile.preferences.artists || [];
                const genres = profile.preferences.genres || [];
                const seeds = [...artists, ...genres];

                if (seeds.length === 0) return;

                const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];

                // Search for tracks related to this seed
                const res = await searchTracks(randomSeed);
                if (res.data) {
                    setRecommendedTracks(res.data.slice(0, 8)); // Top 8 matches
                }
            } catch (err) {
                console.error("Failed to load recommendations", err);
            } finally {
                setLoadingRecs(false);
            }
        };

        fetchRecommendations();
    }, [profile.preferences]);

    // Use history specific tracks (unique by ID)
    const recentTracks = history.filter((track, index, self) =>
        index === self.findIndex((t) => (
            t.id === track.id
        ))
    ).slice(0, 8); // Last 8 unique items

    return (
        <div className="space-y-12">

            {/* 1. Recently Played (from History) */}
            {recentTracks.length > 0 && (
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-6 pl-1 flex items-center gap-2">
                        <Clock className="h-6 w-6 text-primary" />
                        <h2 className="text-2xl font-bold font-heading">Volver a escuchar</h2>
                    </div>
                    <HomePlayableTracks tracks={recentTracks} />
                </section>
            )}

            {/* 2. Personalized Recommendations (or Charts fallback) */}
            <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                <div className="mb-6 pl-1 flex items-center gap-2">
                    {recommendedTracks.length > 0 ? (
                        <>
                            <Sparkles className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                            <h2 className="text-2xl font-bold font-heading">Especialmente para {profile.name.split(' ')[0]}</h2>
                        </>
                    ) : (
                        <h2 className="text-3xl font-bold font-heading">Top 100 Global</h2>
                    )}
                </div>

                {loadingRecs ? (
                    <div className="h-40 flex items-center justify-center text-muted-foreground">
                        Preparando tu mix...
                    </div>
                ) : (
                    <HomePlayableTracks tracks={recommendedTracks.length > 0 ? recommendedTracks : initialChartTracks} />
                )}
            </section>
        </div>
    );
}
