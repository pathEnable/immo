"use client";

import React, { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Wallet,
    CheckCircle2,
    Smartphone,
    X,
    Download,
    Share2,
    Lock
} from "lucide-react";
import Link from "next/link";

const WithdrawalPage = () => {
    const [amount, setAmount] = useState("");
    const [provider, setProvider] = useState("WAVE");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleWithdraw = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    // Use a stable receipt number to ensure component purity
    const receiptNumber = "84729103";

    if (success) {
        return (
            <div className="bg-cream-immo min-h-screen flex items-center justify-center p-4">
                <div className="bg-white rounded-[40px] shadow-2xl p-10 max-w-md w-full text-center space-y-8 animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl mx-auto">
                        <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-indigo-immo tracking-tight">Retrait réussi !</h2>
                        <p className="text-gray-500 font-medium">Vos fonds ont été envoyés vers votre compte {provider}.</p>
                    </div>

                    <div className="bg-indigo-immo/5 p-6 rounded-3xl border border-indigo-immo/10 text-left space-y-4">
                        <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-3">
                            <span>Reçu Numérique</span>
                            <span>#{receiptNumber}</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Montant retiré</span>
                                <span className="text-indigo-immo font-black">{amount} FCFA</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Opérateur</span>
                                <span className="text-indigo-immo font-black text-xs px-2 py-0.5 bg-white rounded-md ring-1 ring-indigo-immo/10">{provider}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-sm">Frais (0%)</span>
                                <span className="text-green-500 font-bold">Inclus par IMMO</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <button className="flex items-center justify-center gap-2 py-4 px-6 border-2 border-gray-100 rounded-2xl font-bold text-indigo-immo hover:bg-gray-50 transition-all">
                            <Download size={20} />
                            PDF
                        </button>
                        <button className="flex items-center justify-center gap-2 py-4 px-6 border-2 border-gray-100 rounded-2xl font-bold text-indigo-immo hover:bg-gray-50 transition-all">
                            <Share2 size={20} />
                            Partager
                        </button>
                    </div>

                    <Link href="/dashboard" className="block w-full btn-primary py-4">
                        Retour au Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-cream-immo min-h-screen py-16">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-indigo-immo font-bold mb-8 hover:text-gold-immo transition-all">
                    <ArrowLeft size={20} />
                    Retour au Dashboard
                </Link>

                <div className="bg-white rounded-[40px] shadow-2xl p-10 md:p-14 border border-gray-50">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 bg-gold-immo/20 text-gold-immo rounded-2xl">
                            <Wallet size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-indigo-immo tracking-tight">Virement Mobile</h1>
                            <p className="text-gray-500 font-medium">Récupérez vos revenus en 2 minutes.</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-indigo-immo/60 uppercase tracking-widest">Opérateur</label>
                            <div className="grid grid-cols-2 gap-4">
                                {["WAVE", "ORANGE", "MTN", "MOOV"].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setProvider(opt)}
                                        className={`py-6 px-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 font-black ${provider === opt ? "border-indigo-immo bg-indigo-immo/5 text-indigo-immo ring-4 ring-indigo-immo/10" : "border-gray-50 bg-white text-gray-300 hover:border-gold-immo"
                                            }`}
                                    >
                                        <Smartphone size={24} />
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-sm font-bold text-indigo-immo/60 uppercase tracking-widest">Montant à retirer</label>
                                <span className="text-xs font-bold text-indigo-immo/40">Maximum: 1,500,000 FCFA</span>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full bg-cream-immo/50 border border-gray-100 rounded-3xl py-8 px-10 text-4xl font-black text-indigo-immo outline-none focus:border-gold-immo transition-all text-center"
                                />
                                <span className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-300 font-bold">FCFA</span>
                            </div>
                        </div>

                        <div className="bg-indigo-immo/5 p-6 rounded-3xl flex gap-4 items-center">
                            <Lock className="text-gold-immo shrink-0" size={20} />
                            <p className="text-xs text-indigo-immo/60 font-medium leading-relaxed">Transaction 128-bit hautement sécurisée. Les fonds sont transférés instantanément après validation.</p>
                        </div>

                        <button
                            disabled={!amount || loading}
                            onClick={handleWithdraw}
                            className={`w-full py-6 btn-primary shadow-xl shadow-indigo-immo/10 flex items-center justify-center gap-3 transition-all ${loading ? "opacity-70 cursor-wait" : ""
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Traitement en cours...
                                </>
                            ) : (
                                <>
                                    Confirmer le retrait
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WithdrawalPage;
