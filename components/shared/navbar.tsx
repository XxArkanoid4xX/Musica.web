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
        <header className="sticky top-0 z-40 flex w-full items-center justify-between px-6 py-4 glass bg-background/40 backdrop-blur-md border-b border-white/5">
            {/* Left: Navigation Controls */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-accent/50 hover:bg-accent text-muted-foreground hover:text-foreground" disabled>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-accent/50 hover:bg-accent text-muted-foreground hover:text-foreground" disabled>
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>

                {/* Simple Breadcrumb / Title */}
                <h1 className="ml-2 text-lg font-bold tracking-tight hidden md:block text-foreground/90">
                    {getPageTitle()}
                </h1>
            </div>

            {/* Right: User Actions */}
            <div className="flex items-center gap-4">
                <NotificationsMenu />

                <div className="flex items-center gap-3 pl-2 border-l border-border">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-3 cursor-pointer group">
                                <span className="hidden text-sm font-medium text-foreground/80 md:inline-block group-hover:text-foreground transition-colors">
                                    {profile.name}
                                </span>
                                <Avatar className="h-9 w-9 border border-border transition-transform group-hover:scale-105">
                                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                                    <AvatarFallback className="bg-primary/20 text-primary">
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-popover border-border">
                            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link href="/profile">
                                <DropdownMenuItem className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Perfil</span>
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/settings">
                                <DropdownMenuItem className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Ajustes</span>
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600 focus:text-red-600">
                                Cerrar Sesión
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
