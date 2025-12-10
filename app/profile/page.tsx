"use client";

import Image from "next/image";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockPlaylists } from "@/data/mock-data";
import { ArtworkCard } from "@/components/shared/artwork-card";

export default function ProfilePage() {
    return (
        <div className="flex flex-col space-y-8 pb-10">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden border-4 border-black/40 shadow-xl">
                    <Image
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80"
                        alt="User Profile"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col items-center md:items-start mb-2">
                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Profile</span>
                    <h1 className="text-4xl md:text-5xl font-black font-heading mb-2">Antigravity User</h1>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                        <span><strong className="text-white">12</strong> Public Playlists</span>
                        <span>•</span>
                        <span><strong className="text-white">482</strong> Followers</span>
                        <span>•</span>
                        <span><strong className="text-white">124</strong> Following</span>
                    </div>
                </div>
                <div className="md:ml-auto">
                    <Button variant="outline" className="gap-2">
                        <Settings className="w-4 h-4" />
                        Edit Profile
                    </Button>
                </div>
            </div>

            {/* Public Playlists */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold font-heading">Public Playlists</h2>
                    <Button variant="ghost" className="text-xs text-muted-foreground">Show all</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {/* We mock some playlists owned by user */}
                    <ArtworkCard
                        title="My Top 2024"
                        subtitle="By Antigravity User"
                        coverUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80"
                    />
                    <ArtworkCard
                        title="Coding Focus"
                        subtitle="By Antigravity User"
                        coverUrl="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80"
                    />
                    <ArtworkCard
                        title="Gym Motivation"
                        subtitle="By Antigravity User"
                        coverUrl="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                    />
                </div>
            </section>

            {/* Top Artists (Mock) */}
            <section>
                <h2 className="text-xl font-bold font-heading mb-4">Top Artists this Month</h2>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col items-center gap-2 min-w-[120px]">
                            <div className="h-28 w-28 rounded-full bg-white/10 relative overflow-hidden">
                                <Image src={`https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80`} alt="Artist" fill className="object-cover" />
                            </div>
                            <span className="font-medium text-sm">Artist Name</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
