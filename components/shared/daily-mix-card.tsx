"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface DailyMixCardProps {
    title: string;
    coverUrl: string;
    accentColor?: string;
}

export function DailyMixCard({ title, coverUrl, accentColor = "bg-zinc-800" }: DailyMixCardProps) {
    return (
        <div className="group relative flex h-16 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-md bg-white/5 pr-4 transition-colors hover:bg-white/10">
            <div className="relative h-full aspect-square">
                <Image
                    src={coverUrl}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            <span className="flex-1 font-bold text-sm line-clamp-2">{title}</span>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                <Play className="h-4 w-4 fill-primary-foreground text-primary-foreground ml-0.5" />
            </div>
        </div>
    );
}
