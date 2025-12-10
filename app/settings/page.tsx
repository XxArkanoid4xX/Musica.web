"use client";

import { Bell, Volume2, Globe, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

function SettingSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold font-heading mb-4 border-b border-white/10 pb-2">{title}</h2>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    )
}

function SettingItem({ icon: Icon, title, description, action }: any) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-white/10 text-white">
                    <Icon className="h-5 w-5" />
                </div>
                <div>
                    <h3 className="font-medium text-white">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
            <div>
                {action}
            </div>
        </div>
    )
}

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto pb-10">
            <h1 className="text-3xl font-bold font-heading mb-8">Settings</h1>

            <SettingSection title="Audio Preference">
                <SettingItem
                    icon={Volume2}
                    title="Audio Quality"
                    description="Stream in High Fidelity (Hi-Fi) when available"
                    action={<Button variant="outline" size="sm">High</Button>}
                />
                <SettingItem
                    icon={Volume2}
                    title="Normalize Volume"
                    description="Set the same volume level for all tracks"
                    action={<div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full" /></div>}
                />
            </SettingSection>

            <SettingSection title="Appearance">
                <SettingItem
                    icon={Moon}
                    title="Dark Mode"
                    description="Use dark theme across the application"
                    action={<div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full" /></div>}
                />
                <SettingItem
                    icon={Globe}
                    title="Language"
                    description="Choose your preferred language"
                    action={<Button variant="outline" size="sm">English</Button>}
                />
            </SettingSection>

            <SettingSection title="Notifications">
                <SettingItem
                    icon={Bell}
                    title="Push Notifications"
                    description="Get notified about new releases"
                    action={<div className="h-6 w-11 bg-zinc-700 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full" /></div>}
                />
            </SettingSection>

            <SettingSection title="About">
                <div className="p-4 text-center text-muted-foreground text-sm">
                    <p>Musica.web v1.0.0</p>
                    <p>Designed with ❤️ by Antigravity</p>
                </div>
            </SettingSection>
        </div>
    )
}
