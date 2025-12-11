"use client";

import { useEffect } from "react";
import { useSettingsStore } from "@/store/settings-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { darkMode } = useSettingsStore();

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [darkMode]);

    return <>{children}</>;
}
