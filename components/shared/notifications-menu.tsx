"use client";

import { useState } from "react";
import { Bell, Clock, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const MOCK_NOTIFICATIONS = [
    {
        id: 1,
        title: "New Release",
        message: "The Weeknd just dropped a new single!",
        time: "2m ago",
        read: false,
    },
    {
        id: 2,
        title: "Playlist Updated",
        message: "20 new tracks added to 'Weekly Top Hits'",
        time: "1h ago",
        read: false,
    },
    {
        id: 3,
        title: "Welcome",
        message: "Thanks for joining Musica.web!",
        time: "1d ago",
        read: true,
    }
];

export function NotificationsMenu() {
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleRead = () => {
        // Mark all as read when opening? Or just leave it for now
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) handleRead();
        }}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-white">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-black animate-pulse" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-zinc-950/95 border-white/10 text-white backdrop-blur-xl p-0">
                <div className="flex items-center justify-between p-4 pb-2">
                    <h4 className="font-semibold leading-none">Notifications</h4>
                    {unreadCount > 0 && (
                        <span className="text-xs text-primary">{unreadCount} new</span>
                    )}
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <ScrollArea className="h-[300px]">
                    <div className="flex flex-col p-2 gap-1">
                        {notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-white/5 data-[highlighted]:bg-white/5"
                            >
                                <div className="flex w-full items-start justify-between gap-2">
                                    <div className="flex items-center gap-2 font-medium">
                                        {!notification.read && <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
                                        <span className={cn("text-sm", !notification.read ? "text-white" : "text-muted-foreground")}>
                                            {notification.title}
                                        </span>
                                    </div>
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 pl-3.5">
                                    {notification.message}
                                </p>
                            </DropdownMenuItem>
                        ))}
                    </div>
                </ScrollArea>
                <DropdownMenuSeparator className="bg-white/10" />
                <div className="p-2">
                    <Button variant="ghost" className="w-full h-8 text-xs text-muted-foreground justify-center hover:text-white">
                        View all activity
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
