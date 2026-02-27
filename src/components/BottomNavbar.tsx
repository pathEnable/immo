"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Home, Search, Heart, MessageCircle, User } from "lucide-react";

const BottomNavbar = () => {
    const pathname = usePathname();
    const { status } = useSession();

    const navLinks = [
        { name: "Accueil", href: "/", icon: Home },
        { name: "Recherche", href: "/search", icon: Search },
        { name: "Chat", href: "/chat", icon: MessageCircle },
        { name: "Favoris", href: "/favorites", icon: Heart },
        { name: "Profil", href: "/dashboard", icon: User },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-100 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]" aria-label="Navigation mobile">
            <div className="flex justify-around items-center h-16 px-2 pb-safe">
                {navLinks.filter(link => link.name !== "Profil" || status === "authenticated").map((link) => {
                    const active = isActive(link.href);
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${active ? "text-indigo-immo" : "text-gray-400 hover:text-indigo-immo"
                                }`}
                            aria-label={link.name}
                            aria-current={active ? "page" : undefined}
                        >
                            <div className={`relative transition-transform ${active ? "scale-110" : ""}`}>
                                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                                {active && (
                                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gold-immo rounded-full" />
                                )}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-tighter ${active ? "opacity-100" : "opacity-60"}`}>
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavbar;
