"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
    ShieldCheck,
    ShieldAlert,
    Trash2,
    ExternalLink,
    Loader2
} from "lucide-react";

export default function AdminPropertyActions({
    propertyId,
    isVerified
}: {
    propertyId: string;
    isVerified: boolean;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleToggleVerify = async () => {
        try {
            const res = await fetch(`/api/admin/properties/${propertyId}/verify`, {
                method: "POST",
            });
            if (res.ok) {
                startTransition(() => {
                    router.refresh();
                });
            }
        } catch (error) {
            console.error("Failed to toggle verification", error);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce bien ? Cette action est irréversible.")) return;

        try {
            const res = await fetch(`/api/admin/properties/${propertyId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                startTransition(() => {
                    router.refresh();
                });
            }
        } catch (error) {
            console.error("Failed to delete property", error);
        }
    };

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                onClick={handleToggleVerify}
                disabled={isPending}
                className={`p-2 rounded-xl border transition-all ${isVerified
                        ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-600 hover:text-white"
                        : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-600 hover:text-white"
                    }`}
                title={isVerified ? "Révoquer la vérification" : "Vérifier le bien"}
            >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
            </button>

            <a
                href={`/property/${propertyId}`}
                target="_blank"
                className="p-2 bg-gray-50 border border-gray-100 text-gray-400 rounded-xl hover:bg-indigo-immo hover:text-white hover:border-indigo-immo transition-all"
                title="Voir le bien"
            >
                <ExternalLink size={16} />
            </a>

            <button
                onClick={handleDelete}
                disabled={isPending}
                className="p-2 bg-red-50 border border-red-100 text-red-400 rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                title="Supprimer définitivement"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}
