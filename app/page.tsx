"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DailyMixCard } from "@/components/shared/daily-mix-card";
import { ArtworkCard } from "@/components/shared/artwork-card";
import { SectionTitle } from "@/components/shared/section-title";
import { mockMixes, mockPlaylists, mockAlbums } from "@/data/mock-data";

export default function Home() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex flex-col space-y-10 min-h-full pb-8">
            {/* Greeting Section (Good Morning) */}
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 pl-1"
                >
                    <h1 className="text-3xl font-bold font-heading">Good Morning</h1>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                    {mockMixes.slice(0, 6).map((mix) => (
                        <motion.div key={mix.id} variants={item}>
                            <Link href={`/playlist/${mix.id}`}>
                                <DailyMixCard
                                    title={mix.title}
                                    coverUrl={mix.coverUrl}
                                    accentColor={mix.accent}
                                />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Featured Playlists Section (Bento/Grid) */}
            <section>
                <SectionTitle title="Made For You" subtitle="Curated playlists based on your taste" />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {mockPlaylists.map((playlist) => (
                        <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
                            <ArtworkCard
                                title={playlist.title}
                                subtitle={playlist.description}
                                coverUrl={playlist.coverUrl}
                            />
                        </Link>
                    ))}
                </div>
            </section>

            {/* New Releases Section */}
            <section>
                <SectionTitle title="New Releases" subtitle="Fresh from the studio" />

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {mockAlbums.map((album) => (
                        <Link href={`/album/${album.id}`} key={album.id}>
                            <ArtworkCard
                                title={album.title}
                                subtitle={`${album.artist} • ${album.year}`}
                                coverUrl={album.coverUrl}
                            />
                        </Link>
                    ))}
                    {/* Dummy cards to fill space if needed */}
                    <ArtworkCard
                        title="Cyber City"
                        subtitle="Various • 2024"
                        coverUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
                    />
                </div>
            </section>
        </div>
    );
}
