"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ArtworkCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle: string;
    coverUrl: string;
    aspectRatio?: "square" | "video";
}

export function ArtworkCard({
    title,
    subtitle,
    coverUrl,
    aspectRatio = "square",
    className,
    ...props
}: ArtworkCardProps) {
    return (
        <div
            className={cn(
                "group relative flex flex-col gap-3 rounded-xl p-3 transition-all hover:bg-white/5 cursor-pointer",
                className
            )}
            {...props}
        >
            <div className={cn(
                "relative w-full overflow-hidden rounded-lg shadow-lg aspect-square",
                aspectRatio === "video" && "aspect-video"
            )}>
                <Image
                    src={coverUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay with Play Button */}
                <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center backdrop-blur-[2px]">
                    <Button
                        size="icon"
                        className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-xl scale-90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:scale-110"
                    >
                        <Play className="h-5 w-5 fill-current ml-1" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="font-medium truncate text-white block">{title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{subtitle}</p>
            </div>
        </div>
    );
}
