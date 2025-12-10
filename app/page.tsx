// app/page.tsx (Server Component)

import Link from "next/link";
import { DailyMixCard } from "@/components/shared/daily-mix-card";
import { ArtworkCard } from "@/components/shared/artwork-card";
import { SectionTitle } from "@/components/shared/section-title";
import { AnimatedSection } from "@/components/shared/animated-section";
import { api, DeezerTrack, DeezerAlbum, DeezerPlaylist } from "@/lib/api-service";
import { HomePlayableTracks } from "@/components/home/home-playable-tracks";

export default async function Home() {
    // Fetch real data from Deezer (Server-side)
    const chart = await api.getChart();

    const topPlaylists: DeezerPlaylist[] = chart.playlists?.data || [];
    const topAlbums: DeezerAlbum[] = chart.albums?.data || [];
    const topTracks: DeezerTrack[] = chart.tracks?.data || [];

    return (
        <div className="flex flex-col space-y-10 min-h-full pb-8">
            {/* Greeting Section (Real Chart Tracks as Mock Mixes for now) */}
            <section>
                <div className="mb-6 pl-1">
                    <h1 className="text-3xl font-bold font-heading animate-fade-in">Charts & Trending</h1>
                </div>

                <HomePlayableTracks tracks={topTracks.slice(0, 8)} />
            </section>

            {/* Top Playlists */}
            <section>
                <SectionTitle title="Top Playlists" subtitle="Global hits right now" />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {topPlaylists.slice(0, 10).map((playlist) => (
                        <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
                            <ArtworkCard
                                title={playlist.title}
                                subtitle={`By ${playlist.user.name}`}
                                coverUrl={playlist.picture_xl}
                            />
                        </Link>
                    ))}
                </div>
            </section>

            {/* Top Albums */}
            <section>
                <SectionTitle title="Top Albums" subtitle="Most streamed albums" />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {topAlbums.slice(0, 10).map((album) => (
                        <Link href={`/album/${album.id}`} key={album.id}>
                            <ArtworkCard
                                title={album.title}
                                subtitle={album.artist.name}
                                coverUrl={album.cover_xl}
                            />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
