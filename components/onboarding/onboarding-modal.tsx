"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, Music, Star, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUserStore } from "@/store/user-store";
import { cn } from "@/lib/utils";

const GENRES = [
    "Pop", "Rock", "Hip-Hop", "R&B", "Electronic",
    "Latin", "Indie", "Classical", "Jazz", "Metal",
    "Reggaeton", "K-Pop", "Country", "Soul", "Alternative"
];

const ARTISTS = [
    { name: "The Weeknd", img: "https://api.deezer.com/artist/4050205/image" },
    { name: "Taylor Swift", img: "https://api.deezer.com/artist/12246/image" },
    { name: "Bad Bunny", img: "https://api.deezer.com/artist/10583405/image" },
    { name: "Drake", img: "https://api.deezer.com/artist/246791/image" },
    { name: "Dua Lipa", img: "https://api.deezer.com/artist/895591/image" },
    { name: "Coldplay", img: "https://api.deezer.com/artist/145/image" },
    { name: "Imagine Dragons", img: "https://api.deezer.com/artist/384236/image" },
    { name: "BTS", img: "https://api.deezer.com/artist/4458643/image" },
    { name: "Rosalía", img: "https://api.deezer.com/artist/10430061/image" },
    { name: "Karol G", img: "https://api.deezer.com/artist/4890980/image" }
];

export function OnboardingModal() {
    const { profile, setPreferences } = useUserStore();
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);

    // Selections
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        // Prevent hydration mismatch by checking mounting or using a small timeout if needed
        // but store persistence handling usually works fine in useEffect
        if (isMounted && profile && !profile.hasOnboarded) {
            setIsOpen(true);
        }
    }, [profile, isMounted]);

    const toggleGenre = (genre: string) => {
        setSelectedGenres(prev =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        );
    };

    const toggleArtist = (artist: string) => {
        setSelectedArtists(prev =>
            prev.includes(artist) ? prev.filter(a => a !== artist) : [...prev, artist]
        );
    };

    const handleFinish = () => {
        setPreferences(selectedGenres, selectedArtists);
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            // Force user to complete or specifically close via logic, can't just click outside easily if we want to enforce it.
            // But for UX, let's allow close but it will come back on refresh if not finished? No, better to keep it open until finished or user dismisses.
            // Let's prevent closing by clicking outside for 'mandatory' feel or just allow it.
            // setPreferences sets hasOnboarded to true. If they close without finishing, it stays false.
            if (!open) {
                // Optional: Allow skip? 
                // setIsOpen(false); 
            }
        }}>
            <DialogContent className="max-w-3xl h-[80vh] bg-zinc-950 border-white/10 p-0 overflow-hidden flex flex-col md:flex-row gap-0 text-white">
                {/* Sidebar Image / Deco */}
                <div className="hidden md:flex w-1/3 bg-gradient-to-br from-indigo-600 to-purple-800 p-8 flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-20 bg-white/10 blur-[80px] rounded-full translate-x-10 -translate-y-10" />

                    <div>
                        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mb-6">
                            <Music className="text-purple-600 fill-current h-6 w-6" />
                        </div>
                        <h2 className="text-3xl font-black font-heading mb-2">Welcome</h2>
                        <p className="text-white/80 text-sm">Let&apos;s personalize your experience. Tell us what you love.</p>
                    </div>

                    <div className="flex gap-2">
                        <div className={cn("h-1 flex-1 rounded-full", step >= 1 ? "bg-white" : "bg-white/30")} />
                        <div className={cn("h-1 flex-1 rounded-full", step >= 2 ? "bg-white" : "bg-white/30")} />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 overflow-y-auto bg-black/50">
                    <div className="h-full flex flex-col">

                        {step === 1 && (
                            <div className="animate-in slide-in-from-right fade-in duration-300 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold mb-2">Pick your favorite genres</h3>
                                <p className="text-muted-foreground mb-6">Select at least 3 genres you enjoy.</p>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    {GENRES.map(genre => {
                                        const isSelected = selectedGenres.includes(genre);
                                        return (
                                            <button
                                                key={genre}
                                                onClick={() => toggleGenre(genre)}
                                                className={cn(
                                                    "px-6 py-3 rounded-full border text-sm font-medium transition-all hover:scale-105 active:scale-95",
                                                    isSelected
                                                        ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                                                        : "bg-transparent border-white/20 text-white hover:border-white/50"
                                                )}
                                            >
                                                {genre}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-auto flex justify-end">
                                    <Button
                                        size="lg"
                                        onClick={() => setStep(2)}
                                        disabled={selectedGenres.length === 0}
                                        className="rounded-full px-8"
                                    >
                                        Next <ChevronRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in slide-in-from-right fade-in duration-300 flex-1 flex flex-col">
                                <Button
                                    variant="ghost"
                                    className="self-start -ml-4 mb-4 text-muted-foreground"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </Button>

                                <h3 className="text-2xl font-bold mb-2">Artists you like</h3>
                                <p className="text-muted-foreground mb-6">Select a few artists to get better recommendations.</p>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 overflow-y-auto pr-2 max-h-[400px]">
                                    {ARTISTS.map(artist => {
                                        const isSelected = selectedArtists.includes(artist.name);
                                        return (
                                            <div
                                                key={artist.name}
                                                onClick={() => toggleArtist(artist.name)}
                                                className="group cursor-pointer flex flex-col items-center gap-2"
                                            >
                                                <div className={cn(
                                                    "relative h-24 w-24 rounded-full overflow-hidden transition-all border-2",
                                                    isSelected ? "border-green-500 scale-105 shadow-xl" : "border-transparent opacity-70 group-hover:opacity-100"
                                                )}>
                                                    <Image src={artist.img} fill alt={artist.name} className="object-cover" />
                                                    {isSelected && (
                                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                            <Check className="h-8 w-8 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <span className={cn("text-xs font-medium text-center", isSelected ? "text-white" : "text-muted-foreground")}>
                                                    {artist.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-auto flex justify-end">
                                    <Button
                                        size="lg"
                                        onClick={handleFinish}
                                        className="rounded-full px-8 bg-white text-black hover:bg-white/90"
                                    >
                                        Finish
                                    </Button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
