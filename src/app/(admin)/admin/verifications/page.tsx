"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
    ShieldCheck,
    ShieldAlert,
    XCircle,
    CheckCircle2,
    Clock,
    Eye,
    Phone,
    Briefcase,
    Loader2,
    AlertCircle,
    User
} from "lucide-react";

interface VerificationRequest {
    id: string;
    userId: string;
    agencyName: string;
    professionalPhone: string;
    idCardUrl: string;
    address: string | null;
    status: string;
    createdAt: string;
    user: {
        name: string;
        email: string;
        image: string | null;
    };
}

export default function AdminVerificationsPage() {
    const [requests, setRequests] = useState<VerificationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
    const [isPending, startTransition] = useTransition();

    const fetchRequests = async () => {
        try {
            const res = await fetch("/api/admin/verifications");
            if (!res.ok) throw new Error("Erreur de chargement");
            const data = await res.json();
            setRequests(data);
        } catch (err) {
            setError("Impossible de charger les demandes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (id: string, status: "APPROVED" | "REJECTED", message?: string) => {
        if (!confirm(`Confirmer la ${status === "APPROVED" ? "validation" : "rejet"} ?`)) return;

        try {
            const res = await fetch(`/api/admin/verifications/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, adminMessage: message }),
            });

            if (res.ok) {
                fetchRequests();
                setSelectedRequest(null);
            }
        } catch (err) {
            alert("Erreur lors de l'action.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 size={40} className="animate-spin text-indigo-immo" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-black text-indigo-immo tracking-tight mb-2">Vérifications d&apos;Agents</h1>
                <p className="text-gray-500 font-medium italic">Examinez et validez les demandes de partenariat professionnel.</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-10">
                {/* List of Requests */}
                <div className="lg:col-span-2 space-y-4">
                    {requests.length === 0 ? (
                        <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 italic text-gray-400">
                            Aucune demande de vérification pour le moment.
                        </div>
                    ) : (
                        requests.map((req) => (
                            <div
                                key={req.id}
                                className={`bg-white p-6 rounded-3xl shadow-sm border transition-all cursor-pointer hover:shadow-md ${selectedRequest?.id === req.id ? "border-indigo-immo ring-2 ring-indigo-immo/5" : "border-gray-50"
                                    }`}
                                onClick={() => setSelectedRequest(req)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-immo/5 flex items-center justify-center text-indigo-immo">
                                            {req.user.image ? (
                                                <img src={req.user.image} alt={req.user.name} className="w-full h-full rounded-2xl object-cover" />
                                            ) : (
                                                <User size={24} />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-indigo-immo">{req.user.name}</h3>
                                            <p className="text-xs text-gray-400 font-bold">{req.agencyName}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${req.status === "PENDING" ? "bg-amber-50 text-amber-600" :
                                                req.status === "APPROVED" ? "bg-green-50 text-green-600" :
                                                    "bg-red-50 text-red-600"
                                            }`}>
                                            {req.status === "PENDING" ? <Clock className="inline mr-1" size={12} /> : null}
                                            {req.status === "PENDING" ? "En attente" : req.status === "APPROVED" ? "Validé" : "Rejeté"}
                                        </span>
                                        <Eye size={18} className="text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Details Panel */}
                <div className="lg:col-span-1">
                    {selectedRequest ? (
                        <div className="bg-white rounded-[40px] p-8 shadow-2xl border border-gray-50 sticky top-8 space-y-8">
                            <h2 className="text-2xl font-black text-indigo-immo tracking-tight">Détails du Dossier</h2>

                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-2xl space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Informations Pro</label>
                                    <div className="flex items-center gap-3 font-bold text-indigo-immo">
                                        <Briefcase size={16} className="text-gold-immo" />
                                        {selectedRequest.agencyName}
                                    </div>
                                    <div className="flex items-center gap-3 font-bold text-indigo-immo">
                                        <Phone size={16} className="text-gold-immo" />
                                        {selectedRequest.professionalPhone}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Document d&apos;identité</label>
                                    <div className="relative group overflow-hidden rounded-3xl aspect-video bg-gray-100 border border-gray-100">
                                        <img
                                            src={selectedRequest.idCardUrl}
                                            alt="ID Card"
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                        />
                                        <a
                                            href={selectedRequest.idCardUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute inset-0 bg-indigo-immo/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity"
                                        >
                                            Voir en grand
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {selectedRequest.status === "PENDING" && (
                                <div className="grid grid-cols-1 gap-3 pt-4">
                                    <button
                                        onClick={() => handleAction(selectedRequest.id, "APPROVED")}
                                        className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-lg shadow-green-500/20"
                                    >
                                        <ShieldCheck size={20} />
                                        Approuver l&apos;Agent
                                    </button>
                                    <button
                                        onClick={() => {
                                            const msg = prompt("Motif du rejet :");
                                            if (msg) handleAction(selectedRequest.id, "REJECTED", msg);
                                        }}
                                        className="w-full py-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        <XCircle size={20} />
                                        Rejeter le dossier
                                    </button>
                                </div>
                            )}

                            {selectedRequest.status !== "PENDING" && (
                                <div className="p-4 bg-indigo-immo/5 rounded-2xl text-center">
                                    <p className="text-sm font-bold text-indigo-immo">
                                        Dossier traité le {new Date(selectedRequest.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="h-full bg-indigo-immo/5 rounded-[40px] border-2 border-dashed border-indigo-immo/10 flex flex-col items-center justify-center p-10 text-center space-y-4">
                            <Eye size={48} className="text-indigo-immo/20" />
                            <p className="text-gray-400 font-medium italic">Sélectionnez une demande pour examiner les pièces justificatives.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
