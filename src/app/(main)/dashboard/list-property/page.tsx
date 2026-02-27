"use client";

import React, { useState, useRef } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Upload,
    CheckCircle2,
    Home,
    MapPin,
    DollarSign,
    Trash2,
    Loader2,
    ShieldCheck,
    Zap,
    AlertCircle,
    X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AMENITIES_OPTIONS = [
    "Climatisation", "Parking sécurisé", "Gardien 24h/7", "Eau courante",
    "Électricité stable", "Piscine", "Balcon / Terrasse", "Cuisine équipée",
    "Meublé", "WiFi inclus", "Sécurité électronique", "Ascenseur",
];

const TYPES = ["Appartement", "Villa", "Studio", "Chambre", "Bureau", "Duplex"];

export default function ListPropertyPage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [step, setStep] = useState(1);
    const totalSteps = 3;

    // Form data
    const [title, setTitle] = useState("");
    const [type, setType] = useState("Appartement");
    const [neighborhood, setNeighborhood] = useState("");
    const [location, setLocation] = useState("Abidjan");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [amenities, setAmenities] = useState<string[]>([]);

    // Image state
    const [images, setImages] = useState<string[]>([]); // Cloudinary URLs
    const [uploadingImages, setUploadingImages] = useState(false);
    const [uploadError, setUploadError] = useState("");

    // Submission state
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [success, setSuccess] = useState(false);

    const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const toggleAmenity = (item: string) => {
        setAmenities((prev) =>
            prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
        );
    };

    const handleFileUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setUploadError("");
        setUploadingImages(true);

        const uploadedUrls: string[] = [];

        for (const file of Array.from(files)) {
            if (images.length + uploadedUrls.length >= 8) {
                setUploadError("Maximum 8 photos par annonce");
                break;
            }

            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();

                if (!res.ok) {
                    setUploadError(data.error || "Erreur lors de l'upload");
                } else {
                    uploadedUrls.push(data.url);
                }
            } catch {
                setUploadError("Erreur de connexion lors de l'upload");
            }
        }

        setImages((prev) => [...prev, ...uploadedUrls]);
        setUploadingImages(false);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setSubmitError("");

        try {
            const res = await fetch("/api/properties", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    price,
                    location,
                    neighborhood,
                    type,
                    images,
                    amenities,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setSubmitError(data.error || "Erreur lors de la publication");
            } else {
                setSuccess(true);
                setTimeout(() => router.push("/dashboard"), 3000);
            }
        } catch {
            setSubmitError("Erreur de connexion");
        } finally {
            setSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="bg-cream-immo min-h-screen flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl text-center space-y-6 border border-green-100">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 text-green-500 rounded-full">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-indigo-immo tracking-tight">Annonce Publiée !</h2>
                    <p className="text-gray-600 font-medium leading-relaxed">
                        Votre bien <strong>&quot;{title}&quot;</strong> est en cours de vérification par notre équipe.
                        Vous serez notifié dès qu&apos;il sera visible.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <Loader2 size={16} className="animate-spin" />
                        Redirection vers le tableau de bord...
                    </div>
                </div>
            </div>
        );
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-black text-indigo-immo tracking-tight">Informations Générales</h2>
                            <p className="text-gray-600 mt-1">Commencez par les détails de base de votre bien.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="text-xs font-bold text-indigo-immo/60 uppercase tracking-widest">Titre de l&apos;annonce *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="ex: Bel Appartement F3 avec Balcon"
                                    className="w-full bg-cream-immo/50 border border-gray-200 rounded-xl py-4 px-5 outline-none focus:border-gold-immo focus:ring-2 focus:ring-gold-immo/20 transition-all text-indigo-immo"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-indigo-immo/60 uppercase tracking-widest">Type de bien *</label>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full bg-cream-immo/50 border border-gray-200 rounded-xl py-4 px-5 outline-none focus:border-gold-immo transition-all cursor-pointer text-indigo-immo"
                                >
                                    {TYPES.map((t) => (
                                        <option key={t}>{t}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-indigo-immo/60 uppercase tracking-widest">Prix mensuel (FCFA) *</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-immo" size={18} />
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="ex: 250000"
                                        min="0"
                                        className="w-full bg-cream-immo/50 border border-gray-200 rounded-xl py-4 pl-11 pr-5 outline-none focus:border-gold-immo focus:ring-2 focus:ring-gold-immo/20 transition-all text-indigo-immo"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-indigo-immo/60 uppercase tracking-widest">Quartier *</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-immo" size={18} />
                                    <input
                                        type="text"
                                        value={neighborhood}
                                        onChange={(e) => setNeighborhood(e.target.value)}
                                        placeholder="ex: Cocody Angré 7ème Tranche"
                                        className="w-full bg-cream-immo/50 border border-gray-200 rounded-xl py-4 pl-11 pr-5 outline-none focus:border-gold-immo focus:ring-2 focus:ring-gold-immo/20 transition-all text-indigo-immo"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-indigo-immo/60 uppercase tracking-widest">Ville *</label>
                                <div className="relative">
                                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-immo" size={18} />
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="ex: Abidjan"
                                        className="w-full bg-cream-immo/50 border border-gray-200 rounded-xl py-4 pl-11 pr-5 outline-none focus:border-gold-immo focus:ring-2 focus:ring-gold-immo/20 transition-all text-indigo-immo"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-indigo-immo/60 uppercase tracking-widest">Description *</label>
                            <textarea
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Décrivez les atouts de votre bien, l'environnement, l'accès aux transports..."
                                className="w-full bg-cream-immo/50 border border-gray-200 rounded-xl py-4 px-5 outline-none focus:border-gold-immo focus:ring-2 focus:ring-gold-immo/20 transition-all resize-none text-indigo-immo"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-indigo-immo/60 uppercase tracking-widest">Équipements</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {AMENITIES_OPTIONS.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => toggleAmenity(item)}
                                        className={`py-2.5 px-3 rounded-xl text-sm font-semibold transition-all border text-left ${amenities.includes(item)
                                            ? "bg-indigo-immo text-white border-indigo-immo"
                                            : "bg-white text-indigo-immo border-gray-100 hover:border-gold-immo"
                                            }`}
                                    >
                                        {amenities.includes(item) ? "✓ " : ""}{item}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-black text-indigo-immo tracking-tight">Photos & Médias</h2>
                            <p className="text-gray-600 mt-1">Une belle présentation multiplie vos chances par 3. ({images.length}/8 photos)</p>
                        </div>

                        {/* Upload Zone */}
                        <div
                            className="border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center space-y-4 hover:border-gold-immo transition-all bg-cream-immo/20 cursor-pointer group"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                multiple
                                className="hidden"
                                onChange={(e) => handleFileUpload(e.target.files)}
                            />
                            <div className="p-5 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
                                {uploadingImages ? <Loader2 className="text-gold-immo animate-spin" size={36} /> : <Upload className="text-gold-immo" size={36} />}
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-indigo-immo text-lg">
                                    {uploadingImages ? "Envoi en cours..." : "Cliquez pour télécharger"}
                                </p>
                                <p className="text-sm text-gray-500">JPG, PNG, WEBP — Max. 10MB par photo — 8 photos max</p>
                            </div>
                        </div>

                        {uploadError && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl text-sm font-semibold">
                                <AlertCircle size={16} />
                                {uploadError}
                            </div>
                        )}

                        {/* Image Previews */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {images.map((url, index) => (
                                    <div key={url} className="relative group rounded-2xl overflow-hidden h-40 shadow-sm border border-gray-100">
                                        <Image
                                            src={url}
                                            alt={`Photo ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                        />
                                        {index === 0 && (
                                            <div className="absolute top-2 left-2 bg-gold-immo text-indigo-immo text-[10px] font-bold px-2 py-1 rounded-full">
                                                Principale
                                            </div>
                                        )}
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                            aria-label="Supprimer la photo"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="bg-indigo-immo/5 p-5 rounded-2xl flex gap-4 items-start">
                            <ShieldCheck className="text-gold-immo shrink-0" size={22} />
                            <div>
                                <p className="font-bold text-indigo-immo text-sm">Conseil d&apos;expert</p>
                                <p className="text-sm text-gray-600 leading-relaxed mt-1">
                                    Les photos prises en journée avec bonne luminosité attirent 3x plus de locataires.
                                    Recommandez au moins 5 photos pour un appartement.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-black text-indigo-immo tracking-tight">Récapitulatif & Publication</h2>
                            <p className="text-gray-600 mt-1">Vérifiez les informations avant de publier.</p>
                        </div>

                        {submitError && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-sm font-semibold">
                                <AlertCircle size={18} />
                                {submitError}
                            </div>
                        )}

                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-5">
                            {/* Image Preview */}
                            {images.length > 0 && (
                                <div className="relative h-48 rounded-xl overflow-hidden">
                                    <Image
                                        src={images[0]}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-immo/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <p className="font-black text-lg leading-tight">{title || "Titre non renseigné"}</p>
                                        <p className="text-gold-immo font-bold">{price ? parseInt(price).toLocaleString() + " FCFA / mois" : "Prix non renseigné"}</p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-1">Type</p>
                                    <p className="font-semibold text-indigo-immo">{type}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-1">Localisation</p>
                                    <p className="font-semibold text-indigo-immo">{neighborhood || "—"}, {location}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-1">Photos</p>
                                    <p className="font-semibold text-indigo-immo">{images.length} photo{images.length !== 1 ? "s" : ""}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-1">Équipements</p>
                                    <p className="font-semibold text-indigo-immo">{amenities.length > 0 ? amenities.slice(0, 3).join(", ") + (amenities.length > 3 ? "..." : "") : "Aucun"}</p>
                                </div>
                            </div>

                            {description && (
                                <div>
                                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-1">Description</p>
                                    <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{description}</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-gold-immo/10 border border-gold-immo/30 p-4 rounded-2xl flex gap-3 items-start">
                            <Zap className="text-gold-immo shrink-0 mt-0.5" size={18} />
                            <p className="text-sm text-indigo-immo font-medium">
                                Votre bien sera visible après vérification par notre équipe (sous 24h).
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const canProceedStep1 = title && type && neighborhood && location && price && description;
    const canProceedStep2 = images.length > 0;

    return (
        <div className="bg-cream-immo min-h-screen py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Progress */}
                <div className="mb-10 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-immo uppercase tracking-widest">Étape {step} sur {totalSteps}</span>
                        <span className="text-xs font-bold text-gold-immo uppercase tracking-widest">{Math.round((step / totalSteps) * 100)}% Complété</span>
                    </div>
                    <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-sm">
                        <div
                            className="h-full bg-gold-immo rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${(step / totalSteps) * 100}%` }}
                        />
                    </div>
                    {/* Step indicators */}
                    <div className="flex justify-between">
                        {["Informations", "Photos", "Publication"].map((label, i) => (
                            <div key={label} className={`flex items-center gap-1.5 text-xs font-semibold ${step > i ? "text-indigo-immo" : "text-gray-400"}`}>
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all ${step > i + 1 ? "bg-indigo-immo border-indigo-immo text-white" : step === i + 1 ? "border-gold-immo text-gold-immo" : "border-gray-200 text-gray-400"}`}>
                                    {step > i + 1 ? "✓" : i + 1}
                                </div>
                                <span className="hidden sm:inline">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-[32px] shadow-xl p-8 md:p-12 border border-gray-50">
                    {renderStep()}

                    {/* Navigation */}
                    <div className="mt-10 flex justify-between items-center pt-8 border-t border-gray-50">
                        {step === 1 ? (
                            <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 font-semibold hover:text-indigo-immo transition-all">
                                <ArrowLeft size={18} />
                                Quitter
                            </Link>
                        ) : (
                            <button onClick={prevStep} className="flex items-center gap-2 text-indigo-immo font-semibold hover:text-gold-immo transition-all">
                                <ArrowLeft size={18} />
                                Précédent
                            </button>
                        )}

                        {step < totalSteps ? (
                            <button
                                onClick={nextStep}
                                disabled={(step === 1 && !canProceedStep1) || (step === 2 && !canProceedStep2)}
                                className="btn-primary flex items-center gap-2 py-3.5 px-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continuer
                                <ArrowRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={submitting}
                                className="btn-primary flex items-center gap-2 py-3.5 px-10 bg-indigo-immo disabled:opacity-70"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Publication...
                                    </>
                                ) : (
                                    <>
                                        Publier mon bien
                                        <Zap size={18} className="text-gold-immo" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
