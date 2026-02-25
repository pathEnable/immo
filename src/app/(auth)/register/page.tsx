"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Mail, Lock, User, AlertCircle, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";

const RegisterPage = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Une erreur est survenue");
            } else {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch (err) {
            setError("Une erreur de connexion au serveur");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-indigo-immo flex items-center justify-center overflow-hidden font-outfit">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-gold-immo/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-terracotta-immo/20 blur-[120px] rounded-full animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            </div>

            {/* Back Button */}
            <div className="absolute top-8 left-8 z-20">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-white/60 hover:text-white font-bold transition-all px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl backdrop-blur-md"
                >
                    <ArrowLeft size={18} />
                    Retour
                </Link>
            </div>

            <div className="relative z-10 w-full max-w-[500px] px-4 py-8">
                <div className="bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-[40px] shadow-2xl space-y-6 border border-white/50 transform hover:scale-[1.01] transition-all duration-500">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-indigo-immo rounded-3xl mb-6 shadow-xl shadow-indigo-immo/20">
                            <span className="text-2xl font-black text-white tracking-tighter">
                                IMMO<span className="text-gold-immo">.</span>
                            </span>
                        </div>
                        <h2 className="text-3xl font-black text-indigo-immo tracking-tight border-b-4 border-gold-immo/30 inline-block pb-1">Créer un profil</h2>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100/50 text-red-600 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold animate-shake">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-100/50 text-green-600 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold animate-fade-in">
                            <CheckCircle2 size={18} />
                            Compte créé ! Redirection...
                        </div>
                    )}

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Nom Complet</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold-immo transition-colors">
                                    <User size={16} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gold-immo/50 focus:bg-white focus:border-gold-immo outline-none transition-all text-indigo-immo font-bold text-sm"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold-immo transition-colors">
                                    <Mail size={16} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gold-immo/50 focus:bg-white focus:border-gold-immo outline-none transition-all text-indigo-immo font-bold text-sm"
                                    placeholder="john@immo.ci"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Mot de passe</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold-immo transition-colors">
                                    <Lock size={16} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gold-immo/50 focus:bg-white focus:border-gold-immo outline-none transition-all text-indigo-immo font-bold text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Confirmer</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold-immo transition-colors">
                                    <Lock size={16} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gold-immo/50 focus:bg-white focus:border-gold-immo outline-none transition-all text-indigo-immo font-bold text-sm"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="md:col-span-2 mt-4 btn-indigo py-4 flex items-center justify-center gap-2 text-lg group transition-all"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <UserPlus size={20} className="group-hover:translate-x-1 transition-transform" />
                                    Créer mon compte
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                            Déjà membre ?{" "}
                            <Link href="/login" className="text-indigo-immo font-black hover:text-gold-immo transition-colors underline decoration-gold-immo underline-offset-4 decoration-2">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
