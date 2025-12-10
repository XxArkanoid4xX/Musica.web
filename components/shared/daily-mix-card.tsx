import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface DailyMixCardProps {
    title: string;
    coverUrl: string;
    accentColor?: string;
    isPlaying?: boolean;
    onPlay?: () => void;
}

export function DailyMixCard({ title, coverUrl, accentColor = "bg-zinc-800", isPlaying, onPlay }: DailyMixCardProps) {
    return (
        <div
            onClick={onPlay}
            className="group relative flex h-20 w-full cursor-pointer items-center gap-4 overflow-hidden rounded-lg bg-white/5 pr-4 transition-all hover:bg-white/10 hover:scale-[1.02]"
        >
            <div className="relative h-full aspect-square">
                <Image
                    src={coverUrl}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>

            <span className={cn("flex-1 font-bold text-sm line-clamp-2", isPlaying ? "text-primary" : "text-white")}>
                {title}
            </span>

            <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg transition-all",
                isPlaying ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
            )}>
                {isPlaying ? (
                    <Pause className="h-5 w-5 fill-primary-foreground text-primary-foreground" />
                ) : (
                    <Play className="h-5 w-5 fill-primary-foreground text-primary-foreground ml-0.5" />
                )}
            </div>
        </div>
    );
}
