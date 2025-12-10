"use client";

import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ChevronLeft,
    ChevronRight,
    Bell,
    User,
    Settings
} from "lucide-react";
import { cn } from '@/lib/utils';
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/store/user-store";
import { NotificationsMenu } from "@/components/shared/notifications-menu";

export function Navbar() {
    const pathname = usePathname();
    const { profile } = useUserStore();

    // Example breadcrumb generation logic
    const getPageTitle = () => {
        if (pathname === '/') return 'Home';
        const segment = pathname.split('/')[1];
        return segment.charAt(0).toUpperCase() + segment.slice(1);
    };

    return (
        <header className="sticky top-0 z-40 flex w-full items-center justify-between px-6 py-4 glass">
            {/* Left: Navigation Controls */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-muted-foreground hover:text-white" disabled>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-muted-foreground hover:text-white" disabled>
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>

                {/* Simple Breadcrumb / Title */}
                <h1 className="ml-2 text-lg font-bold tracking-tight hidden md:block text-white/90">
                    {getPageTitle()}
                </h1>
            </div>

            {/* Right: User Actions */}
            <div className="flex items-center gap-4">
                <NotificationsMenu />

                <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <span className="hidden text-sm font-medium text-white/80 md:inline-block group-hover:text-white transition-colors">
                                    {profile.name}
                                </span>
                                <Avatar className="h-9 w-9 border border-white/10 transition-transform group-hover:scale-105">
                                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                                    <AvatarFallback className="bg-primary/20 text-primary">
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 glass border-white/10 text-white bg-black/80 backdrop-blur-xl">
                            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <Link href="/profile">
                                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Perfil</span>
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/settings">
                                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Ajustes</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20">
                                Cerrar Sesión
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
