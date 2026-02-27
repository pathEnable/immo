"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { MapPin, Filter, SlidersHorizontal, ShieldCheck, Home } from "lucide-react";
import FavoriteButton from "./FavoriteButton";

type Property = {
    id: string;
    title: string;
    price: number;
    location: string;
    neighborhood: string;
    type: string;
    images: string[];
    isVerified: boolean;
};

function PropertyCard({ prop }: { prop: Property }) {
    return (
        <div className="card-immo group flex flex-col h-full">
            <div className="relative h-60 overflow-hidden">
                <Image
                    src={prop.images[0]}
                    alt={prop.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <FavoriteButton propertyId={prop.id} className="absolute top-4 right-4" />
                {prop.isVerified && (
                    <div className="absolute top-4 left-4 verified-badge">
                        <ShieldCheck size={14} />
                        Vérifié
                    </div>
                )}
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                        <MapPin size={12} className="text-gold-immo" />
                        {prop.neighborhood}
                    </div>
                    <h4 className="text-xl font-bold text-indigo-immo leading-tight mb-4 group-hover:text-gold-immo transition-colors">
                        {prop.title}
                    </h4>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto">
                    <div className="text-indigo-immo font-bold text-lg">
                        {prop.price.toLocaleString()} <span className="text-sm font-semibold">FCFA</span>
                        <span className="text-xs font-normal text-gray-500 block">/mois</span>
                    </div>
                    <Link href={`/property/${prop.id}`} className="btn-primary py-2 px-4 shadow-sm text-sm">
                        Détails
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function SearchResults({ initialProperties }: { initialProperties: Property[] }) {
    const searchParams = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("Tous");
    const [sortBy, setSortBy] = useState("recent");

    useEffect(() => {
        const q = searchParams.get("q") || "";
        const type = searchParams.get("type") || "";
        setSearchQuery(q);
        if (type && type !== "Type de bien") setTypeFilter(type);
    }, [searchParams]);

    const types = ["Tous", "Appartement", "Villa", "Studio", "Chambre", "Bureau"];

    const filtered = initialProperties
        .filter((p) => typeFilter === "Tous" || p.type === typeFilter)
        .filter((p) => !searchQuery || p.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase()) || p.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === "price-asc") return a.price - b.price;
            if (sortBy === "price-desc") return b.price - a.price;
            return 0;
        });

    return (
        <div className="bg-cream-immo min-h-screen">
            {/* Header Search Section */}
            <div className="bg-indigo-immo py-8 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Où cherchez-vous ? (ex: Cocody, Plateau...)"
                                className="w-full bg-white/10 border border-white/20 text-white rounded-xl py-4 pl-12 pr-4 outline-none focus:bg-white/20 transition-all placeholder:text-indigo-200"
                            />
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-immo" size={20} />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="hidden md:flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white rounded-xl py-4 px-6 hover:bg-white/20 transition-all"
                        >
                            <SlidersHorizontal size={20} className="text-gold-immo" />
                            Filtres
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Floating Filter Button */}
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden fixed bottom-24 right-6 z-40 bg-indigo-immo text-white p-4 rounded-full shadow-2xl border-2 border-gold-immo"
            >
                <Filter size={24} />
            </button>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filters (Desktop) */}
                    <aside className="hidden lg:block w-80 shrink-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-32">
                            <div className="flex items-center gap-2 mb-8 text-indigo-immo font-bold text-xl">
                                <Filter size={24} className="text-gold-immo" />
                                Affiner la recherche
                            </div>

                            <div className="space-y-8">
                                {/* Type de bien */}
                                <div>
                                    <label className="block text-sm font-bold text-indigo-immo/60 uppercase tracking-widest mb-4">Type de bien</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {types.map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setTypeFilter(type)}
                                                className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all border ${typeFilter === type
                                                    ? "bg-indigo-immo text-white border-indigo-immo shadow-md"
                                                    : "bg-white text-indigo-immo border-gray-100 hover:border-gold-immo"
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Budget */}
                                <div>
                                    <label className="block text-sm font-bold text-indigo-immo/60 uppercase tracking-widest mb-4">Budget Max (FCFA)</label>
                                    <input type="range" className="w-full accent-gold-immo mb-4" min="50000" max="2000000" step="50000" />
                                    <div className="flex justify-between text-indigo-immo font-bold">
                                        <span>50 000</span>
                                        <span className="text-gold-immo">1 500 000+</span>
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div>
                                    <label className="block text-sm font-bold text-indigo-immo/60 uppercase tracking-widest mb-4">Équipements</label>
                                    <div className="space-y-3">
                                        {["Piscine", "Parking Sécurisé", "Climatisation", "Gardien 24h/7", "Meublé"].map((item) => (
                                            <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-immo focus:ring-gold-immo cursor-pointer" />
                                                <span className="text-indigo-immo font-medium group-hover:text-gold-immo transition-colors">{item}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Results Section */}
                    <main className="flex-grow">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-xl font-bold text-indigo-immo">
                                <span className="text-2xl font-black text-gold-immo">{filtered.length}</span> résultat{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
                            </h1>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white border border-gray-100 rounded-lg px-4 py-2 text-indigo-immo font-medium outline-none shadow-sm cursor-pointer hover:border-gold-immo transition-all"
                            >
                                <option value="recent">Plus récents</option>
                                <option value="price-asc">Prix croissant</option>
                                <option value="price-desc">Prix décroissant</option>
                            </select>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <div className="w-20 h-20 bg-cream-immo rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Home size={36} className="text-gold-immo" />
                                </div>
                                <h3 className="text-xl font-bold text-indigo-immo mb-2">Aucun bien trouvé</h3>
                                <p className="text-gray-600 text-sm mb-6 max-w-xs mx-auto">Essayez d&apos;élargir vos critères de recherche.</p>
                                <button
                                    onClick={() => { setTypeFilter("Tous"); setSearchQuery(""); }}
                                    className="btn-primary py-2.5 px-6 text-sm"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {filtered.map((prop) => (
                                    <PropertyCard key={prop.id} prop={prop} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
