import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
    genres: string[];
    artists: string[];
}

interface UserProfile {
    name: string;
    description: string;
    avatarUrl: string;
    preferences?: UserPreferences;
    hasOnboarded?: boolean;
}

interface UserState {
    profile: UserProfile;
    updateProfile: (data: Partial<UserProfile>) => void;
    setPreferences: (genres: string[], artists: string[]) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            profile: {
                name: "Antigravity User",
                description: "Music enthusiast & Developer.",
                avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80",
                hasOnboarded: false,
                preferences: {
                    genres: [],
                    artists: []
                }
            },
            updateProfile: (data) => set((state) => ({
                profile: { ...state.profile, ...data }
            })),
            setPreferences: (genres, artists) => set((state) => ({
                profile: {
                    ...state.profile,
                    hasOnboarded: true,
                    preferences: { genres, artists }
                }
            }))
        }),
        {
            name: 'user-storage',
        }
    )
);
