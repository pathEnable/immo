"use client";

import React, { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Upload,
    CheckCircle2,
    Home,
    MapPin,
    DollarSign,
    Image as ImageIcon,
    ShieldCheck,
    Zap
} from "lucide-react";
import Link from "next/link";

const ListPropertyPage = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-indigo-immo tracking-tight">Informations Générales</h2>
                            <p className="text-gray-500 font-medium">Commencez par les détails de base de votre bien.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-indigo-immo/60 uppercase tracking-widest">Titre de l&apos;annonce</label>
                                <input type="text" placeholder="ex: Bel Appartement F3 avec Balcon" className="w-full bg-cream-immo/50 border border-gray-100 rounded-xl py-4 px-6 outline-none focus:border-gold-immo transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-indigo-immo/60 uppercase tracking-widest">Type de bien</label>
                                <select className="w-full bg-cream-immo/50 border border-gray-100 rounded-xl py-4 px-6 outline-none focus:border-gold-immo transition-all cursor-pointer">
                                    <option>Appartement</option>
                                    <option>Villa</option>
                                    <option>Studio</option>
                                    <option>Chambre</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-indigo-immo/60 uppercase tracking-widest">Quartier</label>
                                <input type="text" placeholder="ex: Cocody Angré 7ème Tranche" className="w-full bg-cream-immo/50 border border-gray-100 rounded-xl py-4 px-6 outline-none focus:border-gold-immo transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-indigo-immo/60 uppercase tracking-widest">Prix mensuel (FCFA)</label>
                                <input type="number" placeholder="ex: 250000" className="w-full bg-cream-immo/50 border border-gray-100 rounded-xl py-4 px-6 outline-none focus:border-gold-immo transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-indigo-immo/60 uppercase tracking-widest">Description détaillée</label>
                            <textarea rows={4} placeholder="Décrivez les atouts de votre bien..." className="w-full bg-cream-immo/50 border border-gray-100 rounded-xl py-4 px-6 outline-none focus:border-gold-immo transition-all resize-none"></textarea>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-indigo-immo tracking-tight">Photos & Média</h2>
                            <p className="text-gray-500 font-medium">Une belle présentation multiplie vos chances par 3.</p>
                        </div>

                        <div className="border-4 border-dashed border-gray-100 rounded-3xl p-16 flex flex-col items-center justify-center space-y-4 hover:border-gold-immo transition-all bg-cream-immo/20 cursor-pointer group">
                            <div className="p-6 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
                                <Upload className="text-gold-immo" size={40} />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-indigo-immo text-lg">Cliquez pour télécharger vos photos</p>
                                <p className="text-sm text-gray-400">Format JPG, PNG (Max. 10MB par photo)</p>
                            </div>
                        </div>

                        <div className="bg-indigo-immo/5 p-6 rounded-2xl flex gap-4 items-start">
                            <ShieldCheck className="text-gold-immo shrink-0" size={24} />
                            <div>
                                <p className="font-bold text-indigo-immo text-sm">Conseil d&apos;expert</p>
                                <p className="text-xs text-gray-500 leading-relaxed">Les photos prises en journée avec une bonne luminosité attirent plus de locataires qualifiés. Nous recommandons au moins 5 photos pour les appartements.</p>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex flex-col items-center justify-center text-center space-y-6 pt-10">
                            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
                                <CheckCircle2 size={48} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-indigo-immo tracking-tight">Prêt à publier !</h2>
                                <p className="text-gray-500 font-medium max-w-sm">Votre annonce est complète. Notre équipe vérifiera les informations sous 24h.</p>
                            </div>

                            <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl p-6 text-left shadow-sm space-y-4">
                                <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">
                                    <span>Récapitulatif</span>
                                    <span>Annuler</span>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 bg-cream-immo rounded-xl flex items-center justify-center text-gold-immo">
                                        <ImageIcon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-indigo-immo">Bel Appartement F3 - Cocody</h4>
                                        <p className="text-sm text-gold-immo font-black">250 000 FCFA / mois</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-cream-immo min-h-screen py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Progress Bar */}
                <div className="mb-12 space-y-4">
                    <div className="flex justify-between items-center px-2">
                        <span className="text-xs font-black text-indigo-immo uppercase tracking-widest">Étape {step} sur {totalSteps}</span>
                        <span className="text-xs font-black text-gold-immo uppercase tracking-widest">{Math.round((step / totalSteps) * 100)}% Complété</span>
                    </div>
                    <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-sm p-1">
                        <div
                            className="h-full bg-gold-immo rounded-full transition-all duration-700 ease-out shadow-sm"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[40px] shadow-2xl p-10 md:p-14 border border-gray-50 relative overflow-hidden">
                    {renderStep()}

                    {/* Navigation Controls */}
                    <div className="mt-16 flex justify-between items-center pt-10 border-t border-gray-50">
                        {step === 1 ? (
                            <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 font-bold hover:text-indigo-immo transition-all">
                                <ArrowLeft size={18} />
                                Quitter
                            </Link>
                        ) : (
                            <button onClick={prevStep} className="flex items-center gap-2 text-indigo-immo font-bold hover:text-gold-immo transition-all">
                                <ArrowLeft size={18} />
                                Précédent
                            </button>
                        )}

                        {step < totalSteps ? (
                            <button
                                onClick={nextStep}
                                className="btn-primary flex items-center gap-2 py-4 px-10 shadow-indigo-immo/20"
                            >
                                Continuer
                                <ArrowRight size={18} />
                            </button>
                        ) : (
                            <Link
                                href="/dashboard"
                                className="btn-primary bg-indigo-immo text-white py-4 px-10 rounded-2xl font-bold flex items-center gap-2"
                            >
                                Terminer & Envoyer
                                <Zap size={18} className="text-gold-immo" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListPropertyPage;
