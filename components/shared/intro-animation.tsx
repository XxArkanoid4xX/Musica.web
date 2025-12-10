"use client";

import { useEffect, useState } from "react";
import { Disc3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function IntroAnimation() {
    const [stage, setStage] = useState<'initial' | 'moving' | 'finished'>('initial');
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        // Start sequence
        const timer1 = setTimeout(() => setStage('moving'), 1000); // Wait 1s looking at big logo
        const timer2 = setTimeout(() => setStage('finished'), 2500); // 1.5s for move animation
        const timer3 = setTimeout(() => setHidden(true), 3000); // Cleanup

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    if (hidden) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700",
                stage === 'finished' ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
        >
            <div
                className={cn(
                    "fixed flex items-center gap-3 transition-all duration-1000 ease-in-out",
                    stage === 'initial'
                        ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[4]"
                        : "top-6 left-6 scale-100" // Approximate sidebar position
                )}
            >
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 shadow-2xl">
                    <Disc3 className="h-7 w-7 animate-[spin_3s_linear_infinite] text-white" />
                </div>

                <span className={cn(
                    "font-heading text-3xl font-black tracking-tighter text-white whitespace-nowrap overflow-hidden transition-all duration-1000",
                    stage === 'initial' ? "w-0 opacity-0" : "w-[200px] opacity-100"
                )}>
                    Músic-AI
                </span>
            </div>
        </div>
    );
}
