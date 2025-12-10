"use client";

import { useEffect, useState } from "react";

interface Star {
    id: number;
    top: number;
    left: number;
    size: number;
    delay: number;
    opacity: number;
}

export function NeonBackground() {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        // Generate random stars only on client side to match hydration
        const newStars = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 2 + 1, // 1px to 3px
            delay: Math.random() * 3,
            opacity: Math.random() * 0.5 + 0.3,
        }));
        setStars(newStars);
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Neon Border Frame - Intensified */}
            <div className="absolute inset-0 z-10 border-[2px] border-purple-500/40 shadow-[inset_0_0_100px_rgba(168,85,247,0.5)] animate-pulse-slow">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-80 shadow-[0_0_20px_rgba(168,85,247,1)]"></div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-80 shadow-[0_0_20px_rgba(168,85,247,1)]"></div>
                <div className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-80 shadow-[0_0_20px_rgba(168,85,247,1)]"></div>
                <div className="absolute inset-y-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-80 shadow-[0_0_20px_rgba(168,85,247,1)]"></div>
            </div>

            {/* Stars */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white shadow-[0_0_6px_#fff,0_0_15px_#a855f7]"
                    style={{
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        animation: `twinkle 3s infinite ease-in-out ${star.delay}s`
                    }}
                />
            ))}

            {/* Soft global ambient glow */}
            <div className="absolute inset-0 bg-background/0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-background/0 to-background/0" />

            <style jsx>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 10px #d8b4fe; }
                }
            `}</style>
        </div>
    );
}
