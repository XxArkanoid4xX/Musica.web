"use client";

import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Need to check if exists, or use standard input
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function EditProfilePage() {
    const router = useRouter();
    const { profile, updateProfile } = useUserStore();
    const [formData, setFormData] = useState(profile);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
        router.push("/profile");
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <Button variant="ghost" onClick={() => router.back()} className="mb-6 pl-0 hover:pl-2 transition-all gap-2 text-muted-foreground">
                <ArrowLeft className="h-4 w-4" /> Back
            </Button>

            <h1 className="text-3xl font-bold font-heading mb-8">Edit Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white/10 group cursor-pointer">
                        <Image src={formData.avatarUrl} alt="Avatar" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold">Change</span>
                        </div>
                    </div>
                    {/* Simplified URL input for avatar for now */}
                    <div className="w-full">
                        <label className="block text-sm font-medium mb-2 text-muted-foreground">Avatar URL</label>
                        <input
                            type="url"
                            value={formData.avatarUrl}
                            onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Display Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Bio</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <Button type="submit" size="lg" className="w-full">Save Profile</Button>
                </div>
            </form>
        </div>
    );
}
