"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Home, Search, Heart, User, LogIn, LogOut } from "lucide-react";

const Navbar = () => {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Accueil", href: "/", icon: <Home size={20} /> },
        { name: "Recherche", href: "/search", icon: <Search size={20} /> },
        { name: "Favoris", href: "/favorites", icon: <Heart size={20} /> },
        { name: "Gestion", href: "/dashboard", icon: <User size={20} /> },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-black text-indigo-immo tracking-tighter">
                            IMMO<span className="text-gold-immo">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.filter(link => link.name !== "Gestion" || status === "authenticated").map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-indigo-immo font-medium hover:text-gold-immo transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {status === "authenticated" ? (
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard" className="flex items-center gap-2 text-indigo-immo font-bold bg-cream-immo px-4 py-2 rounded-xl border border-indigo-immo/10">
                                    <User size={18} className="text-gold-immo" />
                                    {session.user?.name?.split(' ')[0]}
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="p-2 text-terracotta-immo hover:bg-red-50 rounded-xl transition-colors"
                                    title="Déconnexion"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="btn-primary py-2 px-5 flex items-center gap-2 text-sm">
                                <LogIn size={16} />
                                Connexion
                            </Link>
                        )}
                    </div>

                    {/* Mobile Branding/Profile */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 text-indigo-immo bg-cream-immo rounded-full">
                            <User size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
