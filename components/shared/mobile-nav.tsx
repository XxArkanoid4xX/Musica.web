"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Library, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
    const pathname = usePathname();

    const links = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/search", icon: Search, label: "Search" },
        { href: "/library", icon: Library, label: "Library" },
        { href: "/profile", icon: User, label: "Profile" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-t border-border md:hidden h-16 pb-safe">
            <div className="flex items-center justify-around h-full">
                {links.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href;
                    return (
                        <Link key={href} href={href} className="w-full h-full">
                            <div className={cn(
                                "flex flex-col items-center justify-center h-full gap-1 transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}>
                                <Icon className={cn("h-6 w-6", isActive && "fill-current")} />
                                <span className="text-[10px] font-medium">{label}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
