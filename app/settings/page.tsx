"use client";

import { Bell, Volume2, Globe, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useSettingsStore } from "@/store/settings-store";

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

const translations = {
    en: {
        title: "Settings",
        audio: "Audio Preference",
        quality: "Audio Quality",
        qualityDesc: "Stream in High Fidelity (Hi-Fi) when available",
        normalize: "Normalize Volume",
        normalizeDesc: "Set the same volume level for all tracks",
        appearance: "Appearance",
        dark: "Dark Mode",
        darkDesc: "Use dark theme across the application",
        lang: "Language",
        langDesc: "Choose your preferred language",
        notif: "Notifications",
        push: "Push Notifications",
        pushDesc: "Get notified about new releases",
        about: "About",
        high: "High",
        normal: "Normal"
    },
    es: {
        title: "Ajustes",
        audio: "Preferencias de Audio",
        quality: "Calidad de Audio",
        qualityDesc: "Reproducir en Alta Fidelidad (Hi-Fi) cuando esté disponible",
        normalize: "Normalizar Volumen",
        normalizeDesc: "Establecer el mismo nivel de volumen para todas las pistas",
        appearance: "Apariencia",
        dark: "Modo Oscuro",
        darkDesc: "Usar tema oscuro en la aplicación",
        lang: "Idioma",
        langDesc: "Elige tu idioma preferido",
        notif: "Notificaciones",
        push: "Notificaciones Push",
        pushDesc: "Recibe notificaciones sobre nuevos lanzamientos",
        about: "Acerca de",
        high: "Alta",
        normal: "Normal"
    }
};

export default function SettingsPage() {
    const {
        audioQuality, setAudioQuality,
        normalizeVolume, toggleNormalizeVolume,
        darkMode, toggleDarkMode,
        language, setLanguage,
        notifications, toggleNotifications
    } = useSettingsStore();

    const t = translations[language];

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <h1 className="text-3xl font-bold font-heading mb-8">{t.title}</h1>

            <SettingSection title={t.audio}>
                <SettingItem
                    icon={Volume2}
                    title={t.quality}
                    description={t.qualityDesc}
                    action={
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setAudioQuality(audioQuality === 'high' ? 'normal' : 'high')}
                            className="w-24"
                        >
                            {audioQuality === 'high' ? t.high : t.normal}
                        </Button>
                    }
                />
                <SettingItem
                    icon={Volume2}
                    title={t.normalize}
                    description={t.normalizeDesc}
                    action={
                        <Switch
                            checked={normalizeVolume}
                            onCheckedChange={toggleNormalizeVolume}
                        />
                    }
                />
            </SettingSection>

            <SettingSection title={t.appearance}>
                <SettingItem
                    icon={Moon}
                    title={t.dark}
                    description={t.darkDesc}
                    action={
                        <Switch
                            checked={darkMode}
                            onCheckedChange={toggleDarkMode}
                        />
                    }
                />
                <SettingItem
                    icon={Globe}
                    title={t.lang}
                    description={t.langDesc}
                    action={
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                            className="w-24"
                        >
                            {language === 'en' ? 'English' : 'Español'}
                        </Button>
                    }
                />
            </SettingSection>

            <SettingSection title={t.notif}>
                <SettingItem
                    icon={Bell}
                    title={t.push}
                    description={t.pushDesc}
                    action={
                        <Switch
                            checked={notifications}
                            onCheckedChange={toggleNotifications}
                        />
                    }
                />
            </SettingSection>

            <SettingSection title={t.about}>
                <div className="p-4 text-center text-muted-foreground text-sm flex flex-col gap-1">
                    <p className="font-bold text-white">Músic-AI v1.0.0 Alpha</p>
                    <p>Designed with ❤️ by Antigravity</p>
                    <p className="text-xs mt-2 opacity-50">Session ID: {Math.random().toString(36).substring(7)}</p>
                </div>
            </SettingSection>
        </div>
    )
}
