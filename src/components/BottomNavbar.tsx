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
        { name: "Accueil", href: "/", icon: <Home size={24} /> },
        { name: "Recherche", href: "/search", icon: <Search size={24} /> },
        { name: "Chat", href: "/chat", icon: <MessageCircle size={24} /> },
        { name: "Favoris", href: "/favorites", icon: <Heart size={24} /> },
        { name: "Profil", href: "/dashboard", icon: <User size={24} /> },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-100 pb-safe shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
            <div className="flex justify-around items-center h-16 px-2">
                {navLinks.filter(link => link.name !== "Profil" || status === "authenticated").map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${isActive ? "text-indigo-immo" : "text-gray-400 hover:text-indigo-immo"
                                }`}
                        >
                            <div className={`relative ${isActive ? "scale-110" : ""}`}>
                                {link.icon}
                                {isActive && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-immo rounded-full"></span>
                                )}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-tighter ${isActive ? "opacity-100" : "opacity-60"}`}>
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
