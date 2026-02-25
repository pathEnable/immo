"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    ShieldCheck,
    Briefcase,
    Phone,
    MapPin,
    Upload,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function BecomeAgentPage() {
    const router = useRouter();
    const [agencyName, setAgencyName] = useState("");
    const [professionalPhone, setProfessionalPhone] = useState("");
    const [address, setAddress] = useState("");
    const [idCardUrl, setIdCardUrl] = useState(""); // Simplified: placeholder for URL
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/verify-agent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    agencyName,
                    professionalPhone,
                    address,
                    idCardUrl: idCardUrl || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg" // Default for demo
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Une erreur est survenue");
            } else {
                setSuccess(true);
            }
        } catch (err) {
            setError("Erreur de connexion");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl text-center space-y-6 border border-green-100">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 text-green-500 rounded-full mb-4">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-indigo-immo tracking-tight">Demande Envoyée !</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Votre dossier est maintenant en cours d&apos;examen par notre équipe.
                        Vous recevrez une notification dès que votre compte sera validé.
                    </p>
                    <Link href="/dashboard" className="btn-indigo w-full py-4 inline-block">
                        Retour au Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 pb-32">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-indigo-immo/60 hover:text-indigo-immo font-bold mb-8 transition-all">
                <ArrowLeft size={18} />
                Retour au Dashboard
            </Link>

            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-gray-50">
                <div className="flex flex-col md:flex-row gap-10">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center justify-center p-4 bg-gold-immo/10 text-gold-immo rounded-3xl">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-indigo-immo tracking-tight mb-4">Devenir Agent IMMO</h1>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Rejoignez le réseau de professionnels certifiés. Remplissez vos informations professionnelles pour soumettre votre dossier de vérification.
                            </p>
                        </div>

                        <div className="space-y-4 pt-6">
                            <div className="flex gap-4 p-4 bg-indigo-immo/5 rounded-2xl border border-indigo-immo/10">
                                <div className="text-indigo-immo pt-1">
                                    <CheckCircle2 size={18} />
                                </div>
                                <p className="text-sm font-bold text-indigo-600">Accès aux outils de mise en ligne</p>
                            </div>
                            <div className="flex gap-4 p-4 bg-indigo-immo/5 rounded-2xl border border-indigo-immo/10">
                                <div className="text-indigo-immo pt-1">
                                    <CheckCircle2 size={18} />
                                </div>
                                <p className="text-sm font-bold text-indigo-600">Badge &quot;Certifié&quot; sur vos annonces</p>
                            </div>
                            <div className="flex gap-4 p-4 bg-indigo-immo/5 rounded-2xl border border-indigo-immo/10">
                                <div className="text-indigo-immo pt-1">
                                    <CheckCircle2 size={18} />
                                </div>
                                <p className="text-sm font-bold text-indigo-600">Gestion simplifiée des clients et paiements</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold">
                                    <AlertCircle size={18} />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Nom de votre agence</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gold-immo focus:bg-white outline-none font-bold text-indigo-immo"
                                        placeholder="EX: Agence Prestige"
                                        value={agencyName}
                                        onChange={(e) => setAgencyName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Téléphone Professionnel</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="tel"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gold-immo focus:bg-white outline-none font-bold text-indigo-immo"
                                        placeholder="+225 07..."
                                        value={professionalPhone}
                                        onChange={(e) => setProfessionalPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Adresse Bureau</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gold-immo focus:bg-white outline-none font-bold text-indigo-immo"
                                        placeholder="EX: Cocody Angré"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Document d&apos;identité</label>
                                <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50 flex flex-col items-center justify-center text-center group hover:border-gold-immo transition-all cursor-pointer">
                                    <Upload className="text-gray-400 group-hover:text-gold-immo transition-colors mb-4" size={32} />
                                    <p className="text-sm font-bold text-gray-400 group-hover:text-gold-immo">Cliquez ou glissez votre CNI / Registre de commerce</p>
                                    <p className="text-[10px] text-gray-400 mt-2 uppercase">PDF, JPG, PNG (Max 5MB)</p>
                                    {/* Integration simple avec un input texte pour simuler le lien pour l'instant */}
                                    <input
                                        type="text"
                                        placeholder="Lien URL du document (Simulation)"
                                        className="mt-4 w-full p-2 text-xs border rounded-lg bg-white"
                                        value={idCardUrl}
                                        onChange={(e) => setIdCardUrl(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-indigo-immo text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-immo/20 hover:bg-gold-immo hover:shadow-gold-immo/20 transition-all flex items-center justify-center gap-3 mt-6"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={24} />
                                ) : (
                                    <>Soumettre mon dossier</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
