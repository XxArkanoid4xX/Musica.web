"use client";

import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
                    <label className="group relative h-40 w-40 rounded-full overflow-hidden border-4 border-white/10 cursor-pointer shadow-2xl transition-transform hover:scale-105">
                        <Image src={formData.avatarUrl} alt="Avatar" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                            <span className="text-sm font-bold text-white">Change Photo</span>
                            <span className="text-xs text-white/70 mt-1">Max 2MB</span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    if (file.size > 2 * 1024 * 1024) {
                                        alert("File is too large! Please choose an image under 2MB.");
                                        return;
                                    }
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setFormData(prev => ({ ...prev, avatarUrl: reader.result as string }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </label>
                    <p className="text-xs text-muted-foreground">Click the image to upload a new photo from your device.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Display Name</label>
                    <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Bio</label>
                    <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <Button type="submit" size="lg" className="w-full">Save Profile</Button>
                </div>
            </form>
        </div>
    );
}
