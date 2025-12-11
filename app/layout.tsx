import type { Metadata } from 'next';
import { fontSans, fontHeading } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/shared/sidebar';
import { Navbar } from '@/components/shared/navbar';
import { PlayerBar } from '@/components/player/player-bar';
import { OnboardingModal } from '@/components/onboarding/onboarding-modal';
import { IntroAnimation } from '@/components/shared/intro-animation';
import { NeonBackground } from '@/components/shared/neon-background';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { FullScreenPlayer } from '@/components/player/full-screen-player';
import { MobileNav } from '@/components/shared/mobile-nav';
import './globals.css';

export const metadata: Metadata = {
    title: 'Musica.web | High-End Audio Streaming',
    description: 'A futuristic music experience designed for audiophiles.',
    icons: {
        icon: '/icon.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body
                className={cn(
                    "h-full overflow-hidden bg-background font-sans antialiased selection:bg-white/10",
                    fontSans.variable,
                    fontHeading.variable
                )}
            >
                <ThemeProvider>
                    <div className="flex h-screen overflow-hidden bg-background relative">
                        <NeonBackground />
                        <IntroAnimation />
                        {/* Sidebar Area - Fixed position with initial width reserved space */}
                        <aside className="fixed left-0 top-0 h-full hidden md:block z-50 w-20">
                            <Sidebar className="h-full w-full shadow-2xl" />
                        </aside>

                        {/* Main Content Area - Offset by collapsed sidebar width */}
                        <div className="flex flex-1 flex-col overflow-hidden relative z-10 md:ml-20 transition-all duration-300">
                            {/* Navbar sits on top of the scrollable content visually or structurally */}
                            <Navbar />

                            {/* Scrollable Page Content */}
                            <main className="flex-1 overflow-y-auto bg-background/30 scroll-smooth">
                                <div className="container mx-auto p-6 md:p-8 pb-32">
                                    {children}
                                </div>
                            </main>

                            {/* Player Bar Overlay */}
                            <PlayerBar />
                            <FullScreenPlayer />
                            <MobileNav />
                            <OnboardingModal />
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html >
    );
}
