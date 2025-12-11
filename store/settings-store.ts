import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    audioQuality: 'normal' | 'high';
    normalizeVolume: boolean;
    darkMode: boolean;
    language: 'en' | 'es';
    notifications: boolean;

    setAudioQuality: (q: 'normal' | 'high') => void;
    toggleNormalizeVolume: () => void;
    toggleDarkMode: () => void;
    setLanguage: (l: 'en' | 'es') => void;
    toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            audioQuality: 'high',
            normalizeVolume: true,
            darkMode: true,
            language: 'es', // Default to Spanish as per user preference
            notifications: true,

            setAudioQuality: (q) => set({ audioQuality: q }),
            toggleNormalizeVolume: () => set((state) => ({ normalizeVolume: !state.normalizeVolume })),
            toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
            setLanguage: (l) => set({ language: l }),
            toggleNotifications: () => set((state) => ({ notifications: !state.notifications })),
        }),
        {
            name: 'app-settings',
        }
    )
);
