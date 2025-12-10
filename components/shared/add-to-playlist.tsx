"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlaylistStore } from "@/store/playlist-store";
import { TrackData } from "@/store/player-store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AddToPlaylistProps {
    track: TrackData;
    children: React.ReactNode;
}

export function AddToPlaylistMenu({ track, children }: AddToPlaylistProps) {
    const { playlists, addTrackToPlaylist, createPlaylist } = usePlaylistStore();
    const [isOpen, setIsOpen] = useState(false);

    const handleCreateAndAdd = () => {
        const id = createPlaylist();
        addTrackToPlaylist(id, track);
        // Toast notification would correspond here
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-white/10 text-white">
                <DropdownMenuLabel>Add to Playlist</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={handleCreateAndAdd} className="cursor-pointer">
                    <Plus className="mr-2 h-4 w-4" /> New Playlist
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                {playlists.map(playlist => (
                    <DropdownMenuItem
                        key={playlist.id}
                        onClick={() => addTrackToPlaylist(playlist.id, track)}
                        className="cursor-pointer"
                    >
                        {playlist.title}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
