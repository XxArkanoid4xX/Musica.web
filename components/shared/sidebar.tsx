"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Logo } from "@/components/shared/logo";
import { usePlaylistStore } from "@/store/playlist-store";
import {
    Home,
    Search,
    Library,
    ListMusic,
    PlusCircle,
    Heart
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { playlists, createPlaylist } = usePlaylistStore();

    const handleCreatePlaylist = () => {
        const newId = createPlaylist();
        router.push(`/playlist/${newId}`);
    };

    const mainNav = [
        { name: "Home", icon: Home, href: "/" },
        { name: "Search", icon: Search, href: "/search" },
        { name: "Your Library", icon: Library, href: "/library" },
    ];

    return (
        <div className={cn("flex flex-col h-full bg-background/50 border-r border-white/5", className)}>
            {/* Header / Logo */}
            <div className="px-4 pb-2 pt-4">
                <Logo />
            </div>

            {/* Main Navigation */}
            <div className="flex-1 px-3 py-2 space-y-6">
                <div className="space-y-1">
                    {mainNav.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className="w-full justify-start gap-3 font-medium"
                                size="lg"
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Button>
                        </Link>
                    ))}
                </div>

                {/* Playlists Section */}
                <div className="py-2">
                    <h3 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Playlists
                    </h3>
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 hover:text-white"
                            onClick={handleCreatePlaylist}
                        >
                            <PlusCircle className="h-5 w-5" />
                            Create Playlist
                        </Button>
                        {/* Liked Songs Link */}
                        <Link href="/collection/tracks">
                            <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-white">
                                <div className="flex items-center justify-center h-5 w-5 rounded bg-gradient-to-br from-purple-600 to-blue-600 opacity-90">
                                    <Heart className="h-3 w-3 text-white fill-white" />
                                </div>
                                <span className={cn(pathname === '/collection/tracks' && "text-white font-medium")}>Liked Songs</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Scrollable Playlist List */}
                <ScrollArea className="h-[300px] px-1">
                    <div className="space-y-1 p-1">
                        {playlists.map((playlist) => (
                            <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
                                <Button
                                    variant={pathname === `/playlist/${playlist.id}` ? "secondary" : "ghost"}
                                    className="w-full justify-start font-normal text-muted-foreground hover:text-foreground truncate"
                                >
                                    <ListMusic className="mr-2 h-4 w-4 opacity-50" />
                                    <span className="truncate">{playlist.title}</span>
                                </Button>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
