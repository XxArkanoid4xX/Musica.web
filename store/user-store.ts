import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
    name: string;
    description: string;
    avatarUrl: string;
}

interface UserState {
    profile: UserProfile;
    updateProfile: (data: Partial<UserProfile>) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            profile: {
                name: "Antigravity User",
                description: "Music enthusiast & Developer.",
                avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&q=80"
            },
            updateProfile: (data) => set((state) => ({
                profile: { ...state.profile, ...data }
            })),
        }),
        {
            name: 'user-storage',
        }
    )
);
