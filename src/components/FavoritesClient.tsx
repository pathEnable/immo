"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, ShieldCheck, Trash2 } from "lucide-react";

type FavoriteItem = {
    id: string;
    property: {
        id: string;
        title: string;
        price: number;
        location: string;
        neighborhood: string;
        type: string;
        images: string[];
        isVerified: boolean;
    };
};

export default function FavoritesClient({ initialFavorites }: { initialFavorites: FavoriteItem[] }) {
    const [favorites, setFavorites] = useState(initialFavorites);
    const [removing, setRemoving] = useState<string | null>(null);

    const handleRemove = async (propertyId: string) => {
        setRemoving(propertyId);
        try {
            const res = await fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ propertyId }),
            });
            if (res.ok) {
                setFavorites((prev) => prev.filter((f) => f.property.id !== propertyId));
            }
        } catch (error) {
            console.error("Erreur lors de la suppression", error);
        } finally {
            setRemoving(null);
        }
    };

    if (favorites.length === 0) {
        return (
            <div className="bg-cream-immo min-h-screen flex items-center justify-center">
                <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-terracotta-immo/10 rounded-full flex items-center justify-center mx-auto">
                        <Heart size={48} className="text-terracotta-immo" />
                    </div>
                    <h2 className="text-3xl font-black text-indigo-immo">Aucun favori</h2>
                    <p className="text-gray-500 max-w-md">
                        Parcourez les biens et appuyez sur le cœur pour sauvegarder vos propriétés préférées.
                    </p>
                    <Link href="/search" className="btn-primary py-3 px-8 inline-flex items-center gap-2">
                        Explorer les biens
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cream-immo min-h-screen py-10 pb-32 md:pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-black text-indigo-immo tracking-tight mb-2">
                        Mes Favoris
                    </h1>
                    <p className="text-gray-500 font-medium">
                        {favorites.length} bien{favorites.length > 1 ? "s" : ""} sauvegardé{favorites.length > 1 ? "s" : ""}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favorites.map((fav) => (
                        <div key={fav.id} className="card-immo group relative flex flex-col h-full">
                            {/* Remove Button */}
                            <button
                                onClick={() => handleRemove(fav.property.id)}
                                disabled={removing === fav.property.id}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-md rounded-full text-terracotta-immo hover:bg-terracotta-immo hover:text-white transition-all shadow-md"
                            >
                                {removing === fav.property.id ? (
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <Trash2 size={18} />
                                )}
                            </button>

                            <div className="relative h-60 overflow-hidden">
                                <Image
                                    src={fav.property.images[0]}
                                    alt={fav.property.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                {fav.property.isVerified && (
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
                                        {fav.property.neighborhood}
                                    </div>
                                    <h4 className="text-xl font-bold text-indigo-immo leading-tight mb-4 group-hover:text-gold-immo transition-colors">
                                        {fav.property.title}
                                    </h4>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto">
                                    <div className="text-indigo-immo font-black text-xl">
                                        {fav.property.price.toLocaleString()} FCFA
                                        <span className="text-xs font-normal text-gray-400 block">/mois</span>
                                    </div>
                                    <Link href={`/property/${fav.property.id}`} className="btn-primary py-2 px-4 shadow-sm text-sm">
                                        Détails
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
