// app/page.tsx (Server Component)

import Link from "next/link";
import { DailyMixCard } from "@/components/shared/daily-mix-card";
import { ArtworkCard } from "@/components/shared/artwork-card";
import { SectionTitle } from "@/components/shared/section-title";
import { AnimatedSection } from "@/components/shared/animated-section";
import { api, DeezerTrack, DeezerAlbum, DeezerPlaylist } from "@/lib/api-service";
import { HomeFeed } from "@/components/home/home-feed";

export default async function Home() {
    // Fetch real data from Deezer (Server-side)
    const chart = await api.getChart();

    const topPlaylists: DeezerPlaylist[] = chart.playlists?.data || [];
    const topAlbums: DeezerAlbum[] = chart.albums?.data || [];
    const topTracks: DeezerTrack[] = chart.tracks?.data || [];

    return (
        <div className="flex flex-col space-y-10 min-h-full pb-8">
            {/* Dynamic Feed (Recently Played + Recommendations) */}
            <HomeFeed initialChartTracks={topTracks.slice(0, 8)} />

            {/* Top Playlists */}
            <section>
                <SectionTitle title="Listas Hits" subtitle="Lo que suena en el mundo" />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {topPlaylists.slice(0, 10).map((playlist) => (
                        <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
                            <ArtworkCard
                                title={playlist.title}
                                subtitle={`De ${playlist.user.name}`}
                                coverUrl={playlist.picture_xl}
                            />
                        </Link>
                    ))}
                </div>
            </section>

            {/* Top Albums */}
            <section>
                <SectionTitle title="Álbumes Top" subtitle="Los discos más escuchados" />

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
