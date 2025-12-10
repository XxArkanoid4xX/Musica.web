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
        { name: "Inicio", icon: Home, href: "/" },
        { name: "Buscar", icon: Search, href: "/search" },
        { name: "Tu Biblioteca", icon: Library, href: "/library" },
    ];

    return (
        <div className={cn(
            "group/sidebar flex flex-col h-full bg-black/60 backdrop-blur-md border-r border-white/5 transition-[width] duration-300 w-20 hover:w-64 overflow-hidden z-50",
            className
        )}>
            {/* Header / Logo */}
            <div className="px-5 pb-6 pt-6 flex items-center h-16">
                {/* Compact Logo */}
                <div className="flex-shrink-0 group-hover/sidebar:hidden transition-all text-2xl font-black text-primary">
                    M.
                </div>
                {/* Full Logo */}
                <div className="hidden group-hover/sidebar:block min-w-[150px] animate-in fade-in duration-200">
                    <Logo />
                </div>
            </div>

            {/* Main Navigation */}
            <div className="flex-1 px-3 py-2 space-y-6 overflow-hidden">
                <div className="space-y-1">
                    {mainNav.map((item) => (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-4 font-medium h-12 px-3 transition-all",
                                    pathname === item.href ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
                                )}
                            >
                                <item.icon className="h-6 w-6 shrink-0" />
                                <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    {item.name}
                                </span>
                            </Button>
                        </Link>
                    ))}
                </div>

                {/* Playlists Section */}
                <div className="py-2 border-t border-white/5 pt-4">
                    <h3 className="px-4 mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap overflow-hidden">
                        Tus Playlists
                    </h3>
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-4 hover:text-white px-3 h-12"
                            onClick={handleCreatePlaylist}
                        >
                            <PlusCircle className="h-6 w-6 shrink-0" />
                            <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                Crear Playlist
                            </span>
                        </Button>
                        {/* Liked Songs Link */}
                        <Link href="/collection/tracks">
                            <Button variant="ghost" className="w-full justify-start gap-4 text-muted-foreground hover:text-white px-3 h-12">
                                <div className="flex items-center justify-center h-6 w-6 rounded bg-gradient-to-br from-purple-600 to-blue-600 opacity-90 shrink-0">
                                    <Heart className="h-3.5 w-3.5 text-white fill-white" />
                                </div>
                                <span className={cn(
                                    "opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap",
                                    pathname === '/collection/tracks' && "text-white font-medium"
                                )}>
                                    Tus Me Gusta
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Scrollable Playlist List */}
                <ScrollArea className="h-[300px] px-1 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-500">
                    <div className="space-y-1 p-1">
                        {playlists.map((playlist) => (
                            <Link href={`/playlist/${playlist.id}`} key={playlist.id}>
                                <Button
                                    variant={pathname === `/playlist/${playlist.id}` ? "secondary" : "ghost"}
                                    className="w-full justify-start font-normal text-muted-foreground hover:text-foreground truncate h-10 px-2"
                                >
                                    <ListMusic className="mr-2 h-4 w-4 opacity-50 shrink-0" />
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
