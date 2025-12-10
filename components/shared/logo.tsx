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
                "flex items-center gap-3 px-2 py-4 transition-all hover:opacity-90 group/logo",
                className
            )}
        >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-lg group-hover/logo:scale-105 transition-transform duration-300">
                <Disc3 className="h-6 w-6 animate-[spin_5s_linear_infinite] text-white" />
            </div>

            {!collapsed && (
                <span className="font-heading text-2xl font-black tracking-tighter text-white animate-in slide-in-from-left-4 fade-in duration-500 whitespace-nowrap">
                    Músic-AI
                </span>
            )}
        </Link>
    );
}
