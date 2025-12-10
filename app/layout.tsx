import type { Metadata } from 'next';
import { fontSans, fontHeading } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/shared/sidebar';
import { Navbar } from '@/components/shared/navbar';
import { PlayerBar } from '@/components/player/player-bar';
import { OnboardingModal } from '@/components/onboarding/onboarding-modal'; // Import Added
import './globals.css';

export const metadata: Metadata = {
    title: 'Musica.web | High-End Audio Streaming',
    description: 'A futuristic music experience designed for audiophiles.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark h-full">
            <body
                className={cn(
                    "h-full overflow-hidden bg-background font-sans antialiased selection:bg-white/10",
                    fontSans.variable,
                    fontHeading.variable
                )}
            >
                <div className="flex h-screen overflow-hidden">
                    {/* Sidebar Area - Fixed Width (Hidden on mobile for now) */}
                    <aside className="hidden w-64 flex-none md:block">
                        <Sidebar className="h-full w-full" />
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex flex-1 flex-col overflow-hidden relative z-10">
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
                        <OnboardingModal />
                    </div>
                </div>
            </body>
        </html>
    );
}
