"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LogIn, Mail, Lock, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Email ou mot de passe incorrect");
            } else {
                // Fetch session to determine role
                const sessionRes = await fetch("/api/auth/session");
                const session = await sessionRes.json();

                const role = session?.user?.role;
                if (role === "ADMIN") {
                    router.push("/admin");
                } else if (role === "AGENT") {
                    router.push("/dashboard");
                } else {
                    router.push("/"); // USER (client) → accueil
                }
                router.refresh();
            }
        } catch (err) {
            setError("Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-indigo-immo flex items-center justify-center overflow-hidden font-outfit">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gold-immo/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-terracotta-immo/20 blur-[120px] rounded-full animate-pulse delay-700"></div>
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

            <div className="relative z-10 w-full max-w-[450px] px-4">
                <div className="bg-white/95 backdrop-blur-xl p-8 md:p-10 rounded-[40px] shadow-2xl space-y-8 border border-white/50 transform hover:scale-[1.01] transition-all duration-500">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center p-4 bg-indigo-immo rounded-3xl mb-6 shadow-xl shadow-indigo-immo/20">
                            <span className="text-2xl font-black text-white tracking-tighter">
                                IMMO<span className="text-gold-immo">.</span>
                            </span>
                        </div>
                        <h2 className="text-3xl font-black text-indigo-immo tracking-tight">Ravie de vous revoir</h2>
                        <p className="mt-2 text-sm text-gray-500 font-semibold uppercase tracking-wider">
                            Accédez à votre espace sécurisé
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100/50 text-red-600 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold animate-shake">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email professionnel</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold-immo transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gold-immo/50 focus:bg-white focus:border-gold-immo outline-none transition-all text-indigo-immo font-bold placeholder:text-gray-300"
                                    placeholder="exemple@immo.ci"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mot de passe</label>
                                <button type="button" className="text-[10px] font-black text-indigo-immo/40 hover:text-gold-immo uppercase tracking-widest transition-colors">
                                    Oublié ?
                                </button>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold-immo transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-gold-immo/50 focus:bg-white focus:border-gold-immo outline-none transition-all text-indigo-immo font-bold placeholder:text-gray-300"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 flex items-center justify-center gap-3 text-lg group transition-all"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                                    Se connecter
                                </>
                            )}
                        </button>
                    </form>

                    <div className="text-center pt-2">
                        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                            Nouveau ici ?{" "}
                            <Link href="/register" className="text-indigo-immo font-black hover:text-gold-immo transition-colors decoration-gold-immo underline-offset-4 decoration-2">
                                Créer un compte
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
