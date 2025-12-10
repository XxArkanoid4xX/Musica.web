"use client";

import { cn } from "@/lib/utils";

export function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    return (
        <div
            className="animate-fade-in opacity-0"
            style={{
                animationDelay: `${delay}s`,
                animationFillMode: 'forwards'
            }}
        >
            {children}
        </div>
    );
}
