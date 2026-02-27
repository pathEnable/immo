"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Home, Search, Heart, User, LogIn, LogOut } from "lucide-react";

const Navbar = () => {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const navLinks = [
        { name: "Accueil", href: "/", icon: <Home size={20} /> },
        { name: "Recherche", href: "/search", icon: <Search size={20} /> },
        { name: "Favoris", href: "/favorites", icon: <Heart size={20} /> },
        { name: "Gestion", href: "/dashboard", icon: <User size={20} /> },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-black text-indigo-immo tracking-tighter">
                            IMMO<span className="text-gold-immo">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.filter(link => link.name !== "Gestion" || status === "authenticated").map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative px-4 py-2 rounded-xl font-semibold transition-all ${isActive(link.href)
                                        ? "text-indigo-immo bg-indigo-immo/5"
                                        : "text-gray-500 hover:text-indigo-immo hover:bg-gray-50"
                                    }`}
                            >
                                {link.name}
                                {isActive(link.href) && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-gold-immo rounded-full" />
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        {status === "authenticated" ? (
                            <>
                                <Link href="/dashboard" className="flex items-center gap-2 text-indigo-immo font-bold bg-cream-immo px-4 py-2.5 rounded-xl border border-indigo-immo/10 hover:border-gold-immo transition-all">
                                    <User size={18} className="text-gold-immo" />
                                    {session.user?.name?.split(' ')[0]}
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="p-2.5 text-gray-400 hover:text-terracotta-immo hover:bg-red-50 rounded-xl transition-colors"
                                    aria-label="Se déconnecter"
                                    title="Déconnexion"
                                >
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <Link href="/login" className="btn-primary py-2.5 px-5 flex items-center gap-2 text-sm">
                                <LogIn size={16} />
                                Connexion
                            </Link>
                        )}
                    </div>

                    {/* Mobile Profile */}
                    <div className="md:hidden flex items-center gap-3">
                        {status === "authenticated" ? (
                            <Link href="/dashboard" className="flex items-center gap-2 text-indigo-immo font-bold bg-cream-immo px-3 py-2 rounded-xl border border-indigo-immo/10">
                                <User size={18} className="text-gold-immo" />
                                <span className="text-sm">{session.user?.name?.split(' ')[0]}</span>
                            </Link>
                        ) : (
                            <Link href="/login" className="btn-primary py-2 px-4 flex items-center gap-2 text-sm">
                                <LogIn size={16} />
                                Connexion
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
