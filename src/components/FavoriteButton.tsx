"use client";

import React, { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FavoriteButton({
    propertyId,
    initialFavorited = false,
    size = 20,
    className = "",
}: {
    propertyId: string;
    initialFavorited?: boolean;
    size?: number;
    className?: string;
}) {
    const { status } = useSession();
    const router = useRouter();
    const [isFavorited, setIsFavorited] = useState(initialFavorited);
    const [isPending, startTransition] = useTransition();

    const handleToggle = async () => {
        if (status !== "authenticated") {
            router.push("/login");
            return;
        }

        // Optimistic update
        setIsFavorited((prev) => !prev);

        try {
            const res = await fetch("/api/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ propertyId }),
            });

            if (!res.ok) {
                // Revert optimistic update on error
                setIsFavorited((prev) => !prev);
            } else {
                startTransition(() => {
                    router.refresh();
                });
            }
        } catch {
            setIsFavorited((prev) => !prev);
        }
    };

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleToggle();
            }}
            disabled={isPending}
            className={`p-2 rounded-full transition-all ${isFavorited
                    ? "bg-terracotta-immo/90 text-white shadow-lg"
                    : "bg-white/20 backdrop-blur-md text-white hover:bg-white/40 hover:text-terracotta-immo"
                } ${className}`}
            title={isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
            <Heart size={size} fill={isFavorited ? "currentColor" : "none"} />
        </button>
    );
}
