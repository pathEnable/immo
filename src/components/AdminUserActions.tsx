"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
    ShieldCheck,
    ShieldAlert,
    Trash2,
    Loader2,
    User
} from "lucide-react";

export default function AdminUserActions({
    userId,
    currentRole
}: {
    userId: string;
    currentRole: string;
}) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleUpdateRole = async (nextRole: string) => {
        if (!confirm(`Voulez-vous vraiment passer cet utilisateur en ${nextRole} ?`)) return;

        try {
            const res = await fetch(`/api/admin/users/${userId}/role`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: nextRole }),
            });
            if (res.ok) {
                startTransition(() => {
                    router.refresh();
                });
            }
        } catch (error) {
            console.error("Failed to update role", error);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Voulez-vous supprimer ce compte ? Toutes ses données (favoris, etc.) seront perdues.")) return;

        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                startTransition(() => {
                    router.refresh();
                });
            }
        } catch (error) {
            console.error("Failed to delete user", error);
        }
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {/* AGENT Button */}
            <button
                onClick={() => handleUpdateRole("AGENT")}
                disabled={isPending || currentRole === "AGENT"}
                className={`p-2 rounded-xl border transition-all ${currentRole === "AGENT"
                    ? "bg-gold-immo text-white border-gold-immo"
                    : "bg-gray-50 text-gray-400 border-gray-100 hover:bg-gold-immo hover:text-white"
                    }`}
                title="Définir comme AGENT"
            >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : <ShieldAlert size={16} />}
            </button>

            {/* ADMIN Button */}
            <button
                onClick={() => handleUpdateRole("ADMIN")}
                disabled={isPending || currentRole === "ADMIN"}
                className={`p-2 rounded-xl border transition-all ${currentRole === "ADMIN"
                    ? "bg-indigo-immo text-white border-indigo-immo"
                    : "bg-gray-50 text-gray-400 border-gray-100 hover:bg-indigo-immo hover:text-white"
                    }`}
                title="Définir comme ADMIN"
            >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
            </button>

            {/* Revert to USER */}
            <button
                onClick={() => handleUpdateRole("USER")}
                disabled={isPending || currentRole === "USER"}
                className={`p-2 rounded-xl border transition-all ${currentRole === "USER"
                    ? "bg-gray-100 text-gray-500 border-gray-200"
                    : "bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-200 hover:text-gray-600"
                    }`}
                title="Rétrograder en Client (USER)"
            >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : <User size={16} />}
            </button>

            <button
                onClick={handleDelete}
                disabled={isPending}
                className="p-2 bg-red-50 border border-red-100 text-red-400 rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                title="Supprimer le compte"
            >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            </button>
        </div>
    );
}
