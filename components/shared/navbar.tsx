"use client";

import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    ChevronLeft,
    ChevronRight,
    Bell,
    User
} from "lucide-react";
import { cn } from '@/lib/utils';

export function Navbar() {
    const pathname = usePathname();

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
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                    <Bell className="h-5 w-5" />
                </Button>

                <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                    <span className="hidden text-sm font-medium text-white/80 md:inline-block">
                        Antigravity User
                    </span>
                    <Avatar className="h-9 w-9 border border-white/10 transition-transform hover:scale-105 cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback className="bg-primary/20 text-primary">
                            <User className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
