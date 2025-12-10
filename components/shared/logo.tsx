import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Disc3 } from 'lucide-react';

interface LogoProps {
    className?: string;
    collapsed?: boolean;
}

export function Logo({ className, collapsed = false }: LogoProps) {
    return (
        <Link
            href="/"
            className={cn(
                "flex items-center gap-2 px-2 py-4 transition-all hover:opacity-90",
                className
            )}
        >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Disc3 className="h-5 w-5 animate-spin-slow text-primary" />
            </div>

            {!collapsed && (
                <span className="font-heading text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Musica
                </span>
            )}
        </Link>
    );
}
